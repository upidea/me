# 6.1 UI 架构模式

良好的架构设计是构建可维护、可扩展 UI 系统的关键。本节将深入讲解如何在 RmlUi 中应用经典的架构模式，以及如何设计适合游戏和应用场景的 UI 架构。

---

## 一、架构模式概览

### 1.1 常见架构模式

| 模式 | 适用场景 | 优点 | 缺点 |
|------|----------|------|------|
| **MVC** | 传统 Web 应用 | 职责清晰 | 耦合度高 |
| **MVVM** | 数据驱动应用 | 数据绑定强 | 学习曲线陡 |
| **MVP** | 测试驱动 | 易于测试 | 代码量多 |
| **组件化** | 现代前端 | 可复用性强 | 需要良好设计 |
| **事件驱动** | 游戏系统 | 灵活性高 | 调试困难 |

### 1.2 RmlUi 推荐架构

对于游戏和应用，我们推荐 **组件化 + 事件驱动** 的混合架构：

```
┌─────────────────────────────────────────────────────────────┐
│                      应用层 (Game Logic)                      │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                   UI 层 (Presentation)                       │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐       │
│  │  组件库      │  │  屏幕管理器  │  │  事件总线    │       │
│  └──────────────┘  └──────────────┘  └──────────────┘       │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                   RmlUi 层 (Framework)                       │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐       │
│  │  Context     │  │  Documents   │  │  Elements    │       │
│  └──────────────┘  └──────────────┘  └──────────────┘       │
└─────────────────────────────────────────────────────────────┘
```

---

## 二、组件化架构

### 2.1 组件设计原则

```cpp
// UIComponent.h
#pragma once
#include <RmlUi/Core/Element.h>
#include <RmlUi/Core/EventListener.h>
#include <memory>

// 组件基类
class UIComponent : public Rml::EventListener
{
public:
    virtual ~UIComponent() = default;
    
    // 初始化
    virtual bool Initialize() = 0;
    
    // 关闭
    virtual void Shutdown() = 0;
    
    // 更新
    virtual void Update(float delta_time) {}
    
    // 显示/隐藏
    virtual void Show() {}
    virtual void Hide() {}
    
    // 获取根元素
    virtual Rml::Element* GetRootElement() = 0;
    
    // 事件处理
    void ProcessEvent(Rml::Event& event) override {}

protected:
    // 加载 RML 文档
    bool LoadDocument(const Rml::String& path);
    
    // 查找元素
    template<typename T = Rml::Element>
    T* FindElement(const Rml::String& id)
    {
        Rml::Element* el = document_->GetElementById(id);
        return dynamic_cast<T*>(el);
    }

protected:
    Rml::Context* context_;
    Rml::ElementDocument* document_;
};

// UIComponent.cpp
bool UIComponent::LoadDocument(const Rml::String& path)
{
    document_ = context_->LoadDocument(path);
    if (!document_)
    {
        Rml::Log::Message(Rml::Log::LT_ERROR, 
            "Failed to load document: %s", path.c_str());
        return false;
    }
    
    return true;
}
```

### 2.2 游戏主菜单组件

```cpp
// MainMenuComponent.h
#pragma once
#include "UIComponent.h"

class MainMenuComponent : public UIComponent
{
public:
    MainMenuComponent(Rml::Context* context);
    ~MainMenuComponent() override;

    bool Initialize() override;
    void Shutdown() override;
    
    void Show() override;
    void Hide() override;
    
    Rml::Element* GetRootElement() override { return document_; }

private:
    void ProcessEvent(Rml::Event& event) override;
    void OnStartGame();
    void OnOptions();
    void OnQuit();
    
    void BindEvents();
};

// MainMenuComponent.cpp
MainMenuComponent::MainMenuComponent(Rml::Context* context)
    : context_(context), document_(nullptr)
{
}

MainMenuComponent::~MainMenuComponent()
{
    Shutdown();
}

bool MainMenuComponent::Initialize()
{
    if (!LoadDocument("ui/main_menu.rml"))
        return false;
    
    BindEvents();
    
    return true;
}

void MainMenuComponent::Shutdown()
{
    if (document_)
    {
        document_->Close();
        document_ = nullptr;
    }
}

void MainMenuComponent::Show()
{
    if (document_)
        document_->Show(Rml::ModalFlag::Modal, Rml::FocusFlag::Auto);
}

void MainMenuComponent::Hide()
{
    if (document_)
        document_->Hide();
}

void MainMenuComponent::ProcessEvent(Rml::Event& event)
{
    if (event.GetId() == Rml::EventId::Click)
    {
        Rml::String id = event.GetCurrentElement()->GetId();
        
        if (id == "btn-start")
            OnStartGame();
        else if (id == "btn-options")
            OnOptions();
        else if (id == "btn-quit")
            OnQuit();
    }
}

void MainMenuComponent::BindEvents()
{
    Rml::Element* btn_start = FindElement("btn-start");
    Rml::Element* btn_options = FindElement("btn-options");
    Rml::Element* btn_quit = FindElement("btn-quit");
    
    if (btn_start) btn_start->AddEventListener(Rml::EventId::Click, this);
    if (btn_options) btn_options->AddEventListener(Rml::EventId::Click, this);
    if (btn_quit) btn_quit->AddEventListener(Rml::EventId::Click, this);
}

void MainMenuComponent::OnStartGame()
{
    Rml::Log::Message(Rml::Log::LT_INFO, "Start game clicked");
    // 触发游戏开始事件
    Rml::Dictionary params;
    document_->DispatchEvent(Rml::StringId("game_start"), params);
}

void MainMenuComponent::OnOptions()
{
    Rml::Log::Message(Rml::Log::LT_INFO, "Options clicked");
    // 打开选项界面
}

void MainMenuComponent::OnQuit()
{
    Rml::Log::Message(Rml::Log::LT_INFO, "Quit clicked");
    // 退出游戏
}
```

---

## 三、屏幕管理器

### 3.1 屏幕管理器实现

```cpp
// ScreenManager.h
#pragma once
#include <RmlUi/Core/Context.h>
#include <string>
#include <unordered_map>
#include <memory>
#include "UIComponent.h"

class ScreenManager : public Rml::EventListener
{
public:
    static ScreenManager& Instance()
    {
        static ScreenManager instance;
        return instance;
    }

    void Initialize(Rml::Context* context);
    void Shutdown();

    // 注册屏幕
    template<typename T>
    void RegisterScreen(const std::string& name)
    {
        screens_[name] = []() -> std::unique_ptr<UIComponent> {
            return std::make_unique<T>(context_);
        };
    }

    // 显示屏幕
    void ShowScreen(const std::string& name, bool exclusive = false);
    
    // 隐藏屏幕
    void HideScreen(const std::string& name);
    
    // 切换屏幕
    void SwitchScreen(const std::string& name);
    
    // 获取当前屏幕
    UIComponent* GetCurrentScreen() { return current_screen_; }

    // 事件处理
    void ProcessEvent(Rml::Event& event) override;

private:
    ScreenManager() = default;
    
    Rml::Context* context_;
    std::unordered_map<std::string, std::function<std::unique_ptr<UIComponent>()>> screens_;
    std::unordered_map<std::string, std::unique_ptr<UIComponent>> active_screens_;
    UIComponent* current_screen_;
};

// ScreenManager.cpp
void ScreenManager::Initialize(Rml::Context* context)
{
    context_ = context;
    current_screen_ = nullptr;
}

void ScreenManager::Shutdown()
{
    active_screens_.clear();
    current_screen_ = nullptr;
}

void ScreenManager::ShowScreen(const std::string& name, bool exclusive)
{
    auto it = screens_.find(name);
    if (it == screens_.end())
    {
        Rml::Log::Message(Rml::Log::LT_ERROR, "Screen not found: %s", name.c_str());
        return;
    }
    
    // 如果是独占模式，隐藏其他屏幕
    if (exclusive)
    {
        for (auto& pair : active_screens_)
        {
            pair.second->Hide();
        }
        active_screens_.clear();
    }
    
    // 检查屏幕是否已激活
    auto active_it = active_screens_.find(name);
    if (active_it != active_screens_.end())
    {
        active_it->second->Show();
        current_screen_ = active_it->second.get();
        return;
    }
    
    // 创建并初始化屏幕
    auto component = it->second();
    if (!component->Initialize())
    {
        Rml::Log::Message(Rml::Log::LT_ERROR, "Failed to initialize screen: %s", name.c_str());
        return;
    }
    
    component->Show();
    active_screens_[name] = std::move(component);
    current_screen_ = active_screens_[name].get();
}

void ScreenManager::HideScreen(const std::string& name)
{
    auto it = active_screens_.find(name);
    if (it != active_screens_.end())
    {
        it->second->Hide();
    }
}

void ScreenManager::SwitchScreen(const std::string& name)
{
    ShowScreen(name, true);
}

void ScreenManager::ProcessEvent(Rml::Event& event)
{
    // 处理全局事件
    if (event.GetId() == Rml::StringId("screen_close"))
    {
        std::string screen_name = event.GetParameter<std::string>("screen", "");
        HideScreen(screen_name);
    }
    else if (event.GetId() == Rml::StringId("screen_switch"))
    {
        std::string screen_name = event.GetParameter<std::string>("screen", "");
        SwitchScreen(screen_name);
    }
}
```

### 3.2 使用屏幕管理器

```cpp
// App.cpp
#include "ScreenManager.h"
#include "MainMenuComponent.h"
#include "GameUIComponent.h"
#include "SettingsComponent.h"

class App
{
public:
    bool Initialize()
    {
        // 初始化屏幕管理器
        ScreenManager::Instance().Initialize(context_);
        
        // 注册屏幕
        ScreenManager::Instance().RegisterScreen<MainMenuComponent>("main_menu");
        ScreenManager::Instance().RegisterScreen<GameUIComponent>("game_ui");
        ScreenManager::Instance().RegisterScreen<SettingsComponent>("settings");
        
        // 显示主菜单
        ScreenManager::Instance().ShowScreen("main_menu");
        
        return true;
    }

    void OnGameStart()
    {
        // 切换到游戏界面
        ScreenManager::Instance().SwitchScreen("game_ui");
    }

    void OnGamePause()
    {
        // 显示暂停菜单
        ScreenManager::Instance().ShowScreen("pause_menu");
    }
};
```

---

## 四、数据模型架构

### 4.1 MVVM 模式实现

```cpp
// GameViewModel.h
#pragma once
#include <RmlUi/Core/DataModelHandle.h>
#include <RmlUi/Core/Types.h>

class GameViewModel
{
public:
    GameViewModel(Rml::Context* context);
    ~GameViewModel();

    // 数据模型接口
    void Initialize();
    void Update();

    // 数据访问
    int GetScore() const { return score_; }
    int GetLives() const { return lives_; }
    float GetHealth() const { return health_; }
    const Rml::String& GetPlayerName() const { return player_name_; }

    // 数据修改
    void SetScore(int score);
    void SetLives(int lives);
    void SetHealth(float health);
    void SetPlayerName(const Rml::String& name);

private:
    Rml::Context* context_;
    Rml::DataModelHandle data_model_;
    
    // 游戏数据
    int score_;
    int lives_;
    float health_;
    Rml::String player_name_;
    
    // 数据绑定函数
    void GetScore(Rml::Variant& variant);
    void SetScore(const Rml::Variant& variant);
    void GetHealth(Rml::Variant& variant);
    void SetHealth(const Rml::Variant& variant);
};

// GameViewModel.cpp
GameViewModel::GameViewModel(Rml::Context* context)
    : context_(context), score_(0), lives_(3), health_(100.0f)
{
}

GameViewModel::~GameViewModel()
{
    if (data_model_)
    {
        context_->RemoveDataModel("game_data");
    }
}

void GameViewModel::Initialize()
{
    // 创建数据模型
    data_model_ = context_->CreateDataModel("game_data");
    if (!data_model_)
    {
        Rml::Log::Message(Rml::Log::LT_ERROR, "Failed to create data model");
        return;
    }
    
    // 绑定变量
    data_model_->Bind("score", &GameViewModel::GetScore, this);
    data_model_->Bind("score", &GameViewModel::SetScore, this);
    
    data_model_->Bind("lives", &GameViewModel::GetLives, this);
    
    data_model_->Bind("health", &GameViewModel::GetHealth, this);
    data_model_->Bind("health", &GameViewModel::SetHealth, this);
    
    data_model_->Bind("player_name", &GameViewModel::GetPlayerName, this);
    data_model_->Bind("player_name", &GameViewModel::SetPlayerName, this);
}

void GameViewModel::SetScore(int score)
{
    score_ = score;
    data_model_.DirtyVariable("score");
}

void GameViewModel::SetHealth(float health)
{
    health_ = health;
    data_model_.DirtyVariable("health");
}

void GameViewModel::SetPlayerName(const Rml::String& name)
{
    player_name_ = name;
    data_model_.DirtyVariable("player_name");
}

// 在 RML 中使用
/*
<div data-model="game_data">
    <p>Score: {{ score }}</p>
    <p>Lives: {{ lives }}</p>
    <p>Health: {{ health }}%</p>
    <p>Player: {{ player_name }}</p>
    
    <input type="text" data-value="player_name"/>
</div>
*/
```

---

## 五、事件总线

### 5.1 事件总线实现

```cpp
// EventBus.h
#pragma once
#include <RmlUi/Core/Types.h>
#include <functional>
#include <unordered_map>
#include <vector>

class EventBus
{
public:
    static EventBus& Instance()
    {
        static EventBus instance;
        return instance;
    }

    // 订阅事件
    template<typename F>
    void Subscribe(const Rml::String& event_name, F callback)
    {
        subscribers_[event_name].push_back(callback);
    }

    // 发布事件
    void Publish(const Rml::String& event_name, const Rml::Dictionary& params = {})
    {
        auto it = subscribers_.find(event_name);
        if (it != subscribers_.end())
        {
            for (auto& callback : it->second)
            {
                callback(params);
            }
        }
    }

    // 取消订阅
    void Unsubscribe(const Rml::String& event_name)
    {
        subscribers_.erase(event_name);
    }

private:
    EventBus() = default;
    
    using EventCallback = std::function<void(const Rml::Dictionary&)>;
    std::unordered_map<Rml::String, std::vector<EventCallback>> subscribers_;
};

// 使用示例
class GameSystem
{
public:
    void Initialize()
    {
        // 订阅游戏事件
        EventBus::Instance().Subscribe("player_died", 
            [this](const Rml::Dictionary& params) {
                OnPlayerDied();
            });
        
        EventBus::Instance().Subscribe("level_completed",
            [this](const Rml::Dictionary& params) {
                OnLevelCompleted();
            });
    }

    void OnPlayerDied()
    {
        // 显示游戏结束界面
        Rml::Dictionary params;
        params["score"] = current_score_;
        EventBus::Instance().Publish("show_game_over", params);
    }

    void OnLevelCompleted()
    {
        // 显示关卡完成界面
        EventBus::Instance().Publish("show_level_complete", {});
    }

private:
    int current_score_;
};
```

---

## 六、架构最佳实践

### 6.1 分层架构

```
┌─────────────────────────────────────────────────────────────┐
│                     表现层 (Presentation)                    │
│  - UI 组件 (MainMenu, GameUI, Settings)                     │
│  - 屏幕管理器 (ScreenManager)                               │
│  - 事件处理器 (EventHandlers)                               │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                     业务逻辑层 (Business Logic)              │
│  - 游戏系统 (GameSystems)                                  │
│  - 数据模型 (ViewModels)                                    │
│  - 事件总线 (EventBus)                                      │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                     数据层 (Data)                           │
│  - 游戏状态 (GameState)                                     │
│  - 配置数据 (ConfigData)                                    │
│  - 本地化数据 (LocalizationData)                            │
└─────────────────────────────────────────────────────────────┘
```

### 6.2 依赖注入

```cpp
// ServiceLocator.h
#pragma once
#include <memory>
#include <unordered_map>

template<typename T>
class ServiceLocator
{
public:
    static void Register(const std::string& name, std::shared_ptr<T> service)
    {
        services_[name] = service;
    }

    static std::shared_ptr<T> Get(const std::string& name)
    {
        auto it = services_.find(name);
        return it != services_.end() ? it->second : nullptr;
    }

private:
    static std::unordered_map<std::string, std::shared_ptr<T>> services_;
};

// 使用示例
class AudioService
{
public:
    void PlaySound(const std::string& sound_id);
};

// 注册服务
ServiceLocator<AudioService>::Register("audio", std::make_shared<AudioService>());

// 使用服务
auto audio = ServiceLocator<AudioService>::Get("audio");
if (audio)
{
    audio->PlaySound("click");
}
```

---

## 七、实战示例：完整游戏 UI 架构

```cpp
// GameUIArchitecture.h
#pragma once
#include "ScreenManager.h"
#include "GameViewModel.h"
#include "EventBus.h"

class GameUIArchitecture
{
public:
    bool Initialize(Rml::Context* context)
    {
        // 初始化屏幕管理器
        ScreenManager::Instance().Initialize(context);
        
        // 初始化数据模型
        game_view_model_ = std::make_unique<GameViewModel>(context);
        game_view_model_->Initialize();
        
        // 注册屏幕
        RegisterScreens();
        
        // 设置事件监听
        SetupEventListeners();
        
        return true;
    }

    void Update(float delta_time)
    {
        // 更新数据模型
        game_view_model_->Update();
        
        // 更新当前屏幕
        if (auto* screen = ScreenManager::Instance().GetCurrentScreen())
        {
            screen->Update(delta_time);
        }
    }

private:
    void RegisterScreens()
    {
        ScreenManager::Instance().RegisterScreen<MainMenuComponent>("main_menu");
        ScreenManager::Instance().RegisterScreen<GameUIComponent>("game_ui");
        ScreenManager::Instance().RegisterScreen<SettingsComponent>("settings");
        ScreenManager::Instance().RegisterScreen<PauseMenuComponent>("pause_menu");
    }

    void SetupEventListeners()
    {
        EventBus::Instance().Subscribe("game_start",
            [this](const Rml::Dictionary& params) {
                ScreenManager::Instance().SwitchScreen("game_ui");
            });
        
        EventBus::Instance().Subscribe("game_pause",
            [this](const Rml::Dictionary& params) {
                ScreenManager::Instance().ShowScreen("pause_menu");
            });
        
        EventBus::Instance().Subscribe("game_resume",
            [this](const Rml::Dictionary& params) {
                ScreenManager::Instance().HideScreen("pause_menu");
            });
    }

private:
    std::unique_ptr<GameViewModel> game_view_model_;
};
```

---

## 八、实战练习

### 练习 1：设计编辑器 UI 架构

设计一个编辑器的 UI 架构：
- 组件化的工具栏
- 可停靠的面板系统
- 属性检查器
- 场景树视图

### 练习 2：实现多窗口管理

实现一个多窗口管理系统：
- 窗口堆叠管理
- 窗口拖拽和调整大小
- 窗口最小化/最大化

### 练习 3：创建主题系统架构

设计一个主题系统架构：
- 主题切换
- 主题继承
- 动态主题加载

---

## 九、下一步

继续学习 [界面管理](02-interface-management.md) 来掌握更高级的界面管理技巧。

---

## 📝 检查清单

- [ ] 理解常见的架构模式
- [ ] 掌握组件化架构
- [ ] 能够实现屏幕管理器
- [ ] 理解 MVVM 模式在 RmlUi 中的应用
- [ ] 能够实现事件总线
- [ ] 理解分层架构
- [ ] 能够设计完整的 UI 架构