# 第七章：故障排查

在使用 vcpkg 的过程中，你可能会遇到各种问题。本章将介绍常见错误、调试技巧和获取帮助的方法，帮助你快速解决问题。

---

## 7.1 常见错误

### 网络问题

#### 错误 1：无法连接到 GitHub

**现象：**
```
Error: Failed to download from https://github.com/microsoft/vcpkg/archive/refs/heads/master.zip
```

**原因：**
- 网络连接问题
- GitHub 访问受限
- 防火墙阻止

**解决方案：**

```bash
# 方法 1：使用代理
export http_proxy=http://proxy.example.com:8080
export https_proxy=http://proxy.example.com:8080

# 方法 2：使用镜像
git clone https://github.com.cnpmjs.org/microsoft/vcpkg.git
cd vcpkg

# 方法 3：手动下载
wget https://github.com/microsoft/vcpkg/archive/refs/heads/master.zip
unzip master.zip
mv vcpkg-master vcpkg
```

#### 错误 2：下载超时

**现象：**
```
Error: Download timed out after 300 seconds
```

**解决方案：**

```bash
# 增加超时时间
export VCPKG_MAX_CONCURRENCY=1

# 或使用后台下载
vcpkg download openssl --all

# 如果失败，手动下载并放到 downloads 目录
cp /path/to/downloaded/file /path/to/vcpkg/downloads/
```

### 编译失败

#### 错误 1：编译器版本不兼容

**现象：**
```
Error: CMake 3.15 or higher is required
```

**解决方案：**

```bash
# 检查 CMake 版本
cmake --version

# 升级 CMake
# Ubuntu
sudo apt-get install cmake

# macOS
brew upgrade cmake

# 或从官网下载最新版本
wget https://github.com/Kitware/CMake/releases/download/v3.28.0/cmake-3.28.0-linux-x86_64.tar.gz
tar -xzf cmake-3.28.0-linux-x86_64.tar.gz
export PATH=$PATH:$(pwd)/cmake-3.28.0-linux-x86_64/bin
```

#### 错误 2：内存不足

**现象：**
```
Error: c++: internal compiler error: Killed (program cc1plus)
```

**解决方案：**

```bash
# 方法 1：减少并行度
export VCPKG_MAX_CONCURRENCY=1
vcpkg install openssl

# 方法 2：增加交换空间
sudo fallocate -l 4G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile

# 方法 3：使用预编译的二进制文件
export VCPKG_BINARY_SOURCES="clear;default,readwrite"
vcpkg install openssl
```

#### 错误 3：缺少系统依赖

**现象：**
```
Error: Could not find zlib
```

**解决方案：**

```bash
# Ubuntu/Debian
sudo apt-get update
sudo apt-get install -y \
    build-essential \
    cmake \
    git \
    pkg-config \
    zip \
    unzip \
    ninja-build \
    curl \
    tar \
    zlib1g-dev

# macOS
brew install cmake git pkg-config

# 检查是否安装成功
which cmake
which gcc
```

### 依赖冲突

#### 错误 1：不同版本的包冲突

**现象：**
```
Error: Conflict between different versions of fmt
```

**解决方案：**

```bash
# 方法 1：删除冲突的包
vcpkg remove --purge fmt

# 方法 2：清理所有包
vcpkg remove --outdated

# 方法 3：使用 vcpkg.json 中的 overrides
{
  "name": "my-project",
  "overrides": [
    {
      "name": "fmt",
      "version": "9.1.0"
    }
  ]
}

# 方法 4：更新 baseline
vim vcpkg.json
# 更新 builtin-baseline 到最新的 SHA
```

#### 错误 2：循环依赖

**现象：**
```
Error: Circular dependency detected
```

**解决方案：**

```bash
# 检查依赖关系
vcpkg depend-info <package-name>

# 查看依赖图
vcpkg depend-info <package-name> --recurse

# 手动解决
# 1. 删除有问题的包
vcpkg remove --purge <package-name>

# 2. 修改 vcpkg.json，移除循环依赖

# 3. 重新安装
vcpkg install <package-name>
```

---

## 7.2 调试技巧

### 使用 --debug 参数

```bash
# 启用详细调试信息
vcpkg install fmt --debug

# 启用更详细的调试信息
vcpkg install fmt --debug --debug-each

# 查看构建日志
cat /path/to/vcpkg/buildtrees/fmt/build-*.log
```

### 查看构建日志

```bash
# 查看特定包的构建日志
cat /path/to/vcpkg/buildtrees/<package>/build-*.log

# 实时查看构建日志
tail -f /path/to/vcpkg/buildtrees/<package>/build-*.log

# 查看配置日志
cat /path/to/vcpkg/buildtrees/<package>/config-*.log

# 查看安装日志
cat /path/to/vcpkg/buildtrees/<package>/install-*.log
```

### 清理缓存

```bash
# 清理特定包的构建树
rm -rf /path/to/vcpkg/buildtrees/<package>

# 清理所有构建树
rm -rf /path/to/vcpkg/buildtrees/*

# 清理下载缓存
rm -rf /path/to/vcpkg/downloads/*

# 清理已安装的包
vcpkg remove --outdated

# 完全重置（谨慎使用）
rm -rf /path/to/vcpkg/buildtrees
rm -rf /path/to/vcpkg/downloads
rm -rf /path/to/vcpkg/installed
```

### 验证安装

```bash
# 列出已安装的包
vcpkg list

# 查看包的详细信息
vcpkg show <package-name>

# 检查包的文件
ls -la /path/to/vcpkg/installed/<triplet>/include/<package>/
ls -la /path/to/vcpkg/installed/<triplet>/lib/

# 验证 CMake 配置
cmake --find-package -DNAME=<package-name> -DCOMPILER_ID=GNU -DLANGUAGE=C -DMODE=EXIST
```

---

## 7.3 获取帮助

### 官方文档与社区

**官方资源：**

- **官方文档**: https://learn.microsoft.com/en-us/vcpkg/
- **GitHub 仓库**: https://github.com/microsoft/vcpkg
- **示例仓库**: https://github.com/microsoft/vcpkg-example
- **Wiki**: https://github.com/microsoft/vcpkg/wiki

**社区资源：**

- **Discord**: https://discord.gg/vcpkg
- **Stack Overflow**: 使用标签 `vcpkg`
- **Reddit**: r/vcpkg

### GitHub Issues

**提交 Issue 前的检查清单：**

- [ ] 搜索现有 Issue，确认问题未被报告
- [ ] 使用最新版本的 vcpkg
- [ ] 提供完整的错误信息
- [ ] 提供环境信息（操作系统、编译器版本等）
- [ ] 提供最小复现示例

**Issue 模板：**

```markdown
## Description
简要描述问题

## Environment
- OS: [e.g., Ubuntu 22.04]
- Compiler: [e.g., GCC 11.3]
- vcpkg version: [e.g., 2024-01-15]

## Steps to Reproduce
1. 运行命令：`vcpkg install fmt`
2. 观察到错误：...

## Expected Behavior
预期行为

## Actual Behavior
实际行为

## Log Output
```
错误日志
```

## Additional Context
其他相关信息
```

### 常用诊断命令

```bash
# 检查 vcpkg 版本
vcpkg version

# 检查系统信息
uname -a

# 检查编译器版本
gcc --version
clang --version
cmake --version

# 检查磁盘空间
df -h

# 检查内存
free -h  # Linux
vm_stat  # macOS

# 检查网络连接
curl -I https://github.com

# 检查 Git 配置
git config --list
```

---

## 7.4 常见问题FAQ

### Q1: 如何解决 "找不到 CMake 工具链文件" 错误？

**A:** 检查 toolchain 文件路径是否正确：

```bash
# 验证文件存在
ls -la /path/to/vcpkg/scripts/buildsystems/vcpkg.cmake

# 在 CMake 中指定正确路径
cmake -B build -S . \
  -DCMAKE_TOOLCHAIN_FILE=/path/to/vcpkg/scripts/buildsystems/vcpkg.cmake
```

### Q2: 如何处理 "端口不存在" 错误？

**A:** 确认包名正确，或使用 Overlay：

```bash
# 搜索包
vcpkg search <package-name>

# 检查拼写
vcpkg list | grep <package-name>

# 使用 Overlay
export VCPKG_OVERLAY_PORTS=/path/to/overlay
vcpkg install <package-name>
```

### Q3: 如何加快构建速度？

**A:** 使用多种优化方法：

```bash
# 1. 启用二进制缓存
export VCPKG_BINARY_SOURCES="clear;files,./vcpkg-cache,readwrite"

# 2. 使用编译缓存
export CC="ccache gcc"
export CXX="ccache g++"

# 3. 增加并行度
export VCPKG_MAX_CONCURRENCY=8

# 4. 使用预编译的二进制文件
vcpkg install <package> --binarysource=default,readwrite
```

### Q4: 如何在不同机器间共享已安装的包？

**A:** 使用二进制缓存：

```bash
# 机器 A：上传二进制文件
export VCPKG_BINARY_SOURCES="clear;files,./vcpkg-cache,readwrite"
vcpkg install <package>

# 复制缓存目录
scp -r ./vcpkg-cache user@machine-b:/path/to/

# 机器 B：使用缓存
export VCPKG_BINARY_SOURCES="clear;files,/path/to/vcpkg-cache,readwrite"
vcpkg install <package>
```

### Q5: 如何回退到之前的包版本？

**A:** 使用 baseline 或 overrides：

```json
// vcpkg.json
{
  "name": "my-project",
  "builtin-baseline": "d4e5f6a7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3",
  "overrides": [
    {
      "name": "fmt",
      "version": "9.1.0"
    }
  ]
}
```

### Q6: 如何处理 Windows 上的权限问题？

**A:** 以管理员身份运行或调整权限：

```powershell
# 方法 1：以管理员身份运行 PowerShell
# 右键 → 以管理员身份运行

# 方法 2：调整目录权限
icacls "C:\vcpkg" /grant "$($env:USERNAME):(OI)(CI)F"

# 方法 3：使用用户目录
# 将 vcpkg 安装在用户目录下
C:\Users\$env:USERNAME\vcpkg
```

### Q7: 如何在 CI/CD 中缓存 vcpkg 依赖？

**A:** 使用 CI/CD 的缓存功能：

```yaml
# GitHub Actions
- name: Cache vcpkg
  uses: actions/cache@v3
  with:
    path: |
      ~/.vcpkg-cache
      ~/vcpkg/installed
    key: ${{ runner.os }}-vcpkg-${{ hashFiles('vcpkg.json') }}
```

### Q8: 如何调试 vcpkg 端口？

**A:** 使用调试模式和手动构建：

```bash
# 1. 启用调试模式
vcpkg install <package> --debug

# 2. 查看构建日志
cat /path/to/vcpkg/buildtrees/<package>/build-*.log

# 3. 手动测试构建
cd /path/to/vcpkg/buildtrees/<package>/src
cmake -B build -S . -DCMAKE_INSTALL_PREFIX=/tmp/test
cmake --build build
cmake --install build

# 4. 检查安装结果
ls -la /tmp/test/
```

---

## 7.5 实战案例

### 案例：解决复杂的依赖冲突

**场景：**
项目需要使用 `boost` 和 `openssl`，但它们依赖不同版本的 `zlib`。

**步骤 1：诊断问题**

```bash
# 查看依赖关系
vcpkg depend-info boost --recurse
vcpkg depend-info openssl --recurse

# 查看已安装的包
vcpkg list

# 查看冲突
vcpkg install boost openssl
```

**步骤 2：解决冲突**

```bash
# 方法 1：使用 overrides 锁定版本
vim vcpkg.json

{
  "name": "my-project",
  "overrides": [
    {
      "name": "zlib",
      "version": "1.2.13"
    }
  ],
  "dependencies": [
    "boost",
    "openssl"
  ]
}
```

**步骤 3：清理并重新安装**

```bash
# 删除所有包
vcpkg remove --outdated

# 清理构建树
rm -rf /path/to/vcpkg/buildtrees/*

# 重新安装
vcpkg install boost openssl

# 验证
vcpkg list | grep -E "(boost|openssl|zlib)"
```

### 案例：解决 CI/CD 中的构建失败

**场景：**
本地构建成功，但 CI/CD 中构建失败。

**步骤 1：收集错误信息**

```bash
# 查看 CI 日志
# GitHub Actions: 在 Actions 页面查看
# GitLab CI: 在 CI/CD → Pipelines 查看

# 常见错误类型：
# - 网络问题
# - 内存不足
# - 编译器版本差异
# - 依赖缺失
```

**步骤 2：复现问题**

```bash
# 在本地模拟 CI 环境
docker run -it ubuntu:22.04 bash

# 在容器中安装依赖
apt-get update && apt-get install -y cmake git g++

# 克隆项目
git clone <repo-url>
cd project

# 运行相同的构建命令
cmake -B build -S . \
  -DCMAKE_TOOLCHAIN_FILE=/path/to/vcpkg/scripts/buildsystems/vcpkg.cmake
cmake --build build
```

**步骤 3：修复问题**

```bash
# 如果是网络问题：配置镜像或代理
export http_proxy=http://proxy.example.com:8080

# 如果是内存问题：减少并行度
export VCPKG_MAX_CONCURRENCY=1

# 如果是依赖问题：安装系统依赖
apt-get install -y zlib1g-dev libssl-dev

# 如果是编译器问题：使用特定版本
apt-get install -y gcc-11 g++-11
export CC=gcc-11
export CXX=g++-11
```

**步骤 4：更新 CI 配置**

```yaml
# .github/workflows/build.yml
name: Build

on: [push, pull_request]

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
    - uses: actions/checkout@v3
      with:
        submodules: recursive

    - name: Install dependencies
      run: |
        sudo apt-get update
        sudo apt-get install -y cmake git g++ zlib1g-dev libssl-dev

    - name: Setup environment
      run: |
        echo "VCPKG_MAX_CONCURRENCY=1" >> $GITHUB_ENV

    - name: Build
      run: |
        cmake -B build -S . \
          -DCMAKE_TOOLCHAIN_FILE=${{ github.workspace }}/vcpkg/scripts/buildsystems/vcpkg.cmake
        cmake --build build --config Release
```

---

## 小结

本章介绍了使用 vcpkg 时可能遇到的各种问题和解决方案：

1. 常见错误类型（网络问题、编译失败、依赖冲突）
2. 调试技巧（使用 --debug、查看日志、清理缓存）
3. 获取帮助的途径（官方文档、GitHub Issues、社区）
4. 常见问题 FAQ
5. 实战案例（解决依赖冲突、CI/CD 构建失败）

掌握这些故障排查技巧，可以帮助你快速解决使用 vcpkg 时遇到的各种问题。下一章是附录，提供了命令参考、三元组列表和相关资源链接。