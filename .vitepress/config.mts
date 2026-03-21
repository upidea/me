import { defineConfig, DefaultTheme } from 'vitepress'
import { tasklist } from '@mdit/plugin-tasklist'
import { configureDiagramsPlugin } from 'vitepress-plugin-diagrams'
import markmapPlugin from '@vitepress-plugin/markmap'
// import markdownItInclude from 'markdown-it-include';
// @ts-ignore
import includeAndFixImages from 'vitepress-include-plugin'


import * as fs from 'fs'
import * as path from 'path'
import { fileURLToPath } from 'url'

// --------------------------------------------------------------------------
// 0. Environment & Path Setup
// --------------------------------------------------------------------------
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const DOCS_ROOT = path.resolve(__dirname, '../')

console.log(`[Config] Docs Root: ${DOCS_ROOT}`)

// --------------------------------------------------------------------------
// 1. Natural Sort Logic
// --------------------------------------------------------------------------
function smartSort(textA: string, textB: string): number {
  const chunksA = textA.split(/(\d+)/).filter(Boolean)
  const chunksB = textB.split(/(\d+)/).filter(Boolean)
  const len = Math.min(chunksA.length, chunksB.length)

  for (let i = 0; i < len; i++) {
    const chunkA = chunksA[i]
    const chunkB = chunksB[i]
    const numA = parseInt(chunkA, 10)
    const numB = parseInt(chunkB, 10)

    if (!isNaN(numA) && !isNaN(numB)) {
      if (numA !== numB) return numA - numB
    } else {
      if (chunkA !== chunkB) return chunkA.localeCompare(chunkB)
    }
  }
  return chunksA.length - chunksB.length
}

// --------------------------------------------------------------------------
// 2. Helper Functions
// --------------------------------------------------------------------------

// 提取文件名的系列名（去掉数字部分）
function extractSeriesName(filename: string): string {
  // 例如: "a001.md" -> "a"
  return filename.replace(/\d+.*$/, '')
}

// 获取目录树中最新的修改时间
function getLatestModifiedTime(dirPath: string): number {
  let latestTime = 0

  function walk(currentPath: string) {
    const entries = fs.readdirSync(currentPath, { withFileTypes: true })

    entries.forEach(entry => {
      const fullPath = path.join(currentPath, entry.name)

      if (entry.isDirectory() && !entry.name.startsWith('.')) {
        walk(fullPath)
      } else if (entry.isFile() && entry.name.endsWith('.md')) {
        const stats = fs.statSync(fullPath)
        if (stats.mtimeMs > latestTime) {
          latestTime = stats.mtimeMs
        }
      }
    })
  }

  walk(dirPath)
  return latestTime
}

// --------------------------------------------------------------------------
// 3. Recursive Sidebar Generator
// --------------------------------------------------------------------------
function getRecursiveSidebarItems(dirPath: string, urlPrefix: string) {
  let files: any[] = []
  let directories: any[] = []

  if (!fs.existsSync(dirPath)) return []

  const entries = fs.readdirSync(dirPath, { withFileTypes: true })

  // 处理文件 - 每个文件生成一个链接
  entries
    .filter(e => e.isFile() && e.name.endsWith('.md') && e.name !== 'index.md' && !e.name.startsWith('.'))
    .forEach(e => {
      const filePath = path.join(dirPath, e.name)
      // const stats = fs.statSync(filePath)
      const stats = fs.statSync(filePath, { bigint: false })
      const displayName = e.name.replace('.md', '')
      const series = extractSeriesName(e.name)
      
      files.push({
        text: displayName,
        link: path.join(urlPrefix, e.name).replace(/\\/g, '/'),
        lastModified: stats.mtimeMs,
        series: series,  // 用于分组排序
      })
    })

  // 处理子目录
  entries
    .filter(e => e.isDirectory() && !e.name.startsWith('.'))
    .forEach(e => {
      const subDirPath = path.join(dirPath, e.name)
      const subUrlPrefix = path.join(urlPrefix, e.name).replace(/\\/g, '/') + '/'

      const subItems = getRecursiveSidebarItems(subDirPath, subUrlPrefix)

      if (subItems.length > 0) {
        directories.push({
          text: e.name,
          items: subItems,
          collapsed: true,
          lastModified: getLatestModifiedTime(subDirPath)
        })
      }
    })

  // 按系列分组排序文件
  if (files.length > 0) {
    // 按系列分组
    const seriesGroups = new Map<string, any[]>()
    files.forEach(file => {
      const series = file.series
      if (!seriesGroups.has(series)) {
        seriesGroups.set(series, [])
      }
      seriesGroups.get(series)!.push(file)
    })

    // 对每个系列内的文件按自然排序
    seriesGroups.forEach(group => {
      group.sort((a, b) => smartSort(a.text, b.text))
    })

    // 按系列最新时间排序，然后展开所有文件
    files = Array.from(seriesGroups.entries())
      .sort((a, b) => {
        const timeA = Math.max(...a[1].map(f => f.lastModified))
        const timeB = Math.max(...b[1].map(f => f.lastModified))
        return timeB - timeA
      })
      .flatMap(([_, group]) => group)

    // 移除辅助字段，只保留 VitePress 需要的
    files = files.map(({ series, lastModified, ...rest }) => rest)
  }

  // 目录按最新修改时间排序
  directories.sort((a, b) => {
    if (a.lastModified === 0 && b.lastModified === 0) {
      return smartSort(a.text, b.text)
    }
    return (b.lastModified || 0) - (a.lastModified || 0)
  })

  // 目录也要移除辅助字段
  directories = directories.map(({ lastModified, ...rest }) => rest)

  // 合并：先目录，后文件
  return [...directories, ...files]
}

// --------------------------------------------------------------------------
// 4. Main Sidebar Generator
// --------------------------------------------------------------------------
function generateScopedSidebar() {
  const sidebar: Record<string, any[]> = {}

  const topLevelDirs = fs.readdirSync(DOCS_ROOT, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory() 
      && !dirent.name.startsWith('.') 
      && dirent.name !== '.vitepress'
      && dirent.name !== 'public'
      && dirent.name !== 'node_modules'
    ).map(dirent => dirent.name)

  console.log(`[Config] Found Top-level Directories: ${topLevelDirs.join(', ')}`)

  topLevelDirs.forEach(dirName => {
    const dirPath = path.join(DOCS_ROOT, dirName)
    const routeKey = `/${dirName}/`

    const items = getRecursiveSidebarItems(dirPath, routeKey)

    if (items.length > 0) {
      sidebar[routeKey] = [
        {
          text: dirName,
          items: items,
          collapsed: false
        }
      ]
    }
  })
  return sidebar
}

// --------------------------------------------------------------------------
// 3. Next/Prev Helper
// --------------------------------------------------------------------------
function findFirstLink(items: any[]): { text: string, link: string } | null {
  if (!items || !Array.isArray(items)) return null
  for (const item of items) {
    if (item.link) return { text: item.text, link: item.link }
    if (item.items) {
      const found = findFirstLink(item.items)
      if (found) return found
    }
  }
  return null
}

console.log('--- Generating Sidebar ---')
const mySidebar = generateScopedSidebar()

// 保存到文件，方便查看
// import { writeFileSync } from 'fs'
// writeFileSync('sidebar-output.json', JSON.stringify(mySidebar, null, 2))
// console.log('✅ 侧边栏已保存到 sidebar-output.json')
// console.log(`📊 生成了 ${Object.keys(mySidebar).length} 个侧边栏配置`)

// https://vitepress.dev/reference/site-config
export default defineConfig({
  label: '中文',
  lang: 'zh-CN',
  themeConfig: {
    search: {
      provider: 'local',// algolia
      options: {
        locales: {
          root: {
            translations: {
              button: {
                buttonText: '搜索文档',
                buttonAriaLabel: '搜索文档'
              },
              modal: {
                noResultsText: '无法找到相关结果',
                resetButtonTitle: '清除查询条件',
                footer: {
                  selectText: '选择',
                  navigateText: '切换',
                  closeText: '关闭',
                }
              }
            }
          }
        },
        detailedView: true,
        miniSearch: {
          searchOptions: {
            fuzzy: true,
            prefix: true,
            boost: { title: 2, content: 1 }
          },
        }
      }
    },

    footer: {
      message: '基于 MIT 许可发布',
      copyright: '版权所有 © 2010-至今 upidea.com'
    },
    docFooter: {
      prev: '上一页',
      next: '下一页'
    },
    outline: {
      level: [2, 6], 
      label: '页面导航'
    },
    lastUpdated: {
      text: '最后更新于',
      formatOptions: {
        dateStyle: "short",
        timeStyle: "short",
      },
    },
    langMenuLabel: '多语言',
    returnToTopLabel: '回到顶部',
    sidebarMenuLabel: '菜单',
    skipToContentLabel: '跳转到内容',
    nav: [
      // { text: '首页', link: '/' },
      { text: '项目清单', link: '/projects' },
      { text: '更新纪要', link: '/changelog' },
      { text: '开发随记', link: '/development/' }
    ],
    sidebar: mySidebar,
    socialLinks: [
      { icon: 'github', link: 'https://github.com/upidea/' }
    ]
  },
  base: "/",
  title: "me.upidea.com",
  transformPageData(pageData) {
    if (pageData.relativePath !== 'index.md' && pageData.relativePath.endsWith('index.md')) {
      const parts = pageData.relativePath.split('/')
      if (parts.length >= 2) {
        const section = parts[0]
        const subject = parts[1]

        let sidebarKey = `/${section}/${subject}/`

        // Fallback check
        if (!mySidebar[sidebarKey]) {
          sidebarKey = `/${section}/`
        }

        const group = mySidebar[sidebarKey]
        if (group) {
          const firstNote = findFirstLink(group)
          if (firstNote) {
            pageData.frontmatter.next = {
              text: firstNote.text,
              link: firstNote.link
            }
            pageData.frontmatter.prev = false
          }
        }
      }
    }
  },
  vite: {
    plugins: [
      markmapPlugin({
        width: '100%',
        height: '500px'
      }),
      includeAndFixImages(),
      {
        name: 'escape-interpolation',
        enforce: 'pre',
        transform(code, id) {
          // 如果是 RmlUi 相关的 markdown 文件
          if (id.includes('rmlui') && id.endsWith('.md')) {
            // 使用正则表达式替换 XML 代码块中的 {{ 和 }}
            return code.replace(/```xml\n([\s\S]*?)```/g, (match, content) => {
              // 将 {{ 替换为 {v-pre{
              // 将 }} 替换为 }v-pre}
              const escapedContent = content
                .replace(/\{\{/g, '{v-pre{')
                .replace(/\}\}/g, '}v-pre}')
              return '```xml\n' + escapedContent + '```'
            })
          }
          return code
        }
      }
    ]
  },
  markdown: {
    config: (md) => {
      md.use(tasklist).use(configureDiagramsPlugin, {
        diagramsDir: "public/diagrams",
        publicPath: "/diagrams",
        krokiServerUrl: "https://kroki.io",
        // excludeDiagramTypes: ["mermaid"],`
      });

      // 禁用行内代码的 Vue 插值解析
      const defaultCodeInline = md.renderer.rules.code_inline
      md.renderer.rules.code_inline = (tokens, idx, options, env, self) => {
        tokens[idx].attrSet('v-pre', '')
        return defaultCodeInline(tokens, idx, options, env, self)
      }
    },
    // 禁用所有插值
    interpolate: false
  }
})
