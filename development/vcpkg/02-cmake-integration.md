# 第二章：CMake 集成（重点）

CMake 集成是使用 vcpkg 的核心技能，本章将深入讲解如何将 vcpkg 与 CMake 项目无缝集成，以及常见问题的解决方案。

---

## 2.1 基本集成方式

### 使用 CMake toolchain 文件

vcpkg 通过 toolchain 文件与 CMake 集成，这是最简单也是最推荐的方式。

#### 步骤 1：执行用户级集成（一次性操作）

```bash
cd /path/to/vcpkg
./vcpkg integrate install
```

这会在你的 CMake 用户配置目录中自动设置 toolchain 文件路径。

#### 步骤 2：配置 CMake 项目

**CMakeLists.txt 基本配置：**

```cmake
cmake_minimum_required(VERSION 3.16)
project(MyProject)

# 查找 vcpkg 提供的包
find_package(fmt CONFIG REQUIRED)

# 创建可执行文件
add_executable(my_app main.cpp)

# 链接库
target_link_libraries(my_app PRIVATE fmt::fmt)
```

**构建命令：**

```bash
# Linux/macOS
cmake -B build -S .
cmake --build build

# Windows
cmake -B build -S . -G "Visual Studio 17 2022"
cmake --build build --config Release
```

### 明确指定 toolchain 文件（推荐用于 CI/CD）

如果你不想使用全局集成，可以显式指定 toolchain 文件：

```bash
cmake -B build -S . \
  -DCMAKE_TOOLCHAIN_FILE=/path/to/vcpkg/scripts/buildsystems/vcpkg.cmake
```

或在 CMakeLists.txt 中设置（不推荐，会影响其他项目）：

```cmake
set(CMAKE_TOOLCHAIN_FILE "/path/to/vcpkg/scripts/buildsystems/vcpkg.cmake" CACHE STRING "")
```

### 使用 vcpkg.json 声明依赖

在项目根目录创建 `vcpkg.json` 文件：

```json
{
  "name": "my-project",
  "version": "1.0.0",
  "dependencies": [
    "fmt",
    "nlohmann-json",
    "spdlog"
  ]
}
```

这样在运行 CMake 时，vcpkg 会自动检查并安装缺失的依赖。

---

## 2.2 CMake 集成常见问题

### 问题 1：找不到 vcpkg 提供的包

**现象：**

```cmake
find_package(fmt CONFIG REQUIRED)
```

报错：
```
Could not find a package configuration file provided by "fmt"
```

**原因分析：**
- vcpkg 未安装该包
- toolchain 文件未正确配置
- 三元组不匹配

**解决方案：**

1. **检查包是否已安装：**

```bash
vcpkg list | grep fmt
```

2. **安装缺失的包：**

```bash
vcpkg install fmt
```

3. **验证 toolchain 文件路径：**

```bash
# 检查 CMake 配置输出中的 toolchain 文件路径
cmake -B build -S . -DCMAKE_TOOLCHAIN_FILE=/path/to/vcpkg/scripts/buildsystems/vcpkg.cmake
```

查看输出：
```
-- Using toolchain file: /path/to/vcpkg/scripts/buildsystems/vcpkg.cmake
```

4. **检查三元组：**

```bash
# 查看当前使用的三元组
cmake -B build -S . -DCMAKE_TOOLCHAIN_FILE=/path/to/vcpkg/scripts/buildsystems/vcpkg.cmake
```

确保安装的三元组与构建目标一致：

```bash
# 安装指定三元组
vcpkg install fmt:x64-linux
```

### 问题 2：链接错误与库冲突

**现象：**

```bash
Undefined symbols for architecture x86_64:
  "_fmt::v9::basic_memory_buffer...", referenced from:
      ...
```

**原因分析：**
- 静态/动态链接不匹配
- CMake 配置错误
- 多个版本的库混用

**解决方案：**

1. **确保链接正确的库目标：**

```cmake
find_package(fmt CONFIG REQUIRED)

# ✅ 正确：使用导入的目标
target_link_libraries(my_app PRIVATE fmt::fmt)

# ❌ 错误：手动指定库路径
target_link_libraries(my_app PRIVATE /path/to/libfmt.a)
```

2. **检查静态/动态链接设置：**

vcpkg 提供的包通常包含静态和动态版本，通过 CMake 目标自动选择：

```cmake
# 强制使用静态库（如果包支持）
set(VCPKG_TARGET_TRIPLET "x64-windows-static" CACHE STRING "")

# 或在 CMakeLists.txt 中
set(BUILD_SHARED_LIBS OFF)
```

3. **清理构建缓存：**

```bash
rm -rf build
cmake -B build -S . -DCMAKE_TOOLCHAIN_FILE=/path/to/vcpkg/scripts/buildsystems/vcpkg.cmake
cmake --build build
```

### 问题 3：头文件路径问题

**现象：**

```cpp
#include <fmt/core.h>  // 报错：找不到文件
```

**原因分析：**
- CMake 目标未正确配置
- 手动添加头文件路径

**解决方案：**

1. **使用 target_link_libraries 自动设置：**

```cmake
find_package(fmt CONFIG REQUIRED)
add_executable(my_app main.cpp)
target_link_libraries(my_app PRIVATE fmt::fmt)  # 自动设置包含路径
```

2. **避免手动添加头文件路径：**

```cmake
# ❌ 不推荐
target_include_directories(my_app PRIVATE /path/to/vcpkg/installed/x64-linux/include)

# ✅ 推荐
target_link_libraries(my_app PRIVATE fmt::fmt)
```

3. **验证头文件路径：**

```bash
# 查看 CMake 配置中的包含路径
cmake -B build -S . -DCMAKE_TOOLCHAIN_FILE=/path/to/vcpkg/scripts/buildsystems/vcpkg.cmake
cmake --build build --target help | grep include
```

### 问题 4：静态库与动态库选择

**问题：** 需要静态链接某个库，但 vcpkg 默认安装的是动态库。

**解决方案：**

1. **使用静态三元组（推荐）：**

```bash
# 安装静态版本
vcpkg install fmt:x64-windows-static

# 构建时指定静态三元组
cmake -B build -S . \
  -DCMAKE_TOOLCHAIN_FILE=/path/to/vcpkg/scripts/buildsystems/vcpkg.cmake \
  -DVCPKG_TARGET_TRIPLET=x64-windows-static
```

2. **在 vcpkg.json 中指定：**

```json
{
  "name": "my-project",
  "version": "1.0.0",
  "dependencies": [
    {
      "name": "fmt",
      "platform": "windows"
    }
  ],
  "builtin-baseline": "2024-01-01"
}
```

3. **检查库类型：**

```bash
# 查看已安装的库类型
vcpkg list

# 查看特定包的详细信息
vcpkg show fmt
```

---

## 2.3 实战案例

### 案例 1：简单 CMake 项目集成 vcpkg

**项目结构：**

```
my-project/
├── CMakeLists.txt
├── vcpkg.json
└── main.cpp
```

**vcpkg.json:**

```json
{
  "name": "my-project",
  "version": "1.0.0",
  "dependencies": [
    "fmt",
    "spdlog"
  ]
}
```

**CMakeLists.txt:**

```cmake
cmake_minimum_required(VERSION 3.16)
project(MyProject VERSION 1.0.0 LANGUAGES CXX)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

# 查找 vcpkg 包
find_package(fmt CONFIG REQUIRED)
find_package(spdlog CONFIG REQUIRED)

# 创建可执行文件
add_executable(my_app main.cpp)

# 链接库
target_link_libraries(my_app PRIVATE
    fmt::fmt
    spdlog::spdlog
)

# 设置输出目录
set_target_properties(my_app PROPERTIES
    RUNTIME_OUTPUT_DIRECTORY "${CMAKE_BINARY_DIR}/bin"
)
```

**main.cpp:**

```cpp
#include <fmt/core.h>
#include <spdlog/spdlog.h>

int main() {
    spdlog::info("Hello, {}!", "vcpkg");
    fmt::print("vcpkg + CMake integration successful!\n");
    return 0;
}
```

**构建步骤：**

```bash
# 1. 确保已执行 vcpkg integrate install
cd /path/to/vcpkg
./vcpkg integrate install

# 2. 返回项目目录
cd /path/to/my-project

# 3. 构建项目
cmake -B build -S .
cmake --build build

# 4. 运行
./build/bin/my_app
```

### 案例 2：多依赖项目配置

**vcpkg.json:**

```json
{
  "name": "complex-project",
  "version": "2.0.0",
  "description": "A project with multiple dependencies",
  "dependencies": [
    "fmt",
    "nlohmann-json",
    "spdlog",
    "catch2",
    "openssl"
  ],
  "builtin-baseline": "2024-01-15"
}
```

**CMakeLists.txt:**

```cmake
cmake_minimum_required(VERSION 3.16)
project(ComplexProject VERSION 2.0.0 LANGUAGES CXX)

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

# 查找所有依赖
find_package(fmt CONFIG REQUIRED)
find_package(nlohmann_json CONFIG REQUIRED)
find_package(spdlog CONFIG REQUIRED)
find_package(Catch2 CONFIG REQUIRED)
find_package(OpenSSL REQUIRED)

# 主程序
add_executable(main_app src/main.cpp)
target_link_libraries(main_app PRIVATE
    fmt::fmt
    nlohmann_json::nlohmann_json
    spdlog::spdlog
)

# 测试程序
enable_testing()
add_executable(tests tests/test_main.cpp)
target_link_libraries(tests PRIVATE
    Catch2::Catch2
    fmt::fmt
)
add_test(NAME AllTests COMMAND tests)

# 工具程序
add_executable(tool src/tool.cpp)
target_link_libraries(tool PRIVATE
    OpenSSL::SSL
    OpenSSL::Crypto
    fmt::fmt
)
```

**构建与测试：**

```bash
# 配置项目（vcpkg 会自动安装缺失的依赖）
cmake -B build -S .

# 构建
cmake --build build

# 运行测试
ctest --test-dir build

# 运行主程序
./build/main_app

# 运行工具
./build/tool
```

### 案例 3：跨平台项目配置技巧

**vcpkg.json:**

```json
{
  "name": "cross-platform-project",
  "version": "1.0.0",
  "dependencies": [
    "fmt",
    "spdlog"
  ]
}
```

**CMakeLists.txt:**

```cmake
cmake_minimum_required(VERSION 3.16)
project(CrossPlatformProject VERSION 1.0.0 LANGUAGES CXX)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

# 跨平台检测
if(WIN32)
    message(STATUS "Building for Windows")
elseif(APPLE)
    message(STATUS "Building for macOS")
elseif(UNIX)
    message(STATUS "Building for Linux")
endif()

# 查找依赖
find_package(fmt CONFIG REQUIRED)
find_package(spdlog CONFIG REQUIRED)

# 创建可执行文件
add_executable(my_app src/main.cpp)

# 链接库
target_link_libraries(my_app PRIVATE
    fmt::fmt
    spdlog::spdlog
)

# 平台特定的编译选项
if(WIN32)
    target_compile_definitions(my_app PRIVATE _CRT_SECURE_NO_WARNINGS)
elseif(APPLE)
    target_compile_options(my_app PRIVATE -Wall -Wextra)
elseif(UNIX)
    target_compile_options(my_app PRIVATE -Wall -Wextra -pedantic)
endif()
```

**Windows 构建：**

```powershell
cmake -B build -S . -G "Visual Studio 17 2022"
cmake --build build --config Release
.\build\Release\my_app.exe
```

**Linux 构建：**

```bash
cmake -B build -S .
cmake --build build
./build/my_app
```

**macOS 构建：**

```bash
cmake -B build -S .
cmake --build build
./build/my_app
```

---

## 2.4 高级技巧

### 使用 CMake Presets

创建 `CMakePresets.json`：

```json
{
  "version": 3,
  "configurePresets": [
    {
      "name": "default",
      "displayName": "Default Config",
      "generator": "Unix Makefiles",
      "binaryDir": "${sourceDir}/build",
      "cacheVariables": {
        "CMAKE_TOOLCHAIN_FILE": {
          "value": "/path/to/vcpkg/scripts/buildsystems/vcpkg.cmake",
          "type": "FILEPATH"
        }
      }
    },
    {
      "name": "release",
      "displayName": "Release Config",
      "inherits": "default",
      "cacheVariables": {
        "CMAKE_BUILD_TYPE": "Release"
      }
    },
    {
      "name": "debug",
      "displayName": "Debug Config",
      "inherits": "default",
      "cacheVariables": {
        "CMAKE_BUILD_TYPE": "Debug"
      }
    }
  ]
}
```

使用预设构建：

```bash
cmake --preset release
cmake --build --preset release
```

### 条件依赖安装

在 `vcpkg.json` 中使用 `"overrides"` 或平台特定的依赖：

```json
{
  "name": "my-project",
  "version": "1.0.0",
  "dependencies": [
    "fmt",
    "spdlog"
  ],
  "overrides": [
    {
      "name": "spdlog",
      "version": "1.12.0"
    }
  ]
}
```

---

## 小结

本章深入讲解了 vcpkg 与 CMake 的集成方法，包括：

1. 基本的 toolchain 文件配置
2. 四个常见问题的解决方案
3. 三个实战案例（简单项目、多依赖项目、跨平台项目）
4. 高级技巧（CMake Presets、条件依赖）

掌握这些内容后，你就可以在 CMake 项目中高效地使用 vcpkg 管理依赖了。下一章将介绍 vcpkg 的版本管理机制——baseline。