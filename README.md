# 🚀 GeekNetwork Lab 极客网络技术博客

基于 VitePress + Vue 3 的高性能、现代化极客网络技术博客与跨境路由优化知识库。

## ✨ 核心特性

- ⚡ **极致性能**：基于 VitePress 纯静态生成，适配 Cloudflare Pages / Netlify / GitHub Pages。
- 🎨 **极客美学 UI**：精心定制的冷白与深灰毛玻璃卡片（Dark Mode 支持），符合极客质感。
- 🔍 **内置全文检索**：集成 VitePress 原生 Local Search，离线即搜。
- 📱 **全客户端覆盖**：收录 Clash Meta、Sing-box、Shadowrocket 等软硬件配置指南。
- 🤖 **SEO 与 IndexNow 自动化**：自动生成 `sitemap.xml`，且在每次 `npm run build` 后自动向搜索引擎集群推送最新链接。

## 🛠️ 本地开发与构建

```bash
# 安装依赖
npm install

# 启动本地开发服务 (http://localhost:3000)
npm run dev

# 生产环境构建并自动触发 IndexNow 推送
npm run build

# 预览打包产物
npm run preview
```

## 📁 目录结构

```text
.
├── docs/
│   ├── .vitepress/
│   │   ├── config.mts          # VitePress 主配置文件
│   │   └── theme/              # 自定义极客主题与样式
│   ├── public/                 # 静态资源与 IndexNow Key
│   ├── index.md                # 落地页 (Hero & Features)
│   ├── recommend/              # 专线与节点推荐栏目
│   ├── reviews/                # 深度横评栏目
│   ├── clients/                # 客户端配置指南
│   ├── faq/                    # 常见问答
│   └── tools/                  # 极客工具箱
├── scripts/
│   └── submit-indexnow.mjs     # IndexNow 自动推送脚本
├── package.json
└── README.md
```
