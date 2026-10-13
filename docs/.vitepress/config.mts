import { defineConfig } from 'vitepress'

// 统一的推荐、避坑指南、横评与 E-E-A-T 侧边栏结构
const commonSidebar = [
  {
    text: '梯子选型与推荐',
    items: [
      { text: '🏆 2026 高质量梯子推荐排行榜', link: '/recommend/' },
      { text: '🛡️ 2026 梯子选型与防坑指南', link: '/guide/avoid-pitfalls' }
    ]
  },
  {
    text: '深度协议与线路横评',
    items: [
      { text: '深度横评与测速概览', link: '/reviews/' },
      { text: '云界线机场 2026 最新深度评测', link: '/reviews/yunjiexian-review' },
      { text: '大佬云机场 2026 最新深度评测', link: '/reviews/dalaoyun' },
      { text: '环球梯机场 2026 最新深度评测', link: '/reviews/huanqiuti-review' },
      { text: '闪电鼠机场 2026 最新深度评测', link: '/reviews/shandianshu-review' },
      { text: '神行加速 2026 最新深度评测', link: '/reviews/shenxing-review' },
      { text: '榴莲云 2026 最新深度评测', link: '/reviews/liulianyun-review' }
    ]
  },
  {
    text: '评测标准与方法论 (E-E-A-T)',
    items: [
      { text: '📐 评测标准与方法论白皮书', link: '/about/methodology' },
      { text: '🖥️ 测速基准与实测环境规范', link: '/about/benchmarks' }
    ]
  }
]

export default defineConfig({
  lang: 'zh-CN',
  title: 'NodeLadder Lab | 节点梯子拓扑社 - 2026高质量梯子推荐与专线实测',
  titleTemplate: ':title - NodeLadder Lab',
  description: '节点梯子拓扑社（NodeLadder Lab）专注于 2026 高质量梯子推荐、IPLC/IEPL 物理专线晚高峰实测、网络拓扑分析与流媒体 AI 解锁横评。',

  // 部署目标基础路径 (适配 GitHub Pages / Cloudflare / Netlify)
  base: '/',

  // 启用地名化 Clean URLs
  cleanUrls: true,

  // 自动生成 sitemap.xml
  sitemap: {
    hostname: 'https://ladderbenchmark.com'
  },

  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' }],
    ['meta', { name: 'author', content: 'NodeLadder Lab' }],
    ['meta', { name: 'keywords', content: '节点梯子拓扑社, NodeLadder Lab, 梯子推荐, 专线中继, IPLC专线, IEPL专线, 路由优化, Hysteria 2, TUIC, Sing-box, Clash, 智能分流' }],
    ['meta', { name: 'theme-color', content: '#3b82f6' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:locale', content: 'zh_CN' }],
    ['meta', { property: 'og:site_name', content: 'NodeLadder Lab | 节点梯子拓扑社' }]
  ],

  themeConfig: {
    logo: {
      src: '/logo.svg',
      alt: '梯子测速实验室 (LadderBenchmark)'
    },
    siteTitle: 'NodeLadder Lab | 节点梯子拓扑社',

    // 顶部导航栏配置
    nav: [
      { text: '首页', link: '/' },
      {
        text: '梯子推荐',
        items: [
          { text: '🏆 2026 高质量梯子与机场排行榜', link: '/recommend/' },
          { text: '🛡️ 选型与避坑全指南', link: '/guide/avoid-pitfalls' }
        ]
      },
      { text: '深度横评', link: '/reviews/' },
      {
        text: '客户端指南',
        items: [
          { text: '客户端概览与对比', link: '/clients/' },
          { text: 'Clash / Mihomo 配置', link: '/clients/clash' },
          { text: 'Sing-box 核心配置', link: '/clients/sing-box' },
          { text: 'Shadowrocket (小火箭)', link: '/clients/shadowrocket' }
        ]
      },
      { text: '常见 FAQ', link: '/faq/' },
      { text: '前沿工具', link: '/tools/' }
    ],

    // 垂直分类侧边栏
    sidebar: {
      '/recommend/': commonSidebar,
      '/guide/': commonSidebar,
      '/reviews/': commonSidebar,
      '/about/': commonSidebar,
      '/clients/': [
        {
          text: '客户端全生态指南',
          items: [
            { text: '客户端选型与特性对比', link: '/clients/' },
            { text: 'Clash Meta / Mihomo 进阶分流', link: '/clients/clash' },
            { text: 'Sing-box 规则集与全平台配置', link: '/clients/sing-box' },
            { text: 'Shadowrocket iOS 最佳实践', link: '/clients/shadowrocket' }
          ]
        }
      ],
      '/faq/': [
        {
          text: 'FAQ 知识库 (100 题全集)',
          items: [
            { text: '知识库分类总览导航', link: '/faq/' },
            { text: '1. 速度、延迟与晚高峰 (1-20)', link: '/faq/speed' },
            { text: '2. 报错、订阅与规则分流 (21-40)', link: '/faq/rules' },
            { text: '3. 流媒体与 AI 工具解锁 (41-60)', link: '/faq/streaming' },
            { text: '4. 协议演进与网络安全 (61-80)', link: '/faq/protocol' },
            { text: '5. 选型避坑与套餐合租 (81-100)', link: '/faq/guide' }
          ]
        }
      ],
      '/tools/': [
        {
          text: 'AI 工具全景导航',
          items: [
            { text: '🤖 前沿 AI 工具导航总览', link: '/tools/' },
            { text: 'ChatGPT 深度指南', link: '/tools/chatgpt' },
            { text: 'Claude 3.5 Sonnet 指南', link: '/tools/claude' },
            { text: 'Google Gemini 深度指南', link: '/tools/gemini' },
            { text: 'xAI Grok 深度指南', link: '/tools/grok' },
            { text: 'Perplexity AI 搜索指南', link: '/tools/perplexity' },
            { text: 'Claude Code 终端 Agent', link: '/tools/claude-code' },
            { text: 'OpenAI Codex 使用指南', link: '/tools/codex' },
            { text: 'Cursor AI 编辑器指南', link: '/tools/cursor' },
            { text: 'Microsoft Copilot 指南', link: '/tools/copilot' },
            { text: 'GitHub Copilot 插件指南', link: '/tools/github-copilot' },
            { text: 'DeepSeek 深度求索指南', link: '/tools/deepseek' },
            { text: 'Kimi 长文本研读指南', link: '/tools/kimi' },
            { text: '豆包 (字节跳动) 指南', link: '/tools/doubao' },
            { text: '通义千问 (阿里云) 指南', link: '/tools/qianwen' },
            { text: '腾讯元宝 AI 指南', link: '/tools/yuanbao' },
            { text: '文心一言 (百度) 指南', link: '/tools/yiyan' },
            { text: 'Poe 多模型平台指南', link: '/tools/poe' },
            { text: 'Character.AI 虚拟角色', link: '/tools/character-ai' },
            { text: 'NotebookLM 播客生成', link: '/tools/notebooklm' },
            { text: 'Midjourney 绘画指南', link: '/tools/midjourney' }
          ]
        }
      ]
    },

    // 社交链接
    socialLinks: [
      { icon: { svg: '<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Telegram</title><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.96 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.831-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>' }, link: 'https://t.me/jikejiaoliu' }
    ],

    // 本地全文搜索配置
    search: {
      provider: 'local',
      options: {
        translations: {
          button: {
            buttonText: '搜索文档与技术指南...',
            buttonAriaLabel: '搜索文档'
          },
          modal: {
            noResultsText: '未找到相关技术内容',
            resetButtonTitle: '清除搜索条件',
            footer: {
              selectText: '选择',
              navigateText: '切换',
              closeText: '关闭'
            }
          }
        }
      }
    },

    // 页脚配置
    footer: {
      message: '<a href="/about/disclaimer" style="text-decoration: underline; color: var(--vp-c-brand-1);">免责声明与推广披露</a> ｜ <a href="/about/methodology" style="text-decoration: underline; color: var(--vp-c-brand-1);">评测方法论</a> ｜ <a href="/about/benchmarks" style="text-decoration: underline; color: var(--vp-c-brand-1);">测速基准说明</a>',
      copyright: 'Copyright © 2026 NodeLadder Lab (节点梯子拓扑社) · 保留所有权利'
    },

    // 页面级辅助链接
    docFooter: {
      prev: '上一篇',
      next: '下一篇'
    },

    outline: {
      level: [2, 3],
      label: '本文目录'
    },

    returnToTopLabel: '返回顶部',
    sidebarMenuLabel: '菜单',
    darkModeSwitchLabel: '主题外观',
    lightModeSwitchTitle: '切换到浅色模式',
    darkModeSwitchTitle: '切换到深色模式'
  }
})
