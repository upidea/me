# 6.4 主题系统

主题系统允许用户自定义界面外观，提升用户体验。本节将深入讲解如何实现完整的主题切换和定制系统。

---

## 一、主题系统架构

### 1.1 主题管理器

```cpp
// ThemeManager.h
#pragma once
#include <RmlUi/Core/Types.h>
#include <string>
#include <unordered_map>

class ThemeManager
{
public:
    static ThemeManager& Instance()
    {
        static ThemeManager instance;
        return instance;
    }

    // 初始化
    bool Initialize(const std::string& default_theme = "default");
    
    // 加载主题
    bool LoadTheme(const std::string& name, const std::string& path);
    
    // 设置主题
    bool SetTheme(const std::string& name);
    
    // 获取当前主题
    std::string GetCurrentTheme() const { return current_theme_; }
    
    // 获取所有可用主题
    std::vector<std::string> GetAvailableThemes() const;
    
    // 获取主题变量
    std::string GetVariable(const std::string& key) const;
    
    // 设置主题变量
    void SetVariable(const std::string& key, const std::string& value);

private:
    ThemeManager() = default;
    
    bool ApplyTheme(const std::string& name);

private:
    std::string current_theme_;
    std::unordered_map<std::string, std::unordered_map<std::string, std::string>> themes_;
    std::unordered_map<std::string, std::string> current_variables_;
};

// ThemeManager.cpp
bool ThemeManager::Initialize(const std::string& default_theme)
{
    current_theme_ = default_theme;
    return true;
}

bool ThemeManager::LoadTheme(const std::string& name, const std::string& path)
{
    // 加载主题配置文件
    std::string content = ReadFile(path);
    if (content.empty())
    {
        Rml::Log::Message(Rml::Log::LT_ERROR, 
            "Failed to load theme file: %s", path.c_str());
        return false;
    }
    
    // 解析主题配置
    auto json = ParseJSON(content);
    if (!json.is_object())
        return false;
    
    std::unordered_map<std::string, std::string> theme_vars;
    
    // 解析颜色变量
    if (json.contains("colors"))
    {
        auto colors = json["colors"];
        for (const auto& pair : colors.items())
        {
            theme_vars["color-" + pair.key()] = pair.value().get<std::string>();
        }
    }
    
    // 解析字体变量
    if (json.contains("fonts"))
    {
        auto fonts = json["fonts"];
        for (const auto& pair : fonts.items())
        {
            theme_vars["font-" + pair.key()] = pair.value().get<std::string>();
        }
    }
    
    // 解析尺寸变量
    if (json.contains("sizes"))
    {
        auto sizes = json["sizes"];
        for (const auto& pair : sizes.items())
        {
            theme_vars["size-" + pair.key()] = pair.value().get<std::string>();
        }
    }
    
    themes_[name] = theme_vars;
    return true;
}

bool ThemeManager::SetTheme(const std::string& name)
{
    auto it = themes_.find(name);
    if (it == themes_.end())
    {
        Rml::Log::Message(Rml::Log::LT_WARNING, 
            "Theme not found: %s", name.c_str());
        return false;
    }
    
    current_theme_ = name;
    current_variables_ = it->second;
    
    return ApplyTheme(name);
}

bool ThemeManager::ApplyTheme(const std::string& name)
{
    // 获取主文档
    Rml::Context* context = Rml::GetContext(0);
    if (!context) return false;
    
    Rml::ElementDocument* document = context->GetDocument(0);
    if (!document) return false;
    
    // 应用主题变量到所有文档
    for (int i = 0; i < context->GetNumDocuments(); i++)
    {
        Rml::ElementDocument* doc = context->GetDocument(i);
        ApplyThemeToDocument(doc);
    }
    
    // 触发主题变化事件
    Rml::Dictionary params;
    params["theme"] = name;
    document->DispatchEvent(Rml::StringId("theme_changed"), params);
    
    return true;
}

void ThemeManager::ApplyThemeToDocument(Rml::ElementDocument* document)
{
    // 重新加载样式表
    document->ReloadStyleSheet();
}

std::string ThemeManager::GetVariable(const std::string& key) const
{
    auto it = current_variables_.find(key);
    return it != current_variables_.end() ? it->second : "";
}

void ThemeManager::SetVariable(const std::string& key, const std::string& value)
{
    current_variables_[key] = value;
}

std::vector<std::string> ThemeManager::GetAvailableThemes() const
{
    std::vector<std::string> themes;
    for (const auto& pair : themes_)
    {
        themes.push_back(pair.first);
    }
    return themes;
}
```

### 1.2 主题配置文件

```json
// themes/default.json
{
    "name": "Default",
    "colors": {
        "primary": "#3498db",
        "secondary": "#2ecc71",
        "accent": "#e74c3c",
        "background": "#ffffff",
        "surface": "#f8f9fa",
        "text": "#2c3e50",
        "text-light": "#7f8c8d",
        "border": "#dee2e6",
        "shadow": "rgba(0, 0, 0, 0.1)"
    },
    "fonts": {
        "primary": "Roboto, Arial, sans-serif",
        "heading": "Montserrat, Arial, sans-serif",
        "mono": "Courier New, monospace"
    },
    "sizes": {
        "small": "12px",
        "normal": "14px",
        "large": "18px",
        "xlarge": "24px"
    }
}

// themes/dark.json
{
    "name": "Dark",
    "colors": {
        "primary": "#3498db",
        "secondary": "#2ecc71",
        "accent": "#e74c3c",
        "background": "#1a1a2e",
        "surface": "#16213e",
        "text": "#ecf0f1",
        "text-light": "#bdc3c7",
        "border": "#4a5568",
        "shadow": "rgba(0, 0, 0, 0.3)"
    },
    "fonts": {
        "primary": "Roboto, Arial, sans-serif",
        "heading": "Montserrat, Arial, sans-serif",
        "mono": "Courier New, monospace"
    },
    "sizes": {
        "small": "12px",
        "normal": "14px",
        "large": "18px",
        "xlarge": "24px"
    }
}

// themes/gaming.json
{
    "name": "Gaming",
    "colors": {
        "primary": "#ff6b6b",
        "secondary": "#4ecdc4",
        "accent": "#ffd93d",
        "background": "#0d1117",
        "surface": "#161b22",
        "text": "#c9d1d9",
        "text-light": "#8b949e",
        "border": "#30363d",
        "shadow": "rgba(0, 0, 0, 0.5)"
    },
    "fonts": {
        "primary": "Orbitron, Arial, sans-serif",
        "heading": "Rajdhani, Arial, sans-serif",
        "mono": "Fira Code, monospace"
    },
    "sizes": {
        "small": "12px",
        "normal": "14px",
        "large": "18px",
        "xlarge": "24px"
    }
}
```

---

## 二、CSS 变量系统

### 2.1 定义主题变量

```css
/* themes/default.rcss */
:root {
    /* 颜色变量 */
    --color-primary: #3498db;
    --color-secondary: #2ecc71;
    --color-accent: #e74c3c;
    --color-background: #ffffff;
    --color-surface: #f8f9fa;
    --color-text: #2c3e50;
    --color-text-light: #7f8c8d;
    --color-border: #dee2e6;
    --color-shadow: rgba(0, 0, 0, 0.1);
    
    /* 字体变量 */
    --font-primary: 'Roboto', Arial, sans-serif;
    --font-heading: 'Montserrat', Arial, sans-serif;
    --font-mono: 'Courier New', monospace;
    
    /* 尺寸变量 */
    --size-small: 12px;
    --size-normal: 14px;
    --size-large: 18px;
    --size-xlarge: 24px;
    
    /* 间距变量 */
    --spacing-xs: 4px;
    --spacing-sm: 8px;
    --spacing-md: 16px;
    --spacing-lg: 24px;
    --spacing-xl: 32px;
    
    /* 圆角变量 */
    --radius-sm: 4px;
    --radius-md: 8px;
    --radius-lg: 12px;
    --radius-xl: 16px;
    
    /* 阴影变量 */
    --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.1);
    --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
    --shadow-lg: 0 10px 20px rgba(0, 0, 0, 0.15);
    --shadow-xl: 0 20px 40px rgba(0, 0, 0, 0.2);
}

/* themes/dark.rcss */
:root {
    --color-primary: #3498db;
    --color-secondary: #2ecc71;
    --color-accent: #e74c3c;
    --color-background: #1a1a2e;
    --color-surface: #16213e;
    --color-text: #ecf0f1;
    --color-text-light: #bdc3c7;
    --color-border: #4a5568;
    --color-shadow: rgba(0, 0, 0, 0.3);
    
    --font-primary: 'Roboto', Arial, sans-serif;
    --font-heading: 'Montserrat', Arial, sans-serif;
    --font-mono: 'Courier New', monospace;
    
    --size-small: 12px;
    --size-normal: 14px;
    --size-large: 18px;
    --size-xlarge: 24px;
    
    --spacing-xs: 4px;
    --spacing-sm: 8px;
    --spacing-md: 16px;
    --spacing-lg: 24px;
    --spacing-xl: 32px;
    
    --radius-sm: 4px;
    --radius-md: 8px;
    --radius-lg: 12px;
    --radius-xl: 16px;
    
    --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.3);
    --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.3);
    --shadow-lg: 0 10px 20px rgba(0, 0, 0, 0.4);
    --shadow-xl: 0 20px 40px rgba(0, 0, 0, 0.5);
}
```

### 2.2 使用主题变量

```css
/* 使用变量定义通用样式 */
body {
    font-family: var(--font-primary);
    font-size: var(--size-normal);
    color: var(--color-text);
    background-color: var(--color-background);
}

h1, h2, h3, h4, h5, h6 {
    font-family: var(--font-heading);
    color: var(--color-text);
    margin-top: 0;
}

button {
    background-color: var(--color-primary);
    color: var(--color-background);
    border: none;
    border-radius: var(--radius-md);
    padding: var(--spacing-sm) var(--spacing-md);
    font-family: var(--font-primary);
    font-size: var(--size-normal);
    cursor: pointer;
    transition: background-color 0.2s, transform 0.1s;
}

button:hover {
    background-color: var(--color-secondary);
    transform: translateY(-1px);
}

button:active {
    transform: translateY(0);
}

.card {
    background-color: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
    padding: var(--spacing-lg);
    box-shadow: var(--shadow-md);
    margin-bottom: var(--spacing-md);
}

.card:hover {
    box-shadow: var(--shadow-lg);
}

.input {
    background-color: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    padding: var(--spacing-sm) var(--spacing-md);
    font-family: var(--font-primary);
    font-size: var(--size-normal);
    color: var(--color-text);
}

.input:focus {
    border-color: var(--color-primary);
    outline: none;
    box-shadow: 0 0 0 3px var(--color-shadow);
}
```

---

## 三、动态主题切换

### 3.1 主题选择器组件

```cpp
// ThemeSelector.h
#pragma once
#include <RmlUi/Core/EventListener.h>
#include <string>

class ThemeSelector : public Rml::EventListener
{
public:
    ThemeSelector(Rml::Context* context);
    ~ThemeSelector();

    bool Initialize();
    void Shutdown();

    void ProcessEvent(Rml::Event& event) override;

private:
    void CreateThemeMenu();
    void SelectTheme(const std::string& theme);

private:
    Rml::Context* context_;
    Rml::ElementDocument* document_;
    Rml::Element* theme_menu_;
};

// ThemeSelector.cpp
ThemeSelector::ThemeSelector(Rml::Context* context)
    : context_(context), document_(nullptr), theme_menu_(nullptr)
{
}

bool ThemeSelector::Initialize()
{
    document_ = context_->LoadDocument("ui/theme_selector.rml");
    if (!document_)
        return false;
    
    CreateThemeMenu();
    
    // 监听主题变化事件
    document_->AddEventListener(Rml::StringId("theme_changed"), this);
    
    return true;
}

void ThemeSelector::CreateThemeMenu()
{
    auto themes = ThemeManager::Instance().GetAvailableThemes();
    
    theme_menu_ = document_->GetElementById("theme-menu");
    if (!theme_menu_)
        return;
    
    for (const auto& theme : themes)
    {
        Rml::Element* option = document_->CreateElement("div");
        option->SetClass("theme-option");
        option->SetInnerRML(theme);
        option->SetAttribute("data-theme", theme);
        
        option->AddEventListener(Rml::EventId::Click, this);
        
        theme_menu_->AppendChild(option);
    }
}

void ThemeSelector::ProcessEvent(Rml::Event& event)
{
    if (event.GetId() == Rml::EventId::Click)
    {
        Rml::Element* target = event.GetTargetElement();
        if (target->HasAttribute("data-theme"))
        {
            std::string theme = target->GetAttribute("data-theme")->Get<std::string>();
            SelectTheme(theme);
        }
    }
    else if (event.GetId() == Rml::StringId("theme_changed"))
    {
        // 更新当前主题的高亮显示
        std::string current = ThemeManager::Instance().GetCurrentTheme();
        
        int num_children = theme_menu_->GetNumChildren();
        for (int i = 0; i < num_children; i++)
        {
            Rml::Element* option = theme_menu_->GetChild(i);
            std::string theme = option->GetAttribute("data-theme")->Get<std::string>();
            
            if (theme == current)
                option->SetClass("selected", true);
            else
                option->SetClass("selected", false);
        }
    }
}

void ThemeSelector::SelectTheme(const std::string& theme)
{
    ThemeManager::Instance().SetTheme(theme);
}
```

### 3.2 主题选择器 RML

```xml
<rml>
<head>
    <title>主题选择器</title>
    <link type="text/rcss" href="theme_selector.rcss"/>
</head>
<body>
    <div class="theme-selector">
        <h2>主题</h2>
        <div id="theme-menu" class="theme-menu">
            <!-- 主题选项将动态生成 -->
        </div>
    </div>
</body>
</rml>
```

```css
/* theme_selector.rcss */
.theme-selector {
    background: var(--color-surface);
    padding: var(--spacing-md);
    border-radius: var(--radius-md);
    border: 1px solid var(--color-border);
}

.theme-selector h2 {
    font-size: var(--size-large);
    margin-bottom: var(--spacing-md);
    color: var(--color-text);
}

.theme-menu {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-sm);
}

.theme-option {
    padding: var(--spacing-sm) var(--spacing-md);
    background: var(--color-background);
    color: var(--color-text);
    border-radius: var(--radius-sm);
    cursor: pointer;
    transition: background 0.2s, transform 0.1s;
    border: 1px solid transparent;
}

.theme-option:hover {
    background: var(--color-primary);
    color: var(--color-background);
    transform: translateX(4px);
}

.theme-option.selected {
    background: var(--color-secondary);
    color: var(--color-background);
    border-color: var(--color-accent);
    font-weight: bold;
}
```

---

## 四、主题继承和自定义

### 4.1 主题继承

```cpp
// ThemeInheritance.h
#pragma once
#include <RmlUi/Core/Types.h>
#include <string>
#include <unordered_map>

class ThemeInheritance
{
public:
    // 创建主题变体
    static std::string CreateVariant(
        const std::string& base_theme,
        const std::string& variant_name,
        const std::unordered_map<std::string, std::string>& overrides);
    
    // 应用主题变体
    static bool ApplyVariant(const std::string& variant_name);

private:
    static std::unordered_map<std::string, std::string> variants_;
};

// ThemeInheritance.cpp
std::unordered_map<std::string, std::string> ThemeInheritance::variants_;

std::string ThemeInheritance::CreateVariant(
    const std::string& base_theme,
    const std::string& variant_name,
    const std::unordered_map<std::string, std::string>& overrides)
{
    // 获取基础主题的变量
    auto base_vars = ThemeManager::Instance().GetThemeVariables(base_theme);
    
    // 应用覆盖
    std::unordered_map<std::string, std::string> variant_vars = base_vars;
    for (const auto& pair : overrides)
    {
        variant_vars[pair.first] = pair.second;
    }
    
    // 保存变体
    variants_[variant_name] = base_theme;
    
    // 保存变体变量
    std::string variant_key = "variant-" + variant_name;
    for (const auto& pair : variant_vars)
    {
        ThemeManager::Instance().SetVariable(variant_key + "-" + pair.first, pair.second);
    }
    
    return variant_name;
}

bool ThemeInheritance::ApplyVariant(const std::string& variant_name)
{
    auto it = variants_.find(variant_name);
    if (it == variants_.end())
        return false;
    
    // 设置基础主题
    ThemeManager::Instance().SetTheme(it->second);
    
    // 应用变体变量
    std::string variant_key = "variant-" + variant_name;
    auto vars = ThemeManager::Instance().GetThemeVariables(variant_key);
    
    for (const auto& pair : vars)
    {
        ThemeManager::Instance().SetVariable(pair.first, pair.second);
    }
    
    return true;
}
```

### 4.2 自定义主题

```cpp
// CustomThemeBuilder.h
#pragma once
#include <RmlUi/Core/Types.h>
#include <string>
#include <unordered_map>

class CustomThemeBuilder
{
public:
    CustomThemeBuilder& SetName(const std::string& name);
    CustomThemeBuilder& SetColor(const std::string& key, const std::string& value);
    CustomThemeBuilder& SetFont(const std::string& key, const std::string& value);
    CustomThemeBuilder& SetSize(const std::string& key, const std::string& value);
    
    std::string Build();

private:
    std::string name_;
    std::unordered_map<std::string, std::string> variables_;
};

// CustomThemeBuilder.cpp
CustomThemeBuilder& CustomThemeBuilder::SetName(const std::string& name)
{
    name_ = name;
    return *this;
}

CustomThemeBuilder& CustomThemeBuilder::SetColor(const std::string& key, const std::string& value)
{
    variables_["color-" + key] = value;
    return *this;
}

CustomThemeBuilder& CustomThemeBuilder::SetFont(const std::string& key, const std::string& value)
{
    variables_["font-" + key] = value;
    return *this;
}

CustomThemeBuilder& CustomThemeBuilder::SetSize(const std::string& key, const std::string& value)
{
    variables_["size-" + key] = value;
    return *this;
}

std::string CustomThemeBuilder::Build()
{
    // 注册自定义主题
    std::string theme_name = "custom-" + name_;
    
    for (const auto& pair : variables_)
    {
        ThemeManager::Instance().SetVariable(pair.first, pair.second);
    }
    
    return theme_name;
}

// 使用示例
void CreateCustomTheme()
{
    CustomThemeBuilder builder;
    std::string theme_name = builder
        .SetName("my_theme")
        .SetColor("primary", "#ff6b6b")
        .SetColor("background", "#1a1a2e")
        .SetFont("primary", "Orbitron, Arial, sans-serif")
        .Build();
    
    ThemeManager::Instance().SetTheme(theme_name);
}
```

---

## 五、实战练习

### 练习 1：创建游戏主题

创建一个游戏主题，包含：
- 赛博风格的配色
- 霓虹灯效果
- 科技感字体

### 练习 2：实现主题预设

实现主题预设系统：
- 亮色/暗色模式
- 高对比度模式
- 护眼模式

### 练习 3：主题自定义界面

创建一个主题自定义界面：
- 颜色选择器
- 字体选择
- 间距调整

---

## 六、最佳实践

### 6.1 主题设计
- ✅ 使用语义化的变量名
- ✅ 保持一致的命名约定
- ✅ 提供合理的默认值
- ✅ 支持主题继承

### 6.2 性能优化
- ✅ 缓存主题配置
- ✅ 按需加载主题资源
- ✅ 优化变量替换
- ✅ 减少主题切换开销

### 6.3 用户体验
- ✅ 平滑的主题切换
- ✅ 保存用户偏好
- ✅ 提供主题预览
- ✅ 支持热键切换

---

## 七、下一步

继续学习 [性能优化](05-performance-optimization.md) 来提升主题系统的性能。

---

## 📝 检查清单

- [ ] 理解主题系统架构
- [ ] 能够创建主题配置
- [ ] 掌握 CSS 变量使用
- [ ] 能够实现动态主题切换
- [ ] 理解主题继承
- [ ] 能够创建自定义主题
- [ ] 理解主题最佳实践