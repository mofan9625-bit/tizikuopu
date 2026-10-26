import os
import re
import sys

if sys.platform == 'win32':
    sys.stdout.reconfigure(encoding='utf-8')

docs_dir = r"docs"
link_regex = re.compile(r'<a\s+([^>]*?)href=["\'](/go(?:/|\.html\?id=)([a-zA-Z0-9_-]+))["\']([^>]*?)>(.*?)</a>', re.DOTALL | re.IGNORECASE)

# 验证映射表定义
KNOWN_IDS = {"yunjiexian", "dalaoyun", "huanqiuti", "liulianyun", "shenxing", "shandianshu"}

total_links = 0
file_counts = {}
compliance_issues = []

for root, dirs, files in os.walk(docs_dir):
    if '.vitepress' in root or 'node_modules' in root or 'public' in root:
        continue
    for f in files:
        if f.endswith(('.md', '.html')):
            path = os.path.join(root, f)
            with open(path, 'r', encoding='utf-8') as fp:
                content = fp.read()
            
            matches = list(link_regex.finditer(content))
            if matches:
                file_counts[path] = len(matches)
                total_links += len(matches)
                for m in matches:
                    before_attrs, full_href, target_id, after_attrs, text = m.groups()
                    all_attrs = (before_attrs + " " + after_attrs).lower()
                    
                    # 检查 target_id 是否合法
                    if target_id not in KNOWN_IDS:
                        compliance_issues.append(f"[{path}] Unknown target id: {target_id}")
                    
                    # 检查 rel 属性是否包含 nofollow, sponsored, noopener, noreferrer
                    rel_match = re.search(r'rel=["\']([^"\']+)["\']', all_attrs)
                    if not rel_match:
                        compliance_issues.append(f"[{path}] Missing rel attribute in: {m.group(0)}")
                    else:
                        rel_val = set(rel_match.group(1).split())
                        required = {"nofollow", "sponsored", "noopener", "noreferrer"}
                        if not required.issubset(rel_val):
                            compliance_issues.append(f"[{path}] rel missing required tokens: {required - rel_val} in {m.group(0)}")

print("=== AFF 链接合规性审计结果 ===")
print(f"总计替换安全内链数: {total_links} 处")
print("涉及文件明细:")
for f, cnt in sorted(file_counts.items()):
    print(f"  - {f}: {cnt} 处")

if compliance_issues:
    print(f"\n[ERROR] 发现 {len(compliance_issues)} 处合规问题:")
    for issue in compliance_issues:
        print(f"  - {issue}")
    sys.exit(1)
else:
    print("\n[SUCCESS] 所有 301 内链 ID 均在映射表中，且 100% 具备 rel=\"nofollow sponsored noopener noreferrer\"！")
