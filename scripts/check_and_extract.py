import os
import re

ROOT_DIR = r"c:\Users\Administrator\Desktop\博客归档\ladderbenchmark.com"
DOCS_DIR = os.path.join(ROOT_DIR, "docs")
REVIEWS_DIR = os.path.join(DOCS_DIR, "reviews")

# 6 篇目标评测文件定义
TARGET_REVIEWS = [
    {
        "id": "yunjiexian",
        "file": "yunjiexian-review.md",
        "name": "云界线机场",
        "route": "/reviews/yunjiexian-review",
        "topology": "广深 BGP + IEPL 内网物理专线",
        "telecom": "367.2 Mbps / <0.1% (25ms)",
        "unicom": "373.6 Mbps / <0.1% (22ms)",
        "mobile": "340.0 Mbps / <0.1% (27ms)",
        "connection_speed": "210,000+ Kbps",
        "multiplier_price": "全节点 1x (单 G 低至 ¥0.13)",
        "score": "9.7 / 10.0",
        "best_for": "追求极致晚高峰 0 丢包、骨干物理内网专线办公与高频 AI 生产力 (ChatGPT/Claude 零拦截)"
    },
    {
        "id": "dalaoyun",
        "file": "dalaoyun.md",
        "name": "大佬云机场",
        "route": "/reviews/dalaoyun",
        "topology": "IPLC / IEPL 点对点物理内网专线",
        "telecom": "435.5 Mbps / 0.0% (32ms)",
        "unicom": "448.0 Mbps / 0.0% (38ms)",
        "mobile": "462.1 Mbps / 0.0% (30ms)",
        "connection_speed": "220,000+ Kbps",
        "multiplier_price": "全节点 1x (单 G 低至 ¥0.12)",
        "score": "9.6 / 10.0",
        "best_for": "多设备并发不限速、按量与单 G 低至 ¥0.12 极限性价比、家庭与极客合租共享"
    },
    {
        "id": "huanqiuti",
        "file": "huanqiuti-review.md",
        "name": "环球梯机场",
        "route": "/reviews/huanqiuti-review",
        "topology": "Hysteria 2 / TUIC + 高频 BGP 中继",
        "telecom": "356.8 Mbps / 弱网优化 (39ms)",
        "unicom": "368.8 Mbps / 280M单线程 (38ms)",
        "mobile": "350.4 Mbps / 强穿透 (45ms)",
        "connection_speed": "200,000+ Kbps",
        "multiplier_price": "全节点 1x (单 G 低至 ¥0.15)",
        "score": "9.5 / 10.0",
        "best_for": "晚高峰复杂网络/校园网/高丢包环境，依赖 UDP Hysteria 2 强力穿透与 QoS 突破"
    },
    {
        "id": "shandianshu",
        "file": "shandianshu-review.md",
        "name": "闪电鼠机场",
        "route": "/reviews/shandianshu-review",
        "topology": "端到端 IEPL 物理专线 + 多线 BGP",
        "telecom": "380.0 Mbps / <0.05% (25ms)",
        "unicom": "388.8 Mbps / <0.05% (22ms)",
        "mobile": "369.6 Mbps / <0.05% (24ms)",
        "connection_speed": "225,000+ Kbps",
        "multiplier_price": "全节点真实 1x (单 G 低至 ¥0.14)",
        "score": "9.2 / 10.0",
        "best_for": "全节点 1x 真实倍率拒绝虚假刺客、深港 24ms 极低延迟办公、不限设备并发"
    },
    {
        "id": "shenxing",
        "file": "shenxing-review.md",
        "name": "神行加速",
        "route": "/reviews/shenxing-review",
        "topology": "多线 BGP 中转 + 内网专线 (电竞 FullCone)",
        "telecom": "391.2 Mbps / 0.0% (26ms)",
        "unicom": "400.8 Mbps / 0.0% (23ms)",
        "mobile": "378.4 Mbps / 0.0% (28ms)",
        "connection_speed": "240,000+ Kbps",
        "multiplier_price": "全节点 1x (日均低至 ¥1.1/天)",
        "score": "9.3 / 10.0",
        "best_for": "电竞级 FullCone NAT 穿透、Steam/主机联机外服 0 丢包、外服电竞与语音低抖动"
    },
    {
        "id": "liulianyun",
        "file": "liulianyun-review.md",
        "name": "榴莲云",
        "route": "/reviews/liulianyun-review",
        "topology": "单节点 2.5Gbps IPLC 物理专线",
        "telecom": "451.2 Mbps / 0.0% (23ms)",
        "unicom": "465.6 Mbps / 0.0% (21ms)",
        "mobile": "432.8 Mbps / 0.0% (24ms)",
        "connection_speed": "265,000+ Kbps",
        "multiplier_price": "全节点 1x (旗舰配 750GB 海量包)",
        "score": "9.4 / 10.0",
        "best_for": "单节点 2.5Gbps 超大管道、4K/8K 极限压测与 750GB 海量大包吞吐"
    }
]

print("=== 第一步：本地 6 篇测评源文件完整性校验 ===")
for item in TARGET_REVIEWS:
    file_path = os.path.join(REVIEWS_DIR, item["file"])
    exists = os.path.exists(file_path)
    size = os.path.getsize(file_path) if exists else 0
    print(f"[{'OK' if exists else 'FAIL'}] {item['name']}: {item['file']} ({size} bytes) -> 相对路径: {item['route']}")
