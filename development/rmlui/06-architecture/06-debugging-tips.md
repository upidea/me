# 6.6 调试技巧

调试是开发高质量 RmlUi 应用的重要技能。本节将深入讲解如何使用 RmlUi 的调试工具、识别和解决常见问题、以及自定义调试功能。

---

## 一、RmlUi Debugger

### 1.1 启用 Debugger

```cpp
#include <RmlUi/Debugger.h>

class App
{
public:
    bool Initialize()
    {
        // 初始化 RmlUi
        Rml::Initialise();
        
        // 创建 Context
        context_ = Rml::CreateContext("main", Rml::Vector2i(1920, 1080));
        
        // 初始化 Debugger
        Rml::Debugger::Initialise(context_);
        
        // 设置快捷键
        Rml::Debugger::SetVisible(true);
        
        return true;
    }
    
    void Update()
    {
        // 按 F8 切换 Debugger
        if (IsKeyPressed(KEY_F8))
        {
            Rml::Debugger::SetVisible(!Rml::Debugger::IsVisible());
        }
    }
};
```

### 1.2 Debugger 功能

RmlUi Debugger 提供以下功能：

1. **元素检查器** - 查看元素属性和样式
2. **元素树视图** - 浏览 DOM 结构
3. **样式编辑器** - 实时修改样式
4. **性能监控** - 查看渲染性能
5. **事件监听** - 监控事件流
6. **布局调试** - 可视化布局盒模型

### 1.3 使用快捷键

| 快捷键 | 功能 |
|--------|------|
| F8 | 切换 Debugger 显示 |
| Ctrl+Shift+I | 打开元素检查器 |
| Ctrl+Shift+C | 选择元素工具 |
| Ctrl+Shift+D | 切换调试模式 |

---

## 二、元素检查器

### 2.1 检查元素属性

```cpp
// ElementInspector.h
#pragma once
#include <RmlUi/Core/Element.h>
#include <string>

class ElementInspector
{
public:
    static void PrintElementInfo(Rml::Element* element);
    static void PrintElementStyles(Rml::Element* element);
    static void PrintElementBox(Rml::Element* element);
    static void PrintElementChildren(Rml::Element* element);

private:
    static void PrintProperty(const std::string& name, const std::string& value);
};

// ElementInspector.cpp
void ElementInspector::PrintElementInfo(Rml::Element* element)
{
    if (!element)
    {
        printf("Element is null\n");
        return;
    }
    
    printf("=== Element Info ===\n");
    printf("Tag: %s\n", element->GetTagName().c_str());
    printf("ID: %s\n", element->GetId().c_str());
    printf("Classes: %s\n", element->GetClassNames().c_str());
    
    // 打印属性
    printf("\nAttributes:\n");
    for (const auto& attr : element->GetAttributes())
    {
        printf("  %s: %s\n", 
            attr.first.Get().c_str(), 
            attr.second.Get<Rml::String>().c_str());
    }
}

void ElementInspector::PrintElementStyles(Rml::Element* element)
{
    if (!element) return;
    
    printf("\n=== Styles ===\n");
    
    // 打印计算样式
    auto properties = element->GetLocalStyleProperties();
    for (const auto& pair : properties)
    {
        printf("  %s: %s\n",
            Rml::StyleSheetSpecification::GetPropertyName(pair.first).c_str(),
            pair.second.ToString().c_str());
    }
}

void ElementInspector::PrintElementBox(Rml::Element* element)
{
    if (!element) return;
    
    printf("\n=== Box Model ===\n");
    const Rml::Box& box = element->GetBox();
    
    printf("Content: %.1f x %.1f\n", 
        box.GetWidth(Rml::BoxArea::Content),
        box.GetHeight(Rml::BoxArea::Content));
    
    printf("Padding: %.1f x %.1f\n",
        box.GetWidth(Rml::BoxArea::Padding),
        box.GetHeight(Rml::BoxArea::Padding));
    
    printf("Border: %.1f x %.1f\n",
        box.GetWidth(Rml::BoxArea::Border),
        box.GetHeight(Rml::BoxArea::Border));
    
    printf("Margin: %.1f x %.1f\n",
        box.GetWidth(Rml::BoxArea::Margin),
        box.GetHeight(Rml::BoxArea::Margin));
}

void ElementInspector::PrintElementChildren(Rml::Element* element)
{
    if (!element) return;
    
    printf("\n=== Children (%d) ===\n", element->GetNumChildren());
    
    for (int i = 0; i < element->GetNumChildren(); i++)
    {
        Rml::Element* child = element->GetChild(i);
        printf("[%d] %s", i, child->GetTagName().c_str());
        
        if (!child->GetId().empty())
            printf(" #%s", child->GetId().c_str());
        
        if (!child->GetClassNames().empty())
            printf(" .%s", child->GetClassNames().c_str());
        
        printf("\n");
    }
}
```

### 2.2 可视化布局

```css
/* 添加到你的 RCSS 中 */
* {
    outline: 1px solid rgba(255, 0, 0, 0.1);
}

.debug-layout {
    outline: 2px solid red !important;
    background: rgba(255, 0, 0, 0.1) !important;
}

.debug-content {
    background: rgba(0, 255, 0, 0.1) !important;
}

.debug-padding {
    background: rgba(0, 0, 255, 0.1) !important;
}

.debug-margin {
    outline: 2px dashed blue !important;
}
```

---

## 三、日志系统

### 3.1 自定义日志处理器

```cpp
// CustomLog.h
#pragma once
#include <RmlUi/Core/Log.h>
#include <fstream>
#include <string>

class CustomLog : public Rml::Log::LogHandler
{
public:
    CustomLog(const std::string& log_file);
    ~CustomLog();

    void LogMessage(Rml::Log::Type type, const Rml::String& message) override;

private:
    std::ofstream log_file_;
    std::string TypeToString(Rml::Log::Type type);
};

// CustomLog.cpp
CustomLog::CustomLog(const std::string& log_file)
{
    log_file_.open(log_file, std::ios::out | std::ios::app);
    if (!log_file_.is_open())
    {
        printf("Failed to open log file: %s\n", log_file.c_str());
    }
}

CustomLog::~CustomLog()
{
    if (log_file_.is_open())
    {
        log_file_.close();
    }
}

void CustomLog::LogMessage(Rml::Log::Type type, const Rml::String& message)
{
    std::string type_str = TypeToString(type);
    std::string time_str = GetCurrentTimeString();
    
    std::string log_line = "[" + time_str + "] [" + type_str + "] " + message + "\n";
    
    // 输出到文件
    if (log_file_.is_open())
    {
        log_file_ << log_line;
        log_file_.flush();
    }
    
    // 输出到控制台
    printf("%s", log_line.c_str());
}

std::string CustomLog::TypeToString(Rml::Log::Type type)
{
    switch (type)
    {
        case Rml::Log::LT_INFO:    return "INFO";
        case Rml::Log::LT_WARNING: return "WARN";
        case Rml::Log::LT_ERROR:   return "ERROR";
        case Rml::Log::LT_DEBUG:   return "DEBUG";
        default:                   return "UNKNOWN";
    }
}

// 使用
void InitializeLogging()
{
    auto log_handler = std::make_unique<CustomLog>("rmlui_debug.log");
    Rml::Log::SetLogHandler(std::move(log_handler));
}
```

### 3.2 条件日志

```cpp
// DebugHelper.h
#pragma once
#include <RmlUi/Core/Log.h>

#ifdef RMLUI_DEBUG
    #define DEBUG_LOG(msg, ...) \
        Rml::Log::Message(Rml::Log::LT_DEBUG, "[%s:%d] " msg, __FILE__, __LINE__, ##__VA_ARGS__)
#else
    #define DEBUG_LOG(msg, ...)
#endif

// 使用
DEBUG_LOG("Player health: %d", player_health);
DEBUG_LOG("Loading texture: %s", texture_path.c_str());
```

---

## 四、性能分析

### 4.1 渲染性能分析

```cpp
// RenderProfiler.h
#pragma once
#include <RmlUi/Core/Types.h>
#include <chrono>
#include <vector>

class RenderProfiler
{
public:
    struct RenderCall
    {
        std::string name;
        float duration_ms;
        int vertex_count;
        int index_count;
    };

    void BeginFrame();
    void BeginRenderCall(const std::string& name);
    void EndRenderCall();
    void EndFrame();
    
    void PrintReport();

private:
    std::chrono::time_point<std::chrono::high_resolution_clock> frame_start_;
    std::chrono::time_point<std::chrono::high_resolution_clock> call_start_;
    std::vector<RenderCall> render_calls_;
};

// RenderProfiler.cpp
void RenderProfiler::BeginFrame()
{
    frame_start_ = std::chrono::high_resolution_clock::now();
    render_calls_.clear();
}

void RenderProfiler::BeginRenderCall(const std::string& name)
{
    call_start_ = std::chrono::high_resolution_clock::now();
}

void RenderProfiler::EndRenderCall()
{
    auto end = std::chrono::high_resolution_clock::now();
    auto duration = std::chrono::duration_cast<std::chrono::microseconds>(
        end - call_start_).count();
    
    float duration_ms = duration / 1000.0f;
    
    RenderCall call;
    call.duration_ms = duration_ms;
    // 添加其他信息...
    
    render_calls_.push_back(call);
}

void RenderProfiler::EndFrame()
{
    auto end = std::chrono::high_resolution_clock::now();
    auto duration = std::chrono::duration_cast<std::chrono::microseconds>(
        end - frame_start_).count();
    
    float frame_time_ms = duration / 1000.0f;
    
    printf("Frame time: %.2f ms (%.1f FPS)\n", frame_time_ms, 1000.0f / frame_time_ms);
    
    PrintReport();
}

void RenderProfiler::PrintReport()
{
    printf("Render Calls (%zu):\n", render_calls_.size());
    
    float total_time = 0.0f;
    for (const auto& call : render_calls_)
    {
        printf("  %s: %.2f ms\n", call.name.c_str(), call.duration_ms);
        total_time += call.duration_ms;
    }
    
    printf("Total render time: %.2f ms\n", total_time);
}
```

### 4.2 内存分析

```cpp
// MemoryProfiler.h
#pragma once
#include <RmlUi/Core/Types.h>
#include <unordered_map>

class MemoryProfiler
{
public:
    static void RecordAllocation(const std::string& type, size_t size);
    static void RecordDeallocation(const std::string& type, size_t size);
    static void PrintReport();
    static void Reset();

private:
    struct MemoryStats {
        size_t current_allocations;
        size_t total_allocated;
        size_t total_deallocated;
        size_t peak_usage;
    };

    static std::unordered_map<std::string, MemoryStats> memory_stats_;
};

// MemoryProfiler.cpp
std::unordered_map<std::string, MemoryProfiler::MemoryStats> MemoryProfiler::memory_stats_;

void MemoryProfiler::RecordAllocation(const std::string& type, size_t size)
{
    auto& stats = memory_stats_[type];
    stats.current_allocations += size;
    stats.total_allocated += size;
    stats.peak_usage = std::max(stats.peak_usage, stats.current_allocations);
}

void MemoryProfiler::RecordDeallocation(const std::string& type, size_t size)
{
    auto& stats = memory_stats_[type];
    stats.current_allocations -= size;
    stats.total_deallocated += size;
}

void MemoryProfiler::PrintReport()
{
    printf("=== Memory Report ===\n");
    
    size_t total_current = 0;
    size_t total_peak = 0;
    
    for (const auto& pair : memory_stats_)
    {
        const auto& stats = pair.second;
        printf("%s:\n", pair.first.c_str());
        printf("  Current: %.2f MB\n", stats.current_allocations / 1024.0f / 1024.0f);
        printf("  Peak: %.2f MB\n", stats.peak_usage / 1024.0f / 1024.0f);
        printf("  Total allocated: %.2f MB\n", stats.total_allocated / 1024.0f / 1024.0f);
        
        total_current += stats.current_allocations;
        total_peak += stats.peak_usage;
    }
    
    printf("\nTotal:\n");
    printf("  Current: %.2f MB\n", total_current / 1024.0f / 1024.0f);
    printf("  Peak: %.2f MB\n", total_peak / 1024.0f / 1024.0f);
}
```

---

## 五、常见问题诊断

### 5.1 元素不显示

```cpp
// DebugElementVisibility.h
#pragma once
#include <RmlUi/Core/Element.h>

class DebugElementVisibility
{
public:
    static void Diagnose(Rml::Element* element);
    static void PrintVisibilityInfo(Rml::Element* element);

private:
    static bool IsVisible(Rml::Element* element);
    static bool HasValidSize(Rml::Element* element);
    static bool IsInViewport(Rml::Element* element);
};

// DebugElementVisibility.cpp
void DebugElementVisibility::Diagnose(Rml::Element* element)
{
    printf("=== Diagnosing element visibility ===\n");
    
    if (!element)
    {
        printf("ERROR: Element is null\n");
        return;
    }
    
    PrintVisibilityInfo(element);
    
    // 检查可见性
    if (!IsVisible(element))
    {
        printf("ISSUE: Element is not visible\n");
    }
    
    // 检查尺寸
    if (!HasValidSize(element))
    {
        printf("ISSUE: Element has invalid size\n");
    }
    
    // 检查视口
    if (!IsInViewport(element))
    {
        printf("ISSUE: Element is not in viewport\n");
    }
}

void DebugElementVisibility::PrintVisibilityInfo(Rml::Element* element)
{
    printf("Element: %s\n", element->GetTagName().c_str());
    
    // 检查 display 属性
    auto display = element->GetProperty(Rml::PropertyId::Display);
    printf("Display: %s\n", display ? display->ToString().c_str() : "not set");
    
    // 检查 visibility 属性
    auto visibility = element->GetProperty(Rml::PropertyId::Visibility);
    printf("Visibility: %s\n", visibility ? visibility->ToString().c_str() : "not set");
    
    // 检查 opacity
    auto opacity = element->GetProperty(Rml::PropertyId::Opacity);
    printf("Opacity: %s\n", opacity ? opacity->ToString().c_str() : "not set");
    
    // 检查尺寸
    printf("Size: %.1f x %.1f\n", 
        element->GetClientWidth(), 
        element->GetClientHeight());
}

bool DebugElementVisibility::IsVisible(Rml::Element* element)
{
    auto display = element->GetProperty(Rml::PropertyId::Display);
    if (!display || display->Get<Rml::Style::Display>() == Rml::Style::Display::None)
        return false;
    
    auto visibility = element->GetProperty(Rml::PropertyId::Visibility);
    if (!visibility || visibility->Get<Rml::Style::Visibility>() == Rml::Style::Visibility::Hidden)
        return false;
    
    auto opacity = element->GetProperty(Rml::PropertyId::Opacity);
    if (opacity && opacity->Get<float>() <= 0.0f)
        return false;
    
    return true;
}

bool DebugElementVisibility::HasValidSize(Rml::Element* element)
{
    return element->GetClientWidth() > 0 && element->GetClientHeight() > 0;
}

bool DebugElementVisibility::IsInViewport(Rml::Element* element)
{
    // 检查元素是否在父元素的可视区域内
    Rml::Element* parent = element->GetParentNode();
    while (parent)
    {
        if (parent->GetProperty(Rml::PropertyId::Overflow) &&
            parent->GetProperty(Rml::PropertyId::Overflow)->Get<Rml::Style::Overflow>() == Rml::Style::Overflow::Hidden)
        {
            // 检查是否在滚动容器内
            // 实现省略...
        }
        parent = parent->GetParentNode();
    }
    return true;
}
```

### 5.2 事件不触发

```cpp
// DebugEvents.h
#pragma once
#include <RmlUi/Core/EventListener.h>

class DebugEventListener : public Rml::EventListener
{
public:
    DebugEventListener(const std::string& name);
    void ProcessEvent(Rml::Event& event) override;

private:
    std::string name_;
    void PrintEventInfo(Rml::Event& event);
};

// DebugEvents.cpp
DebugEventListener::DebugEventListener(const std::string& name)
    : name_(name)
{
}

void DebugEventListener::ProcessEvent(Rml::Event& event)
{
    printf("=== Event ===\n");
    printf("Handler: %s\n", name_.c_str());
    PrintEventInfo(event);
}

void DebugEventListener::PrintEventInfo(Rml::Event& event)
{
    printf("Type: %d\n", (int)event.GetId());
    printf("Target: %s\n", event.GetTargetElement()->GetTagName().c_str());
    printf("Current: %s\n", event.GetCurrentElement()->GetTagName().c_str());
    
    // 打印所有参数
    printf("Parameters:\n");
    for (const auto& param : event.GetParameters())
    {
        printf("  %s: %s\n", 
            param.first.c_str(),
            param.second.Get<Rml::String>().c_str());
    }
}

// 使用
Rml::Element* button = document->GetElementById("my-button");
button->AddEventListener(Rml::EventId::Click, new DebugEventListener("Button Click"));
```

---

## 六、自定义调试工具

### 6.1 调试面板

```cpp
// DebugPanel.h
#pragma once
#include <RmlUi/Core/EventListener.h>
#include <string>

class DebugPanel : public Rml::EventListener
{
public:
    DebugPanel(Rml::Context* context);
    ~DebugPanel();

    bool Initialize();
    void Shutdown();
    void Toggle();
    void Update(float delta_time);

    void ProcessEvent(Rml::Event& event) override;

private:
    void CreateUI();
    void UpdateFPS();
    void UpdateMemory();
    void UpdateRenderStats();

private:
    Rml::Context* context_;
    Rml::ElementDocument* document_;
    bool visible_;
    
    float fps_;
    float frame_time_;
    int frame_count_;
    float fps_timer_;
};

// DebugPanel.cpp
DebugPanel::DebugPanel(Rml::Context* context)
    : context_(context), document_(nullptr), visible_(false),
      fps_(0.0f), frame_time_(0.0f), frame_count_(0), fps_timer_(0.0f)
{
}

bool DebugPanel::Initialize()
{
    document_ = context_->LoadDocument("ui/debug_panel.rml");
    if (!document_)
        return false;
    
    CreateUI();
    
    return true;
}

void DebugPanel::CreateUI()
{
    // FPS 显示
    Rml::Element* fps_element = document_->GetElementById("fps");
    if (fps_element)
    {
        fps_element->SetInnerRML("0 FPS");
    }
    
    // 内存显示
    Rml::Element* memory_element = document_->GetElementById("memory");
    if (memory_element)
    {
        memory_element->SetInnerRML("0 MB");
    }
}

void DebugPanel::Update(float delta_time)
{
    if (!visible_ || !document_)
        return;
    
    // 更新 FPS
    frame_count_++;
    fps_timer_ += delta_time;
    
    if (fps_timer_ >= 1.0f)
    {
        fps_ = frame_count_ / fps_timer_;
        frame_count_ = 0;
        fps_timer_ = 0.0f;
        
        UpdateFPS();
        UpdateMemory();
        UpdateRenderStats();
    }
}

void DebugPanel::UpdateFPS()
{
    Rml::Element* fps_element = document_->GetElementById("fps");
    if (fps_element)
    {
        fps_element->SetInnerRML(std::to_string((int)fps_) + " FPS");
    }
}

void DebugPanel::UpdateMemory()
{
    size_t memory = GetCurrentMemoryUsage();
    
    Rml::Element* memory_element = document_->GetElementById("memory");
    if (memory_element)
    {
        memory_element->SetInnerRML(std::to_string(memory / 1024 / 1024) + " MB");
    }
}

void DebugPanel::UpdateRenderStats()
{
    // 更新渲染统计
}

void DebugPanel::Toggle()
{
    visible_ = !visible_;
    
    if (document_)
    {
        if (visible_)
            document_->Show();
        else
            document_->Hide();
    }
}
```

### 6.2 调试面板 RML

```xml
<rml>
<head>
    <title>调试面板</title>
    <link type="text/rcss" href="debug_panel.rcss"/>
</head>
<body>
    <div class="debug-panel">
        <div class="debug-header">
            <span>调试信息</span>
            <button id="close-btn">×</button>
        </div>
        
        <div class="debug-section">
            <h3>性能</h3>
            <div class="debug-row">
                <span>FPS:</span>
                <span id="fps">0 FPS</span>
            </div>
            <div class="debug-row">
                <span>帧时间:</span>
                <span id="frame-time">0 ms</span>
            </div>
        </div>
        
        <div class="debug-section">
            <h3>内存</h3>
            <div class="debug-row">
                <span>内存:</span>
                <span id="memory">0 MB</span>
            </div>
        </div>
        
        <div class="debug-section">
            <h3>渲染</h3>
            <div class="debug-row">
                <span>绘制调用:</span>
                <span id="draw-calls">0</span>
            </div>
            <div class="debug-row">
                <span>顶点数:</span>
                <span id="vertices">0</span>
            </div>
        </div>
    </div>
</body>
</rml>
```

---

## 七、实战练习

### 练习 1：创建自定义调试工具

创建一个自定义调试工具：
- 元素选择器
- 样式编辑器
- 实时预览

### 练习 2：实现性能监控

实现一个完整的性能监控系统：
- FPS 监控
- 内存监控
- 渲染统计

### 练习 3：创建错误报告系统

创建一个错误报告系统：
- 错误捕获
- 错误日志
- 错误详情显示

---

## 八、最佳实践

### 8.1 调试策略
- ✅ 使用 Debugger 进行快速诊断
- ✅ 添加自定义日志记录
- ✅ 实现性能监控
- ✅ 创建可视化调试工具

### 8.2 问题解决
- ✅ 系统化诊断问题
- ✅ 使用二分法定位问题
- ✅ 记录问题和解决方案
- ✅ 编写测试用例

### 8.3 性能优化
- ✅ 识别性能瓶颈
- ✅ 优化关键路径
- ✅ 减少不必要的计算
- ✅ 使用性能分析工具

---

## 九、调试技巧总结

### 9.1 常用调试命令
```bash
# 启用调试模式
export RMLUI_DEBUG=1

# 查看日志
tail -f rmlui_debug.log

# 性能分析
perf record ./my_app
perf report
```

### 9.2 调试检查清单
- [ ] 元素是否正确显示
- [ ] 事件是否正确触发
- [ ] 样式是否正确应用
- [ ] 性能是否满足要求
- [ ] 内存使用是否正常
- [ ] 日志是否正确记录

---

## 十、下一步

恭喜完成阶段六的学习！你现在应该：

1. ✅ 理解 UI 架构模式
2. ✅ 掌握界面管理技术
3. ✅ 能够实现本地化
4. ✅ 掌握性能优化方法
5. ✅ 熟练使用调试工具

---

## 📝 检查清单

- [ ] 能够使用 RmlUi Debugger
- [ ] 理解元素检查器
- [ ] 能够自定义日志系统
- [ ] 掌握性能分析方法
- [ ] 能够诊断常见问题
- [ ] 能够创建调试工具
- [ ] 理解调试最佳实践