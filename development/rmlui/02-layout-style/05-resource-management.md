# 2.5 资源管理

在开发游戏或应用界面时，有效地管理字体、图片等资源是至关重要的。本节将详细介绍 RmlUi 的资源管理系统。

---

## 一、字体管理

### 1.1 字体加载方式

RmlUi 支持多种字体格式（TTF、OTF、Woff、Woff2），可以通过多种方式加载字体。

#### 在 C++ 中加载字体

```cpp
#include <RmlUi/Core.h>

// 方式 1：加载单个字体文件
bool success = Rml::LoadFontFace("fonts/arial.ttf");

// 方式 2：加载字体并指定fallback
Rml::LoadFontFace("fonts/arial.ttf", true);  // true 表示设为fallback字体

// 方式 3：从内存加载字体
std::string font_data = LoadFileIntoMemory("fonts/arial.ttf");
Rml::FontFaceHandle font_handle = Rml::LoadFontFaceFromMemory(
    reinterpret_cast<const byte*>(font_data.data()),
    font_data.size(),
    "Arial",
    false,
    false
);

// 方式 4：加载字体家族
Rml::LoadFontFace("fonts/roboto-regular.ttf");
Rml::LoadFontFace("fonts/roboto-bold.ttf");
Rml::LoadFontFace("fonts/roboto-italic.ttf");
// RmlUi 会自动识别并归类到同一个字体家族
```

#### 在 RCSS 中引用字体

```css
/* 使用 @font-face 定义自定义字体 */
@font-face {
    font-family: "MyCustomFont";
    src: url("fonts/myfont.ttf");
}

@font-face {
    font-family: "MyCustomFont";
    src: url("fonts/myfont-bold.ttf");
    font-weight: bold;
}

@font-face {
    font-family: "MyCustomFont";
    src: url("fonts/myfont-italic.ttf");
    font-style: italic;
}

/* 使用字体 */
body {
    font-family: "MyCustomFont", Arial, sans-serif;
}
```

### 1.2 字体图标（Icon Font）

字体图标是游戏 UI 中常用的技术，可以将图标作为字体字符使用。

```css
/* 加载图标字体 */
@font-face {
    font-family: "GameIcons";
    src: url("fonts/game-icons.ttf");
}

/* 定义图标类 */
.icon-health::before {
    content: "\e001";  /* Unicode 编码 */
    font-family: "GameIcons";
    color: #e74c3c;
}

.icon-mana::before {
    content: "\e002";
    font-family: "GameIcons";
    color: #3498db;
}

.icon-gold::before {
    content: "\e003";
    font-family: "GameIcons";
    color: #f1c40f;
}
```

```xml
<!-- 使用图标 -->
<div class="stat-row">
    <span class="icon-health"></span>
    <span class="value">100/100</span>
</div>
```

### 1.3 中文字体处理

中文字体文件通常很大（几 MB 到几十 MB），建议：

1. **使用系统字体**：让 RmlUi 回退到系统默认中文字体
2. **字体子集化**：只包含游戏中实际用到的汉字
3. **使用在线字体服务**：动态加载所需字符

```cpp
// 设置 fallback 字体链
Rml::LoadFontFace("fonts/latin.ttf", false);
Rml::LoadFontFace("fonts/noto-sans-cjk.ttf", true);  // 作为 fallback
```

```css
/* 字体栈：优先使用自定义字体，回退到系统字体 */
body {
    font-family: "MyFont", "Noto Sans CJK SC", "Microsoft YaHei", sans-serif;
}
```

---

## 二、图片资源管理

### 2.1 基本图片加载

RmlUi 支持常见的图片格式（PNG、JPG、TGA、BMP、DDS 等）。

```xml
<!-- 基本图片 -->
<img src="images/logo.png"/>

<!-- 带尺寸的图片 -->
<img src="images/background.jpg" style="width: 800px; height: 600px;"/>

<!-- 使用 object-fit 控制缩放行为 -->
<img src="images/avatar.jpg" style="width: 64px; height: 64px; object-fit: cover;"/>
```

### 2.2 图片作为背景

```css
/* 背景图片 */
.panel {
    background-image: url(images/panel-bg.png);
    background-repeat: no-repeat;
    background-size: cover;
}

/* 九宫格切图（用于可拉伸的边框） */
.window {
    background-image: url(images/window-frame.9.png);
    background-slice: 10px 10px 10px 10px;  /* 上右下左 */
}

/* 平铺背景 */
.tiled-bg {
    background-image: url(images/pattern.png);
    background-repeat: repeat;
}
```

### 2.3 图片预加载

为了避免运行时首次加载的延迟，可以预加载图片。

```cpp
class ResourceManager
{
public:
    // 预加载图片
    void PreloadImages()
    {
        const std::vector<std::string> images = {
            "images/logo.png",
            "images/background.jpg",
            "images/button-hover.png",
            "images/button-pressed.png"
        };

        for (const auto& path : images)
        {
            // 调用 GetTexture 会触发加载
            Rml::TextureResource* resource = Rml::TextureResource::Get(path);
            if (resource)
            {
                resource->EnableKeepMemoryAlive();  // 保持内存中的引用
            }
        }
    }

    // 预加载整个目录
    void PreloadDirectory(const std::string& directory)
    {
        // 使用文件接口列出目录
        Rml::FileInterface* file_interface = Rml::GetFileInterface();
        // ... 实现目录遍历和批量加载
    }
};
```

---

## 三、精灵图（Sprite Sheet）

精灵图将多个小图标合并为一张大图，减少绘制调用并提高性能。

### 3.1 定义精灵图

首先，在 RCSS 中定义精灵图：

```css
/* 定义精灵图容器 */
@sprite-sheet "ui-icons" {
    src: url("images/icons-sprite.png");
    sprite-size: 32px 32px;      /* 每个精灵的尺寸 */
    frames: 8 8;                 /* 8x8 网格 */
}

/* 或者手动定义每个精灵 */
@sprite "icon-play" {
    src: url("images/icons-sprite.png");
    rect: 0px 0px 32px 32px;     /* left top right bottom */
}

@sprite "icon-pause" {
    src: url("images/icons-sprite.png");
    rect: 32px 0px 64px 32px;
}

@sprite "icon-stop" {
    src: url("images/icons-sprite.png");
    rect: 64px 0px 96px 32px;
}
```

### 3.2 使用精灵图

```xml
<!-- 使用精灵 -->
<div class="icon-play"></div>
<div class="icon-pause"></div>
<div class="icon-stop"></div>

<!-- 或者作为背景 -->
<button class="play-button">
    <span class="icon-play"></span>
    播放
</button>
```

```css
/* 精灵作为背景 */
.icon-play {
    display: inline-block;
    width: 32px;
    height: 32px;
    background-image: url("images/icons-sprite.png");
    background-position: 0px 0px;
}

.icon-pause {
    display: inline-block;
    width: 32px;
    height: 32px;
    background-image: url("images/icons-sprite.png");
    background-position: -32px 0px;
}
```

### 3.3 使用工具生成精灵图

推荐使用工具自动生成精灵图和相关配置：

- **TexturePacker**: 商业软件，功能强大
- **ShoeBox**: 免费工具
- **spritesheet.js**: Node.js 命令行工具

生成后，可以编写脚本自动生成 RCSS 的 `@sprite` 定义。

---

## 四、资源打包与虚拟化

### 4.1 自定义文件接口

游戏通常使用打包文件（如 ZIP、自定义格式），需要实现自定义的 `FileInterface`。

```cpp
#include <RmlUi/Core.h>
#include <physfs.h>  // 使用 PhysicsFS 读取 ZIP/打包文件

class PhysFSFileInterface : public Rml::FileInterface
{
public:
    // 打开文件
    Rml::FileHandle Open(const Rml::String& path) override
    {
        PHYSFS_File* file = PHYSFS_openRead(path.c_str());
        return reinterpret_cast<Rml::FileHandle>(file);
    }

    // 关闭文件
    void Close(Rml::FileHandle file) override
    {
        PHYSFS_File* physfs_file = reinterpret_cast<PHYSFS_File*>(file);
        PHYSFS_close(physfs_file);
    }

    // 读取文件
    size_t Read(void* buffer, size_t size, Rml::FileHandle file) override
    {
        PHYSFS_File* physfs_file = reinterpret_cast<PHYSFS_File*>(file);
        return PHYSFS_read(physfs_file, buffer, 1, size);
    }

    // 获取文件大小
    size_t Length(Rml::FileHandle file) override
    {
        PHYSFS_File* physfs_file = reinterpret_cast<PHYSFS_File*>(file);
        return PHYSFS_fileLength(physfs_file);
    }

    // 设置目录（用于相对路径）
    bool SetDirectory(const Rml::String& path) override
    {
        return PHYSFS_mount(path.c_str(), nullptr, 0) != 0;
    }
};

// 初始化
void InitRmlUi()
{
    Rml::SetFileInterface(new PhysFSFileInterface());

    // 初始化 PhysicsFS 并挂载打包文件
    PHYSFS_init(nullptr);
    PHYSFS_mount("ui.zip", nullptr, 0);
}
```

### 4.2 虚拟文件系统

对于复杂的项目，可以实现虚拟路径系统：

```cpp
class VirtualFileSystem
{
public:
    void Mount(const std::string& virtual_path, const std::string& physical_path)
    {
        mounts_[virtual_path] = physical_path;
    }

    std::string ResolvePath(const std::string& path)
    {
        // 解析虚拟路径到物理路径
        // 例如："ui:images/logo.png" -> "assets/ui/images/logo.png"
        for (const auto& [prefix, base_path] : mounts_)
        {
            if (path.find(prefix + ":") == 0)
            {
                return base_path + "/" + path.substr(prefix.length() + 1);
            }
        }
        return path;
    }

private:
    std::unordered_map<std::string, std::string> mounts_;
};

// 使用
VirtualFileSystem vfs;
vfs.Mount("ui", "assets/ui");
vfs.Mount("fonts", "assets/fonts");
vfs.Mount("images", "assets/images");

// 在 RML 中可以使用：
// <img src="ui:images/logo.png"/>
```

---

## 五、资源缓存与优化

### 5.1 纹理缓存

```cpp
class TextureCache
{
public:
    // 获取或加载纹理
    Rml::TextureResource* GetTexture(const std::string& path)
    {
        auto it = cache_.find(path);
        if (it != cache_.end())
        {
            return it->second.get();
        }

        // 加载新纹理
        Rml::TextureResource* texture = Rml::TextureResource::Get(path);
        if (texture)
        {
            cache_[path] = std::shared_ptr<Rml::TextureResource>(texture);
        }
        return texture;
    }

    // 清除未使用的纹理
    void ClearUnused()
    {
        for (auto it = cache_.begin(); it != cache_.end();)
        {
            if (it->second.use_count() == 1)
            {
                it = cache_.erase(it);
            }
            else
            {
                ++it;
            }
        }
    }

private:
    std::unordered_map<std::string, std::shared_ptr<Rml::TextureResource>> cache_;
};
```

### 5.2 资源释放策略

```cpp
class ResourceManager
{
public:
    // 内存紧张时释放资源
    void OnLowMemory()
    {
        // 1. 释放字体缓存
        Rml::FlushFontCache();

        // 2. 释放未使用的纹理
        texture_cache_.ClearUnused();

        // 3. 强制垃圾回收
        Rml::GarbageCollect();
    }

    // 切换到新场景时清理
    void OnSceneChange()
    {
        // 保留常用资源
        KeepEssentialResources();

        // 清除场景相关资源
        ClearSceneResources();
    }

private:
    TextureCache texture_cache_;

    void KeepEssentialResources()
    {
        // 保留基础 UI 资源
    }

    void ClearSceneResources()
    {
        // 清除当前场景的资源
    }
};
```

---

## 六、实战：完整资源管理系统

### 6.1 资源管理器设计

```cpp
// UIManager.h
#pragma once
#include <RmlUi/Core.h>
#include <unordered_map>
#include <memory>

class UIManager
{
public:
    static UIManager& Instance()
    {
        static UIManager instance;
        return instance;
    }

    // 初始化
    bool Initialize()
    {
        // 1. 设置文件接口
        file_interface_ = std::make_unique<GameFileInterface>();
        Rml::SetFileInterface(file_interface_.get());

        // 2. 加载字体
        if (!LoadFonts())
            return false;

        // 3. 预加载资源
        PreloadResources();

        return true;
    }

    // 加载字体
    bool LoadFonts()
    {
        // 基础字体
        if (!Rml::LoadFontFace("fonts/arial.ttf", true))
            return false;

        // 中文字体
        Rml::LoadFontFace("fonts/noto-sans-cjk.ttf", true);

        // 图标字体
        Rml::LoadFontFace("fonts/game-icons.ttf");

        return true;
    }

    // 预加载资源
    void PreloadResources()
    {
        // UI 背景
        Rml::TextureResource::Get("textures/ui/panel-bg.png");
        Rml::TextureResource::Get("textures/ui/button-normal.png");
        Rml::TextureResource::Get("textures/ui/button-hover.png");
        Rml::TextureResource::Get("textures/ui/button-pressed.png");

        // 图标
        Rml::TextureResource::Get("textures/icons/health.png");
        Rml::TextureResource::Get("textures/icons/mana.png");
        Rml::TextureResource::Get("textures/icons/gold.png");
    }

    // 创建上下文
    Rml::Context* CreateContext(const std::string& name, int width, int height)
    {
        return Rml::CreateContext(name.c_str(), Rml::Vector2i(width, height));
    }

private:
    UIManager() = default;
    std::unique_ptr<GameFileInterface> file_interface_;
};
```

---

## 七、实践练习

### 练习 1：创建字体加载模块

编写一个字体加载模块，支持：
- 从配置文件读取字体列表
- 自动识别字体家族（Regular、Bold、Italic）
- 设置 fallback 字体链

### 练习 2：实现精灵图工具

编写脚本自动生成精灵图的 RCSS 定义：
- 输入：目录中的多个小图标
- 输出：合并后的精灵图 + RCSS 定义文件

### 练习 3：资源打包

创建一个简单的打包工具：
- 将 RML、RCSS、图片文件打包到 ZIP
- 实现自定义 FileInterface 读取 ZIP

---

## 📝 检查清单

- [ ] 理解字体加载的多种方式
- [ ] 能够处理中文字体和图标字体
- [ ] 掌握图片资源的加载和管理
- [ ] 理解精灵图的概念和使用方法
- [ ] 能够实现自定义文件接口
- [ ] 了解资源缓存和释放策略

---

下一节：[响应式设计](06-responsive-design.md) - 学习如何创建适配不同屏幕尺寸的界面。
