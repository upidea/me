# 6.2 界面管理

界面管理是构建复杂 UI 系统的关键。本节将深入讲解如何实现高效的界面管理系统，包括窗口管理、层级控制、状态管理和界面转场。

---

## 一、界面管理系统

### 1.1 界面管理器架构

```cpp
// InterfaceManager.h
#pragma once
#include <RmlUi/Core/Context.h>
#include <RmlUi/Core/ElementDocument.h>
#include <string>
#include <vector>
#include <memory>
#include <unordered_map>

enum class InterfaceState
{
    Hidden,
    Showing,
    Visible,
    Hiding
};

struct InterfaceData
{
    std::string name;
    Rml::ElementDocument* document;
    InterfaceState state;
    bool modal;
    bool exclusive;
    int z_index;
    std::string transition_in;
    std::string transition_out;
};

class InterfaceManager : public Rml::EventListener
{
public:
    static InterfaceManager& Instance()
    {
        static InterfaceManager instance;
        return instance;
    }

    void Initialize(Rml::Context* context);
    void Shutdown();

    // 加载界面
    bool LoadInterface(const std::string& name, const std::string& path);
    
    // 显示/隐藏界面
    void ShowInterface(const std::string& name, bool modal = false, bool exclusive = false);
    void HideInterface(const std::string& name);
    
    // 切换界面
    void SwitchInterface(const std::string& from_name, const std::string& to_name);
    
    // 获取界面
    InterfaceData* GetInterface(const std::string& name);
    Rml::ElementDocument* GetDocument(const std::string& name);
    
    // 更新
    void Update(float delta_time);
    
    // 事件处理
    void ProcessEvent(Rml::Event& event) override;

private:
    InterfaceManager() = default;
    
    void UpdateZIndices();
    void PlayTransition(InterfaceData* interface, const std::string& transition);
    void OnInterfaceShown(InterfaceData* interface);
    void OnInterfaceHidden(InterfaceData* interface);

private:
    Rml::Context* context_;
    std::unordered_map<std::string, std::unique_ptr<InterfaceData>> interfaces_;
    std::vector<InterfaceData*> visible_interfaces_;
    int next_z_index_;
};

// InterfaceManager.cpp
void InterfaceManager::Initialize(Rml::Context* context)
{
    context_ = context;
    next_z_index_ = 1000;
}

void InterfaceManager::Shutdown()
{
    for (auto& pair : interfaces_)
    {
        if (pair.second->document)
        {
            pair.second->document->Close();
        }
    }
    interfaces_.clear();
    visible_interfaces_.clear();
}

bool InterfaceManager::LoadInterface(const std::string& name, const std::string& path)
{
    Rml::ElementDocument* doc = context_->LoadDocument(path);
    if (!doc)
    {
        Rml::Log::Message(Rml::Log::LT_ERROR, 
            "Failed to load interface: %s from %s", name.c_str(), path.c_str());
        return false;
    }
    
    auto data = std::make_unique<InterfaceData>();
    data->name = name;
    data->document = doc;
    data->state = InterfaceState::Hidden;
    data->modal = false;
    data->exclusive = false;
    data->z_index = next_z_index_++;
    
    interfaces_[name] = std::move(data);
    return true;
}

void InterfaceManager::ShowInterface(const std::string& name, bool modal, bool exclusive)
{
    auto it = interfaces_.find(name);
    if (it == interfaces_.end())
    {
        Rml::Log::Message(Rml::Log::LT_ERROR, "Interface not found: %s", name.c_str());
        return;
    }
    
    InterfaceData* interface = it->second.get();
    
    // 如果是独占模式，隐藏其他界面
    if (exclusive)
    {
        for (auto* other : visible_interfaces_)
        {
            if (other != interface)
            {
                HideInterface(other->name);
            }
        }
    }
    
    // 如果是模态模式，隐藏非模态界面
    if (modal)
    {
        for (auto* other : visible_interfaces_)
        {
            if (other != interface && !other->modal)
            {
                HideInterface(other->name);
            }
        }
    }
    
    // 如果已经显示，直接返回
    if (interface->state == InterfaceState::Visible)
        return;
    
    // 显示界面
    interface->state = InterfaceState::Showing;
    interface->modal = modal;
    interface->exclusive = exclusive;
    
    // 播放入场动画
    if (!interface->transition_in.empty())
    {
        PlayTransition(interface, interface->transition_in);
    }
    else
    {
        interface->document->Show();
        interface->state = InterfaceState::Visible;
        OnInterfaceShown(interface);
    }
    
    // 更新可见界面列表
    visible_interfaces_.push_back(interface);
    UpdateZIndices();
}

void InterfaceManager::HideInterface(const std::string& name)
{
    auto it = interfaces_.find(name);
    if (it == interfaces_.end())
        return;
    
    InterfaceData* interface = it->second.get();
    
    if (interface->state == InterfaceState::Hidden || 
        interface->state == InterfaceState::Hiding)
        return;
    
    // 播放出场动画
    if (!interface->transition_out.empty())
    {
        interface->state = InterfaceState::Hiding;
        PlayTransition(interface, interface->transition_out);
    }
    else
    {
        interface->document->Hide();
        interface->state = InterfaceState::Hidden;
        OnInterfaceHidden(interface);
    }
    
    // 从可见界面列表中移除
    visible_interfaces_.erase(
        std::remove(visible_interfaces_.begin(), visible_interfaces_.end(), interface),
        visible_interfaces_.end()
    );
    UpdateZIndices();
}

void InterfaceManager::SwitchInterface(const std::string& from_name, const std::string& to_name)
{
    HideInterface(from_name);
    ShowInterface(to_name);
}

void InterfaceManager::Update(float delta_time)
{
    // 更新所有可见界面
    for (auto* interface : visible_interfaces_)
    {
        if (interface->state == InterfaceState::Showing || 
            interface->state == InterfaceState::Hiding)
        {
            // 等待动画完成
        }
    }
}

void InterfaceManager::UpdateZIndices()
{
    for (size_t i = 0; i < visible_interfaces_.size(); i++)
    {
        visible_interfaces_[i]->z_index = next_z_index_ + (int)i;
        visible_interfaces_[i]->document->SetProperty(
            Rml::PropertyId::ZIndex, 
            Rml::Property(visible_interfaces_[i]->z_index)
        );
    }
}

void InterfaceManager::PlayTransition(InterfaceData* interface, const std::string& transition)
{
    // 这里可以实现转场动画
    // 例如：fade-in, slide-in, zoom-in 等
    if (transition == "fade-in")
    {
        interface->document->SetProperty(Rml::PropertyId::Opacity, Rml::Property(0.0f));
        interface->document->Show();
        
        // 使用动画淡入
        interface->document->Animate("opacity", "1.0f", 0.3f, Rml::Tween::CubicEaseOut);
        interface->state = InterfaceState::Visible;
        OnInterfaceShown(interface);
    }
    else if (transition == "slide-in")
    {
        interface->document->Show();
        interface->state = InterfaceState::Visible;
        OnInterfaceShown(interface);
    }
    else
    {
        interface->document->Show();
        interface->state = InterfaceState::Visible;
        OnInterfaceShown(interface);
    }
}

void InterfaceManager::OnInterfaceShown(InterfaceData* interface)
{
    Rml::Dictionary params;
    params["interface"] = interface->name;
    interface->document->DispatchEvent(Rml::StringId("interface_shown"), params);
}

void InterfaceManager::OnInterfaceHidden(InterfaceData* interface)
{
    Rml::Dictionary params;
    params["interface"] = interface->name;
    interface->document->DispatchEvent(Rml::StringId("interface_hidden"), params);
}

void InterfaceManager::ProcessEvent(Rml::Event& event)
{
    if (event.GetId() == Rml::StringId("hide_interface"))
    {
        std::string name = event.GetParameter<std::string>("name", "");
        HideInterface(name);
    }
    else if (event.GetId() == Rml::StringId("show_interface"))
    {
        std::string name = event.GetParameter<std::string>("name", "");
        bool modal = event.GetParameter<bool>("modal", false);
        bool exclusive = event.GetParameter<bool>("exclusive", false);
        ShowInterface(name, modal, exclusive);
    }
}
```

---

## 二、窗口管理

### 2.1 可拖拽窗口系统

```cpp
// WindowManager.h
#pragma once
#include <RmlUi/Core/Element.h>
#include <RmlUi/Core/EventListener.h>
#include <vector>

class WindowData
{
public:
    Rml::Element* window;
    Rml::Element* header;
    Rml::Element* close_button;
    Rml::Element* minimize_button;
    Rml::Element* maximize_button;
    
    bool is_dragging;
    bool is_resizing;
    Rml::Vector2f drag_offset;
    Rml::Vector2f original_size;
    Rml::Vector2f resize_direction;
    
    bool is_minimized;
    bool is_maximized;
    Rml::Vector2f restore_position;
    Rml::Vector2f restore_size;
};

class WindowManager : public Rml::EventListener
{
public:
    static WindowManager& Instance()
    {
        static WindowManager instance;
        return instance;
    }

    // 创建窗口
    Rml::Element* CreateWindow(
        const std::string& title,
        float x, float y, float width, float height,
        bool closable = true,
        bool minimizable = true,
        bool maximizable = true);
    
    // 关闭窗口
    void CloseWindow(Rml::Element* window);
    
    // 最小化/最大化/恢复窗口
    void MinimizeWindow(Rml::Element* window);
    void MaximizeWindow(Rml::Element* window);
    void RestoreWindow(Rml::Element* window);
    
    // 激活窗口
    void ActivateWindow(Rml::Element* window);
    
    // 事件处理
    void ProcessEvent(Rml::Event& event) override;

private:
    WindowManager() = default;
    
    WindowData* GetWindowData(Rml::Element* window);
    void SetupWindowEvents(WindowData* data);
    void UpdateZOrder();
    
    std::vector<std::unique_ptr<WindowData>> windows_;
    WindowData* active_window_;
    WindowData* dragged_window_;
    WindowData* resized_window_;
};

// WindowManager.cpp
Rml::Element* WindowManager::CreateWindow(
    const std::string& title,
    float x, float y, float width, float height,
    bool closable, bool minimizable, bool maximizable)
{
    // 创建窗口元素
    Rml::Element* window = context_->CreateElement("div");
    window->SetClass("window");
    window->SetProperty(Rml::PropertyId::Position, Rml::Property(Rml::Style::Position::Absolute));
    window->SetProperty(Rml::PropertyId::Left, Rml::Property(x, Rml::Unit::PX));
    window->SetProperty(Rml::PropertyId::Top, Rml::Property(y, Rml::Unit::PX));
    window->SetProperty(Rml::PropertyId::Width, Rml::Property(width, Rml::Unit::PX));
    window->SetProperty(Rml::PropertyId::Height, Rml::Property(height, Rml::Unit::PX));
    
    // 创建标题栏
    Rml::Element* header = context_->CreateElement("div");
    header->SetClass("window-header");
    header->SetInnerRML(title);
    window->AppendChild(header);
    
    // 创建内容区域
    Rml::Element* content = context_->CreateElement("div");
    content->SetClass("window-content");
    window->AppendChild(content);
    
    // 创建窗口数据
    auto data = std::make_unique<WindowData>();
    data->window = window;
    data->header = header;
    data->is_dragging = false;
    data->is_resizing = false;
    data->is_minimized = false;
    data->is_maximized = false;
    
    // 设置窗口按钮
    if (closable)
    {
        data->close_button = context_->CreateElement("button");
        data->close_button->SetClass("window-close");
        data->close_button->SetInnerRML("×");
        header->AppendChild(data->close_button);
    }
    
    if (minimizable)
    {
        data->minimize_button = context_->CreateElement("button");
        data->minimize_button->SetClass("window-minimize");
        data->minimize_button->SetInnerRML("-");
        header->AppendChild(data->minimize_button);
    }
    
    if (maximizable)
    {
        data->maximize_button = context_->CreateElement("button");
        data->maximize_button->SetClass("window-maximize");
        data->maximize_button->SetInnerRML("□");
        header->AppendChild(data->maximize_button);
    }
    
    // 设置事件
    SetupWindowEvents(data.get());
    
    // 添加到窗口列表
    windows_.push_back(std::move(data));
    ActivateWindow(window);
    
    return window;
}

void WindowManager::SetupWindowEvents(WindowData* data)
{
    // 标题栏拖拽
    data->header->AddEventListener(Rml::EventId::Mousedown, this);
    
    // 按钮事件
    if (data->close_button)
        data->close_button->AddEventListener(Rml::EventId::Click, this);
    if (data->minimize_button)
        data->minimize_button->AddEventListener(Rml::EventId::Click, this);
    if (data->maximize_button)
        data->maximize_button->AddEventListener(Rml::EventId::Click, this);
    
    // 窗口激活
    data->window->AddEventListener(Rml::EventId::Focus, this);
}

void WindowManager::ProcessEvent(Rml::Event& event)
{
    if (event.GetId() == Rml::EventId::Mousedown)
    {
        Rml::Element* target = event.GetTargetElement();
        WindowData* data = GetWindowData(target);
        
        if (data && target == data->header)
        {
            // 开始拖拽
            dragged_window_ = data;
            data->is_dragging = true;
            Rml::Vector2f mouse_pos = event.GetParameter<Rml::Vector2f>("mouse_pos");
            data->drag_offset = mouse_pos - data->window->GetAbsoluteLeftTop();
            ActivateWindow(data->window);
        }
    }
    else if (event.GetId() == Rml::EventId::Mousemove)
    {
        if (dragged_window_ && dragged_window_->is_dragging)
        {
            Rml::Vector2f mouse_pos = event.GetParameter<Rml::Vector2f>("mouse_pos");
            Rml::Vector2f new_pos = mouse_pos - dragged_window_->drag_offset;
            
            dragged_window_->window->SetProperty(
                Rml::PropertyId::Left, 
                Rml::Property(new_pos.x, Rml::Unit::PX)
            );
            dragged_window_->window->SetProperty(
                Rml::PropertyId::Top, 
                Rml::Property(new_pos.y, Rml::Unit::PX)
            );
        }
    }
    else if (event.GetId() == Rml::EventId::Mouseup)
    {
        if (dragged_window_)
        {
            dragged_window_->is_dragging = false;
            dragged_window_ = nullptr;
        }
    }
    else if (event.GetId() == Rml::EventId::Click)
    {
        Rml::Element* target = event.GetTargetElement();
        WindowData* data = GetWindowData(target);
        
        if (data)
        {
            if (target == data->close_button)
                CloseWindow(data->window);
            else if (target == data->minimize_button)
                MinimizeWindow(data->window);
            else if (target == data->maximize_button)
            {
                if (data->is_maximized)
                    RestoreWindow(data->window);
                else
                    MaximizeWindow(data->window);
            }
        }
    }
    else if (event.GetId() == Rml::EventId::Focus)
    {
        Rml::Element* target = event.GetTargetElement();
        WindowData* data = GetWindowData(target);
        if (data)
            ActivateWindow(data->window);
    }
}

void WindowManager::ActivateWindow(Rml::Element* window)
{
    WindowData* data = GetWindowData(window);
    if (!data) return;
    
    active_window_ = data;
    UpdateZOrder();
}

void WindowManager::UpdateZOrder()
{
    int z_index = 1000;
    for (auto& data : windows_)
    {
        data->window->SetProperty(
            Rml::PropertyId::ZIndex, 
            Rml::Property(z_index++)
        );
    }
}

void WindowManager::CloseWindow(Rml::Element* window)
{
    auto it = std::find_if(windows_.begin(), windows_.end(),
        [window](const std::unique_ptr<WindowData>& data) {
            return data->window == window;
        });
    
    if (it != windows_.end())
    {
        windows_.erase(it);
    }
}

void WindowManager::MinimizeWindow(Rml::Element* window)
{
    WindowData* data = GetWindowData(window);
    if (!data) return;
    
    data->is_minimized = true;
    window->SetProperty(Rml::PropertyId::Visibility, Rml::Property(Rml::Style::Visibility::Hidden));
}

void WindowManager::MaximizeWindow(Rml::Element* window)
{
    WindowData* data = GetWindowData(window);
    if (!data) return;
    
    if (data->is_maximized) return;
    
    // 保存当前状态
    data->restore_position = window->GetAbsoluteLeftTop();
    data->restore_size = window->GetBox().GetSize();
    
    // 最大化
    Rml::Vector2f context_size = context_->GetDimensions();
    window->SetProperty(Rml::PropertyId::Left, Rml::Property(0.0f, Rml::Unit::PX));
    window->SetProperty(Rml::PropertyId::Top, Rml::Property(0.0f, Rml::Unit::PX));
    window->SetProperty(Rml::PropertyId::Width, Rml::Property(context_size.x, Rml::Unit::PX));
    window->SetProperty(Rml::PropertyId::Height, Rml::Property(context_size.y, Rml::Unit::PX));
    
    data->is_maximized = true;
}

void WindowManager::RestoreWindow(Rml::Element* window)
{
    WindowData* data = GetWindowData(window);
    if (!data) return;
    
    if (data->is_maximized)
    {
        // 恢复大小和位置
        window->SetProperty(Rml::PropertyId::Left, Rml::Property(data->restore_position.x, Rml::Unit::PX));
        window->SetProperty(Rml::PropertyId::Top, Rml::Property(data->restore_position.y, Rml::Unit::PX));
        window->SetProperty(Rml::PropertyId::Width, Rml::Property(data->restore_size.x, Rml::Unit::PX));
        window->SetProperty(Rml::PropertyId::Height, Rml::Property(data->restore_size.y, Rml::Unit::PX));
        
        data->is_maximized = false;
    }
    
    if (data->is_minimized)
    {
        data->is_minimized = false;
        window->SetProperty(Rml::PropertyId::Visibility, Rml::Property(Rml::Style::Visibility::Visible));
        ActivateWindow(window);
    }
}

WindowData* WindowManager::GetWindowData(Rml::Element* element)
{
    for (auto& data : windows_)
    {
        if (data->window == element || 
            data->header == element || 
            data->close_button == element ||
            data->minimize_button == element ||
            data->maximize_button == element)
        {
            return data.get();
        }
    }
    return nullptr;
}
```

---

## 三、界面状态管理

### 3.1 状态机管理

```cpp
// UIStateManager.h
#pragma once
#include <RmlUi/Core/Types.h>
#include <functional>
#include <unordered_map>

enum class UIState
{
    None,
    MainMenu,
    Game,
    Pause,
    Settings,
    Loading,
    GameOver,
    Victory
};

class UIStateManager
{
public:
    using StateCallback = std::function<void(UIState, UIState)>;

    static UIStateManager& Instance()
    {
        static UIStateManager instance;
        return instance;
    }

    // 设置当前状态
    void SetState(UIState state);
    
    // 获取当前状态
    UIState GetCurrentState() const { return current_state_; }
    
    // 注册状态变化回调
    void OnStateChange(StateCallback callback);
    
    // 检查是否可以转换到指定状态
    bool CanTransitionTo(UIState state) const;

private:
    UIStateManager() = default;
    
    void ExecuteTransition(UIState from_state, UIState to_state);

private:
    UIState current_state_;
    std::vector<StateCallback> state_change_callbacks_;
    
    // 状态转换规则
    std::unordered_map<UIState, std::vector<UIState>> allowed_transitions_;
};

// UIStateManager.cpp
void UIStateManager::SetState(UIState state)
{
    if (state == current_state_)
        return;
    
    if (!CanTransitionTo(state))
    {
        Rml::Log::Message(Rml::Log::LT_WARNING, 
            "Cannot transition from state %d to %d", 
            (int)current_state_, (int)state);
        return;
    }
    
    UIState from_state = current_state_;
    current_state_ = state;
    
    // 执行转换
    ExecuteTransition(from_state, state);
    
    // 通知回调
    for (auto& callback : state_change_callbacks_)
    {
        callback(from_state, state);
    }
}

bool UIStateManager::CanTransitionTo(UIState state) const
{
    auto it = allowed_transitions_.find(current_state_);
    if (it == allowed_transitions_.end())
        return true;
    
    return std::find(it->second.begin(), it->second.end(), state) != it->second.end();
}

void UIStateManager::ExecuteTransition(UIState from_state, UIState to_state)
{
    // 这里可以执行状态转换时的特定逻辑
    switch (to_state)
    {
        case UIState::MainMenu:
            InterfaceManager::Instance().ShowInterface("main_menu");
            break;
            
        case UIState::Game:
            InterfaceManager::Instance().HideInterface("main_menu");
            InterfaceManager::Instance().ShowInterface("game_ui");
            break;
            
        case UIState::Pause:
            InterfaceManager::Instance().ShowInterface("pause_menu", true);
            break;
            
        case UIState::Settings:
            InterfaceManager::Instance().ShowInterface("settings");
            break;
            
        case UIState::GameOver:
            InterfaceManager::Instance().ShowInterface("game_over");
            break;
            
        default:
            break;
    }
}
```

---

## 四、界面转场动画

### 4.1 转场管理器

```cpp
// TransitionManager.h
#pragma once
#include <RmlUi/Core/Element.h>
#include <RmlUi/Core/EventListener.h>
#include <string>

class TransitionManager : public Rml::EventListener
{
public:
    static TransitionManager& Instance()
    {
        static TransitionManager instance;
        return instance;
    }

    // 播放转场动画
    void PlayTransition(
        Rml::Element* element,
        const std::string& transition,
        float duration = 0.3f,
        std::function<void()> callback = nullptr);
    
    // 预定义转场
    void FadeIn(Rml::Element* element, float duration = 0.3f, std::function<void()> callback = nullptr);
    void FadeOut(Rml::Element* element, float duration = 0.3f, std::function<void()> callback = nullptr);
    void SlideIn(Rml::Element* element, const std::string& direction = "left", float duration = 0.3f);
    void SlideOut(Rml::Element* element, const std::string& direction = "right", float duration = 0.3f);
    void ScaleIn(Rml::Element* element, float duration = 0.3f);
    void ScaleOut(Rml::Element* element, float duration = 0.3f);

private:
    TransitionManager() = default;
    
    void OnTransitionComplete(Rml::Event& event);
};

// TransitionManager.cpp
void TransitionManager::PlayTransition(
    Rml::Element* element,
    const std::string& transition,
    float duration,
    std::function<void()> callback)
{
    if (transition == "fade-in")
    {
        FadeIn(element, duration, callback);
    }
    else if (transition == "fade-out")
    {
        FadeOut(element, duration, callback);
    }
    else if (transition == "slide-in")
    {
        SlideIn(element, "left", duration);
    }
    else if (transition == "slide-out")
    {
        SlideOut(element, "right", duration);
    }
    else if (transition == "scale-in")
    {
        ScaleIn(element, duration);
    }
    else if (transition == "scale-out")
    {
        ScaleOut(element, duration);
    }
}

void TransitionManager::FadeIn(Rml::Element* element, float duration, std::function<void()> callback)
{
    element->SetProperty(Rml::PropertyId::Opacity, Rml::Property(0.0f));
    
    // 使用 CSS 动画
    element->Animate(
        "opacity", 
        "1.0f", 
        duration, 
        Rml::Tween::CubicEaseOut,
        [callback](Rml::Element* el, const Rml::String& property, const Rml::Variant& value) {
            if (callback) callback();
        }
    );
}

void TransitionManager::FadeOut(Rml::Element* element, float duration, std::function<void()> callback)
{
    element->Animate(
        "opacity", 
        "0.0f", 
        duration, 
        Rml::Tween::CubicEaseIn,
        [callback](Rml::Element* el, const Rml::String& property, const Rml::Variant& value) {
            if (callback) callback();
        }
    );
}

void TransitionManager::SlideIn(Rml::Element* element, const std::string& direction, float duration)
{
    float offset = element->GetClientWidth();
    
    if (direction == "left")
    {
        element->SetProperty(Rml::PropertyId::Transform, 
            Rml::Property(Rml::Transform::TranslateX(-offset)));
    }
    else if (direction == "right")
    {
        element->SetProperty(Rml::PropertyId::Transform, 
            Rml::Property(Rml::Transform::TranslateX(offset)));
    }
    
    element->Animate(
        "transform", 
        "translateX(0)", 
        duration, 
        Rml::Tween::CubicEaseOut
    );
}

void TransitionManager::SlideOut(Rml::Element* element, const std::string& direction, float duration)
{
    float offset = element->GetClientWidth();
    
    if (direction == "left")
    {
        element->Animate(
            "transform", 
            "translateX(-" + std::to_string(offset) + ")", 
            duration, 
            Rml::Tween::CubicEaseIn
        );
    }
    else if (direction == "right")
    {
        element->Animate(
            "transform", 
            "translateX(" + std::to_string(offset) + ")", 
            duration, 
            Rml::Tween::CubicEaseIn
        );
    }
}
```

---

## 五、实战练习

### 练习 1：实现多标签页界面管理

创建一个支持多个标签页的界面管理系统：
- 标签页切换
- 标签页关闭
- 标签页拖拽重排

### 练习 2：实现界面堆栈管理

创建一个界面堆栈管理器：
- 界面推入/弹出
- 返回按钮功能
- 界面历史记录

### 练习 3：实现界面动画库

创建一个完整的界面动画库：
- 多种预定义动画
- 自定义动画参数
- 动画队列管理

---

## 六、下一步

继续学习 [本地化](03-localization.md) 来实现多语言支持。

---

## 📝 检查清单

- [ ] 理解界面管理系统
- [ ] 掌握窗口管理
- [ ] 理解状态管理
- [ ] 能够实现界面转场动画
- [ ] 能够管理多个界面
- [ ] 理解模态和独占模式
- [ ] 能够实现复杂的界面交互