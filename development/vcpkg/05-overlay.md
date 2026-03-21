# 第五章：vcpkg Overlay（重点）

Overlay 是 vcpkg 的扩展机制，允许你添加自定义的端口（ports）而不需要修改 vcpkg 本身。本章将详细介绍 Overlay 的概念、创建方法、使用技巧和实战案例。

---

## 5.1 什么是 Overlay

### Overlay 的概念与作用

Overlay 是 vcpkg 提供的一种机制，允许你在项目级别或用户级别添加自定义的包定义，而不需要修改 vcpkg 官方仓库。

**Overlay 的主要用途：**

1. **使用未收录的库**：某些库尚未被 vcpkg 官方收录
2. **自定义编译选项**：为已有包添加特定的编译选项
3. **修复构建问题**：临时修复官方包的构建问题
4. **内部库管理**：管理公司内部的私有库
5. **测试新版本**：测试包的新版本或修改版本

### 何时需要使用 Overlay

**需要使用 Overlay 的场景：**

- ✅ 使用 GitHub 上未收录的第三方库
- ✅ 需要自定义编译参数
- ✅ 修复官方包的临时 bug
- ✅ 管理公司内部私有库
- ✅ 测试修改后的包版本

**不需要使用 Overlay 的场景：**

- ❌ 只使用官方收录的包
- ❌ 简单的依赖管理
- ❌ 临时测试（建议先试用官方包）

---

## 5.2 创建 Overlay 端口

### Overlay 端口目录结构

**标准 Overlay 端口结构：**

```
my-overlay/
└── ports/
    └── my-library/
        ├── portfile.cmake
        ├── vcpkg.json
        └── usage
```

**文件说明：**

- `portfile.cmake`：定义如何下载、配置、编译和安装包
- `vcpkg.json`：包的元数据（名称、版本、依赖等）
- `usage`（可选）：使用说明文档

### 编写 portfile.cmake

#### 基本结构

```cmake
# 下载源码
vcpkg_from_github(
    OUT_SOURCE_PATH SOURCE_PATH
    REPO example/my-library
    REF v1.0.0
    SHA512 0000000000000000000000000000000000000000000000000000000000000000
)

# 配置构建
vcpkg_cmake_configure(
    SOURCE_PATH "${SOURCE_PATH}"
)

# 编译和安装
vcpkg_cmake_install()

# 处理头文件
vcpkg_cmake_config_fixup(CONFIG_PATH lib/cmake/my-library)

# 删除调试信息
vcpkg_copy_pdbs()
```

#### 常用函数

| 函数 | 说明 |
|------|------|
| `vcpkg_from_github()` | 从 GitHub 下载源码 |
| `vcpkg_from_gitlab()` | 从 GitLab 下载源码 |
| `vcpkg_download_distfile()` | 下载任意文件 |
| `vcpkg_extract_source_archive()` | 解压源码 |
| `vcpkg_cmake_configure()` | 配置 CMake 项目 |
| `vcpkg_cmake_build()` | 使用 CMake 构建 |
| `vcpkg_cmake_install()` | 使用 CMake 安装 |
| `vcpkg_install_copyright()` | 安装版权文件 |

#### 完整示例

```cmake
# portfile.cmake
vcpkg_from_github(
    OUT_SOURCE_PATH SOURCE_PATH
    REPO example/my-library
    REF v1.2.3
    SHA512 1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef
    HEAD_REF main
)

# 检查是否支持当前平台
vcpkg_check_linkage(ONLY_STATIC_LIBRARY)

# 配置 CMake
vcpkg_cmake_configure(
    SOURCE_PATH "${SOURCE_PATH}"
    OPTIONS
        -DBUILD_EXAMPLES=OFF
        -DBUILD_TESTS=OFF
        -DBUILD_SHARED_LIBS=${BUILD_SHARED_LIBS}
)

# 构建
vcpkg_cmake_build()

# 安装
vcpkg_cmake_install()

# 安装版权信息
vcpkg_install_copyright(FILE_LIST "${SOURCE_PATH}/LICENSE")

# 处理 CMake 配置文件
vcpkg_cmake_config_fixup(CONFIG_PATH lib/cmake/my-library)

# 删除调试信息
vcpkg_copy_pdbs()
```

### 编写 vcpkg.json

#### 基本结构

```json
{
  "name": "my-library",
  "version": "1.2.3",
  "description": "A sample library",
  "homepage": "https://github.com/example/my-library",
  "license": "MIT",
  "dependencies": [
    "fmt",
    "spdlog"
  ]
}
```

#### 完整示例

```json
{
  "name": "my-library",
  "version": "1.2.3",
  "port-version": 0,
  "description": "A high-performance C++ library",
  "homepage": "https://github.com/example/my-library",
  "license": "MIT",
  "supports": "!xbox",
  "dependencies": [
    {
      "name": "fmt",
      "version>=": "9.0.0"
    },
    {
      "name": "spdlog",
      "platform": "!windows"
    }
  ],
  "features": {
    "network": {
      "description": "Network support",
      "dependencies": [
        "openssl"
      ]
    },
    "test": {
      "description": "Test support",
      "dependencies": [
        "catch2"
      ]
    }
  }
}
```

**字段说明：**

| 字段 | 说明 |
|------|------|
| `name` | 包名（必须） |
| `version` | 上游版本号（必须） |
| `port-version` | vcpkg 补丁版本号（默认 0） |
| `description` | 包的描述 |
| `homepage` | 项目主页 URL |
| `license` | 许可证 |
| `supports` | 平台支持约束 |
| `dependencies` | 依赖列表 |
| `features` | 可选功能特性 |

### 创建使用文档

```bash
# 创建 usage 文件
cat > my-overlay/ports/my-library/usage << EOF
The my-library package provides CMake targets:

    find_package(my-library CONFIG REQUIRED)
    target_link_libraries(main PRIVATE my-library::my-library)

Available features:
    - network: Enable network support
    - test: Enable test support
EOF
```

---

## 5.3 使用 Overlay

### 单项目 Overlay 配置

**方法 1：环境变量（推荐）**

```bash
# 设置 Overlay 路径
export VCPKG_OVERLAY_PORTS=/path/to/my-overlay

# 安装 Overlay 包
vcpkg install my-library
```

**方法 2：命令行参数**

```bash
# 临时指定 Overlay
vcpkg install my-library --overlay-ports=/path/to/my-overlay
```

**方法 3：CMake 配置**

```bash
cmake -B build -S . \
  -DCMAKE_TOOLCHAIN_FILE=/path/to/vcpkg/scripts/buildsystems/vcpkg.cmake \
  -DVCPKG_OVERLAY_PORTS=/path/to/my-overlay
```

### 多项目共享 Overlay

**方法 1：共享目录**

```bash
# 创建共享 Overlay 目录
mkdir -p /shared/vcpkg-overlays
chmod 755 /shared/vcpkg-overlays

# 各项目引用共享 Overlay
export VCPKG_OVERLAY_PORTS=/shared/vcpkg-overlays
```

**方法 2：Git Submodule**

```bash
# 在项目中添加 Overlay 作为 submodule
git submodule add https://github.com/my-org/vcpkg-overlays.git overlays
```

`.gitmodules`:
```ini
[submodule "overlays"]
    path = overlays
    url = https://github.com/my-org/vcpkg-overlays.git
```

使用：

```bash
# 克隆项目时
git clone --recurse-submodules <repo-url>

# 使用 Overlay
export VCPKG_OVERLAY_PORTS=$(pwd)/overlays
vcpkg install my-library
```

**方法 3：配置文件**

创建 `~/.vcpkg/config.json`:

```json
{
  "default-overlay-ports": [
    "/home/user/shared-vcpkg-overlays",
    "/company/vcpkg-overlays"
  ]
}
```

### Overlay 端口的版本管理

**使用 Git 管理 Overlay：**

```bash
# 初始化 Overlay 仓库
mkdir my-vcpkg-overlay
cd my-vcpkg-overlay
git init

# 添加端口目录结构
mkdir -p ports/my-library
# ... 创建 portfile.cmake 和 vcpkg.json

# 提交到版本控制
git add .
git commit -m "Add my-library port"
git remote add origin https://github.com/my-org/vcpkg-overlay.git
git push -u origin main
```

**团队协作：**

```bash
# 团队成员克隆 Overlay
git clone https://github.com/my-org/vcpkg-overlay.git
cd vcpkg-overlay

# 更新到最新版本
git pull origin main

# 使用 Overlay
export VCPKG_OVERLAY_PORTS=$(pwd)
vcpkg install my-library
```

---

## 5.4 实战案例

### 案例 1：使用第三方库（未收录到 vcpkg）

**场景：**
需要使用 `example-lib` 库，该库未收录到 vcpkg 官方仓库。

**步骤 1：创建 Overlay 端口**

```bash
# 创建 Overlay 目录
mkdir -p my-overlay/ports/example-lib
cd my-overlay/ports/example-lib
```

**步骤 2：编写 portfile.cmake**

```cmake
vcpkg_from_github(
    OUT_SOURCE_PATH SOURCE_PATH
    REPO user/example-lib
    REF v2.1.0
    SHA512 9876543210fedcba9876543210fedcba9876543210fedcba9876543210fedcba
)

vcpkg_cmake_configure(
    SOURCE_PATH "${SOURCE_PATH}"
    OPTIONS
        -DBUILD_EXAMPLES=OFF
        -DBUILD_TESTS=OFF
)

vcpkg_cmake_install()

vcpkg_cmake_config_fixup(CONFIG_PATH lib/cmake/example-lib)

vcpkg_install_copyright(FILE_LIST "${SOURCE_PATH}/LICENSE")
```

**步骤 3：编写 vcpkg.json**

```json
{
  "name": "example-lib",
  "version": "2.1.0",
  "description": "An example C++ library",
  "homepage": "https://github.com/user/example-lib",
  "license": "Apache-2.0",
  "dependencies": []
}
```

**步骤 4：安装和使用**

```bash
# 设置 Overlay
export VCPKG_OVERLAY_PORTS=/path/to/my-overlay

# 安装
vcpkg install example-lib

# 在项目中使用
```

**项目的 vcpkg.json:**

```json
{
  "name": "my-project",
  "dependencies": [
    "example-lib"
  ]
}
```

**CMakeLists.txt:**

```cmake
find_package(example-lib CONFIG REQUIRED)
target_link_libraries(my_app PRIVATE example-lib::example-lib)
```

### 案例 2：修改现有包的配置

**场景：**
官方的 `fmt` 包不满足特定需求，需要添加自定义编译选项。

**步骤 1：复制官方端口**

```bash
# 复制官方 fmt 端口到 Overlay
cp -r /path/to/vcpkg/ports/fmt my-overlay/ports/fmt-custom
```

**步骤 2：修改 portfile.cmake**

```cmake
# 添加自定义选项
vcpkg_cmake_configure(
    SOURCE_PATH "${SOURCE_PATH}"
    OPTIONS
        -DFMT_TEST=OFF
        -DFMT_DOC=OFF
        -DCUSTOM_OPTION=ON  # 自定义选项
)
```

**步骤 3：修改 vcpkg.json**

```json
{
  "name": "fmt-custom",
  "version": "10.0.0",
  "description": "Custom build of fmt library",
  "homepage": "https://github.com/fmtlib/fmt",
  "license": "MIT"
}
```

**步骤 4：安装自定义版本**

```bash
export VCPKG_OVERLAY_PORTS=/path/to/my-overlay
vcpkg install fmt-custom
```

### 案例 3：自定义编译选项

**场景：**
需要使用 OpenSSL 的特定配置（禁用某些功能）。

**步骤 1：创建 OpenSSL 自定义端口**

```bash
mkdir -p my-overlay/ports/openssl-custom
cd my-overlay/ports/openssl-custom
```

**步骤 2：修改 portfile.cmake**

```cmake
# 复制官方 portfile 并修改配置选项
vcpkg_from_github(
    OUT_SOURCE_PATH SOURCE_PATH
    REPO openssl/openssl
    REF openssl-3.1.2
    SHA512 ...
)

# 自定义配置脚本
file(WRITE "${SOURCE_PATH}/my-config.sh" "#!/bin/bash\n./config no-shared no-zlib no-async")

vcpkg_execute_build_process(
    COMMAND "${SOURCE_PATH}/my-config.sh" ${TARGET_TRIPLET}
    WORKING_DIRECTORY "${SOURCE_PATH}"
    LOGNAME config-${TARGET_TRIPLET}
)

vcpkg_install_make()

vcpkg_copy_tool_dependencies("${CURRENT_PACKAGES_DIR}/tools/openssl")

vcpkg_cmake_config_fixup(CONFIG_PATH lib/cmake/OpenSSL)

vcpkg_install_copyright(FILE_LIST "${SOURCE_PATH}/LICENSE.txt")
```

**步骤 3：安装自定义 OpenSSL**

```bash
export VCPKG_OVERLAY_PORTS=/path/to/my-overlay
vcpkg install openssl-custom
```

---

## 5.5 常见问题

### 问题 1：Overlay 端口与官方端口冲突

**现象：**
Overlay 中的包名与官方包名相同。

**解决方案：**

```bash
# 方法 1：重命名 Overlay 包
# 将 my-overlay/ports/fmt 改为 my-overlay/ports/fmt-custom

# 方法 2：优先使用 Overlay
vcpkg install fmt --overlay-ports=/path/to/my-overlay

# 方法 3：删除官方包
vcpkg remove --purge fmt
vcpkg install fmt
```

### 问题 2：Overlay 依赖管理

**现象：**
Overlay 包依赖其他 Overlay 包，找不到依赖。

**解决方案：**

```bash
# 方法 1：设置多个 Overlay 路径
export VCPKG_OVERLAY_PORTS="/path/to/overlay1:/path/to/overlay2"

# 方法 2：将所有 Overlay 放在同一目录
mkdir my-overlay/ports
cp -r overlay1/* my-overlay/ports/
cp -r overlay2/* my-overlay/ports/

export VCPKG_OVERLAY_PORTS=/path/to/my-overlay
```

### 问题 3：调试 Overlay 端口

**现象：**
Overlay 端口构建失败，需要调试。

**解决方案：**

```bash
# 1. 启用详细日志
vcpkg install my-library --debug

# 2. 查看构建日志
cat /path/to/vcpkg/buildtrees/my-library/build-*.log

# 3. 手动测试构建
cd /path/to/vcpkg/buildtrees/my-library/src
cmake -B build -S . -DCMAKE_INSTALL_PREFIX=/tmp/test-install
cmake --build build
cmake --install build

# 4. 检查安装结果
ls -la /tmp/test-install/
```

---

## 5.6 高级技巧

### 使用环境变量动态配置

```cmake
# portfile.cmake
if(DEFINED ENV{MY_CUSTOM_OPTION})
    set(CUSTOM_OPTION $ENV{MY_CUSTOM_OPTION})
else()
    set(CUSTOM_OPTION OFF)
endif()

vcpkg_cmake_configure(
    SOURCE_PATH "${SOURCE_PATH}"
    OPTIONS
        -DCUSTOM_OPTION=${CUSTOM_OPTION}
)
```

使用：

```bash
export MY_CUSTOM_OPTION=ON
vcpkg install my-library
```

### 创建可复用的 Overlay 模板

```bash
# 创建模板目录
mkdir -p overlay-templates/{cmake,meson,autotools}

# CMake 模板
cat > overlay-templates/cmake/portfile.cmake.template << 'EOF'
vcpkg_from_github(
    OUT_SOURCE_PATH SOURCE_PATH
    REPO {{REPO}}
    REF {{VERSION}}
    SHA512 {{SHA512}}
)

vcpkg_cmake_configure(
    SOURCE_PATH "${SOURCE_PATH}"
)

vcpkg_cmake_install()

vcpkg_cmake_config_fixup(CONFIG_PATH lib/cmake/{{PACKAGE_NAME}})

vcpkg_install_copyright(FILE_LIST "${SOURCE_PATH}/LICENSE")
EOF
```

使用脚本生成端口：

```bash
#!/bin/bash
# generate-port.sh

REPO=$1
VERSION=$2
PACKAGE_NAME=$3

cp overlay-templates/cmake/portfile.cmake.template ports/${PACKAGE_NAME}/portfile.cmake
sed -i "s/{{REPO}}/${REPO}/g" ports/${PACKAGE_NAME}/portfile.cmake
sed -i "s/{{VERSION}}/${VERSION}/g" ports/${PACKAGE_NAME}/portfile.cmake
sed -i "s/{{PACKAGE_NAME}}/${PACKAGE_NAME}/g" ports/${PACKAGE_NAME}/portfile.cmake

echo "Port ${PACKAGE_NAME} created. Please update SHA512."
```

---

## 小结

本章全面介绍了 vcpkg Overlay 的使用方法：

1. Overlay 的概念和适用场景
2. 如何创建 Overlay 端口（目录结构、portfile.cmake、vcpkg.json）
3. 不同场景下的 Overlay 使用方法
4. 三个实战案例（第三方库、修改现有包、自定义编译）
5. 常见问题的解决方案
6. 高级技巧和模板化方法

Overlay 是扩展 vcpkg 功能的强大工具，让你能够灵活地管理各种依赖，包括未收录的库和自定义配置。下一章将介绍高级场景，包括二进制缓存、自定义三元组等。