export interface AiTool {
  id: string
  name: string
  company: string
  badge: string
  desc: string
  websiteUrl: string
  topicUrl: string
}

export const aiToolsData: AiTool[] = [
  {
    id: 'chatgpt',
    name: 'ChatGPT',
    company: 'OpenAI',
    badge: 'GPT',
    desc: '使用人数最多的通用 AI 助手与对话大模型',
    websiteUrl: 'https://chatgpt.com',
    topicUrl: '/tools/chatgpt'
  },
  {
    id: 'claude',
    name: 'Claude',
    company: 'Anthropic',
    badge: 'CLD',
    desc: '逻辑推理与长文本逻辑能力极强的前沿大模型',
    websiteUrl: 'https://claude.ai',
    topicUrl: '/tools/claude'
  },
  {
    id: 'gemini',
    name: 'Gemini',
    company: 'Google',
    badge: 'GEM',
    desc: '谷歌自研的原生多模态理解与搜索智能大模型',
    websiteUrl: 'https://gemini.google.com',
    topicUrl: '/tools/gemini'
  },
  {
    id: 'grok',
    name: 'Grok',
    company: 'xAI',
    badge: 'GRK',
    desc: '集成实时 X(Twitter) 数据流的极客 AI 助手',
    websiteUrl: 'https://x.ai',
    topicUrl: '/tools/grok'
  },
  {
    id: 'perplexity',
    name: 'Perplexity',
    company: 'Perplexity AI',
    badge: 'PPL',
    desc: '基于权威引用的 AI 对话式搜索引擎与学术助手',
    websiteUrl: 'https://www.perplexity.ai',
    topicUrl: '/tools/perplexity'
  },
  {
    id: 'claude-code',
    name: 'Claude Code',
    company: 'Anthropic',
    badge: 'CCC',
    desc: '专为开发者打造的终端级 Agent 编程工具',
    websiteUrl: 'https://docs.anthropic.com/en/docs/agents-and-tools/claude-code/overview',
    topicUrl: '/tools/claude-code'
  },
  {
    id: 'codex',
    name: 'Codex',
    company: 'OpenAI',
    badge: 'CDX',
    desc: 'OpenAI 强大的代码理解、重构与自动补全引擎',
    websiteUrl: 'https://openai.com/index/openai-codex/',
    topicUrl: '/tools/codex'
  },
  {
    id: 'cursor',
    name: 'Cursor',
    company: 'Anysphere',
    badge: 'CRS',
    desc: '目前口碑极佳的新一代 AI 驱动代码编辑器 IDE',
    websiteUrl: 'https://www.cursor.com',
    topicUrl: '/tools/cursor'
  },
  {
    id: 'microsoft-copilot',
    name: 'Copilot',
    company: 'Microsoft',
    badge: 'COP',
    desc: '深度嵌入 Windows 与 Office 生态的 AI 生产力工具',
    websiteUrl: 'https://copilot.microsoft.com',
    topicUrl: '/tools/copilot'
  },
  {
    id: 'github-copilot',
    name: 'GitHub Copilot',
    company: 'GitHub',
    badge: 'GHC',
    desc: '全球开发者广泛使用的 IDE 代码实时补全扩展',
    websiteUrl: 'https://github.com/features/copilot',
    topicUrl: '/tools/github-copilot'
  },
  {
    id: 'deepseek',
    name: 'DeepSeek',
    company: '深度求索',
    badge: 'DSK',
    desc: '国产开源实力极强的推理与代码大语言模型',
    websiteUrl: 'https://www.deepseek.com',
    topicUrl: '/tools/deepseek'
  },
  {
    id: 'kimi',
    name: 'Kimi',
    company: '月之暗面',
    badge: 'KMI',
    desc: '支持超长无损上下文长文本分析与学术研读',
    websiteUrl: 'https://kimi.moonshot.cn',
    topicUrl: '/tools/kimi'
  },
  {
    id: 'doubao',
    name: '豆包',
    company: '字节跳动',
    badge: 'DBA',
    desc: '响应迅速、功能丰富的多端 AI 对话助手',
    websiteUrl: 'https://www.doubao.com',
    topicUrl: '/tools/doubao'
  },
  {
    id: 'qianwen',
    name: '通义千问',
    company: '阿里云',
    badge: 'QWN',
    desc: '阿里全栈自研的超大规模多模态大语言模型',
    websiteUrl: 'https://tongyi.aliyun.com',
    topicUrl: '/tools/qianwen'
  },
  {
    id: 'yuanbao',
    name: '腾讯元宝',
    company: '腾讯',
    badge: 'YNB',
    desc: '依托微信公众号生态与搜狗搜索的 AI 精准助手',
    websiteUrl: 'https://yuanbao.tencent.com',
    topicUrl: '/tools/yuanbao'
  },
  {
    id: 'yiyan',
    name: '文心一言',
    company: '百度',
    badge: 'WXY',
    desc: '百度推出的知识增强大语言模型与对话服务',
    websiteUrl: 'https://yiyan.baidu.com',
    topicUrl: '/tools/yiyan'
  },
  {
    id: 'poe',
    name: 'Poe',
    company: 'Quora',
    badge: 'POE',
    desc: '集合多家顶尖大模型的综合 AI 平台与机器人工具',
    websiteUrl: 'https://poe.com',
    topicUrl: '/tools/poe'
  },
  {
    id: 'character-ai',
    name: 'Character.AI',
    company: 'Character Tech',
    badge: 'CAI',
    desc: '全球领先的个性化角色对话与虚拟陪伴 AI 社区',
    websiteUrl: 'https://character.ai',
    topicUrl: '/tools/character-ai'
  },
  {
    id: 'notebooklm',
    name: 'NotebookLM',
    company: 'Google',
    badge: 'NLM',
    desc: '基于用户私有文档自动提炼与播客生成的 AI 笔记',
    websiteUrl: 'https://notebooklm.google.com',
    topicUrl: '/tools/notebooklm'
  },
  {
    id: 'midjourney',
    name: 'Midjourney',
    company: 'Midjourney',
    badge: 'MDJ',
    desc: '全球生成质量极其卓越的 AI 艺术绘画创作工具',
    websiteUrl: 'https://www.midjourney.com',
    topicUrl: '/tools/midjourney'
  }
]
