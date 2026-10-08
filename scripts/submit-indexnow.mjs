import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// 项目与 key 配置
const HOST = 'ladderbenchmark.com'
const API_ENDPOINT = 'https://api.indexnow.org/indexnow'
const INDEXNOW_KEY = 'c1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6'
const KEY_LOCATION = `https://${HOST}/${INDEXNOW_KEY}.txt`
const SITEMAP_PATH = path.resolve(__dirname, '../docs/.vitepress/dist/sitemap.xml')

async function submitIndexNow() {
  console.log('🚀 开始自动化 IndexNow 闭环提交流程...')

  if (!fs.existsSync(SITEMAP_PATH)) {
    console.warn(`[IndexNow Warning] 未找到 sitemap.xml 文件于 ${SITEMAP_PATH}，跳过推送。`)
    return
  }

  try {
    const xmlContent = fs.readFileSync(SITEMAP_PATH, 'utf-8')
    
    // 同步备份/写入 docs/public/sitemap.xml 以便追踪保存至 Git 仓库
    const PUBLIC_SITEMAP_PATH = path.resolve(__dirname, '../docs/public/sitemap.xml')
    fs.writeFileSync(PUBLIC_SITEMAP_PATH, xmlContent, 'utf-8')
    console.log(`📄 已成功将 sitemap.xml 同步挂载至 docs/public/sitemap.xml`)

    const locMatches = [...xmlContent.matchAll(/<loc>(.*?)<\/loc>/g)]
    const urls = locMatches.map(match => match[1]).filter(Boolean)

    if (urls.length === 0) {
      console.log('ℹ️ sitemap.xml 中未发现有效 URL。')
      return
    }

    console.log(`📡 提取到 ${urls.length} 个站点 URL，准备推送至 IndexNow 搜索引擎集群:`)
    urls.forEach(u => console.log(`   - ${u}`))

    const payload = {
      host: HOST,
      key: INDEXNOW_KEY,
      keyLocation: KEY_LOCATION,
      urlList: urls
    }

    const response = await fetch(API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify(payload)
    })

    if (response.ok || response.status === 200 || response.status === 202) {
      console.log(`✅ [IndexNow Successful] 成功提交 ${urls.length} 个 URL！状态码: ${response.status}`)
    } else {
      const responseText = await response.text()
      console.warn(`⚠️ [IndexNow Response] 提交返回非 200/202 状态: ${response.status} - ${responseText}`)
    }
  } catch (error) {
    console.error('❌ [IndexNow Error] 推送失败 (提示: 可能是测试环境域名未真实注册或无外网连接):', error.message)
  }
}

submitIndexNow()
