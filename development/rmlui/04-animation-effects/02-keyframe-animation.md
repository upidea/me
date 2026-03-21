# 4.2 关键帧动画

关键帧动画（Keyframe Animations）比过渡更强大，可以创建复杂的多步骤动画。本节将详细介绍如何使用关键帧动画来创建各种视觉效果。

---

## 一、关键帧动画基础

### 1.1 什么是关键帧动画

关键帧动画允许你定义一系列动画状态（关键帧），浏览器会自动在关键帧之间进行插值，创建流畅的动画。

与过渡的区别：
- 过渡：只有两个状态（开始和结束）
- 关键帧动画：可以有多个中间状态

### 1.2 何时使用关键帧动画

适合使用关键帧动画的场景：
- 复杂的多步骤动画
- 循环动画
- 需要精确控制的动画
- 粒子效果
- 加载动画

**不适合**使用关键帧动画的场景：
- 简单的状态变化（使用过渡）

---

## 二、定义关键帧

### 2.1 @keyframes 规则

使用 `@keyframes` 规则定义动画序列。

```css
/* 基本语法 */
@keyframes animation-name {
    from {
        /* 开始状态 */
    }
    to {
        /* 结束状态 */
    }
}

/* 使用百分比 */
@keyframes animation-name {
    0% {
        /* 开始状态 */
    }
    50% {
        /* 中间状态 */
    }
    100% {
        /* 结束状态 */
    }
}
```

### 2.2 关键帧示例

```css
/* 简单的旋转动画 */
@keyframes rotate {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
}

/* 多步骤动画 */
@keyframes bounce {
    0%, 100% {
        transform: translateY(0);
    }
    50% {
        transform: translateY(-50px);
    }
}

/* 复杂动画 */
@keyframes complex-animation {
    0% {
        transform: translateX(0) rotate(0deg);
        opacity: 0;
    }
    25% {
        transform: translateX(100px) rotate(90deg);
        opacity: 1;
    }
    50% {
        transform: translateX(200px) rotate(180deg);
        opacity: 1;
    }
    75% {
        transform: translateX(100px) rotate(270deg);
        opacity: 0.5;
    }
    100% {
        transform: translateX(0) rotate(360deg);
        opacity: 0;
    }
}
```

### 2.3 使用 from/to 与百分比

```css
/* 使用 from/to */
@keyframes fade-out {
    from {
        opacity: 1;
        visibility: visible;
    }
    to {
        opacity: 0;
        visibility: hidden;
    }
}

/* 使用百分比 */
@keyframes fade-in {
    0% {
        opacity: 0;
        visibility: hidden;
    }
    100% {
        opacity: 1;
        visibility: visible;
    }
}

/* 混合使用 */
@keyframes mixed-keyframes {
    0% {
        transform: scale(0.5);
        opacity: 0;
    }
    50% {
        transform: scale(1.2);
        opacity: 0.8;
    }
    to {
        transform: scale(1);
        opacity: 1;
    }
}
```

---

## 三、动画属性

### 3.1 animation

简写属性，用于一次性设置所有动画相关的属性。

```css
/* 语法 */
animation: name duration timing-function delay iteration-count direction fill-mode play-state;

/* 示例 */
.element {
    animation: rotate 2s linear infinite;
}

/* 多个动画 */
.element {
    animation: 
        rotate 2s linear infinite,
        fade 1s ease-in-out infinite alternate;
}
```

### 3.2 animation-name

指定要应用的动画名称。

```css
.element {
    animation-name: rotate;
}

/* 多个动画 */
.element {
    animation-name: rotate, fade;
}
```

### 3.3 animation-duration

指定动画的持续时间。

```css
.element {
    animation-duration: 2s;
}

/* 多个动画 */
.element {
    animation-duration: 2s, 1s;
}
```

### 3.4 animation-timing-function

指定动画的时间函数（缓动效果）。

```css
.element {
    animation-timing-function: ease;
}

/* 自定义缓动函数 */
.element {
    animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

/* 为每个关键帧设置不同的缓动函数 */
@keyframes custom-easing {
    0% {
        transform: translateX(0);
        animation-timing-function: ease-in;
    }
    50% {
        transform: translateX(100px);
        animation-timing-function: ease-out;
    }
    100% {
        transform: translateX(200px);
    }
}
```

### 3.5 animation-delay

指定动画的延迟时间。

```css
.element {
    animation-delay: 0s;    /* 立即开始 */
}

.element {
    animation-delay: 1s;    /* 延迟 1s */
}
```

### 3.6 animation-iteration-count

指定动画的迭代次数。

```css
.element {
    animation-iteration-count: 1;        /* 播放一次 */
}

.element {
    animation-iteration-count: 3;        /* 播放三次 */
}

.element {
    animation-iteration-count: infinite; /* 无限循环 */
}
```

### 3.7 animation-direction

指定动画的播放方向。

```css
.element {
    animation-direction: normal;         /* 正常播放 */
}

.element {
    animation-direction: reverse;        /* 反向播放 */
}

.element {
    animation-direction: alternate;      /* 交替播放 */
}

.element {
    animation-direction: alternate-reverse; /* 反向交替播放 */
}
```

**播放方向说明**：

| 方向 | 说明 |
|------|------|
| `normal` | 从 0% 到 100%，重复时重置到 0% |
| `reverse` | 从 100% 到 0%，重复时重置到 100% |
| `alternate` | 0% → 100% → 0% → 100%... |
| `alternate-reverse` | 100% → 0% → 100% → 0%... |

### 3.8 animation-fill-mode

指定动画在播放前后的状态。

```css
.element {
    animation-fill-mode: none;       /* 默认 */
}

.element {
    animation-fill-mode: forwards;   /* 保持在结束状态 */
}

.element {
    animation-fill-mode: backwards;  /* 从开始状态开始（有延迟时） */
}

.element {
    animation-fill-mode: both;       /* forwards + backwards */
}
```

### 3.9 animation-play-state

指定动画的播放状态。

```css
.element {
    animation-play-state: running;   /* 播放 */
}

.element {
    animation-play-state: paused;    /* 暂停 */
}
```

---

## 四、实际应用示例

### 4.1 旋转加载动画

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

### 4.2 脉冲效果

```css
@keyframes pulse {
    0%, 100% {
        transform: scale(1);
        opacity: 1;
    }
    50% {
        transform: scale(1.1);
        opacity: 0.8;
    }
}

.pulse-element {
    animation: pulse 2s ease-in-out infinite;
}
```

### 4.3 弹跳效果

```css
@keyframes bounce {
    0%, 20%, 50%, 80%, 100% {
        transform: translateY(0);
    }
    40% {
        transform: translateY(-30px);
    }
    60% {
        transform: translateY(-15px);
    }
}

.bounce-element {
    animation: bounce 1s ease-in-out infinite;
}
```

### 4.4 淡入淡出

```css
@keyframes fade-in {
    from {
        opacity: 0;
        visibility: hidden;
    }
    to {
        opacity: 1;
        visibility: visible;
    }
}

@keyframes fade-out {
    from {
        opacity: 1;
        visibility: visible;
    }
    to {
        opacity: 0;
        visibility: hidden;
    }
}

.fade-in {
    animation: fade-in 0.5s ease-out forwards;
}

.fade-out {
    animation: fade-out 0.5s ease-in forwards;
}
```

### 4.5 滑动效果

```css
@keyframes slide-in-left {
    from {
        transform: translateX(-100%);
        opacity: 0;
    }
    to {
        transform: translateX(0);
        opacity: 1;
    }
}

@keyframes slide-in-right {
    from {
        transform: translateX(100%);
        opacity: 0;
    }
    to {
        transform: translateX(0);
        opacity: 1;
    }
}

@keyframes slide-in-up {
    from {
        transform: translateY(100%);
        opacity: 0;
    }
    to {
        transform: translateY(0);
        opacity: 1;
    }
}

.slide-in-left {
    animation: slide-in-left 0.5s ease-out forwards;
}
```

### 4.6 闪烁效果

```css
@keyframes blink {
    0%, 100% {
        opacity: 1;
    }
    50% {
        opacity: 0;
    }
}

.blink {
    animation: blink 1s ease-in-out infinite;
}
```

### 4.7 摇摆效果

```css
@keyframes shake {
    0%, 100% {
        transform: translateX(0);
    }
    10%, 30%, 50%, 70%, 90% {
        transform: translateX(-10px);
    }
    20%, 40%, 60%, 80% {
        transform: translateX(10px);
    }
}

.shake {
    animation: shake 0.5s ease-in-out;
}
```

### 4.8 波浪效果

```css
@keyframes wave {
    0%, 100% {
        transform: translateY(0);
    }
    25% {
        transform: translateY(-5px);
    }
    75% {
        transform: translateY(5px);
    }
}

.wave {
    animation: wave 2s ease-in-out infinite;
}

/* 交错延迟 */
.wave-item:nth-child(1) { animation-delay: 0.0s; }
.wave-item:nth-child(2) { animation-delay: 0.1s; }
.wave-item:nth-child(3) { animation-delay: 0.2s; }
.wave-item:nth-child(4) { animation-delay: 0.3s; }
```

### 4.9 缩放效果

```css
@keyframes zoom-in {
    from {
        transform: scale(0);
        opacity: 0;
    }
    to {
        transform: scale(1);
        opacity: 1;
    }
}

@keyframes zoom-out {
    from {
        transform: scale(1);
        opacity: 1;
    }
    to {
        transform: scale(0);
        opacity: 0;
    }
}

.zoom-in {
    animation: zoom-in 0.5s cubic-out forwards;
}
```

### 4.10 复合动画

```css
@keyframes rotate-fade {
    0% {
        transform: rotate(0deg) scale(0.5);
        opacity: 0;
    }
    50% {
        transform: rotate(180deg) scale(1.2);
        opacity: 1;
    }
    100% {
        transform: rotate(360deg) scale(1);
        opacity: 1;
    }
}

.rotate-fade {
    animation: rotate-fade 2s ease-in-out infinite;
}
```

---

## 五、高级技巧

### 5.1 多动画组合

```css
.element {
    animation: 
        rotate 2s linear infinite,
        fade 1s ease-in-out infinite alternate,
        scale 3s cubic-in-out infinite;
}
```

### 5.2 关键帧中的缓动函数

```css
@keyframes custom-easing {
    0% {
        transform: translateX(0);
        animation-timing-function: ease-in;
    }
    25% {
        transform: translateX(100px);
        animation-timing-function: linear;
    }
    50% {
        transform: translateX(200px);
        animation-timing-function: ease-out;
    }
    75% {
        transform: translateX(300px);
        animation-timing-function: ease-in-out;
    }
    100% {
        transform: translateX(400px);
    }
}
```

### 5.3 动态控制动画

```cpp
// C++ 代码：控制动画播放状态
void pauseAnimation() {
    auto element = document->GetElementById("animated-element");
    element->SetProperty("animation-play-state", "paused");
}

void resumeAnimation() {
    auto element = document->GetElementById("animated-element");
    element->SetProperty("animation-play-state", "running");
}
```

### 5.4 动画事件

```cpp
// C++ 代码：监听动画事件
void setupAnimationEvents() {
    auto element = document->GetElementById("animated-element");
    
    // 动画开始
    element->AddEventListener("animationstart", 
        [](Event& event) {
            // 处理动画开始
        });
    
    // 动画迭代
    element->AddEventListener("animationiteration", 
        [](Event& event) {
            // 处理动画迭代
        });
    
    // 动画结束
    element->AddEventListener("animationend", 
        [](Event& event) {
            // 处理动画结束
        });
}
```

### 5.5 性能优化

```css
/* 使用 GPU 加速的属性 */
.element {
    animation: rotate 2s linear infinite;
    will-change: transform;
}

/* 避免动画过多 */
.element {
    /* 好的做法：使用少量动画 */
    animation: transform 0.3s ease-out;
    
    /* 避免：动画太多属性 */
    /* animation: all 0.3s ease-out; */
}
```

---

## 六、常见问题

### 6.1 动画不播放

**问题**：定义了动画但不播放。

**原因**：
1. 没有应用 `animation` 属性
2. 动画名称不匹配
3. 元素不可见

**解决方案**：
```css
/* 检查动画设置 */
.element {
    animation: rotate 2s linear infinite;  /* 确保设置了动画 */
}

/* 确保动画名称匹配 */
@keyframes rotate { ... }

.element {
    animation-name: rotate;  /* 名称必须匹配 */
}
```

### 6.2 动画卡顿

**问题**：动画播放不流畅。

**解决方案**：
```css
/* 使用 GPU 加速 */
.element {
    animation: transform 0.3s ease-out;
    will-change: transform;
}

/* 减少动画复杂度 */
.element {
    /* 简化动画 */
    animation: simple-rotate 2s linear infinite;
}
```

### 6.3 动画循环不自然

**问题**：循环动画在开始和结束时跳跃。

**解决方案**：
```css
/* 使用 alternate 方向 */
.element {
    animation: bounce 1s ease-in-out infinite alternate;
}

/* 或者设计无缝循环的关键帧 */
@keyframes seamless-loop {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}
```

---

## 七、实战练习

### 练习 1：创建加载指示器

创建一个带有以下效果的加载指示器：
- 旋转的圆圈
- 脉冲效果
- 淡入淡出

### 练习 2：实现按钮交互动画

创建一个带有丰富动画的按钮：
- 悬停时有缩放和颜色变化
- 点击时有弹跳效果
- 禁用状态有闪烁效果

### 练习 3：设计成就解锁动画

制作成就解锁特效：
- 图标弹入动画
- 光芒效果
- 粒子爆发

### 练习 4：创建页面转场动画

实现页面切换动画：
- 淡入淡出
- 滑动切换
- 缩放转场

---

## 八、下一步

继续学习 [变换](03-transforms.md) 来深入了解 2D 和 3D 变换。

---

## 📝 检查清单

- [ ] 理解关键帧动画的基本概念
- [ ] 掌握 @keyframes 规则的使用
- [ ] 了解所有动画属性
- [ ] 能够创建常见的动画效果
- [ ] 理解动画控制方法
- [ ] 能够优化动画性能