# 3.1 事件系统

事件系统是 RmlUi 交互功能的核心。本节将详细介绍如何处理用户输入、事件传播机制以及如何创建自定义事件。

---

## 一、事件基础

### 1.1 事件类型

RmlUi 提供了丰富的内置事件类型：

| 事件类别 | 事件 | 描述 |
|----------|------|------|
| 鼠标事件 | `click` | 点击元素 |
| | `dblclick` | 双击元素 |
| | `mousedown` | 鼠标按下 |
| | `mouseup` | 鼠标释放 |
| | `mouseover` | 鼠标移入 |
| | `mouseout` | 鼠标移出 |
| | `mousemove` | 鼠标移动 |
| | `wheel` | 滚轮滚动 |
| 键盘事件 | `keydown` | 键按下 |
| | `keyup` | 键释放 |
| 焦点事件 | `focus` | 获得焦点 |
| | `blur` | 失去焦点 |
| 表单事件 | `change` | 值改变 |
| | `input` | 输入中 |
| | `submit` | 表单提交 |
| 自定义事件 | `load` | 文档加载完成 |
| | `unload` | 文档卸载 |

### 1.2 在 RML 中绑定事件

```xml
<!-- 使用 onclick 属性 -->
<button onclick="handle_click()">点击我</button>

<!-- 使用 onevent 指定具体事件 -->
<div onmousemove="handle_mouse_move(event)">
    移动鼠标看看
</div>

<!-- 绑定多个事件 -->
<input type="text"
       onfocus="handle_focus()"
       onblur="handle_blur()"
       onchange="handle_change(event.value)"/>
```

### 1.3 在 C++ 中监听事件

```cpp
#include <RmlUi/Core.h>

class ButtonHandler
{
public:
    void Initialize(Rml::Element* button)
    {
        // 方式 1：使用 AddEventListener
        button->AddEventListener(Rml::EventId::Click, this);

        // 方式 2：使用 lambda
        button->AddEventListener(Rml::EventId::Click,
            [](Rml::Event* event) {
                Rml::String value = event->GetParameter<Rml::String>("value", "");
                printf("Button clicked: %s\n", value.c_str());
            });
    }

    // 实现 EventListener 接口
    void ProcessEvent(Rml::Event* event) override
    {
        switch (event->GetId())
        {
            case Rml::EventId::Click:
                OnClick(event);
                break;
            case Rml::EventId::Mouseover:
                OnMouseOver(event);
                break;
            case Rml::EventId::Mouseout:
                OnMouseOut(event);
                break;
        }
    }

private:
    void OnClick(Rml::Event* event)
    {
        Rml::Element* element = event->GetCurrentElement();
        printf("Clicked: %s\n", element->GetId().c_str());
    }

    void OnMouseOver(Rml::Event* event)
    {
        // 悬停效果
    }

    void OnMouseOut(Rml::Event* event)
    {
        // 移出效果
    }
};
```

---

## 二、事件参数和数据

### 2.1 获取事件参数

```cpp
button->AddEventListener(Rml::EventId::Click,
    [](Rml::Event* event) {
        // 获取鼠标位置
        Rml::Vector2f mouse_pos = event->GetParameter<Rml::Vector2f>("mouse_pos", Rml::Vector2f(0, 0));

        // 获取点击的元素
        Rml::Element* target = event->GetCurrentElement();

        // 获取自定义参数
        int index = event->GetParameter<int>("index", 0);
        Rml::String id = event->GetParameter<Rml::String>("id", "");

        printf("Clicked element %s at index %d, mouse: (%.1f, %.1f)\n",
               id.c_str(), index, mouse_pos.x, mouse_pos.y);
    });
```

### 2.2 传递自定义参数

```xml
<!-- 在 RML 中使用 event 参数 -->
<button onclick="handle_click(event)" data-index="1">按钮 1</button>
<button onclick="handle_click(event)" data-index="2">按钮 2</button>
```

```cpp
// C++ 中读取 data-* 属性
void HandleClick(Rml::Event* event)
{
    Rml::Element* element = event->GetCurrentElement();

    // 读取 data-index 属性
    int index = 0;
    if (element->GetAttribute("data-index"))
    {
        index = element->GetAttribute<int>("data-index");
    }

    // 或者读取所有属性
    for (const auto& attr : element->GetAttributes())
    {
        printf("Attribute: %s = %s\n",
               attr.first.c_str(),
               attr.second.Get<Rml::String>().c_str());
    }
}
```

---

## 三、事件传播

### 3.1 冒泡和捕获

RmlUi 的事件传播分为两个阶段：

1. **捕获阶段**：从根元素向下传播到目标元素
2. **冒泡阶段**：从目标元素向上传播到根元素

```cpp
// 监听捕获阶段的事件（第三个参数为 true）
parent_element->AddEventListener(Rml::EventId::Click, this, true);

// 监听冒泡阶段的事件（默认）
parent_element->AddEventListener(Rml::EventId::Click, this);
```

### 3.2 阻止事件传播

```cpp
class EventBlocker : public Rml::EventListener
{
public:
    void ProcessEvent(Rml::Event* event) override
    {
        // 阻止事件继续传播
        event->StopPropagation();

        // 阻止默认行为
        event->PreventDefault();
    }
};

// 使用示例
Rml::Element* closeButton = document->GetElementById("close-btn");
closeButton->AddEventListener(Rml::EventId::Click, new EventBlocker());
```

### 3.3 事件传播示例

```xml
<!-- 嵌套结构 -->
<div id="outer" onclick="outerClick()">
    <div id="middle" onclick="middleClick()">
        <button id="inner" onclick="innerClick()">
            点击我
        </button>
    </div>
</div>
```

```cpp
// 点击按钮时的执行顺序：
// 1. outerClick() - 捕获阶段（如果监听）
// 2. middleClick() - 捕获阶段
// 3. innerClick() - 目标处理
// 4. middleClick() - 冒泡阶段
// 5. outerClick() - 冒泡阶段

// 如果要在中间截断：
void MiddleClick(Rml::Event* event)
{
    printf("Middle clicked\n");
    event->StopPropagation();  // 不会执行 outerClick()
}
```

---

## 四、自定义事件

### 4.1 触发自定义事件

```cpp
// 方式 1：在元素上触发事件
Rml::Element* element = document->GetElementById("my-element");

// 创建自定义事件类型
static const Rml::StringId CUSTOM_EVENT = Rml::StringId("custom_event");

// 触发事件
Rml::ElementDocument* doc = element->GetOwnerDocument();
doc->DispatchEvent(CUSTOM_EVENT, Rml::ParameterMap{});

// 带参数触发
Rml::ParameterMap params;
params["message"] = Rml::String("Hello from custom event!");
params["value"] = 42;
doc->DispatchEvent(CUSTOM_EVENT, params);
```

### 4.2 监听自定义事件

```cpp
class CustomEventHandler : public Rml::EventListener
{
public:
    void Initialize(Rml::Element* element)
    {
        element->AddEventListener(Rml::StringId("custom_event"), this);
    }

    void ProcessEvent(Rml::Event* event) override
    {
        Rml::String message = event->GetParameter<Rml::String>("message", "");
        int value = event->GetParameter<int>("value", 0);

        printf("Custom event: %s, value: %d\n", message.c_str(), value);
    }
};
```

### 4.3 在 RML 中触发事件

```xml
<rml>
<head>
    <link type="text/rcss" href="style.rcss"/>
</head>
<body>
    <div id="game-ui">
        <!-- 使用 data- 属性触发事件 -->
        <button onmousemove="dispatch_event('item_hover', {item_id: 'sword'})">
            武器：剑
        </button>

        <!-- 使用脚本触发 -->
        <button onclick="
            dispatch_event('player_action', {action: 'attack'});
        ">
            攻击
        </button>
    </div>
</body>
</rml>
```

---

## 五、键盘事件处理

### 5.1 基础键盘处理

```cpp
class KeyboardHandler : public Rml::EventListener
{
public:
    void Initialize(Rml::Context* context)
    {
        // 监听整个上下文的键盘事件
        Rml::ElementDocument* doc = context->GetDocument(0);
        doc->AddEventListener(Rml::EventId::Keydown, this);
    }

    void ProcessEvent(Rml::Event* event) override
    {
        Rml::Input::KeyIdentifier key = event->GetParameter<Rml::Input::KeyIdentifier>("key_code", Rml::Input::KeyIdentifier::KI_UNDEFINED);

        switch (key)
        {
            case Rml::Input::KeyIdentifier::KI_ESCAPE:
                OnEscape();
                break;
            case Rml::Input::KeyIdentifier::KI_ENTER:
                OnEnter();
                break;
            case Rml::Input::KeyIdentifier::KI_F1:
                ToggleHelp();
                break;
        }
    }

private:
    void OnEscape() { /* 关闭当前窗口 */ }
    void OnEnter() { /* 确认操作 */ }
    void ToggleHelp() { /* 切换帮助显示 */ }
};
```

### 5.2 快捷键系统

```cpp
class ShortcutManager
{
public:
    struct Shortcut
    {
        Rml::Input::KeyIdentifier key;
        bool ctrl;
        bool shift;
        bool alt;
        std::function<void()> callback;
    };

    void RegisterShortcut(Rml::Input::KeyIdentifier key,
                          std::function<void()> callback,
                          bool ctrl = false,
                          bool shift = false,
                          bool alt = false)
    {
        shortcuts_.push_back({key, ctrl, shift, alt, callback});
    }

    void Initialize(Rml::Context* context)
    {
        Rml::ElementDocument* doc = context->GetDocument(0);
        doc->AddEventListener(Rml::EventId::Keydown, this);

        // 注册常用快捷键
        RegisterShortcut(Rml::Input::KeyIdentifier::KI_S,
                        [this]() { Save(); }, true);  // Ctrl+S

        RegisterShortcut(Rml::Input::KeyIdentifier::KI_O,
                        [this]() { Open(); }, true);  // Ctrl+O

        RegisterShortcut(Rml::Input::KeyIdentifier::KI_F1,
                        [this]() { ToggleHelp(); });  // F1
    }

    void ProcessEvent(Rml::Event* event) override
    {
        if (event->GetId() != Rml::EventId::Keydown)
            return;

        Rml::Input::KeyIdentifier key = event->GetParameter<Rml::Input::KeyIdentifier>("key_code");
        bool ctrl = event->GetParameter<bool>("ctrl_key", false);
        bool shift = event->GetParameter<bool>("shift_key", false);
        bool alt = event->GetParameter<bool>("alt_key", false);

        for (const auto& shortcut : shortcuts_)
        {
            if (shortcut.key == key &&
                shortcut.ctrl == ctrl &&
                shortcut.shift == shift &&
                shortcut.alt == alt)
            {
                shortcut.callback();
                event->StopPropagation();
                break;
            }
        }
    }

private:
    std::vector<Shortcut> shortcuts_;

    void Save() { printf("Save triggered\n"); }
    void Open() { printf("Open triggered\n"); }
    void ToggleHelp() { printf("Help toggled\n"); }
};
```

---

## 六、鼠标拖拽事件

### 6.1 实现拖拽功能

```cpp
class DraggableWindow
{
public:
    DraggableWindow(Rml::Element* window, Rml::Element* header)
        : window_(window), header_(header), is_dragging_(false)
    {
        header_->AddEventListener(Rml::EventId::Mousedown, this);

        // 需要在全局监听 mousemove 和 mouseup
        Rml::ElementDocument* doc = window_->GetOwnerDocument();
        doc->AddEventListener(Rml::EventId::Mousemove, this);
        doc->AddEventListener(Rml::EventId::Mouseup, this);
    }

    void ProcessEvent(Rml::Event* event) override
    {
        switch (event->GetId())
        {
            case Rml::EventId::Mousedown:
                if (event->GetCurrentElement() == header_)
                {
                    StartDrag(event);
                }
                break;
            case Rml::EventId::Mousemove:
                if (is_dragging_)
                {
                    OnDrag(event);
                }
                break;
            case Rml::EventId::Mouseup:
                if (is_dragging_)
                {
                    EndDrag();
                }
                break;
        }
    }

private:
    Rml::Element* window_;
    Rml::Element* header_;
    bool is_dragging_;
    Rml::Vector2f drag_offset_;
    Rml::Vector2f last_mouse_pos_;

    void StartDrag(Rml::Event* event)
    {
        is_dragging_ = true;
        last_mouse_pos_ = event->GetParameter<Rml::Vector2f>("mouse_pos", Rml::Vector2f(0, 0));
        drag_offset_ = last_mouse_pos_ - window_->GetAbsoluteLeftTop();
        window_->SetProperty(Rml::PropertyId::Cursor, Rml::Property(Rml::Style::Cursor::Move));
    }

    void OnDrag(Rml::Event* event)
    {
        Rml::Vector2f mouse_pos = event->GetParameter<Rml::Vector2f>("mouse_pos", Rml::Vector2f(0, 0));

        Rml::Vector2f new_pos = mouse_pos - drag_offset_;

        // 限制在屏幕范围内
        Rml::ElementDocument* doc = window_->GetOwnerDocument();
        float max_x = doc->GetClientWidth() - window_->GetClientWidth();
        float max_y = doc->GetClientHeight() - window_->GetClientHeight();

        new_pos.x = Rml::Math::Clamp(new_pos.x, 0.0f, max_x);
        new_pos.y = Rml::Math::Clamp(new_pos.y, 0.0f, max_y);

        window_->SetProperty(Rml::PropertyId::Left, Rml::Property(new_pos.x));
        window_->SetProperty(Rml::PropertyId::Top, Rml::Property(new_pos.y));
    }

    void EndDrag()
    {
        is_dragging_ = false;
        window_->SetProperty(Rml::PropertyId::Cursor, Rml::Property(Rml::Style::Cursor::Auto));
    }
};
```

---

## 七、实战：完整的 UI 事件管理器

```cpp
// UIManager.h
#pragma once
#include <RmlUi/Core.h>
#include <unordered_map>
#include <functional>

class UIManager : public Rml::EventListener
{
public:
    static UIManager& Instance()
    {
        static UIManager instance;
        return instance;
    }

    // 初始化
    void Initialize(Rml::Context* context)
    {
        context_ = context;

        // 加载主文档
        document_ = context->LoadDocument("ui/main_container.rml");

        // 注册全局事件监听
        RegisterGlobalEvents();

        // 绑定 UI 事件
        BindUIEvents();
    }

    // 事件回调类型
    using EventCallback = std::function<void(Rml::Event*)>;

    // 注册事件处理器
    void RegisterHandler(const Rml::String& name, EventCallback callback)
    {
        handlers_[name] = std::move(callback);
    }

    // 在 RML 中调用的处理函数
    void HandleEvent(Rml::Event* event, const Rml::String& handler_name)
    {
        auto it = handlers_.find(handler_name);
        if (it != handlers_.end())
        {
            it->second(event);
        }
    }

    // 实现 EventListener
    void ProcessEvent(Rml::Event* event) override
    {
        // 全局事件处理
        switch (event->GetId())
        {
            case Rml::EventId::Keydown:
                HandleGlobalKeydown(event);
                break;
        }
    }

private:
    UIManager() = default;

    Rml::Context* context_ = nullptr;
    Rml::ElementDocument* document_ = nullptr;
    std::unordered_map<Rml::String, EventCallback> handlers_;

    void RegisterGlobalEvents()
    {
        if (document_)
        {
            document_->AddEventListener(Rml::EventId::Keydown, this);
        }
    }

    void BindUIEvents()
    {
        // 绑定按钮点击事件
        BindButton("btn-start", [this](Rml::Event* e) {
            printf("Game Start\n");
        });

        BindButton("btn-settings", [this](Rml::Event* e) {
            OpenSettings();
        });

        BindButton("btn-quit", [this](Rml::Event* e) {
            QuitGame();
        });

        // 注册自定义处理器
        RegisterHandler("handle_click", [this](Rml::Event* e) {
            Rml::Element* el = e->GetCurrentElement();
            printf("Element clicked: %s\n", el->GetId().c_str());
        });
    }

    void BindButton(const char* id, EventCallback callback)
    {
        Rml::Element* button = document_->GetElementById(id);
        if (button)
        {
            button->AddEventListener(Rml::EventId::Click,
                [this, callback](Rml::Event* e) {
                    callback(e);
                });
        }
    }

    void HandleGlobalKeydown(Rml::Event* event)
    {
        Rml::Input::KeyIdentifier key =
            event->GetParameter<Rml::Input::KeyIdentifier>("key_code");

        // 全局快捷键
        if (key == Rml::Input::KeyIdentifier::KI_ESCAPE)
        {
            // 如果当前有打开的窗口，关闭它
            CloseTopWindow();
        }
    }

    void OpenSettings() { /* 打开设置 */ }
    void QuitGame() { /* 退出游戏 */ }
    void CloseTopWindow() { /* 关闭顶层窗口 */ }
};
```

---

## 八、实践练习

### 练习 1：实现快捷键系统

为游戏 UI 创建快捷键：
- Ctrl+S 保存
- Ctrl+L 加载
- F1 显示帮助
- ESC 关闭当前窗口

### 练习 2：创建可拖拽窗口

实现一个窗口拖拽系统：
- 支持拖拽标题栏移动窗口
- 支持拖拽右下角调整大小
- 窗口不能拖出屏幕范围

### 练习 3：实现右键菜单

创建一个上下文菜单：
- 右键点击显示菜单
- 点击其他位置关闭菜单
- 支持菜单项选择

---

## 📝 检查清单

- [ ] 理解事件传播机制（冒泡和捕获）
- [ ] 能够在 C++ 中监听和处理事件
- [ ] 掌握键盘事件的处理方法
- [ ] 能够触发自定义事件
- [ ] 理解如何阻止事件传播
- [ ] 能够实现拖拽功能

---

下一节：[数据绑定基础](02-data-binding-basics.md) - 学习如何使用数据模型和绑定语法创建动态 UI。
