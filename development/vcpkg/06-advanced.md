# 第六章：高级场景

本章介绍 vcpkg 的高级功能和使用场景，包括二进制缓存、自定义三元组、跨平台开发和性能优化。掌握这些技巧可以让你更高效地使用 vcpkg。

---

## 6.1 vcpkg 二进制缓存

### 配置缓存服务器

二进制缓存可以大幅减少重复构建的时间，特别适合 CI/CD 环境。

#### 使用 Azure Blob Storage

**配置文件：**

```bash
# 设置环境变量
export VCPKG_BINARY_SOURCES="clear;default,readwrite"
export VCPKG_DEFAULT_BINARY_CACHE=clear;default,readwrite

# 使用 Azure Blob Storage
export VCPKG_BINARY_SOURCES="clear;default,readwrite,https://myaccount.blob.core.windows.net/vcpkg"
```

**完整配置示例：**

```bash
#!/bin/bash
# setup-binary-cache.sh

# Azure Blob Storage
AZURE_CONNECTION_STRING="DefaultEndpointsProtocol=https;AccountName=myaccount;..."

# 配置二进制缓存
export VCPKG_BINARY_SOURCES="clear;default,readwrite"
export VCPKG_DOWNLOADS=/mnt/cache/vcpkg-downloads

# 如果有 Azure 存储，配置它
if [ -n "$AZURE_CONNECTION_STRING" ]; then
    export VCPKG_BINARY_SOURCES="clear;default,readwrite,azure,$AZURE_CONNECTION_STRING"
fi

echo "Binary cache configured"
echo "VCPKG_BINARY_SOURCES: $VCPKG_BINARY_SOURCES"
```

#### 使用本地文件系统缓存

```bash
# 设置本地缓存目录
export VCPKG_BINARY_SOURCES="clear;files,/mnt/vcpkg-cache,readwrite"

# 或使用相对路径
export VCPKG_BINARY_SOURCES="clear;files,./vcpkg-cache,readwrite"
```

**目录结构：**

```
vcpkg-cache/
├── x64-linux/
│   ├── fmt/
│   ├── spdlog/
│   └── ...
├── x64-windows/
│   ├── fmt/
│   └── ...
└── arm64-osx/
    └── ...
```

#### 使用 NuGet 源

```bash
# 配置 NuGet 源
nuget sources add -name vcpkg-cache -source https://nuget.pkg.github.com/my-org/index.json

# 设置 vcpkg 使用 NuGet
export VCPKG_BINARY_SOURCES="clear;nuget,https://nuget.pkg.github.com/my-org/index.json,readwrite"
```

### CI/CD 环境中的缓存优化

#### GitHub Actions 示例

```yaml
name: Build with Binary Cache

on: [push, pull_request]

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
    - uses: actions/checkout@v3
      with:
        submodules: recursive

    - name: Setup vcpkg
      run: |
        git clone https://github.com/Microsoft/vcpkg.git
        cd vcpkg
        ./bootstrap-vcpkg.sh

    - name: Setup binary cache
      env:
        VCPKG_BINARY_SOURCES: "clear;files,$HOME/.vcpkg-cache,readwrite"
      run: |
        echo "VCPKG_BINARY_SOURCES=$VCPKG_BINARY_SOURCES" >> $GITHUB_ENV

    - name: Restore cache
      uses: actions/cache@v3
      with:
        path: ~/.vcpkg-cache
        key: vcpkg-${{ runner.os }}-${{ hashFiles('vcpkg.json') }}

    - name: Configure and build
      env:
        VCPKG_BINARY_SOURCES: ${{ env.VCPKG_BINARY_SOURCES }}
      run: |
        cmake -B build -S . \
          -DCMAKE_TOOLCHAIN_FILE=${{ github.workspace }}/vcpkg/scripts/buildsystems/vcpkg.cmake
        cmake --build build --config Release
```

#### GitLab CI 示例

```yaml
stages:
  - build

variables:
  VCPKG_BINARY_SOURCES: "clear;files,/cache/vcpkg,readwrite"

cache:
  paths:
    - /cache/vcpkg/

build:
  stage: build
  image: ubuntu:22.04

  before_script:
    - apt-get update && apt-get install -y cmake git g++
    - git clone https://github.com/Microsoft/vcpkg.git
    - cd vcpkg && ./bootstrap-vcpkg.sh

  script:
    - cmake -B build -S . -DCMAKE_TOOLCHAIN_FILE=vcpkg/scripts/buildsystems/vcpkg.cmake
    - cmake --build build --config Release
```

#### Jenkins Pipeline 示例

```groovy
pipeline {
    agent any

    environment {
        VCPKG_BINARY_SOURCES = "clear;files,/mnt/vcpkg-cache,readwrite"
    }

    stages {
        stage('Setup') {
            steps {
                sh '''
                    git clone https://github.com/Microsoft/vcpkg.git
                    cd vcpkg && ./bootstrap-vcpkg.sh
                '''
            }
        }

        stage('Build') {
            steps {
                sh '''
                    cmake -B build -S . \
                      -DCMAKE_TOOLCHAIN_FILE=${WORKSPACE}/vcpkg/scripts/buildsystems/vcpkg.cmake
                    cmake --build build --config Release
                '''
            }
        }
    }

    post {
        always {
            archiveArtifacts artifacts: 'build/bin/*', allowEmptyArchive: true
        }
    }
}
```

---

## 6.2 自定义三元组

### 何时需要自定义三元组

**需要自定义三元组的场景：**

- 使用非标准编译器
- 需要特定的编译选项
- 使用交叉编译
- 平台特定的配置

### 三元组文件编写

#### 创建自定义三元组文件

```bash
# 创建三元组目录
mkdir -p /path/to/vcpkg/triplets/community

# 创建自定义三元组文件
vim /path/to/vcpkg/triplets/community/x64-linux-gcc11.cmake
```

#### 三元组文件结构

```cmake
# x64-linux-gcc11.cmake
set(VCPKG_TARGET_ARCHITECTURE x64)
set(VCPKG_CRT_LINKAGE dynamic)
set(VCPKG_LIBRARY_LINKAGE static)

set(VCPKG_CMAKE_SYSTEM_NAME Linux)
set(VCPKG_CMAKE_SYSTEM_VERSION 1)

# 编译器配置
set(VCPKG_CMAKE_C_COMPILER gcc-11)
set(VCPKG_CMAKE_CXX_COMPILER g++-11)

# 编译选项
set(VCPKG_CMAKE_FLAGS "-march=native -mtune=native")
set(VCPKG_CXX_FLAGS "-fvisibility=hidden")

# 其他选项
set(VCPKG_BUILD_TYPE release)
```

#### 完整示例：交叉编译三元组

```cmake
# arm-linux-gnueabihf.cmake
set(VCPKG_TARGET_ARCHITECTURE arm)
set(VCPKG_CRT_LINKAGE dynamic)
set(VCPKG_LIBRARY_LINKAGE static)

set(VCPKG_CMAKE_SYSTEM_NAME Linux)
set(VCPKG_CMAKE_SYSTEM_VERSION 1)

# 交叉编译工具链
set(VCPKG_CMAKE_C_COMPILER arm-linux-gnueabihf-gcc)
set(VCPKG_CMAKE_CXX_COMPILER arm-linux-gnueabihf-g++)
set(VCPKG_CMAKE_AR arm-linux-gnueabihf-ar)
set(VCPKG_CMAKE_RANLIB arm-linux-gnueabihf-ranlib)
set(VCPKG_CMAKE_STRIP arm-linux-gnueabihf-strip)

# 根文件系统
set(VCPKG_CMAKE_SYSROOT /opt/arm-sysroot)

# 链接选项
set(VCPKG_CMAKE_LINKER_FLAGS "--sysroot=/opt/arm-sysroot")

# 其他配置
set(VCPKG_BUILD_TYPE release)
set(VCPKG_FIND_LIBRARY_SUFFIXES .a .so)
```

#### 使用自定义三元组

```bash
# 方法 1：命令行指定
vcpkg install fmt --triplet=x64-linux-gcc11

# 方法 2：环境变量
export VCPKG_DEFAULT_TRIPLET=x64-linux-gcc11
vcpkg install fmt

# 方法 3：CMake 配置
cmake -B build -S . \
  -DCMAKE_TOOLCHAIN_FILE=/path/to/vcpkg/scripts/buildsystems/vcpkg.cmake \
  -DVCPKG_TARGET_TRIPLET=x64-linux-gcc11
```

### 常见自定义场景

#### 场景 1：使用 Clang 编译器

```cmake
# x64-linux-clang.cmake
set(VCPKG_TARGET_ARCHITECTURE x64)
set(VCPKG_CRT_LINKAGE dynamic)
set(VCPKG_LIBRARY_LINKAGE static)

set(VCPKG_CMAKE_SYSTEM_NAME Linux)
set(VCPKG_CMAKE_SYSTEM_VERSION 1)

set(VCPKG_CMAKE_C_COMPILER clang)
set(VCPKG_CMAKE_CXX_COMPILER clang++)

set(VCPKG_CMAKE_FLAGS "-stdlib=libc++")
set(VCPKG_CXX_FLAGS "-stdlib=libc++")
```

#### 场景 2：启用 LTO 优化

```cmake
# x64-linux-lto.cmake
set(VCPKG_TARGET_ARCHITECTURE x64)
set(VCPKG_CRT_LINKAGE dynamic)
set(VCPKG_LIBRARY_LINKAGE static)

set(VCPKG_CMAKE_SYSTEM_NAME Linux)
set(VCPKG_CMAKE_SYSTEM_VERSION 1)

set(VCPKG_CMAKE_C_COMPILER gcc)
set(VCPKG_CMAKE_CXX_COMPILER g++)

set(VCPKG_CMAKE_FLAGS "-flto -fuse-linker-plugin")
set(VCPKG_CXX_FLAGS "-flto -fuse-linker-plugin")
```

#### 场景 3：调试版本

```cmake
# x64-linux-debug.cmake
set(VCPKG_TARGET_ARCHITECTURE x64)
set(VCPKG_CRT_LINKAGE dynamic)
set(VCPKG_LIBRARY_LINKAGE static)

set(VCPKG_CMAKE_SYSTEM_NAME Linux)
set(VCPKG_CMAKE_SYSTEM_VERSION 1)

set(VCPKG_BUILD_TYPE debug)

set(VCPKG_CMAKE_FLAGS "-g -O0")
set(VCPKG_CXX_FLAGS "-g -O0")

set(VCPKG_CMAKE_DEBUG_POSTFIX d)
```

---

## 6.3 跨平台开发

### 多平台依赖管理

#### 方法 1：使用 vcpkg.json 的平台约束

```json
{
  "name": "cross-platform-project",
  "version": "1.0.0",
  "dependencies": [
    {
      "name": "fmt",
      "platform": "!windows"
    },
    {
      "name": "spdlog",
      "platform": "windows|linux"
    },
    {
      "name": "openssl",
      "platform": "!android"
    }
  ]
}
```

#### 方法 2：使用 CMake 条件依赖

```cmake
# CMakeLists.txt
if(WIN32)
    find_package(fmt CONFIG REQUIRED)
elseif(APPLE)
    find_package(fmt CONFIG REQUIRED)
    find_package(spdlog CONFIG REQUIRED)
elseif(UNIX)
    find_package(fmt CONFIG REQUIRED)
    find_package(spdlog CONFIG REQUIRED)
endif()
```

### 条件依赖配置

#### vcpkg.json 中的条件依赖

```json
{
  "name": "my-project",
  "version": "1.0.0",
  "dependencies": [
    {
      "name": "fmt",
      "platform": "!windows"
    }
  ],
  "overrides": [
    {
      "name": "spdlog",
      "version": "1.12.0",
      "platform": "linux"
    }
  ]
}
```

#### 使用 `$<platform>` 表达式

```json
{
  "name": "my-project",
  "version": "1.0.0",
  "dependencies": [
    {
      "name": "fmt",
      "platform": "!$<platform:windows>"
    },
    {
      "name": "openssl",
      "platform": "$<platform:windows>|$<platform:linux>"
    }
  ]
}
```

### 跨平台构建脚本

#### 完整的跨平台构建脚本

```bash
#!/bin/bash
# build-all-platforms.sh

set -e

# 平台配置
PLATFORMS=(
    "x64-linux:ubuntu-latest"
    "x64-windows:windows-latest"
    "arm64-osx:macos-latest"
)

# 构建函数
build_platform() {
    local triplet=$1
    local runner=$2

    echo "Building for $triplet ($runner)"

    # 配置 CMake
    cmake -B build-${triplet} -S . \
        -DCMAKE_TOOLCHAIN_FILE=${VCPKG_ROOT}/scripts/buildsystems/vcpkg.cmake \
        -DVCPKG_TARGET_TRIPLET=${triplet}

    # 构建
    cmake --build build-${triplet} --config Release

    # 运行测试
    ctest --test-dir build-${triplet} --config Release
}

# 遍历所有平台
for platform in "${PLATFORMS[@]}"; do
    IFS=':' read -r triplet runner <<< "$platform"
    build_platform "$triplet" "$runner"
done

echo "All platforms built successfully"
```

---

## 6.4 性能优化

### 并行安装

#### 方法 1：使用 vcpkg 的并行功能

```bash
# 启用并行安装（默认已启用）
vcpkg install fmt spdlog nlohmann-json

# 设置并行度
export VCPKG_MAX_CONCURRENCY=8
vcpkg install fmt spdlog nlohmann-json
```

#### 方法 2：使用 GNU Parallel

```bash
# 安装 GNU Parallel
sudo apt-get install parallel  # Ubuntu
brew install parallel  # macOS

# 并行安装多个包
cat packages.txt | parallel -j 4 vcpkg install {}
```

`packages.txt`:
```
fmt
spdlog
nlohmann-json
openssl
boost
```

### 减少构建时间

#### 方法 1：使用二进制缓存

```bash
# 配置二进制缓存
export VCPKG_BINARY_SOURCES="clear;files,./vcpkg-cache,readwrite"

# 安装包（会优先使用缓存）
vcpkg install fmt
```

#### 方法 2：使用编译缓存（ccache）

```bash
# 安装 ccache
sudo apt-get install ccache  # Ubuntu
brew install ccache  # macOS

# 配置环境变量
export CC="ccache gcc"
export CXX="ccache g++"
export CCACHE_DIR=/mnt/ccache

# 安装包
vcpkg install openssl
```

#### 方法 3：跳过不必要的构建

```bash
# 只下载不安装
vcpkg download fmt

# 只配置不构建
vcpkg install fmt --overlay-ports=/path/to/overlay --no-binarycaching

# 使用预编译的二进制文件
vcpkg install fmt --binarysource=default,readwrite
```

### 优化网络下载

#### 方法 1：使用代理

```bash
# 设置 HTTP 代理
export http_proxy=http://proxy.example.com:8080
export https_proxy=http://proxy.example.com:8080

# 设置 Git 代理
git config --global http.proxy http://proxy.example.com:8080
git config --global https.proxy http://proxy.example.com:8080

# 安装包
vcpkg install openssl
```

#### 方法 2：使用镜像

```bash
# 使用 GitHub 镜像
git clone https://github.com.cnpmjs.org/microsoft/vcpkg.git

# 或使用代理脚本
cat > vcpkg-proxy.sh << 'EOF'
#!/bin/bash
# 将 GitHub URL 替换为镜像 URL
URL=$(echo $1 | sed 's|https://github.com/|https://github.com.cnpmjs.org/|')
curl -L "$URL" -o "$2"
EOF

chmod +x vcpkg-proxy.sh
export VCPKG_DOWNLOADS=/path/to/vcpkg-proxy.sh
```

#### 方法 3：预下载依赖

```bash
#!/bin/bash
# pre-download.sh

# 下载所有依赖
vcpkg download --all

# 或指定包
vcpkg download fmt spdlog nlohmann-json

# 验证下载
ls -lh /path/to/vcpkg/downloads/
```

---

## 6.5 实战案例

### 案例：大型项目的跨平台构建

**场景：**
一个大型 C++ 项目需要在 Windows、Linux 和 macOS 上构建，使用 vcpkg 管理依赖。

**项目结构：**

```
my-project/
├── CMakeLists.txt
├── vcpkg.json
├── scripts/
│   ├── build-all.sh
│   └── setup-env.sh
└── src/
```

**vcpkg.json:**

```json
{
  "name": "my-project",
  "version": "2.0.0",
  "description": "A cross-platform C++ application",
  "dependencies": [
    "fmt",
    "spdlog",
    "nlohmann-json",
    {
      "name": "openssl",
      "platform": "!windows"
    }
  ]
}
```

**scripts/setup-env.sh:**

```bash
#!/bin/bash
# 设置环境变量

# 检测平台
if [[ "$OSTYPE" == "linux-gnu"* ]]; then
    export TRIPLET="x64-linux"
elif [[ "$OSTYPE" == "darwin"* ]]; then
    export TRIPLET="arm64-osx"
elif [[ "$OSTYPE" == "msys" || "$OSTYPE" == "win32" ]]; then
    export TRIPLET="x64-windows"
fi

# 设置 vcpkg 路径
export VCPKG_ROOT=$(cd "$(dirname "$0")/../vcpkg" && pwd)
export PATH="$VCPKG_ROOT:$PATH"

# 设置二进制缓存
export VCPKG_BINARY_SOURCES="clear;files,$HOME/.vcpkg-cache,readwrite"

# 设置并行度
export VCPKG_MAX_CONCURRENCY=4

echo "Environment setup for $TRIPLET"
```

**scripts/build-all.sh:**

```bash
#!/bin/bash
set -e

# 设置环境
source scripts/setup-env.sh

# 平台列表
PLATFORMS=(
    "x64-linux"
    "x64-windows"
    "arm64-osx"
)

# 构建函数
build() {
    local triplet=$1

    echo "Building for $triplet..."

    # 清理旧的构建
    rm -rf build-$triplet

    # 配置
    cmake -B build-$triplet -S . \
        -DCMAKE_TOOLCHAIN_FILE=$VCPKG_ROOT/scripts/buildsystems/vcpkg.cmake \
        -DVCPKG_TARGET_TRIPLET=$triplet

    # 构建
    cmake --build build-$triplet --config Release -j4

    # 测试
    ctest --test-dir build-$triplet --config Release

    # 打包
    cpack -C Release -B build-$triplet/package
}

# 遍历平台
for platform in "${PLATFORMS[@]}"; do
    build "$platform"
done

echo "All builds completed successfully"
```

**构建脚本：**

```bash
# 设置环境
source scripts/setup-env.sh

# 构建当前平台
cmake -B build -S . \
    -DCMAKE_TOOLCHAIN_FILE=$VCPKG_ROOT/scripts/buildsystems/vcpkg.cmake \
    -DVCPKG_TARGET_TRIPLET=$TRIPLET

cmake --build build --config Release

# 运行
./build/my-app
```

---

## 小结

本章介绍了 vcpkg 的高级功能和使用场景：

1. 二进制缓存的配置（Azure、本地文件、NuGet）
2. CI/CD 环境中的缓存优化
3. 自定义三元组的创建和使用
4. 跨平台开发技巧
5. 性能优化方法（并行安装、编译缓存、网络优化）
6. 大型项目的跨平台构建实战案例

掌握这些高级技巧可以让你更高效地使用 vcpkg，特别是在大型项目和 CI/CD 环境中。下一章将介绍故障排查，帮助你解决使用过程中遇到的各种问题。