# 6.3 本地化

本地化是构建国际化应用的关键。本节将深入讲解如何在 RmlUi 中实现完整的多语言支持系统。

---

## 一、本地化系统架构

### 1.1 本地化管理器

```cpp
// LocalizationManager.h
#pragma once
#include <RmlUi/Core/Types.h>
#include <unordered_map>
#include <string>

class LocalizationManager
{
public:
    static LocalizationManager& Instance()
    {
        static LocalizationManager instance;
        return instance;
    }

    // 初始化
    bool Initialize(const std::string& default_language = "en");
    
    // 加载语言包
    bool LoadLanguage(const std::string& language, const std::string& path);
    
    // 设置当前语言
    void SetLanguage(const std::string& language);
    
    // 获取当前语言
    std::string GetCurrentLanguage() const { return current_language_; }
    
    // 获取翻译
    std::string Get(const std::string& key, const std::unordered_map<std::string, std::string>& params = {}) const;
    
    // 获取所有可用语言
    std::vector<std::string> GetAvailableLanguages() const;

private:
    LocalizationManager() = default;
    
    std::string FormatString(const std::string& str, const std::unordered_map<std::string, std::string>& params) const;

private:
    std::string current_language_;
    std::string default_language_;
    std::unordered_map<std::string, std::unordered_map<std::string, std::string>> translations_;
};

// LocalizationManager.cpp
bool LocalizationManager::Initialize(const std::string& default_language)
{
    default_language_ = default_language;
    current_language_ = default_language;
    return true;
}

bool LocalizationManager::LoadLanguage(const std::string& language, const std::string& path)
{
    // 加载 JSON 语言包
    std::string content = ReadFile(path);
    if (content.empty())
    {
        Rml::Log::Message(Rml::Log::LT_ERROR, 
            "Failed to load language file: %s", path.c_str());
        return false;
    }
    
    // 解析 JSON（需要 JSON 库）
    auto json = ParseJSON(content);
    if (!json.is_object())
    {
        Rml::Log::Message(Rml::Log::LT_ERROR, 
            "Invalid language file format: %s", path.c_str());
        return false;
    }
    
    // 提取翻译
    std::unordered_map<std::string, std::string> language_translations;
    for (const auto& pair : json.items())
    {
        language_translations[pair.key()] = pair.value().get<std::string>();
    }
    
    translations_[language] = language_translations;
    return true;
}

void LocalizationManager::SetLanguage(const std::string& language)
{
    if (translations_.find(language) == translations_.end())
    {
        Rml::Log::Message(Rml::Log::LT_WARNING, 
            "Language not found: %s", language.c_str());
        return;
    }
    
    current_language_ = language;
    
    // 触发语言变化事件
    Rml::Dictionary params;
    params["language"] = language;
    Rml::GetContext(0)->GetDocument(0)->DispatchEvent(Rml::StringId("language_changed"), params);
}

std::string LocalizationManager::Get(const std::string& key, const std::unordered_map<std::string, std::string>& params) const
{
    // 先查找当前语言的翻译
    auto lang_it = translations_.find(current_language_);
    if (lang_it != translations_.end())
    {
        auto trans_it = lang_it->second.find(key);
        if (trans_it != lang_it->second.end())
        {
            return FormatString(trans_it->second, params);
        }
    }
    
    // 回退到默认语言
    auto default_it = translations_.find(default_language_);
    if (default_it != translations_.end())
    {
        auto trans_it = default_it->second.find(key);
        if (trans_it != default_it->second.end())
        {
            return FormatString(trans_it->second, params);
        }
    }
    
    // 返回 key 本身
    return key;
}

std::string LocalizationManager::FormatString(const std::string& str, const std::unordered_map<std::string, std::string>& params) const
{
    std::string result = str;
    
    // 替换参数 {param}
    for (const auto& pair : params)
    {
        std::string placeholder = "{" + pair.first + "}";
        size_t pos = result.find(placeholder);
        while (pos != std::string::npos)
        {
            result.replace(pos, placeholder.length(), pair.second);
            pos = result.find(placeholder);
        }
    }
    
    return result;
}

std::vector<std::string> LocalizationManager::GetAvailableLanguages() const
{
    std::vector<std::string> languages;
    for (const auto& pair : translations_)
    {
        languages.push_back(pair.first);
    }
    return languages;
}
```

### 1.2 语言包格式

```json
// en.json (英语)
{
    "menu": {
        "start": "Start Game",
        "options": "Options",
        "quit": "Quit"
    },
    "game": {
        "score": "Score: {score}",
        "lives": "Lives: {lives}",
        "health": "Health: {health}%"
    },
    "settings": {
        "title": "Settings",
        "language": "Language",
        "volume": "Volume"
    }
}

// zh-CN.json (简体中文)
{
    "menu": {
        "start": "开始游戏",
        "options": "选项",
        "quit": "退出"
    },
    "game": {
        "score": "分数: {score}",
        "lives": "生命: {lives}",
        "health": "生命值: {health}%"
    },
    "settings": {
        "title": "设置",
        "language": "语言",
        "volume": "音量"
    }
}

// ja.json (日语)
{
    "menu": {
        "start": "ゲーム開始",
        "options": "オプション",
        "quit": "終了"
    },
    "game": {
        "score": "スコア: {score}",
        "lives": "残機: {lives}",
        "health": "体力: {health}%"
    },
    "settings": {
        "title": "设置",
        "language": "言語",
        "volume": "音量"
    }
}
```

---

## 二、在 RML 中使用本地化

### 2.1 基本用法

```xml
<rml>
<head>
    <title>本地化示例</title>
    <link type="text/rcss" href="style.rcss"/>
</head>
<body>
    <h1 data-i18n="menu.start">Start Game</h1>
    
    <button id="btn-start" data-i18n="menu.start">Start Game</button>
    <button id="btn-options" data-i18n="menu.options">Options</button>
    <button id="btn-quit" data-i18n="menu.quit">Quit</button>
    
    <div class="game-stats">
        <span data-i18n="game.score" data-i18n-params='{"score":"1000"}'>Score: 1000</span>
        <span data-i18n="game.lives" data-i18n-params='{"lives":"3"}'>Lives: 3</span>
    </div>
</body>
</rml>
```

### 2.2 动态翻译

```cpp
// LocalizationHelper.h
#pragma once
#include <RmlUi/Core/Types.h>

class LocalizationHelper
{
public:
    static void ApplyTranslations(Rml::ElementDocument* document);
    static void UpdateElement(Rml::Element* element);

private:
    static std::string GetKey(Rml::Element* element);
    static std::unordered_map<std::string, std::string> GetParams(Rml::Element* element);
};

// LocalizationHelper.cpp
void LocalizationHelper::ApplyTranslations(Rml::ElementDocument* document)
{
    // 遍历所有元素
    int num_children = document->GetNumChildren();
    for (int i = 0; i < num_children; i++)
    {
        Rml::Element* child = document->GetChild(i);
        UpdateElement(child);
        
        // 递归处理子元素
        ApplyTranslationsRecursive(child);
    }
}

void LocalizationHelper::ApplyTranslationsRecursive(Rml::Element* element)
{
    int num_children = element->GetNumChildren();
    for (int i = 0; i < num_children; i++)
    {
        Rml::Element* child = element->GetChild(i);
        UpdateElement(child);
        ApplyTranslationsRecursive(child);
    }
}

void LocalizationHelper::UpdateElement(Rml::Element* element)
{
    std::string key = GetKey(element);
    if (key.empty())
        return;
    
    std::unordered_map<std::string, std::string> params = GetParams(element);
    std::string translation = LocalizationManager::Instance().Get(key, params);
    
    element->SetInnerRML(translation);
}

std::string LocalizationHelper::GetKey(Rml::Element* element)
{
    if (element->HasAttribute("data-i18n"))
    {
        return element->GetAttribute("data-i18n")->Get<std::string>();
    }
    return "";
}

std::unordered_map<std::string, std::string> LocalizationHelper::GetParams(Rml::Element* element)
{
    std::unordered_map<std::string, std::string> params;
    
    if (element->HasAttribute("data-i18n-params"))
    {
        std::string params_str = element->GetAttribute("data-i18n-params")->Get<std::string>();
        // 解析 JSON 参数
        auto json = ParseJSON(params_str);
        for (const auto& pair : json.items())
        {
            params[pair.key()] = pair.value().get<std::string>();
        }
    }
    
    return params;
}

// 在语言变化时更新界面
void OnLanguageChanged(Rml::Event& event)
{
    std::string language = event.GetParameter<std::string>("language", "");
    Rml::ElementDocument* document = event.GetTargetElement()->GetOwnerDocument();
    
    // 更新所有翻译
    LocalizationHelper::ApplyTranslations(document);
}
```

---

## 三、语言切换界面

### 3.1 语言选择器组件

```cpp
// LanguageSelector.h
#pragma once
#include <RmlUi/Core/EventListener.h>
#include <string>

class LanguageSelector : public Rml::EventListener
{
public:
    LanguageSelector(Rml::Context* context);
    ~LanguageSelector();

    bool Initialize();
    void Shutdown();

    void ProcessEvent(Rml::Event& event) override;

private:
    void CreateLanguageMenu();
    void SelectLanguage(const std::string& language);

private:
    Rml::Context* context_;
    Rml::ElementDocument* document_;
    Rml::Element* language_menu_;
};

// LanguageSelector.cpp
LanguageSelector::LanguageSelector(Rml::Context* context)
    : context_(context), document_(nullptr), language_menu_(nullptr)
{
}

bool LanguageSelector::Initialize()
{
    document_ = context_->LoadDocument("ui/language_selector.rml");
    if (!document_)
        return false;
    
    CreateLanguageMenu();
    
    // 监听语言变化事件
    document_->AddEventListener(Rml::StringId("language_changed"), this);
    
    return true;
}

void LanguageSelector::CreateLanguageMenu()
{
    auto languages = LocalizationManager::Instance().GetAvailableLanguages();
    
    language_menu_ = document_->GetElementById("language-menu");
    if (!language_menu_)
        return;
    
    for (const auto& language : languages)
    {
        Rml::Element* option = document_->CreateElement("div");
        option->SetClass("language-option");
        option->SetInnerRML(language);
        option->SetAttribute("data-language", language);
        
        option->AddEventListener(Rml::EventId::Click, this);
        
        language_menu_->AppendChild(option);
    }
}

void LanguageSelector::ProcessEvent(Rml::Event& event)
{
    if (event.GetId() == Rml::EventId::Click)
    {
        Rml::Element* target = event.GetTargetElement();
        if (target->HasAttribute("data-language"))
        {
            std::string language = target->GetAttribute("data-language")->Get<std::string>();
            SelectLanguage(language);
        }
    }
    else if (event.GetId() == Rml::StringId("language_changed"))
    {
        // 更新当前语言的高亮显示
        std::string current = LocalizationManager::Instance().GetCurrentLanguage();
        
        int num_children = language_menu_->GetNumChildren();
        for (int i = 0; i < num_children; i++)
        {
            Rml::Element* option = language_menu_->GetChild(i);
            std::string lang = option->GetAttribute("data-language")->Get<std::string>();
            
            if (lang == current)
                option->SetClass("selected", true);
            else
                option->SetClass("selected", false);
        }
    }
}

void LanguageSelector::SelectLanguage(const std::string& language)
{
    LocalizationManager::Instance().SetLanguage(language);
}
```

### 3.2 语言选择器 RML

```xml
<rml>
<head>
    <title>语言选择器</title>
    <link type="text/rcss" href="language_selector.rcss"/>
</head>
<body>
    <div class="language-selector">
        <h2 data-i18n="settings.language">Language</h2>
        <div id="language-menu" class="language-menu">
            <!-- 语言选项将动态生成 -->
        </div>
    </div>
</body>
</rml>
```

```css
/* language_selector.rcss */
.language-selector {
    background: #2c3e50;
    padding: 20px;
    border-radius: 8px;
}

.language-selector h2 {
    color: #ecf0f1;
    margin-bottom: 15px;
}

.language-menu {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.language-option {
    padding: 10px 15px;
    background: #34495e;
    color: #ecf0f1;
    border-radius: 4px;
    cursor: pointer;
    transition: background 0.2s;
}

.language-option:hover {
    background: #3d566e;
}

.language-option.selected {
    background: #3498db;
    color: white;
}
```

---

## 四、高级功能

### 4.1 RTL 支持

```cpp
// RTLSupport.h
#pragma once
#include <RmlUi/Core/Types.h>

class RTLSupport
{
public:
    static bool IsRTL(const std::string& language);
    static void ApplyRTL(Rml::ElementDocument* document);
    static void ApplyLTR(Rml::ElementDocument* document);

private:
    static std::unordered_set<std::string> rtl_languages_;
};

// RTLSupport.cpp
std::unordered_set<std::string> RTLSupport::rtl_languages_ = {
    "ar",  // 阿拉伯语
    "he",  // 希伯来语
    "fa",  // 波斯语
    "ur"   // 乌尔都语
};

bool RTLSupport::IsRTL(const std::string& language)
{
    return rtl_languages_.find(language) != rtl_languages_.end();
}

void RTLSupport::ApplyRTL(Rml::ElementDocument* document)
{
    document->SetProperty(Rml::PropertyId::Direction, Rml::Property(Rml::Style::Direction::Rtl));
    document->SetProperty(Rml::PropertyId::TextAlign, Rml::Property(Rml::Style::TextAlign::Right));
}

void RTLSupport::ApplyLTR(Rml::ElementDocument* document)
{
    document->SetProperty(Rml::PropertyId::Direction, Rml::Property(Rml::Style::Direction::Ltr));
    document->SetProperty(Rml::PropertyId::TextAlign, Rml::Property(Rml::Style::TextAlign::Left));
}
```

### 4.2 日期和时间本地化

```cpp
// DateTimeLocalization.h
#pragma once
#include <RmlUi/Core/Types.h>
#include <chrono>

class DateTimeLocalization
{
public:
    static std::string FormatDate(const std::chrono::system_clock::time_point& date, const std::string& language = "");
    static std::string FormatTime(const std::chrono::system_clock::time_point& time, const std::string& language = "");
    static std::string FormatDateTime(const std::chrono::system_clock::time_point& datetime, const std::string& language = "");

private:
    static std::string GetDateFormat(const std::string& language);
    static std::string GetTimeFormat(const std::string& language);
};
```

---

## 五、实战练习

### 练习 1：创建多语言设置界面

创建一个完整的语言设置界面：
- 支持多种语言切换
- 显示当前语言
- 保存语言偏好

### 练习 2：实现动态文本更新

实现游戏中的动态文本更新：
- 分数显示
- 生命值显示
- 任务提示

### 练习 3：添加 RTL 支持

为阿拉伯语等 RTL 语言添加支持：
- 自动调整布局方向
- 正确显示文本
- 处理混合方向文本

---

## 六、最佳实践

### 6.1 翻译管理
- ✅ 使用键值对存储翻译
- ✅ 支持参数替换
- ✅ 提供回退机制
- ✅ 支持嵌套键

### 6.2 性能优化
- ✅ 缓存翻译结果
- ✅ 批量更新界面
- ✅ 使用事件驱动更新
- ✅ 避免频繁的文件读取

### 6.3 用户体验
- ✅ 平滑的语言切换
- ✅ 保存用户偏好
- ✅ 支持热键切换
- ✅ 显示当前语言

---

## 七、下一步

继续学习 [主题系统](04-theme-system.md) 来实现界面主题切换。

---

## 📝 检查清单

- [ ] 理解本地化系统架构
- [ ] 能够创建语言包
- [ ] 掌握 RML 中的本地化使用
- [ ] 能够实现语言切换
- [ ] 理解 RTL 支持
- [ ] 能够格式化日期和时间
- [ ] 理解本地化最佳实践