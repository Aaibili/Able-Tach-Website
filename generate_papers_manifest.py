from pathlib import Path
import json
import re

ROOT = Path(__file__).resolve().parent
PAPERS_DIR = ROOT / "Papers and Achievements"
MANIFEST_PATH = PAPERS_DIR / "papers.json"
INDEX_PATH = ROOT / "index.html"
DATA_START = "<!-- PAPERS_DATA_START -->"
DATA_END = "<!-- PAPERS_DATA_END -->"


def main() -> None:
    if not PAPERS_DIR.is_dir():
        raise SystemExit(f"论文目录不存在：{PAPERS_DIR}")
    if not INDEX_PATH.is_file():
        raise SystemExit(f"主页不存在：{INDEX_PATH}")

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
        entries.append({"file": html_path.name, "description": description})

    json_text = json.dumps(entries, ensure_ascii=False, indent=2)
    MANIFEST_PATH.write_text(json_text + "\n", encoding="utf-8")

    # Keep the data embedded in index.html so the listing also works for file://
    # previews, where browser fetch() cannot access sibling files.
    safe_json = json.dumps(entries, ensure_ascii=False, separators=(",", ":"))
    safe_json = safe_json.replace("&", "\\u0026").replace("<", "\\u003c").replace(">", "\\u003e")
    page = INDEX_PATH.read_text(encoding="utf-8")
    pattern = re.compile(
        re.escape(DATA_START) + r".*?" + re.escape(DATA_END),
        re.DOTALL,
    )
    replacement = (
        DATA_START + "\n"
        + '<script type="application/json" id="papers-data">' + safe_json + "</script>\n"
        + DATA_END
    )
    updated_page, count = pattern.subn(lambda _: replacement, page, count=1)
    if count != 1:
        raise SystemExit(
            "未找到论文数据插入标记，请确认 index.html 包含 "
            f"{DATA_START} 和 {DATA_END}"
        )
    # Normalize the document ending: exactly one final newline, no accumulated blank lines.
    INDEX_PATH.write_text(updated_page.rstrip() + "\n", encoding="utf-8")

    print(f"已更新 {MANIFEST_PATH.name} 和 index.html，共收录 {len(entries)} 篇。")
    for entry in entries:
        print(f" - {entry['file']}: {entry['description'][:80]}")


if __name__ == "__main__":
    main()
