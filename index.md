---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "About Me"
  text: "Always a learner, always on the road."
#   tagline: upidea.com 出品
  actions:
    - theme: brand
      text: 项目清单
      link: /projects
      target: "_blank"
      rel: "noopener noreferrer"
    - theme: alt
      text: 更新日志
      link: /changelog
    - theme: alt
      text: 开发随记
      link: /development/

features:
  - title: Bigger than Ever
    details: 跬步江河，遇见更好
  - title: A Life Well-Lived
    details: 心怀山海，向阳而生
  - title: What's Past is Prologue
    details: 一切过往，皆为序章
---
<!--@include: ./README.md-->


<!--
```pre
<script setup>
import { useData } from 'vitepress'

const { theme, page, frontmatter } = useData()
</script>

## Results

### Theme Data
<pre>{{ theme }}</pre>

### Page Data
<pre>{{ page }}</pre>

### Page Frontmatter
<pre>{{ frontmatter }}</pre>
```
-->
