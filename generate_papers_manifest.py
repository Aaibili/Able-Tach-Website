# SPDX-FileCopyrightText: 2026 Aai
# SPDX-License-Identifier: GPL-3.0-only
# See LICENSE and LICENSE-SCOPE.md for the exact project scope.

from html.parser import HTMLParser
from pathlib import Path
import json


CONTENT_NATURES = {"fictional", "hypothetical", "reference", "research"}


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

ROOT = Path(__file__).resolve().parent
PAPERS_DIR = ROOT / "Papers and Achievements"
MANIFEST_PATH = PAPERS_DIR / "papers.json"

def read_content_nature(html_path: Path) -> str:
    """Read a page's declared nature; default to fictional to avoid implying verification."""
    try:
        parser = ContentNatureParser()
        parser.feed(html_path.read_text(encoding="utf-8"))
        value = parser.value
    except (OSError, UnicodeError):
        value = None
    return value if value in CONTENT_NATURES else "fictional"


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
        })

    json_text = json.dumps(entries, ensure_ascii=False, indent=2)
    MANIFEST_PATH.write_text(json_text + "\n", encoding="utf-8", newline="\n")

    print(f"已更新 {MANIFEST_PATH.name}，共收录 {len(entries)} 篇。")

    for entry in entries:
        print(f" - {entry['file']}: {entry['description'][:80]}")


if __name__ == "__main__":
    main()
