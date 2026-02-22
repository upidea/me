---
date: 2026-2-21 15:20:00
---

# 开发随记索引

<script setup>
import { useData, useRoute, withBase } from 'vitepress'  // 只多加了 withBase

const { theme } = useData()
const route = useRoute()

const currentPath = `/${route.path.split('/')[1]}/`
const currentSidebar = theme.value.sidebar?.[currentPath] || []

function flattenItems(items) {
  let result = []
  items.forEach(item => {
    if (item.items) {
      result = result.concat(flattenItems(item.items))
    } else if (item.link) {
      // ⭐ 唯一改动：去掉 .md 并用 withBase 处理
      const cleanLink = item.link.replace(/\.md$/, '')
      result.push({
        text: item.text,
        link: withBase(cleanLink)
      })
    }
  })
  return result
}

const allArticles = flattenItems(currentSidebar)
</script>

<div v-if="allArticles.length === 0">暂无文章</div>
<ul v-else>
  <li v-for="article in allArticles" :key="article.link">
    <a :href="article.link">{{ article.text }}</a>
  </li>
</ul>