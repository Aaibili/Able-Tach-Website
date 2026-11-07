from __future__ import annotations

# SPDX-FileCopyrightText: 2026 Aai
# SPDX-License-Identifier: GPL-3.0-only
# See LICENSE and LICENSE-SCOPE.md for the exact project scope.

import json
import re
from pathlib import Path
from html import escape

ROOT = Path(__file__).resolve().parent
PAPERS_DIR = ROOT / "Papers and Achievements"
CONFIG_PATH = PAPERS_DIR / "articles.json"
TEMPLATE_PATH = ROOT / "page-layouts" / "article-page.html"
ALLOWED_NATURES = {"fictional", "hypothetical", "reference", "research"}
REQUIRED_TEMPLATE_TOKENS = {
    "{{CONTENT_NATURE}}",
    "{{STYLESHEET}}",
    "{{ARTICLE_ID}}",
    "{{CONTENT_FILE}}",
    "{{PAGE_TITLE}}",
    "{{PAGE_DESCRIPTION}}",
}


def safe_project_path(base: Path, relative: str, *, allow_parent: bool = False) -> Path:
    if not isinstance(relative, str) or not relative.strip():
        raise ValueError("文件路径必须是非空字符串。")
    candidate = (base / relative).resolve()
    try:
        candidate.relative_to(ROOT.resolve())
    except ValueError as exc:
        raise ValueError(f"文件路径超出项目根目录：{relative}") from exc
    if not allow_parent:
        try:
            candidate.relative_to(base.resolve())
        except ValueError as exc:
            raise ValueError(f"文件路径超出指定目录：{relative}") from exc
    return candidate


def main() -> None:
    if not CONFIG_PATH.is_file():
        raise SystemExit(f"文章元数据文件不存在：{CONFIG_PATH}")
    if not TEMPLATE_PATH.is_file():
        raise SystemExit(f"文章页面模板不存在：{TEMPLATE_PATH}")

    config = json.loads(CONFIG_PATH.read_text(encoding="utf-8"))
    articles = config.get("articles") if isinstance(config, dict) else None
    if not isinstance(articles, list) or not articles:
        raise SystemExit("articles.json 必须包含非空 articles 数组。")

    template = TEMPLATE_PATH.read_text(encoding="utf-8")
    missing_tokens = REQUIRED_TEMPLATE_TOKENS - set(re.findall(r"\{\{[A-Z_]+\}\}", template))
    if missing_tokens:
        raise SystemExit("页面模板缺少占位符：" + ", ".join(sorted(missing_tokens)))

    seen_ids: set[str] = set()
    seen_files: set[str] = set()
    generated: list[Path] = []

    for item in articles:
        if not isinstance(item, dict):
            raise SystemExit("articles 数组中的每条记录都必须是对象。")

        article_id = item.get("id")
        filename = item.get("file")
        content_file = item.get("contentFile")
        stylesheet = item.get("stylesheet")
        content_nature = item.get("contentNature", "fictional")

        if not isinstance(article_id, str) or not re.fullmatch(r"[a-z0-9]+(?:-[a-z0-9]+)*", article_id):
            raise SystemExit(f"无效的文章 ID：{article_id!r}")
        if (
            not isinstance(filename, str)
            or filename in {".", ".."}
            or "/" in filename
            or "\\" in filename
            or ":" in filename
            or not filename.lower().endswith(".html")
            or filename.lower() == "index.html"
        ):
            raise SystemExit(f"无效的文章页面文件名：{filename!r}")
        if article_id in seen_ids or filename.casefold() in seen_files:
            raise SystemExit(f"文章 ID 或页面文件名重复：{article_id} / {filename}")
        if not isinstance(content_nature, str) or content_nature not in ALLOWED_NATURES:
            raise SystemExit(f"{filename} 的 contentNature 无效：{content_nature!r}")

        content_path = safe_project_path(PAPERS_DIR, content_file)
        stylesheet_path = safe_project_path(PAPERS_DIR, stylesheet, allow_parent=True)
        if not content_path.is_file():
            raise SystemExit(f"文章内容文件不存在：{content_file}")
        if not stylesheet_path.is_file():
            raise SystemExit(f"文章样式文件不存在：{stylesheet}")

        fragment = content_path.read_text(encoding="utf-8")
        if not re.search(r"<article\b[^>]*class=[\"']article[\"'][^>]*>", fragment, re.I):
            raise SystemExit(f"{content_file} 缺少 article.article 根元素。")
        if re.search(r"<\s*(script|style|iframe|object|embed)\b|\son[a-z]+\s*=", fragment, re.I):
            raise SystemExit(f"{content_file} 包含不应放入文章内容文件的程序内容。")
        badges = re.findall(r"""data-content-nature=[\"']([a-z]+)[\"']""", fragment)
        if badges != [content_nature]:
            raise SystemExit(f"{filename} 必须包含且仅包含一个与 articles.json 一致的可见内容性质标签。")

        title = item.get("title", "田园研究所文章页面")
        description = item.get("description", "田园研究所文章页面")
        if not isinstance(title, str) or not isinstance(description, str):
            raise SystemExit(f"{filename} 的 title 和 description 必须是字符串。")

        replacements = {
            "{{CONTENT_NATURE}}": escape(content_nature, quote=True),
            "{{STYLESHEET}}": escape(stylesheet.replace("\\", "/"), quote=True),
            "{{ARTICLE_ID}}": escape(article_id, quote=True),
            "{{CONTENT_FILE}}": escape(content_file.replace("\\", "/"), quote=True),
            "{{PAGE_TITLE}}": escape(title, quote=True),
            "{{PAGE_DESCRIPTION}}": escape(description, quote=True),
        }
        page = template
        for token, value in replacements.items():
            page = page.replace(token, value)
        if re.search(r"\{\{[A-Z_]+\}\}", page):
            raise SystemExit(f"{filename} 生成后仍包含未替换的模板占位符。")

        target = PAPERS_DIR / filename
        target.write_text(page.rstrip() + "\n", encoding="utf-8", newline="\n")
        seen_ids.add(article_id)
        seen_files.add(filename.casefold())
        generated.append(target)
        print(f"已生成：{target.relative_to(ROOT).as_posix()}")

    print(f"共生成 {len(generated)} 个文章页面外壳；文章正文保存在独立内容文件中。")


if __name__ == "__main__":
    main()
