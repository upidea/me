# 1.4 RCSS 基础

RCSS (RmlUi Cascading Style Sheets) 是 RmlUi 的样式系统，基于 CSS2 并引入了一些 CSS3 特性。本节将介绍 RCSS 的基本语法和常用样式。

---

## 一、RCSS 语法基础

### 1. 规则结构

```css
/* 选择器 { 属性：值; } */
selector {
    property: value;
}

/* 示例 */
button {
    background-color: #3498db;
    color: white;
    padding: 10px 20px;
}
```

### 2. 引入方式

```xml
<!-- 外部样式表（推荐） -->
<head>
    <link type="text/rcss" href="style.rcss"/>
</head>

<!-- 内联样式 -->
<head>
    <style>
        body { font-size: 18px; }
    </style>
</head>

<!-- 元素內聯样式 -->
<div style="width: 200px; height: 100px;">内容</div>
```

---

## 二、选择器

### 1. 基础選擇器

```css
/* 类型选择器 - 选择所有 button 元素 */
button {
    background: blue;
}

/* 类别选择器 - 选择 class="primary" 的元素 */
.primary {
    color: red;
}

/* ID 选择器 - 选择 id="submit" 的元素 */"
#submit {
    width: 200px;
}

/* 万用选择器 - 选择所有元素 */"
* {
    box-sizing: border-box;
}
```

### 2. 组合选择器

```css
/* 后代选择器 - 选择 div 内的所有 p */
div p {
    margin: 0;
}

/* 子元素選擇器 - 只選擇直接子元素 */
div > p {
    padding: 10px;
}

/* 相邻兄弟选择器 */"
h1 + p {
    font-weight: bold;
}

/* 伪类选择器 */
button:hover {
    background: darkblue;
}

input:focus {
    border-color: blue;
}
```

### 3. 属性选择器

```css
/* 具有 type 属性的 input */
input[type] {
    border: 1px solid #ccc;
}

/* type 为 text 的 input */
input[type="text"] {
    background: white;
}

/* type 为 checkbox 的 input */
input[type="checkbox"] {
    width: 20px;
    height: 20px;
}
```

### 4. 选择器优先级

```css
/* 优先级从低到高 */
*                    /* 最低 */
button               /* 类型 */
.primary             /* 类别 */
#submit              /* ID */
button.primary       /* 类型 + 类别 */
div button.primary   /* 祖先 + 类型 + 类别 */"
```

---

## 三、盒模型

### 1. 盒模型组成

```
┌─────────────────────────────────┐
│           margin                │
│  ┌───────────────────────────┐  │
│  │         border            │  │
│  │  ┌─────────────────────┐  │  │
│  │  │      padding        │  │  │
│  │  │  ┌───────────────┐  │  │  │
│  │  │  │    content    │  │  │  │
│  │  │  └───────────────┘  │  │  │
│  │  └─────────────────────┘  │  │
│  └───────────────────────────┘  │
└─────────────────────────────────┘
```

### 2. 盒模型属性

```css
.box {
    /* 内容尺寸 */
    width: 200px;
    height: 100px;

    /* 内边距 */
    padding: 10px;              /* 上下左右 */
    padding: 10px 20px;         /* 上下 左右 */
    padding: 10px 20px 15px;    /* 上 左右 下 */
    padding: 10px 20px 15px 5px; /* 上 右 下 左 */

    /* 边框 */
    border: 2px solid #333;
    border-width: 2px;
    border-color: #333;
    border-style: solid;

    /* 圆角 */
    border-radius: 5px;
    border-radius: 10px 20px;   /* 左上右下 右上左下 */

    /* 外边距 */
    margin: 10px;
    margin: 10px auto;          /* 水平居中 */
}
```

### 3. box-sizing

```css
/* 默认：content-box - width 不包含 padding 和 border */"
.element {
    box-sizing: content-box;
    width: 200px;    /* 内容宽度 */
    padding: 20px;   /* 总宽度 = 200 + 40 = 240px */"
}

/* border-box - width 包含 padding 和 border（推荐） */
.element {
    box-sizing: border-box;
    width: 200px;    /* 总宽度 */
    padding: 20px;   /* 内容宽度 = 200 - 40 = 160px */
}
```

---

## 四、常用样式属性

### 1. 文本样式

```css
.text {
    /* 字体 */
    font-family: LatoLatin, Arial, sans-serif;
    font-size: 18px;
    font-weight: bold;          /* 或 400, 700 */
    font-style: italic;

    /* 颜色 */
    color: #333333;
    color: rgb(255, 128, 0);
    color: rgba(255, 128, 0, 0.5);  /* 帶透明度 */

    /* 对齐 */
    text-align: left;
    text-align: center;
    text-align: right;

    /* 间距 */
    line-height: 1.5;           /* 行高 */
    letter-spacing: 1px;        /* 字间距 */

    /* 装饰 */
    text-decoration: underline;
    text-decoration: none;

    /* 阴影 */
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}
```

### 2. 背景样式

```css
.background {
    /* 背景颜色 */
    background-color: #f0f0f0;

    /* 背景图片 */
    background-image: url('textures/bg.png');

    /* 簡寫 */
    background: #f0f0f0 url('textures/bg.png');
}
```

### 3. 定位和布局

```css
.positioned {
    /* 定位模式 */
    position: static;       /* 默認，正常流 */
    position: relative;     /* 相对定位 */"
    position: absolute;     /* 绝对定位 */"
    position: fixed;        /* 固定定位 */

    /* 位置 */
    top: 10px;
    right: 20px;
    bottom: 10px;
    left: 20px;

    /* Z 軸順序 */
    z-index: 10;
}
```

### 4. 显示和可见性

```css
.hidden {
    display: none;          /* 不显示，不占空间 */
}

.invisible {
    visibility: hidden;     /* 不可见，占空间 */"
}

.flex {
    display: flex;          /* 弹性布局 */
}

.block {
    display: block;         /* 块级元素 */
}

.inline-block {
    display: inline-block;  /* 行内块级 */
}
```

**Display 属性详解**：

`display` 属性决定元素的显示方式和布局行为。不同的 `display` 值会影响元素如何占据空间以及与其他元素的关系。

**常见的 Display 值**：

| Display 值 | 说明 | 特点 | 适用场景 |
|-----------|------|------|---------|
| `block` | 块级元素 | 独占一行，可以设置宽高 | 容器、分区 |
| `inline` | 行内元素 | 不独占一行，不能设置宽高 | 文本、标签 |
| `inline-block` | 行内块级 | 不独占一行，可以设置宽高 | 按钮、图标 |
| `flex` | 弹性布局容器 | 子元素可弹性伸缩 | 现代布局系统 |
| `none` | 隐藏元素 | 不占用空间 | 动态显示/隐藏 |

**块级元素 (display: block)**：
- 独占一行，宽度默认填满父容器
- 可以设置 width、height、margin、padding
- 垂直方向的外边距会合并（margin collapsing）

```css
.block {
    display: block;
    width: 200px;
    height: 100px;
    margin: 10px;  /* 上下元素间距 */
}

/* HTML 中的块级元素示例：div, p, h1-h6, ul, li */
```

**行内元素 (display: inline)**：
- 不独占一行，与其他行内元素在一行显示
- 不能设置 width、height
- 可以设置左右 margin 和 padding，但不能设置上下 margin 和 padding
- 宽高由内容决定

```css
.inline {
    display: inline;
    color: blue;
    /* 不能设置 width, height */
}

/* HTML 中的行内元素示例：span, a, b, strong */
```

**行内块级元素 (display: inline-block)**：
- 不独占一行，与其他元素在一行显示
- 可以设置 width、height、margin、padding
- 结合了行内和块级的特点

```css
.inline-block {
    display: inline-block;
    width: 100px;
    height: 50px;
    margin: 5px;
}

/* 常见应用：按钮、图标、徽章 */
```

**弹性布局 (display: flex)**：
- 创建弹性容器，子元素可以灵活排列
- 子元素自动伸缩以适应容器
- 强大的对齐和分布能力

```css
.flex {
    display: flex;
    justify-content: space-between;  /* 主轴对齐 */
    align-items: center;             /* 交叉轴对齐 */
}

/* 适用于：导航栏、卡片布局、复杂界面 */
```

**隐藏元素 (display: none)**：
- 元素完全不显示，不占用任何空间
- 子元素也会被隐藏
- 与 `visibility: hidden` 不同，后者虽然不可见但仍占用空间

```css
.hidden {
    display: none;  /* 完全隐藏，不占用空间 */
}

.invisible {
    visibility: hidden;  /* 不可见，但占用空间 */
}
```

**Display 值对比示例**：

```css
/* 块级元素 */
.block-1 { display: block; background: red; }
.block-2 { display: block; background: blue; }
/* 结果：红色和蓝色块上下排列 */

/* 行内元素 */
.inline-1 { display: inline; background: red; }
.inline-2 { display: inline; background: blue; }
/* 结果：红色和蓝色块左右相邻 */

/* 行内块级元素 */
.ib-1 { display: inline-block; width: 50px; height: 50px; background: red; }
.ib-2 { display: inline-block; width: 50px; height: 50px; background: blue; }
/* 结果：两个50x50的方块左右相邻 */
```

---

## 五、Flexbox 布局

### 1. 容器属性

```css
.flex-container {
    display: flex;

    /* 主轴方向 */
    flex-direction: row;            /* 水平 */
    flex-direction: row-reverse;    /* 水平反向 */
    flex-direction: column;         /* 垂直 */
    flex-direction: column-reverse; /* 垂直反向 */

    /* 主轴对齐 */
    justify-content: flex-start;    /* 起点对齐 */
    justify-content: center;        /* 居中 */
    justify-content: flex-end;      /* 终点对齐 */
    justify-content: space-between; /* 两端对齐 */"
    justify-content: space-around;  /* 均分间隔 */

    /* 交叉轴对齐 */
    align-items: flex-start;        /* 起点对齐 */
    align-items: center;            /* 居中 */
    align-items: flex-end;          /* 终点对齐 */
    align-items: stretch;           /* 拉伸填充 */

    /* 換行 */
    flex-wrap: nowrap;              /* 不換行 */
    flex-wrap: wrap;                /* 換行 */

    /* 多行对齐 */
    align-content: flex-start;
    align-content: center;
    align-content: space-between;
}
```

### 2. 子元素属性

```css
.flex-item {
    /* 伸缩比例 */
    flex: 1;                    /* flex-grow, flex-shrink, flex-basis */
    flex: 0 0 200px;            /* 不伸缩，固定 200px */
    flex-grow: 1;               /* 放大比例 */
    flex-shrink: 0;             /* 不缩小 */
    flex-basis: 200px;          /* 基准尺寸 */"

    /* 自定义对齐 */
    align-self: center;         /* 覆盖容器的 align-items */

    /* 顺序 */
    order: 1;                   /* 数字越小越靠前 */
}
```

### 3. Flexbox 示例

```css
/* 水平居中 */
.center-container {
    display: flex;
    justify-content: center;
    align-items: center;
}

/* 圣杯布局 */
.holy-grail {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
}

.header { flex: 0 0 auto; }
.footer { flex: 0 0 auto; }

.main-content {
    display: flex;
    flex: 1 1 auto;
}

.sidebar { flex: 0 0 200px; }
.content { flex: 1 1 auto; }
```

---

## 六、单位

### 1. 绝对单位

```css
.absolute {
    width: 200px;       /* 像素 */
    height: 10cm;       /* 厘米（较少用） */
}
```

### 2. 相对单位"

```css
.relative {
    /* 相对于父元素字体大小 */
    font-size: 1.5em;       /* 1.5 倍父元素字体 */

    /* 相对于根元素字体大小 */
    font-size: 1.2rem;      /* 1.2 倍根字体 */

    /* 相对于视口 */
    width: 50vw;            /* 視口寬度的 50% */
    height: 100vh;          /* 視口高度的 100% */

    /* 百分比 */
    width: 80%;             /* 父元素寬度的 80% */

    /* dp - 与设备无关的像素（推荐用于游戏 UI） */
    width: 200dp;
    margin: 10dp;
}
```

### 3. 单位选择建议

| 场景 | 推荐单位 | 说明 |
|------|----------|------|
| 游戏 UI | `dp` | 自动適應不同 DPI |
| 固定尺寸 | `px` | 精確控制 |
| 响应式宽度 | `%` | 相对父元素 |
| 全屏元素 | `vw`/`vh` | 相对视口 |
| 字体大小 | `rem` | 相对根字体 |

---

## 七、完整示例

### 示例 1：游戏菜单样式

```css
/* menu.rcss */

body {
    font-family: LatoLatin, Arial, sans-serif;
    font-size: 18px;
    background: #1a1a2e;
    margin: 0;
    padding: 0;
}

#menu-container {
    width: 400px;
    margin: 100px auto;
    text-align: center;
}

.title {
    color: #e94560;
    font-size: 48px;
    font-weight: bold;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
    margin-bottom: 50px;
}

.button-group {
    display: flex;
    flex-direction: column;
    gap: 15px;
}

button {
    background: linear-gradient(to bottom, #3498db, #2980b9);
    color: white;
    border: none;
    border-radius: 5px;
    padding: 15px 30px;
    font-size: 20px;
    cursor: pointer;
    transition: transform 0.1s, background 0.2s;
}

button:hover {
    background: linear-gradient(to bottom, #48a9e8, #3498db);
    transform: scale(1.05);
}

button:active {
    transform: scale(0.98);
}

.version {
    margin-top: 50px;
    color: #666;
    font-size: 14px;
}
```

### 示例 2：角色面板样式

```css
/* character.rcss */

.panel {
    display: flex;
    flex-direction: row;
    background: rgba(0, 0, 0, 0.8);
    border: 2px solid #444;
    border-radius: 10px;
    padding: 20px;
    gap: 20px;
    width: 600px;
}

.avatar {
    flex: 0 0 128px;
}

.avatar img {
    border: 3px solid #gold;
    border-radius: 5px;
}

.info {
    flex: 1;
}

.info h2 {
    color: #f1c40f;
    margin: 0 0 10px 0;
}

.level {
    color: #e74c3c;
    font-weight: bold;
}

.stat-row {
    display: flex;
    align-items: center;
    gap: 10px;
    margin: 10px 0;
}

.stat-row label {
    width: 60px;
    color: #aaa;
}

progress {
    flex: 1;
    height: 20px;
}

.attributes {
    flex: 0 0 150px;
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.attr {
    display: flex;
    justify-content: space-between;
    padding: 8px 12px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 4px;
}

.attr .name {
    color: #bbb;
}

.attr .value {
    color: #3498db;
    font-weight: bold;
}
```

---

## 八、实践练习

### 练习 1：样式化按钮

创建三种不同风格的按钮：
- 主要按钮（蓝色渐变）
- 次要按钮（灰色）
- 危险按钮（红色）

### 练习 2：创建卡片组件

设计一个物品卡片，包含：
- 物品图片
- 物品名称
- 物品描述
- 价格标签

### 练习 3：使用 Flexbox 布局

创建一个三栏布局：
- 左侧边栏（固定 200px）
- 中间内容区（自适应）
- 右侧边栏（固定 200px）

---

## 九、下一步

完成基础学习后，继续 [基本集成](05-first-integration.md) 来完成你的第一个完整应用。

---

## 📝 检查清单

- [ ] 理解 RCSS 语法结构
- [ ] 掌握选择器的使用
- [ ] 理解盒模型
- [ ] 能够使用 Flexbox 布局
- [ ] 了解不同单位的适用场景
