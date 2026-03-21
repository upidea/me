# 5.5 SVG 集成

SVG（Scalable Vector Graphics）支持让 RmlUi 能够显示高质量的矢量图形。本节将深入讲解如何在 RmlUi 中集成和使用 SVG。

---

## 一、SVG 插件

### 1.1 启用 SVG 支持

```cpp
// SVGPlugin.h
#pragma once
#include <RmlUi/Core/Plugin.h>

class SVGPlugin : public Rml::Plugin
{
public:
    void Initialise() override;
    void Shutdown() override;
    Rml::EventListener* GetEventListener() override;
    Rml::String GetName() const override { return "SVG"; }
    int GetVersion() const override { return 1; }
};

// SVGPlugin.cpp
#include "SVGPlugin.h"
#include <RmlUi/Core/Core.h>
#include <RmlUi/Factory.h>

void SVGPlugin::Initialise()
{
    Rml::Log::Message(Rml::Log::LT_INFO, "Initializing SVG plugin");
    
    // SVG 元素会自动注册
    // 只需要确保 SVG 库已链接
}

void SVGPlugin::Shutdown()
{
    Rml::Log::Message(Rml::Log::LT_INFO, "Shutting down SVG plugin");
}

Rml::EventListener* SVGPlugin::GetEventListener()
{
    return nullptr;
}

// 注册插件
void InitializeSVG()
{
    SVGPlugin* plugin = new SVGPlugin();
    Rml::RegisterPlugin(plugin);
}
```

### 1.2 在 RML 中使用 SVG

```xml
<rml>
<head>
    <title>SVG 示例</title>
    <link type="text/rcss" href="svg_demo.rcss"/>
</head>
<body>
    <h1>SVG 集成示例</h1>
    
    <!-- 直接嵌入 SVG -->
    <svg width="100" height="100" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="40" fill="#3498db"/>
        <rect x="20" y="20" width="60" height="60" fill="#e74c3c"/>
    </svg>
    
    <!-- 加载外部 SVG 文件 -->
    <svg src="icons/settings.svg" width="48" height="48"/>
    <svg src="icons/user.svg" width="48" height="48"/>
    <svg src="icons/home.svg" width="48" height="48"/>
    
    <!-- 带样式的 SVG -->
    <div class="icon-container">
        <svg src="icons/play.svg" class="icon-play"/>
        <svg src="icons/pause.svg" class="icon-pause"/>
        <svg src="icons/stop.svg" class="icon-stop"/>
    </div>
</body>
</rml>
```

### 1.3 SVG 样式

```css
/* svg_demo.rcss */
svg {
    display: inline-block;
    vertical-align: middle;
}

.icon-container {
    display: flex;
    gap: 10px;
}

.icon-play,
.icon-pause,
.icon-stop {
    width: 32px;
    height: 32px;
    cursor: pointer;
    transition: transform 0.2s, filter 0.2s;
}

.icon-play:hover {
    transform: scale(1.1);
    filter: drop-shadow(0 0 5px rgba(52, 152, 219, 0.5));
}

.icon-pause:hover {
    transform: scale(1.1);
    filter: drop-shadow(0 0 5px rgba(231, 76, 60, 0.5));
}

.icon-stop:hover {
    transform: scale(1.1);
    filter: drop-shadow(0 0 5px rgba(46, 204, 113, 0.5));
}
```

---

## 二、SVG 装饰器

### 2.1 创建 SVG 装饰器

```cpp
// SVGDecorator.h
#pragma once
#include <RmlUi/Core/Decorator.h>

class DecoratorSVG : public Rml::Decorator
{
public:
    DecoratorSVG();
    virtual ~DecoratorSVG();

    bool Initialise(const Rml::String& svg_path);

    Rml::DecoratorDataHandle GenerateElementData(
        Rml::Element* element,
        Rml::BoxArea paint_area) const override;

    void ReleaseElementData(
        Rml::DecoratorDataHandle element_data) const override;

    void RenderElement(
        Rml::Element* element,
        Rml::DecoratorDataHandle element_data) const override;

private:
    Rml::String svg_path_;
    int image_index_;
};

class DecoratorInstancerSVG : public Rml::DecoratorInstancer
{
public:
    DecoratorInstancerSVG();
    virtual ~DecoratorInstancerSVG();

    Rml::SharedPtr<Rml::Decorator> InstanceDecorator(
        const Rml::String& name,
        const Rml::PropertyDictionary& properties,
        const Rml::DecoratorInstancerInterface& instancer_interface) override;

private:
    Rml::PropertyId id_src_;
};
```

```cpp
// SVGDecorator.cpp
#include "SVGDecorator.h"
#include <RmlUi/Core/Core.h>
#include <RmlUi/Core/Element.h>
#include <RmlUi/Core/PropertyDefinition.h>

DecoratorSVG::DecoratorSVG()
    : image_index_(-1)
{
}

DecoratorSVG::~DecoratorSVG()
{
}

bool DecoratorSVG::Initialise(const Rml::String& svg_path)
{
    svg_path_ = svg_path;
    
    // 加载 SVG 为纹理
    Rml::Vector2i dimensions;
    image_index_ = AddTexture(Rml::GetTexture(svg_path, dimensions));
    
    return image_index_ >= 0;
}

Rml::DecoratorDataHandle DecoratorSVG::GenerateElementData(
    Rml::Element* element,
    Rml::BoxArea paint_area) const
{
    // 返回图像索引作为数据句柄
    return (Rml::DecoratorDataHandle)image_index_;
}

void DecoratorSVG::ReleaseElementData(
    Rml::DecoratorDataHandle element_data) const
{
    // 不需要释放，由装饰器管理
}

void DecoratorSVG::RenderElement(
    Rml::Element* element,
    Rml::DecoratorDataHandle element_data) const
{
    if (image_index_ < 0)
        return;
    
    Rml::TextureHandle texture = GetTexture(image_index_);
    if (!texture)
        return;
    
    // 获取元素尺寸
    const Rml::Box& box = element->GetBox();
    Rml::Rectangle rect = box.GetEdge(paint_area);
    
    // 生成顶点
    Rml::Vertex vertices[4] = {
        {{rect.left, rect.top}, {0, 0}, Rml::Colourb(255, 255, 255, 255)},
        {{rect.right, rect.top}, {1, 0}, Rml::Colourb(255, 255, 255, 255)},
        {{rect.right, rect.bottom}, {1, 1}, Rml::Colourb(255, 255, 255, 255)},
        {{rect.left, rect.bottom}, {0, 1}, Rml::Colourb(255, 255, 255, 255)}
    };
    
    int indices[6] = {0, 1, 2, 0, 2, 3};
    
    // 渲染 SVG
    if (auto* render_manager = element->GetRenderManager())
    {
        render_manager->RenderGeometry(
            vertices,
            indices,
            texture,
            Rml::Matrix4f::Identity()
        );
    }
}

DecoratorInstancerSVG::DecoratorInstancerSVG()
{
    id_src_ = RegisterProperty("src", "", false, false)
        .AddParser("string")
        .GetId();
}

DecoratorInstancerSVG::~DecoratorInstancerSVG()
{
}

Rml::SharedPtr<Rml::Decorator> DecoratorInstancerSVG::InstanceDecorator(
    const Rml::String& name,
    const Rml::PropertyDictionary& properties,
    const Rml::DecoratorInstancerInterface& instancer_interface)
{
    Rml::String src = properties.GetProperty(id_src_)->Get<Rml::String>();
    
    auto decorator = Rml::MakeShared<DecoratorSVG>();
    if (decorator->Initialise(src))
        return decorator;
    
    return nullptr;
}
```

### 2.2 使用 SVG 装饰器

```css
/* 使用 SVG 装饰器 */
.icon-button {
    decorator: svg(src="icons/play.svg");
    width: 48px;
    height: 48px;
}

.icon-button:hover {
    decorator: svg(src="icons/play_hover.svg");
}
```

---

## 三、SVG 图标系统

### 3.1 图标管理器

```cpp
// IconManager.h
#pragma once
#include <RmlUi/Core/Types.h>
#include <string>
#include <unordered_map>

class IconManager
{
public:
    static IconManager& Instance()
    {
        static IconManager instance;
        return instance;
    }

    // 加载图标
    bool LoadIcon(const std::string& name, const std::string& path);
    
    // 获取图标路径
    std::string GetIconPath(const std::string& name) const;
    
    // 创建图标元素
    Rml::Element* CreateIcon(Rml::Context* context, const std::string& name, const std::string& class_name = "");
    
    // 批量加载图标
    bool LoadIconsFromDirectory(const std::string& directory);

private:
    IconManager() = default;
    
    std::unordered_map<std::string, std::string> icons_;
};

// IconManager.cpp
bool IconManager::LoadIcon(const std::string& name, const std::string& path)
{
    icons_[name] = path;
    return true;
}

std::string IconManager::GetIconPath(const std::string& name) const
{
    auto it = icons_.find(name);
    return it != icons_.end() ? it->second : "";
}

Rml::Element* IconManager::CreateIcon(Rml::Context* context, const std::string& name, const std::string& class_name)
{
    std::string path = GetIconPath(name);
    if (path.empty())
        return nullptr;
    
    Rml::Element* svg = context->CreateElement("svg");
    svg->SetAttribute("src", path);
    
    if (!class_name.empty())
        svg->SetClass(class_name);
    
    return svg;
}

bool IconManager::LoadIconsFromDirectory(const std::string& directory)
{
    // 扫描目录中的所有 SVG 文件
    std::vector<std::string> files = ScanDirectory(directory, "*.svg");
    
    for (const auto& file : files)
    {
        std::string name = GetFileNameWithoutExtension(file);
        std::string path = directory + "/" + file;
        
        LoadIcon(name, path);
    }
    
    return true;
}
```

### 3.2 使用图标系统

```cpp
// 初始化图标系统
void InitializeIcons()
{
    auto& icon_manager = IconManager::Instance();
    
    // 加载图标
    icon_manager.LoadIcon("play", "icons/play.svg");
    icon_manager.LoadIcon("pause", "icons/pause.svg");
    icon_manager.LoadIcon("stop", "icons/stop.svg");
    icon_manager.LoadIcon("settings", "icons/settings.svg");
    icon_manager.LoadIcon("user", "icons/user.svg");
    
    // 或批量加载
    icon_manager.LoadIconsFromDirectory("icons");
}

// 在界面中使用图标
void CreateMediaControls(Rml::Context* context, Rml::Element* parent)
{
    auto& icon_manager = IconManager::Instance();
    
    // 创建播放按钮
    Rml::Element* play_btn = context->CreateElement("button");
    play_btn->SetClass("media-button");
    play_btn->AppendChild(icon_manager.CreateIcon(context, "play"));
    parent->AppendChild(play_btn);
    
    // 创建暂停按钮
    Rml::Element* pause_btn = context->CreateElement("button");
    pause_btn->SetClass("media-button");
    pause_btn->AppendChild(icon_manager.CreateIcon(context, "pause"));
    parent->AppendChild(pause_btn);
    
    // 创建停止按钮
    Rml::Element* stop_btn = context->CreateElement("button");
    stop_btn->SetClass("media-button");
    stop_btn->AppendChild(icon_manager.CreateIcon(context, "stop"));
    parent->AppendChild(stop_btn);
}
```

---

## 四、SVG 动画

### 4.1 SVG 动画集成

```xml
<rml>
<head>
    <title>SVG 动画</title>
    <link type="text/rcss" href="svg_animation.rcss"/>
</head>
<body>
    <h1>SVG 动画示例</h1>
    
    <!-- 旋转动画 -->
    <svg src="icons/spinner.svg" class="spinner"/>
    
    <!-- 脉冲动画 -->
    <svg src="icons/pulse.svg" class="pulse"/>
    
    <!-- 弹跳动画 -->
    <svg src="icons/bounce.svg" class="bounce"/>
</body>
</rml>
```

```css
/* svg_animation.rcss */
.spinner {
    width: 48px;
    height: 48px;
    animation: rotate 1s linear infinite;
}

.pulse {
    width: 48px;
    height: 48px;
    animation: pulse 2s ease-in-out infinite;
}

.bounce {
    width: 48px;
    height: 48px;
    animation: bounce 1s ease-in-out infinite;
}

@keyframes rotate {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
}

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

@keyframes bounce {
    0%, 100% {
        transform: translateY(0);
    }
    50% {
        transform: translateY(-10px);
    }
}
```

### 4.2 程序化 SVG 动画

```cpp
// SVGAnimator.h
#pragma once
#include <RmlUi/Core/Element.h>
#include <string>

class SVGAnimator
{
public:
    static void AnimateRotation(Rml::Element* svg, float angle, float duration);
    static void AnimateScale(Rml::Element* svg, float scale, float duration);
    static void AnimateOpacity(Rml::Element* svg, float opacity, float duration);

private:
    static void ApplyTransform(Rml::Element* element, const std::string& transform);
};

// SVGAnimator.cpp
void SVGAnimator::AnimateRotation(Rml::Element* svg, float angle, float duration)
{
    std::string transform = "rotate(" + std::to_string(angle) + "deg)";
    
    svg->Animate(
        "transform",
        transform,
        duration,
        Rml::Tween::CubicEaseInOut
    );
}

void SVGAnimator::AnimateScale(Rml::Element* svg, float scale, float duration)
{
    std::string transform = "scale(" + std::to_string(scale) + ")";
    
    svg->Animate(
        "transform",
        transform,
        duration,
        Rml::Tween::BackEaseOut
    );
}

void SVGAnimator::AnimateOpacity(Rml::Element* svg, float opacity, float duration)
{
    svg->Animate(
        "opacity",
        std::to_string(opacity),
        duration,
        Rml::Tween::Linear
    );
}
```

---

## 五、实战练习

### 练习 1：创建图标库

创建一个完整的图标库：
- 加载多个 SVG 图标
- 实现图标大小变化
- 支持图标颜色主题

### 练习 2：实现 SVG 背景

使用 SVG 创建动态背景：
- 渐变动画
- 粒子效果
- 几何图案

### 练习 3：创建 SVG 交互

创建可交互的 SVG 界面：
- 可点击的区域
- 悬停效果
- 拖拽支持

---

## 六、最佳实践

### 6.1 性能优化
- ✅ 缓存已加载的 SVG
- ✅ 使用 SVG 图标精灵
- ✅ 优化 SVG 文件大小
- ✅ 避免过度使用 SVG

### 6.2 兼容性
- ✅ 提供备用图标
- ✅ 处理加载失败
- ✅ 支持不同分辨率
- ✅ 考虑性能影响

### 6.3 设计建议
- ✅ 保持 SVG 简洁
- ✅ 使用一致的样式
- ✅ 考虑可访问性
- ✅ 提供多个变体

---

## 七、下一步

继续学习 [Lottie 动画](06-lottie-animation.md) 来实现更复杂的动画效果。

---

## 📝 检查清单

- [ ] 理解 SVG 插件
- [ ] 能够在 RML 中使用 SVG
- [ ] 掌握 SVG 样式
- [ ] 理解 SVG 装饰器
- [ ] 能够创建图标系统
- [ ] 能够实现 SVG 动画
- [ ] 理解 SVG 最佳实践