# 5.1 自定义元素

自定义元素是 RmlUi 扩展能力的核心，允许你创建具有独特行为和外观的 UI 组件。本节将深入讲解如何继承 Element 类、重写关键方法、注册自定义属性，并实现生产级别的自定义元素。

---

## 一、Element 类的继承体系

### 1.1 类层次结构

```
Element (基类)
  ├── ElementDocument (文档根元素)
  ├── ElementFormControl (表单控件基类)
  │     ├── ElementFormControlInput
  │     ├── ElementFormControlSelect
  │     └── ...
  ├── ElementText (文本元素)
  ├── ElementTabSet (标签页)
  └── 你的自定义元素
```

### 1.2 核心虚函数分类

```cpp
class Element {
public:
    // ========== 生命周期函数 ==========
    virtual ~Element();
    
    // ========== 布局相关 ==========
    virtual void OnLayout();
    virtual void OnResize();
    
    // ========== 渲染相关 ==========
    virtual void OnRender();
    
    // ========== 属性变化 ==========
    virtual void OnAttributeChange(const ElementAttributes& changed_attributes);
    virtual void OnPropertyChange(const PropertyIdSet& changed_properties);
    
    // ========== 子元素管理 ==========
    virtual void OnChildAdd(Element* child);
    virtual void OnChildRemove(Element* child);
    
    // ========== 事件处理 ==========
    virtual void OnUpdate();
    virtual void OnFocus();
    virtual void OnBlur();
    
    // ========== 数据绑定 ==========
    virtual void OnDataModelChange();
    
    // ========== 辅助函数 ==========
    virtual float GetBaseline() const;
    virtual bool IsSelectable() const;
};
```

---

## 二、ElementInstancer：元素实例化器

### 2.1 为什么需要 ElementInstancer

RmlUi 使用**实例化器模式**来创建元素，这样可以：
- 控制内存分配策略
- 支持对象池优化
- 解耦元素创建和元素逻辑

### 2.2 创建自定义 ElementInstancer

```cpp
// CustomProgressBar.h
#pragma once
#include <RmlUi/Core/Element.h>
#include <RmlUi/Core/ElementInstancer.h>

// 前向声明
class ElementInstancerCustomProgressBar;

// 自定义进度条元素
class ElementCustomProgressBar : public Rml::Element
{
public:
    RMLUI_RTTI_DefineWithParent(ElementCustomProgressBar, Rml::Element)

    ElementCustomProgressBar(const Rml::String& tag);
    virtual ~ElementCustomProgressBar();

    // ========== 必须重写的核心方法 ==========
    void OnRender() override;
    void OnLayout() override;
    void OnAttributeChange(const Rml::ElementAttributes& changed_attributes) override;

    // ========== 可选重写的方法 ==========
    void OnResize() override;
    void OnUpdate() override;
    void OnChildAdd(Element* child) override;
    void OnChildRemove(Element* child) override;

    // ========== 自定义公共接口 ==========
    void SetValue(float value);
    float GetValue() const;
    void SetRange(float min, float max);
    void SetColor(const Rml::Colourb& color);

    // ========== 自定义属性注册 ==========
    static void RegisterCustomProperties(Rml::PropertySpecification& specification);

private:
    // ========== 内部状态 ==========
    float value_;           // 当前值
    float min_;             // 最小值
    float max_;             // 最大值
    Rml::Colourb color_;    // 进度条颜色
    Rml::Colourb bgColor_;  // 背景颜色
    
    // ========== 渲染相关 ==========
    bool geometry_dirty_;   // 几何体是否需要重建
    Rml::TextureHandle texture_;
    
    // ========== 缓存 ==========
    float percentage_;      // 缓存的百分比
    Rml::Vector2f size_;    // 缓存的尺寸
    
    // ========== 辅助方法 ==========
    void UpdateGeometry();
    void ClampValue();
};

// 自定义进度条实例化器
class ElementInstancerCustomProgressBar : public Rml::ElementInstancer
{
public:
    ElementInstancerCustomProgressBar();
    virtual ~ElementInstancerCustomProgressBar();

    // ========== 实例化元素 ==========
    Rml::ElementPtr InstanceElement(
        Rml::Element* parent,
        const Rml::String& tag,
        const Rml::XMLAttributes& attributes) override;

    // ========== 释放元素 ==========
    void ReleaseElement(Rml::Element* element) override;

    // ========== 注册自定义属性 ==========
    void RegisterProperties();

private:
    // 属性 ID
    Rml::PropertyId id_value_;
    Rml::PropertyId id_min_;
    Rml::PropertyId id_max_;
    Rml::PropertyId id_color_;
    Rml::PropertyId id_bg_color_;
};
```

### 2.3 实现 ElementInstancer

```cpp
// CustomProgressBar.cpp
#include "CustomProgressBar.h"
#include <RmlUi/Core/Core.h>
#include <RmlUi/Core/Factory.h>
#include <RmlUi/Core/Geometry.h>
#include <RmlUi/Core/PropertyDefinition.h>

// ========== ElementCustomProgressBar 实现 ==========

ElementCustomProgressBar::ElementCustomProgressBar(const Rml::String& tag)
    : Rml::Element(tag)
    , value_(0.0f)
    , min_(0.0f)
    , max_(100.0f)
    , color_(52, 152, 219, 255)  // 默认蓝色
    , bgColor_(44, 62, 80, 255)   // 默认深灰色
    , geometry_dirty_(true)
    , percentage_(0.0f)
{
    // 设置初始样式
    SetProperty(Rml::PropertyId::Display, Rml::Style::Display::Block);
    SetProperty(Rml::PropertyId::Width, Rml::Property(200.0f, Rml::Unit::DP));
    SetProperty(Rml::PropertyId::Height, Rml::Property(20.0f, Rml::Unit::DP));
}

ElementCustomProgressBar::~ElementCustomProgressBar()
{
    // 清理资源
}

void ElementCustomProgressBar::OnRender()
{
    // 如果几何体脏了，重建它
    if (geometry_dirty_)
    {
        UpdateGeometry();
        geometry_dirty_ = false;
    }

    // 获取渲染管理器
    if (auto* render_manager = GetRenderManager())
    {
        // 渲染背景
        Rml::Rectangle background_rect = GetBox().GetEdge(Rml::BoxArea::Border);
        render_manager->RenderGeometry(
            Rml::Vertex::CreateRect(background_rect, bgColor_),
            Rml::Rectangle::GetIndices(),
            {},
            Rml::Matrix4f::Identity()
        );

        // 渲染进度条
        if (percentage_ > 0.0f)
        {
            Rml::Rectangle progress_rect = GetBox().GetEdge(Rml::BoxArea::Border);
            progress_rect.right = progress_rect.left + (progress_rect.right - progress_rect.left) * percentage_;
            
            render_manager->RenderGeometry(
                Rml::Vertex::CreateRect(progress_rect, color_),
                Rml::Rectangle::GetIndices(),
                {},
                Rml::Matrix4f::Identity()
            );
        }
    }
}

void ElementCustomProgressBar::OnLayout()
{
    // 更新缓存的尺寸
    size_ = GetBox().GetSize(Rml::BoxArea::Border);
    
    // 标记几何体需要重建
    geometry_dirty_ = true;
}

void ElementCustomProgressBar::OnResize()
{
    // 尺寸变化时更新几何体
    geometry_dirty_ = true;
}

void ElementCustomProgressBar::OnAttributeChange(const Rml::ElementAttributes& changed_attributes)
{
    Rml::Element::OnAttributeChange(changed_attributes);

    // 检查自定义属性变化
    for (const auto& pair : changed_attributes)
    {
        const Rml::String& name = pair.first.Get();
        const Rml::Variant& value = pair.second;

        if (name == "value")
        {
            SetValue(value.Get<float>());
        }
        else if (name == "min")
        {
            min_ = value.Get<float>();
            ClampValue();
        }
        else if (name == "max")
        {
            max_ = value.Get<float>();
            ClampValue();
        }
        else if (name == "color")
        {
            color_ = value.Get<Rml::Colourb>();
            geometry_dirty_ = true;
        }
        else if (name == "bg-color")
        {
            bgColor_ = value.Get<Rml::Colourb>();
            geometry_dirty_ = true;
        }
    }
}

void ElementCustomProgressBar::OnUpdate()
{
    // 每帧更新逻辑
    // 例如：动画效果
}

void ElementCustomProgressBar::OnChildAdd(Element* child)
{
    Rml::Element::OnChildAdd(child);
    // 处理子元素添加
}

void ElementCustomProgressBar::OnChildRemove(Element* child)
{
    Rml::Element::OnChildRemove(child);
    // 处理子元素移除
}

void ElementCustomProgressBar::SetValue(float value)
{
    value_ = value;
    ClampValue();
    geometry_dirty_ = true;
}

float ElementCustomProgressBar::GetValue() const
{
    return value_;
}

void ElementCustomProgressBar::SetRange(float min, float max)
{
    min_ = min;
    max_ = max;
    ClampValue();
    geometry_dirty_ = true;
}

void ElementCustomProgressBar::SetColor(const Rml::Colourb& color)
{
    color_ = color;
    geometry_dirty_ = true;
}

void ElementCustomProgressBar::UpdateGeometry()
{
    // 计算百分比
    if (max_ > min_)
    {
        percentage_ = (value_ - min_) / (max_ - min_);
        percentage_ = Rml::Math::Clamp(percentage_, 0.0f, 1.0f);
    }
    else
    {
        percentage_ = 0.0f;
    }
}

void ElementCustomProgressBar::ClampValue()
{
    value_ = Rml::Math::Clamp(value_, min_, max_);
}

void ElementCustomProgressBar::RegisterCustomProperties(Rml::PropertySpecification& specification)
{
    // 注册自定义属性
    specification.RegisterProperty("value", "0", false)
        .AddParser("number")
        .GetId();

    specification.RegisterProperty("min", "0", false)
        .AddParser("number")
        .GetId();

    specification.RegisterProperty("max", "100", false)
        .AddParser("number")
        .GetId();

    specification.RegisterProperty("color", "#3498db", false)
        .AddParser("color")
        .GetId();

    specification.RegisterProperty("bg-color", "#2c3e50", false)
        .AddParser("color")
        .GetId();
}

// ========== ElementInstancerCustomProgressBar 实现 ==========

ElementInstancerCustomProgressBar::ElementInstancerCustomProgressBar()
{
    // 注册属性 ID
    RegisterProperties();
}

ElementInstancerCustomProgressBar::~ElementInstancerCustomProgressBar()
{
}

Rml::ElementPtr ElementInstancerCustomProgressBar::InstanceElement(
    Rml::Element* parent,
    const Rml::String& tag,
    const Rml::XMLAttributes& attributes)
{
    // 创建自定义元素
    auto element = Rml::MakeShared<ElementCustomProgressBar>(tag);
    
    // 应用初始属性
    for (const auto& attr : attributes)
    {
        element->SetAttribute(attr.first.Get(), attr.second);
    }
    
    return element;
}

void ElementInstancerCustomProgressBar::ReleaseElement(Rml::Element* element)
{
    // 释放元素（使用智能指针自动管理）
}

void ElementInstancerCustomProgressBar::RegisterProperties()
{
    // 注册自定义属性
    id_value_ = RegisterProperty("value", "0", false)
        .AddParser("number")
        .GetId();

    id_min_ = RegisterProperty("min", "0", false)
        .AddParser("number")
        .GetId();

    id_max_ = RegisterProperty("max", "100", false)
        .AddParser("number")
        .GetId();

    id_color_ = RegisterProperty("color", "#3498db", false)
        .AddParser("color")
        .GetId();

    id_bg_color_ = RegisterProperty("bg-color", "#2c3e50", false)
        .AddParser("color")
        .GetId();
}
```

---

## 三、注册自定义元素

### 3.1 在初始化时注册

```cpp
// App.cpp
#include "CustomProgressBar.h"

class App
{
public:
    bool Initialize()
    {
        // ... 其他初始化代码 ...

        // 注册自定义元素
        RegisterCustomElements();

        return true;
    }

private:
    void RegisterCustomElements()
    {
        // 获取工厂
        Rml::Factory* factory = Rml::Factory::Instance();

        // 创建实例化器
        auto progress_bar_instancer = 
            std::make_unique<ElementInstancerCustomProgressBar>();

        // 注册自定义元素类型
        factory->RegisterElementInstancer(
            "progressbar", 
            std::move(progress_bar_instancer)
        );
    }
};
```

### 3.2 在 RML 中使用自定义元素

```xml
<rml>
<head>
    <title>自定义进度条示例</title>
    <link type="text/rcss" href="style.rcss"/>
</head>
<body>
    <h1>自定义进度条</h1>

    <!-- 使用自定义进度条 -->
    <progressbar id="hp-bar" 
                value="75" 
                min="0" 
                max="100"
                color="#e74c3c"
                bg-color="#34495e"
                style="width: 300px; height: 25px;"/>

    <div class="controls">
        <button onclick="decrease_hp()">减少</button>
        <button onclick="increase_hp()">增加</button>
    </div>

    <script>
        function decrease_hp() {
            var bar = document.getElementById('hp-bar');
            var value = parseFloat(bar.getAttribute('value'));
            bar.setAttribute('value', Math.max(0, value - 10));
        }

        function increase_hp() {
            var bar = document.getElementById('hp-bar');
            var value = parseFloat(bar.getAttribute('value'));
            bar.setAttribute('value', Math.min(100, value + 10));
        }
    </script>
</body>
</rml>
```

### 3.3 在 RCSS 中设置样式

```css
/* 自定义进度条样式 */
progressbar {
    display: block;
    border: 2px solid #333;
    border-radius: 4px;
    overflow: hidden;
    box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.3);
}

/* 悬停效果 */
progressbar:hover {
    box-shadow: 0 0 5px rgba(52, 152, 219, 0.5);
}

/* 控制按钮样式 */
.controls {
    margin-top: 20px;
    display: flex;
    gap: 10px;
}

button {
    padding: 8px 16px;
    background: #3498db;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

button:hover {
    background: #2980b9;
}
```

---

## 四、进阶：自定义滑块控件

### 4.1 完整实现

```cpp
// CustomSlider.h
#pragma once
#include <RmlUi/Core/Element.h>
#include <RmlUi/Core/ElementInstancer.h>
#include <RmlUi/Core/EventListener.h>

class ElementInstancerCustomSlider;

class ElementCustomSlider : public Rml::Element, public Rml::EventListener
{
public:
    RMLUI_RTTI_DefineWithParent(ElementCustomSlider, Rml::Element)

    ElementCustomSlider(const Rml::String& tag);
    virtual ~ElementCustomSlider();

    // ========== 核心方法 ==========
    void OnRender() override;
    void OnLayout() override;
    void OnAttributeChange(const Rml::ElementAttributes& changed_attributes) override;

    // ========== 事件处理 ==========
    void ProcessEvent(Rml::Event& event) override;

    // ========== 自定义接口 ==========
    void SetValue(float value);
    float GetValue() const;
    void SetRange(float min, float max);
    void SetStep(float step);

private:
    // ========== 内部状态 ==========
    float value_;
    float min_;
    float max_;
    float step_;
    
    // ========== 交互状态 ==========
    bool is_dragging_;
    Rml::Vector2f drag_start_;
    float drag_start_value_;
    
    // ========== 几何体 ==========
    Rml::Rectangle track_rect_;
    Rml::Rectangle thumb_rect_;
    bool geometry_dirty_;
    
    // ========== 辅助方法 ==========
    void UpdateGeometry();
    float ValueFromPosition(const Rml::Vector2f& position);
    void ClampValue();
    float SnapToStep(float value);
    void DispatchChangeEvent();
};

class ElementInstancerCustomSlider : public Rml::ElementInstancer
{
public:
    ElementInstancerCustomSlider();
    virtual ~ElementInstancerCustomSlider();

    Rml::ElementPtr InstanceElement(
        Rml::Element* parent,
        const Rml::String& tag,
        const Rml::XMLAttributes& attributes) override;

    void ReleaseElement(Rml::Element* element) override;

private:
    Rml::PropertyId id_value_;
    Rml::PropertyId id_min_;
    Rml::PropertyId id_max_;
    Rml::PropertyId id_step_;
    Rml::PropertyId id_track_color_;
    Rml::PropertyId id_thumb_color_;
};
```

```cpp
// CustomSlider.cpp (部分实现)
#include "CustomSlider.h"
#include <RmlUi/Core/Core.h>
#include <RmlUi/Core/Factory.h>
#include <RmlUi/Core/Math.h>

ElementCustomSlider::ElementCustomSlider(const Rml::String& tag)
    : Rml::Element(tag)
    , value_(50.0f)
    , min_(0.0f)
    , max_(100.0f)
    , step_(1.0f)
    , is_dragging_(false)
    , geometry_dirty_(true)
{
    // 添加事件监听
    AddEventListener(Rml::EventId::Mousedown, this);
    AddEventListener(Rml::EventId::Mouseup, this);
    AddEventListener(Rml::EventId::Mousemove, this);
}

ElementCustomSlider::~ElementCustomSlider()
{
}

void ElementCustomSlider::OnRender()
{
    if (geometry_dirty_)
    {
        UpdateGeometry();
        geometry_dirty_ = false;
    }

    if (auto* render_manager = GetRenderManager())
    {
        // 渲染轨道
        render_manager->RenderGeometry(
            Rml::Vertex::CreateRect(track_rect_, Rml::Colourb(100, 100, 100, 255)),
            Rml::Rectangle::GetIndices(),
            {},
            Rml::Matrix4f::Identity()
        );

        // 渲染滑块
        render_manager->RenderGeometry(
            Rml::Vertex::CreateRect(thumb_rect_, Rml::Colourb(52, 152, 219, 255)),
            Rml::Rectangle::GetIndices(),
            {},
            Rml::Matrix4f::Identity()
        );
    }
}

void ElementCustomSlider::ProcessEvent(Rml::Event& event)
{
    switch (event.GetId())
    {
        case Rml::EventId::Mousedown:
            {
                Rml::Vector2f mouse_pos = event.GetParameter<Rml::Vector2f>("mouse_pos", Rml::Vector2f(0, 0));
                Rml::Vector2f local_pos = mouse_pos - GetAbsoluteLeftTop();
                
                // 检查是否点击了滑块
                if (thumb_rect_.Contains(local_pos))
                {
                    is_dragging_ = true;
                    drag_start_ = mouse_pos;
                    drag_start_value_ = value_;
                    SetPseudoClass("active", true);
                }
                else
                {
                    // 点击轨道，跳转到该位置
                    SetValue(ValueFromPosition(local_pos));
                    DispatchChangeEvent();
                }
            }
            break;

        case Rml::EventId::Mouseup:
            if (is_dragging_)
            {
                is_dragging_ = false;
                SetPseudoClass("active", false);
                DispatchChangeEvent();
            }
            break;

        case Rml::EventId::Mousemove:
            if (is_dragging_)
            {
                Rml::Vector2f mouse_pos = event.GetParameter<Rml::Vector2f>("mouse_pos", Rml::Vector2f(0, 0));
                Rml::Vector2f local_pos = mouse_pos - GetAbsoluteLeftTop();
                
                float delta = (mouse_pos.x - drag_start_.x) / track_rect_.Width();
                float new_value = drag_start_value_ + delta * (max_ - min_);
                SetValue(new_value);
            }
            break;
    }
}

void ElementCustomSlider::UpdateGeometry()
{
    Rml::Rectangle box = GetBox().GetEdge(Rml::BoxArea::Border);
    
    // 轨道高度
    float track_height = 4.0f;
    track_rect_ = box;
    track_rect_.top = box.CenterY() - track_height / 2;
    track_rect_.bottom = track_rect_.top + track_height;
    
    // 滑块大小
    float thumb_size = 16.0f;
    thumb_rect_.top = box.CenterY() - thumb_size / 2;
    thumb_rect_.bottom = thumb_rect_.top + thumb_size;
    thumb_rect_.width = thumb_size;
    thumb_rect_.height = thumb_size;
    
    // 计算滑块位置
    float percentage = (value_ - min_) / (max_ - min_);
    thumb_rect_.left = track_rect_.left + track_rect_.Width() * percentage - thumb_size / 2;
    thumb_rect_.right = thumb_rect_.left + thumb_size;
}

float ElementCustomSlider::ValueFromPosition(const Rml::Vector2f& position)
{
    float relative_x = position.x - track_rect_.left;
    float percentage = relative_x / track_rect_.Width();
    float value = min_ + percentage * (max_ - min_);
    return SnapToStep(value);
}

float ElementCustomSlider::SnapToStep(float value)
{
    if (step_ > 0.0f)
    {
        value = roundf(value / step_) * step_;
    }
    return value;
}

void ElementCustomSlider::ClampValue()
{
    value_ = Rml::Math::Clamp(value_, min_, max_);
}

void ElementCustomSlider::DispatchChangeEvent()
{
    // 触发自定义事件
    Rml::Dictionary parameters;
    parameters["value"] = value_;
    DispatchEvent(Rml::StringId("change"), parameters);
}
```

---

## 五、高级技巧

### 5.1 自定义数据绑定

```cpp
// 在自定义元素中支持数据绑定
class ElementCustomProgressBar : public Rml::Element
{
public:
    // 支持数据绑定的 getter/setter
    virtual Rml::Variant GetDataBindingValue() const override
    {
        return value_;
    }

    virtual void SetDataBindingValue(const Rml::Variant& value) override
    {
        SetValue(value.Get<float>());
    }
};
```

### 5.2 自定义动画

```cpp
// 添加动画支持
class ElementCustomProgressBar : public Rml::Element
{
private:
    float animated_value_;
    float target_value_;
    float animation_speed_;

    void OnUpdate() override
    {
        // 平滑动画到目标值
        float delta = target_value_ - animated_value_;
        if (fabs(delta) > 0.01f)
        {
            animated_value_ += delta * animation_speed_;
            value_ = animated_value_;
            geometry_dirty_ = true;
        }
    }
};
```

### 5.3 性能优化

```cpp
// 使用脏标记避免不必要的更新
class ElementCustomProgressBar : public Rml::Element
{
private:
    enum DirtyFlags {
        Dirty_None = 0,
        Dirty_Geometry = 1 << 0,
        Dirty_Text = 1 << 1,
        Dirty_All = 0xFF
    };
    
    unsigned int dirty_flags_;
    
    void MarkDirty(unsigned int flags)
    {
        dirty_flags_ |= flags;
    }
    
    void OnRender() override
    {
        if (dirty_flags_ & Dirty_Geometry)
        {
            UpdateGeometry();
            dirty_flags_ &= ~Dirty_Geometry;
        }
        
        // 渲染...
    }
};
```

### 5.4 纹理支持

```cpp
// 支持自定义纹理
class ElementCustomProgressBar : public Rml::Element
{
private:
    Rml::TextureHandle texture_;
    
    void LoadTexture(const Rml::String& filename)
    {
        if (auto* render_manager = GetRenderManager())
        {
            texture_ = render_manager->LoadTexture(filename);
            if (!texture_)
            {
                Rml::Log::Message(Rml::Log::LT_ERROR, 
                    "Failed to load texture: %s", filename.c_str());
            }
        }
    }
    
    void OnRender() override
    {
        if (auto* render_manager = GetRenderManager())
        {
            // 使用纹理渲染
            render_manager->RenderGeometry(
                vertices_,
                indices_,
                texture_,
                transform_
            );
        }
    }
};
```

---

## 六、完整示例：游戏生命值条

```cpp
// GameHealthBar.h
#pragma once
#include <RmlUi/Core/Element.h>
#include <RmlUi/Core/ElementInstancer.h>

class ElementGameHealthBar : public Rml::Element
{
public:
    RMLUI_RTTI_DefineWithParent(ElementGameHealthBar, Rml::Element)

    ElementGameHealthBar(const Rml::String& tag);
    virtual ~ElementGameHealthBar();

    void OnRender() override;
    void OnAttributeChange(const Rml::ElementAttributes& changed_attributes) override;

    // 游戏特有接口
    void SetCurrentHealth(float current);
    void SetMaxHealth(float max);
    void SetShield(float shield);
    void SetMaxShield(float max);
    
    // 动画效果
    void PlayDamageEffect();
    void PlayHealEffect();

private:
    float current_health_;
    float max_health_;
    float shield_;
    float max_shield_;
    
    Rml::Colourb health_color_;
    Rml::Colourb shield_color_;
    
    // 动画状态
    float damage_flash_;
    float heal_flash_;
    bool animation_active_;
    
    void UpdateAnimation();
};

// GameHealthBar.cpp
#include "GameHealthBar.h"
#include <RmlUi/Core/Core.h>
#include <RmlUi/Core/Math.h>
#include <RmlUi/Core/RenderManager.h>

ElementGameHealthBar::ElementGameHealthBar(const Rml::String& tag)
    : Rml::Element(tag)
    , current_health_(100.0f)
    , max_health_(100.0f)
    , shield_(0.0f)
    , max_shield_(50.0f)
    , health_color_(231, 76, 60, 255)   // 红色
    , shield_color_(52, 152, 219, 255)  // 蓝色
    , damage_flash_(0.0f)
    , heal_flash_(0.0f)
    , animation_active_(false)
{
}

void ElementGameHealthBar::OnRender()
{
    if (auto* render_manager = GetRenderManager())
    {
        Rml::Rectangle box = GetBox().GetEdge(Rml::BoxArea::Border);
        
        // 渲染背景
        render_manager->RenderGeometry(
            Rml::Vertex::CreateRect(box, Rml::Colourb(44, 62, 80, 255)),
            Rml::Rectangle::GetIndices(),
            {},
            Rml::Matrix4f::Identity()
        );
        
        // 渲染护盾（如果有）
        if (shield_ > 0.0f)
        {
            float shield_width = box.Width() * (shield_ / max_shield_);
            Rml::Rectangle shield_rect = box;
            shield_rect.right = shield_rect.left + shield_width;
            
            Rml::Colourb shield_color = shield_color_;
            if (damage_flash_ > 0.0f)
            {
                shield_color.red = Rml::Math::Clamp(shield_color.red + damage_flash_ * 255, 0, 255);
            }
            
            render_manager->RenderGeometry(
                Rml::Vertex::CreateRect(shield_rect, shield_color),
                Rml::Rectangle::GetIndices(),
                {},
                Rml::Matrix4f::Identity()
            );
        }
        
        // 渲染生命值
        float health_width = box.Width() * (current_health_ / max_health_);
        Rml::Rectangle health_rect = box;
        health_rect.right = health_rect.left + health_width;
        
        Rml::Colourb health_color = health_color_;
        if (damage_flash_ > 0.0f)
        {
            health_color.red = Rml::Math::Clamp(health_color.red + damage_flash_ * 255, 0, 255);
        }
        if (heal_flash_ > 0.0f)
        {
            health_color.green = Rml::Math::Clamp(health_color.green + heal_flash_ * 255, 0, 255);
        }
        
        render_manager->RenderGeometry(
            Rml::Vertex::CreateRect(health_rect, health_color),
            Rml::Rectangle::GetIndices(),
            {},
            Rml::Matrix4f::Identity()
        );
        
        // 更新动画
        if (animation_active_)
        {
            UpdateAnimation();
        }
    }
}

void ElementGameHealthBar::SetCurrentHealth(float current)
{
    current_health_ = Rml::Math::Clamp(current, 0.0f, max_health_);
}

void ElementGameHealthBar::PlayDamageEffect()
{
    damage_flash_ = 1.0f;
    animation_active_ = true;
}

void ElementGameHealthBar::PlayHealEffect()
{
    heal_flash_ = 1.0f;
    animation_active_ = true;
}

void ElementGameHealthBar::UpdateAnimation()
{
    const float decay = 0.1f;
    
    if (damage_flash_ > 0.0f)
    {
        damage_flash_ -= decay;
        if (damage_flash_ < 0.0f) damage_flash_ = 0.0f;
    }
    
    if (heal_flash_ > 0.0f)
    {
        heal_flash_ -= decay;
        if (heal_flash_ < 0.0f) heal_flash_ = 0.0f;
    }
    
    if (damage_flash_ == 0.0f && heal_flash_ == 0.0f)
    {
        animation_active_ = false;
    }
}
```

---

## 七、最佳实践

### 7.1 内存管理

```cpp
// 使用智能指针管理资源
class ElementCustom : public Rml::Element
{
private:
    std::unique_ptr<Rml::Geometry> geometry_;
    std::shared_ptr<Rml::TextureHandle> texture_;
    
    // 不要手动 delete
    // Element 生命周期由 RmlUi 管理
};
```

### 7.2 错误处理

```cpp
void ElementCustom::OnRender()
{
    if (!GetRenderManager())
    {
        Rml::Log::Message(Rml::Log::LT_ERROR, 
            "Render manager not available");
        return;
    }
    
    // 检查纹理有效性
    if (texture_ && !texture_->IsTextureValid())
    {
        Rml::Log::Message(Rml::Log::LT_WARNING, 
            "Invalid texture");
        return;
    }
}
```

### 7.3 性能考虑

```cpp
// 避免每帧创建临时对象
class ElementCustom : public Rml::Element
{
private:
    // 缓存几何体
    std::vector<Rml::Vertex> cached_vertices_;
    std::vector<int> cached_indices_;
    
    // 只在必要时更新
    void UpdateGeometry()
    {
        if (!geometry_dirty_) return;
        
        // 重用缓存的向量
        cached_vertices_.clear();
        cached_indices_.clear();
        
        // 填充几何体数据
        // ...
        
        geometry_dirty_ = false;
    }
};
```

### 7.4 调试支持

```cpp
// 添加调试信息
class ElementCustom : public Rml::Element
{
public:
#ifdef RMLUI_DEBUG
    void OnRender() override
    {
        Rml::Element::OnRender();
        
        // 绘制调试边界
        if (IsPseudoClassSet("debug"))
        {
            DrawDebugBorder();
        }
    }
#endif
};
```

---

## 八、常见问题

### 8.1 元素不显示

**问题**：自定义元素创建后不显示

**原因**：
- 没有设置 display 属性
- 没有重写 OnRender
- 尺寸为 0

**解决方案**：
```cpp
ElementCustom::ElementCustom(const Rml::String& tag)
    : Rml::Element(tag)
{
    // 设置显示属性
    SetProperty(Rml::PropertyId::Display, Rml::Style::Display::Block);
    
    // 设置最小尺寸
    SetProperty(Rml::PropertyId::MinWidth, Rml::Property(100.0f, Rml::Unit::DP));
    SetProperty(Rml::PropertyId::MinHeight, Rml::Property(20.0f, Rml::Unit::DP));
}
```

### 8.2 属性不生效

**问题**：设置了属性但没有效果

**解决方案**：
```cpp
void ElementCustom::OnAttributeChange(const Rml::ElementAttributes& changed_attributes)
{
    // 确保调用基类方法
    Rml::Element::OnAttributeChange(changed_attributes);
    
    // 标记需要更新
    geometry_dirty_ = true;
    
    // 触发布局更新
    DirtyLayout();
}
```

### 8.3 性能问题

**问题**：自定义元素导致性能下降

**解决方案**：
```cpp
// 1. 使用脏标记
void OnRender() override
{
    if (!geometry_dirty_) return;
    
    // 更新几何体
    UpdateGeometry();
    geometry_dirty_ = false;
}

// 2. 缓存计算结果
void UpdateGeometry()
{
    // 缓存常用的计算结果
    size_ = GetBox().GetSize();
    percentage_ = CalculatePercentage();
}

// 3. 避免不必要的分配
// 重用 vector 而不是每次创建新的
```

---

## 九、实战练习

### 练习 1：创建圆形进度条

实现一个圆形进度条，支持：
- 顺时针/逆时针方向
- 自定义颜色
- 动画效果

### 练习 2：创建自定义列表

实现一个支持虚拟化的列表控件：
- 只渲染可见项
- 支持动态加载
- 支持项的回收

### 练习 3：创建图表控件

实现一个简单的图表控件：
- 支持折线图
- 支持柱状图
- 支持动画

---

## 十、下一步

继续学习 [自定义装饰器](02-custom-decorators.md) 来创建更复杂的视觉效果。

---

## 📝 检查清单

- [ ] 理解 Element 类的继承体系
- [ ] 掌握 ElementInstancer 的使用
- [ ] 能够重写核心虚函数
- [ ] 能够注册和使用自定义属性
- [ ] 能够实现自定义渲染
- [ ] 理解性能优化技巧
- [ ] 能够创建生产级别的自定义元素