# 2.6 响应式设计

响应式设计允许你的界面自动适配不同的屏幕尺寸和分辨率。对于需要在多种设备上运行的游戏或应用来说，这是至关重要的技能。

---

## 一、媒体查询基础

### 1.1 什么是媒体查询

媒体查询（Media Queries）允许你根据特定的条件（如屏幕宽度、高度、方向等）应用不同的样式规则。

```css
/* 基本语法 */
@media (条件) {
    /* 条件满足时应用的样式 */
}

/* 多条件组合 */
@media (min-width: 800px) and (max-width: 1200px) {
    /* 宽度在 800-1200px 之间时应用 */
}
```

### 1.2 常用媒体条件

| 条件 | 描述 | 示例 |
|------|------|------|
| `width` / `height` | 视口宽度/高度 | `@media (width: 1920px)` |
| `min-width` / `max-width` | 最小/最大宽度 | `@media (min-width: 768px)` |
| `orientation` | 屏幕方向 | `@media (orientation: landscape)` |
| `resolution` | 屏幕分辨率 | `@media (resolution: 2dppx)` |

### 1.3 断点设置

常用的响应式断点：

```css
/* 手机（竖屏） */
@media (max-width: 480px) { }

/* 手机（横屏）/ 小平板 */
@media (min-width: 481px) and (max-width: 768px) { }

/* 平板 */
@media (min-width: 769px) and (max-width: 1024px) { }

/* 小屏幕桌面 */
@media (min-width: 1025px) and (max-width: 1440px) { }

/* 大屏幕桌面 */
@media (min-width: 1441px) { }
```

---

## 二、响应式布局实践

### 2.1 流式布局

使用百分比和 `flex` 创建可伸缩的布局。

```css
/* 基础容器 */
.container {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    padding: 2%;
}

/* 响应式列 */
.column {
    flex: 1 1 30%;  /* 默认三列 */
    margin: 1%;
}

/* 平板：两列 */
@media (max-width: 768px) {
    .column {
        flex: 1 1 48%;
    }
}

/* 手机：单列 */
@media (max-width: 480px) {
    .column {
        flex: 1 1 100%;
    }
}
```

### 2.2 响应式导航

```xml
<!-- 导航结构 -->
<div class="nav-container">
    <div class="nav-brand">My Game</div>
    <button class="nav-toggle" onclick="toggleMenu()">☰</button>
    <nav class="nav-menu">
        <a href="#">首页</a>
        <a href="#">游戏</a>
        <a href="#">设置</a>
        <a href="#">关于</a>
    </nav>
</div>
```

```css
/* 桌面样式 */
.nav-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 30px;
    background: #333;
}

.nav-menu {
    display: flex;
    gap: 20px;
}

.nav-menu a {
    color: white;
    text-decoration: none;
    padding: 8px 16px;
}

.nav-toggle {
    display: none;  /* 桌面端隐藏 */
}

/* 移动端样式 */
@media (max-width: 768px) {
    .nav-container {
        flex-wrap: wrap;
    }

    .nav-toggle {
        display: block;
        background: none;
        border: none;
        color: white;
        font-size: 24px;
        cursor: pointer;
    }

    .nav-menu {
        display: none;  /* 默认隐藏 */
        width: 100%;
        flex-direction: column;
        padding-top: 15px;
    }

    .nav-menu.active {
        display: flex;
    }

    .nav-menu a {
        padding: 12px;
        border-bottom: 1px solid #444;
    }
}
```

```cpp
// C++ 中处理菜单切换
void ToggleMenuHandler(Rml::Element* element)
{
    Rml::Element* nav_menu = element->GetOwnerDocument()->GetElementById("nav-menu");
    if (nav_menu)
    {
        nav_menu->ToggleClass("active");
    }
}
```

### 2.3 响应式卡片布局

```xml
<!-- 卡片容器 -->
<div class="card-grid">
    <div class="card">
        <img src="images/card1.jpg" class="card-image"/>
        <div class="card-content">
            <h3>卡片标题 1</h3>
            <p>这是卡片的描述内容...</p>
            <button>了解更多</button>
        </div>
    </div>
    <!-- 更多卡片... -->
</div>
```

```css
/* 网格布局 */
.card-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 20px;
    padding: 20px;
}

.card {
    background: white;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.card-image {
    width: 100%;
    height: 200px;
    object-fit: cover;
}

.card-content {
    padding: 20px;
}

/* 响应式调整 */
@media (max-width: 640px) {
    .card-grid {
        grid-template-columns: 1fr;  /* 单列 */
        gap: 15px;
        padding: 10px;
    }

    .card-image {
        height: 150px;
    }

    .card-content {
        padding: 15px;
    }
}
```

---

## 三、相对单位

### 3.1 使用相对单位

相比固定像素，相对单位更适合响应式设计：

| 单位 | 描述 | 示例 |
|------|------|------|
| `%` | 相对于父元素 | `width: 50%` |
| `em` | 相对于当前字体大小 | `margin: 2em` |
| `rem` | 相对于根元素字体大小 | `font-size: 1.5rem` |
| `vw` / `vh` | 相对于视口宽度/高度 | `width: 100vw` |

```css
/* 响应式字体 */
body {
    font-size: 16px;
}

@media (max-width: 768px) {
    body {
        font-size: 14px;  /* 移动端稍微缩小 */
    }
}

/* 使用 rem 的间距系统 */
.spacing-sm { padding: 0.5rem; }
.spacing-md { padding: 1rem; }
.spacing-lg { padding: 2rem; }
.spacing-xl { padding: 4rem; }
```

### 3.2 响应式图片

```css
/* 流体图片：永远不超过容器宽度 */
img {
    max-width: 100%;
    height: auto;
}

/* 背景图片响应式 */
.hero-section {
    background-image: url("images/hero-desktop.jpg");
    background-size: cover;
    background-position: center;
    height: 60vh;
}

@media (max-width: 768px) {
    .hero-section {
        background-image: url("images/hero-mobile.jpg");  /* 移动端使用不同图片 */
        height: 40vh;
    }
}
```

---

## 四、多分辨率适配

### 4.1 高 DPI 屏幕适配

```cpp
// 获取屏幕缩放因子
float GetScaleFactor()
{
    // 根据你的图形后端实现
    // GLFW 示例:
    float xscale, yscale;
    GLFWmonitor* monitor = glfwGetPrimaryMonitor();
    glfwGetMonitorContentScale(monitor, &xscale, &yscale);
    return xscale;  // 通常 x 和 y 缩放因子相同
}

// 初始化时设置
void InitUI()
{
    float scale = GetScaleFactor();

    // 设置根字体大小（影响 rem 单位）
    Rml::ElementDocument* document = context->LoadDocument("main.rml");
    document->SetProperty(Rml::PropertyId::FontSize, Rml::Property(16.0f * scale));
}
```

```css
/* 为高 DPI 屏幕提供高清图片 */
.logo {
    width: 100px;
    height: 100px;
    background-image: url("images/logo.png");
}

@media (resolution: 2dppx) {
    .logo {
        background-image: url("images/logo@2x.png");
    }
}

@media (resolution: 3dppx) {
    .logo {
        background-image: url("images/logo@3x.png");
    }
}
```

### 4.2 动态 DPI 适配

对于游戏，你可能需要根据窗口大小动态调整 UI 缩放：

```cpp
class ResponsiveUI
{
public:
    ResponsiveUI(Rml::Context* context) : context_(context) {}

    void OnWindowResize(int width, int height)
    {
        // 计算合适的缩放因子
        float base_width = 1920.0f;  // 设计基准宽度
        float scale = std::min(width / base_width, height / 1080.0f);

        // 限制缩放范围
        scale = std::clamp(scale, 0.5f, 2.0f);

        // 更新根元素样式
        Rml::ElementDocument* document = context_->GetDocument(0);
        if (document)
        {
            document->SetProperty(Rml::PropertyId::Zoom,
                Rml::Property(Rml::Style::Zoom(scale)));
        }

        stored_scale_ = scale;
    }

    float GetScale() const { return stored_scale_; }

private:
    Rml::Context* context_;
    float stored_scale_ = 1.0f;
};
```

---

## 五、实战：完整响应式游戏菜单

### 5.1 主菜单界面

```xml
<!-- main_menu.rml -->
<rml>
<head>
    <link type="text/rcss" href="main_menu.rcss"/>
</head>
<body>
    <div class="menu-container">
        <!-- 左侧 Logo 和标题 -->
        <div class="menu-sidebar">
            <img src="images/logo.png" class="logo"/>
            <h1 class="game-title">我的游戏</h1>
        </div>

        <!-- 右侧菜单项 -->
        <div class="menu-content">
            <nav class="main-menu">
                <button class="menu-item btn-start">
                    <span class="icon">🎮</span>
                    <span class="text">开始游戏</span>
                </button>
                <button class="menu-item btn-load">
                    <span class="icon">📂</span>
                    <span class="text">加载游戏</span>
                </button>
                <button class="menu-item btn-settings">
                    <span class="icon">⚙️</span>
                    <span class="text">设置</span>
                </button>
                <button class="menu-item btn-quit">
                    <span class="icon">🚪</span>
                    <span class="text">退出</span>
                </button>
            </nav>

            <!-- 版本信息 -->
            <div class="version-info">
                Version 1.0.0
            </div>
        </div>
    </div>
</body>
</rml>
```

### 5.2 响应式样式

```css
/* main_menu.rcss */

/* 基础样式 */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: "Noto Sans CJK SC", Arial, sans-serif;
    background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
    min-height: 100vh;
}

.menu-container {
    display: flex;
    min-height: 100vh;
}

/* 侧边栏 */
.menu-sidebar {
    width: 350px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 40px;
    background: rgba(0, 0, 0, 0.3);
}

.logo {
    width: 150px;
    height: 150px;
    margin-bottom: 30px;
}

.game-title {
    color: white;
    font-size: 32px;
    text-shadow: 0 0 20px rgba(100, 200, 255, 0.5);
}

/* 主菜单区域 */
.menu-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 40px;
}

.main-menu {
    display: flex;
    flex-direction: column;
    gap: 20px;
    max-width: 400px;
}

.menu-item {
    display: flex;
    align-items: center;
    gap: 15px;
    padding: 20px 30px;
    background: rgba(255, 255, 255, 0.1);
    border: 2px solid rgba(255, 255, 255, 0.2);
    border-radius: 10px;
    color: white;
    font-size: 20px;
    cursor: pointer;
    transition: all 0.3s ease;
}

.menu-item:hover {
    background: rgba(255, 255, 255, 0.2);
    border-color: rgba(100, 200, 255, 0.8);
    transform: translateX(10px);
}

.menu-item .icon {
    font-size: 28px;
}

.version-info {
    margin-top: auto;
    color: rgba(255, 255, 255, 0.5);
    font-size: 14px;
}

/* ========== 平板适配 ========== */
@media (max-width: 1024px) {
    .menu-sidebar {
        width: 280px;
        padding: 30px;
    }

    .logo {
        width: 120px;
        height: 120px;
    }

    .game-title {
        font-size: 24px;
    }

    .menu-item {
        padding: 15px 25px;
        font-size: 18px;
    }
}

/* ========== 手机横屏适配 ========== */
@media (max-width: 768px) {
    .menu-container {
        flex-direction: column;
    }

    .menu-sidebar {
        width: 100%;
        padding: 20px;
        flex-direction: row;
        align-items: center;
        gap: 20px;
    }

    .logo {
        width: 60px;
        height: 60px;
        margin-bottom: 0;
    }

    .game-title {
        font-size: 20px;
        margin-bottom: 0;
    }

    .menu-content {
        padding: 20px;
    }

    .main-menu {
        gap: 15px;
    }

    .menu-item {
        padding: 12px 20px;
        font-size: 16px;
    }

    .menu-item .icon {
        font-size: 22px;
    }
}

/* ========== 手机竖屏适配 ========== */
@media (max-width: 480px) {
    .menu-sidebar {
        flex-direction: column;
        text-align: center;
    }

    .game-title {
        font-size: 18px;
    }

    .menu-content {
        justify-content: flex-start;
        padding-top: 30px;
    }

    .main-menu {
        width: 100%;
    }

    .menu-item {
        justify-content: center;
        padding: 15px;
        font-size: 14px;
    }

    .version-info {
        text-align: center;
        margin-top: 30px;
    }
}
```

### 5.3 C++ 集成

```cpp
class MainMenu
{
public:
    MainMenu(Rml::Context* context) : context_(context) {}

    bool Initialize()
    {
        // 加载文档
        document_ = context_->LoadDocument("main_menu.rml");
        if (!document_)
            return false;

        // 绑定事件
        BindButton("btn-start", [this]() { OnStartGame(); });
        BindButton("btn-load", [this]() { OnLoadGame(); });
        BindButton("btn-settings", [this]() { OnSettings(); });
        BindButton("btn-quit", [this]() { OnQuit(); });

        // 显示文档
        document_->Show();
        return true;
    }

    void Show() { if (document_) document_->Show(); }
    void Hide() { if (document_) document_->Hide(); }

private:
    Rml::Context* context_;
    Rml::ElementDocument* document_ = nullptr;

    void BindButton(const char* id, std::function<void()> callback)
    {
        Rml::Element* button = document_->GetElementById(id);
        if (button)
        {
            button->AddEventListener(Rml::EventId::Click,
                [callback](Rml::Event*) { callback(); });
        }
    }

    void OnStartGame() { /* 开始游戏逻辑 */ }
    void OnLoadGame() { /* 加载游戏逻辑 */ }
    void OnSettings() { /* 设置逻辑 */ }
    void OnQuit() { /* 退出逻辑 */ }
};
```

---

## 六、实践练习

### 练习 1：创建响应式物品栏

设计一个物品栏界面：
- 桌面端：8x8 网格
- 平板端：6x6 网格
- 手机端：4x4 网格 + 滚动

### 练习 2：创建响应式设置面板

创建一个设置页面：
- 大屏幕：左右分栏（左侧导航，右侧内容）
- 小屏幕：上下布局（顶部 Tab 导航）

### 练习 3：横竖屏切换适配

为手机设计：
- 横屏模式：完整游戏界面
- 竖屏模式：简化操作界面

---

## 📝 检查清单

- [ ] 理解媒体查询的语法和用法
- [ ] 能够设置合理的响应式断点
- [ ] 掌握相对单位（%、em、rem、vw、vh）的使用
- [ ] 能够创建流式布局
- [ ] 了解高 DPI 屏幕的适配方法
- [ ] 能够根据窗口大小动态调整 UI

---

恭喜完成阶段二！你已经掌握了 RmlUi 的布局系统和响应式设计技巧。

下一阶段：[阶段三：交互与数据](../03-interaction-data/README.md) - 学习事件系统和数据绑定。
