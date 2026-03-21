# 阶段一：快速上手与基础实践

欢迎来到 RmlUi 学习的第一阶段！本阶段将帮助你快速上手，理解基本概念，并能够运行简单的示例。

---

## 📖 本章内容

1. [环境搭建](01-environment-setup.md) - 编译和运行示例
2. [核心概念](02-core-concepts.md) - Context、Document、Element 的关系
3. [RML 基础](03-rml-basics.md) - 文档结构、常用标签、属性语法
4. [RCSS 基础](04-rcss-basics.md) - 选择器、常用样式、盒模型
5. [基本集成](05-first-integration.md) - 在项目中集成 RmlUi

---

## 🎯 学习目标

完成本阶段后，你将能够：

- ✅ 编译并运行 RmlUi 示例程序
- ✅ 理解 RmlUi 的核心架构和工作流程
- ✅ 编写基本的 RML 文档和 RCSS 样式
- ✅ 在你的项目中完成 RmlUi 的基础集成

---

## 📝 实践任务

### 任务 1：编译示例

```bash
# 配置 CMake
cmake -B Build -S . -DRMLUI_BACKEND=GLFW_GL3 -DRMLUI_SAMPLES=ON

# 编译
cmake --build Build --config Release
```

### 任务 2：运行并探索示例

运行以下示例，熟悉 RmlUi 的能力：

```bash
# 基础文档加载示例
./Build/Samples/basic/load_document/load_document

# 综合演示示例（强烈推荐）
./Build/Samples/basic/demo/demo

# 拖拽示例
./Build/Samples/basic/drag/drag
```

### 任务 3：修改示例

选择一个示例，尝试以下修改：
- 修改背景颜色
- 添加一个新的文本元素
- 调整元素的大小和位置

### 任务 4：创建你的第一个界面

创建一个简单的游戏主菜单，包含：
- 游戏标题
- "开始游戏"按钮
- "设置"按钮
- "退出"按钮

---

## ⏱️ 预计时间

3-5 天（每天 2-3 小时）

---

## 📚 参考资源

- [官方入门文档](https://mikke89.github.io/RmlUiDoc/pages/getting_started.html)
- [RML 元素索引](https://mikke89.github.io/RmlUiDoc/pages/rml/element_index.html)
- [RCSS 选择器语法](https://mikke89.github.io/RmlUiDoc/pages/rcss/selectors.html)

---

让我们开始 [环境搭建](01-environment-setup.md) 的学习吧！
