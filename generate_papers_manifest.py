# SPDX-FileCopyrightText: 2026 Aai
# SPDX-License-Identifier: GPL-3.0-only
# See LICENSE and LICENSE-SCOPE.md for the exact project scope.

from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit
import json


CONTENT_NATURES = {"fictional", "hypothetical", "reference", "research"}
DEFAULT_THUMBNAIL = "../images/Icon1.png"


class ContentNatureParser(HTMLParser):
    def __init__(self) -> None:
        super().__init__()
        self.value = None

    def handle_starttag(self, tag, attrs) -> None:
        if tag.lower() != "meta":
            return
        metadata = {key.lower(): value for key, value in attrs}
        if (metadata.get("name") or "").lower() == "content-nature":
            self.value = (metadata.get("content") or "").strip().lower()


class ImageSourceParser(HTMLParser):
    def __init__(self) -> None:
        super().__init__()
        self.sources = []

    def handle_starttag(self, tag, attrs) -> None:
        if tag.lower() != "img":
            return
        metadata = {key.lower(): value for key, value in attrs}
        source = (metadata.get("src") or "").strip()
        if source:
            self.sources.append(source)


ROOT = Path(__file__).resolve().parent
PAPERS_DIR = ROOT / "Papers and Achievements"
MANIFEST_PATH = PAPERS_DIR / "papers.json"
ARTICLE_METADATA_PATH = PAPERS_DIR / "articles.json"


def read_article_metadata() -> dict:
    """Index article metadata by its published HTML filename."""
    try:
        data = json.loads(ARTICLE_METADATA_PATH.read_text(encoding="utf-8"))
    except (OSError, UnicodeError, json.JSONDecodeError):
        return {}
    articles = data.get("articles", []) if isinstance(data, dict) else []
    return {
        item["file"]: item
        for item in articles
        if isinstance(item, dict) and isinstance(item.get("file"), str)
    }


def read_content_nature(html_path: Path) -> str:
    """Read a page's declared nature; default to fictional to avoid implying verification."""
    try:
        parser = ContentNatureParser()
        parser.feed(html_path.read_text(encoding="utf-8"))
        value = parser.value
    except (OSError, UnicodeError):
        value = None
    return value if value in CONTENT_NATURES else "fictional"


def read_thumbnail(html_path: Path, article_metadata: dict) -> str:
    """Use the first local image in the article fragment, or the site icon as a fallback."""
    metadata = article_metadata.get(html_path.name, {})
    content_file = metadata.get("contentFile") if isinstance(metadata, dict) else None
    if isinstance(content_file, str) and content_file:
        fragment_path = (PAPERS_DIR / content_file).resolve()
        allowed_root = (PAPERS_DIR / "article-content").resolve()
        try:
            fragment_path.relative_to(allowed_root)
        except ValueError:
            fragment_path = None

        if fragment_path and fragment_path.is_file():
            try:
                parser = ImageSourceParser()
                parser.feed(fragment_path.read_text(encoding="utf-8"))
            except (OSError, UnicodeError):
                parser = ImageSourceParser()

            for source in parser.sources:
                parsed = urlsplit(source)
                if parsed.scheme or parsed.netloc or source.startswith("//"):
                    continue
                image_path = Path(unquote(parsed.path))
                resolved = (
                    (ROOT / image_path.as_posix().lstrip("/")).resolve()
                    if image_path.is_absolute()
                    else (PAPERS_DIR / image_path).resolve()
                )
                try:
                    resolved.relative_to((ROOT / "images").resolve())
                except ValueError:
                    continue
                if resolved.is_file():
                    return source

    fallback_path = (PAPERS_DIR / DEFAULT_THUMBNAIL).resolve()
    return DEFAULT_THUMBNAIL if fallback_path.is_file() else ""


def main() -> None:
    if not PAPERS_DIR.is_dir():
        raise SystemExit(f"论文目录不存在：{PAPERS_DIR}")
    html_files = sorted(
        (
            path for path in PAPERS_DIR.iterdir()
            if path.is_file()
            and path.suffix.lower() == ".html"
            and path.name.lower() != "index.html"
        ),
        key=lambda path: path.name.casefold(),
    )
    article_metadata = read_article_metadata()

    entries = []
    for html_path in html_files:
        txt_path = html_path.with_suffix(".txt")
        if txt_path.is_file():
            description = txt_path.read_text(encoding="utf-8-sig", errors="replace").strip()
            if not description:
                description = "对应的 TXT 文件暂无内容。"
        else:
            description = f"未找到对应的 TXT 文件：{txt_path.name}"
            print(f"提醒：{html_path.name} 缺少配套说明文件 {txt_path.name}")
        entries.append({
            "file": html_path.name,
            "description": description,
            "contentNature": read_content_nature(html_path),
            "thumbnail": read_thumbnail(html_path, article_metadata),
        })

    json_text = json.dumps(entries, ensure_ascii=False, indent=2)
    MANIFEST_PATH.write_text(json_text + "\n", encoding="utf-8", newline="\n")

    print(f"已更新 {MANIFEST_PATH.name}，共收录 {len(entries)} 篇。")

    for entry in entries:
        print(f" - {entry['file']}: {entry['description'][:80]} [{entry['thumbnail'] or '无封面'}]")


if __name__ == "__main__":
    main()
