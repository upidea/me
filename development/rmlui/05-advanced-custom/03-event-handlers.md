# 5.3 事件处理器

事件处理器（Event Handlers）允许你封装可重用的交互逻辑，实现代码的模块化和复用。本节将深入讲解如何创建高级的事件处理器。

---

## 一、基础事件处理器

### 1.1 EventListener 接口

```cpp
class EventListener {
public:
    virtual ~EventListener() = default;
    
    // 处理事件
    virtual void ProcessEvent(Event& event) = 0;
};
```

### 1.2 创建基础处理器

```cpp
// ClickHandler.h
#pragma once
#include <RmlUi/Core/EventListener.h>
#include <functional>

class ClickHandler : public Rml::EventListener
{
public:
    using ClickCallback = std::function<void(Rml::Event&)>;

    ClickHandler(ClickCallback callback);
    void ProcessEvent(Rml::Event& event) override;

private:
    ClickCallback callback_;
};

// ClickHandler.cpp
ClickHandler::ClickHandler(ClickCallback callback)
    : callback_(std::move(callback))
{
}

void ClickHandler::ProcessEvent(Rml::Event& event)
{
    if (event.GetId() == Rml::EventId::Click)
    {
        callback_(event);
    }
}

// 使用示例
void OnStartButtonClick(Rml::Event& event)
{
    Rml::Element* button = event.GetCurrentElement();
    printf("Button clicked: %s\n", button->GetId().c_str());
}

// 注册
Rml::Element* button = document->GetElementById("btn-start");
button->AddEventListener(Rml::EventId::Click, new ClickHandler(OnStartButtonClick));
```

---

## 二、高级事件处理器

### 2.1 拖拽处理器

```cpp
// DragHandler.h
#pragma once
#include <RmlUi/Core/EventListener.h>
#include <RmlUi/Core/Element.h>

class DragHandler : public Rml::EventListener
{
public:
    DragHandler(Rml::Element* target, Rml::Element* handle);
    ~DragHandler();

    void ProcessEvent(Rml::Event& event) override;

private:
    Rml::Element* target_;
    Rml::Element* handle_;
    bool is_dragging_;
    Rml::Vector2f drag_offset_;

    void StartDrag(Rml::Event& event);
    void OnDrag(Rml::Event& event);
    void EndDrag(Rml::Event& event);
};

// DragHandler.cpp
DragHandler::DragHandler(Rml::Element* target, Rml::Element* handle)
    : target_(target), handle_(handle), is_dragging_(false)
{
    if (handle_)
    {
        handle_->AddEventListener(Rml::EventId::Mousedown, this);
    }
}

DragHandler::~DragHandler()
{
    if (handle_)
    {
        handle_->RemoveEventListener(Rml::EventId::Mousedown, this);
    }
}

void DragHandler::ProcessEvent(Rml::Event& event)
{
    switch (event.GetId())
    {
        case Rml::EventId::Mousedown:
            StartDrag(event);
            break;
        case Rml::EventId::Mousemove:
            OnDrag(event);
            break;
        case Rml::EventId::Mouseup:
            EndDrag(event);
            break;
    }
}

void DragHandler::StartDrag(Rml::Event& event)
{
    if (event.GetCurrentElement() == handle_)
    {
        is_dragging_ = true;
        Rml::Vector2f mouse_pos = event.GetParameter<Rml::Vector2f>("mouse_pos", Rml::Vector2f(0, 0));
        drag_offset_ = mouse_pos - target_->GetAbsoluteLeftTop();
        
        target_->SetProperty(Rml::PropertyId::Cursor, Rml::Property(Rml::Style::Cursor::Move));
        
        // 监听全局移动和释放
        target_->GetOwnerDocument()->AddEventListener(Rml::EventId::Mousemove, this);
        target_->GetOwnerDocument()->AddEventListener(Rml::EventId::Mouseup, this);
    }
}

void DragHandler::OnDrag(Rml::Event& event)
{
    if (is_dragging_)
    {
        Rml::Vector2f mouse_pos = event.GetParameter<Rml::Vector2f>("mouse_pos", Rml::Vector2f(0, 0));
        Rml::Vector2f new_pos = mouse_pos - drag_offset_;
        
        target_->SetProperty(Rml::PropertyId::Left, Rml::Property(new_pos.x, Rml::Unit::PX));
        target_->SetProperty(Rml::PropertyId::Top, Rml::Property(new_pos.y, Rml::Unit::PX));
    }
}

void DragHandler::EndDrag(Rml::Event& event)
{
    if (is_dragging_)
    {
        is_dragging_ = false;
        target_->SetProperty(Rml::PropertyId::Cursor, Rml::Property(Rml::Style::Cursor::Auto));
        
        target_->GetOwnerDocument()->RemoveEventListener(Rml::EventId::Mousemove, this);
        target_->GetOwnerDocument()->RemoveEventListener(Rml::EventId::Mouseup, this);
    }
}
```

### 2.2 快捷键处理器

```cpp
// ShortcutHandler.h
#pragma once
#include <RmlUi/Core/EventListener.h>
#include <RmlUi/Core/Input.h>
#include <unordered_map>
#include <functional>

class ShortcutHandler : public Rml::EventListener
{
public:
    struct ShortcutKey {
        Rml::Input::KeyIdentifier key;
        bool ctrl;
        bool shift;
        bool alt;
        
        bool operator==(const ShortcutKey& other) const
        {
            return key == other.key && 
                   ctrl == other.ctrl && 
                   shift == other.shift && 
                   alt == other.alt;
        }
    };
    
    struct ShortcutKeyHash {
        std::size_t operator()(const ShortcutKey& k) const
        {
            return std::hash<int>()(k.key) ^ 
                   (std::hash<bool>()(k.ctrl) << 1) ^ 
                   (std::hash<bool>()(k.shift) << 2) ^ 
                   (std::hash<bool>()(k.alt) << 3);
        }
    };
    
    using ShortcutCallback = std::function<void()>;

    ShortcutHandler();
    
    void RegisterShortcut(Rml::Input::KeyIdentifier key, ShortcutCallback callback,
                         bool ctrl = false, bool shift = false, bool alt = false);
    
    void ProcessEvent(Rml::Event& event) override;

private:
    std::unordered_map<ShortcutKey, ShortcutCallback, ShortcutKeyHash> shortcuts_;
};

// ShortcutHandler.cpp
ShortcutHandler::ShortcutHandler()
{
}

void ShortcutHandler::RegisterShortcut(Rml::Input::KeyIdentifier key, ShortcutCallback callback,
                                      bool ctrl, bool shift, bool alt)
{
    ShortcutKey shortcut_key = {key, ctrl, shift, alt};
    shortcuts_[shortcut_key] = std::move(callback);
}

void ShortcutHandler::ProcessEvent(Rml::Event& event)
{
    if (event.GetId() == Rml::EventId::Keydown)
    {
        Rml::Input::KeyIdentifier key = event.GetParameter<Rml::Input::KeyIdentifier>("key_code");
        bool ctrl = event.GetParameter<bool>("ctrl_key", false);
        bool shift = event.GetParameter<bool>("shift_key", false);
        bool alt = event.GetParameter<bool>("alt_key", false);
        
        ShortcutKey shortcut_key = {key, ctrl, shift, alt};
        auto it = shortcuts_.find(shortcut_key);
        if (it != shortcuts_.end())
        {
            it->second();
            event.StopPropagation();
        }
    }
}
```

---

## 三、事件处理器工厂

### 3.1 工厂模式

```cpp
// EventHandlerFactory.h
#pragma once
#include <RmlUi/Core/EventListener.h>
#include <functional>
#include <memory>

class EventHandlerFactory
{
public:
    static std::unique_ptr<Rml::EventListener> CreateClickHandler(
        std::function<void(Rml::Event&)> callback)
    {
        return std::make_unique<ClickHandler>(std::move(callback));
    }

    static std::unique_ptr<Rml::EventListener> CreateDragHandler(
        Rml::Element* target, Rml::Element* handle)
    {
        return std::make_unique<DragHandler>(target, handle);
    }

    static std::unique_ptr<Rml::EventListener> CreateHoverHandler(
        std::function<void(Rml::Event&)> on_enter,
        std::function<void(Rml::Event&)> on_leave)
    {
        return std::make_unique<HoverHandler>(std::move(on_enter), std::move(on_leave));
    }
};

// HoverHandler.h
class HoverHandler : public Rml::EventListener
{
public:
    HoverHandler(std::function<void(Rml::Event&)> on_enter,
                 std::function<void(Rml::Event&)> on_leave)
        : on_enter_(std::move(on_enter)), on_leave_(std::move(on_leave))
    {
    }

    void ProcessEvent(Rml::Event& event) override
    {
        if (event.GetId() == Rml::EventId::Mouseover)
        {
            on_enter_(event);
        }
        else if (event.GetId() == Rml::EventId::Mouseout)
        {
            on_leave_(event);
        }
    }

private:
    std::function<void(Rml::Event&)> on_enter_;
    std::function<void(Rml::Event&)> on_leave_;
};
```

---

## 四、事件处理器管理器

### 4.1 管理器实现

```cpp
// EventHandlerManager.h
#pragma once
#include <RmlUi/Core/EventListener.h>
#include <unordered_map>
#include <memory>

class EventHandlerManager
{
public:
    static EventHandlerManager& Instance()
    {
        static EventHandlerManager instance;
        return instance;
    }

    // 注册处理器
    void RegisterHandler(const Rml::String& name, std::unique_ptr<Rml::EventListener> handler)
    {
        handlers_[name] = std::move(handler);
    }

    // 获取处理器
    Rml::EventListener* GetHandler(const Rml::String& name)
    {
        auto it = handlers_.find(name);
        return it != handlers_.end() ? it->second.get() : nullptr;
    }

    // 清除所有处理器
    void Clear()
    {
        handlers_.clear();
    }

private:
    EventHandlerManager() = default;
    std::unordered_map<Rml::String, std::unique_ptr<Rml::EventListener>> handlers_;
};

// 使用示例
EventHandlerManager::Instance().RegisterHandler(
    "drag_window",
    EventHandlerFactory::CreateDragHandler(window, header)
);

// 绑定到元素
Rml::Element* element = document->GetElementById("my-element");
element->AddEventListener(Rml::EventId::Click, 
    EventHandlerManager::Instance().GetHandler("drag_window"));
```

---

## 五、实战示例

### 5.1 完整的窗口管理器

```cpp
// WindowManager.h
#pragma once
#include <RmlUi/Core/EventListener.h>
#include <RmlUi/Core/Element.h>
#include <vector>

class WindowManager : public Rml::EventListener
{
public:
    WindowManager(Rml::Context* context);
    ~WindowManager();

    // 创建窗口
    Rml::Element* CreateWindow(const Rml::String& title, float x, float y, float width, float height);

    // 关闭窗口
    void CloseWindow(Rml::Element* window);

    void ProcessEvent(Rml::Event& event) override;

private:
    struct WindowData {
        Rml::Element* window;
        Rml::Element* header;
        Rml::Element* content;
        Rml::Element* close_button;
        std::unique_ptr<DragHandler> drag_handler;
    };

    Rml::Context* context_;
    std::vector<std::unique_ptr<WindowData>> windows_;
    WindowData* active_window_;
    WindowData* dragged_window_;

    void SetupWindowEvents(WindowData* window_data);
    void BringToFront(WindowData* window_data);
};
```

---

## 六、最佳实践

### 6.1 内存管理

```cpp
// 使用智能指针管理处理器生命周期
class ManagedEventHandler
{
private:
    std::vector<std::unique_ptr<Rml::EventListener>> handlers_;

public:
    void AddHandler(Rml::Element* element, Rml::EventId id, 
                   std::unique_ptr<Rml::EventListener> handler)
    {
        element->AddEventListener(id, handler.get());
        handlers_.push_back(std::move(handler));
    }
};
```

### 6.2 性能优化

```cpp
// 使用事件委托减少监听器数量
class EventDelegate : public Rml::EventListener
{
public:
    void ProcessEvent(Rml::Event& event) override
    {
        Rml::Element* target = event.GetTargetElement();
        Rml::String id = target->GetId();
        
        // 根据 ID 分发到不同的处理器
        auto it = handlers_.find(id);
        if (it != handlers_.end())
        {
            it->second(event);
        }
    }

    void RegisterHandler(const Rml::String& id, std::function<void(Rml::Event&)> handler)
    {
        handlers_[id] = std::move(handler);
    }

private:
    std::unordered_map<Rml::String, std::function<void(Rml::Event&)>> handlers_;
};
```

---

## 七、实战练习

### 练习 1：创建表单验证处理器

实现一个表单验证处理器：
- 输入时验证
- 显示错误提示
- 禁用/启用提交按钮

### 练习 2：创建动画序列处理器

实现一个动画序列处理器：
- 按顺序播放动画
- 支持回调
- 支持暂停/继续

### 练习 3：创建拖放处理器

实现一个拖放处理器：
- 支持拖拽元素
- 支持放置目标
- 支持数据传递

---

## 八、下一步

继续学习 [插件开发](04-plugin-development.md) 来创建更复杂的系统集成。

---

## 📝 检查清单

- [ ] 理解 EventListener 接口
- [ ] 能够创建基础事件处理器
- [ ] 能够创建高级事件处理器（拖拽、快捷键）
- [ ] 理解事件处理器工厂
- [ ] 能够管理事件处理器
- [ ] 理解内存管理最佳实践
- [ ] 能够优化事件处理性能