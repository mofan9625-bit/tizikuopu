---
title: "全平台全协议客户端选型与官方配置指南概览"
description: "全面对比 Clash Meta (Mihomo)、Sing-box、Shadowrocket 等主流客户端在 Windows、macOS、iOS 与 Android 平台上的性能与官方教程。"
date: "2026-10-08"
tags: [客户端指南, Clash, Sing-box, Shadowrocket, 官方教程]
---

# 全平台全协议客户端选型与官方配置指南

不同的网络传输协议（如 Hysteria 2、TUIC、VLESS-Reality）与智能分流策略需要搭配最适合的客户端软件，才能发挥出物理专线与优化路由的最佳性能。

本文汇总整理全平台主流客户端的官方入门与高阶配置指南：

---

## 客户端特性与协议支持矩阵

| 客户端软件 | 支持平台 | Hysteria 2 | TUIC v5 | VLESS Reality | 内存占用 | 推荐指数 | 官方详细指南 |
| :--- | :--- | :---: | :---: | :---: | :---: | :---: | :---: |
| **Clash / Mihomo** | Win / Mac / Android / Linux | ✅ | ✅ | ✅ | 中等 (`~ 80MB`) | 🌟🌟🌟🌟🌟 | [查看 Mihomo 配置教程](/clients/clash) |
| **Sing-box** | Win / Mac / iOS / Android / Linux | ✅ | ✅ | ✅ | 极低 (`< 20MB`) | 🌟🌟🌟🌟🌟 | [查看 Sing-box 官方教程](/clients/sing-box) |
| **Shadowrocket** | iOS / iPadOS / macOS | ✅ | ✅ | ✅ | 低 (`~ 40MB`) | 🌟🌟🌟🌟🌟 | [查看 小火箭 iOS 指南](/clients/shadowrocket) |
| **Stash** | iOS / macOS | ✅ | ✅ | ✅ | 中等 (`~ 60MB`) | 🌟🌟🌟🌟 | 基础兼容 Clash 格式 |

---

## 📚 客户端官方指南直达

- 🚀 [**Clash / Mihomo (Clash Meta) 官方快速入门与高阶 YAML 配置指南**](/clients/clash)  
  *包含 Clash Verge Rev 客户端安装、一键订阅导入、TUN 系统级代理与 Fake-IP 规则集调优。*

- ⚡ [**Sing-box 官方全平台上手教程与 JSON 核心配置指南**](/clients/sing-box)  
  *包含全平台 Sing-box 客户端下载、Hysteria 2 / TUIC / VLESS 协议接入、Fake-IP 与 JSON 标准 Schema。*

- 📱 [**Shadowrocket (小火箭) iOS 官方入门与高阶使用指南**](/clients/shadowrocket)  
  *包含 iOS 非大陆区下载购买、扫码/一键订阅、全局“配置”路由规则、UDP Relay 游戏加速与模块导入。*
