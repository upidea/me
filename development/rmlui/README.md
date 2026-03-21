# RmlUi 深度学习教程

本教程旨在帮助你从应用开发的角度，由浅入深地掌握 RmlUi 库的使用。

---

## 📖 教程结构

本教程分为 6 个阶段，每个阶段包含理论讲解和实践任务。

| 阶段 | 主题 | 文档 | 预计时间 |
|------|------|------|----------|
| **阶段一** | 快速上手与基础实践 | [01-basics](01-basics/README.md) | 3-5 天 |
| **阶段二** | 界面构建与样式精通 | [02-layout-style](02-layout-style/README.md) | 1-2 周 |
| **阶段三** | 交互与数据驱动 | [03-interaction-data](03-interaction-data/README.md) | 2 周 |
| **阶段四** | 动画与视觉效果 | [04-animation-effects](04-animation-effects/README.md) | 1-2 周 |
| **阶段五** | 高级定制与扩展 | [05-advanced-custom](05-advanced-custom/README.md) | 2 周 |
| **阶段六** | 架构设计与最佳实践 | [06-architecture](06-architecture/README.md) | 1 周 |

---

## 🎯 学习目标

完成本教程后，你将能够：

- ✅ 在项目中集成 RmlUi 并构建完整的 UI 系统
- ✅ 使用 RML/RCSS 创建复杂的响应式界面
- ✅ 通过数据绑定实现数据驱动的 UI
- ✅ 创建流畅的动画和视觉特效
- ✅ 自定义元素、装饰器和插件
- ✅ 设计可扩展的 UI 架构

---

## 📦 前置要求

### 知识储备
- C++17 基础知识
- 基本的图形编程概念
- HTML/CSS 基础（有帮助但非必需）

### 环境准备
- CMake 3.16+
- C++17 兼容编译器
- 选择以下之一的后端：
  - GLFW + OpenGL 3
  - SDL2 + OpenGL 3
  - Win32 + OpenGL 2
  - X11 + OpenGL 2

### 编译示例

```bash
# 克隆仓库（如果你还没有）
git clone https://github.com/mikke89/RmlUi.git
cd RmlUi

# 配置 CMake（以 GLFW+GL3 后端为例）
cmake -B Build -S . -DRMLUI_BACKEND=GLFW_GL3 -DRMLUI_SAMPLES=ON

# 编译
cmake --build Build

# 运行示例
./Build/Samples/basic/demo/demo
```

---

## 🗂️ 目录说明

```
docs/
├── README.md                      # 本文件，教程总览
├── 01-basics/                     # 阶段一：基础入门
│   ├── README.md                  # 阶段一概述
│   ├── 01-environment-setup.md    # 环境搭建
│   ├── 02-core-concepts.md        # 核心概念
│   ├── 03-rml-basics.md           # RML 基础
│   ├── 04-rcss-basics.md          # RCSS 基础
│   └── 05-first-integration.md    # 基本集成
├── 02-layout-style/               # 阶段二：布局与样式
│   ├── README.md
│   ├── 01-layout-system.md        # 布局系统
│   ├── 02-advanced-style.md       # 高级样式
│   ├── 03-built-in-controls.md    # 内置控件
│   ├── 04-template-system.md      # 模板系统
│   ├── 05-resource-management.md  # 资源管理
│   └── 06-responsive-design.md    # 响应式设计
├── 03-interaction-data/           # 阶段三：交互与数据
│   ├── README.md
│   ├── 01-event-system.md         # 事件系统
│   ├── 02-data-binding-basics.md  # 数据绑定基础
│   ├── 03-data-binding-advanced.md# 数据绑定进阶
│   ├── 04-custom-data-views.md    # 自定义数据视图
│   ├── 05-two-way-binding.md      # 双向绑定
│   └── 06-dom-manipulation.md     # DOM 操作
├── 04-animation-effects/          # 阶段四：动画与效果
│   ├── README.md
│   ├── 01-transitions.md          # CSS 过渡
│   ├── 02-keyframe-animation.md   # CSS 动画
│   ├── 03-transforms.md           # 变换
│   ├── 04-filters.md              # 滤镜效果
│   ├── 05-gradients-shadows.md    # 渐变与阴影
│   └── 06-particle-effects.md     # 粒子特效
├── 05-advanced-custom/            # 阶段五：高级定制
│   ├── README.md
│   ├── 01-custom-elements.md      # 自定义元素
│   ├── 02-custom-decorators.md    # 自定义装饰器
│   ├── 03-event-handlers.md       # 事件处理器
│   ├── 04-plugin-development.md   # 插件开发
│   ├── 05-svg-integration.md      # SVG 集成
│   └── 06-lottie-animation.md     # Lottie 动画
└── 06-architecture/               # 阶段六：架构设计
    ├── README.md
    ├── 01-ui-architecture.md      # UI 架构模式
    ├── 02-interface-management.md # 界面管理
    ├── 03-localization.md         # 本地化
    ├── 04-theme-system.md         # 主题系统
    ├── 05-performance-optimization.md # 性能优化
    └── 06-debugging-tips.md       # 调试技巧
```

---

## 🚀 快速开始

如果你是第一次接触 RmlUi，建议按以下顺序学习：

1. **阅读 [阶段一：基础入门](01-basics/README.md)** - 了解基本概念
2. **编译并运行示例** - 动手实践是最好的学习方式
3. **完成每个阶段的实践任务** - 巩固所学知识
4. **参考官方文档** - https://mikke89.github.io/RmlUiDoc/

---

## 📚 参考资源

- [官方文档](https://mikke89.github.io/RmlUiDoc/)
- [RmlUi GitHub](https://github.com/mikke89/RmlUi)
- [RML 元素索引](https://mikke89.github.io/RmlUiDoc/pages/rml/element_index.html)
- [RCSS 属性索引](https://mikke89.github.io/RmlUiDoc/pages/rcss/property_index.html)
- [Gitter 社区](https://gitter.im/RmlUi/community)

---

## 📝 学习建议

1. **循序渐进** - 不要跳过基础章节，后续内容建立在前置知识之上
2. **动手实践** - 每个概念都要通过代码实践来巩固
3. **阅读源码** - 示例代码是最好的学习材料
4. **善用调试器** - RmlUi 内置了强大的可视化调试工具
5. **参考示例** - 遇到问题时先查看官方示例

---

祝你学习顺利！如有问题，欢迎在 GitHub 上提出 Issue 或加入 Gitter 社区讨论。
