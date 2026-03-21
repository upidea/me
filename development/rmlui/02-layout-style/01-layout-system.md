# 2.1 布局系统

RmlUi 提供了强大的布局系统，包括块级布局、Flexbox 和绝对定位。本节将深入讲解这些布局技术。

---

## 一、布局模式概述

| 布局模式 | display 值 | 说明 |
|----------|------------|------|
| 块级布局 | `block` | 传统垂直堆叠布局 |
| 行内布局 | `inline` | 元素水平排列 |
| 行内块级 | `inline-block` | 行内排列但可设置尺寸 |
| Flexbox | `flex` | 弹性盒布局（最常用） |
| 无 | `none` | 不显示 |

---

## 二、Flexbox 深度应用

### 1. 主轴与交叉轴

```
Flex 容器 (flex-direction: row)
┌─────────────────────────────────────┐
│  → 主轴 (main axis)                 │
│  ┌────┐ ┌────┐ ┌────┐ ┌────┐       │
│  │ 1  │ │ 2  │ │ 3  │ │ 4  │       │
│  └────┘ └────┘ └────┘ └────┘       │
│  ↑                                  │
│  交叉轴 (cross axis)                │
└─────────────────────────────────────┘
```

### 2. justify-content 详解

```css
/* flex-start: 起点对齐 */
.container {
    display: flex;
    justify-content: flex-start;
}
/* [1][2][3]    */

/* center: 居中 */
.container {
    display: flex;
    justify-content: center;
}
/*    [1][2][3]    */

/* flex-end: 终点对齐 */
.container {
    display: flex;
    justify-content: flex-end;
}
/*    [1][2][3] */

/* space-between: 两端对齐，间隙相等 */
.container {
    display: flex;
    justify-content: space-between;
}
/* [1]    [2]    [3] */

/* space-around: 每个元素两侧间隙相等 */
.container {
    display: flex;
    justify-content: space-around;
}
/*  [1]  [2]  [3]  */

/* space-evenly: 所有间隙完全相等 */
.container {
    display: flex;
    justify-content: space-evenly;
}
/*   [1]   [2]   [3]   */
```

### 3. align-items 详解

```css
/* stretch: 默认，拉伸填充 */
.container {
    display: flex;
    align-items: stretch;
}

/* flex-start: 交叉轴起点对齐 */
.container {
    display: flex;
    align-items: flex-start;
}

/* center: 交叉轴居中 */
.container {
    display: flex;
    align-items: center;
}

/* flex-end: 交叉轴终点对齐 */
.container {
    display: flex;
    align-items: flex-end;
}
```

### 4. flex 子元素属性

```css
.item {
    /* flex: grow shrink basis */

    /* 等分容器 */
    flex: 1;

    /* 固定宽度，不伸缩 */
    flex: 0 0 200px;

    /* 可伸缩，基准 100px */
    flex: 1 1 100px;
}

/* 单独设置 */
.item {
    flex-grow: 1;        /* 放大比例 */
    flex-shrink: 1;      /* 缩小比例 */
    flex-basis: auto;    /* 基准尺寸 */

    /* 自定义交叉轴对齐 */
    align-self: center;  /* 覆蓋容器的 align-items */

    /* 改变顺序 */
    order: 2;            /* 数字越大越靠后 */
}
```

---

## 三、實用布局模式

### 1. 完美居中

```css
/* 方法 1: Flexbox（推荐） */
.center-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
}

/* 方法 2: 绝对定位 + transform */
.center-container {
    position: relative;
}
.centered-element {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
```

### 2. 圣杯布局（三栏）

```css
.holy-grail {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
}

.header {
    flex: 0 0 auto;
}

.main-content {
    display: flex;
    flex: 1 1 auto;
}

.sidebar-left {
    flex: 0 0 200px;
    order: 1;
}

.content {
    flex: 1 1 auto;
    order: 2;
}

.sidebar-right {
    flex: 0 0 200px;
    order: 3;
}

.footer {
    flex: 0 0 auto;
}
```

### 3. 网格布局（使用 Flexbox）

```css
/* 响应式网格 */
.grid-container {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
}

.grid-item {
    flex: 0 0 calc(33.333% - 7px);  /* 3 列 */
}

/* 适配小屏幕 */
@media (max-width: 768px) {
    .grid-item {
        flex: 0 0 calc(50% - 5px);  /* 2 列 */
    }
}

@media (max-width: 480px) {
    .grid-item {
        flex: 0 0 100%;  /* 1 列 */
    }
}
```

### 4. 粘性页脚"

```css
.page {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
}

.content {
    flex: 1 0 auto;  /* 推动页脚到底部 */
}

.footer {
    flex: 0 0 auto;
}
```

### 5. 侧边栏布局"

```css
.layout-with-sidebar {
    display: flex;
    min-height: 100vh;
}

.sidebar {
    flex: 0 0 250px;
    background: #2c3e50;
}

.main {
    flex: 1 1 auto;
    display: flex;
    flex-direction: column;
}

.topbar {
    flex: 0 0 60px;
    background: #34495e;
}

.content {
    flex: 1 1 auto;
    padding: 20px;
    overflow: auto;
}
```

---

## 四、絕對定位

### 1. 定位参考

```css
/* 相对于最近的非 static 定位祖先元素 */"
.parent {
    position: relative;  /* 或 absolute/fixed */
}

.child {
    position: absolute;
    top: 10px;
    right: 10px;
}

/* 相对于视口 */
.fixed-element {
    position: fixed;
    bottom: 20px;
    right: 20px;
}
```

### 2. 全宽覆盖"

```css
.overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 1000;
}
```

### 3. 提示框定位

```css
.tooltip-container {
    position: relative;
}

.tooltip {
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    white-space: nowrap;
    z-index: 100;
}
```

---

## 五、高级布局技巧

### 1. 等高分栏"

```css
.equal-height-columns {
    display: flex;
}

.column {
    flex: 1;
    /* 所有列自动等高 */
}
```

### 2. 自动换行标签

```css
.tag-container {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
}

.tag {
    flex: 0 0 auto;  /* 不伸縮 */
    padding: 4px 12px;
    background: #3498db;
    border-radius: 3px;
}
```

### 3. 顺序控制

```css
/* 视觉顺序与 DOM 顺序分离 */
.container {
    display: flex;
    flex-direction: column;
}

@media (min-width: 768px) {
    .container {
        flex-direction: row;
    }

    .sidebar {
        order: -1;  /* 在桌面上移到左侧 */
    }
}
```

### 4. 边距自动分隔

```css
/* 将两个元素推到两端 */
.nav-bar {
    display: flex;
    align-items: center;
}

.logo {
    margin-right: auto;  /* 右侧自动边距，推到左边 */
}

/* 或 */
.nav-left {
    margin-right: auto;
}

.nav-right {
    margin-left: auto;
}
```

---

## 六、實戰示例

### 示例 1：游戏 HUD

```css
.hud {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    pointer-events: none;  /* 让点击穿透 */
}

.hud-top {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: space-between;
    padding: 20px;
    pointer-events: auto;
}

.health-bar {
    width: 300px;
    height: 20px;
    background: rgba(0,0,0,0.5);
    border: 2px solid #fff;
}

.health-fill {
    width: 80%;
    height: 100%;
    background: linear-gradient(to right, #e74c3c, #c0392b);
}

.minimap {
    width: 150px;
    height: 150px;
    border: 2px solid #fff;
    background: rgba(0,0,0,0.3);
}
```

### 示例 2：库存界面

```css
.inventory {
    display: flex;
    flex-direction: column;
    background: rgba(0, 0, 0, 0.9);
    border: 2px solid #666;
    border-radius: 8px;
    padding: 20px;
    width: 600px;
}

.inventory-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
}

.inventory-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
}

.item-slot {
    width: 64px;
    height: 64px;
    border: 1px solid #444;
    background: rgba(255,255,255,0.05);
    display: flex;
    justify-content: center;
    align-items: center;
}

.item-slot:hover {
    border-color: #fff;
    background: rgba(255,255,255,0.1);
}

.inventory-footer {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    margin-top: 15px;
}
```

### 示例 3：对话框

```css
.dialog-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.6);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}

.dialog {
    background: #fff;
    border-radius: 8px;
    min-width: 400px;
    max-width: 600px;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
}

.dialog-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 20px;
    border-bottom: 1px solid #eee;
}

.dialog-title {
    font-size: 18px;
    font-weight: bold;
    margin: 0;
}

.dialog-close {
    background: none;
    border: none;
    font-size: 24px;
    cursor: pointer;
    color: #999;
}

.dialog-body {
    padding: 20px;
    max-height: 300px;
    overflow-y: auto;
}

.dialog-footer {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    padding: 15px 20px;
    border-top: 1px solid #eee;
}
```

---

## 七、性能建议

1. **优先使用 Flexbox** - 比绝对定位性能更好
2. **避免过度嵌套** - 减少布局计算层级
3. **使用 will-change 谨慎** - 仅对真正需要动画的元素使用
4. **减少重排** - 批量修改样式

---

## 八、实践练习

### 练习 1：创建游戏主界面

设计一个完整的游戏主界面，包含：
- 顶部状态栏（生命、魔法、经验）
- 左侧任务列表
- 右侧小地图"
- 底部技能栏

### 练习 2：创建响应式卡片組

创建一个产品展示页面：
- 大屏幕：4 列
- 中等屏幕：2 列
- 小屏幕：1 列

### 练习 3：创建模态对话框

实现一个可复用的对话框组件：
- 标题栏（带关闭按钮）
- 可滚动内容区"
- 底部按钮组

---

## 📝 检查清单

- [ ] 理解 Flexbox 主轴和交叉轴
- [ ] 掌握 justify-content 和 align-items
- [ ] 能够创建常见的布局模式
- [ ] 理解绝对定位和相对定位
- [ ] 能够创建响应式布局
