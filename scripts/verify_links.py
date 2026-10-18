import os
import re
import sys

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

DOCS_DIR = r"c:\Users\Administrator\Desktop\博客归档\ladderbenchmark.com\docs"
REVIEWS_DIR = os.path.join(DOCS_DIR, "reviews")

def check_file(path):
    with open(path, "r", encoding="utf-8") as f:
        content = f.read()
    links = re.findall(r"\[.*?\]\((/[^)]*?)\)", content)
    for l in links:
        # Strip trailing slash or query
        clean = l.split("#")[0].split("?")[0].lstrip("/")
        if not clean:
            target = os.path.join(DOCS_DIR, "index.md")
        else:
            rel = clean.replace("/", os.sep)
            target_md = os.path.join(DOCS_DIR, rel + ".md")
            target_idx = os.path.join(DOCS_DIR, rel, "index.md")
            target_exact = os.path.join(DOCS_DIR, rel)
            target = target_md if os.path.exists(target_md) else (target_idx if os.path.exists(target_idx) else target_exact)
        valid = os.path.exists(target)
        status = "OK" if valid else "404 BROKEN"
        print(f"[{status}] {os.path.basename(path)} -> {l}")

print("=== Pillar Article Internal Links Validation ===")
check_file(os.path.join(REVIEWS_DIR, "index.md"))

print("\n=== Single Reviews Reverse Links Validation ===")
for f in sorted(os.listdir(REVIEWS_DIR)):
    if f.endswith(".md") and f not in ["index.md", "2026-ladder-benchmark-topology-ranking.md"]:
        check_file(os.path.join(REVIEWS_DIR, f))
