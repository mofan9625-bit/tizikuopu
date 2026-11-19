import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

// 扫描目标目录配置（优先 docs，兼顾 src/content 与 src/pages）
const CANDIDATE_DIRS = ['docs', 'src/content', 'src/pages'];
const OUTPUT_FILE = path.join(ROOT_DIR, 'CONTENT_INDEX.md');

// 排除的文件夹与特殊文件
const IGNORED_DIRS = new Set(['.vitepress', 'node_modules', 'dist', 'public', '.git', '.github', 'scratch']);
const IGNORED_FILES = new Set(['go.html', '404.md']);

/**
 * 递归扫描获取所有 .md / .mdx 文件
 */
function scanMarkdownFiles(dir) {
  const results = [];
  if (!fs.existsSync(dir)) return results;

  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.name.startsWith('.') || IGNORED_DIRS.has(entry.name)) {
      continue;
    }

    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...scanMarkdownFiles(fullPath));
    } else if (entry.isFile() && (entry.name.endsWith('.md') || entry.name.endsWith('.mdx'))) {
      if (!IGNORED_FILES.has(entry.name)) {
        results.push(fullPath);
      }
    }
  }
  return results;
}

/**
 * 解析 Frontmatter 与 Markdown 内容
 */
function parseMarkdownFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const stat = fs.statSync(filePath);

  let frontmatterText = '';
  let bodyText = content;

  const fmMatch = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (fmMatch) {
    frontmatterText = fmMatch[1];
    bodyText = content.slice(fmMatch[0].length);
  }

  // 1. 提取 title
  let title = '';
  const titleMatch = frontmatterText.match(/(?:^|\n)title:\s*["']?(.*?)["']?(?:\r?\n|$)/i);
  if (titleMatch && titleMatch[1].trim()) {
    title = titleMatch[1].trim();
  } else {
    const h1Match = bodyText.match(/(?:^|\n)#\s+(.*?)(?:\r?\n|$)/);
    if (h1Match && h1Match[1].trim()) {
      title = h1Match[1].trim();
    } else {
      title = path.basename(filePath, path.extname(filePath));
    }
  }

  // 2. 提取 date / pubDate
  let date = '';
  const dateMatch = frontmatterText.match(/(?:^|\n)(?:date|pubDate):\s*["']?(.*?)["']?(?:\r?\n|$)/i);
  if (dateMatch && dateMatch[1].trim()) {
    date = dateMatch[1].trim();
    // 规范化只取 YYYY-MM-DD
    const isoMatch = date.match(/\d{4}-\d{2}-\d{2}/);
    if (isoMatch) {
      date = isoMatch[0];
    }
  } else {
    // 回退到文件最后修改时间
    date = stat.mtime.toISOString().split('T')[0];
  }

  // 3. 提取 tags / keywords
  const tagList = [];

  // 解析 tags
  const tagsInline = frontmatterText.match(/(?:^|\n)tags:\s*\[(.*?)\]/i);
  if (tagsInline) {
    tagsInline[1].split(',').forEach(t => {
      const clean = t.replace(/["']/g, '').trim();
      if (clean) tagList.push(clean);
    });
  } else {
    const tagsBlock = frontmatterText.match(/(?:^|\n)tags:\s*\n((?:\s*-\s*.*?\r?\n)+)/i);
    if (tagsBlock) {
      tagsBlock[1].split('\n').forEach(line => {
        const item = line.replace(/^\s*-\s*/, '').replace(/["']/g, '').trim();
        if (item) tagList.push(item);
      });
    } else {
      const singleTag = frontmatterText.match(/(?:^|\n)tags:\s*([^[\r\n]+)/i);
      if (singleTag && singleTag[1].trim()) {
        singleTag[1].split(',').forEach(t => {
          const clean = t.replace(/["']/g, '').trim();
          if (clean) tagList.push(clean);
        });
      }
    }
  }

  // 解析 keywords
  const kwInline = frontmatterText.match(/(?:^|\n)keywords:\s*\[(.*?)\]/i);
  if (kwInline) {
    kwInline[1].split(',').forEach(t => {
      const clean = t.replace(/["']/g, '').trim();
      if (clean) tagList.push(clean);
    });
  } else {
    const kwBlock = frontmatterText.match(/(?:^|\n)keywords:\s*\n((?:\s*-\s*.*?\r?\n)+)/i);
    if (kwBlock) {
      kwBlock[1].split('\n').forEach(line => {
        const item = line.replace(/^\s*-\s*/, '').replace(/["']/g, '').trim();
        if (item) tagList.push(item);
      });
    } else {
      const singleKw = frontmatterText.match(/(?:^|\n)keywords:\s*([^[\r\n]+)/i);
      if (singleKw && singleKw[1].trim()) {
        singleKw[1].split(',').forEach(t => {
          const clean = t.replace(/["']/g, '').trim();
          if (clean) tagList.push(clean);
        });
      }
    }
  }

  // 去重 tags
  const uniqueTags = [...new Set(tagList)];

  // 4. 计算 relativePath 与 URL Slug
  const relativePath = path.relative(ROOT_DIR, filePath).replace(/\\/g, '/');

  // 计算 URL Slug (针对 docs/ 下的文件去除 docs/ 前缀与扩展名)
  let slug = '/' + relativePath;
  for (const base of CANDIDATE_DIRS) {
    const prefix = base + '/';
    if (relativePath.startsWith(prefix)) {
      slug = '/' + relativePath.slice(prefix.length);
      break;
    }
  }

  // 去除 .md / .mdx 扩展名
  slug = slug.replace(/\.(md|mdx)$/, '');
  // 处理 /index
  if (slug === '/index') {
    slug = '/';
  } else if (slug.endsWith('/index')) {
    slug = slug.slice(0, -5); // /folder/
  }

  return {
    title,
    date,
    tags: uniqueTags,
    slug,
    relativePath
  };
}

/**
 * 主执行函数
 */
function main() {
  console.log('🚀 开始扫描全站文章并生成索引...');

  const allFiles = [];
  for (const dirName of CANDIDATE_DIRS) {
    const dirPath = path.join(ROOT_DIR, dirName);
    if (fs.existsSync(dirPath)) {
      allFiles.push(...scanMarkdownFiles(dirPath));
    }
  }

  // 去重
  const uniqueFiles = [...new Set(allFiles)];
  console.log(`📁 累计发现 Markdown 文件: ${uniqueFiles.length} 篇`);

  const articles = uniqueFiles.map(parseMarkdownFile);

  // 按发布日期倒序排序（新文章在前）
  articles.sort((a, b) => {
    const cmp = b.date.localeCompare(a.date);
    if (cmp !== 0) return cmp;
    return a.slug.localeCompare(b.slug);
  });

  // 生成 CONTENT_INDEX.md
  const now = new Date();
  const formatTime = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;

  const lines = [
    '# 全站文章索引 (Content Index)',
    '',
    `> **自动生成时间**：${formatTime} ｜ **收录文章总数**：${articles.length} 篇`,
    '> **自动化维护说明**：本文件由 `node scripts/gen-index.js` 自动生成，每次新增或修改文章后运行该脚本可自动增量同步。',
    '',
    '---',
    '',
    '## 📑 文章全景列表 (按发布日期倒序)',
    ''
  ];

  for (const item of articles) {
    const tagDisplay = item.tags.length > 0 ? item.tags.join(', ') : '无标签';
    // 单行格式：包含发布日期、标题链接（相对路径）、URL slug 以及关键词标签
    lines.push(`- **[${item.date}]** [${item.title}](${item.relativePath}) — **Slug:** \`${item.slug}\` ｜ **关键词:** ${tagDisplay}`);
  }

  lines.push(''); // 结尾换行

  fs.writeFileSync(OUTPUT_FILE, lines.join('\n'), 'utf-8');
  console.log(`✅ 索引生成完毕！已写入: ${OUTPUT_FILE}`);
}

main();
