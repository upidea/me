# 第三章：更新 vcpkg baseline（重点）

Baseline 是 vcpkg 的版本控制机制，它确保所有开发者使用相同的包版本。本章将深入讲解 baseline 的概念、使用方法和版本锁定策略。

---

## 3.1 什么是 baseline

### baseline 的作用

Baseline 是 vcpkg 的"时间快照"机制，它记录了特定日期时所有包的版本信息。当你指定一个 baseline 时，vcpkg 会使用该日期对应的包版本，而不是最新版本。

**为什么需要 baseline？**

1. **可复现性**：确保团队成员使用相同的依赖版本
2. **稳定性**：避免因依赖包更新导致的构建失败
3. **测试一致性**：开发和测试环境使用相同的依赖
4. **回滚能力**：可以快速回退到已知的工作版本

### 版本控制机制

vcpkg 使用 Git 提交 SHA 来标识 baseline，而不是简单的日期。每个 Git 提交都包含一个 `versions/baseline.json` 文件，记录了该时间点所有包的版本信息。

**baseline.json 结构示例：**

```json
{
  "default": {
    "fmt": {
      "baseline": "9.1.0",
      "port-version": 0
    },
    "spdlog": {
      "baseline": "1.12.0",
      "port-version": 1
    }
  }
}
```

**版本组成：**
- `baseline`: 包的上游版本号
- `port-version`: vcpkg 的补丁版本号（用于修复构建问题）

---

## 3.2 更新 baseline

### 查看当前 baseline

**方法 1：查看 vcpkg.json**

```bash
cat vcpkg.json
```

输出示例：
```json
{
  "name": "my-project",
  "version": "1.0.0",
  "builtin-baseline": "d8176e4b0f8b7b4c8e9a1b2c3d4e5f6a7b8c9d0e",
  "dependencies": [
    "fmt",
    "spdlog"
  ]
}
```

**方法 2：使用 vcpkg 命令**

```bash
# 查看当前 vcpkg 仓库的 baseline
cd /path/to/vcpkg
git log --oneline -1

# 查看版本数据库
git log --oneline versions/baseline.json -5
```

**方法 3：使用 vcpkg x-history 命令**

```bash
# 查看包的版本历史
vcpkg x-history fmt

# 查看当前 baseline 信息
vcpkg x-history fmt --baseline
```

### 更新到最新 baseline

**步骤 1：获取最新的 baseline SHA**

```bash
cd /path/to/vcpkg
git pull origin master
git log --oneline -1
```

输出示例：
```
a1b2c3d4 (HEAD -> master, origin/master) Update fmt to 10.0.0
```

SHA：`a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c`

**步骤 2：更新 vcpkg.json**

```json
{
  "name": "my-project",
  "version": "1.0.0",
  "builtin-baseline": "a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c",
  "dependencies": [
    "fmt",
    "spdlog"
  ]
}
```

**步骤 3：重新构建**

```bash
# 清理旧的构建
rm -rf build

# 重新配置（vcpkg 会使用新的 baseline）
cmake -B build -S . -DCMAKE_TOOLCHAIN_FILE=/path/to/vcpkg/scripts/buildsystems/vcpkg.cmake

# 构建
cmake --build build
```

### 回退到指定 baseline

**场景：** 更新到最新 baseline 后发现某些包有 bug，需要回退。

**步骤 1：查找历史 baseline**

```bash
cd /path/to/vcpkg
git log --oneline versions/baseline.json -10
```

输出示例：
```
a1b2c3d4 Update fmt to 10.0.0
b2d3e4f5 Update spdlog to 1.13.0
c3d4e5f6 Update nlohmann-json to 3.11.0
d4e5f6a7 Update fmt to 9.1.0
```

**步骤 2：选择稳定的 baseline SHA**

选择 `d4e5f6a7`（fmt 9.1.0 版本）

**步骤 3：更新 vcpkg.json**

```json
{
  "name": "my-project",
  "version": "1.0.0",
  "builtin-baseline": "d4e5f6a7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3",
  "dependencies": [
    "fmt",
    "spdlog"
  ]
}
```

**步骤 4：清理并重新构建**

```bash
# 清理旧的包安装
vcpkg remove --outdated

# 重新构建
rm -rf build
cmake -B build -S . -DCMAKE_TOOLCHAIN_FILE=/path/to/vcpkg/scripts/buildsystems/vcpkg.cmake
cmake --build build
```

---

## 3.3 版本锁定策略

### 使用 vcpkg.json 锁定版本

#### 方法 1：使用 overrides 强制指定版本

```json
{
  "name": "my-project",
  "version": "1.0.0",
  "builtin-baseline": "a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c",
  "dependencies": [
    "fmt",
    "spdlog"
  ],
  "overrides": [
    {
      "name": "fmt",
      "version": "9.1.0",
      "port-version": 0
    }
  ]
}
```

这会强制使用 fmt 9.1.0，即使 baseline 中是 10.0.0。

#### 方法 2：指定版本约束

```json
{
  "name": "my-project",
  "version": "1.0.0",
  "builtin-baseline": "a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c",
  "dependencies": [
    {
      "name": "fmt",
      "version>=": "9.0.0",
      "version<": "10.0.0"
    },
    "spdlog"
  ]
}
```

这会使用 9.x 系列的最新版本，但不会使用 10.0.0。

### 协同开发中的版本管理

#### 最佳实践 1：将 vcpkg.json 提交到版本控制

```bash
git add vcpkg.json
git commit -m "Add vcpkg dependency manifest"
git push
```

团队成员克隆项目后：

```bash
git clone <repo-url>
cd project

# 配置 CMake（vcpkg 会自动使用 vcpkg.json 中的 baseline）
cmake -B build -S . -DCMAKE_TOOLCHAIN_FILE=/path/to/vcpkg/scripts/buildsystems/vcpkg.cmake
```

#### 最佳实践 2：创建依赖清单文档

在项目根目录创建 `DEPENDENCIES.md`：

```markdown
# 依赖说明

## vcpkg 依赖

- **baseline**: `a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c` (2024-01-15)

### 核心依赖

- **fmt**: 10.0.0 - 格式化库
- **spdlog**: 1.12.0 - 日志库

## 更新依赖流程

1. 获取最新 baseline SHA
2. 更新 vcpkg.json 中的 `builtin-baseline`
3. 测试构建
4. 提交变更
```

#### 最佳实践 3：使用 Git Submodule 管理 vcpkg

```bash
# 在项目中添加 vcpkg 作为 submodule
git submodule add https://github.com/microsoft/vcpkg.git vcpkg
git commit -m "Add vcpkg as submodule"

# 团队成员克隆项目
git clone --recurse-submodules <repo-url>
cd project
cd vcpkg
./bootstrap-vcpkg.sh
```

**优点：**
- 团队使用相同的 vcpkg 版本
- vcpkg 更新受控
- 可以固定 vcpkg 的特定提交

### 生产环境版本控制最佳实践

#### 策略 1：使用固定的 baseline（推荐）

```json
{
  "name": "production-app",
  "version": "2.0.0",
  "builtin-baseline": "d4e5f6a7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3",
  "dependencies": [
    {
      "name": "fmt",
      "version": "9.1.0",
      "port-version": 0
    },
    {
      "name": "spdlog",
      "version": "1.12.0",
      "port-version": 0
    }
  ],
  "overrides": []
}
```

**优点：**
- 完全可复现
- 不会因 vcpkg 更新而改变
- 适合生产环境

#### 策略 2：使用版本锁定文件

创建 `vcpkg-lock.json`：

```json
{
  "version": "1.0.0",
  "dependencies": [
    {
      "name": "fmt",
      "version": "9.1.0",
      "port-version": 0,
      "sha256": "abc123..."
    },
    {
      "name": "spdlog",
      "version": "1.12.0",
      "port-version": 0,
      "sha256": "def456..."
    }
  ]
}
```

在 CI/CD 中验证：

```bash
#!/bin/bash
# validate-deps.sh

# 比对实际安装的版本与锁定文件
vcpkg list --format=json > installed.json

if ! diff vcpkg-lock.json installed.json; then
    echo "Dependency mismatch detected!"
    exit 1
fi
```

#### 策略 3：创建独立的依赖分支

```bash
# 创建依赖管理分支
git checkout -b deps/update-2024-01-15

# 更新 baseline
vim vcpkg.json

# 测试构建
rm -rf build
cmake -B build -S . -DCMAKE_TOOLCHAIN_FILE=/path/to/vcpkg/scripts/buildsystems/vcpkg.cmake
cmake --build build

# 运行测试
ctest --test-dir build

# 提交变更
git add vcpkg.json
git commit -m "Update dependencies to 2024-01-15 baseline"

# 合并到主分支
git checkout main
git merge deps/update-2024-01-15
```

---

## 3.4 常见问题

### 问题 1：更新后包版本冲突

**现象：**

```bash
vcpkg install fmt
Error: Conflict between different versions of fmt
```

**原因：**
- 不同项目使用了不同的 baseline
- 缓存中存在旧版本的包

**解决方案：**

```bash
# 1. 清理冲突的包
vcpkg remove --purge fmt

# 2. 清理构建缓存
rm -rf /path/to/vcpkg/buildtrees/fmt

# 3. 重新安装
vcpkg install fmt

# 4. 验证版本
vcpkg list | grep fmt
```

### 问题 2：回退 baseline 后的依赖处理

**现象：**
回退 baseline 后，某些依赖的版本与缓存不一致。

**解决方案：**

```bash
# 1. 删除所有已安装的包
vcpkg remove --outdated

# 2. 或者删除特定包
vcpkg remove --purge <package-name>

# 3. 清理构建树
rm -rf /path/to/vcpkg/buildtrees/*

# 4. 重新安装
vcpkg install --recurse
```

### 问题 3：多个项目共享 baseline

**场景：**
多个项目需要使用相同的依赖版本。

**解决方案 1：创建共享的 vcpkg.json 模板**

```bash
# 创建模板文件
cat > vcpkg-shared.json << EOF
{
  "name": "shared-dependencies",
  "version": "1.0.0",
  "builtin-baseline": "d4e5f6a7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3",
  "dependencies": [
    "fmt",
    "spdlog",
    "nlohmann-json"
  ]
}
EOF
```

各项目引用：

```json
{
  "name": "project-a",
  "version": "1.0.0",
  "builtin-baseline": "d4e5f6a7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3",
  "dependencies": [
    "fmt",
    "spdlog"
  ]
}
```

**解决方案 2：使用 Git Subtree**

```bash
# 创建共享依赖仓库
mkdir shared-deps
cd shared-deps
git init
echo "d4e5f6a7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3" > baseline.txt
git add baseline.txt
git commit -m "Initial baseline"

# 在项目中使用
cd /path/to/project
git subtree add --prefix=deps/shared <shared-deps-url> main
```

**解决方案 3：创建依赖管理脚本**

```bash
#!/bin/bash
# sync-deps.sh

SHARED_BASELINE="d4e5f6a7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3"

# 更新所有项目的 vcpkg.json
for project in project-a project-b project-c; do
    cd /path/to/$project
    sed -i "s/\"builtin-baseline\": \".*\"/\"builtin-baseline\": \"$SHARED_BASELINE\"/" vcpkg.json
    git add vcpkg.json
    git commit -m "Sync baseline to $SHARED_BASELINE"
done
```

---

## 3.5 实战案例

### 案例：团队协作中的依赖管理

**场景：**
一个 5 人团队开发一个大型项目，需要确保所有人使用相同的依赖版本。

**步骤 1：初始化项目依赖**

```bash
# 项目负责人创建初始 vcpkg.json
cat > vcpkg.json << EOF
{
  "name": "team-project",
  "version": "1.0.0",
  "builtin-baseline": "a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c",
  "dependencies": [
    "fmt",
    "spdlog",
    "nlohmann-json",
    "openssl",
    "boost-asio"
  ]
}
EOF

# 提交到版本控制
git add vcpkg.json
git commit -m "Add initial vcpkg dependencies"
git push
```

**步骤 2：团队成员设置**

```bash
# 每个团队成员
git clone <repo-url>
cd team-project

# 配置 CMake
cmake -B build -S . -DCMAKE_TOOLCHAIN_FILE=/path/to/vcpkg/scripts/buildsystems/vcpkg.cmake

# 首次构建会自动安装依赖
cmake --build build
```

**步骤 3：依赖更新流程**

```bash
# 项目负责人决定更新依赖
cd /path/to/vcpkg
git pull origin master
NEW_BASELINE=$(git log --oneline -1 | awk '{print $1}')

# 更新项目的 vcpkg.json
cd /path/to/team-project
sed -i "s/\"builtin-baseline\": \".*\"/\"builtin-baseline\": \"$NEW_BASELINE\"/" vcpkg.json

# 测试构建
rm -rf build
cmake -B build -S . -DCMAKE_TOOLCHAIN_FILE=/path/to/vcpkg/scripts/buildsystems/vcpkg.cmake
cmake --build build

# 运行测试
ctest --test-dir build

# 如果测试通过，提交变更
git add vcpkg.json
git commit -m "Update baseline to $NEW_BASELINE"
git push
```

**步骤 4：团队成员同步**

```bash
# 团队成员拉取最新代码
git pull

# 清理并重新构建
rm -rf build
cmake -B build -S . -DCMAKE_TOOLCHAIN_FILE=/path/to/vcpkg/scripts/buildsystems/vcpkg.cmake
cmake --build build
```

---

## 小结

本章深入讲解了 vcpkg 的 baseline 机制，包括：

1. baseline 的概念和作用
2. 如何查看、更新和回退 baseline
3. 版本锁定策略（overrides、版本约束）
4. 协同开发和生产环境的最佳实践
5. 常见问题的解决方案
6. 团队协作实战案例

掌握 baseline 管理是使用 vcpkg 的关键技能，它能确保你的项目依赖可复现、可控制。下一章将介绍维护模式（Maintainer Mode），这是提高构建稳定性的重要工具。