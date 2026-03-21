# 4.3 变换

变换（Transforms）允许你对元素进行平移、旋转、缩放等操作，是实现 2D 和 3D 视觉效果的核心工具。本节将详细介绍各种变换属性的使用方法。

---

## 一、变换基础

### 1.1 什么是变换

变换是指对元素应用几何变换，包括：
- 平移（Translation）
- 旋转（Rotation）
- 缩放（Scaling）
- 倾斜（Skewing）
- 3D 变换

### 1.2 变换坐标系

变换基于元素的**变换原点**（transform-origin）进行。默认情况下，变换原点是元素的中心点。

```css
.element {
    transform-origin: center center;  /* 默认值 */
}
```

---

## 二、2D 变换

### 2.1 translate() - 平移

沿 X 轴和 Y 轴平移元素。

```css
/* 单个方向 */
.element {
    transform: translateX(100px);  /* 向右移动 100px */
}

.element {
    transform: translateY(50px);   /* 向下移动 50px */
}

/* 两个方向 */
.element {
    transform: translate(100px, 50px);  /* X: 100px, Y: 50px */
}

/* 使用百分比 */
.element {
    transform: translate(50%, 100%);  /* 相对于元素自身尺寸 */
}

/* 负值 */
.element {
    transform: translate(-50px, -25px);  /* 向左和向上移动 */
}
```

### 2.2 rotate() - 旋转

旋转元素。

```css
/* 顺时针旋转 */
.element {
    transform: rotate(45deg);  /* 旋转 45 度 */
}

/* 逆时针旋转 */
.element {
    transform: rotate(-45deg);  /* 逆时针旋转 45 度 */
}

/* 使用其他单位 */
.element {
    transform: rotate(1rad);    /* 弧度 */
}

.element {
    transform: rotate(0.5turn); /* 圈 */
}
```

### 2.3 scale() - 缩放

缩放元素。

```css
/* 均匀缩放 */
.element {
    transform: scale(1.5);  /* 放大 1.5 倍 */
}

.element {
    transform: scale(0.5);  /* 缩小 0.5 倍 */
}

/* 非均匀缩放 */
.element {
    transform: scale(2, 1);  /* X: 2倍, Y: 1倍 */
}

.element {
    transform: scaleX(2);   /* 只缩放 X 轴 */
}

.element {
    transform: scaleY(0.5); /* 只缩放 Y 轴 */
}

/* 负值（翻转） */
.element {
    transform: scale(-1, 1);  /* 水平翻转 */
}
```

### 2.4 skew() - 倾斜

倾斜元素。

```css
/* 两个方向 */
.element {
    transform: skew(10deg, 5deg);  /* X: 10度, Y: 5度 */
}

/* 单个方向 */
.element {
    transform: skewX(10deg);  /* 只倾斜 X 轴 */
}

.element {
    transform: skewY(5deg);   /* 只倾斜 Y 轴 */
}
```

### 2.5 组合变换

可以组合多个变换。

```css
/* 组合变换 */
.element {
    transform: 
        translate(100px, 50px) 
        rotate(45deg) 
        scale(1.5);
}

/* 注意顺序很重要 */
.element {
    transform: rotate(45deg) translate(100px);  /* 先旋转，后平移 */
}

.element {
    transform: translate(100px) rotate(45deg);  /* 先平移，后旋转 */
}
```

---

## 三、3D 变换

### 3.1 perspective - 透视

设置 3D 透视效果，使元素看起来有深度感。

```css
/* 在父元素上设置透视 */
.container {
    perspective: 1000px;  /* 透视距离 */
}

.container {
    perspective: none;  /* 禁用 3D 效果 */
}
```

**透视值说明**：
- 值越小，透视效果越强（看起来更近）
- 值越大，透视效果越弱（看起来更远）
- 典型值：500px - 2000px

### 3.2 perspective-origin - 透视原点

设置透视效果的观察点。

```css
.container {
    perspective-origin: 50% 50%;  /* 默认值：中心 */
}

.container {
    perspective-origin: 0% 0%;    /* 左上角 */
}

.container {
    perspective-origin: 100% 100%; /* 右下角 */
}

.container {
    perspective-origin: center top;  /* 顶部中心 */
}
```

### 3.3 transform-origin - 变换原点

设置变换的原点。

```css
.element {
    transform-origin: center center;  /* 默认值 */
}

.element {
    transform-origin: 0% 0%;         /* 左上角 */
}

.element {
    transform-origin: 100% 100%;     /* 右下角 */
}

.element {
    transform-origin: 30% 80%;       /* 自定义位置 */
}

.element {
    transform-origin: 50% 100%;      /* 底部中心（适合旋转） */
}
```

### 3.4 translate3d() - 3D 平移

沿 X、Y、Z 轴平移元素。

```css
.element {
    transform: translate3d(100px, 50px, 200px);
}

/* 单独设置 */
.element {
    transform: translateZ(100px);  /* 沿 Z 轴移动 */
}
```

### 3.5 rotate3d() - 3D 旋转

沿自定义轴旋转元素。

```css
/* 沿 X 轴旋转 */
.element {
    transform: rotateX(45deg);
}

/* 沿 Y 轴旋转 */
.element {
    transform: rotateY(45deg);
}

/* 沿 Z 轴旋转 */
.element {
    transform: rotateZ(45deg);
}

/* 沿自定义轴旋转 */
.element {
    transform: rotate3d(1, 1, 0, 45deg);  /* 沿 (1,1,0) 轴旋转 45 度 */
}
```

### 3.6 scale3d() - 3D 缩放

沿 X、Y、Z 轴缩放元素。

```css
.element {
    transform: scale3d(1.5, 1.2, 0.8);
}

/* 单独设置 */
.element {
    transform: scaleZ(0.5);  /* 沿 Z 轴缩放 */
}
```

### 3.7 transform-style - 变换样式

控制子元素的 3D 渲染。

```css
.container {
    transform-style: flat;     /* 默认：扁平 */
}

.container {
    transform-style: preserve-3d;  /* 保留 3D 效果 */
}
```

### 3.8 backface-visibility - 背面可见性

控制元素背面的可见性。

```css
.element {
    backface-visibility: visible;   /* 默认：可见 */
}

.element {
    backface-visibility: hidden;    /* 隐藏背面 */
}
```

---

## 四、实际应用示例

### 4.1 卡片翻转效果

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

### 4.2 3D 旋转立方体

```css
.cube-container {
    width: 200px;
    height: 200px;
    perspective: 1000px;
}

.cube {
    width: 100%;
    height: 100%;
    position: relative;
    transform-style: preserve-3d;
    transform: rotateX(30deg) rotateY(30deg);
}

.cube-face {
    position: absolute;
    width: 200px;
    height: 200px;
    border: 2px solid #333;
    background: rgba(52, 152, 219, 0.7);
}

.cube-front  { transform: translateZ(100px); }
.cube-back   { transform: rotateY(180deg) translateZ(100px); }
.cube-right  { transform: rotateY(90deg) translateZ(100px); }
.cube-left   { transform: rotateY(-90deg) translateZ(100px); }
.cube-top    { transform: rotateX(90deg) translateZ(100px); }
.cube-bottom { transform: rotateX(-90deg) translateZ(100px); }
```

### 4.3 悬停放大效果

```css
.card {
    width: 200px;
    height: 300px;
    transition: transform 0.3s cubic-out;
    cursor: pointer;
}

.card:hover {
    transform: scale(1.05);
}
```

### 4.4 旋转加载图标

```css
@keyframes spin {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
}

.loader {
    width: 40px;
    height: 40px;
    border: 4px solid #f3f3f3;
    border-top: 4px solid #3498db;
    border-radius: 50%;
    animation: spin 1s linear infinite;
}
```

### 4.5 弹跳按钮

```css
.button {
    padding: 10px 20px;
    background: #3498db;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: transform 0.2s cubic-out;
    transform-origin: center bottom;
}

.button:hover {
    transform: scale(1.1);
}

.button:active {
    transform: scale(0.95);
}
```

### 4.6 3D 倾斜效果

```css
.card {
    width: 300px;
    height: 200px;
    perspective: 1000px;
    transition: transform 0.3s ease-out;
    transform-style: preserve-3d;
}

.card:hover {
    transform: rotateX(10deg) rotateY(10deg);
}
```

### 4.7 弹入动画

```css
@keyframes pop-in {
    0% {
        transform: scale(0);
        opacity: 0;
    }
    50% {
        transform: scale(1.2);
    }
    100% {
        transform: scale(1);
        opacity: 1;
    }
}

.pop-in {
    animation: pop-in 0.5s cubic-out forwards;
}
```

### 4.8 摇摆效果

```css
@keyframes swing {
    0%, 100% {
        transform: rotate(0deg);
        transform-origin: top center;
    }
    20% {
        transform: rotate(15deg);
    }
    40% {
        transform: rotate(-10deg);
    }
    60% {
        transform: rotate(5deg);
    }
    80% {
        transform: rotate(-5deg);
    }
}

.swing {
    animation: swing 1s ease-in-out infinite;
}
```

---

## 五、高级技巧

### 5.1 变换矩阵

```css
/* 使用矩阵进行复杂变换 */
.element {
    transform: matrix(1, 0, 0, 1, 0, 0);  /* 单位矩阵 */
}

.element {
    transform: matrix(1.5, 0, 0, 1.5, 0, 0);  /* 缩放 1.5 倍 */
}

/* 3D 矩阵 */
.element {
    transform: matrix3d(...);
}
```

### 5.2 变换组合

```css
/* 复杂变换组合 */
.element {
    transform: 
        translate3d(100px, 50px, 200px)
        rotate3d(1, 1, 0, 45deg)
        scale3d(1.5, 1.2, 0.8);
}
```

### 5.3 响应式变换

```css
/* 使用百分比进行响应式变换 */
.element {
    transform: translate(50%, 50%);
}

.element {
    transform: scale(1.5);
}

/* 结合媒体查询 */
@media (max-width: 768px) {
    .element {
        transform: scale(1.2);  /* 小屏幕缩小变换 */
    }
}
```

### 5.4 变换原点技巧

```css
/* 不同的变换原点产生不同效果 */
.rotate-center {
    transform-origin: center center;
}

.rotate-bottom {
    transform-origin: 50% 100%;  /* 适合摇摆效果 */
}

.rotate-top-left {
    transform-origin: 0% 0%;  /* 适合门开效果 */
}
```

---

## 六、性能优化

### 6.1 使用 GPU 加速

```css
/* 好的做法：使用 transform */
.element {
    transform: translateX(100px);
}

/* 避免：使用 left/top */
.element {
    left: 100px;  /* 会触发布局重排 */
}
```

### 6.2 使用 will-change

```css
/* 提示浏览器优化 */
.animated-element {
    will-change: transform;
    transform: rotate(45deg);
}

/* 动画完成后移除 */
.animated-element.finished {
    will-change: auto;
}
```

### 6.3 避免频繁变换

```css
/* 好的做法：批量更新 */
.element {
    transform: translate(100px, 50px) rotate(45deg);
}

/* 避免：频繁单独更新 */
.element {
    transform: translate(100px, 0);
}

.element {
    transform: translate(100px, 50px);
}

.element {
    transform: translate(100px, 50px) rotate(45deg);
}
```

---

## 七、常见问题

### 7.1 变换不生效

**问题**：设置了变换但没有效果。

**原因**：
1. 元素不可见
2. 变换值为 0
3. 元素没有尺寸

**解决方案**：
```css
/* 确保元素可见 */
.element {
    width: 100px;
    height: 100px;
    transform: rotate(45deg);
}

/* 检查变换值 */
.element {
    transform: translate(0, 0);  /* 不会产生效果 */
    transform: translate(10px, 10px);  /* 有效 */
}
```

### 7.2 变换后元素重叠

**问题**：变换后的元素与其他元素重叠。

**解决方案**：
```css
/* 使用 z-index 控制层级 */
.element {
    transform: scale(1.5);
    z-index: 10;
}

/* 或者使用 translateZ */
.element {
    transform: scale(1.5) translateZ(100px);
}
```

### 7.3 3D 变换不生效

**问题**：设置了 3D 变换但没有 3D 效果。

**原因**：
1. 没有设置 perspective
2. 没有设置 transform-style: preserve-3d

**解决方案**：
```css
/* 父元素设置透视 */
.container {
    perspective: 1000px;
}

/* 子元素保留 3D 效果 */
.element {
    transform-style: preserve-3d;
    transform: rotateY(45deg);
}
```

---

## 八、实战练习

### 练习 1：创建交互式卡片

创建一个具有以下效果的卡片：
- 悬停时有 3D 倾斜效果
- 点击时有缩放效果
- 双击时有翻转效果

### 练习 2：实现 3D 导航菜单

创建一个带有 3D 效果的导航菜单：
- 菜单项有 3D 旋转效果
- 悬停时有深度变化
- 展开时有 3D 过渡

### 练习 3：设计加载动画

创建一个带有复杂变换的加载动画：
- 多个元素组合旋转
- 使用 3D 变换增强效果
- 平滑的缓动函数

### 练习 4：制作图片画廊

创建一个图片画廊：
- 图片悬停时有放大效果
- 图片有 3D 倾斜效果
- 支持图片翻转查看信息

---

## 九、下一步

继续学习 [滤镜效果](04-filters.md) 来增强视觉表现。

---

## 📝 检查清单

- [ ] 理解 2D 变换的基本用法
- [ ] 掌握 3D 变换的使用方法
- [ ] 理解透视和变换原点
- [ ] 能够创建常见的变换效果
- [ ] 理解变换的性能优化
- [ ] 能够解决常见的变换问题