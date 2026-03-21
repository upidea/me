# 2.2 高级样式

本节深入讲解 RCSS 的高级样式技巧，包括伪类、伪元素、选择器高级用法等。

---

## 一、伪类（Pseudo-classes）

### 1. 交互伪类

```css
/* :hover - 鼠标悬停 */
button:hover {
    background: darkblue;
}

/* :active - 被点击时 */
button:active {
    transform: scale(0.95);
}

/* :focus - 获得焦点 */
input:focus {
    border-color: blue;
    outline: none;
}

/* :disabled - 禁用状态 */
button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

/* :checked - 複選框/單選框選中 */
input[type="checkbox"]:checked + label {
    color: green;
}
```

### 2. 結構偽类

```css
/* :first-child - 第一个子元素 */
.item:first-child {
    border-top: none;
}

/* :last-child - 最後一个子元素 */
.item:last-child {
    border-bottom: none;
}

/* :nth-child(n) - 第 n 個子元素 */
.item:nth-child(1) { color: red; }    /* 第一个 */
.item:nth-child(2) { color: blue; }   /* 第二個 */
.item:nth-child(odd) { background: #f0f0f0; }  /* 奇數行 */
.item:nth-child(even) { background: #fff; }    /* 偶數行 */
.item:nth-child(3n) { color: green; }          /* 每 3 個 */

/* :nth-of-type(n) - 第 n 個同类元素 */
p:nth-of-type(1) {
    font-weight: bold;
}

/* :only-child - 唯一的子元素 */
.icon:only-child {
    margin: auto;
}
```

### 3. 否定偽类

```css
/* :not(selector) - 不匹配選擇器的元素 */
button:not(.primary) {
    background: #ccc;
}

input:not([type="checkbox"]) {
    border: 1px solid #ccc;
}

/* 多个條件 */
.item:not(.active):not(.disabled) {
    cursor: pointer;
}
```

---

## 二、属性选择器高级用法

```css
/* 属性存在 */
input[disabled] {
    background: #eee;
}

/* 属性值等於 */
input[type="text"] {
    width: 200px;
}

/* 属性值包含（空格分隔） */
.element[class~="active"] {
    color: red;
}

/* 属性值以...開頭 */
a[href^="https"] {
    color: green;
}

/* 属性值以...結尾 */
a[href$=".pdf"]::after {
    content: " (PDF)";
}

/* 属性值包含 */
a[href*="example.com"] {
    color: orange;
}

/* 多个属性條件 */
input[type="text"][required][disabled] {
    background: #f5f5f5;
}
```

---

## 三、選擇器組合技巧

### 1. 多重選擇器

```css
/* 同時应用於多个元素 */
h1, h2, h3, h4, h5, h6 {
    margin-top: 0;
    color: #333;
}

/* 组合类别 */
.btn.primary, .btn.danger {
    padding: 10px 20px;
}
```

### 2. 选择器链

```css
/* 多个条件组合 */
button.btn.primary.large {
    font-size: 18px;
    padding: 15px 30px;
}

/* 特定类型的特定类 */
input.text.error {
    border-color: red;
}
```

### 3. 子组合

```css
/* 直接子元素 */
ul > li {
    margin-bottom: 5px;
}

/* 所有後代 */
.sidebar a {
    color: blue;
}

/* 相鄰兄弟 */
h1 + p {
    font-size: 18px;
}

/* 所有兄弟 */
h1 ~ p {
    color: #666;
}
```

---

## 四、过渡效果（Transitions）

### 1. 基本过渡

```css
.button {
    background: blue;
    transition: background 0.3s ease;
}

.button:hover {
    background: darkblue;
}
```

### 2. 多属性过渡

```css
.card {
    transform: scale(1);
    box-shadow: 0 2px 5px rgba(0,0,0,0.2);
    transition:
        transform 0.2s ease,
        box-shadow 0.2s ease;
}

.card:hover {
    transform: scale(1.05);
    box-shadow: 0 5px 15px rgba(0,0,0,0.3);
}
```

### 3. 过渡時機控制

```css
/* 延遲过渡 */
.fade-in {
    opacity: 0;
    transition: opacity 0.3s ease 0.5s;  /* 0.5s 延遲 */
}

/* 僅在进入時过渡 */
.element {
    transition: opacity 0.3s ease;
}

.element.leave {
    opacity: 0;
}
```

### 4. 缓动函数

```css
.ease-in {
    transition-timing-function: ease-in;      /* 慢 -> 快 */
}

.ease-out {
    transition-timing-function: ease-out;     /* 快 -> 慢 */
}

.ease-in-out {
    transition-timing-function: ease-in-out;  /* 慢 -> 快 -> 慢 */
}

.linear {
    transition-timing-function: linear;       /* 勻速 */
}

/* 自定义貝塞爾曲線 */
.custom-ease {
    transition-timing-function: cubic-bezier(0.68, -0.55, 0.265, 1.55);
}
```

---

## 五、变量（自定义属性）

```css
/* 定义变量 */
:root {
    --primary-color: #3498db;
    --secondary-color: #2ecc71;
    --danger-color: #e74c3c;
    --text-color: #333;
    --bg-color: #f5f5f5;
    --spacing: 10px;
}

/* 使用变量 */
.button {
    background: var(--primary-color);
    color: white;
    padding: var(--spacing);
}

.button.danger {
    background: var(--danger-color);
}

/* 帶默認值 */
.element {
    background: var(--custom-bg, #fff);
}
```

---

## 六、進階样式技巧

### 1. 三角形提示

```css
.tooltip {
    position: relative;
}

.tooltip::after {
    content: "";
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -5px;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-top: 5px solid #333;
}
```

### 2. 图片遮罩

```css
.image-container {
    position: relative;
    overflow: hidden;
}

.image-container::after {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
        90deg,
        transparent,
        rgba(255,255,255,0.3),
        transparent
    );
    transition: left 0.5s;
}

.image-container:hover::after {
    left: 100%;
}
```

### 3. 按钮波纹效果

```css
.button {
    position: relative;
    overflow: hidden;
}

.button::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    background: rgba(255,255,255,0.3);
    border-radius: 50%;
    transform: translate(-50%, -50%);
    transition: width 0.3s, height 0.3s;
}

.button:active::after {
    width: 200px;
    height: 200px;
}
```

### 4. 毛玻璃效果

```css
.glass-panel {
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.2);
}
```

### 5. 渐变邊框

```css
.gradient-border {
    position: relative;
    background: #fff;
}

.gradient-border::before {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: inherit;
    padding: 2px;
    background: linear-gradient(45deg, #ff0000, #00ff00, #0000ff);
    -webkit-mask: linear-gradient(#fff 0 0) content-box,
                  linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
}
```

---

## 七、主題化技巧

### 1. 深色/浅色主题

```css
/* 默認（浅色）主題 */
:root {
    --bg-primary: #ffffff;
    --bg-secondary: #f5f5f5;
    --text-primary: #333333;
    --text-secondary: #666666;
}

/* 深色主题 */
[data-theme="dark"] {
    --bg-primary: #1a1a2e;
    --bg-secondary: #16213e;
    --text-primary: #eeeeee;
    --text-secondary: #b0b0b0;
}

/* 使用主題变量 */
body {
    background: var(--bg-primary);
    color: var(--text-primary);
}
```

### 2. 季節主題切換

```css
/* 春節主題 */
[data-theme="spring-festival"] {
    --primary-color: #e74c3c;
    --accent-color: #f1c40f;
}

/* 萬聖節主題 */
[data-theme="halloween"] {
    --primary-color: #ff6600;
    --accent-color: #6a0dad;
}

/* 聖誕節主題 */
[data-theme="christmas"] {
    --primary-color: #c0392b;
    --accent-color: #27ae60;
}
```

---

## 八、實踐练习

### 练习 1：创建按钮變體

设计一套按钮样式：
- 主要按钮（带渐变和悬停效果）
- 次要按钮（outline 風格）
- 危險按钮（紅色主題）
- 禁用状态

### 练习 2：创建卡片组件

设计可复用的卡片：
- 基础卡片（带阴影）
- 可悬停卡片（放大效果）
- 带标签的卡片
- 带图片的卡片

### 练习 3：实现主題切換

实现深色/浅色主题切換功能：
- 定义兩套顏色变量
- 创建主題切換按钮
- 使用数据绑定同步主题状态

---

## 📝 检查清单

- [ ] 掌握常用伪类的用法
- [ ] 理解属性选择器的高级用法
- [ ] 能够使用过渡效果
- [ ] 了解 CSS 变量的使用
- [ ] 能够实现主題切換
