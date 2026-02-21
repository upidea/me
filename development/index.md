---
date: 2026-2-21 15:20:00
---

# 开发随记索引

<script setup>
import { useData } from 'vitepress'

const { theme } = useData()

const developmentNotes = theme.value.sidebar
  ?.find(item => item.text === '开发随记')
  ?.items || []

function flattenItems(items) {
  let result = []
  items.forEach(item => {
    if (item.items) {
      result = result.concat(flattenItems(item.items))
    } else if (item.link) {
      // 确保链接是绝对路径
      const link = item.link.startsWith('/') ? item.link : `/${item.link}`
      result.push({
        ...item,
        link
      })
    }
  })
  return result
}

const allArticles = flattenItems(developmentNotes)
</script>

<div v-if="allArticles.length === 0">
  暂无文章
</div>

<ul v-else style="list-style: none; padding: 0; margin: 0;">
  <li v-for="article in allArticles" :key="article.link" style="margin: 0; padding: 2px 0;">
    <a :href="article.link">{{ article.text }}</a>
    <span v-if="article.frontmatter?.date" style="color: #666; font-size: 0.9em; margin-left: 8px;">
      {{ new Date(article.frontmatter.date).toLocaleDateString('zh-CN') }}
    </span>
  </li>
</ul>
