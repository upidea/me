# 第一章：基础篇（快速入门）

## 1.1 安装 vcpkg

### 系统要求

- **Windows**: Windows 7 或更高版本
- **Linux**: 支持主流发行版（Ubuntu、CentOS、Debian 等）
- **macOS**: macOS 10.15 或更高版本
- **必需工具**:
  - Git
  - CMake 3.16 或更高版本
  - C++ 编译器（Visual Studio、GCC、Clang 或 Xcode）

### 克隆仓库与初始化

```bash
# 克隆 vcpkg 仓库
git clone https://github.com/microsoft/vcpkg.git
cd vcpkg

# 运行 bootstrap 脚本
# Windows
.\bootstrap-vcpkg.bat

# Linux/macOS
./bootstrap-vcpkg.sh
```

### 环境变量配置

**方法一：将 vcpkg 添加到 PATH**

```bash
# Linux/macOS
export PATH="$PATH:/path/to/vcpkg"

# Windows（系统环境变量）
# 添加 vcpkg 目录到 PATH
```

**方法二：创建用户级集成（推荐）**

```bash
# Linux/macOS
./vcpkg integrate install

# Windows
.\vcpkg integrate install
```

这会在用户的全局 CMake 配置中添加 vcpkg 的工具链文件路径。

---

## 1.2 基本使用

### 搜索包

```bash
# 搜索包
vcpkg search <package-name>

# 示例：搜索所有包含 json 的包
vcpkg search json

# 示例：搜索特定包
vcpkg search fmt
```

### 安装包

```bash
# 基本语法
vcpkg install <package-name>:<triplet>

# 示例：安装 fmt 库（使用默认三元组）
vcpkg install fmt

# 示例：安装指定三元组
vcpkg install fmt:x64-linux

# 示例：安装多个包
vcpkg install fmt nlohmann-json spdlog

# 示例：递归安装依赖
vcpkg install --recurse fmt
```

### 删除包

```bash
# 删除包
vcpkg remove <package-name>:<triplet>

# 示例：删除 fmt 库
vcpkg remove fmt

# 示例：删除包及其依赖
vcpkg remove --purge fmt

# 示例：删除未使用的包
vcpkg remove --outdated
```

### 列出已安装的包

```bash
# 列出所有已安装的包
vcpkg list

# 列出指定三元组已安装的包
vcpkg list --triplet=x64-linux

# 以 JSON 格式输出
vcpkg list --format=json
```

---

## 1.3 三元组（Triplet）概念

### 什么是三元组

三元组是 vcpkg 用来描述目标平台的字符串格式，格式为：`<arch>-<os>-<compiler>`。它决定了 vcpkg 如何构建和安装包。

### 常用三元组

**Windows:**
- `x64-windows`: 64 位 Windows（Visual Studio MSVC）
- `x86-windows`: 32 位 Windows（Visual Studio MSVC）
- `x64-windows-static`: 64 位 Windows，静态链接运行时
- `x64-uwp`: 64 位 Windows Universal App

**Linux:**
- `x64-linux`: 64 位 Linux（GCC/Clang）
- `arm64-linux`: ARM64 Linux
- `x64-linux-musl`: 64 位 Linux（musl libc）

**macOS:**
- `x64-osx`: Intel macOS
- `arm64-osx`: Apple Silicon macOS
- `universal-osx`: 通用二进制（Intel + Apple Silicon）

### 如何选择合适的三元组

**基本原则:**
1. 与你的目标平台匹配
2. 与你的编译器兼容
3. 考虑动态/静态链接需求

**示例场景:**

```bash
# 开发 Windows 桌面应用
vcpkg install fmt:x64-windows

# 开发 Windows 静态链接应用
vcpkg install fmt:x64-windows-static

# 开发 Linux 服务器应用
vcpkg install fmt:x64-linux

# 开发 macOS 应用（M1/M2）
vcpkg install fmt:arm64-osx

# 开发跨平台应用（安装多个三元组）
vcpkg install fmt:x64-windows fmt:x64-linux fmt:arm64-osx
```

**查看默认三元组:**

```bash
# 查看当前默认三元组
vcpkg version

# 查看所有可用三元组
ls vcpkg/triplets/
```

**设置默认三元组:**

```bash
# 通过环境变量设置
export VCPKG_DEFAULT_TRIPLET=x64-linux  # Linux/macOS
set VCPKG_DEFAULT_TRIPLET=x64-windows    # Windows

# 通过命令行参数设置
vcpkg install fmt --triplet=x64-linux
```

---

## 1.4 实战演练

### 完整工作流程示例

```bash
# 1. 搜索需要的库
vcpkg search spdlog

# 2. 查看库的详细信息
vcpkg show spdlog

# 3. 安装库（指定三元组）
vcpkg install spdlog:x64-linux

# 4. 验证安装
vcpkg list | grep spdlog

# 5. 查看安装路径
vcpkg integrate install
```

### 常用命令速查

| 命令 | 说明 |
|------|------|
| `vcpkg search <pkg>` | 搜索包 |
| `vcpkg install <pkg>` | 安装包 |
| `vcpkg remove <pkg>` | 删除包 |
| `vcpkg list` | 列出已安装包 |
| `vcpkg update` | 更新 vcpkg 工具本身 |
| `vcpkg upgrade` | 升级已安装的包 |
| `vcpkg integrate install` | 集成到用户全局配置 |
| `vcpkg integrate remove` | 移除用户全局配置 |

---

## 小结

本章介绍了 vcpkg 的基础安装和基本使用方法，包括：

- 系统要求和安装步骤
- 基本的包管理操作（搜索、安装、删除、列出）
- 三元组的概念和选择原则

这些基础知识足以让你开始使用 vcpkg。接下来的章节将深入探讨与 CMake 的集成、版本管理、维护模式和高级功能。