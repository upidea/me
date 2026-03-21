# 5.2 自定义装饰器

装饰器（Decorators）是 RmlUi 中最强大的视觉定制工具，允许你为元素添加复杂的视觉效果而不需要修改元素本身。本节将深入讲解如何创建生产级别的自定义装饰器。

---

## 一、什么是装饰器？

### 1.1 装饰器的概念

装饰器是一种**可视化增强机制**，它可以在元素的外层包裹一层额外的视觉效果，类似于给元素"穿上一件外衣"。

**类比理解**：
- **普通CSS样式**：就像给一个房间刷漆、铺地板（改变基础外观）
- **装饰器**：就像给房间添加装饰灯、挂窗帘、贴墙纸（添加额外的视觉效果）

**装饰器的特点**：
- ✅ **非侵入性**：不需要修改元素本身的结构和逻辑
- ✅ **可复用**：同一个装饰器可以应用到多个元素
- ✅ **可组合**：多个装饰器可以同时使用
- ✅ **动态性**：可以通过CSS属性动态控制装饰器参数
- ✅ **性能优化**：支持脏标记和缓存机制

### 1.2 装饰器 vs 其他视觉效果

| 特性 | 装饰器 | CSS样式 | 滤镜 |
|------|--------|---------|------|
| 作用范围 | 元素外层 | 元素本身 | 元素本身 |
| 自定义程度 | 完全自定义 | 有限 | 有限 |
| 性能 | 高（可优化） | 中 | 中 |
| 复杂度 | 高 | 低 | 中 |
| 适用场景 | 特殊效果 | 基础样式 | 简单效果 |

### 1.3 常见应用场景

1. **游戏UI**：技能冷却效果、装备发光、粒子特效
2. **编辑器**：选中高亮、辅助线、网格背景
3. **表单**：验证错误提示、必填标记、焦点效果
4. **动画**：进度条加载、水波纹、火焰效果
5. **装饰性**：边框、阴影、渐变、图案

---

## 二、Decorator 类的继承体系

### 1.1 Decorator 类结构

```cpp
class Decorator {
public:
    // ========== 核心接口 ==========
    
    // 为每个使用此装饰器的元素生成数据
    virtual DecoratorDataHandle GenerateElementData(
        Element* element,
        BoxArea paint_area) const = 0;
    
    // 释放元素数据
    virtual void ReleaseElementData(
        DecoratorDataHandle element_data) const = 0;
    
    // 渲染装饰器
    virtual void RenderElement(
        Element* element,
        DecoratorDataHandle element_data) const = 0;

protected:
    // 纹理管理
    int AddTexture(Texture texture);
    Texture GetTexture(int index = 0) const;
    int GetNumTextures() const;
};

class DecoratorInstancer {
public:
    // 实例化装饰器
    virtual SharedPtr<Decorator> InstanceDecorator(
        const String& name,
        const PropertyDictionary& properties,
        const DecoratorInstancerInterface& instancer_interface) = 0;

protected:
    // 注册属性
    PropertyId RegisterProperty(
        const String& name,
        const String& default_value,
        bool inherit,
        bool forces_layout = false);
};
```

### 1.2 工作流程

```
RCSS 解析
    ↓
DecoratorInstancer::InstanceDecorator()
    ↓
创建 Decorator 实例
    ↓
元素使用装饰器时
    ↓
Decorator::GenerateElementData() → 创建元素数据
    ↓
每次渲染时
    ↓
Decorator::RenderElement() → 使用元素数据渲染
    ↓
元素销毁时
    ↓
Decorator::ReleaseElementData() → 释放元素数据
```

### 1.3 核心方法详解

**GenerateElementData - 生成元素数据**

```cpp
// 在元素首次使用装饰器时调用
// 参数：
//   element: 使用此装饰器的元素指针
//   paint_area: 要绘制装饰器的区域（Border, Padding, Content等）
// 返回值：元素数据的句柄（opaque pointer）
Rml::DecoratorDataHandle GenerateElementData(
    Rml::Element* element,
    Rml::BoxArea paint_area) const override
{
    // 1. 创建数据结构
    struct BorderData {
        Rml::Vector<Rml::Vertex> vertices;  // 顶点数组
        Rml::Vector<int> indices;          // 索引数组
        Rml::Colourb color;                // 颜色
    };
    
    BorderData* data = new BorderData();
    
    // 2. 获取元素的几何信息
    const Rml::Box& box = element->GetBox();
    Rml::Rectangle rect = box.GetEdge(paint_area);
    
    // 3. 生成顶点数据
    // 这里可以创建任意复杂的几何形状
    data->vertices.push_back({
        Rml::Vector2f(rect.left, rect.top),    // 位置
        Rml::Vector2f(0, 0),                   // 纹理坐标
        Rml::Colourb(255, 255, 255, 255)       // 颜色
    });
    
    // 4. 生成索引数据（用于三角形渲染）
    data->indices = {0, 1, 2, 0, 2, 3};
    
    // 5. 返回数据句柄
    return reinterpret_cast<Rml::DecoratorDataHandle>(data);
}
```

**关键点**：
- ✅ 只在元素首次使用装饰器时调用一次
- ✅ 需要将几何数据转换为顶点和索引
- ✅ 返回的句柄会在RenderElement中使用
- ✅ 必须在ReleaseElementData中释放内存

**ReleaseElementData - 释放元素数据**

```cpp
// 在元素销毁或装饰器变化时调用
void ReleaseElementData(
    Rml::DecoratorDataHandle element_data) const override
{
    // 1. 转换回原始指针
    BorderData* data = reinterpret_cast<BorderData*>(element_data);
    
    // 2. 清理资源
    data->vertices.clear();
    data->indices.clear();
    
    // 3. 释放内存
    delete data;
}
```

**关键点**：
- ✅ 必须清理所有分配的资源
- ✅ 避免内存泄漏
- ✅ 释放后该句柄不能再使用

**RenderElement - 渲染装饰器**

```cpp
// 每帧调用，用于渲染装饰器
void RenderElement(
    Rml::Element* element,
    Rml::DecoratorDataHandle element_data) const override
{
    // 1. 获取之前生成的数据
    BorderData* data = reinterpret_cast<BorderData*>(element_data);
    
    // 2. 获取渲染管理器
    if (auto* render_manager = element->GetRenderManager())
    {
        // 3. 提交渲染命令
        render_manager->RenderGeometry(
            data->vertices,           // 顶点数据
            data->indices,            // 索引数据
            {},                       // 纹理句柄（空表示无纹理）
            Rml::Matrix4f::Identity() // 变换矩阵
        );
    }
}
```

**关键点**：
- ✅ 每帧调用，性能很关键
- ✅ 只使用GenerateElementData生成的数据
- ✅ 通过RenderInterface提交渲染命令
- ✅ 可以实现动态效果（动画、粒子等）

**三个方法的职责分工**：

| 方法 | 调用时机 | 职责 | 性能要求 |
|------|---------|------|---------|
| GenerateElementData | 元素首次使用装饰器 | 计算几何、生成数据 | 中（只调用一次） |
| ReleaseElementData | 元素销毁时 | 释放资源 | 低 |
| RenderElement | 每帧渲染 | 提交渲染命令 | 高（每帧调用） |

---

## 二、创建自定义装饰器的完整步骤

### 2.1 步骤总览

```
第1步：设计装饰器功能
    ↓
第2步：创建 Decorator 类
    ↓
第3步：创建 DecoratorInstancer 类
    ↓
第4步：在应用中注册装饰器
    ↓
第5步：在RCSS中使用装饰器
```

### 2.2 每步详细说明

**第1步：设计装饰器功能**

在开始编码前，先明确：
- ✅ 装饰器要实现什么视觉效果？
- ✅ 需要哪些可配置参数？（颜色、大小、速度等）
- ✅ 是否需要动画？
- ✅ 性能要求如何？

**第2步：创建 Decorator 类**

```cpp
// 必须继承 Rml::Decorator
class MyDecorator : public Rml::Decorator {
public:
    // 构造函数：初始化参数
    MyDecorator();
    
    // 初始化方法：设置装饰器参数
    bool Initialise(参数列表);
    
    // 核心方法：生成元素数据
    Rml::DecoratorDataHandle GenerateElementData(...) override;
    
    // 核心方法：释放元素数据
    void ReleaseElementData(...) override;
    
    // 核心方法：渲染装饰器
    void RenderElement(...) override;
    
private:
    // 装饰器参数
    参数类型 param1_;
    参数类型 param2_;
};
```

**第3步：创建 DecoratorInstancer 类**

```cpp
// 必须继承 Rml::DecoratorInstancer
class DecoratorInstancerMy : public Rml::DecoratorInstancer {
public:
    // 构造函数：注册可接受的属性
    DecoratorInstancerMy();
    
    // 核心方法：创建装饰器实例
    Rml::SharedPtr<Rml::Decorator> InstanceDecorator(...) override;
    
private:
    // 属性ID（用于快速访问）
    Rml::PropertyId id_param1_;
    Rml::PropertyId id_param2_;
};
```

**第4步：在应用中注册装饰器**

```cpp
void App::RegisterCustomDecorators() {
    Rml::Factory* factory = Rml::Factory::Instance();
    
    // 创建装饰器实例化器
    auto instancer = std::make_unique<DecoratorInstancerMy>();
    
    // 注册到工厂
    factory->RegisterDecoratorInstancer("my-decorator", std::move(instancer));
}
```

**第5步：在RCSS中使用装饰器**

```css
/* 使用装饰器 */
.my-element {
    decorator: my-decorator(
        param1: value1;
        param2: value2
    );
}

/* 动态效果 */
.my-element:hover {
    decorator: my-decorator(
        param1: another_value;
        param2: another_value
    );
}
```

### 2.3 调试技巧

**技巧1：使用日志调试**

```cpp
Rml::DecoratorDataHandle GenerateElementData(...) const override {
    Rml::Log::Message(Rml::Log::LT_INFO, 
        "GenerateElementData called for element: %s", 
        element->GetId().c_str());
    
    // 记录关键信息
    Rml::Log::Message(Rml::Log::LT_DEBUG, 
        "Box size: %.1f x %.1f", 
        box.GetWidth(), box.GetHeight());
    
    // ...
}
```

**技巧2：可视化调试**

```cpp
void RenderElement(...) const override {
    // 添加调试信息到控制台
    static int debug_counter = 0;
    if (debug_counter++ % 60 == 0) {  // 每秒一次
        Rml::Log::Message(Rml::Log::LT_DEBUG, 
            "Rendering decorator, vertices: %zu", 
            data->vertices.size());
    }
    
    // 正常渲染...
}
```

**技巧3：参数验证**

```cpp
bool Initialise(参数类型 param1, 参数类型 param2) {
    // 验证参数范围
    if (param1 < 0 || param1 > 100) {
        Rml::Log::Message(Rml::Log::LT_WARNING, 
            "Invalid param1 value: %f, clamping to [0, 100]", param1);
        param1_ = Rml::Math::Clamp(param1, 0.0f, 100.0f);
    } else {
        param1_ = param1;
    }
    
    // 检查参数依赖关系
    if (param2 < param1) {
        Rml::Log::Message(Rml::Log::LT_WARNING, 
            "param2 should be >= param1, swapping values");
        std::swap(param1_, param2_);
    }
    
    return true;
}
```

**技巧4：性能监控**

```cpp
void RenderElement(...) const override {
    // 性能计时
    static double total_time = 0.0;
    static int frame_count = 0;
    
    auto start = std::chrono::high_resolution_clock::now();
    
    // 正常渲染...
    
    auto end = std::chrono::high_resolution_clock::now();
    double elapsed = std::chrono::duration<double>(end - start).count();
    
    total_time += elapsed;
    frame_count++;
    
    if (frame_count >= 60) {  // 每秒报告一次
        Rml::Log::Message(Rml::Log::LT_INFO, 
            "Render time: %.3fms (avg: %.3fms)", 
            elapsed * 1000, (total_time / frame_count) * 1000);
        total_time = 0.0;
        frame_count = 0;
    }
}
```

### 2.4 常见错误和解决方案

**错误1：装饰器不显示**

```cpp
// ❌ 错误：返回无效句柄
Rml::DecoratorDataHandle GenerateElementData(...) const override {
    return INVALID_DECORATORDATAHANDLE;
}

// ✅ 正确：返回有效的数据句柄
Rml::DecoratorDataHandle GenerateElementData(...) const override {
    BorderData* data = new BorderData();
    // 填充数据...
    return reinterpret_cast<Rml::DecoratorDataHandle>(data);
}
```

**错误2：内存泄漏**

```cpp
// ❌ 错误：忘记释放内存
void ReleaseElementData(...) const override {
    // 什么都不做
}

// ✅ 正确：释放所有资源
void ReleaseElementData(...) const override {
    BorderData* data = reinterpret_cast<BorderData*>(element_data);
    data->vertices.clear();
    data->indices.clear();
    delete data;
}
```

**错误3：顶点数据为空**

```cpp
// ❌ 错误：没有生成顶点
Rml::DecoratorDataHandle GenerateElementData(...) const override {
    BorderData* data = new BorderData();
    // 忘记生成顶点...
    return reinterpret_cast<Rml::DecoratorDataHandle>(data);
}

// ✅ 正确：确保至少有一些顶点
Rml::DecoratorDataHandle GenerateElementData(...) const override {
    BorderData* data = new BorderData();
    
    // 生成顶点
    data->vertices.push_back(...);
    data->vertices.push_back(...);
    
    // 检查是否为空
    if (data->vertices.empty()) {
        Rml::Log::Message(Rml::Log::LT_ERROR, "No vertices generated!");
        delete data;
        return INVALID_DECORATORDATAHANDLE;
    }
    
    return reinterpret_cast<Rml::DecoratorDataHandle>(data);
}
```

---

## 三、实战：自定义边框装饰器

### 3.1 完整实现

```cpp
// CustomBorderDecorator.h
#pragma once
#include <RmlUi/Core/Decorator.h>
#include <RmlUi/Core/Types.h>
#include <RmlUi/Core/Colour.h>

class DecoratorInstancerCustomBorder;

class DecoratorCustomBorder : public Rml::Decorator
{
public:
    DecoratorCustomBorder();
    virtual ~DecoratorCustomBorder();

    // 初始化
    bool Initialise(
        const Rml::Colourb& color,
        float thickness,
        float radius);

    // ========== 必须实现的方法 ==========
    
    Rml::DecoratorDataHandle GenerateElementData(
        Rml::Element* element,
        Rml::BoxArea paint_area) const override;
    
    void ReleaseElementData(
        Rml::DecoratorDataHandle element_data) const override;
    
    void RenderElement(
        Rml::Element* element,
        Rml::DecoratorDataHandle element_data) const override;

private:
    // 装饰器参数
    Rml::Colourb color_;
    float thickness_;
    float radius_;

    // 元素数据结构
    struct BorderData {
        Rml::Vector<Rml::Vertex> vertices;
        Rml::Vector<int> indices;
        Rml::Colourb color;
    };
};

class DecoratorInstancerCustomBorder : public Rml::DecoratorInstancer
{
public:
    DecoratorInstancerCustomBorder();
    virtual ~DecoratorInstancerCustomBorder();

    Rml::SharedPtr<Rml::Decorator> InstanceDecorator(
        const Rml::String& name,
        const Rml::PropertyDictionary& properties,
        const Rml::DecoratorInstancerInterface& instancer_interface) override;

private:
    Rml::PropertyId id_color_;
    Rml::PropertyId id_thickness_;
    Rml::PropertyId id_radius_;
};
```

```cpp
// CustomBorderDecorator.cpp
#include "CustomBorderDecorator.h"
#include <RmlUi/Core/Core.h>
#include <RmlUi/Core/Element.h>
#include <RmlUi/Core/PropertyDefinition.h>
#include <RmlUi/Core/Math.h>

// ========== DecoratorCustomBorder 实现 ==========

DecoratorCustomBorder::DecoratorCustomBorder()
    : color_(255, 255, 255, 255)
    , thickness_(1.0f)
    , radius_(0.0f)
{
}

DecoratorCustomBorder::~DecoratorCustomBorder()
{
}

bool DecoratorCustomBorder::Initialise(
    const Rml::Colourb& color,
    float thickness,
    float radius)
{
    color_ = color;
    thickness_ = thickness;
    radius_ = radius;
    return true;
}

Rml::DecoratorDataHandle DecoratorCustomBorder::GenerateElementData(
    Rml::Element* element,
    Rml::BoxArea paint_area) const
{
    // 创建元素数据
    BorderData* data = new BorderData();
    data->color = color_;

    // 获取元素的盒模型
    const Rml::Box& box = element->GetBox();
    Rml::Rectangle border_rect = box.GetEdge(paint_area);

    // 生成圆角矩形顶点
    Rml::Vector2f corners[4] = {
        Rml::Vector2f(border_rect.left, border_rect.top),     // 左上
        Rml::Vector2f(border_rect.right, border_rect.top),    // 右上
        Rml::Vector2f(border_rect.right, border_rect.bottom), // 右下
        Rml::Vector2f(border_rect.left, border_rect.bottom)   // 左下
    };

    // 生成圆角
    const int num_segments = 8;
    for (int i = 0; i < 4; i++)
    {
        Rml::Vector2f corner = corners[i];
        Rml::Vector2f next_corner = corners[(i + 1) % 4];

        // 外角
        int start_idx = data->vertices.size();
        for (int j = 0; j <= num_segments; j++)
        {
            float angle = (j / float(num_segments)) * Rml::Math::HALF_PI;
            float cos_a = cosf(angle);
            float sin_a = sinf(angle);

            Rml::Vector2f offset(
                (i == 1 || i == 2) ? -radius_ : radius_,
                (i == 2 || i == 3) ? -radius_ : radius_
            );

            Rml::Vector2f pos = corner + offset;
            data->vertices.push_back({
                pos,
                Rml::Vector2f(0, 0),  // 纹理坐标
                color_
            });
        }

        // 内角
        int inner_start_idx = data->vertices.size();
        float inner_radius = Rml::Math::Max(0.0f, radius_ - thickness_);
        for (int j = 0; j <= num_segments; j++)
        {
            float angle = (j / float(num_segments)) * Rml::Math::HALF_PI;
            float cos_a = cosf(angle);
            float sin_a = sinf(angle);

            Rml::Vector2f offset(
                (i == 1 || i == 2) ? -inner_radius : inner_radius,
                (i == 2 || i == 3) ? -inner_radius : inner_radius
            );

            Rml::Vector2f pos = corner + offset;
            data->vertices.push_back({
                pos,
                Rml::Vector2f(0, 0),
                color_
            });
        }

        // 生成三角形索引
        for (int j = 0; j < num_segments; j++)
        {
            int outer_curr = start_idx + j;
            int outer_next = start_idx + j + 1;
            int inner_curr = inner_start_idx + j;
            int inner_next = inner_start_idx + j + 1;

            data->indices.push_back(outer_curr);
            data->indices.push_back(outer_next);
            data->indices.push_back(inner_curr);

            data->indices.push_back(inner_curr);
            data->indices.push_back(outer_next);
            data->indices.push_back(inner_next);
        }
    }

    return reinterpret_cast<Rml::DecoratorDataHandle>(data);
}

void DecoratorCustomBorder::ReleaseElementData(
    Rml::DecoratorDataHandle element_data) const
{
    BorderData* data = reinterpret_cast<BorderData*>(element_data);
    delete data;
}

void DecoratorCustomBorder::RenderElement(
    Rml::Element* element,
    Rml::DecoratorDataHandle element_data) const
{
    BorderData* data = reinterpret_cast<BorderData*>(element_data);
    
    if (auto* render_manager = element->GetRenderManager())
    {
        render_manager->RenderGeometry(
            data->vertices,
            data->indices,
            {},
            Rml::Matrix4f::Identity()
        );
    }
}

// ========== DecoratorInstancerCustomBorder 实现 ==========

DecoratorInstancerCustomBorder::DecoratorInstancerCustomBorder()
{
    // 注册属性
    id_color_ = RegisterProperty("color", "#ffffff", false, false)
        .AddParser("color")
        .GetId();

    id_thickness_ = RegisterProperty("thickness", "1dp", false, true)
        .AddParser("length")
        .GetId();

    id_radius_ = RegisterProperty("radius", "0dp", false, true)
        .AddParser("length")
        .GetId();
}

DecoratorInstancerCustomBorder::~DecoratorInstancerCustomBorder()
{
}

Rml::SharedPtr<Rml::Decorator> DecoratorInstancerCustomBorder::InstanceDecorator(
    const Rml::String& name,
    const Rml::PropertyDictionary& properties,
    const Rml::DecoratorInstancerInterface& instancer_interface)
{
    Rml::Colourb color = properties.GetProperty(id_color_)->Get<Rml::Colourb>();
    float thickness = properties.GetProperty(id_thickness_)->Get<float>();
    float radius = properties.GetProperty(id_radius_)->Get<float>();

    auto decorator = Rml::MakeShared<DecoratorCustomBorder>();
    if (decorator->Initialise(color, thickness, radius))
        return decorator;

    return nullptr;
}
```

### 2.2 在 RCSS 中使用

```css
/* 使用自定义边框装饰器 */
.custom-border {
    decorator: custom-border(
        color: #3498db;
        thickness: 4dp;
        radius: 8dp
    );
}

/* 响应式变化 */
.custom-border:hover {
    decorator: custom-border(
        color: #e74c3c;
        thickness: 6dp;
        radius: 12dp
    );
}
```

---

## 三、进阶：粒子系统装饰器

### 3.1 完整实现

```cpp
// ParticleDecorator.h
#pragma once
#include <RmlUi/Core/Decorator.h>
#include <RmlUi/Core/Types.h>
#include <RmlUi/Core/Colour.h>
#include <vector>

class DecoratorInstancerParticle;

class DecoratorParticle : public Rml::Decorator
{
public:
    DecoratorParticle();
    virtual ~DecoratorParticle();

    bool Initialise(
        int particle_count,
        float min_speed,
        float max_speed,
        const Rml::Colourb& color,
        float particle_size);

    Rml::DecoratorDataHandle GenerateElementData(
        Rml::Element* element,
        Rml::BoxArea paint_area) const override;

    void ReleaseElementData(
        Rml::DecoratorDataHandle element_data) const override;

    void RenderElement(
        Rml::Element* element,
        Rml::DecoratorDataHandle element_data) const override;

private:
    // 装饰器参数
    int particle_count_;
    float min_speed_;
    float max_speed_;
    Rml::Colourb color_;
    float particle_size_;

    // 粒子结构
    struct Particle {
        Rml::Vector2f position;
        Rml::Vector2f velocity;
        float life;
        float max_life;
    };

    // 元素数据结构
    struct ParticleSystemData {
        std::vector<Particle> particles;
        Rml::Vector2f dimensions;
        double last_update;
        float particle_size;
        Rml::Colourb color;

        void Update(double current_time, bool paused);
    };
};

class DecoratorInstancerParticle : public Rml::DecoratorInstancer
{
public:
    DecoratorInstancerParticle();
    virtual ~DecoratorInstancerParticle();

    Rml::SharedPtr<Rml::Decorator> InstanceDecorator(
        const Rml::String& name,
        const Rml::PropertyDictionary& properties,
        const Rml::DecoratorInstancerInterface& instancer_interface) override;

private:
    Rml::PropertyId id_particle_count_;
    Rml::PropertyId id_min_speed_;
    Rml::PropertyId id_max_speed_;
    Rml::PropertyId id_color_;
    Rml::PropertyId id_particle_size_;
};
```

```cpp
// ParticleDecorator.cpp
#include "ParticleDecorator.h"
#include <RmlUi/Core/Core.h>
#include <RmlUi/Core/Element.h>
#include <RmlUi/Core/ElementUtilities.h>
#include <RmlUi/Core/PropertyDefinition.h>
#include <RmlUi/Core/Math.h>
#include <RmlUi/Core/SystemInterface.h>

// ========== DecoratorParticle 实现 ==========

DecoratorParticle::DecoratorParticle()
    : particle_count_(50)
    , min_speed_(10.0f)
    , max_speed_(50.0f)
    , color_(255, 255, 255, 255)
    , particle_size_(2.0f)
{
}

DecoratorParticle::~DecoratorParticle()
{
}

bool DecoratorParticle::Initialise(
    int particle_count,
    float min_speed,
    float max_speed,
    const Rml::Colourb& color,
    float particle_size)
{
    particle_count_ = particle_count;
    min_speed_ = min_speed;
    max_speed_ = max_speed;
    color_ = color;
    particle_size_ = particle_size;
    return true;
}

Rml::DecoratorDataHandle DecoratorParticle::GenerateElementData(
    Rml::Element* element,
    Rml::BoxArea paint_area) const
{
    ParticleSystemData* data = new ParticleSystemData();
    data->dimensions = element->GetBox().GetSize(paint_area);
    data->particle_size = particle_size_;
    data->color = color_;
    data->last_update = Rml::GetSystemInterface()->GetElapsedTime();

    // 初始化粒子
    data->particles.reserve(particle_count_);
    for (int i = 0; i < particle_count_; i++)
    {
        Particle p;
        p.position.x = Rml::Math::RandomReal(data->dimensions.x);
        p.position.y = Rml::Math::RandomReal(data->dimensions.y);
        
        float angle = Rml::Math::RandomReal(2.0f * Rml::Math::PI);
        float speed = min_speed_ + Rml::Math::RandomReal(max_speed_ - min_speed_);
        p.velocity.x = cosf(angle) * speed;
        p.velocity.y = sinf(angle) * speed;
        
        p.life = 1.0f;
        p.max_life = 2.0f + Rml::Math::RandomReal(2.0f);
        
        data->particles.push_back(p);
    }

    return reinterpret_cast<Rml::DecoratorDataHandle>(data);
}

void DecoratorParticle::ReleaseElementData(
    Rml::DecoratorDataHandle element_data) const
{
    ParticleSystemData* data = reinterpret_cast<ParticleSystemData*>(element_data);
    delete data;
}

void DecoratorParticle::RenderElement(
    Rml::Element* element,
    Rml::DecoratorDataHandle element_data) const
{
    ParticleSystemData* data = reinterpret_cast<ParticleSystemData*>(element_data);
    
    // 更新粒子
    data->Update(Rml::GetSystemInterface()->GetElapsedTime(), false);
    
    // 渲染粒子
    if (auto* render_manager = element->GetRenderManager())
    {
        // 获取 DPI 比例
        const float dp_ratio = Rml::ElementUtilities::GetDensityIndependentPixelRatio(element);
        float size = Rml::Math::RoundUp(data->particle_size * dp_ratio);
        
        // 收集所有可见粒子
        Rml::Vector<Rml::Vertex> vertices;
        vertices.reserve(data->particles.size());
        
        for (const auto& p : data->particles)
        {
            if (p.life > 0.0f)
            {
                Rml::Colourb color = data->color;
                color.alpha = Rml::Colourb(255 * p.life);
                
                vertices.push_back({
                    p.position,
                    Rml::Vector2f(0, 0),
                    color
                });
            }
        }
        
        // 渲染点
        if (!vertices.empty())
        {
            render_manager->RenderGeometry(
                vertices,
                {},
                {},
                Rml::Matrix4f::Identity()
            );
        }
    }
}

void DecoratorParticle::ParticleSystemData::Update(double current_time, bool paused)
{
    float delta_time = float(current_time - last_update);
    last_update = current_time;
    
    if (paused) return;
    
    for (auto& p : particles)
    {
        // 更新位置
        p.position += p.velocity * delta_time;
        
        // 边界检查
        if (p.position.x < 0)
        {
            p.position.x = 0;
            p.velocity.x *= -1;
        }
        else if (p.position.x > dimensions.x)
        {
            p.position.x = dimensions.x;
            p.velocity.x *= -1;
        }
        
        if (p.position.y < 0)
        {
            p.position.y = 0;
            p.velocity.y *= -1;
        }
        else if (p.position.y > dimensions.y)
        {
            p.position.y = dimensions.y;
            p.velocity.y *= -1;
        }
        
        // 更新生命周期
        p.life -= delta_time / p.max_life;
        if (p.life < 0.0f)
        {
            // 重置粒子
            p.position.x = Rml::Math::RandomReal(dimensions.x);
            p.position.y = Rml::Math::RandomReal(dimensions.y);
            
            float angle = Rml::Math::RandomReal(2.0f * Rml::Math::PI);
            float speed = min_speed_ + Rml::Math::RandomReal(max_speed_ - min_speed_);
            p.velocity.x = cosf(angle) * speed;
            p.velocity.y = sinf(angle) * speed;
            
            p.life = 1.0f;
            p.max_life = 2.0f + Rml::Math::RandomReal(2.0f);
        }
    }
}

// ========== DecoratorInstancerParticle 实现 ==========

DecoratorInstancerParticle::DecoratorInstancerParticle()
{
    id_particle_count_ = RegisterProperty("particle-count", "50", false, true)
        .AddParser("number")
        .GetId();

    id_min_speed_ = RegisterProperty("min-speed", "10", false, false)
        .AddParser("number")
        .GetId();

    id_max_speed_ = RegisterProperty("max-speed", "50", false, false)
        .AddParser("number")
        .GetId();

    id_color_ = RegisterProperty("color", "#ffffff", false, false)
        .AddParser("color")
        .GetId();

    id_particle_size_ = RegisterProperty("particle-size", "2dp", false, true)
        .AddParser("length")
        .GetId();
}

DecoratorInstancerParticle::~DecoratorInstancerParticle()
{
}

Rml::SharedPtr<Rml::Decorator> DecoratorInstancerParticle::InstanceDecorator(
    const Rml::String& name,
    const Rml::PropertyDictionary& properties,
    const Rml::DecoratorInstancerInterface& instancer_interface)
{
    int particle_count = properties.GetProperty(id_particle_count_)->Get<int>();
    float min_speed = properties.GetProperty(id_min_speed_)->Get<float>();
    float max_speed = properties.GetProperty(id_max_speed_)->Get<float>();
    Rml::Colourb color = properties.GetProperty(id_color_)->Get<Rml::Colourb>();
    float particle_size = properties.GetProperty(id_particle_size_)->Get<float>();

    auto decorator = Rml::MakeShared<DecoratorParticle>();
    if (decorator->Initialise(particle_count, min_speed, max_speed, color, particle_size))
        return decorator;

    return nullptr;
}
```

### 3.2 在 RCSS 中使用

```css
/* 使用粒子装饰器 */
.particle-effect {
    decorator: particle(
        particle-count: 100;
        min-speed: 20;
        max-speed: 80;
        color: #3498db;
        particle-size: 3dp
    );
}
```

---

## 四、高级：发光效果装饰器

### 4.1 使用 Shader 的发光效果

```cpp
// GlowDecorator.h
#pragma once
#include <RmlUi/Core/Decorator.h>
#include <RmlUi/Core/Types.h>
#include <RmlUi/Core/Colour.h>

class DecoratorInstancerGlow;

class DecoratorGlow : public Rml::Decorator
{
public:
    DecoratorGlow();
    virtual ~DecoratorGlow();

    bool Initialise(
        const Rml::Colourb& color,
        float radius,
        float intensity);

    Rml::DecoratorDataHandle GenerateElementData(
        Rml::Element* element,
        Rml::BoxArea paint_area) const override;

    void ReleaseElementData(
        Rml::DecoratorDataHandle element_data) const override;

    void RenderElement(
        Rml::Element* element,
        Rml::DecoratorDataHandle element_data) const override;

private:
    Rml::Colourb color_;
    float radius_;
    float intensity_;

    struct GlowData {
        Rml::Vector<Rml::Vertex> vertices;
        Rml::Vector<int> indices;
        Rml::Rectangle element_rect;
    };
};

class DecoratorInstancerGlow : public Rml::DecoratorInstancer
{
public:
    DecoratorInstancerGlow();
    virtual ~DecoratorInstancerGlow();

    Rml::SharedPtr<Rml::Decorator> InstanceDecorator(
        const Rml::String& name,
        const Rml::PropertyDictionary& properties,
        const Rml::DecoratorInstancerInterface& instancer_interface) override;

private:
    Rml::PropertyId id_color_;
    Rml::PropertyId id_radius_;
    Rml::PropertyId id_intensity_;
};
```

```cpp
// GlowDecorator.cpp
#include "GlowDecorator.h"
#include <RmlUi/Core/Core.h>
#include <RmlUi/Core/Element.h>
#include <RmlUi/Core/PropertyDefinition.h>
#include <RmlUi/Core/Math.h>

DecoratorGlow::DecoratorGlow()
    : color_(255, 255, 255, 255)
    , radius_(10.0f)
    , intensity_(1.0f)
{
}

DecoratorGlow::~DecoratorGlow()
{
}

bool DecoratorGlow::Initialise(
    const Rml::Colourb& color,
    float radius,
    float intensity)
{
    color_ = color;
    radius_ = radius;
    intensity_ = intensity;
    return true;
}

Rml::DecoratorDataHandle DecoratorGlow::GenerateElementData(
    Rml::Element* element,
    Rml::BoxArea paint_area) const
{
    GlowData* data = new GlowData();
    data->element_rect = element->GetBox().GetEdge(paint_area);

    // 生成发光效果的几何体
    // 这里使用多层半透明矩形模拟发光
    const int layers = 5;
    for (int i = 0; i < layers; i++)
    {
        float layer_radius = radius_ * (i + 1) / float(layers);
        float layer_alpha = (1.0f - i / float(layers)) * intensity_;

        Rml::Rectangle rect = data->element_rect;
        rect.left -= layer_radius;
        rect.top -= layer_radius;
        rect.right += layer_radius;
        rect.bottom += layer_radius;

        Rml::Colourb layer_color = color_;
        layer_color.alpha = Rml::Colourb(255 * layer_alpha);

        // 生成矩形顶点
        Rml::Vertex vertices[4] = {
            {{rect.left, rect.top}, {0, 0}, layer_color},
            {{rect.right, rect.top}, {0, 0}, layer_color},
            {{rect.right, rect.bottom}, {0, 0}, layer_color},
            {{rect.left, rect.bottom}, {0, 0}, layer_color}
        };

        int indices[6] = {0, 1, 2, 0, 2, 3};

        int base_idx = data->vertices.size();
        for (int j = 0; j < 4; j++)
        {
            data->vertices.push_back(vertices[j]);
        }
        for (int j = 0; j < 6; j++)
        {
            data->indices.push_back(base_idx + indices[j]);
        }
    }

    return reinterpret_cast<Rml::DecoratorDataHandle>(data);
}

void DecoratorGlow::ReleaseElementData(
    Rml::DecoratorDataHandle element_data) const
{
    GlowData* data = reinterpret_cast<GlowData*>(element_data);
    delete data;
}

void DecoratorGlow::RenderElement(
    Rml::Element* element,
    Rml::DecoratorDataHandle element_data) const
{
    GlowData* data = reinterpret_cast<GlowData*>(element_data);
    
    if (auto* render_manager = element->GetRenderManager())
    {
        // 使用加法混合模式实现发光效果
        render_manager->RenderGeometry(
            data->vertices,
            data->indices,
            {},
            Rml::Matrix4f::Identity()
        );
    }
}

// DecoratorInstancerGlow 实现省略...
```

---

## 五、注册自定义装饰器

### 5.1 注册流程

```cpp
// App.cpp
#include "CustomBorderDecorator.h"
#include "ParticleDecorator.h"
#include "GlowDecorator.h"

class App
{
public:
    bool Initialize()
    {
        // ... 其他初始化 ...

        // 注册自定义装饰器
        RegisterCustomDecorators();

        return true;
    }

private:
    void RegisterCustomDecorators()
    {
        Rml::Factory* factory = Rml::Factory::Instance();

        // 注册边框装饰器
        auto border_instancer = std::make_unique<DecoratorInstancerCustomBorder>();
        factory->RegisterDecoratorInstancer("custom-border", std::move(border_instancer));

        // 注册粒子装饰器
        auto particle_instancer = std::make_unique<DecoratorInstancerParticle>();
        factory->RegisterDecoratorInstancer("particle", std::move(particle_instancer));

        // 注册发光装饰器
        auto glow_instancer = std::make_unique<DecoratorInstancerGlow>();
        factory->RegisterDecoratorInstancer("glow", std::move(glow_instancer));
    }
};
```

### 5.2 在 RCSS 中使用

```css
/* 组合使用多个装饰器 */
.complex-effect {
    /* 边框 */
    decorator: custom-border(
        color: #3498db;
        thickness: 4dp;
        radius: 8dp
    ) glow(
        color: #3498db;
        radius: 15dp;
        intensity: 0.5
    );
    
    /* 背景粒子 */
    background: transparent;
}

/* 动态效果 */
.complex-effect:hover {
    decorator: custom-border(
        color: #e74c3c;
        thickness: 6dp;
        radius: 12dp
    ) glow(
        color: #e74c3c;
        radius: 20dp;
        intensity: 0.8
    );
}
```

---

## 六、高级技巧

### 6.1 使用纹理

```cpp
// 纹理化装饰器
class TexturedDecorator : public Rml::Decorator
{
public:
    bool Initialise(const Rml::String& texture_file)
    {
        // 加载纹理
        // 需要在 InstanceDecorator 中使用 DecoratorInstancerInterface
        return true;
    }

    void RenderElement(
        Rml::Element* element,
        Rml::DecoratorDataHandle element_data) const override
    {
        if (auto* render_manager = element->GetRenderManager())
        {
            // 使用纹理渲染
            render_manager->RenderGeometry(
                vertices_,
                indices_,
                GetTexture(0),  // 获取第一个纹理
                transform_
            );
        }
    }
};
```

### 6.2 性能优化

```cpp
// 使用脏标记
class OptimizedDecorator : public Rml::Decorator
{
private:
    struct OptimizedData {
        Rml::Vector<Rml::Vertex> vertices;
        Rml::Vector<int> indices;
        bool geometry_dirty;
        Rml::Rectangle cached_rect;
    };

    void RenderElement(
        Rml::Element* element,
        Rml::DecoratorDataHandle element_data) const override
    {
        OptimizedData* data = reinterpret_cast<OptimizedData*>(element_data);
        
        // 检查是否需要更新几何体
        Rml::Rectangle current_rect = element->GetBox().GetEdge(Rml::BoxArea::Border);
        if (data->geometry_dirty || current_rect != data->cached_rect)
        {
            UpdateGeometry(element, data);
            data->geometry_dirty = false;
            data->cached_rect = current_rect;
        }
        
        // 渲染...
    }
};
```

### 6.3 动态更新

```cpp
// 支持动态参数的装饰器
class DynamicDecorator : public Rml::Decorator
{
private:
    struct DynamicData {
        float animation_time;
        float speed;
    };

    void RenderElement(
        Rml::Element* element,
        Rml::DecoratorDataHandle element_data) const override
    {
        DynamicData* data = reinterpret_cast<DynamicData*>(element_data);
        
        // 更新动画时间
        double current_time = Rml::GetSystemInterface()->GetElapsedTime();
        data->animation_time = current_time * data->speed;
        
        // 使用动画时间渲染
        RenderWithAnimation(element, data);
    }
};
```

---

## 七、常见问题

### 7.1 装饰器不显示

**问题**：装饰器注册后不显示

**原因**：
- 属性名称不匹配
- GenerateElementData 返回无效数据
- 几何体数据为空

**解决方案**：
```cpp
// 检查数据生成
Rml::DecoratorDataHandle GenerateElementData(...) const override
{
    // 确保返回有效的数据
    if (!element) return INVALID_DECORATORDATAHANDLE;
    
    // 检查几何体是否为空
    BorderData* data = new BorderData();
    if (data->vertices.empty())
    {
        delete data;
        return INVALID_DECORATORDATAHANDLE;
    }
    
    return reinterpret_cast<Rml::DecoratorDataHandle>(data);
}
```

### 7.2 内存泄漏

**问题**：装饰器导致内存泄漏

**解决方案**：
```cpp
// 确保释放所有资源
void ReleaseElementData(
    Rml::DecoratorDataHandle element_data) const override
{
    BorderData* data = reinterpret_cast<BorderData*>(element_data);
    
    // 清理所有资源
    data->vertices.clear();
    data->indices.clear();
    
    // 删除数据
    delete data;
}
```

### 7.3 性能问题

**问题**：装饰器导致性能下降

**解决方案**：
```cpp
// 1. 减少粒子数量
particle_count_ = Rml::Math::Min(particle_count_, 100);

// 2. 使用脏标记
bool geometry_dirty;

// 3. 缓存计算结果
Rml::Vector2f cached_dimensions;

// 4. 批量渲染
// 合并多个装饰器的渲染调用
```

---

## 八、实战练习

### 练习 1：创建水波纹效果

实现一个水波纹装饰器：
- 点击时产生波纹
- 波纹扩散并消失
- 支持多个波纹同时存在

### 练习 2：创建火焰效果

实现一个火焰装饰器：
- 粒子向上移动
- 颜色从黄色渐变到红色
- 粒子逐渐消失

### 练习 3：创建发光边框

实现一个发光边框装饰器：
- 边框有发光效果
- 发光颜色可以自定义
- 支持动画效果

---

## 九、下一步

继续学习 [事件处理器](03-event-handlers.md) 来处理复杂的用户交互。

---

## 📝 检查清单

- [ ] 理解 Decorator 类的继承体系
- [ ] 掌握 GenerateElementData 和 ReleaseElementData
- [ ] 能够实现 RenderElement
- [ ] 能够注册和使用自定义装饰器
- [ ] 理解装饰器的性能优化
- [ ] 能够创建复杂的视觉效果
- [ ] 能够组合多个装饰器