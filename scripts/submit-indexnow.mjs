import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// 项目与 key 配置
const HOST = 'ladderbenchmark.com'
const API_ENDPOINT = 'https://api.indexnow.org/indexnow'
const INDEXNOW_KEY = '4a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d'
const KEY_LOCATION = `https://${HOST}/${INDEXNOW_KEY}.txt`
const SITEMAP_PATH = path.resolve(__dirname, '../docs/.vitepress/dist/sitemap.xml')

async function submitIndexNow() {
  console.log('🚀 开始自动化 IndexNow 闭环提交流程...')

  const PUBLIC_SITEMAP_PATH = path.resolve(__dirname, '../docs/public/sitemap.xml')
  const DIST_SITEMAP_PATH = path.resolve(__dirname, '../docs/.vitepress/dist/sitemap.xml')

  if (fs.existsSync(PUBLIC_SITEMAP_PATH)) {
    fs.copyFileSync(PUBLIC_SITEMAP_PATH, DIST_SITEMAP_PATH)
    console.log(`📄 已成功将静态 docs/public/sitemap.xml 同步挂载至 dist/sitemap.xml`)
  }

  if (!fs.existsSync(DIST_SITEMAP_PATH)) {
    console.warn(`[IndexNow Warning] 未找到 sitemap.xml 文件于 ${DIST_SITEMAP_PATH}，跳过推送。`)
    return
  }

  try {
    const xmlContent = fs.readFileSync(DIST_SITEMAP_PATH, 'utf-8')

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
