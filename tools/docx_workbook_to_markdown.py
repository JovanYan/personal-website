from pathlib import Path
import re

from docx import Document
from docx.table import Table
from docx.text.paragraph import Paragraph


ROOT = Path(__file__).resolve().parents[1]
INPUT = ROOT / "deliverables" / "个人简历网站_内容与照片补充工作簿_已确认版.docx"
OUTPUT = ROOT / "deliverables" / "个人简历网站_内容与照片补充工作簿_已确认版.md"
ASSET_DIR = ROOT / "deliverables" / "5year-diary-screenshots"


def iter_blocks(parent):
    body = parent.element.body
    for child in body.iterchildren():
        if child.tag.endswith("}p"):
            yield Paragraph(child, parent)
        elif child.tag.endswith("}tbl"):
            yield Table(child, parent)


def clean(text):
    return re.sub(r"\s+", " ", text or "").strip()


def escape_table(text):
    return clean(text).replace("|", r"\|")


def paragraph_to_md(p):
    text = clean(p.text)
    if not text:
        return ""
    style = p.style.name if p.style else ""
    if style == "Heading 1":
        return f"# {text}"
    if style == "Heading 2":
        return f"## {text}"
    if style == "Heading 3":
        return f"### {text}"
    if style.startswith("List Bullet"):
        return f"- {text}"
    if style.startswith("List Number"):
        return f"1. {text}"
    return text


def single_cell_to_md(text):
    text = re.sub(r"_+", "", text or "")
    parts = [clean(part) for part in text.splitlines() if clean(part)]
    text = " ".join(parts)
    if not text:
        return ""
    if text.startswith("请补充｜"):
        content = text.removeprefix("请补充｜").strip()
        question, hint = (content.split(" 请", 1) + [""])[:2] if " 请" in content else (content, "")
        result = f"### 待补充：{question.strip()}"
        if hint:
            result += f"\n\n> 提示：请{hint.strip()}"
        result += "\n\n**你的回答：**\n"
        return result
    if text.startswith("需要上传照片｜"):
        return f"### {text}"
    if text.startswith("需要你核实｜"):
        return f"> **需要核实：** {text.removeprefix('需要你核实｜').strip()}"
    if text.startswith("已有信息｜"):
        return f"> **已有信息：** {text.removeprefix('已有信息｜').strip()}"
    if text.startswith("已从简历预填｜"):
        return f"> **已预填：** {text.removeprefix('已从简历预填｜').strip()}"
    return f"> {text}"


def table_to_md(table):
    raw_rows = [[c.text for c in row.cells] for row in table.rows]
    rows = [[escape_table(text) for text in row] for row in raw_rows]
    if not rows:
        return ""
    if len(raw_rows[0]) == 1:
        return single_cell_to_md(raw_rows[0][0])
    if any("项目截图 01｜时间锚点首页" in text for row in raw_rows for text in row):
        return ""

    width = max(len(row) for row in rows)
    rows = [row + [""] * (width - len(row)) for row in rows]
    header = rows[0]
    lines = [
        "| " + " | ".join(header) + " |",
        "| " + " | ".join(["---"] * width) + " |",
    ]
    for row in rows[1:]:
        lines.append("| " + " | ".join(row) + " |")
    return "\n".join(lines)


def normalize_special_blocks(lines):
    output = []
    for line in lines:
        if re.fullmatch(r"SECTION \d+", line):
            continue
        if line.startswith("> **需要上传照片｜AI-01"):
            output.append(line)
            output.append("")
            output.append("![时间锚点首页与年度记忆图谱](5year-diary-screenshots/01-cover.png)")
            output.append("")
            output.append("![同一日期的五年时间轴与当日记录](5year-diary-screenshots/02-diary-view.png)")
            continue
        output.append(line)
    return output


def build():
    doc = Document(INPUT)
    lines = [
        "# 个人简历网站：内容与照片补充工作簿",
        "",
        "> Zhuofan Yan · Markdown working version",
        "",
        "使用方式：按顺序填写所有“待补充”“需要核实”和“需要上传照片”项目。先用中文讲清事实和故事，最终英文文案可以后续统一整理。",
        "",
    ]

    skip_cover_fragments = {
        "PORTFOLIO WEBSITE",
        "个人简历网站 内容与照片补充工作簿",
        "Zhuofan Yan · Website Content Collection",
        "版本：2026-06-22",
    }

    for block in iter_blocks(doc):
        if isinstance(block, Paragraph):
            md = paragraph_to_md(block)
            if not md or clean(block.text) in skip_cover_fragments:
                continue
        else:
            md = table_to_md(block)
            if not md or "使用方式 从第 1 部分开始逐项填写" in clean(block.cell(0, 0).text):
                continue
        lines.extend([md, ""])

    lines = normalize_special_blocks(lines)
    content = "\n".join(lines)
    content = re.sub(r"\n{3,}", "\n\n", content).strip() + "\n"
    OUTPUT.write_text(content, encoding="utf-8")
    print(OUTPUT)


if __name__ == "__main__":
    build()
