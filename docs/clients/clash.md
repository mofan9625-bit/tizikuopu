---
title: "Clash / Mihomo (Clash Meta) 官方快速入门与高阶配置指南"
description: "全网最详尽的 Clash / Mihomo 官方使用教程，涵盖 Clash Verge Rev 客户端安装、订阅链接导入、TUN 模式配置与 YAML 智能分流规则。"
date: "2026-10-08"
tags: [Clash, Mihomo, Clash Verge, TUN模式, 智能分流, 规则集]
---

# Clash / Mihomo (Clash Meta) 官方快速入门与高阶配置指南

**Mihomo**（原名 **Clash Meta**）是基于原版 Clash 深度二次开发的现代化开源代理内核。相较于传统 Clash，Mihomo 完美支持 **Hysteria 2、TUIC v5、VLESS-Reality、WireGuard** 等前沿极客传输协议，并具备更强大合理的规则集分流能力。

---

## 一、推荐 GUI 客户端选型

由于 Mihomo 是底层核心，推荐配合以下现代化图形客户端使用：

| 客户端名称 | 支持平台 | 内核版本 | 适用人群 | 官方项目链接 |
| :--- | :--- | :--- | :--- | :--- |
| **Clash Verge Rev** | Windows / macOS / Linux | Mihomo 最新版 | 全平台首选，界面美观功能完善 | [GitHub Release](https://github.com/clash-verge-rev/clash-verge-rev) |
| **FlClash** | Win / Mac / Android / Linux | Mihomo 最新版 | 极简极速、多端 UI 统一 | [GitHub Release](https://github.com/chen08209/FlClash) |
| **Clash Nyanpasu** | Windows / macOS / Linux | Mihomo / Clash | 追求极客定制与模块重写 | [GitHub Release](https://github.com/LIBICLI/clash-nyanpasu) |

---

## 二、三步快速上手教程 (以 Clash Verge Rev 为例)

### 步骤 1：获取订阅链接
登录您的机场或专线服务商后台（如**云界线**、**大佬云**等），找到 **“Clash 订阅”** 或 **“Mihomo 订阅”**，一键复制专属订阅 URL。

### 步骤 2：导入配置 Profile
1. 打开 **Clash Verge Rev** 客户端。
2. 点击左侧菜单栏的 **“订阅 (Profiles)”** 选项。
3. 在顶部输入框中粘贴复制的订阅链接，点击 **“导入 (Import)”**。
4. 导入成功后，鼠标**单选激活**该配置文件。

### 步骤 3：开启系统代理与选择节点
1. 切换至左侧 **“代理 (Proxies)”** 页面，选择喜欢的代理分组（如 `自动选择` 或指定低延迟节点）。
2. 在左侧 **“设置 (Settings)”** 开启 **“系统代理 (System Proxy)”** 开关。
3. *(可选极客步骤)*：开启 **“TUN 模式”**，可绕过系统代理限制，为游戏、终端及全局 App 提供系统级透明转发。

---

## 三、进阶 YAML 配置文件官方规范

若需手写或重写 `config.yaml` 配置文件，可参考以下符合 Mihomo 官方规范的标准模板：

```yaml
# ==========================================
# 基础服务端口与日志设置
# ==========================================
port: 7890
socks-port: 7891
mixed-port: 7890
allow-lan: true
bind-address: "*"
mode: rule
log-level: info
ipv6: false

# ==========================================
# 高性能 Fake-IP DNS 模块
# ==========================================
dns:
  enable: true
  listen: 0.0.0.0:1053
  enhanced-mode: fake-ip
  fake-ip-range: 198.18.0.1/16
  default-nameserver:
    - 223.5.5.5
    - 119.29.29.29
  nameserver:
    - https://223.5.5.5/dns-query
    - https://119.29.29.29/dns-query
  fallback:
    - https://1.1.1.1/dns-query
    - https://8.8.8.8/dns-query
  fallback-filter:
    geoip: true
    geoip-code: CN

# ==========================================
# 自动节点订阅与健康检测
# ==========================================
proxy-providers:
  AirportNode:
    type: http
    url: "你的机场订阅链接URL"
    interval: 3600
    path: ./providers/airport.yaml
    health-check:
      enable: true
      interval: 600
      url: http://www.gstatic.com/generate_204

# ==========================================
# 节点策略组 (Proxy Groups)
# ==========================================
proxy-groups:
  - name: 🚀 节点选择
    type: select
    use:
      - AirportNode
    proxies:
      - ⚡ 自动选择
      - DIRECT

  - name: ⚡ 自动选择
    type: url-test
    use:
      - AirportNode
    url: http://www.gstatic.com/generate_204
    interval: 300
    tolerance: 50

  - name: 🤖 AI服务
    type: select
    proxies:
      - 🚀 节点选择
      - ⚡ 自动选择

# ==========================================
# 智能路由分流规则 (Rules)
# ==========================================
rules:
  - GEOIP,LAN,DIRECT,no-resolve
  - GEOSITE,category-ai-chat-us,🤖 AI服务
  - GEOSITE,gfw,🚀 节点选择
  - GEOSITE,cn,DIRECT
  - GEOIP,CN,DIRECT
  - MATCH,🚀 节点选择
```

---

## 四、常见问题与疑难排错

> [!TIP]
> **Q1: 开启系统代理后浏览器无法上网？**
> - 检查是否有其他代理软件（如 IDM、旧版 VPN）残留占用 `7890` 端口。在设置中将 `mixed-port` 修改为 `7893` 重新尝试。

> [!WARNING]
> **Q2: UWP 应用或某些游戏无法走代理？**
> - 普通系统代理仅作用于 HTTP/HTTPS 协议，建议在 Clash Verge 中启用 **TUN 模式** 并安装虚拟网卡驱动。
