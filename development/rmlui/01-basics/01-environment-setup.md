# 1.1 环境搭建

本节将指导你完成 RmlUi 的环境搭建和示例编译。

---

## 一、系统要求

### 最低要求
- **CMake**: 3.16 或更高版本
- **C++ 编译器**: 支持 C++17（GCC 7+、Clang 5+、MSVC 2017+）
- **内存**: 至少 4GB RAM

### 可选依赖
| 依赖 | 用途 |
|------|------|
| FreeType | 字体渲染（默认需要） |
| GLFW | 窗口管理和输入（推荐） |
| SDL2 | 跨平台窗口和输入 |
| OpenGL 3.3+ | 渲染后端 |

---

## 二、选择后端

RmlUi 支持多种平台和渲染器组合：

| 后端名称 | 平台 | 渲染器 | 推荐度 |
|----------|------|--------|--------|
| `GLFW_GL3` | 跨平台 | OpenGL 3.3 | ⭐⭐⭐⭐⭐ |
| `GLFW_GL2` | 跨平台 | OpenGL 2.1 | ⭐⭐⭐⭐ |
| `SDL_GL3` | 跨平台 | OpenGL 3.3 | ⭐⭐⭐⭐ |
| `Win32_GL2` | Windows | OpenGL 2.1 | ⭐⭐⭐⭐ |
| `X11_GL2` | Linux | OpenGL 2.1 | ⭐⭐⭐⭐ |
| `SDL_VK` | 跨平台 | Vulkan | ⭐⭐⭐ |

**推荐使用 `GLFW_GL3`**，因为它跨平台支持好且功能完整。

---

## 三、编译 RmlUi

### 步骤 1：克隆仓库（如果你还没有）

```bash
git clone https://github.com/mikke89/RmlUi.git
cd RmlUi
```

### 步骤 2：安装依赖（可选，使用 vcpkg）

```bash
# 安装 vcpkg（如果没有）
git clone https://github.com/microsoft/vcpkg.git
cd vcpkg
./bootstrap-vcpkg.sh  # Linux/macOS
# 或
./bootstrap-vcpkg.bat  # Windows

# 安装 RmlUi 依赖
./vcpkg install freetype glfw3
```

### 步骤 3：配置 CMake

```bash
# 创建构建目录并配置
cmake -B Build -S . \
    -DRMLUI_BACKEND=GLFW_GL3 \
    -DRMLUI_SAMPLES=ON \
    -DCMAKE_BUILD_TYPE=Release

# 如果使用 vcpkg
cmake -B Build -S . \
    -DRMLUI_BACKEND=GLFW_GL3 \
    -DRMLUI_SAMPLES=ON \
    -DCMAKE_TOOLCHAIN_FILE=/path/to/vcpkg/scripts/buildsystems/vcpkg.cmake
```

### CMake 选项说明

| 选项 | 说明 | 默认值 |
|------|------|--------|
| `RMLUI_BACKEND` | 选择后端组合 | (无) |
| `RMLUI_SAMPLES` | 编译示例 | OFF |
| `RMLUI_TESTS` | 编译测试 | OFF |
| `RMLUI_LUA_BINDINGS` | 编译 Lua 绑定 | OFF |
| `RMLUI_FONT_ENGINE` | 字体引擎 (`freetype`/`none`) | `freetype` |
| `BUILD_SHARED_LIBS` | 构建动态库 | OFF |

### 步骤 4：编译

```bash
# 编译所有目标
cmake --build Build --config Release

# 或编译特定目标（更快）
cmake --build Build --target rmlui_sample_demo --config Release
```

### 步骤 5：运行示例

```bash
# 进入示例目录（可执行文件位置）
cd Build/Samples/basic/demo

# 运行演示示例
./demo              # Linux/macOS
# 或
demo.exe            # Windows
```

---

## 四、常见问题

### 问题 1：找不到 GLFW

**错误信息**：
```
CMake Error at CMake/Dependencies.cmake:XX (find_package):
  Could not find a package configuration file provided by "glfw3"
```

**解决方案**：
```bash
# 使用包管理器安装
# Ubuntu/Debian
sudo apt-get install libglfw3-dev

# macOS
brew install glfw

# Windows (使用 vcpkg)
vcpkg install glfw3
```

### 问题 2：OpenGL 版本太低

**错误信息**：
```
Failed to create OpenGL context
```

**解决方案**：
- 尝试使用 `GLFW_GL2` 后端
- 更新显卡驱动
- 检查显卡是否支持 OpenGL 3.3

### 问题 3：字体加载失败

**错误信息**：
```
Failed to load font
```

**解决方案**：
确保工作目录设置正确，字体文件位于相对路径下：
```bash
# 从 Samples 目录运行
cd Build/Samples/basic/demo
./demo
```

---

## 五、验证安装

运行以下命令验证编译是否成功：

```bash
# 检查可执行文件是否存在
ls Build/Samples/basic/

# 应该看到以下目录：
# animation/ benchmark/ data_binding/ demo/ drag/ effects/ ...
```

运行 demo 示例，你应该看到一个窗口显示各种 RmlUi 功能演示。

---

## 六、下一步

环境搭建完成后，继续学习 [核心概念](02-core-concepts.md)。

---

## 📝 检查清单

- [ ] CMake 配置成功
- [ ] 编译无错误
- [ ] 能够运行 demo 示例
- [ ] 理解后端选择
