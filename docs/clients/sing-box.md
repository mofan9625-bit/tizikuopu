---
title: "Sing-box 官方全平台上手教程与 JSON 核心配置指南"
description: "权威 Sing-box 官方指南，包含全平台 Sing-box 客户端下载、订阅链接解析、Hysteria 2 / TUIC / VLESS 协议配置与 TUN 透明代理。"
date: "2026-10-08"
tags: [Sing-box, Hysteria2, TUIC, VLESS-Reality, JSON配置, 官方教程]
---

# Sing-box 官方全平台上手教程与 JSON 核心配置指南

**Sing-box** 是由 SagerNet 团队采用 Go 语言全新编写的现代化通用代理框架。它以**极致的内存利用率 (内存占用低至 `<20MB`)**、**极速的首包建立时间 (RTT)** 以及**原生的多协议支持 (Hysteria 2 / TUIC / VLESS-Reality)** 成为极客圈最被推崇的新一代网络架构。

---

## 一、全平台 Sing-box 官方客户端下载

根据官方文档 ([sing-box.sagernet.org](https://sing-box.sagernet.org))，请根据您的操作系统选择相对应的应用：

| 平台 | 推荐客户端 | 安装途径 / 下载链接 |
| :--- | :--- | :--- |
| **Windows** | Sing-box GUI / NekoBox | [GitHub Releases](https://github.com/SagerNet/sing-box/releases) |
| **macOS** | Sing-box for macOS | App Store / [GitHub Releases](https://github.com/SagerNet/sing-box/releases) |
| **Android** | Sing-box for Android | [Google Play](https://play.google.com/store/apps/details?id=io.nekohasekai.sagernet) / [GitHub APK](https://github.com/SagerNet/sing-box/releases) |
| **iOS / iPadOS** | Sing-box VT | [App Store (非大陆区)](https://apps.apple.com/app/sing-box/id6451272673) |

---

## 二、图形客户端快速配置步骤

### 1. 获取 Sing-box 专用订阅
在机场或专线服务商后台（如**云界线**、**大佬云**）复制 **“Sing-box 订阅链接”** 或 **“Json 链接”**。

### 2. 导入与运行 (以 Sing-box 移动/桌面端为例)
1. 打开 Sing-box 客户端，选择 **“Profiles (配置)”**。
2. 点击 **“New Profile (新建配置)”** -> 选择 **“Type: Remote (远程订阅)”**。
3. 在 `URL` 栏中粘贴订阅地址，设置自动更新时间（如 `86400秒`），点击右上角保存。
4. 勾选激活该配置文件。
5. 切换回 **“Dashboard (仪表盘)”**，开启代理服务开关，并赋予系统 VPN / TUN 授权。

---

## 三、官方标准 `config.json` 进阶配置模板

若需要自定义服务器节点或手动管理 JSON 配置文件，以下是包含 **Hysteria 2 出站**、**Fake-IP DNS** 以及 **TUN 透明代理** 的官方规范模板：

```json
{
  "log": {
    "disabled": false,
    "level": "info",
    "timestamp": true
  },
  "dns": {
    "servers": [
      {
        "tag": "dns_direct",
        "address": "223.5.5.5",
        "detour": "direct"
      },
      {
        "tag": "dns_proxy",
        "address": "https://1.1.1.1/dns-query",
        "address_resolver": "dns_direct",
        "detour": "select-outbound"
      },
      {
        "tag": "dns_fakeip",
        "address": "fakeip"
      }
    ],
    "rules": [
      {
        "outbound": "any",
        "server": "dns_direct"
      },
      {
        "query_type": ["A", "AAAA"],
        "server": "dns_fakeip"
      }
    ],
    "fakeip": {
      "enabled": true,
      "inet4_range": "198.18.0.0/15"
    }
  },
  "inbounds": [
    {
      "type": "tun",
      "tag": "tun-in",
      "interface_name": "sing-tun",
      "inet4_address": "172.19.0.1/30",
      "auto_route": true,
      "strict_route": true,
      "stack": "mixed"
    },
    {
      "type": "mixed",
      "tag": "mixed-in",
      "listen": "127.0.0.1",
      "listen_port": 2080
    }
  ],
  "outbounds": [
    {
      "type": "selector",
      "tag": "select-outbound",
      "outbounds": [
        "hy2-outbound",
        "direct"
      ]
    },
    {
      "type": "hysteria2",
      "tag": "hy2-outbound",
      "server": "hy2.yourserver.com",
      "server_port": 443,
      "up_mbps": 100,
      "down_mbps": 500,
      "password": "your_secure_password",
      "tls": {
        "enabled": true,
        "server_name": "hy2.yourserver.com",
        "insecure": false
      }
    },
    {
      "type": "direct",
      "tag": "direct"
    }
  ],
  "route": {
    "auto_detect_interface": true,
    "rules": [
      {
        "protocol": "dns",
        "action": "hijack-dns"
      },
      {
        "ip_is_private": true,
        "outbound": "direct"
      }
    ]
  }
}
```

---

## 四、协议特性与优化建议

> [!TIP]
> **1. Hysteria 2 QUIC 拥堵控制**
> - 在弱网（如晚高峰移动 4G/5G、校园网丢包严重）环境下，Hysteria 2 能够大幅榨干可用带宽，显著降低高丢包率下的网页首包开销。

> [!IMPORTANT]
> **2. JSON Schema 格式校验**
> - 使用 VS Code 编辑配置文件时，可在文件首行声明官方 Schema 规范：`"$schema": "https://sing-box.sagernet.org/schema.json"`，实现语法智能提示与排错。
