# 1.5 基本集成

本节将指导你完成 RmlUi 在项目中的基本集成，从零开始创建一个可运行的应用。

---

## 一、項目結構

建议的项目结构：

```
MyProject/
├── CMakeLists.txt
├── src/
│   ├── main.cpp
│   ├── App.h
│   └── App.cpp
├── data/
│   ├── fonts/
│   │   └── LatoLatin-Regular.ttf
│   ├── rml/
│   │   └── menu.rml
│   └── rcss/
│       └── menu.rcss
└── Build/
```

---

## 二、CMake 配置

### CMakeLists.txt

```cmake
cmake_minimum_required(VERSION 3.16)
project(MyRmlUiApp VERSION 1.0 LANGUAGES CXX)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

# 查找 RmlUi 包
find_package(RmlUi 4.0 CONFIG REQUIRED)

# 创建可执行文件
add_executable(MyApp
    src/main.cpp
    src/App.cpp
)

# 链接 RmlUi 库
target_link_libraries(MyApp PRIVATE
    Rml::Core
    Rml::Debugger      # 可选：调试工具
)

# 如果需要后端（推荐初学者使用）
# 你可以选择使用 RmlUi 内置的后端或自己实现
target_link_libraries(MyApp PRIVATE
    Rml::Backend_GLFW_GL3  # 如果使用 GLFW+OpenGL3 后端
)

# 复制资源文件到构建目录
add_custom_command(TARGET MyApp POST_BUILD
    COMMAND ${CMAKE_COMMAND} -E copy_directory
    ${CMAKE_SOURCE_DIR}/data
    $<TARGET_FILE_DIR:MyApp>/data
)
```

---

## 三、代码实现

### 1. 最小化示例（使用后端）

```cpp
// main.cpp
#include <RmlUi/Core.h>
#include <RmlUi/Debugger.h>
#include <RmlUi_Backend.h>

#if defined RMLUI_PLATFORM_WIN32
    #include <RmlUi_Include_Windows.h>
int APIENTRY WinMain(HINSTANCE, HINSTANCE, char*, int)
#else
int main(int, char**)
#endif
{
    const int window_width = 1920;
    const int window_height = 1080;

    // 1. 初始化后端（窗口、OpenGL 等）
    if (!Backend::Initialize("My RmlUi App", window_width, window_height, true))
        return -1;

    // 2. 设置 RmlUi 接口
    Rml::SetSystemInterface(Backend::GetSystemInterface());
    Rml::SetRenderInterface(Backend::GetRenderInterface());

    // 3. 初始化 RmlUi
    Rml::Initialise();

    // 4. 创建 Context
    Rml::Context* context = Rml::CreateContext("main", Rml::Vector2i(window_width, window_height));
    if (!context) {
        Rml::Shutdown();
        Backend::Shutdown();
        return -1;
    }

    // 5. 初始化调试器（开发阶段有用）
    Rml::Debugger::Initialise(context);

    // 6. 加载字体
    Rml::LoadFontFace("data/fonts/LatoLatin-Regular.ttf");

    // 7. 加载文档
    Rml::ElementDocument* document = context->LoadDocument("data/rml/menu.rml");
    if (!document) {
        Rml::Shutdown();
        Backend::Shutdown();
        return -1;
    }
    document->Show();

    // 8. 主循环
    bool running = true;
    while (running) {
        // 处理窗口事件和输入
        running = Backend::ProcessEvents(context, nullptr, true);

        // 更新 RmlUi
        context->Update();

        // 渲染
        Backend::BeginFrame();
        context->Render();
        Backend::PresentFrame();
    }

    // 9. 清理
    Rml::Shutdown();
    Backend::Shutdown();

    return 0;
}
```

---

### 2. 封装为应用类（推荐）

更好的做法是将 RmlUi 集成封装到一个类中：

#### App.h

```cpp
#pragma once

#include <RmlUi/Core.h>
#include <RmlUi/Debugger.h>

class App
{
public:
    bool Initialize(int width, int height);
    void Shutdown();
    void Update();
    void Render();

    Rml::Context* GetContext() { return context; }
    Rml::ElementDocument* GetDocument() { return document; }

    // 加载新文档
    bool LoadDocument(const Rml::String& path);

private:
    Rml::Context* context = nullptr;
    Rml::ElementDocument* document = nullptr;
    bool initialized = false;
};
```

#### App.cpp

```cpp
#include "App.h"
#include <RmlUi_Backend.h>

bool App::Initialize(int width, int height)
{
    // 初始化后端
    if (!Backend::Initialize("My RmlUi App", width, height, true))
        return false;

    // 设置接口
    Rml::SetSystemInterface(Backend::GetSystemInterface());
    Rml::SetRenderInterface(Backend::GetRenderInterface());

    // 初始化 RmlUi
    Rml::Initialise();

    // 创建 Context
    context = Rml::CreateContext("main", Rml::Vector2i(width, height));
    if (!context)
        return false;

    // 初始化调试器
    Rml::Debugger::Initialise(context);

    // 加载字体
    Rml::LoadFontFace("data/fonts/LatoLatin-Regular.ttf");

    initialized = true;
    return true;
}

void App::Shutdown()
{
    if (document) {
        context->UnloadDocument(document);
        document = nullptr;
    }

    if (context) {
        Rml::RemoveContext("main");
    }

    Rml::Shutdown();
    Backend::Shutdown();
    initialized = false;
}

void App::Update()
{
    if (context) {
        context->Update();
    }
}

void App::Render()
{
    if (context) {
        Backend::BeginFrame();
        context->Render();
        Backend::PresentFrame();
    }
}

bool App::LoadDocument(const Rml::String& path)
{
    if (!context) return false;

    // 卸载旧文档
    if (document) {
        context->UnloadDocument(document);
    }

    // 加载新文档
    document = context->LoadDocument(path);
    if (document) {
        document->Show();
        return true;
    }

    return false;
}
```

#### main.cpp（使用 App 类）

```cpp
#include "App.h"
#include <RmlUi_Backend.h>

int main(int, char**)
{
    App app;

    if (!app.Initialize(1920, 1080)) {
        return -1;
    }

    if (!app.LoadDocument("data/rml/menu.rml")) {
        app.Shutdown();
        return -1;
    }

    bool running = true;
    while (running) {
        running = Backend::ProcessEvents(app.GetContext(), nullptr, true);
        app.Update();
        app.Render();
    }

    app.Shutdown();
    return 0;
}
```

---

## 四、创建 RML 和 RCSS 文件

### data/rml/menu.rml

```xml
<rml>
<head>
    <title>主菜单</title>
    <link type="text/rcss" href="../rcss/menu.rcss"/>
</head>
<body>
    <div id="menu-container">
        <h1 class="title">我的游戏</h1>

        <div class="button-group">
            <button id="btn-start">開始游戏</button>
            <button id="btn-options">选项</button>
            <button id="btn-quit">退出</button>
        </div>

        <div class="version">v1.0.0</div>
    </div>
</body>
</rml>
```

### data/rcss/menu.rcss

```css
body {
    font-family: LatoLatin, Arial, sans-serif;
    font-size: 18px;
    background: #1a1a2e;
    margin: 0;
    padding: 0;
}

#menu-container {
    width: 400px;
    margin: 150px auto;
    text-align: center;
}

.title {
    color: #e94560;
    font-size: 48px;
    font-weight: bold;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
    margin-bottom: 50px;
}

.button-group {
    display: flex;
    flex-direction: column;
    gap: 15px;
}

button {
    background: linear-gradient(to bottom, #3498db, #2980b9);
    color: white;
    border: none;
    border-radius: 5px;
    padding: 15px 30px;
    font-size: 20px;
    cursor: pointer;
    transition: transform 0.1s, background 0.2s;
}

button:hover {
    background: linear-gradient(to bottom, #48a9e8, #3498db);
    transform: scale(1.05);
}

button:active {
    transform: scale(0.98);
}

.version {
    margin-top: 50px;
    color: #666;
    font-size: 14px;
}
```

---

## 五、输入处理

### 处理按钮点击

```cpp
// 在 App.h 中添加
#include <RmlUi/Core/EventListener.h>

class App : public Rml::EventListener
{
public:
    // ... 其他方法

    void ProcessEvent(Rml::Event& event) override;

private:
    void OnStartGame();
    void OnOptions();
    void OnQuit();
};
```

```cpp
// 在 App.cpp 中实现
#include <RmlUi_Backend.h>

void App::ProcessEvent(Rml::Event& event)
{
    // event.GetId() 返回的是**事件类型ID**，不是元素的id属性
    // Rml::EventId::Click 是一个枚举值，表示"点击事件"
    if (event.GetId() == Rml::EventId::Click) {
        // event.GetElement()->GetId() 返回的是**RML元素的id属性**
        // 例如：在RML中定义的 <button id="btn-start">
        if (event.GetElement()->GetId() == "btn-start") {
            OnStartGame();
        }
        else if (event.GetElement()->GetId() == "btn-options") {
            OnOptions();
        }
        else if (event.GetElement()->GetId() == "btn-quit") {
            OnQuit();
        }
    }
}

// 事件类型ID和元素ID的区别：

// 1. event.GetId() - 事件类型ID
//    - 返回值：Rml::EventId 枚举
//    - 表示发生了什么类型的事件
//    - 常见值：Click, Mouseover, Mouseout, Keydown, Keyup 等
//    - 用于判断事件类型

// 2. event.GetElement()->GetId() - 元素ID属性
//    - 返回值：String (字符串)
//    - 表示哪个元素触发了事件
//    - 对应RML中的 id 属性：<button id="btn-start">
//    - 用于识别具体的元素

// 常见事件类型ID：
// Rml::EventId::Click          // 鼠标点击
// Rml::EventId::Dblclick       // 鼠标双击
// Rml::EventId::Mouseover      // 鼠标悬停
// Rml::EventId::Mouseout       // 鼠标离开
// Rml::EventId::Keydown        // 键盘按下
// Rml::EventId::Keyup          // 键盘释放
// Rml::EventId::Change         // 表单值改变
// Rml::EventId::Submit         // 表单提交
// Rml::EventId::Load           // 文档加载完成
// Rml::EventId::Unload         // 文档卸载

void App::OnStartGame()
{
    printf("Start game clicked!\n");
    // 开始游戏逻辑
}

void App::OnOptions()
{
    printf("Options clicked!\n");
    // 打开选项菜单"
}

void App::OnQuit()
{
    printf("Quit clicked!\n");
    // 退出游戏
}

// 在 LoadDocument 中註冊事件監聽
bool App::LoadDocument(const Rml::String& path)
{
    if (!context) return false;

    if (document) {
        context->UnloadDocument(document);
    }

    document = context->LoadDocument(path);
    if (document) {
        document->Show();

        // 为按钮注册事件监听
        Rml::Element* btn_start = document->GetElementById("btn-start");
        Rml::Element* btn_options = document->GetElementById("btn-options");
        Rml::Element* btn_quit = document->GetElementById("btn-quit");

        if (btn_start) btn_start->AddEventListener(Rml::EventId::Click, this);
        if (btn_options) btn_options->AddEventListener(Rml::EventId::Click, this);
        if (btn_quit) btn_quit->AddEventListener(Rml::EventId::Click, this);

        return true;
    }

    return false;
}
```

---

## 六、编译和运行

### 编译

```bash
# 配置
cmake -B Build -S . -DCMAKE_BUILD_TYPE=Release

# 編譯
cmake --build Build

# 运行
./Build/MyApp
```

### 预期结果

你应该看到：
1. 一个 1920x1080 的窗口
2. 深色背景
3. 居中显示的菜单
4. 三个带渐变的按钮
5. 鼠标悬停时按钮有放大效果

---

## 七、常见问题

### 问题 1：找不到字体

**错误**：`Failed to load font`

**解决**：
- 确保字体文件路径正确
- 检查工作目录是否正确设置
- 使用绝对路径测试

### 问题 2：文档加载失败

**错误**：`LoadDocument` 返回 `nullptr`

**解決**：
```cpp
// 添加錯誤檢查
Rml::ElementDocument* doc = context->LoadDocument(path);
if (!doc) {
    Rml::Log::Message(Rml::Log::LT_ERROR, "Failed to load document: %s", path.c_str());
}
```

### 问题 3：按钮没有反应

**检查**：
- 确保调用了 `context->Update()`
- 确保输入事件正确传递到 Context
- 检查 RCSS 中是否设置了 `cursor: pointer`

---

## 八、下一步

恭喜完成基础集成！接下来："

- 进入 [阶段二](../../02-layout-style/README.md) 学习高级布局和样式
- 查看 [阶段三](../../03-interaction-data/README.md) 学习数据绑定

---

## 📝 检查清单

- [ ] 成功编译项目
- [ ] 窗口正确显示
- [ ] RML 文档加载成功
- [ ] 按钮可以点击
- [ ] 理解基本集成流程
