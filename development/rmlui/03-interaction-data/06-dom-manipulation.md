# 3.6 DOM 操作

虽然数据绑定可以处理大部分 UI 更新，但有时你需要直接操作 DOM 元素来创建动态内容、实现复杂交互或优化性能。本节将详细介绍 RmlUi 的 DOM 操作 API。

---

## 一、元素查找和访问

### 1.1 获取元素的方式

```cpp
#include <RmlUi/Core.h>

// 假设我们已经有一个文档
Rml::ElementDocument* document = context->LoadDocument("ui.rml");

// 方式 1：通过 ID 获取单个元素
Rml::Element* button = document->GetElementById("submit-btn");

// 方式 2：通过选择器获取单个元素
Rml::Element* firstItem = document->QuerySelector(".item");
Rml::Element* activeItem = document->QuerySelector(".item.active");

// 方式 3：通过选择器获取多个元素
Rml::ElementList items;
document->QuerySelectorAll(items, ".item");

// 方式 4：遍历子元素
Rml::Element* container = document->GetElementById("container");
for (int i = 0; i < container->GetNumChildren(); ++i)
{
    Rml::Element* child = container->GetChild(i);
    // 处理子元素
}

// 方式 5：获取特定类型的子元素
for (auto* child : container->GetChildren())
{
    if (child->GetTagName() == "button")
    {
        // 处理按钮元素
    }
}
```

### 1.2 元素导航

```cpp
// 获取父元素
Rml::Element* parent = element->GetParentNode();

// 获取文档
Rml::ElementDocument* doc = element->GetOwnerDocument();

// 获取上下文
Rml::Context* context = doc->GetContext();

// 兄弟元素
Rml::Element* nextSibling = element->GetNextSibling();
Rml::Element* prevSibling = element->GetPreviousSibling();

// 第一个和最后一个子元素
Rml::Element* firstChild = element->GetFirstChild();
Rml::Element* lastChild = element->GetLastChild();
```

### 1.3 元素信息

```cpp
// 标签名
Rml::String tagName = element->GetTagName();  // "div", "button", etc.

// ID
Rml::String id = element->GetId();

// 类名
Rml::String className = element->GetClassNames();

// 检查是否包含某个类
bool hasClass = element->GetClassList().Contains("active");

// 属性
Rml::String value = element->GetAttribute<Rml::String>("data-value", "default");
bool hasAttribute = element->HasAttribute("data-value");

// 获取所有属性
const Rml::AttributeList& attributes = element->GetAttributes();
for (const auto& attr : attributes)
{
    printf("Attribute: %s = %s\n",
           attr.first.c_str(),
           attr.second.Get<Rml::String>().c_str());
}

// 尺寸和位置
Rml::Vector2f size = element->GetClientSize();
Rml::Vector2f pos = element->GetAbsoluteLeftTop();
Rml::Vector2f offset = element->GetRelativeOffset();
```

---

## 二、元素创建和删除

### 2.1 创建元素

```cpp
// 方式 1：使用文档创建元素
Rml::ElementDocument* doc = context->LoadDocument("template.rml");
Rml::Element* newElement = doc->CreateElement("div");

// 方式 2：使用上下文创建元素
Rml::Element* button = context->CreateElement("button");

// 设置属性
newElement->SetId("my-element");
newElement->SetClassNames("my-class another-class");
newElement->SetAttribute("data-id", "123");
newElement->SetAttribute("data-value", 42);

// 设置内容
newElement->SetInnerRML("Hello, World!");

// 设置样式
newElement->SetProperty(Rml::PropertyId::Color,
                         Rml::Property(Rml::Colourb(255, 0, 0)));
newElement->SetProperty(Rml::PropertyId::FontSize,
                         Rml::Property(Rml::Unit::PX, 16));
newElement->SetProperty(Rml::PropertyId::Padding,
                         Rml::Property(Rml::Unit::PX, 10));
```

### 2.2 添加和删除子元素

```cpp
Rml::Element* parent = document->GetElementById("container");

// 添加子元素
parent->AppendChild(newElement);

// 插入到指定位置
parent->InsertBefore(newElement, referenceElement);

// 替换子元素
parent->ReplaceChild(newElement, oldElement);

// 删除子元素
parent->RemoveChild(oldElement);

// 从父元素移除自己
element->GetParentNode()->RemoveChild(element);

// 删除所有子元素
parent->SetInnerRML("");
```

### 2.3 动态创建列表

```cpp
class DynamicList
{
public:
    DynamicList(Rml::Element* container) : container_(container) {}

    void AddItem(const Rml::String& text, const Rml::String& icon = "")
    {
        // 创建列表项
        Rml::Element* item = container_->GetOwnerDocument()->CreateElement("div");
        item->SetClassNames("list-item");

        // 添加图标
        if (!icon.empty())
        {
            Rml::Element* img = container_->GetOwnerDocument()->CreateElement("img");
            img->SetAttribute("src", icon);
            item->AppendChild(img);
        }

        // 添加文本
        Rml::Element* label = container_->GetOwnerDocument()->CreateElement("span");
        label->SetInnerRML(text);
        item->AppendChild(label);

        // 添加删除按钮
        Rml::Element* deleteBtn = container_->GetOwnerDocument()->CreateElement("button");
        deleteBtn->SetClassNames("delete-btn");
        deleteBtn->SetInnerRML("×");
        deleteBtn->AddEventListener(Rml::EventId::Click,
            [this, item](Rml::Event*) {
                container_->RemoveChild(item);
                UpdateIndices();
            });
        item->AppendChild(deleteBtn);

        // 存储索引
        item->SetAttribute("data-index", container_->GetNumChildren());

        // 添加到容器
        container_->AppendChild(item);

        // 更新所有索引
        UpdateIndices();
    }

    void Clear()
    {
        container_->SetInnerRML("");
    }

    void RemoveItem(int index)
    {
        if (index >= 0 && index < container_->GetNumChildren())
        {
            container_->RemoveChild(container_->GetChild(index));
            UpdateIndices();
        }
    }

private:
    Rml::Element* container_;

    void UpdateIndices()
    {
        for (int i = 0; i < container_->GetNumChildren(); ++i)
        {
            container_->GetChild(i)->SetAttribute("data-index", i);
        }
    }
};

// 使用示例
Rml::Element* listContainer = document->GetElementById("list-container");
DynamicList list(listContainer);
list.AddItem("项目 1", "icons/item1.png");
list.AddItem("项目 2", "icons/item2.png");
list.AddItem("项目 3", "icons/item3.png");
```

---

## 三、属性和样式操作

### 3.1 类名操作

```cpp
// 添加类
element->AddClass("active");

// 移除类
element->RemoveClass("active");

// 切换类
element->ToggleClass("active");

// 检查是否包含类
bool isActive = element->GetClassList().Contains("active");

// 设置所有类
element->SetClassNames("class1 class2 class3");

// 获取所有类
Rml::String classNames = element->GetClassNames();

// 使用 ClassList 进行更复杂的操作
Rml::ClassList& classList = element->GetClassList();
classList.AddClass("highlighted");
classList.RemoveClass("dimmed");
```

### 3.2 样式操作

```cpp
// 设置单个属性
element->SetProperty(Rml::PropertyId::Width,
                      Rml::Property(Rml::Unit::PX, 200));
element->SetProperty(Rml::PropertyId::Height,
                      Rml::Property(Rml::Unit::PX, 100));

// 设置颜色
element->SetProperty(Rml::PropertyId::Color,
                      Rml::Property(Rml::Colourb(255, 255, 255)));
element->SetProperty(Rml::PropertyId::BackgroundColor,
                      Rml::Property(Rml::Colourb(0, 0, 0, 128)));

// 设置边距
element->SetProperty(Rml::PropertyId::MarginLeft,
                      Rml::Property(Rml::Unit::PX, 10));
element->SetProperty(Rml::PropertyId::MarginRight,
                      Rml::Property(Rml::Unit::PX, 10));

// 设置变换
Rml::Transform transform;
transform.TranslateBy(Rml::Vector2f(100, 50));
transform.Rotate(45.0f);  // 旋转 45 度
element->SetProperty(Rml::PropertyId::Transform,
                      Rml::Property(transform));

// 移除属性
element->RemoveProperty(Rml::PropertyId::BackgroundColor);

// 获取计算后的属性
Rml::Property widthProp = element->GetProperty(Rml::PropertyId::Width);
float width = widthProp.Get<Rml::Unit::PX>();

// 获取计算值（解析后的值）
Rml::Property computedProp = element->GetComputedValues()[Rml::PropertyId::Width];
```

### 3.3 数据属性操作

```cpp
// 设置数据属性
element->SetAttribute("data-id", "12345");
element->SetAttribute("data-index", 42);
element->SetAttribute("data-enabled", true);

// 获取数据属性
Rml::String id = element->GetAttribute<Rml::String>("data-id", "");
int index = element->GetAttribute<int>("data-index", 0);
bool enabled = element->GetAttribute<bool>("data-enabled", false);

// 检查属性是否存在
bool hasDataId = element->HasAttribute("data-id");

// 删除属性
element->RemoveAttribute("data-id");
```

---

## 四、事件处理

### 4.1 添加事件监听器

```cpp
// 使用 lambda
button->AddEventListener(Rml::EventId::Click,
    [](Rml::Event* event) {
        printf("Button clicked!\n");
        Rml::Element* target = event->GetCurrentElement();
        target->AddClass("clicked");
    });

// 使用 EventListener 类
class MyListener : public Rml::EventListener
{
public:
    void ProcessEvent(Rml::Event* event) override
    {
        printf("Event received: %d\n", (int)event->GetId());
    }
};

button->AddEventListener(Rml::EventId::Mouseover, new MyListener());

// 带参数的监听
element->AddEventListener(Rml::EventId::Click,
    [](Rml::Event* event) {
        Rml::Vector2f mousePos = event->GetParameter<Rml::Vector2f>("mouse_pos", Rml::Vector2f(0, 0));
        printf("Clicked at: %.1f, %.1f\n", mousePos.x, mousePos.y);
    });
```

### 4.2 移除事件监听器

```cpp
// 移除特定事件的监听器
element->RemoveEventListener(Rml::EventId::Click, listener);

// 移除所有监听器（元素销毁时自动进行）
```

### 4.3 触发自定义事件

```cpp
// 在元素上触发自定义事件
Rml::StringId customEventId = Rml::StringId("my_custom_event");

Rml::ParameterMap params;
params["message"] = Rml::String("Hello!");
params["value"] = 42;

element->DispatchEvent(customEventId, params);

// 在文档上触发
Rml::ElementDocument* doc = element->GetOwnerDocument();
doc->DispatchEvent(customEventId, params);
```

---

## 五、实战：动态通知系统

### 5.1 通知管理器

```cpp
// NotificationManager.h
#pragma once
#include <RmlUi/Core.h>
#include <queue>
#include <memory>

enum class NotificationType
{
    Info,
    Success,
    Warning,
    Error
};

struct Notification
{
    Rml::String title;
    Rml::String message;
    NotificationType type;
    float duration;  // 秒，0 表示不自动消失
};

class NotificationManager
{
public:
    static NotificationManager& Instance()
    {
        static NotificationManager instance;
        return instance;
    }

    void Initialize(Rml::Context* context)
    {
        context_ = context;
        CreateContainer();
    }

    void Show(const Rml::String& title,
              const Rml::String& message,
              NotificationType type = NotificationType::Info,
              float duration = 3.0f)
    {
        Notification notif{title, message, type, duration};
        CreateNotificationElement(notif);
    }

    void ShowInfo(const Rml::String& title, const Rml::String& message)
    {
        Show(title, message, NotificationType::Info, 3.0f);
    }

    void ShowSuccess(const Rml::String& title, const Rml::String& message)
    {
        Show(title, message, NotificationType::Success, 3.0f);
    }

    void ShowWarning(const Rml::String& title, const Rml::String& message)
    {
        Show(title, message, NotificationType::Warning, 5.0f);
    }

    void ShowError(const Rml::String& title, const Rml::String& message)
    {
        Show(title, message, NotificationType::Error, 0.0f);  // 不自动消失
    }

    void Update()
    {
        // 检查并移除过期的通知
        auto now = std::chrono::steady_clock::now();

        for (auto it = activeNotifications_.begin();
             it != activeNotifications_.end();)
        {
            auto& [element, createTime, duration] = *it;
            auto elapsed = std::chrono::duration<float>(now - createTime).count();

            if (duration > 0 && elapsed >= duration)
            {
                Dismiss(element);
                it = activeNotifications_.erase(it);
            }
            else
            {
                ++it;
            }
        }
    }

private:
    Rml::Context* context_ = nullptr;
    Rml::Element* container_ = nullptr;

    struct ActiveNotification
    {
        Rml::Element* element;
        std::chrono::steady_clock::time_point createTime;
        float duration;
    };

    std::vector<ActiveNotification> activeNotifications_;

    void CreateContainer()
    {
        // 创建通知容器
        container_ = context_->CreateElement("div");
        container_->SetId("notification-container");
        container_->SetClassNames("notification-container");

        // 添加到文档
        Rml::ElementDocument* doc = context_->GetDocument(0);
        doc->AppendChild(container_);
    }

    void CreateNotificationElement(const Notification& notif)
    {
        Rml::Element* notifEl = context_->CreateElement("div");
        notifEl->SetClassNames(GetTypeClassName(notif.type));

        // 内容
        Rml::Element* contentEl = context_->CreateElement("div");
        contentEl->SetClassNames("notification-content");

        // 标题
        Rml::Element* titleEl = context_->CreateElement("div");
        titleEl->SetClassNames("notification-title");
        titleEl->SetInnerRML(notif.title);
        contentEl->AppendChild(titleEl);

        // 消息
        Rml::Element* msgEl = context_->CreateElement("div");
        msgEl->SetClassNames("notification-message");
        msgEl->SetInnerRML(notif.message);
        contentEl->AppendChild(msgEl);

        // 关闭按钮
        Rml::Element* closeBtn = context_->CreateElement("button");
        closeBtn->SetClassNames("notification-close");
        closeBtn->SetInnerRML("×");
        closeBtn->AddEventListener(Rml::EventId::Click,
            [this, notifEl](Rml::Event*) {
                Dismiss(notifEl);
            });

        notifEl->AppendChild(contentEl);
        notifEl->AppendChild(closeBtn);

        // 添加到容器
        container_->AppendChild(notifEl);

        // 记录活动通知
        activeNotifications_.push_back({
            notifEl,
            std::chrono::steady_clock::now(),
            notif.duration
        });

        // 添加进入动画
        notifEl->SetProperty(Rml::PropertyId::Opacity,
                              Rml::Property(Rml::Unit::NUMBER, 0.0f));
        notifEl->SetProperty(Rml::PropertyId::Transform,
                              Rml::Property("translateX(300px)"));

        // 使用定时器触发动画（简单实现）
        AnimateIn(notifEl);
    }

    void AnimateIn(Rml::Element* element)
    {
        // 简化版本：直接设置最终状态
        // 实际项目中可以使用过渡或逐帧动画
        element->SetProperty(Rml::PropertyId::Opacity,
                              Rml::Property(Rml::Unit::NUMBER, 1.0f));
        element->SetProperty(Rml::PropertyId::Transform,
                              Rml::Property("translateX(0)"));
    }

    void Dismiss(Rml::Element* element)
    {
        // 添加退出动画
        element->SetProperty(Rml::PropertyId::Opacity,
                              Rml::Property(Rml::Unit::NUMBER, 0.0f));
        element->SetProperty(Rml::PropertyId::Transform,
                              Rml::Property("translateX(300px)"));

        // 延迟删除
        // 简化版本：直接删除
        container_->RemoveChild(element);
    }

    const char* GetTypeClassName(NotificationType type)
    {
        switch (type)
        {
            case NotificationType::Info:    return "notification notification-info";
            case NotificationType::Success: return "notification notification-success";
            case NotificationType::Warning: return "notification notification-warning";
            case NotificationType::Error:   return "notification notification-error";
        }
        return "notification";
    }
};

// 样式定义
/*
.notification-container {
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 9999;
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.notification {
    min-width: 300px;
    max-width: 400px;
    padding: 15px 20px;
    background: white;
    border-radius: 8px;
    box-shadow: 0 4px 20px rgba(0,0,0,0.15);
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    animation: slideIn 0.3s ease;
}

@keyframes slideIn {
    from {
        opacity: 0;
        transform: translateX(300px);
    }
    to {
        opacity: 1;
        transform: translateX(0);
    }
}

.notification-content {
    flex: 1;
}

.notification-title {
    font-weight: bold;
    margin-bottom: 5px;
}

.notification-message {
    color: #666;
    font-size: 14px;
}

.notification-close {
    background: none;
    border: none;
    font-size: 20px;
    cursor: pointer;
    color: #999;
    padding: 0;
    margin-left: 10px;
}

.notification-close:hover {
    color: #333;
}

.notification-info { border-left: 4px solid #3498db; }
.notification-success { border-left: 4px solid #27ae60; }
.notification-warning { border-left: 4px solid #f39c12; }
.notification-error { border-left: 4px solid #e74c3c; }
*/
```

### 5.2 使用通知系统

```cpp
// 在游戏中使用
void OnPlayerLevelUp(int newLevel)
{
    NotificationManager::Instance().ShowSuccess(
        "升级了！",
        "恭喜你达到了 " + Rml::StringFromReal(newLevel) + " 级！"
    );
}

void OnPlayerDamaged(int damage)
{
    NotificationManager::Instance().ShowInfo(
        "受到伤害",
        "你受到了 " + Rml::StringFromReal(damage) + " 点伤害"
    );
}

void OnQuestCompleted(const Rml::String& questName)
{
    NotificationManager::Instance().ShowSuccess(
        "任务完成",
        "你已完成任务：" + questName
    );
}

void OnLowHealth()
{
    NotificationManager::Instance().ShowWarning(
        "警告",
        "生命值过低，请尽快治疗！"
    );
}

void OnGameOver()
{
    NotificationManager::Instance().ShowError(
        "游戏结束",
        "你已失败，点击重新开始"
    );
}

// 在游戏主循环中更新
void GameLoop()
{
    while (running)
    {
        // ...

        NotificationManager::Instance().Update();

        // ...
    }
}
```

---

## 六、实战：模态对话框系统

### 6.1 对话框管理器

```cpp
// DialogManager.h
#pragma once
#include <RmlUi/Core.h>
#include <functional>
#include <memory>

class DialogManager
{
public:
    static DialogManager& Instance()
    {
        static DialogManager instance;
        return instance;
    }

    void Initialize(Rml::Context* context)
    {
        context_ = context;
        CreateOverlay();
    }

    using DialogCallback = std::function<void(int buttonIndex)>;

    // 显示简单对话框
    void ShowDialog(const Rml::String& title,
                    const Rml::String& message,
                    DialogCallback callback = nullptr)
    {
        ShowDialog(title, message, {"确定"}, callback);
    }

    // 显示确认对话框
    void ShowConfirmDialog(const Rml::String& title,
                           const Rml::String& message,
                           DialogCallback callback = nullptr)
    {
        ShowDialog(title, message, {"确定", "取消"}, callback);
    }

    // 显示自定义按钮对话框
    void ShowDialog(const Rml::String& title,
                    const Rml::String& message,
                    const std::vector<Rml::String>& buttons,
                    DialogCallback callback = nullptr)
    {
        // 创建对话框元素
        Rml::Element* dialog = context_->CreateElement("div");
        dialog->SetClassNames("dialog");

        // 标题
        Rml::Element* titleEl = context_->CreateElement("div");
        titleEl->SetClassNames("dialog-title");
        titleEl->SetInnerRML(title);
        dialog->AppendChild(titleEl);

        // 内容
        Rml::Element* contentEl = context_->CreateElement("div");
        contentEl->SetClassNames("dialog-content");
        contentEl->SetInnerRML(message);
        dialog->AppendChild(contentEl);

        // 按钮
        Rml::Element* buttonContainer = context_->CreateElement("div");
        buttonContainer->SetClassNames("dialog-buttons");

        for (size_t i = 0; i < buttons.size(); ++i)
        {
            Rml::Element* btn = context_->CreateElement("button");
            btn->SetClassNames("dialog-btn");
            btn->SetInnerRML(buttons[i]);

            btn->AddEventListener(Rml::EventId::Click,
                [this, dialog, callback, i](Rml::Event*) {
                    CloseDialog(dialog);
                    if (callback) callback(static_cast<int>(i));
                });

            buttonContainer->AppendChild(btn);
        }

        dialog->AppendChild(buttonContainer);

        // 存储回调
        dialogCallbacks_[dialog] = callback;

        // 添加到遮罩层
        overlay_->AppendChild(dialog);
        overlay_->SetProperty(Rml::PropertyId::Visibility,
                               Rml::Property(Rml::Style::Visibility::Visible));
    }

    void CloseAllDialogs()
    {
        overlay_->SetInnerRML("");
        overlay_->SetProperty(Rml::PropertyId::Visibility,
                               Rml::Property(Rml::Style::Visibility::Hidden));
        dialogCallbacks_.clear();
    }

private:
    Rml::Context* context_ = nullptr;
    Rml::Element* overlay_ = nullptr;
    std::unordered_map<Rml::Element*, DialogCallback> dialogCallbacks_;

    void CreateOverlay()
    {
        overlay_ = context_->CreateElement("div");
        overlay_->SetClassNames("dialog-overlay");
        overlay_->SetProperty(Rml::PropertyId::Visibility,
                               Rml::Property(Rml::Style::Visibility::Hidden));

        // 点击遮罩关闭对话框
        overlay_->AddEventListener(Rml::EventId::Click,
            [this](Rml::Event* event) {
                if (event->GetCurrentElement() == overlay_)
                {
                    CloseAllDialogs();
                }
            });

        Rml::ElementDocument* doc = context_->GetDocument(0);
        doc->AppendChild(overlay_);
    }

    void CloseDialog(Rml::Element* dialog)
    {
        overlay_->RemoveChild(dialog);
        dialogCallbacks_.erase(dialog);

        if (overlay_->GetNumChildren() == 0)
        {
            overlay_->SetProperty(Rml::PropertyId::Visibility,
                                   Rml::Property(Rml::Style::Visibility::Hidden));
        }
    }
};

// 样式
/*
.dialog-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.6);
    z-index: 9998;
    display: flex;
    justify-content: center;
    align-items: center;
}

.dialog {
    background: white;
    border-radius: 12px;
    min-width: 400px;
    max-width: 500px;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
    animation: dialogPop 0.2s ease;
}

@keyframes dialogPop {
    from {
        opacity: 0;
        transform: scale(0.9);
    }
    to {
        opacity: 1;
        transform: scale(1);
    }
}

.dialog-title {
    padding: 20px;
    font-size: 18px;
    font-weight: bold;
    border-bottom: 1px solid #eee;
}

.dialog-content {
    padding: 20px;
    color: #333;
    max-height: 300px;
    overflow-y: auto;
}

.dialog-buttons {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    padding: 15px 20px;
    border-top: 1px solid #eee;
}

.dialog-btn {
    padding: 8px 20px;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: 14px;
}

.dialog-btn:first-child {
    background: #3498db;
    color: white;
}

.dialog-btn:not(:first-child) {
    background: #e0e0e0;
    color: #333;
}
*/
```

### 6.3 使用对话框

```cpp
// 确认退出
void RequestQuit()
{
    DialogManager::Instance().ShowConfirmDialog(
        "确认退出",
        "确定要退出游戏吗？未保存的进度将丢失。",
        [](int result) {
            if (result == 0)  // 点击了"确定"
            {
                // 退出游戏
            }
        });
}

// 游戏结束
void ShowGameOver()
{
    DialogManager::Instance().ShowDialog(
        "游戏结束",
        "你的得分：10000\n排名：第 1 名",
        {"再来一局", "返回主菜单"},
        [](int result) {
            if (result == 0)
                RestartGame();
            else
                ShowMainMenu();
        });
}

// 简单提示
void ShowSaveComplete()
{
    DialogManager::Instance().ShowDialog(
        "保存完成",
        "游戏已成功保存。"
    );
}
```

---

## 七、实践练习

### 练习 1：创建工具提示系统

实现一个动态工具提示：
- 鼠标悬停显示
- 支持富文本内容
- 自动调整位置避免超出屏幕

### 练习 2：制作可折叠面板

创建手风琴效果的面板：
- 点击标题展开/折叠
- 支持多个面板
- 添加平滑过渡动画

### 练习 3：实现拖拽排序列表

创建一个可拖拽排序的列表：
- 拖拽项目重新排序
- 显示拖拽预览
- 触发排序事件

---

## 📝 检查清单

- [ ] 掌握元素的查找和访问方法
- [ ] 能够动态创建和删除元素
- [ ] 熟练操作元素属性和样式
- [ ] 理解事件监听的使用方法
- [ ] 能够实现动态通知系统
- [ ] 能够创建模态对话框

---

恭喜完成阶段三！你已经掌握了事件系统和数据绑定的全部知识。

下一阶段：[阶段四：动画与视觉效果](../04-animation-effects/README.md) - 学习如何创建流畅的动画和视觉特效。
