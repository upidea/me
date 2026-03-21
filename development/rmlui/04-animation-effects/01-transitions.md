# 4.1 CSS 过渡

CSS 过渡（Transitions）是创建平滑状态变化的最简单方法。本节将详细介绍如何使用过渡效果来增强用户界面的交互体验。

---

## 一、过渡基础

### 1.1 什么是过渡

过渡是指元素从一种状态平滑过渡到另一种状态的效果。当某个属性的值发生变化时，过渡会自动在两者之间进行插值，产生平滑的动画效果。

### 1.2 何时使用过渡

适合使用过渡的场景：
- 按钮悬停效果
- 菜单展开/收起
- 颜色变化
- 大小和位置调整
- 不透明度变化

**不适合**使用过渡的场景：
- 复杂的多步骤动画
- 需要精确控制的动画
- 循环动画（使用关键帧动画）

---

## 二、过渡属性

### 2.1 transition

简写属性，用于一次性设置所有过渡相关的属性。

```css
/* 语法 */
transition: property duration timing-function delay;

/* 示例 */
.button {
    transition: all 0.3s ease-out;
}

/* 多个属性 */
.button {
    transition: 
        background-color 0.3s ease-out,
        transform 0.2s cubic-out,
        opacity 0.4s linear;
}
```

### 2.2 transition-property

指定哪些属性应该应用过渡效果。

```css
/* 单个属性 */
.button {
    transition-property: background-color;
}

/* 多个属性 */
.button {
    transition-property: background-color, transform, opacity;
}

/* 所有属性 */
.button {
    transition-property: all;
}

/* 没有属性 */
.button {
    transition-property: none;
}
```

### 2.3 transition-duration

指定过渡动画的持续时间。

```css
.button {
    transition-duration: 0.3s;  /* 300ms */
}

.button {
    transition-duration: 500ms;  /* 500ms */
}

/* 不同属性使用不同时长 */
.button {
    transition-duration: 
        background-color 0.3s,
        transform 0.2s,
        opacity 0.4s;
}
```

### 2.4 transition-timing-function

指定过渡动画的时间函数（缓动效果）。

```css
/* 预设缓动函数 */
.button {
    transition-timing-function: ease;        /* 默认 */
}

.button {
    transition-timing-function: linear;      /* 线性 */
}

.button {
    transition-timing-function: ease-in;     /* 慢速开始 */
}

.button {
    transition-timing-function: ease-out;    /* 慢速结束 */
}

.button {
    transition-timing-function: ease-in-out; /* 慢速开始和结束 */
}

/* 自定义缓动函数 */
.button {
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

/* 特殊缓动函数 */
.button {
    transition-timing-function: quadratic-in;
}

.button {
    transition-timing-function: cubic-in;
}

.button {
    transition-timing-function: quartic-out;
}

.button {
    transition-timing-function: exponential-in-out;
}

.button {
    transition-timing-function: elastic-out;
}

.button {
    transition-timing-function: bounce-out;
}
```

**常用缓动函数对比**：

| 函数 | 特点 | 适用场景 |
|------|------|----------|
| `ease` | 默认，平滑 | 通用过渡 |
| `linear` | 匀速 | 进度条、加载动画 |
| `ease-out` | 快速开始，慢速结束 | 按钮悬停、滑块 |
| `ease-in-out` | 慢速开始和结束 | 页面切换、淡入淡出 |
| `cubic-bezier` | 自定义曲线 | 需要精确控制时 |
| `elastic-out` | 弹性效果 | 强调反馈 |
| `bounce-out` | 弹跳效果 | 通知提示 |

### 2.5 transition-delay

指定过渡动画的延迟时间。

```css
.button {
    transition-delay: 0s;    /* 立即开始 */
}

.button {
    transition-delay: 0.5s;  /* 延迟 500ms */
}

.button {
    transition-delay: 1s;    /* 延迟 1s */
}
```

---

## 三、实际应用示例

### 3.1 按钮悬停效果

```css
/* 基础按钮样式 */
.button {
    padding: 10px 20px;
    background: #3498db;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    
    /* 过渡设置 */
    transition: 
        background-color 0.3s ease-out,
        transform 0.2s cubic-out,
        box-shadow 0.3s ease-out;
}

/* 悬停状态 */
.button:hover {
    background: #2980b9;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

/* 点击状态 */
.button:active {
    transform: translateY(0);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

/* 禁用状态 */
.button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}
```

### 3.2 菜单展开/收起

```css
/* 菜单项 */
.menu-item {
    height: 40px;
    opacity: 1;
    overflow: hidden;
    transition: 
        height 0.3s ease-out,
        opacity 0.3s ease-out;
}

/* 隐藏状态 */
.menu-item.collapsed {
    height: 0;
    opacity: 0;
}
```

```xml
<div class="menu">
    <div class="menu-item">项目 1</div>
    <div class="menu-item collapsed">项目 2</div>
    <div class="menu-item collapsed">项目 3</div>
</div>
```

### 3.3 卡片翻转效果

```css
.card {
    width: 200px;
    height: 300px;
    perspective: 1000px;
    cursor: pointer;
}

.card-inner {
    width: 100%;
    height: 100%;
    position: relative;
    transition: transform 0.6s cubic-out;
    transform-style: preserve-3d;
}

.card:hover .card-inner {
    transform: rotateY(180deg);
}

.card-front, .card-back {
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.card-front {
    background: white;
}

.card-back {
    background: #3498db;
    color: white;
    transform: rotateY(180deg);
}
```

### 3.4 进度条动画

```css
.progress-bar {
    width: 200px;
    height: 20px;
    background: #e0e0e0;
    border-radius: 3px;
    overflow: hidden;
}

.progress-fill {
    height: 100%;
    width: 0%;
    background: linear-gradient(to right, #3498db, #2ecc71);
    transition: width 0.5s cubic-out;
}

/* 加载时的脉冲效果 */
.progress-bar.loading .progress-fill {
    width: 100%;
    transition: width 2s linear;
}
```

### 3.5 模态框淡入淡出

```css
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    opacity: 0;
    visibility: hidden;
    transition: 
        opacity 0.3s ease-out,
        visibility 0.3s ease-out;
}

.modal-overlay.visible {
    opacity: 1;
    visibility: visible;
}

.modal {
    width: 400px;
    max-width: 90%;
    background: white;
    border-radius: 8px;
    transform: scale(0.9) translateY(-20px);
    transition: 
        transform 0.3s cubic-out,
        opacity 0.3s ease-out;
    opacity: 0;
}

.modal-overlay.visible .modal {
    transform: scale(1) translateY(0);
    opacity: 1;
}
```

---

## 四、性能优化

### 4.1 使用 GPU 加速

某些属性会触发 GPU 加速，提高性能：

```css
/* 好的属性（GPU 加速） */
.element {
    transition: 
        transform 0.3s ease-out,
        opacity 0.3s ease-out;
}

/* 避免（CPU 渲染） */
.element {
    transition: 
        width 0.3s ease-out,
        height 0.3s ease-out,
        top 0.3s ease-out,
        left 0.3s ease-out;
}
```

### 4.2 减少过渡属性

只对必要的属性应用过渡：

```css
/* 不好的做法 */
.element {
    transition: all 0.3s ease-out;
}

/* 好的做法 */
.element {
    transition: 
        transform 0.3s ease-out,
        opacity 0.3s ease-out;
}
```

### 4.3 使用 will-change 提示

对于复杂动画，可以使用 `will-change` 提示浏览器：

```css
.animated-element {
    will-change: transform, opacity;
    transition: 
        transform 0.3s ease-out,
        opacity 0.3s ease-out;
}
```

**注意**：谨慎使用 `will-change`，只在需要时使用。

---

## 五、高级技巧

### 5.1 延迟交错动画

```css
/* 菜单项 */
.menu-item {
    opacity: 0;
    transform: translateX(-20px);
    transition: 
        opacity 0.3s ease-out,
        transform 0.3s ease-out;
}

/* 显示状态 */
.menu-item.visible {
    opacity: 1;
    transform: translateX(0);
}

/* 交错延迟 */
.menu-item:nth-child(1) { transition-delay: 0.0s; }
.menu-item:nth-child(2) { transition-delay: 0.1s; }
.menu-item:nth-child(3) { transition-delay: 0.2s; }
.menu-item:nth-child(4) { transition-delay: 0.3s; }
```

### 5.2 条件过渡

```css
/* 根据父元素状态应用过渡 */
.parent:hover .child {
    transform: scale(1.1);
}

.child {
    transition: transform 0.3s ease-out;
}
```

### 5.3 过渡与类切换

```css
/* 定义过渡 */
.box {
    width: 100px;
    height: 100px;
    background: #3498db;
    transition: 
        width 0.5s cubic-out,
        background-color 0.3s ease-out;
}

/* 扩展状态 */
.box.expanded {
    width: 200px;
    background: #2ecc71;
}
```

```xml
<!-- 切换类 -->
<div class="box" onclick="toggle_class()"></div>
```

```cpp
// C++ 代码：切换类
void toggle_class() {
    auto element = document->GetElementById("box");
    if (element->IsClassSet("expanded")) {
        element->RemoveClass("expanded");
    } else {
        element->SetClass("expanded", true);
    }
}
```

---

## 六、常见问题

### 6.1 过渡不生效

**问题**：属性变化时没有过渡效果。

**原因**：
1. 没有设置 `transition` 属性
2. 属性不支持过渡（如 `display`）
3. 过渡属性和变化属性不匹配

**解决方案**：
```css
/* 检查过渡设置 */
.element {
    transition: all 0.3s ease-out;  /* 确保设置了过渡 */
}

/* display 不支持过渡，使用其他方式 */
.element {
    opacity: 0;
    visibility: hidden;
    transition: 
        opacity 0.3s ease-out,
        visibility 0.3s ease-out;
}

.element.visible {
    opacity: 1;
    visibility: visible;
}
```

### 6.2 过渡性能问题

**问题**：动画卡顿或掉帧。

**解决方案**：
```css
/* 使用 GPU 加速的属性 */
.element {
    transition: 
        transform 0.3s ease-out,
        opacity 0.3s ease-out;
}

/* 避免频繁触发布局重排 */
.element {
    transition: transform 0.3s ease-out;  /* 好 */
    /* transition: width 0.3s ease-out;  差 */
}
```

### 6.3 过渡时间不一致

**问题**：多个属性过渡时间不同步。

**解决方案**：
```css
/* 为相关属性设置相同的过渡时间 */
.button {
    transition: 
        background-color 0.3s ease-out,
        transform 0.3s ease-out,
        box-shadow 0.3s ease-out;
}
```

---

## 七、实战练习

### 练习 1：创建交互式按钮

创建一个具有以下效果的按钮：
- 悬停时改变颜色和阴影
- 点击时有缩放效果
- 禁用状态有透明度变化

### 练习 2：实现下拉菜单

实现一个带有平滑过渡的下拉菜单：
- 菜单项展开时有高度和透明度过渡
- 使用交错延迟使菜单项依次出现

### 练习 3：设计加载指示器

创建一个加载指示器：
- 进度条填充时有平滑过渡
- 完成时有淡出效果

### 练习 4：制作卡片翻转效果

创建一个可以翻转的卡片：
- 悬停时翻转 180 度
- 正面和背面有不同的内容
- 使用 3D 变换

---

## 八、下一步

继续学习 [关键帧动画](02-keyframe-animation.md) 来创建更复杂的动画效果。

---

## 📝 检查清单

- [ ] 理解过渡的基本概念
- [ ] 掌握所有过渡属性的使用
- [ ] 了解不同的缓动函数
- [ ] 能够创建常见的过渡效果
- [ ] 理解性能优化原则
- [ ] 能够解决常见的过渡问题