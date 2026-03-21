# 4.5 渐变与阴影

渐变（Gradients）和阴影（Shadows）是创建视觉深度和层次感的重要工具。本节将详细介绍如何使用渐变和阴影来增强界面的视觉效果。

---

## 一、渐变基础

### 1.1 什么是渐变

渐变是指在两个或多个颜色之间创建平滑过渡的效果。RmlUi 支持线性渐变和径向渐变。

### 1.2 渐变类型

- 线性渐变（Linear Gradient）
- 径向渐变（Radial Gradient）
- 锥形渐变（Conic Gradient，部分支持）

---

## 二、线性渐变

### 2.1 linear-gradient 基本语法

```css
/* 基本语法 */
linear-gradient(direction, color-stop1, color-stop2, ...);

/* 简单示例 */
background: linear-gradient(to right, red, blue);
```

### 2.2 方向设置

```css
/* 使用关键字 */
background: linear-gradient(to right, red, blue);
background: linear-gradient(to left, red, blue);
background: linear-gradient(to bottom, red, blue);
background: linear-gradient(to top, red, blue);

/* 对角线 */
background: linear-gradient(to bottom right, red, blue);
background: linear-gradient(to top left, red, blue);

/* 使用角度 */
background: linear-gradient(90deg, red, blue);      /* 从左到右 */
background: linear-gradient(180deg, red, blue);     /* 从上到下 */
background: linear-gradient(45deg, red, blue);      /* 对角线 */
background: linear-gradient(-45deg, red, blue);     /* 反向对角线 */
```

### 2.3 颜色停止点

```css
/* 两个颜色 */
background: linear-gradient(to right, red, blue);

/* 多个颜色 */
background: linear-gradient(to right, red, yellow, green, blue);

/* 指定位置 */
background: linear-gradient(to right, 
    red 0%, 
    yellow 30%, 
    green 70%, 
    blue 100%
);

/* 使用长度单位 */
background: linear-gradient(to right, 
    red 0px, 
    yellow 100px, 
    green 200px, 
    blue 300px
);

/* 省略位置（自动分配） */
background: linear-gradient(to right, red, yellow, green, blue);
```

### 2.4 透明度渐变

```css
/* 使用 rgba */
background: linear-gradient(to right, 
    rgba(255, 0, 0, 1), 
    rgba(255, 0, 0, 0)
);

/* 使用 hex 透明度 */
background: linear-gradient(to right, 
    #ff0000ff, 
    #ff000000
);
```

### 2.5 重复线性渐变

```css
/* 重复渐变 */
background: repeating-linear-gradient(
    45deg,
    red,
    red 10px,
    blue 10px,
    blue 20px
);
```

---

## 三、径向渐变

### 3.1 radial-gradient 基本语法

```css
/* 基本语法 */
radial-gradient(shape size at position, color-stop1, color-stop2, ...);

/* 简单示例 */
background: radial-gradient(circle, red, blue);
```

### 3.2 形状设置

```css
/* 圆形 */
background: radial-gradient(circle, red, blue);

/* 椭圆（默认） */
background: radial-gradient(ellipse, red, blue);
```

### 3.3 大小设置

```css
/* 关键字 */
background: radial-gradient(circle closest-side, red, blue);
background: radial-gradient(circle closest-corner, red, blue);
background: radial-gradient(circle farthest-side, red, blue);
background: radial-gradient(circle farthest-corner, red, blue);

/* 长度单位 */
background: radial-gradient(circle 100px, red, blue);
background: radial-gradient(ellipse 200px 100px, red, blue);
```

### 3.4 位置设置

```css
/* 中心（默认） */
background: radial-gradient(circle at center, red, blue);

/* 使用关键字 */
background: radial-gradient(circle at top, red, blue);
background: radial-gradient(circle at bottom, red, blue);
background: radial-gradient(circle at left, red, blue);
background: radial-gradient(circle at right, red, blue);

/* 使用位置 */
background: radial-gradient(circle at 50% 50%, red, blue);
background: radial-gradient(circle at 20% 30%, red, blue);
```

### 3.5 颜色停止点

```css
/* 多个颜色 */
background: radial-gradient(circle, 
    red, 
    yellow, 
    green, 
    blue
);

/* 指定位置 */
background: radial-gradient(circle, 
    red 0%, 
    yellow 30%, 
    green 60%, 
    blue 100%
);
```

### 3.6 重复径向渐变

```css
/* 重复渐变 */
background: repeating-radial-gradient(
    circle,
    red,
    red 10px,
    blue 10px,
    blue 20px
);
```

---

## 四、使用装饰器应用渐变

在 RmlUi 中，渐变通常通过装饰器（decorator）应用。

### 4.1 linear-gradient 装饰器

```css
.element {
    decorator: linear-gradient(to right, red, blue);
}

/* 使用百分比 */
.element {
    decorator: linear-gradient(90deg, #fff3, #fff 10%, #c33 250dp, #3c3, #33c, #000 90%, #0003);
}

/* 对角线 */
.element {
    decorator: linear-gradient(to bottom right, #ff0000, #0000ff);
}
```

### 4.2 radial-gradient 装饰器

```css
.element {
    decorator: radial-gradient(circle, red, blue);
}

/* 指定大小和位置 */
.element {
    decorator: radial-gradient(circle 200px at center, red, blue);
}
```

### 4.3 horizontal-gradient 装饰器

```css
.element {
    decorator: horizontal-gradient(#f00, #ff0);
}

/* 多个颜色 */
.element {
    decorator: horizontal-gradient(#f00, #ff0, #0f0, #00f);
}
```

### 4.4 vertical-gradient 装饰器

```css
.element {
    decorator: vertical-gradient(#f00, #00f);
}
```

---

## 五、阴影

### 5.1 box-shadow - 盒阴影

为元素的盒模型添加阴影。

```css
/* 基本语法 */
box-shadow: offset-x offset-y blur-radius spread-radius color inset;

/* 简单阴影 */
.element {
    box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.3);
}

/* 示例说明 */
.element {
    /* offset-x: 5px    水平偏移 */
    /* offset-y: 5px    垂直偏移 */
    /* blur-radius: 10px   模糊半径 */
    /* spread-radius: 0    扩散半径 */
    /* color: rgba(0, 0, 0, 0.3)  颜色 */
}
```

### 5.2 box-shadow 参数详解

```css
/* 只设置偏移 */
.element {
    box-shadow: 10px 10px #000;
}

/* 设置模糊 */
.element {
    box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.3);
}

/* 设置扩散 */
.element {
    box-shadow: 0 0 10px 5px rgba(0, 0, 0, 0.3);
}

/* 内部阴影 */
.element {
    box-shadow: inset 5px 5px 10px rgba(0, 0, 0, 0.3);
}

/* 无阴影 */
.element {
    box-shadow: none;
}
```

### 5.3 多重阴影

```css
/* 多个阴影 */
.element {
    box-shadow: 
        5px 5px 10px rgba(0, 0, 0, 0.3),
        -5px -5px 10px rgba(255, 255, 255, 0.3);
}

/* 三层阴影 */
.element {
    box-shadow: 
        0 1px 3px rgba(0, 0, 0, 0.12),
        0 1px 2px rgba(0, 0, 0, 0.24),
        0 0 10px rgba(0, 0, 0, 0.1);
}
```

### 5.4 常见阴影效果

```css
/* 柔和阴影 */
.soft-shadow {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

/* 深度阴影 */
.deep-shadow {
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

/* 发光效果 */
.glow {
    box-shadow: 0 0 20px rgba(255, 255, 255, 0.5);
}

/* 浮起效果 */
.float {
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

/* 按下效果 */
.pressed {
    box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.3);
}

/* 边框效果 */
.border-effect {
    box-shadow: 
        0 0 0 1px rgba(0, 0, 0, 0.1),
        0 2px 4px rgba(0, 0, 0, 0.1);
}
```

---

## 六、实际应用示例

### 6.1 按钮渐变效果

```css
.button {
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    color: white;
    cursor: pointer;
    decorator: linear-gradient(to bottom, #3498db, #2980b9);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    transition: box-shadow 0.2s ease-out;
}

.button:hover {
    decorator: linear-gradient(to bottom, #48a9e8, #3498db);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}

.button:active {
    box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.3);
}
```

### 6.2 卡片阴影效果

```css
.card {
    width: 300px;
    padding: 20px;
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    transition: box-shadow 0.3s ease-out;
}

.card:hover {
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}
```

### 6.3 渐变背景

```css
/* 线性渐变背景 */
.background {
    decorator: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

/* 径向渐变背景 */
.background {
    decorator: radial-gradient(circle at center, #667eea, #764ba2);
}

/* 多色渐变 */
.background {
    decorator: linear-gradient(to right, #ff0000, #ffff00, #00ff00, #00ffff, #0000ff, #ff00ff);
}
```

### 6.4 进度条渐变

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
    width: 75%;
    decorator: linear-gradient(to right, #3498db, #2ecc71);
    border-radius: 3px;
    transition: width 0.5s ease-out;
}
```

### 6.5 文本阴影效果

```css
/* 注意：RmlUi 使用 font-effect 而不是 text-shadow */
.text-glow {
    font-effect: glow(2dp #354c2e);
}

/* 或者使用 drop-shadow 滤镜 */
.text-shadow {
    filter: drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.5));
}
```

### 6.6 3D 卡片效果

```css
.card {
    width: 300px;
    height: 400px;
    background: white;
    border-radius: 12px;
    box-shadow: 
        0 4px 6px rgba(0, 0, 0, 0.1),
        0 1px 3px rgba(0, 0, 0, 0.08);
    transition: transform 0.3s ease-out, box-shadow 0.3s ease-out;
}

.card:hover {
    transform: translateY(-5px);
    box-shadow: 
        0 10px 20px rgba(0, 0, 0, 0.15),
        0 3px 6px rgba(0, 0, 0, 0.1);
}
```

### 6.7 渐变边框

```css
.border-gradient {
    padding: 20px;
    background: white;
    border-radius: 8px;
    position: relative;
}

.border-gradient::before {
    content: "";
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    background: linear-gradient(to right, red, blue);
    border-radius: 8px;
    z-index: -1;
}
```

---

## 七、高级技巧

### 7.1 渐变动画

```css
.element {
    decorator: linear-gradient(to right, #ff0000, #0000ff);
    transition: filter 0.3s ease-out;
}

.element:hover {
    filter: hue-rotate(90deg);
}
```

### 7.2 阴影动画

```css
.element {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: box-shadow 0.3s ease-out;
}

.element:hover {
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}
```

### 7.3 动态阴影

```cpp
// C++ 代码：动态更新阴影
void updateShadow(int intensity) {
    auto element = document->GetElementById("card");
    float opacity = intensity / 100.0f;
    String shadow = String(8, "0 %dpx %dpx rgba(0, 0, 0, %.2f)", 
                          intensity, intensity * 2, opacity);
    element->SetProperty("box-shadow", shadow);
}
```

### 7.4 复杂渐变组合

```css
/* 多重渐变 */
.element {
    decorator: 
        linear-gradient(to right, rgba(255, 0, 0, 0.5), rgba(0, 0, 255, 0.5)),
        linear-gradient(to bottom, rgba(255, 255, 255, 0.3), rgba(0, 0, 0, 0.3));
}
```

---

## 八、性能优化

### 8.1 渐变性能

```css
/* 好的做法：简单渐变 */
.good {
    decorator: linear-gradient(to right, red, blue);
}

/* 避免：复杂渐变 */
.bad {
    decorator: linear-gradient(45deg, 
        rgba(255, 0, 0, 1) 0%, 
        rgba(255, 255, 0, 1) 10%, 
        rgba(0, 255, 0, 1) 20%, 
        rgba(0, 255, 255, 1) 30%, 
        rgba(0, 0, 255, 1) 40%, 
        rgba(255, 0, 255, 1) 50%, 
        rgba(255, 0, 0, 1) 100%
    );
}
```

### 8.2 阴影性能

```css
/* 好的做法：简单阴影 */
.good {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* 避免：过多阴影 */
.bad {
    box-shadow: 
        0 1px 3px rgba(0, 0, 0, 0.12),
        0 1px 2px rgba(0, 0, 0, 0.24),
        0 3px 6px rgba(0, 0, 0, 0.1),
        0 10px 20px rgba(0, 0, 0, 0.15);
}
```

### 8.3 使用 will-change

```css
/* 提示浏览器优化 */
.animated-element {
    will-change: box-shadow;
    transition: box-shadow 0.3s ease-out;
}
```

---

## 九、常见问题

### 9.1 渐变不显示

**问题**：设置了渐变但不显示。

**原因**：
1. 元素没有尺寸
2. 渐变颜色相同
3. 渐变语法错误

**解决方案**：
```css
/* 确保元素有尺寸 */
.element {
    width: 100px;
    height: 100px;
    decorator: linear-gradient(to right, red, blue);
}

/* 确保颜色不同 */
.element {
    decorator: linear-gradient(to right, red, red);  /* 无效果 */
    decorator: linear-gradient(to right, red, blue);  /* 有效 */
}
```

### 9.2 阴影不显示

**问题**：设置了阴影但不显示。

**原因**：
1. 元素没有背景
2. 阴影颜色透明
3. 阴影值太小

**解决方案**：
```css
/* 确保元素有背景 */
.element {
    background: white;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

/* 确保阴影可见 */
.element {
    box-shadow: 0 0 0 rgba(0, 0, 0, 0);  /* 不可见 */
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);  /* 可见 */
}
```

### 9.3 渐变与边框冲突

**问题**：渐变与边框同时显示时出现冲突。

**解决方案**：
```css
/* 使用背景裁剪 */
.element {
    border: 2px solid #333;
    decorator: linear-gradient(to right, red, blue);
    box-sizing: border-box;
}

/* 或者使用伪元素 */
.element {
    position: relative;
    border: 2px solid #333;
}

.element::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    decorator: linear-gradient(to right, red, blue);
    z-index: -1;
}
```

---

## 十、实战练习

### 练习 1：创建渐变按钮

创建一个带有渐变效果的按钮：
- 悬停时有颜色变化
- 点击时有阴影变化
- 禁用状态有特殊效果

### 练习 2：设计卡片系统

创建一个卡片系统：
- 卡片有柔和的阴影
- 悬停时有浮起效果
- 支持不同深度的阴影

### 练习 3：实现进度条

创建一个带有渐变的进度条：
- 进度条有渐变填充
- 支持动画过渡
- 有阴影效果

### 练习 4：制作背景效果

创建一个带有渐变的背景：
- 使用多种渐变组合
- 支持动态变化
- 有层次感

---

## 十一、下一步

继续学习 [粒子特效](06-particle-effects.md) 来了解如何创建粒子系统。

---

## 📝 检查清单

- [ ] 理解渐变的基本概念
- [ ] 掌握线性渐变的使用
- [ ] 掌握径向渐变的使用
- [ ] 理解阴影的各种效果
- [ ] 能够创建常见的渐变效果
- [ ] 能够创建常见的阴影效果
- [ ] 理解渐变和阴影的性能影响