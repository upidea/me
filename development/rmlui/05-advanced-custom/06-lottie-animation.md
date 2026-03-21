# 5.6 Lottie 动画

Lottie 动画是 After Effects 动画的高质量输出格式。本节将深入讲解如何在 RmlUi 中集成和使用 Lottie 动画。

---

## 一、Lottie 简介

### 1.1 什么是 Lottie

Lottie 是 Airbnb 开发的动画库，支持：
- 矢量图形动画
- 复杂的路径动画
- 渐变和遮罩效果
- 跨平台兼容

### 1.2 为什么使用 Lottie

**优势**：
- ✅ 高质量矢量动画
- ✅ 文件体积小
- ✅ 支持复杂效果
- ✅ 可编程控制

**应用场景**：
- Loading 动画
- 成就解锁动画
- 界面过渡效果
- 交互反馈动画

---

## 二、Lottie 集成

### 2.1 Lottie 插件

```cpp
// LottiePlugin.h
#pragma once
#include <RmlUi/Core/Plugin.h>
#include <RmlUi/Core/EventListener.h>

class LottiePlugin : public Rml::Plugin, public Rml::EventListener
{
public:
    void Initialise() override;
    void Shutdown() override;
    Rml::EventListener* GetEventListener() override;
    Rml::String GetName() const override { return "Lottie"; }
    int GetVersion() const override { return 1; }

    void ProcessEvent(Rml::Event& event) override;

private:
    void RegisterLottieElement();
};

// LottiePlugin.cpp
#include "LottiePlugin.h"
#include <RmlUi/Core/Core.h>
#include <RmlUi/Factory.h>

void LottiePlugin::Initialise()
{
    Rml::Log::Message(Rml::Log::LT_INFO, "Initializing Lottie plugin");
    
    // 注册 Lottie 元素
    RegisterLottieElement();
    
    Rml::Log::Message(Rml::Log::LT_INFO, "Lottie plugin initialized");
}

void LottiePlugin::Shutdown()
{
    Rml::Log::Message(Rml::Log::LT_INFO, "Shutting down Lottie plugin");
}

Rml::EventListener* LottiePlugin::GetEventListener()
{
    return this;
}

void LottiePlugin::ProcessEvent(Rml::Event& event)
{
    // 处理 Lottie 相关事件
}

void LottiePlugin::RegisterLottieElement()
{
    // 注册 lottie 元素类型
    // 这需要自定义元素实现
}
```

### 2.2 Lottie 元素

```cpp
// ElementLottie.h
#pragma once
#include <RmlUi/Core/Element.h>
#include <string>

class ElementLottie : public Rml::Element
{
public:
    RMLUI_RTTI_DefineWithParent(ElementLottie, Rml::Element)

    ElementLottie(const Rml::String& tag);
    virtual ~ElementLottie();

    // 设置动画文件
    void SetAnimation(const Rml::String& path);
    
    // 播放控制
    void Play();
    void Pause();
    void Stop();
    void Seek(float time);
    
    // 速度控制
    void SetSpeed(float speed);
    float GetSpeed() const;
    
    // 循环控制
    void SetLoop(bool loop);
    bool IsLooping() const;
    
    // 状态查询
    bool IsPlaying() const;
    bool IsPaused() const;
    float GetDuration() const;
    float GetCurrentTime() const;

private:
    void OnRender() override;
    void OnUpdate() override;
    void OnAttributeChange(const Rml::ElementAttributes& changed_attributes) override;

private:
    Rml::String animation_path_;
    bool is_playing_;
    bool is_paused_;
    bool should_loop_;
    float playback_speed_;
    float current_time_;
    float duration_;
    
    // Lottie 渲染数据
    void* lottie_instance_;
};

// ElementLottie.cpp
#include "ElementLottie.h"
#include <RmlUi/Core/Core.h>
#include <RmlUi/Core/ElementUtilities.h>

ElementLottie::ElementLottie(const Rml::String& tag)
    : Rml::Element(tag)
    , is_playing_(false)
    , is_paused_(false)
    , should_loop_(true)
    , playback_speed_(1.0f)
    , current_time_(0.0f)
    , duration_(0.0f)
    , lottie_instance_(nullptr)
{
    SetProperty(Rml::PropertyId::Display, Rml::Property(Rml::Style::Display::InlineBlock));
}

ElementLottie::~ElementLottie()
{
    // 清理 Lottie 实例
    if (lottie_instance_)
    {
        DestroyLottieInstance(lottie_instance_);
    }
}

void ElementLottie::SetAnimation(const Rml::String& path)
{
    animation_path_ = path;
    
    // 销毁旧实例
    if (lottie_instance_)
    {
        DestroyLottieInstance(lottie_instance_);
        lottie_instance_ = nullptr;
    }
    
    // 加载新动画
    lottie_instance_ = LoadLottieAnimation(path);
    if (lottie_instance_)
    {
        duration_ = GetLottieDuration(lottie_instance_);
    }
    
    // 标记需要重新渲染
    DirtyLayout();
}

void ElementLottie::Play()
{
    is_playing_ = true;
    is_paused_ = false;
}

void ElementLottie::Pause()
{
    is_paused_ = true;
}

void ElementLottie::Stop()
{
    is_playing_ = false;
    is_paused_ = false;
    current_time_ = 0.0f;
}

void ElementLottie::Seek(float time)
{
    current_time_ = time;
}

void ElementLottie::SetSpeed(float speed)
{
    playback_speed_ = speed;
}

float ElementLottie::GetSpeed() const
{
    return playback_speed_;
}

void ElementLottie::SetLoop(bool loop)
{
    should_loop_ = loop;
}

bool ElementLottie::IsLooping() const
{
    return should_loop_;
}

bool ElementLottie::IsPlaying() const
{
    return is_playing_ && !is_paused_;
}

bool ElementLottie::IsPaused() const
{
    return is_paused_;
}

float ElementLottie::GetDuration() const
{
    return duration_;
}

float ElementLottie::GetCurrentTime() const
{
    return current_time_;
}

void ElementLottie::OnRender()
{
    if (!lottie_instance_ || !IsPlaying())
        return;
    
    // 渲染 Lottie 动画
    RenderLottieFrame(
        lottie_instance_,
        GetBox().GetSize(),
        current_time_,
        GetRenderManager()
    );
}

void ElementLottie::OnUpdate()
{
    if (!lottie_instance_ || !IsPlaying())
        return;
    
    // 更新动画时间
    float delta_time = GetDeltaTime();
    current_time_ += delta_time * playback_speed_;
    
    // 循环处理
    if (should_loop_ && current_time_ >= duration_)
    {
        current_time_ = fmod(current_time_, duration_);
    }
}

void ElementLottie::OnAttributeChange(const Rml::ElementAttributes& changed_attributes)
{
    Rml::Element::OnAttributeChange(changed_attributes);
    
    for (const auto& attr : changed_attributes)
    {
        const Rml::String& name = attr.first.Get();
        
        if (name == "src")
        {
            SetAnimation(attr.second.Get<Rml::String>());
        }
        else if (name == "loop")
        {
            SetLoop(attr.second.Get<bool>());
        }
        else if (name == "speed")
        {
            SetSpeed(attr.second.Get<float>());
        }
        else if (name == "autoplay")
        {
            if (attr.second.Get<bool>())
                Play();
            else
                Pause();
        }
    }
}
```

### 2.3 在 RML 中使用 Lottie

```xml
<rml>
<head>
    <title>Lottie 动画示例</title>
    <link type="text/rcss" href="lottie_demo.rcss"/>
</head>
<body>
    <h1>Lottie 动画</h1>
    
    <!-- 基本用法 -->
    <lottie src="animations/loader.json" 
             width="100" 
             height="100"
             loop="true"
             autoplay="true"/>
    
    <!-- 自定义控制 -->
    <div class="lottie-container">
        <lottie id="achievement" 
                 src="animations/achievement.json" 
                 width="200" 
                 height="200"
                 loop="false"/>
        
        <div class="controls">
            <button id="btn-play">播放</button>
            <button id="btn-pause">暂停</button>
            <button id="btn-stop">停止</button>
        </div>
    </div>
    
    <!-- 动态加载 -->
    <lottie id="dynamic-lottie" 
             width="150" 
             height="150"
             loop="true"/>
    
    <div class="controls">
        <button onclick="change_animation('heartbeat')">心跳</button>
        <button onclick="change_animation('checkmark')">对勾</button>
        <button onclick="change_animation('spinner')">旋转</button>
    </div>
</body>
</rml>
```

```css
/* lottie_demo.rcss */
lottie {
    display: inline-block;
    vertical-align: middle;
}

.lottie-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    padding: 20px;
    background: var(--color-surface);
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-md);
}

.controls {
    display: flex;
    gap: 10px;
}

button {
    padding: 8px 16px;
    background: var(--color-primary);
    color: var(--color-background);
    border: none;
    border-radius: var(--radius-sm);
    cursor: pointer;
    font-family: var(--font-primary);
    font-size: var(--size-normal);
}

button:hover {
    background: var(--color-secondary);
}
```

---

## 三、Lottie 控制器

### 3.1 完整的控制器实现

```cpp
// LottieController.h
#pragma once
#include <RmlUi/Core/EventListener.h>
#include <RmlUi/Core/Element.h>
#include <string>

class LottieController : public Rml::EventListener
{
public:
    LottieController(Rml::Element* lottie_element);
    ~LottieController();

    // 播放控制
    void Play();
    void Pause();
    void Stop();
    void Toggle();
    
    // 进度控制
    void Seek(float progress);  // 0.0 - 1.0
    void SeekToTime(float time);
    
    // 速度控制
    void SetSpeed(float speed);
    float GetSpeed() const;
    
    // 循环控制
    void SetLoop(bool loop);
    bool IsLooping() const;
    
    // 状态查询
    bool IsPlaying() const;
    bool IsPaused() const;
    float GetProgress() const;
    float GetDuration() const;
    float GetCurrentTime() const;

    void ProcessEvent(Rml::Event& event) override;

private:
    void UpdateUI();

private:
    Rml::Element* lottie_element_;
    Rml::Element* play_button_;
    Rml::Element* pause_button_;
    Rml::Element* stop_button_;
    Rml::Element* progress_bar_;
};

// LottieController.cpp
LottieController::LottieController(Rml::Element* lottie_element)
    : lottie_element_(lottie_element)
{
    // 查找控制元素
    auto* document = lottie_element->GetOwnerDocument();
    
    play_button_ = document->GetElementById("btn-play");
    pause_button_ = document->GetElementById("btn-pause");
    stop_button_ = document->GetElementById("btn-stop");
    progress_bar_ = document->GetElementById("progress-bar");
    
    // 绑定事件
    if (play_button_) play_button_->AddEventListener(Rml::EventId::Click, this);
    if (pause_button_) pause_button_->AddEventListener(Rml::EventId::Click, this);
    if (stop_button_) stop_button_->AddEventListener(Rml::EventId::Click, this);
}

LottieController::~LottieController()
{
    // 移除事件监听
    if (play_button_) play_button_->RemoveEventListener(Rml::EventId::Click, this);
    if (pause_button_) pause_button_->RemoveEventListener(Rml::EventId::Click, this);
    if (stop_button_) stop_button_->RemoveEventListener(Rml::EventId::Click, this);
}

void LottieController::Play()
{
    if (auto* lottie = dynamic_cast<ElementLottie*>(lottie_element_))
    {
        lottie->Play();
    }
    UpdateUI();
}

void LottieController::Pause()
{
    if (auto* lottie = dynamic_cast<ElementLottie*>(lottie_element_))
    {
        lottie->Pause();
    }
    UpdateUI();
}

void LottieController::Stop()
{
    if (auto* lottie = dynamic_cast<ElementLottie*>(lottie_element_))
    {
        lottie->Stop();
    }
    UpdateUI();
}

void LottieController::Toggle()
{
    if (IsPlaying())
        Pause();
    else
        Play();
}

void LottieController::Seek(float progress)
{
    if (auto* lottie = dynamic_cast<ElementLottie*>(lottie_element_))
    {
        float time = lottie->GetDuration() * progress;
        lottie->Seek(time);
    }
}

void LottieController::SeekToTime(float time)
{
    if (auto* lottie = dynamic_cast<ElementLottie*>(lottie_element_))
    {
        lottie->Seek(time);
    }
}

void LottieController::SetSpeed(float speed)
{
    if (auto* lottie = dynamic_cast<ElementLottie*>(lottie_element_))
    {
        lottie->SetSpeed(speed);
    }
}

void LottieController::ProcessEvent(Rml::Event& event)
{
    if (event.GetId() == Rml::EventId::Click)
    {
        if (event.GetTargetElement() == play_button_)
        {
            Play();
        }
        else if (event.GetTargetElement() == pause_button_)
        {
            Pause();
        }
        else if (event.GetTargetElement() == stop_button_)
        {
            Stop();
        }
    }
}

void LottieController::UpdateUI()
{
    // 更新按钮状态
    if (play_button_)
    {
        play_button_->SetProperty(Rml::PropertyId::Opacity, 
            Rml::Property(IsPlaying() ? 0.3f : 1.0f));
    }
    
    if (pause_button_)
    {
        pause_button_->SetProperty(Rml::PropertyId::Opacity, 
            Rml::Property(IsPaused() ? 0.3f : 1.0f));
    }
    
    // 更新进度条
    if (progress_bar_ && IsPlaying())
    {
        float progress = GetProgress();
        progress_bar_->SetProperty(Rml::PropertyId::Width, 
            Rml::Property(progress * 100.0f, Rml::Unit::PERCENT));
    }
}
```

---

## 四、Lottie 动画库

### 4.1 预定义动画

```cpp
// LottieLibrary.h
#pragma once
#include <string>
#include <unordered_map>

class LottieLibrary
{
public:
    static LottieLibrary& Instance()
    {
        static LottieLibrary instance;
        return instance;
    }

    // 注册动画
    void RegisterAnimation(const std::string& name, const std::string& path);
    
    // 获取动画路径
    std::string GetAnimation(const std::string& name) const;
    
    // 加载所有动画
    bool LoadFromDirectory(const std::string& directory);
    
    // 获取所有动画名称
    std::vector<std::string> GetAllAnimations() const;

private:
    LottieLibrary() = default;
    
    std::unordered_map<std::string, std::string> animations_;
};

// LottieLibrary.cpp
void LottieLibrary::RegisterAnimation(const std::string& name, const std::string& path)
{
    animations_[name] = path;
}

std::string LottieLibrary::GetAnimation(const std::string& name) const
{
    auto it = animations_.find(name);
    return it != animations_.end() ? it->second : "";
}

bool LottieLibrary::LoadFromDirectory(const std::string& directory)
{
    // 扫描目录中的所有 JSON 文件
    std::vector<std::string> files = ScanDirectory(directory, "*.json");
    
    for (const auto& file : files)
    {
        std::string name = GetFileNameWithoutExtension(file);
        std::string path = directory + "/" + file;
        
        RegisterAnimation(name, path);
    }
    
    return true;
}

std::vector<std::string> LottieLibrary::GetAllAnimations() const
{
    std::vector<std::string> names;
    for (const auto& pair : animations_)
    {
        names.push_back(pair.first);
    }
    return names;
}
```

### 4.2 使用动画库

```cpp
// 初始化动画库
void InitializeLottieLibrary()
{
    auto& library = LottieLibrary::Instance();
    
    // 加载动画
    library.RegisterAnimation("loader", "animations/loader.json");
    library.RegisterAnimation("success", "animations/success.json");
    library.RegisterAnimation("error", "animations/error.json");
    library.RegisterAnimation("heartbeat", "animations/heartbeat.json");
    library.RegisterAnimation("checkmark", "animations/checkmark.json");
    library.RegisterAnimation("spinner", "animations/spinner.json");
    
    // 或批量加载
    library.LoadFromDirectory("animations");
}

// 在界面中使用
void ShowSuccessAnimation(Rml::Context* context)
{
    auto& library = LottieLibrary::Instance();
    std::string animation = library.GetAnimation("success");
    
    if (animation.empty())
        return;
    
    // 创建对话框
    Rml::ElementDocument* dialog = context->LoadDocument("ui/success_dialog.rml");
    if (!dialog)
        return;
    
    // 获取 Lottie 元素并设置动画
    Rml::Element* lottie = dialog->GetElementById("animation");
    if (lottie)
    {
        lottie->SetAttribute("src", animation);
        lottie->SetAttribute("autoplay", "true");
    }
    
    dialog->Show(Rml::ModalFlag::Modal, Rml::FocusFlag::Auto);
}
```

---

## 五、实战示例

### 5.1 成就解锁动画

```cpp
// AchievementAnimation.h
#pragma once
#include <RmlUi/Core/EventListener.h>
#include <string>

class AchievementAnimation : public Rml::EventListener
{
public:
    AchievementAnimation(Rml::Context* context);
    ~AchievementAnimation();

    void ShowAchievement(const std::string& achievement_id, const std::string& title, const std::string& description);

    void ProcessEvent(Rml::Event& event) override;

private:
    void CreateUI();
    void Hide();

private:
    Rml::Context* context_;
    Rml::ElementDocument* document_;
    Rml::Element* lottie_;
    Rml::Element* title_;
    Rml::Element* description_;
    
    float display_timer_;
    bool is_visible_;
};

// AchievementAnimation.cpp
AchievementAnimation::AchievementAnimation(Rml::Context* context)
    : context_(context), document_(nullptr), display_timer_(0.0f), is_visible_(false)
{
    CreateUI();
}

AchievementAnimation::~AchievementAnimation()
{
    if (document_)
    {
        document_->Close();
    }
}

void AchievementAnimation::CreateUI()
{
    document_ = context_->LoadDocument("ui/achievement.rml");
    if (!document_)
        return;
    
    lottie_ = document_->GetElementById("achievement-icon");
    title_ = document_->GetElementById("achievement-title");
    description_ = document_->GetElementById("achievement-description");
    
    // 监听关闭按钮
    Rml::Element* close_btn = document_->GetElementById("close-btn");
    if (close_btn)
        close_btn->AddEventListener(Rml::EventId::Click, this);
}

void AchievementAnimation::ShowAchievement(const std::string& achievement_id, const std::string& title, const std::string& description)
{
    auto& library = LottieLibrary::Instance();
    std::string animation = library.GetAnimation(achievement_id);
    
    // 设置动画
    if (lottie_ && !animation.empty())
    {
        lottie_->SetAttribute("src", animation);
        lottie_->SetAttribute("autoplay", "true");
        lottie_->SetAttribute("loop", "true");
    }
    
    // 设置文本
    if (title_)
        title_->SetInnerRML(title);
    
    if (description_)
        description_->SetInnerRML(description);
    
    // 显示对话框
    document_->Show(Rml::ModalFlag::Modal, Rml::FocusFlag::None);
    is_visible_ = true;
    display_timer_ = 3.0f;  // 显示3秒
}

void AchievementAnimation::ProcessEvent(Rml::Event& event)
{
    if (event.GetId() == Rml::EventId::Click)
    {
        if (event.GetTargetElement()->GetId() == "close-btn")
        {
            Hide();
        }
    }
}

void AchievementAnimation::Hide()
{
    if (document_)
        document_->Hide();
    is_visible_ = false;
}

void AchievementAnimation::Update(float delta_time)
{
    if (!is_visible_)
        return;
    
    display_timer_ -= delta_time;
    if (display_timer_ <= 0.0f)
    {
        Hide();
    }
}
```

---

## 六、性能优化

### 6.1 动画池

```cpp
// LottiePool.h
#pragma once
#include <RmlUi/Core/Types.h>
#include <string>
#include <memory>

class LottiePool
{
public:
    static LottiePool& Instance()
    {
        static LottiePool instance;
        return instance;
    }

    // 获取 Lottie 实例
    void* Acquire(const std::string& animation);
    
    // 释放 Lottie 实例
    void Release(void* instance);
    
    // 清理未使用的实例
    void Cleanup();

private:
    LottiePool() = default;
    
    struct PoolEntry {
        void* instance;
        std::string animation;
        std::chrono::time_point<std::chrono::steady_clock> last_used;
        bool in_use;
    };

    std::vector<std::unique_ptr<PoolEntry>> pool_;
};

// LottiePool.cpp
void* LottiePool::Acquire(const std::string& animation)
{
    // 查找可用的实例
    for (auto& entry : pool_)
    {
        if (!entry->in_use && entry->animation == animation)
        {
            entry->in_use = true;
            entry->last_used = std::chrono::steady_clock::now();
            return entry->instance;
        }
    }
    
    // 创建新实例
    void* instance = LoadLottieAnimation(animation);
    if (!instance)
        return nullptr;
    
    auto entry = std::make_unique<PoolEntry>();
    entry->instance = instance;
    entry->animation = animation;
    entry->last_used = std::chrono::steady_clock::now();
    entry->in_use = true;
    
    pool_.push_back(std::move(entry));
    return instance;
}

void LottiePool::Release(void* instance)
{
    for (auto& entry : pool_)
    {
        if (entry->instance == instance)
        {
            entry->in_use = false;
            return;
        }
    }
}

void LottiePool::Cleanup()
{
    auto now = std::chrono::steady_clock::now();
    auto cutoff = now - std::chrono::minutes(5);  // 5分钟未使用
    
    pool_.erase(
        std::remove_if(pool_.begin(), pool_.end(),
            [cutoff](const auto& entry) {
                return !entry->in_use && entry->last_used < cutoff;
            }),
        pool_.end()
    );
}
```

---

## 七、实战练习

### 练习 1：创建 Loading 动画

创建一个完整的 Loading 动画系统：
- 多种 Loading 效果
- 自动显示/隐藏
- 进度集成

### 练习 2：实现按钮反馈动画

为按钮添加 Lottie 动画反馈：
- 点击动画
- 悬停动画
- 禁用状态

### 练习 3：创建转场动画

实现页面转场动画：
- 淡入淡出
- 滑动切换
- 缩放效果

---

## 八、最佳实践

### 8.1 性能优化
- ✅ 使用对象池管理实例
- ✅ 避免过多的同时播放
- ✅ 优化动画文件大小
- ✅ 使用 LOD (Level of Detail)

### 8.2 兼容性
- ✅ 提供备用动画
- ✅ 处理加载失败
- ✅ 支持不同的分辨率
- ✅ 考虑低端设备

### 8.3 设计建议
- ✅ 保持动画简洁
- ✅ 避免过长的动画
- ✅ 提供播放控制
- ✅ 考虑用户偏好

---

## 九、总结

恭喜！你已经完成了所有 RmlUi 教程的学习！

---

## 🎉 教程完成总结

你现在掌握了：

### 基础知识
- ✅ RML 和 RCSS 基础
- ✅ 布局系统
- ✅ 内置控件
- ✅ 事件系统
- ✅ 数据绑定

### 高级技能
- ✅ 自定义元素和装饰器
- ✅ 插件开发
- ✅ SVG 集成
- ✅ Lottie 动画
- ✅ 事件处理器

### 架构设计
- ✅ UI 架构模式
- ✅ 界面管理
- ✅ 本地化
- ✅ 主题系统
- ✅ 性能优化
- ✅ 调试技巧

---

## 🚀 下一步建议

1. **构建实际项目** - 应用所学知识
2. **贡献到开源项目** - 分享你的经验
3. **探索更多主题** - 深入特定领域
4. **关注 RmlUi 更新** - 了解新特性

---

## 📝 检查清单

- [ ] 理解 Lottie 动画
- [ ] 能够集成 Lottie 插件
- [ ] 掌握 Lottie 元素
- [ ] 能够创建动画控制器
- [ ] 理解动画库管理
- [ ] 能够优化性能
- [ ] 理解最佳实践