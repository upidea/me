# 6.5 性能优化

性能优化是构建高质量 RmlUi 应用的关键。本节将深入讲解如何识别性能瓶颈、优化渲染性能、减少布局计算和内存使用。

---

## 一、性能分析

### 1.1 性能监控工具

```cpp
// PerformanceMonitor.h
#pragma once
#include <RmlUi/Core/Types.h>
#include <chrono>
#include <unordered_map>

class PerformanceMonitor
{
public:
    static PerformanceMonitor& Instance()
    {
        static PerformanceMonitor instance;
        return instance;
    }

    // 开始计时
    void BeginScope(const std::string& name);
    
    // 结束计时
    void EndScope(const std::string& name);
    
    // 获取性能数据
    float GetAverageTime(const std::string& name) const;
    float GetMaxTime(const std::string& name) const;
    int GetCallCount(const std::string& name) const;
    
    // 重置统计数据
    void Reset();
    
    // 打印报告
    void PrintReport() const;

private:
    struct ScopeData
    {
        std::chrono::high_resolution_clock::time_point start_time;
        float total_time;
        float max_time;
        int call_count;
        bool is_running;
    };

    PerformanceMonitor() = default;
    
    std::unordered_map<std::string, ScopeData> scopes_;
};

// PerformanceMonitor.cpp
void PerformanceMonitor::BeginScope(const std::string& name)
{
    auto& scope = scopes_[name];
    if (!scope.is_running)
    {
        scope.start_time = std::chrono::high_resolution_clock::now();
        scope.is_running = true;
    }
}

void PerformanceMonitor::EndScope(const std::string& name)
{
    auto it = scopes_.find(name);
    if (it == scopes_.end() || !it->second.is_running)
        return;
    
    auto& scope = it->second;
    auto end_time = std::chrono::high_resolution_clock::now();
    auto duration = std::chrono::duration_cast<std::chrono::microseconds>(
        end_time - scope.start_time).count();
    
    float time_ms = duration / 1000.0f;
    
    scope.total_time += time_ms;
    scope.max_time = std::max(scope.max_time, time_ms);
    scope.call_count++;
    scope.is_running = false;
}

// 使用宏简化使用
#define RMLUI_PERF_SCOPE(name) \
    PerformanceMonitor::Instance().BeginScope(name); \
    auto PERF_SCOPE_GUARD_##name = std::shared_ptr<void>(nullptr, \
        [&](void*) { PerformanceMonitor::Instance().EndScope(name); })

// 使用示例
void MyComponent::Update(float delta_time)
{
    RMLUI_PERF_SCOPE("MyComponent::Update");
    
    // 更新逻辑...
}

void MainLoop()
{
    while (running)
    {
        RMLUI_PERF_SCOPE("Frame");
        
        RMLUI_PERF_SCOPE("Input");
        ProcessInput();
        
        RMLUI_PERF_SCOPE("Update");
        Update(delta_time);
        
        RMLUI_PERF_SCOPE("Render");
        Render();
        
        PerformanceMonitor::Instance().PrintReport();
    }
}
```

### 1.2 RmlUi 内置性能监控

```cpp
// 使用 RmlUi 的性能监控
class App
{
public:
    void Initialize()
    {
        // 启用性能统计
        Rml::SetProfilingInterface(new MyProfilingInterface());
        
        // 或者使用 RmlUi Debugger
        Rml::Debugger::Initialise(context);
    }
    
    void Update(float delta_time)
    {
        // 更新性能统计
        if (profiling_enabled_)
        {
            Rml::UpdateProfilingStats();
        }
    }
};
```

---

## 二、渲染优化

### 2.1 批量渲染优化

```cpp
// BatchRenderer.h
#pragma once
#include <RmlUi/Core/Types.h>
#include <RmlUi/Core/Colour.h>
#include <vector>

class BatchRenderer
{
public:
    // 开始批量渲染
    void BeginBatch();
    
    // 添加矩形
    void AddRect(const Rml::Rectangle& rect, const Rml::Colourb& color);
    
    // 结束批量渲染
    void EndBatch();
    
    // 获取批次数
    int GetBatchCount() const { return batch_count_; }

private:
    struct BatchData {
        std::vector<Rml::Vertex> vertices;
        std::vector<int> indices;
        Rml::TextureHandle texture;
    };

    std::vector<BatchData> batches_;
    int batch_count_;
    Rml::TextureHandle current_texture_;
};

// BatchRenderer.cpp
void BatchRenderer::BeginBatch()
{
    batches_.clear();
    batch_count_ = 0;
    current_texture_ = {};
}

void BatchRenderer::AddRect(const Rml::Rectangle& rect, const Rml::Colourb& color)
{
    // 检查是否需要新的批次
    if (batches_.empty() || current_texture_ != {})
    {
        BatchData batch;
        batch.texture = current_texture_;
        batches_.push_back(batch);
        batch_count_++;
    }
    
    auto& batch = batches_.back();
    
    // 添加矩形顶点
    Rml::Vertex vertices[4] = {
        {{rect.left, rect.top}, {0, 0}, color},
        {{rect.right, rect.top}, {0, 0}, color},
        {{rect.right, rect.bottom}, {0, 0}, color},
        {{rect.left, rect.bottom}, {0, 0}, color}
    };
    
    // 添加索引
    int base_index = batch.vertices.size();
    int indices[6] = {0, 1, 2, 0, 2, 3};
    
    batch.vertices.insert(batch.vertices.end(), vertices, vertices + 4);
    for (int i = 0; i < 6; i++)
    {
        batch.indices.push_back(base_index + indices[i]);
    }
}

void BatchRenderer::EndBatch()
{
    // 渲染所有批次
    for (const auto& batch : batches_)
    {
        render_manager_->RenderGeometry(
            batch.vertices,
            batch.indices,
            batch.texture,
            Rml::Matrix4f::Identity()
        );
    }
}
```

### 2.2 纹理图集优化

```cpp
// TextureAtlas.h
#pragma once
#include <RmlUi/Core/Types.h>
#include <unordered_map>

class TextureAtlas
{
public:
    // 添加纹理到图集
    bool AddTexture(const std::string& name, const Rml::String& path);
    
    // 获取纹理区域
    Rml::Rectangle GetTextureRegion(const std::string& name) const;
    
    // 获取图集纹理
    Rml::TextureHandle GetAtlasTexture() const { return atlas_texture_; }

private:
    struct TextureInfo {
        Rml::Rectangle region;
        Rml::Vector2i size;
    };

    std::unordered_map<std::string, TextureInfo> textures_;
    Rml::TextureHandle atlas_texture_;
    Rml::Vector2i atlas_size_;
    int next_x_;
    int next_y_;
    int current_row_height_;
};

// 使用示例
class SpriteRenderer
{
public:
    void RenderSprite(const std::string& sprite_name, const Rml::Vector2f& position)
    {
        Rml::Rectangle region = texture_atlas_->GetTextureRegion(sprite_name);
        
        // 计算纹理坐标
        Rml::Vector2f tex_coords[4] = {
            {region.left / atlas_width_, region.top / atlas_height_},
            {region.right / atlas_width_, region.top / atlas_height_},
            {region.right / atlas_width_, region.bottom / atlas_height_},
            {region.left / atlas_width_, region.bottom / atlas_height_}
        };
        
        // 渲染...
    }
};
```

---

## 三、布局优化

### 3.1 减少布局重计算

```cpp
// LayoutOptimizer.h
#pragma once
#include <RmlUi/Core/Element.h>

class LayoutOptimizer
{
public:
    // 标记元素需要重新布局
    static void MarkDirty(Rml::Element* element);
    
    // 批量更新布局
    static void UpdateLayout(Rml::Context* context);
    
    // 检查元素是否需要重新布局
    static bool IsLayoutDirty(Rml::Element* element);

private:
    static std::unordered_set<Rml::Element*> dirty_elements_;
};

// LayoutOptimizer.cpp
std::unordered_set<Rml::Element*> LayoutOptimizer::dirty_elements_;

void LayoutOptimizer::MarkDirty(Rml::Element* element)
{
    dirty_elements_.insert(element);
}

void LayoutOptimizer::UpdateLayout(Rml::Context* context)
{
    if (dirty_elements_.empty())
        return;
    
    // 批量更新所有脏元素的布局
    for (auto* element : dirty_elements_)
    {
        element->UpdateLayout();
    }
    
    dirty_elements_.clear();
}

// 使用示例
class MyElement : public Rml::Element
{
public:
    void SetValue(float value)
    {
        value_ = value;
        
        // 不要直接调用 UpdateLayout()
        // 而是标记为脏
        LayoutOptimizer::MarkDirty(this);
    }
};
```

### 3.2 使用 Flexbox 优化

```css
/* 不好的做法 - 嵌套太多 */
.container {
    display: flex;
}

.item {
    display: flex;
}

.item .content {
    display: flex;
}

/* 好的做法 - 减少嵌套 */
.container {
    display: flex;
    align-items: center;
}

.item {
    flex: 0 0 auto;
}
```

### 3.3 避免强制重排

```cpp
// 不好的做法 - 多次访问导致重排
void BadExample(Rml::Element* element)
{
    float width1 = element->GetClientWidth();  // 重排
    element->SetProperty("height", "100px");  // 重排
    float width2 = element->GetClientWidth();  // 重排
}

// 好的做法 - 批量访问
void GoodExample(Rml::Element* element)
{
    // 先读取所有需要的值
    float width = element->GetClientWidth();
    float height = element->GetClientHeight();
    
    // 然后批量修改
    element->SetProperty("width", std::to_string(width) + "px");
    element->SetProperty("height", std::to_string(height) + "px");
}
```

---

## 四、内存优化

### 4.1 对象池

```cpp
// ObjectPool.h
#pragma once
#include <memory>
#include <vector>
#include <functional>

template<typename T>
class ObjectPool
{
public:
    ObjectPool(int initial_size = 100)
    {
        for (int i = 0; i < initial_size; i++)
        {
            pool_.push_back(std::make_unique<T>());
        }
    }
    
    // 获取对象
    std::unique_ptr<T, std::function<void(T*)>> Acquire()
    {
        if (pool_.empty())
        {
            pool_.push_back(std::make_unique<T>());
        }
        
        auto obj = std::move(pool_.back());
        pool_.pop_back();
        
        // 创建自定义删除器，将对象返回池中
        return std::unique_ptr<T, std::function<void(T*)>>(
            obj.release(),
            [this](T* ptr) {
                pool_.push_back(std::unique_ptr<T>(ptr));
            }
        );
    }
    
    // 获取池大小
    size_t GetPoolSize() const { return pool_.size(); }

private:
    std::vector<std::unique_ptr<T>> pool_;
};

// 使用示例
class Particle
{
public:
    void Reset()
    {
        // 重置粒子状态
    }
    
    void Update(float delta_time)
    {
        // 更新粒子
    }
};

class ParticleSystem
{
public:
    ParticleSystem()
        : particle_pool_(1000)
    {
    }
    
    void EmitParticle()
    {
        auto particle = particle_pool_.Acquire();
        particle->Reset();
        active_particles_.push_back(std::move(particle));
    }
    
    void Update(float delta_time)
    {
        for (auto& particle : active_particles_)
        {
            particle->Update(delta_time);
        }
        
        // 移除死亡的粒子（会自动返回对象池）
        active_particles_.erase(
            std::remove_if(active_particles_.begin(), active_particles_.end(),
                [](const auto& p) { return p->IsDead(); }),
            active_particles_.end()
        );
    }

private:
    ObjectPool<Particle> particle_pool_;
    std::vector<std::unique_ptr<Particle, std::function<void(Particle*)>>> active_particles_;
};
```

### 4.2 纹理缓存

```cpp
// TextureCache.h
#pragma once
#include <RmlUi/Core/Types.h>
#include <unordered_map>
#include <memory>

class TextureCache
{
public:
    static TextureCache& Instance()
    {
        static TextureCache instance;
        return instance;
    }
    
    // 加载纹理
    Rml::TextureHandle LoadTexture(const std::string& path);
    
    // 释放纹理
    void ReleaseTexture(const std::string& path);
    
    // 清理未使用的纹理
    void Cleanup();

private:
    struct TextureData {
        Rml::TextureHandle handle;
        int ref_count;
        std::chrono::time_point<std::chrono::steady_clock> last_used;
    };

    TextureCache() = default;
    
    std::unordered_map<std::string, TextureData> textures_;
};

// TextureCache.cpp
Rml::TextureHandle TextureCache::LoadTexture(const std::string& path)
{
    auto it = textures_.find(path);
    if (it != textures_.end())
    {
        it->second.ref_count++;
        it->second.last_used = std::chrono::steady_clock::now();
        return it->second.handle;
    }
    
    // 加载新纹理
    Rml::TextureHandle handle = render_manager_->LoadTexture(path);
    if (!handle)
    {
        return {};
    }
    
    TextureData data;
    data.handle = handle;
    data.ref_count = 1;
    data.last_used = std::chrono::steady_clock::now();
    
    textures_[path] = data;
    return handle;
}

void TextureCache::ReleaseTexture(const std::string& path)
{
    auto it = textures_.find(path);
    if (it == textures_.end())
        return;
    
    it->second.ref_count--;
    if (it->second.ref_count <= 0)
    {
        // 可以立即释放，或者延迟释放
        render_manager_->ReleaseTexture(it->second.handle);
        textures_.erase(it);
    }
}

void TextureCache::Cleanup()
{
    auto now = std::chrono::steady_clock::now();
    auto cutoff = now - std::chrono::minutes(5);  // 5分钟未使用
    
    for (auto it = textures_.begin(); it != textures_.end();)
    {
        if (it->second.ref_count == 0 && it->second.last_used < cutoff)
        {
            render_manager_->ReleaseTexture(it->second.handle);
            it = textures_.erase(it);
        }
        else
        {
            ++it;
        }
    }
}
```

---

## 五、渲染优化技巧

### 5.1 减少过度绘制

```css
/* 使用 opacity 而不是 display:none */
.hidden {
    opacity: 0;
    visibility: hidden;
    pointer-events: none;
}

/* 或者使用 display:none 彻底移除 */
.hidden-absolute {
    display: none;
}
```

### 5.2 使用硬件加速

```css
/* 强制硬件加速 */
.accelerated {
    transform: translateZ(0);
    will-change: transform;
}

/* 对经常变化的元素使用 */
.animated-element {
    will-change: transform, opacity;
}
```

### 5.3 减少纹理切换

```cpp
// 按纹理分组渲染
void OptimizeRendering()
{
    // 收集所有渲染命令
    std::unordered_map<Rml::TextureHandle, std::vector<RenderCommand>> commands_by_texture;
    
    for (const auto& command : render_commands_)
    {
        commands_by_texture[command.texture].push_back(command);
    }
    
    // 按纹理顺序渲染
    for (const auto& pair : commands_by_texture)
    {
        render_manager_->BindTexture(pair.first);
        
        for (const auto& command : pair.second)
        {
            render_manager_->RenderGeometry(command);
        }
    }
}
```

---

## 六、调试技巧

### 6.1 性能分析报告

```cpp
void PrintPerformanceReport()
{
    PerformanceMonitor::Instance().PrintReport();
    
    // 输出示例：
    // Frame: 16.7ms (avg), 33.3ms (max), 60 calls
    //   Input: 2.1ms (avg), 5.4ms (max), 60 calls
    //   Update: 8.3ms (avg), 15.2ms (max), 60 calls
    //     MyComponent::Update: 5.2ms (avg), 12.1ms (max), 60 calls
    //   Render: 6.3ms (avg), 12.8ms (max), 60 calls
}
```

### 6.2 内存使用监控

```cpp
class MemoryMonitor
{
public:
    static void PrintMemoryUsage()
    {
        // 获取当前内存使用
        size_t used_memory = GetCurrentMemoryUsage();
        
        Rml::Log::Message(Rml::Log::LT_INFO, 
            "Memory usage: %.2f MB", used_memory / 1024.0f / 1024.0f);
    }
    
private:
    static size_t GetCurrentMemoryUsage()
    {
        // 平台特定的实现
#ifdef _WIN32
        PROCESS_MEMORY_COUNTERS pmc;
        GetProcessMemoryInfo(GetCurrentProcess(), &pmc, sizeof(pmc));
        return pmc.WorkingSetSize;
#else
        // Linux/macOS 实现
        struct rusage usage;
        getrusage(RUSAGE_SELF, &usage);
        return usage.ru_maxrss * 1024;  // KB to bytes
#endif
    }
};
```

---

## 七、实战练习

### 练习 1：优化大量元素的渲染

创建一个包含 1000 个元素的列表：
- 实现虚拟滚动
- 只渲染可见元素
- 使用对象池管理元素

### 练习 2：优化动画性能

优化一个包含多个动画的界面：
- 使用 requestAnimationFrame
- 批量更新动画
- 使用 CSS transform 代替布局属性

### 练习 3：减少内存占用

优化一个游戏 UI 系统：
- 使用对象池
- 实现纹理缓存
- 及时释放未使用的资源

---

## 八、最佳实践总结

### 8.1 渲染优化
- ✅ 使用批量渲染减少绘制调用
- ✅ 使用纹理图集减少纹理切换
- ✅ 减少过度绘制
- ✅ 使用硬件加速

### 8.2 布局优化
- ✅ 减少布局重计算
- ✅ 避免强制重排
- ✅ 使用 Flexbox 减少嵌套
- ✅ 合理使用定位

### 8.3 内存优化
- ✅ 使用对象池
- ✅ 实现纹理缓存
- ✅ 及时释放资源
- ✅ 避免内存泄漏

### 8.4 监控和调试
- ✅ 使用性能监控工具
- ✅ 定期检查内存使用
- ✅ 识别性能瓶颈
- ✅ 持续优化

---

## 九、下一步

继续学习 [调试技巧](06-debugging-tips.md) 来掌握更多调试方法。

---

## 📝 检查清单

- [ ] 理解性能分析工具
- [ ] 掌握渲染优化技巧
- [ ] 理解布局优化方法
- [ ] 能够实现内存优化
- [ ] 理解对象池的使用
- [ ] 能够监控性能指标
- [ ] 能够识别和解决性能问题