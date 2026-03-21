# 附录

## A. vcpkg 命令参考

### 基本命令

| 命令 | 说明 | 示例 |
|------|------|------|
| `vcpkg search <pattern>` | 搜索包 | `vcpkg search json` |
| `vcpkg install <package>` | 安装包 | `vcpkg install fmt` |
| `vcpkg install <package>:<triplet>` | 安装指定三元组的包 | `vcpkg install fmt:x64-linux` |
| `vcpkg remove <package>` | 删除包 | `vcpkg remove fmt` |
| `vcpkg remove --purge <package>` | 完全删除包（包括构建文件） | `vcpkg remove --purge fmt` |
| `vcpkg remove --outdated` | 删除过期的包 | `vcpkg remove --outdated` |
| `vcpkg list` | 列出已安装的包 | `vcpkg list` |
| `vcpkg list --triplet=<triplet>` | 列出指定三元组的包 | `vcpkg list --triplet=x64-linux` |
| `vcpkg update` | 更新 vcpkg 工具本身 | `vcpkg update` |
| `vcpkg upgrade` | 升级已安装的包 | `vcpkg upgrade` |
| `vcpkg upgrade <package>` | 升级指定包 | `vcpkg upgrade fmt` |
| `vcpkg integrate install` | 集成到用户全局配置 | `vcpkg integrate install` |
| `vcpkg integrate remove` | 移除用户全局配置 | `vcpkg integrate remove` |
| `vcpkg integrate project` | 生成项目集成文件 | `vcpkg integrate project` |

### 信息查询命令

| 命令 | 说明 | 示例 |
|------|------|------|
| `vcpkg show <package>` | 显示包的详细信息 | `vcpkg show fmt` |
| `vcpkg depend-info <package>` | 显示包的依赖信息 | `vcpkg depend-info fmt` |
| `vcpkg depend-info <package> --recurse` | 显示递归依赖 | `vcpkg depend-info fmt --recurse` |
| `vcpkg version` | 显示 vcpkg 版本信息 | `vcpkg version` |
| `vcpkg hash <file>` | 计算文件的哈希值 | `vcpkg hash archive.zip` |
| `vcpkg x-history <package>` | 显示包的版本历史 | `vcpkg x-history fmt` |

### 构建命令

| 命令 | 说明 | 示例 |
|------|------|------|
| `vcpkg build <package>` | 构建包但不安装 | `vcpkg build fmt` |
| `vcpkg build <package>:<triplet>` | 构建指定三元组的包 | `vcpkg build fmt:x64-linux` |
| `vcpkg build --overlay-ports=<path>` | 使用 Overlay 构建包 | `vcpkg build my-lib --overlay-ports=./overlays` |
| `vcpkg build --binarysource=<source>` | 指定二进制源 | `vcpkg build fmt --binarysource=default,readwrite` |

### 下载命令

| 命令 | 说明 | 示例 |
|------|------|------|
| `vcpkg download <package>` | 下载包的源码 | `vcpkg download fmt` |
| `vcpkg download --all` | 下载所有依赖的源码 | `vcpkg download --all` |

### 调试命令

| 命令 | 说明 | 示例 |
|------|------|------|
| `vcpkg install <package> --debug` | 启用调试模式 | `vcpkg install fmt --debug` |
| `vcpkg install <package> --debug-each` | 启用更详细的调试 | `vcpkg install fmt --debug-each` |
| `vcpkg env` | 显示环境变量 | `vcpkg env` |

### 实验性命令

| 命令 | 说明 | 示例 |
|------|------|------|
| `vcpkg x-add-version <package>` | 为包添加版本信息 | `vcpkg x-add-version fmt` |
| `vcpkg x-format-manifest <file>` | 格式化 vcpkg.json | `vcpkg x-format-manifest vcpkg.json` |
| `vcpkg x-vsinstances` | 列出 Visual Studio 实例 | `vcpkg x-vsinstances` |
| `vcpkg x-ci-clean` | 清理 CI 环境 | `vcpkg x-ci-clean` |

### 常用选项

| 选项 | 说明 | 示例 |
|------|------|------|
| `--triplet=<triplet>` | 指定三元组 | `vcpkg install fmt --triplet=x64-linux` |
| `--overlay-ports=<path>` | 指定 Overlay 路径 | `vcpkg install fmt --overlay-ports=./overlays` |
| `--overlay-triplets=<path>` | 指定自定义三元组路径 | `vcpkg install fmt --overlay-triplets=./triplets` |
| `--recurse` | 递归处理依赖 | `vcpkg install fmt --recurse` |
| `--dry-run` | 模拟运行，不实际执行 | `vcpkg install fmt --dry-run` |
| `--force-rebuild` | 强制重新构建 | `vcpkg install fmt --force-rebuild` |
| `--no-binarycaching` | 禁用二进制缓存 | `vcpkg install fmt --no-binarycaching` |
| `--binarysource=<source>` | 指定二进制源 | `vcpkg install fmt --binarysource=default,readwrite` |

---

## B. 常用三元组列表

### Windows 三元组

| 三元组 | 说明 | 编译器 | 链接类型 |
|--------|------|--------|----------|
| `x64-windows` | 64 位 Windows | MSVC | 动态 |
| `x86-windows` | 32 位 Windows | MSVC | 动态 |
| `x64-windows-static` | 64 位 Windows | MSVC | 静态 |
| `x86-windows-static` | 32 位 Windows | MSVC | 静态 |
| `x64-uwp` | 64 位 UWP | MSVC | 动态 |
| `x86-uwp` | 32 位 UWP | MSVC | 动态 |
| `arm64-windows` | ARM64 Windows | MSVC | 动态 |
| `arm-uwp` | ARM UWP | MSVC | 动态 |
| `arm64-uwp` | ARM64 UWP | MSVC | 动态 |

### Linux 三元组

| 三元组 | 说明 | 编译器 | 链接类型 |
|--------|------|--------|----------|
| `x64-linux` | 64 位 Linux | GCC/Clang | 动态 |
| `x64-linux-static` | 64 位 Linux | GCC/Clang | 静态 |
| `arm64-linux` | ARM64 Linux | GCC/Clang | 动态 |
| `arm-linux` | ARM Linux | GCC/Clang | 动态 |
| `x64-linux-musl` | 64 位 Linux (musl) | GCC/Clang | 动态 |
| `arm-linux-musleabihf` | ARM Linux (musl) | GCC/Clang | 动态 |
| `ppc64le-linux` | PowerPC64 Linux | GCC/Clang | 动态 |

### macOS 三元组

| 三元组 | 说明 | 编译器 | 链接类型 |
|--------|------|--------|----------|
| `x64-osx` | Intel macOS | Clang | 动态 |
| `arm64-osx` | Apple Silicon macOS | Clang | 动态 |
| `universal-osx` | 通用二进制 | Clang | 动态 |

### Android 三元组

| 三元组 | 说明 | 架构 |
|--------|------|------|
| `arm64-android` | ARM64 Android | ARM64 |
| `arm-android` | ARM Android | ARM |
| `x86_64-android` | x86_64 Android | x86_64 |
| `x86-android` | x86 Android | x86 |

### iOS 三元组

| 三元组 | 说明 | 架构 |
|--------|------|------|
| `arm64-ios` | ARM64 iOS | ARM64 |
| `arm64-ios-simulator` | ARM64 iOS Simulator | ARM64 |
| `x64-ios` | x64 iOS Simulator | x64_64 |
| `x86-ios` | x86 iOS Simulator | x86 |

### WebAssembly 三元组

| 三元组 | 说明 |
|--------|------|
| `wasm32-emscripten` | WebAssembly (Emscripten) |

---

## C. 相关资源链接

### 官方资源

- **vcpkg 官方网站**: https://vcpkg.io/
- **官方文档**: https://learn.microsoft.com/en-us/vcpkg/
- **GitHub 仓库**: https://github.com/microsoft/vcpkg
- **示例仓库**: https://github.com/microsoft/vcpkg-example
- **发布页面**: https://github.com/microsoft/vcpkg/releases

### 社区资源

- **Discord 服务器**: https://discord.gg/vcpkg
- **Stack Overflow 标签**: https://stackoverflow.com/questions/tagged/vcpkg
- **Reddit**: https://www.reddit.com/r/vcpkg/
- **博客**: https://devblogs.microsoft.com/cppblog/category/vcpkg/

### 学习资源

- **入门教程**: https://learn.microsoft.com/en-us/vcpkg/get_started/get-started
- **CMake 集成**: https://learn.microsoft.com/en-us/vcpkg/users/buildsystems/cmake-integration
- **端口创建指南**: https://learn.microsoft.com/en-us/vcpkg/contributing/policy
- **二进制缓存**: https://learn.microsoft.com/en-us/vcpkg/users/binarycaching

### 相关工具

- **CMake**: https://cmake.org/
- **Ninja**: https://ninja-build.org/
- **ccache**: https://ccache.dev/
- **sccache**: https://github.com/mozilla/sccache

### 端口仓库

- **官方端口仓库**: https://github.com/microsoft/vcpkg
- **社区端口**: https://github.com/search?q=vcpkg+ports
- **端口示例**: https://github.com/microsoft/vcpkg/tree/master/ports

### 问题反馈

- **GitHub Issues**: https://github.com/microsoft/vcpkg/issues
- **安全漏洞**: https://github.com/microsoft/vcpkg/security/policy
- **行为准则**: https://github.com/microsoft/vcpkg/blob/master/CODE_OF_CONDUCT.md

### 许可证

- **MIT 许可证**: https://github.com/microsoft/vcpkg/blob/master/LICENSE.txt
- **第三方许可证**: https://github.com/microsoft/vcpkg/blob/master/NOTICE.txt

---

## D. 环境变量参考

### vcpkg 环境变量

| 变量 | 说明 | 默认值 |
|------|------|--------|
| `VCPKG_ROOT` | vcpkg 安装目录 | - |
| `VCPKG_DEFAULT_TRIPLET` | 默认三元组 | 平台相关 |
| `VCPKG_OVERLAY_PORTS` | Overlay 端口路径 | - |
| `VCPKG_OVERLAY_TRIPLETS` | 自定义三元组路径 | - |
| `VCPKG_DOWNLOADS` | 下载缓存目录 | `$VCPKG_ROOT/downloads` |
| `VCPKG_BINARY_SOURCES` | 二进制缓存配置 | - |
| `VCPKG_MAX_CONCURRENCY` | 最大并行度 | CPU 核心数 |
| `VCPKG_MAINTAINER_MODE` | 启用维护模式 | 0 |
| `VCPKG_KEEP_ENV_VARS` | 保留的环境变量 | - |

### CMake 环境变量

| 变量 | 说明 | 默认值 |
|------|------|--------|
| `CMAKE_TOOLCHAIN_FILE` | CMake toolchain 文件路径 | - |
| `CMAKE_BUILD_TYPE` | 构建类型 | Release |
| `CMAKE_INSTALL_PREFIX` | 安装前缀 | - |

### 编译器环境变量

| 变量 | 说明 | 默认值 |
|------|------|--------|
| `CC` | C 编译器 | gcc / clang |
| `CXX` | C++ 编译器 | g++ / clang++ |
| `CFLAGS` | C 编译选项 | - |
| `CXXFLAGS` | C++ 编译选项 | - |
| `LDFLAGS` | 链接器选项 | - |

---

## E. 目录结构参考

### vcpkg 目录结构

```
vcpkg/
├── buildtrees/          # 构建树（源码和中间文件）
├── downloads/           # 下载的源码压缩包
├── installed/           # 已安装的包
│   ├── x64-linux/      # Linux 64 位安装目录
│   │   ├── include/    # 头文件
│   │   ├── lib/        # 库文件
│   │   ├── share/      # CMake 配置文件
│   │   └── bin/        # 可执行文件
│   ├── x64-windows/    # Windows 64 位安装目录
│   └── arm64-osx/      # macOS ARM64 安装目录
├── ports/              # 端口定义
│   ├── fmt/
│   ├── spdlog/
│   └── ...
├── scripts/            # 构建脚本
│   ├── buildsystems/   # 构建系统工具链
│   │   └── vcpkg.cmake
│   └── ...
├── triplets/           # 三元组定义
│   ├── x64-linux.cmake
│   ├── x64-windows.cmake
│   └── ...
├── versions/           # 版本数据库
│   └── baseline.json
├── vcpkg               # 主可执行文件
└── vcpkg.json          # 全局配置（可选）
```

### 项目目录结构（使用 vcpkg）

```
my-project/
├── CMakeLists.txt      # CMake 配置文件
├── vcpkg.json          # vcpkg 依赖清单
├── README.md           # 项目说明
├── src/                # 源代码
│   ├── main.cpp
│   └── ...
├── include/            # 头文件
│   └── ...
├── tests/              # 测试代码
│   └── ...
├── docs/               # 文档
│   └── ...
├── build/              # 构建输出目录（gitignore）
├── vcpkg/              # vcpkg 子模块（可选）
│   └── ...
└── overlays/           # 自定义端口（可选）
    └── ports/
        └── ...
```

---

## F. 常用端口示例

### 基础库

| 包名 | 说明 | CMake 目标 |
|------|------|------------|
| `fmt` | 格式化库 | `fmt::fmt` |
| `spdlog` | 日志库 | `spdlog::spdlog` |
| `nlohmann-json` | JSON 库 | `nlohmann_json::nlohmann_json` |
| `catch2` | 测试框架 | `Catch2::Catch2` |
| `gtest` | 测试框架 | `GTest::gtest` |
| `benchmark` | 性能测试 | `benchmark::benchmark` |

### 网络库

| 包名 | 说明 | CMake 目标 |
|------|------|------------|
| `boost-asio` | 异步网络库 | `Boost::asio` |
| `curl` | HTTP 客户端 | `CURL::libcurl` |
| `openssl` | SSL/TLS 库 | `OpenSSL::SSL`, `OpenSSL::Crypto` |
| `libwebsockets` | WebSocket 库 | `websockets::websockets` |

### 数据库

| 包名 | 说明 | CMake 目标 |
|------|------|------------|
| `sqlite3` | SQLite 数据库 | `sqlite3` |
| `libpq` | PostgreSQL 客户端 | `PostgreSQL::PostgreSQL` |
| `mysql` | MySQL 客户端 | `mysqlclient` |
| `mongodb` | MongoDB 客户端 | `mongo::mongoc_shared` |

### 图形和媒体

| 包名 | 说明 | CMake 目标 |
|------|------|------------|
| `opencv` | 计算机视觉库 | `opencv_core`, `opencv_highgui` |
| `freetype` | 字体渲染库 | `freetype` |
| `libpng` | PNG 图像库 | `png` |
| `libjpeg-turbo` | JPEG 图像库 | `jpeg` |
| `ffmpeg` | 音视频处理库 | `ffmpeg` |

### 数学和科学计算

| 包名 | 说明 | CMake 目标 |
|------|------|------------|
| `eigen3` | 线性代数库 | `Eigen3::Eigen` |
| `boost-math` | 数学库 | `Boost::math` |
| `gsl` | 科学计算库 | `gsl::gsl` |
| `armadillo` | 线性代数库 | `armadillo` |

---

## G. 快速参考卡片

### 安装和配置

```bash
# 克隆 vcpkg
git clone https://github.com/microsoft/vcpkg.git
cd vcpkg
./bootstrap-vcpkg.sh  # Linux/macOS
.\bootstrap-vcpkg.bat  # Windows

# 集成到系统
./vcpkg integrate install
```

### 基本使用

```bash
# 搜索包
vcpkg search <pattern>

# 安装包
vcpkg install <package>

# 列出已安装的包
vcpkg list

# 删除包
vcpkg remove <package>
```

### CMake 集成

```cmake
# CMakeLists.txt
cmake_minimum_required(VERSION 3.16)
project(MyProject)

find_package(<package> CONFIG REQUIRED)
add_executable(my_app main.cpp)
target_link_libraries(my_app PRIVATE <package>::<target>)
```

```bash
# 构建命令
cmake -B build -S . \
  -DCMAKE_TOOLCHAIN_FILE=/path/to/vcpkg/scripts/buildsystems/vcpkg.cmake
cmake --build build
```

### 调试

```bash
# 启用调试模式
vcpkg install <package> --debug

# 查看构建日志
cat /path/to/vcpkg/buildtrees/<package>/build-*.log

# 清理缓存
vcpkg remove --outdated
rm -rf /path/to/vcpkg/buildtrees/*
```

---

**教程到此结束。希望这份教程能帮助你掌握 vcpkg 的使用！**

如有问题或建议，欢迎反馈：
- GitHub Issues: https://github.com/microsoft/vcpkg/issues
- Discord: https://discord.gg/vcpkg
- Stack Overflow: 标签 `vcpkg`

祝你使用愉快！