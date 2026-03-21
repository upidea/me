# 5.4 插件开发

插件（Plugins）是 RmlUi 扩展机制的核心，允许你封装可重用的功能模块、自定义控件库或系统集成。本节将深入讲解如何创建生产级别的 RmlUi 插件。

---

## 一、Plugin 接口

### 1.1 Plugin 类结构

```cpp
class Plugin {
public:
    virtual ~Plugin() = default;
    
    // 初始化插件
    virtual void Initialise() = 0;
    
    // 关闭插件
    virtual void Shutdown() = 0;
    
    // 获取事件监听器（可选）
    virtual EventListener* GetEventListener() = 0;
    
    // 获取插件名称
    virtual String GetName() const = 0;
    
    // 获取插件版本
    virtual int GetVersion() const = 0;
};
```

### 1.2 插件生命周期

```
应用程序启动
    ↓
RegisterPlugin() 注册插件
    ↓
OnInitialise() 调用 Initialise()
    ↓
主循环运行
    ↓
GetEventListener() 处理事件（如果提供）
    ↓
应用程序关闭
    ↓
Shutdown() 调用 Shutdown()
    ↓
插件卸载
```

---

## 二、创建自定义控件插件

### 2.1 完整实现

```cpp
// CustomControlsPlugin.h
#pragma once
#include <RmlUi/Core/Plugin.h>
#include <RmlUi/Core/EventListener.h>

class CustomControlsPlugin : public Rml::Plugin, public Rml::EventListener
{
public:
    CustomControlsPlugin();
    virtual ~CustomControlsPlugin();

    // Plugin 接口
    void Initialise() override;
    void Shutdown() override;
    Rml::EventListener* GetEventListener() override;
    Rml::String GetName() const override { return "CustomControls"; }
    int GetVersion() const override { return 1; }

    // EventListener 接口
    void ProcessEvent(Rml::Event& event) override;

private:
    void RegisterCustomElements();
    void RegisterCustomDecorators();
    void RegisterEventHandlers();
};

// CustomProgressBar.h
#pragma once
#include <RmlUi/Core/Element.h>

class ElementCustomProgressBar : public Rml::Element
{
public:
    RMLUI_RTTI_DefineWithParent(ElementCustomProgressBar, Rml::Element)
    ElementCustomProgressBar(const Rml::String& tag);
    
    void SetValue(float value);
    float GetValue() const;

private:
    float value_;
    void OnRender() override;
};

// ElementInstancerCustomProgressBar
class ElementInstancerCustomProgressBar : public Rml::ElementInstancer
{
public:
    Rml::ElementPtr InstanceElement(
        Rml::Element* parent,
        const Rml::String& tag,
        const Rml::XMLAttributes& attributes) override;
    
    void ReleaseElement(Rml::Element* element) override;
};
```

```cpp
// CustomControlsPlugin.cpp
#include "CustomControlsPlugin.h"
#include "CustomProgressBar.h"
#include <RmlUi/Core/Core.h>
#include <RmlUi/Core/Factory.h>
#include <RmlUi/Core/ElementDocument.h>

// ========== CustomControlsPlugin 实现 ==========

CustomControlsPlugin::CustomControlsPlugin()
{
}

CustomControlsPlugin::~CustomControlsPlugin()
{
}

void CustomControlsPlugin::Initialise()
{
    Rml::Log::Message(Rml::Log::LT_INFO, "Initializing CustomControls plugin");
    
    // 注册自定义元素
    RegisterCustomElements();
    
    // 注册自定义装饰器
    RegisterCustomDecorators();
    
    // 注册事件处理器
    RegisterEventHandlers();
    
    Rml::Log::Message(Rml::Log::LT_INFO, "CustomControls plugin initialized");
}

void CustomControlsPlugin::Shutdown()
{
    Rml::Log::Message(Rml::Log::LT_INFO, "Shutting down CustomControls plugin");
    
    // 清理资源
    // RmlUi 会自动处理元素和装饰器的注销
}

Rml::EventListener* CustomControlsPlugin::GetEventListener()
{
    return this;
}

void CustomControlsPlugin::ProcessEvent(Rml::Event& event)
{
    // 处理全局事件
    if (event.GetId() == Rml::EventId::Load)
    {
        Rml::ElementDocument* doc = static_cast<Rml::ElementDocument*>(event.GetTargetElement());
        Rml::Log::Message(Rml::Log::LT_INFO, "Document loaded: %s", doc->GetTitle().c_str());
    }
}

void CustomControlsPlugin::RegisterCustomElements()
{
    Rml::Factory* factory = Rml::Factory::Instance();
    
    // 注册自定义进度条
    auto progress_bar_instancer = std::make_unique<ElementInstancerCustomProgressBar>();
    factory->RegisterElementInstancer("progressbar", std::move(progress_bar_instancer));
    
    // 注册更多自定义元素...
}

void CustomControlsPlugin::RegisterCustomDecorators()
{
    Rml::Factory* factory = Rml::Factory::Instance();
    
    // 注册自定义装饰器
    // auto decorator_instancer = std::make_unique<DecoratorInstancerCustom>();
    // factory->RegisterDecoratorInstancer("custom-decorator", std::move(decorator_instancer));
}

void CustomControlsPlugin::RegisterEventHandlers()
{
    // 注册全局事件处理器
}

// ========== ElementCustomProgressBar 实现 ==========

ElementCustomProgressBar::ElementCustomProgressBar(const Rml::String& tag)
    : Rml::Element(tag), value_(0.0f)
{
    SetProperty(Rml::PropertyId::Display, Rml::Style::Display::Block);
    SetProperty(Rml::PropertyId::Width, Rml::Property(200.0f, Rml::Unit::DP));
    SetProperty(Rml::PropertyId::Height, Rml::Property(20.0f, Rml::Unit::DP));
}

void ElementCustomProgressBar::SetValue(float value)
{
    value_ = Rml::Math::Clamp(value, 0.0f, 100.0f);
}

float ElementCustomProgressBar::GetValue() const
{
    return value_;
}

void ElementCustomProgressBar::OnRender()
{
    if (auto* render_manager = GetRenderManager())
    {
        Rml::Rectangle box = GetBox().GetEdge(Rml::BoxArea::Border);
        
        // 背景
        render_manager->RenderGeometry(
            Rml::Vertex::CreateRect(box, Rml::Colourb(44, 62, 80, 255)),
            Rml::Rectangle::GetIndices(),
            {},
            Rml::Matrix4f::Identity()
        );
        
        // 进度
        float progress_width = box.Width() * (value_ / 100.0f);
        Rml::Rectangle progress_rect = box;
        progress_rect.right = progress_rect.left + progress_width;
        
        render_manager->RenderGeometry(
            Rml::Vertex::CreateRect(progress_rect, Rml::Colourb(52, 152, 219, 255)),
            Rml::Rectangle::GetIndices(),
            {},
            Rml::Matrix4f::Identity()
        );
    }
}

// ========== ElementInstancerCustomProgressBar 实现 ==========

Rml::ElementPtr ElementInstancerCustomProgressBar::InstanceElement(
    Rml::Element* parent,
    const Rml::String& tag,
    const Rml::XMLAttributes& attributes)
{
    auto element = Rml::MakeShared<ElementCustomProgressBar>(tag);
    
    for (const auto& attr : attributes)
    {
        if (attr.first.Get() == "value")
        {
            element->SetValue(attr.second.Get<float>());
        }
    }
    
    return element;
}

void ElementInstancerCustomProgressBar::ReleaseElement(Rml::Element* element)
{
    // 使用智能指针自动管理
}
```

### 2.2 注册插件

```cpp
// main.cpp
#include "CustomControlsPlugin.h"
#include <RmlUi/Core/Core.h>

int main()
{
    // 初始化 RmlUi
    Rml::Initialise();
    
    // 注册插件
    CustomControlsPlugin* plugin = new CustomControlsPlugin();
    Rml::RegisterPlugin(plugin);
    
    // 插件会自动初始化
    // ...
    
    // 关闭时插件会自动清理
    Rml::Shutdown();
    return 0;
}
```

---

## 三、创建系统集成插件

### 3.1 音频系统插件

```cpp
// AudioPlugin.h
#pragma once
#include <RmlUi/Core/Plugin.h>
#include <RmlUi/Core/EventListener.h>
#include <unordered_map>
#include <string>

class AudioPlugin : public Rml::Plugin, public Rml::EventListener
{
public:
    AudioPlugin();
    virtual ~AudioPlugin();

    void Initialise() override;
    void Shutdown() override;
    Rml::EventListener* GetEventListener() override;
    Rml::String GetName() const override { return "AudioSystem"; }
    int GetVersion() const override { return 1; }

    void ProcessEvent(Rml::Event& event) override;

    // 音频控制接口
    void PlaySound(const Rml::String& sound_id);
    void PlayMusic(const Rml::String& music_id, bool loop = true);
    void StopMusic();
    void SetVolume(float volume);

private:
    void RegisterAudioFunctions();
    void LoadAudioFiles();

    struct AudioClip {
        void* handle;
        float volume;
    };

    std::unordered_map<Rml::String, AudioClip> sounds_;
    std::unordered_map<Rml::String, AudioClip> music_;
    float master_volume_;
    bool initialized_;
};
```

```cpp
// AudioPlugin.cpp
#include "AudioPlugin.h"
#include <RmlUi/Core/Core.h>
#include <RmlUi/Core/Context.h>
#include <RmlUi/Core/ElementDocument.h>

AudioPlugin::AudioPlugin()
    : master_volume_(1.0f)
    , initialized_(false)
{
}

AudioPlugin::~AudioPlugin()
{
}

void AudioPlugin::Initialise()
{
    Rml::Log::Message(Rml::Log::LT_INFO, "Initializing Audio plugin");
    
    // 初始化音频系统
    // 这里集成实际的音频库（如 FMOD, SDL_mixer 等）
    initialized_ = true;
    
    // 加载音频文件
    LoadAudioFiles();
    
    // 注册音频函数到 RML
    RegisterAudioFunctions();
    
    Rml::Log::Message(Rml::Log::LT_INFO, "Audio plugin initialized");
}

void AudioPlugin::Shutdown()
{
    Rml::Log::Message(Rml::Log::LT_INFO, "Shutting down Audio plugin");
    
    // 清理音频资源
    sounds_.clear();
    music_.clear();
    
    // 关闭音频系统
    initialized_ = false;
}

Rml::EventListener* AudioPlugin::GetEventListener()
{
    return this;
}

void AudioPlugin::ProcessEvent(Rml::Event& event)
{
    // 处理音频相关事件
    if (event.GetId() == Rml::StringId("play_sound"))
    {
        Rml::String sound_id = event.GetParameter<Rml::String>("sound_id", "");
        PlaySound(sound_id);
    }
}

void AudioPlugin::PlaySound(const Rml::String& sound_id)
{
    auto it = sounds_.find(sound_id);
    if (it != sounds_.end())
    {
        // 播放音效
        // audio_system->PlaySound(it->second.handle);
    }
}

void AudioPlugin::PlayMusic(const Rml::String& music_id, bool loop)
{
    auto it = music_.find(music_id);
    if (it != music_.end())
    {
        // 播放音乐
        // audio_system->PlayMusic(it->second.handle, loop);
    }
}

void AudioPlugin::StopMusic()
{
    // 停止音乐
}

void AudioPlugin::SetVolume(float volume)
{
    master_volume_ = Rml::Math::Clamp(volume, 0.0f, 1.0f);
}

void AudioPlugin::RegisterAudioFunctions()
{
    // 注册全局函数
    // 注意：需要实现自定义脚本接口
}

void AudioPlugin::LoadAudioFiles()
{
    // 加载音频文件
    // sounds_["click"] = {"click.wav", 1.0f};
    // sounds_["hover"] = {"hover.wav", 0.8f};
    // music_["background"] = {"background.mp3", 0.5f};
}
```

### 3.2 数据持久化插件

```cpp
// StoragePlugin.h
#pragma once
#include <RmlUi/Core/Plugin.h>
#include <RmlUi/Core/EventListener.h>
#include <RmlUi/Core/Variant.h>
#include <unordered_map>

class StoragePlugin : public Rml::Plugin, public Rml::EventListener
{
public:
    StoragePlugin();
    virtual ~StoragePlugin();

    void Initialise() override;
    void Shutdown() override;
    Rml::EventListener* GetEventListener() override;
    Rml::String GetName() const override { return "Storage"; }
    int GetVersion() const override { return 1; }

    void ProcessEvent(Rml::Event& event) override;

    // 存储接口
    void Set(const Rml::String& key, const Rml::Variant& value);
    Rml::Variant Get(const Rml::String& key, const Rml::Variant& default_value = Rml::Variant());
    void Remove(const Rml::String& key);
    void Clear();
    void SaveToFile(const Rml::String& filename);
    void LoadFromFile(const Rml::String& filename);

private:
    void RegisterStorageFunctions();

    std::unordered_map<Rml::String, Rml::Variant> storage_;
};
```

---

## 四、插件通信

### 4.1 插件间通信

```cpp
// PluginManager.h
#pragma once
#include <RmlUi/Core/Plugin.h>
#include <functional>
#include <unordered_map>

class PluginManager
{
public:
    static PluginManager& Instance()
    {
        static PluginManager instance;
        return instance;
    }

    // 注册插件
    void RegisterPlugin(Rml::Plugin* plugin)
    {
        plugins_[plugin->GetName()] = plugin;
    }

    // 获取插件
    Rml::Plugin* GetPlugin(const Rml::String& name)
    {
        auto it = plugins_.find(name);
        return it != plugins_.end() ? it->second : nullptr;
    }

    // 事件总线
    template<typename... Args>
    void Emit(const Rml::String& event_name, Args... args)
    {
        auto it = event_handlers_.find(event_name);
        if (it != event_handlers_.end())
        {
            for (auto& handler : it->second)
            {
                handler(args...);
            }
        }
    }

    // 注册事件处理器
    template<typename F>
    void On(const Rml::String& event_name, F handler)
    {
        event_handlers_[event_name].push_back(handler);
    }

private:
    PluginManager() = default;
    std::unordered_map<Rml::String, Rml::Plugin*> plugins_;
    std::unordered_map<Rml::String, std::vector<std::function<void()>>> event_handlers_;
};

// 使用示例
class AudioPlugin : public Rml::Plugin
{
public:
    void Initialise() override
    {
        // 注册事件处理器
        PluginManager::Instance().On("game_pause", [this]() {
            PauseMusic();
        });

        PluginManager::Instance().On("game_resume", [this]() {
            ResumeMusic();
        });
    }

private:
    void PauseMusic();
    void ResumeMusic();
};
```

---

## 五、插件配置

### 5.1 配置文件

```json
{
    "plugins": {
        "CustomControls": {
            "enabled": true,
            "version": "1.0.0"
        },
        "AudioSystem": {
            "enabled": true,
            "volume": 0.8,
            "sound_path": "audio/sounds/",
            "music_path": "audio/music/"
        },
        "Storage": {
            "enabled": true,
            "save_path": "save/"
        }
    }
}
```

### 5.2 加载配置

```cpp
// PluginConfigLoader.h
#pragma once
#include <RmlUi/Core/Types.h>
#include <RmlUi/Core/Variant.h>

class PluginConfigLoader
{
public:
    static bool LoadConfig(const Rml::String& filename)
    {
        // 加载 JSON 配置文件
        // 解析并启用/禁用插件
        return true;
    }

    static Rml::Variant GetPluginConfig(const Rml::String& plugin_name)
    {
        // 返回插件配置
        return Rml::Variant();
    }
};
```

---

## 六、最佳实践

### 6.1 错误处理

```cpp
void Plugin::Initialise()
{
    try
    {
        // 初始化代码
        if (!InitializeInternal())
        {
            Rml::Log::Message(Rml::Log::LT_ERROR, 
                "Plugin initialization failed: %s", GetName().c_str());
            throw std::runtime_error("Initialization failed");
        }
    }
    catch (const std::exception& e)
    {
        Rml::Log::Message(Rml::Log::LT_ERROR, 
            "Plugin exception: %s", e.what());
        throw;
    }
}
```

### 6.2 资源管理

```cpp
class Plugin
{
private:
    std::vector<std::unique_ptr<Rml::ElementInstancer>> instancers_;
    std::vector<std::unique_ptr<Rml::DecoratorInstancer>> decorator_instancers_;

    void RegisterCustomElements()
    {
        auto instancer = std::make_unique<MyElementInstancer>();
        Rml::Factory::Instance()->RegisterElementInstancer("my-element", instancer.get());
        instancers_.push_back(std::move(instancer));
    }

    void Shutdown()
    {
        // 清理资源
        instancers_.clear();
        decorator_instancers_.clear();
    }
};
```

### 6.3 性能考虑

```cpp
class Plugin
{
private:
    bool enable_profiling_;
    double last_update_time_;
    double total_update_time_;

    void Update()
    {
        double start_time = Rml::GetSystemInterface()->GetElapsedTime();
        
        // 更新逻辑
        
        double end_time = Rml::GetSystemInterface()->GetElapsedTime();
        total_update_time_ += (end_time - start_time);
        
        if (enable_profiling_ && total_update_time_ > 1.0)
        {
            Rml::Log::Message(Rml::Log::LT_INFO, 
                "Plugin %s update time: %.3f ms", 
                GetName().c_str(), total_update_time_ * 1000);
            total_update_time_ = 0;
        }
    }
};
```

---

## 七、完整示例：游戏 UI 插件

```cpp
// GameUIPlugin.h
#pragma once
#include <RmlUi/Core/Plugin.h>
#include <RmlUi/Core/EventListener.h>

class GameUIPlugin : public Rml::Plugin, public Rml::EventListener
{
public:
    GameUIPlugin();
    virtual ~GameUIPlugin();

    void Initialise() override;
    void Shutdown() override;
    Rml::EventListener* GetEventListener() override;
    Rml::String GetName() const override { return "GameUI"; }
    int GetVersion() const override { return 1; }

    void ProcessEvent(Rml::Event& event) override;

private:
    void RegisterGameElements();
    void RegisterGameDecorators();
    void SetupGameEventHandlers();
};

// GameHealthBar.h
class ElementGameHealthBar : public Rml::Element
{
public:
    RMLUI_RTTI_DefineWithParent(ElementGameHealthBar, Rml::Element)
    ElementGameHealthBar(const Rml::String& tag);
    
    void SetHealth(float current, float max);
    void SetShield(float current, float max);

private:
    float health_;
    float max_health_;
    float shield_;
    float max_shield_;
    
    void OnRender() override;
};

// GameUIPlugin.cpp
#include "GameUIPlugin.h"
#include "GameHealthBar.h"
#include <RmlUi/Core/Core.h>
#include <RmlUi/Core/Factory.h>

GameUIPlugin::GameUIPlugin()
{
}

GameUIPlugin::~GameUIPlugin()
{
}

void GameUIPlugin::Initialise()
{
    Rml::Log::Message(Rml::Log::LT_INFO, "Initializing GameUI plugin");
    
    RegisterGameElements();
    RegisterGameDecorators();
    SetupGameEventHandlers();
    
    Rml::Log::Message(Rml::Log::LT_INFO, "GameUI plugin initialized");
}

void GameUIPlugin::Shutdown()
{
    Rml::Log::Message(Rml::Log::LT_INFO, "Shutting down GameUI plugin");
}

Rml::EventListener* GameUIPlugin::GetEventListener()
{
    return this;
}

void GameUIPlugin::ProcessEvent(Rml::Event& event)
{
    if (event.GetId() == Rml::StringId("player_health_changed"))
    {
        float health = event.GetParameter<float>("health", 0);
        float max_health = event.GetParameter<float>("max_health", 100);
        
        // 更新所有生命值条
        auto health_bars = event.GetTargetElement()->GetElementsByTagName("healthbar");
        for (size_t i = 0; i < health_bars.size(); i++)
        {
            auto* bar = dynamic_cast<ElementGameHealthBar*>(health_bars[i]);
            if (bar)
            {
                bar->SetHealth(health, max_health);
            }
        }
    }
}

void GameUIPlugin::RegisterGameElements()
{
    Rml::Factory* factory = Rml::Factory::Instance();
    
    auto health_bar_instancer = std::make_unique<ElementInstancerGeneric<ElementGameHealthBar>>();
    factory->RegisterElementInstancer("healthbar", std::move(health_bar_instancer));
}

void GameUIPlugin::RegisterGameDecorators()
{
    // 注册游戏特有的装饰器
}

void GameUIPlugin::SetupGameEventHandlers()
{
    // 设置游戏事件处理器
}

// ElementGameHealthBar 实现
ElementGameHealthBar::ElementGameHealthBar(const Rml::String& tag)
    : Rml::Element(tag), health_(100), max_health_(100), shield_(0), max_shield_(50)
{
}

void ElementGameHealthBar::SetHealth(float current, float max)
{
    health_ = current;
    max_health_ = max;
}

void ElementGameHealthBar::SetShield(float current, float max)
{
    shield_ = current;
    max_shield_ = max;
}

void ElementGameHealthBar::OnRender()
{
    // 渲染生命值和护盾
    // 实现省略...
}
```

---

## 八、实战练习

### 练习 1：创建动画插件

实现一个动画插件，支持：
- 预定义动画库
- 动画序列控制
- 动画事件回调

### 练习 2：创建网络插件

实现一个网络插件，支持：
- HTTP 请求
- WebSocket 连接
- 实时数据更新

### 练习 3：创建调试插件

实现一个调试插件，支持：
- 性能监控
- 内存分析
- 界面调试工具

---

## 九、下一步

继续学习 [SVG 集成](05-svg-integration.md) 或 [Lottie 动画](06-lottie-animation.md)。

---

## 📝 检查清单

- [ ] 理解 Plugin 接口
- [ ] 能够创建基础插件
- [ ] 能够注册自定义元素和装饰器
- [ ] 理解插件生命周期
- [ ] 能够实现插件间通信
- [ ] 理解插件配置管理
- [ ] 能够创建生产级别的插件