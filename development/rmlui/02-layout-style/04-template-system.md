# 2.4 模板系统

RmlUi 的模板系统允許你创建可复用的界面组件，提高开发效率並保持一致性。

---

## 一、模板基础

### 模板定义

```xml
<!-- template.rml -->
<rml>
<head>
    <template name="window-frame">
        <div class="window">
            <div class="window-header">
                <h2 class="window-title">{{title}}</h2>
                <button class="window-close" onclick="close_window()">×</button>
            </div>
            <div class="window-content">
                <!-- 内容將被插入到這裡 -->
            </div>
            <div class="window-footer">
                <button class="btn-primary">确定</button>
                <button class="btn-secondary">取消</button>
            </div>
        </div>
    </template>
</head>
<body>
    <!-- 使用模板 -->
</body>
</rml>
```

### 引用模板

```xml
<rml>
<head>
    <link type="text/template" href="templates/window-frame.rml"/>
    <link type="text/rcss" href="style.rcss"/>
</head>
<body>
    <!-- 模板内容會被注入到這裡 -->
    <div class="window">
        <div class="window-header">
            <h2 class="window-title">我的窗口</h2>
            <button class="window-close">×</button>
        </div>
        <div class="window-content">
            <p>这是窗口内容</p>
        </div>
        <div class="window-footer">
            <button class="btn-primary">确定</button>
            <button class="btn-secondary">取消</button>
        </div>
    </div>
</body>
</rml>
```

---

## 二、使用 C++ 加载模板

```cpp
// 加载模板文件
Rml::ElementDocument* template_doc = context->LoadDocument("templates/window-frame.rml");

// 获取模板元素
Rml::Element* template_element = template_doc->GetElementById("window-template");

// 实例化模板
Rml::Element* instance = template_element->Clone();
document->AppendChild(instance);
```

---

## 三、實戰示例：对话框模板

### 模板定义

```xml
<!-- templates/dialog.rml -->
<rml>
<head>
    <template name="dialog">
        <div class="dialog-overlay" id="dialog-overlay">
            <div class="dialog">
                <div class="dialog-header">
                    <h3 class="dialog-title" id="dialog-title">标题</h3>
                    <button class="dialog-close" onclick="close_dialog()">×</button>
                </div>
                <div class="dialog-body" id="dialog-body">
                    <!-- 内容 -->
                </div>
                <div class="dialog-footer" id="dialog-footer">
                    <!-- 按钮 -->
                </div>
            </div>
        </div>
    </template>
</head>
</rml>
```

### 使用模板

```cpp
#include <RmlUi/Core.h>

class DialogManager
{
public:
    DialogManager(Rml::Context* context) : context(context) {}

    // 显示简单对话框
    void ShowDialog(const Rml::String& title, const Rml::String& message)
    {
        // 加载模板
        Rml::ElementDocument* template_doc = context->LoadDocument("templates/dialog.rml");

        // 克隆模板
        Rml::Element* dialog = template_doc->GetElementById("dialog-overlay")->Clone();

        // 设置内容
        Rml::Element* title_el = dialog->GetElementById("dialog-title");
        if (title_el) {
            title_el->SetInnerRML(title);
        }

        Rml::Element* body_el = dialog->GetElementById("dialog-body");
        if (body_el) {
            body_el->SetInnerRML(message);
        }

        // 添加到文档
        context->GetDocument(0)->AppendChild(dialog);
    }

    // 显示確認对话框
    void ShowConfirmDialog(const Rml::String& title,
                           const Rml::String& message,
                           std::function<void(bool)> callback)
    {
        Rml::ElementDocument* template_doc = context->LoadDocument("templates/dialog.rml");
        Rml::Element* dialog = template_doc->GetElementById("dialog-overlay")->Clone();

        // 设置标题和内容
        dialog->GetElementById("dialog-title")->SetInnerRML(title);
        dialog->GetElementById("dialog-body")->SetInnerRML(message);

        // 添加按钮
        Rml::Element* footer = dialog->GetElementById("dialog-footer");

        Rml::Element* btn_ok = context->CreateElement("button");
        btn_ok->SetInnerRML("确定");
        btn_ok->AddClass("btn-primary");
        btn_ok->AddEventListener(Rml::EventId::Click, [this, dialog, callback]() {
            callback(true);
            CloseDialog(dialog);
        });
        footer->AppendChild(btn_ok);

        Rml::Element* btn_cancel = context->CreateElement("button");
        btn_cancel->SetInnerRML("取消");
        btn_cancel->AddClass("btn-secondary");
        btn_cancel->AddEventListener(Rml::EventId::Click, [this, dialog, callback]() {
            callback(false);
            CloseDialog(dialog);
        });
        footer->AppendChild(btn_cancel);

        context->GetDocument(0)->AppendChild(dialog);
    }

private:
    void CloseDialog(Rml::Element* dialog)
    {
        dialog->GetParentNode()->RemoveChild(dialog);
    }

    Rml::Context* context;
};
```

---

## 四、样式定义

```css
/* dialog.rcss */

.dialog-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.6);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}

.dialog {
    background: #fff;
    border-radius: 8px;
    min-width: 400px;
    max-width: 600px;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
    animation: dialog-slide-in 0.3s ease;
}

@keyframes dialog-slide-in {
    from {
        opacity: 0;
        transform: translateY(-20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.dialog-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 20px;
    border-bottom: 1px solid #eee;
}

.dialog-title {
    margin: 0;
    font-size: 18px;
    color: #333;
}

.dialog-close {
    background: none;
    border: none;
    font-size: 24px;
    cursor: pointer;
    color: #999;
    padding: 0;
    width: 30px;
    height: 30px;
}

.dialog-close:hover {
    color: #333;
}

.dialog-body {
    padding: 20px;
    max-height: 300px;
    overflow-y: auto;
}

.dialog-footer {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    padding: 15px 20px;
    border-top: 1px solid #eee;
}

.dialog-footer button {
    padding: 8px 16px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
}

.btn-primary {
    background: #3498db;
    color: white;
}

.btn-primary:hover {
    background: #2980b9;
}

.btn-secondary {
    background: #e0e0e0;
    color: #333;
}

.btn-secondary:hover {
    background: #d0d0d0;
}
```

---

## 五、高级模板技巧

### 1. 使用数据绑定

```xml
<!-- templates/character-card.rml -->
<rml>
<head>
    <template name="character-card">
        <div class="character-card" data-model="character">
            <div class="avatar">
                <img src="{{ avatar }}"/>
            </div>
            <div class="info">
                <h3 class="name">{{ name }}</h3>
                <p class="level">等级 {{ level }}</p>
                <div class="stats">
                    <span>HP: {{ hp }}/{{ max_hp }}</span>
                    <span>MP: {{ mp }}/{{ max_mp }}</span>
                </div>
            </div>
        </div>
    </template>
</head>
</rml>
```

### 2. 條件内容

```xml
<template name="item-slot">
    <div class="item-slot">
        <img src="{{ item.icon }}" if="item.icon"/>
        <span class="count" if="item.count > 1">{{ item.count }}</span>
        <div class="overlay" if="item.locked">
            <span class="lock-icon">🔒</span>
        </div>
    </div>
</template>
```

---

## 六、實踐练习

### 练习 1：创建通知弹窗模板

创建一个可复用的通知弹窗：
- 支持不同类型（成功、警告、错误）
- 自动消失功能
- 可配置位置

### 练习 2：创建菜单模板

创建一个横向菜单模板：
- 可配置菜单项
- 支持图标
- 支持子菜单

### 练习 3：创建表单模板

创建一个通用表单模板：
- 可配置表单字段
- 支持验证
- 支持提交回調

---

## 📝 檢查清单

- [ ] 理解模板的基本概念
- [ ] 能够创建和使用模板
- [ ] 掌握模板与數據绑定的結合
- [ ] 能够创建可复用的对话框组件
