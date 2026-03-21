# 4.4 滤镜效果

滤镜（Filters）允许你对元素应用各种视觉效果，如模糊、亮度、对比度等，类似于图像处理软件中的滤镜。本节将详细介绍各种滤镜属性的使用方法。

---

## 一、滤镜基础

### 1.1 什么是滤镜

滤镜是对元素渲染输出进行后处理的效果，可以修改元素的外观而不改变其内容。

### 1.2 滤镜类型

RmlUi 支持的滤镜类型：
- 模糊（Blur）
- 亮度（Brightness）
- 对比度（Contrast）
- 饱和度（Saturate）
- 色相旋转（Hue Rotate）
- 反色（Invert）
- 不透明度（Opacity）
- 褐色（Sepia）
- 灰度（Grayscale）
- 阴影（Drop Shadow）

---

## 二、滤镜属性

### 2.1 filter

简写属性，用于应用一个或多个滤镜。

```css
/* 单个滤镜 */
.element {
    filter: blur(5px);
}

/* 多个滤镜 */
.element {
    filter: blur(5px) brightness(1.2) contrast(1.1);
}

/* 无滤镜 */
.element {
    filter: none;
}
```

### 2.2 backdrop-filter

背景滤镜，对元素背后的内容应用滤镜效果。

```css
.element {
    backdrop-filter: blur(10px);
}

/* 结合背景色 */
.element {
    background: rgba(255, 255, 255, 0.5);
    backdrop-filter: blur(10px);
}
```

---

## 三、常用滤镜

### 3.1 blur() - 模糊

应用高斯模糊效果。

```css
.element {
    filter: blur(0px);    /* 无模糊 */
}

.element {
    filter: blur(5px);    /* 中等模糊 */
}

.element {
    filter: blur(10px);   /* 强模糊 */
}

.element {
    filter: blur(20px);   /* 非常强模糊 */
}
```

**应用场景**：
- 模态框背景模糊
- 加载状态模糊
- 聚焦效果（非焦点元素模糊）

```css
/* 模态框背景 */
.modal-overlay {
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(5px);
}

/* 聚焦效果 */
.container:hover .item {
    filter: blur(2px);
}

.container:hover .item:hover {
    filter: blur(0);
}
```

### 3.2 brightness() - 亮度

调整元素的亮度。

```css
.element {
    filter: brightness(0);      /* 完全黑 */
}

.element {
    filter: brightness(0.5);    /* 50% 亮度 */
}

.element {
    filter: brightness(1);      /* 正常亮度 */
}

.element {
    filter: brightness(1.5);    /* 150% 亮度 */
}

.element {
    filter: brightness(2);      /* 200% 亮度 */
}
```

**应用场景**：
- 悬停高亮
- 禁用状态变暗
- 动态亮度调整

```css
/* 悬停高亮 */
.button:hover {
    filter: brightness(1.2);
}

/* 禁用状态 */
.button:disabled {
    filter: brightness(0.7);
}
```

### 3.3 contrast() - 对比度

调整元素的对比度。

```css
.element {
    filter: contrast(0);      /* 完全灰 */
}

.element {
    filter: contrast(0.5);    /* 低对比度 */
}

.element {
    filter: contrast(1);      /* 正常对比度 */
}

.element {
    filter: contrast(1.5);    /* 高对比度 */
}

.element {
    filter: contrast(2);      /* 很高对比度 */
}
```

**应用场景**：
- 增强视觉效果
- 禁用状态降低对比度
- 艺术效果

```css
/* 高对比度模式 */
.high-contrast {
    filter: contrast(1.5);
}

/* 柔和效果 */
.soft {
    filter: contrast(0.8);
}
```

### 3.4 saturate() - 饱和度

调整元素的饱和度。

```css
.element {
    filter: saturate(0);      /* 完全灰度 */
}

.element {
    filter: saturate(0.5);    /* 低饱和度 */
}

.element {
    filter: saturate(1);      /* 正常饱和度 */
}

.element {
    filter: saturate(1.5);    /* 高饱和度 */
}

.element {
    filter: saturate(2);      /* 很高饱和度 */
}
```

**应用场景**：
- 黑白效果
- 增强色彩
- 艺术效果

```css
/* 黑白效果 */
.grayscale {
    filter: saturate(0);
}

/* 增强色彩 */
.vibrant {
    filter: saturate(1.5);
}
```

### 3.5 hue-rotate() - 色相旋转

旋转元素的色相。

```css
.element {
    filter: hue-rotate(0deg);     /* 无变化 */
}

.element {
    filter: hue-rotate(90deg);    /* 旋转 90 度 */
}

.element {
    filter: hue-rotate(180deg);   /* 旋转 180 度 */
}

.element {
    filter: hue-rotate(270deg);   /* 旋转 270 度 */
}

.element {
    filter: hue-rotate(360deg);   /* 完整旋转（无变化） */
}
```

**应用场景**：
- 颜色主题切换
- 彩虹效果
- 艺术效果

```css
/* 彩虹动画 */
@keyframes rainbow {
    0% { filter: hue-rotate(0deg); }
    100% { filter: hue-rotate(360deg); }
}

.rainbow {
    animation: rainbow 5s linear infinite;
}
```

### 3.6 invert() - 反色

反转元素的颜色。

```css
.element {
    filter: invert(0);      /* 无变化 */
}

.element {
    filter: invert(0.5);    /* 50% 反色 */
}

.element {
    filter: invert(1);      /* 完全反色 */
}
```

**应用场景**：
- 暗色/亮色主题切换
- 特殊效果
- 调试

```css
/* 主题切换 */
.dark-theme {
    filter: invert(1);
}

/* 调试模式 */
.debug-mode {
    filter: invert(1);
}
```

### 3.7 opacity() - 不透明度

调整元素的不透明度。

```css
.element {
    filter: opacity(0);      /* 完全透明 */
}

.element {
    filter: opacity(0.5);    /* 半透明 */
}

.element {
    filter: opacity(1);      /* 完全不透明 */
}
```

**注意**：与 `opacity` 属性类似，但 `filter: opacity()` 可以与其他滤镜组合使用。

```css
/* 组合滤镜 */
.element {
    filter: blur(2px) opacity(0.8);
}
```

### 3.8 sepia() - 褐色

应用褐色效果，使元素看起来像老照片。

```css
.element {
    filter: sepia(0);      /* 无效果 */
}

.element {
    filter: sepia(0.5);    /* 中等褐色 */
}

.element {
    filter: sepia(1);      /* 完全褐色 */
}
```

**应用场景**：
- 复古效果
- 艺术效果
- 特殊主题

```css
/* 复古照片效果 */
.vintage {
    filter: sepia(0.8) contrast(1.2);
}
```

### 3.9 grayscale() - 灰度

将元素转换为灰度。

```css
.element {
    filter: grayscale(0);      /* 无效果 */
}

.element {
    filter: grayscale(0.5);    /* 50% 灰度 */
}

.element {
    filter: grayscale(1);      /* 完全灰度 */
}
```

**应用场景**：
- 黑白效果
- 禁用状态
- 艺术效果

```css
/* 禁用状态 */
.button:disabled {
    filter: grayscale(1);
}

/* 黑白照片 */
.black-white {
    filter: grayscale(1);
}
```

### 3.10 drop-shadow() - 阴影

为元素添加阴影效果。

```css
/* 基本语法 */
.element {
    filter: drop-shadow(offset-x offset-y blur-radius color);
}

/* 示例 */
.element {
    filter: drop-shadow(5px 5px 10px rgba(0, 0, 0, 0.5));
}

/* 只设置偏移 */
.element {
    filter: drop-shadow(10px 10px #000);
}

/* 只设置模糊 */
.element {
    filter: drop-shadow(0 0 10px rgba(0, 0, 0, 0.5));
}
```

**与 box-shadow 的区别**：
- `drop-shadow` 作用于元素轮廓（包括透明区域）
- `box-shadow` 作用于元素的盒模型

```css
/* 透明元素的阴影 */
.icon {
    filter: drop-shadow(0 0 5px rgba(0, 0, 0, 0.5));
}

/* 多重阴影 */
.element {
    filter: 
        drop-shadow(5px 5px 10px rgba(0, 0, 0, 0.3))
        drop-shadow(-5px -5px 10px rgba(255, 255, 255, 0.3));
}
```

---

## 四、滤镜组合

### 4.1 常见组合

```css
/* 复古效果 */
.vintage {
    filter: sepia(0.8) contrast(1.2) brightness(0.9);
}

/* 高对比度 */
.high-contrast {
    filter: contrast(1.5) brightness(1.1);
}

/* 柔和效果 */
.soft {
    filter: blur(1px) contrast(0.9) saturate(0.8);
}

/* 发光效果 */
.glow {
    filter: brightness(1.3) saturate(1.5);
}

/* 暗淡效果 */
.dim {
    filter: brightness(0.7) contrast(0.8);
}
```

### 4.2 动态滤镜

```css
/* 亮度调整 */
@keyframes brightness-pulse {
    0%, 100% {
        filter: brightness(1);
    }
    50% {
        filter: brightness(1.5);
    }
}

.pulse {
    animation: brightness-pulse 2s ease-in-out infinite;
}

/* 模糊过渡 */
.element {
    transition: filter 0.3s ease-out;
    filter: blur(0);
}

.element:hover {
    filter: blur(2px);
}
```

---

## 五、实际应用示例

### 5.1 模态框背景模糊

```css
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(5px);
    transition: backdrop-filter 0.3s ease-out;
}

.modal-overlay.active {
    backdrop-filter: blur(10px);
}
```

### 5.2 按钮悬停效果

```css
.button {
    padding: 10px 20px;
    background: #3498db;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: filter 0.3s ease-out;
}

.button:hover {
    filter: brightness(1.2);
}

.button:active {
    filter: brightness(0.9);
}

.button:disabled {
    filter: grayscale(1) opacity(0.5);
    cursor: not-allowed;
}
```

### 5.3 图片画廊效果

```css
.gallery-item {
    width: 200px;
    height: 200px;
    transition: filter 0.3s ease-out;
    filter: grayscale(1);
}

.gallery-item:hover {
    filter: grayscale(0) brightness(1.1);
}

/* 聚焦效果 */
.gallery {
    display: grid;
    gap: 10px;
}

.gallery:hover .gallery-item {
    filter: blur(2px) grayscale(0.5);
}

.gallery:hover .gallery-item:hover {
    filter: blur(0) grayscale(0);
}
```

### 5.4 加载状态

```css
.loading {
    filter: blur(2px) grayscale(0.5);
    opacity: 0.7;
}

.loading-text {
    filter: blur(0);
    opacity: 1;
}
```

### 5.5 主题切换

```css
/* 亮色主题 */
.light-theme {
    filter: invert(0);
}

/* 暗色主题 */
.dark-theme {
    filter: invert(1);
}

/* 动画过渡 */
.theme-switch {
    transition: filter 0.3s ease-out;
}
```

### 5.6 特殊效果

```css
/* 发光效果 */
.glow {
    filter: 
        brightness(1.3) 
        saturate(1.5) 
        drop-shadow(0 0 10px rgba(255, 255, 255, 0.5));
}

/* 霓虹效果 */
.neon {
    filter: 
        brightness(1.5) 
        saturate(2) 
        drop-shadow(0 0 5px currentColor);
}

/* 梦幻效果 */
.dream {
    filter: 
        blur(1px) 
        brightness(1.1) 
        saturate(1.2);
}
```

---

## 六、性能优化

### 6.1 滤镜性能

滤镜的性能消耗从高到低：
1. `blur()` - 最消耗性能
2. `drop-shadow()` - 较高
3. 其他滤镜 - 相对较低

### 6.2 优化建议

```css
/* 避免在大量元素上使用滤镜 */
.bad {
    filter: blur(5px);  /* 在大量元素上使用 */
}

/* 使用其他方式替代 */
.good {
    backdrop-filter: blur(5px);  /* 背景模糊 */
}

/* 组合滤镜时注意性能 */
.element {
    filter: blur(2px) brightness(1.1);  /* 合理 */
}

.element {
    filter: blur(10px) brightness(1.5) contrast(1.3);  /* 过多 */
}
```

### 6.3 使用 will-change

```css
/* 提示浏览器优化 */
.animated-element {
    will-change: filter;
    filter: blur(0);
    transition: filter 0.3s ease-out;
}

.animated-element:hover {
    filter: blur(5px);
}
```

---

## 七、常见问题

### 7.1 滤镜不生效

**问题**：设置了滤镜但没有效果。

**原因**：
1. 滤镜值为默认值（如 `brightness(1)`）
2. 元素没有内容
3. 滤镜值无效

**解决方案**：
```css
/* 检查滤镜值 */
.element {
    filter: brightness(1);  /* 无效果 */
    filter: brightness(1.2);  /* 有效 */
}

/* 确保元素有内容 */
.element {
    width: 100px;
    height: 100px;
    background: red;
    filter: blur(5px);
}
```

### 7.2 滤镜性能问题

**问题**：使用滤镜后性能下降。

**解决方案**：
```css
/* 减少模糊半径 */
.bad {
    filter: blur(20px);  /* 性能差 */
}

.good {
    filter: blur(5px);  /* 性能好 */
}

/* 减少滤镜数量 */
.bad {
    filter: blur(5px) brightness(1.2) contrast(1.1) saturate(1.1);
}

.good {
    filter: blur(5px) brightness(1.1);
}
```

### 7.3 滤镜与 z-index

**问题**：滤镜影响元素的层级。

**解决方案**：
```css
/* 使用 backdrop-filter 而不是 filter */
.element {
    backdrop-filter: blur(5px);
    z-index: 10;
}

/* 或使用独立的元素 */
.background {
    filter: blur(5px);
    z-index: 5;
}

.content {
    z-index: 10;
}
```

---

## 八、实战练习

### 练习 1：创建图片滤镜器

创建一个图片滤镜器，可以应用不同的滤镜效果：
- 黑白效果
- 复古效果
- 高对比度
- 模糊效果

### 练习 2：实现主题切换

创建一个带有主题切换的界面：
- 亮色主题
- 暗色主题
- 平滑过渡

### 练习 3：设计加载动画

创建一个带有滤镜效果的加载动画：
- 模糊效果
- 亮度脉冲
- 饱和度变化

### 练习 4：制作交互式画廊

创建一个交互式图片画廊：
- 图片默认灰度
- 悬停时恢复色彩
- 聚焦时模糊其他图片

---

## 九、下一步

继续学习 [渐变与阴影](05-gradients-shadows.md) 来了解更多视觉效果。

---

## 📝 检查清单

- [ ] 理解滤镜的基本概念
- [ ] 掌握所有滤镜属性的使用
- [ ] 能够组合多个滤镜
- [ ] 理解滤镜的性能影响
- [ ] 能够创建常见的滤镜效果
- [ ] 能够解决常见的滤镜问题