import{_ as s,o as n,c as i,ah as t}from"./chunks/framework.C4gM9MeL.js";const m=JSON.parse('{"title":"RmlUi 深度学习教程","description":"","frontmatter":{},"headers":[],"relativePath":"development/rmlui/README.md","filePath":"development/rmlui/README.md","lastUpdated":1774104793000}'),l={name:"development/rmlui/README.md"};function e(p,a,r,d,h,o){return n(),i("div",null,[...a[0]||(a[0]=[t(`<h1 id="rmlui-深度学习教程" tabindex="-1">RmlUi 深度学习教程 <a class="header-anchor" href="#rmlui-深度学习教程" aria-label="Permalink to &quot;RmlUi 深度学习教程&quot;">​</a></h1><p>本教程旨在帮助你从应用开发的角度，由浅入深地掌握 RmlUi 库的使用。</p><hr><h2 id="📖-教程结构" tabindex="-1">📖 教程结构 <a class="header-anchor" href="#📖-教程结构" aria-label="Permalink to &quot;📖 教程结构&quot;">​</a></h2><p>本教程分为 6 个阶段，每个阶段包含理论讲解和实践任务。</p><table tabindex="0"><thead><tr><th>阶段</th><th>主题</th><th>文档</th><th>预计时间</th></tr></thead><tbody><tr><td><strong>阶段一</strong></td><td>快速上手与基础实践</td><td><a href="./01-basics/README.html">01-basics</a></td><td>3-5 天</td></tr><tr><td><strong>阶段二</strong></td><td>界面构建与样式精通</td><td><a href="./02-layout-style/README.html">02-layout-style</a></td><td>1-2 周</td></tr><tr><td><strong>阶段三</strong></td><td>交互与数据驱动</td><td><a href="./03-interaction-data/README.html">03-interaction-data</a></td><td>2 周</td></tr><tr><td><strong>阶段四</strong></td><td>动画与视觉效果</td><td><a href="./04-animation-effects/README.html">04-animation-effects</a></td><td>1-2 周</td></tr><tr><td><strong>阶段五</strong></td><td>高级定制与扩展</td><td><a href="./05-advanced-custom/README.html">05-advanced-custom</a></td><td>2 周</td></tr><tr><td><strong>阶段六</strong></td><td>架构设计与最佳实践</td><td><a href="./06-architecture/README.html">06-architecture</a></td><td>1 周</td></tr></tbody></table><hr><h2 id="🎯-学习目标" tabindex="-1">🎯 学习目标 <a class="header-anchor" href="#🎯-学习目标" aria-label="Permalink to &quot;🎯 学习目标&quot;">​</a></h2><p>完成本教程后，你将能够：</p><ul><li>✅ 在项目中集成 RmlUi 并构建完整的 UI 系统</li><li>✅ 使用 RML/RCSS 创建复杂的响应式界面</li><li>✅ 通过数据绑定实现数据驱动的 UI</li><li>✅ 创建流畅的动画和视觉特效</li><li>✅ 自定义元素、装饰器和插件</li><li>✅ 设计可扩展的 UI 架构</li></ul><hr><h2 id="📦-前置要求" tabindex="-1">📦 前置要求 <a class="header-anchor" href="#📦-前置要求" aria-label="Permalink to &quot;📦 前置要求&quot;">​</a></h2><h3 id="知识储备" tabindex="-1">知识储备 <a class="header-anchor" href="#知识储备" aria-label="Permalink to &quot;知识储备&quot;">​</a></h3><ul><li>C++17 基础知识</li><li>基本的图形编程概念</li><li>HTML/CSS 基础（有帮助但非必需）</li></ul><h3 id="环境准备" tabindex="-1">环境准备 <a class="header-anchor" href="#环境准备" aria-label="Permalink to &quot;环境准备&quot;">​</a></h3><ul><li>CMake 3.16+</li><li>C++17 兼容编译器</li><li>选择以下之一的后端： <ul><li>GLFW + OpenGL 3</li><li>SDL2 + OpenGL 3</li><li>Win32 + OpenGL 2</li><li>X11 + OpenGL 2</li></ul></li></ul><h3 id="编译示例" tabindex="-1">编译示例 <a class="header-anchor" href="#编译示例" aria-label="Permalink to &quot;编译示例&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 克隆仓库（如果你还没有）</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">git</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> clone</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> https://github.com/mikke89/RmlUi.git</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">cd</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> RmlUi</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 配置 CMake（以 GLFW+GL3 后端为例）</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">cmake</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -B</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> Build</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -S</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> .</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -DRMLUI_BACKEND=GLFW_GL3</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -DRMLUI_SAMPLES=ON</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 编译</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">cmake</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --build</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> Build</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 运行示例</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">./Build/Samples/basic/demo/demo</span></span></code></pre></div><hr><h2 id="🗂️-目录说明" tabindex="-1">🗂️ 目录说明 <a class="header-anchor" href="#🗂️-目录说明" aria-label="Permalink to &quot;🗂️ 目录说明&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>docs/</span></span>
<span class="line"><span>├── README.md                      # 本文件，教程总览</span></span>
<span class="line"><span>├── 01-basics/                     # 阶段一：基础入门</span></span>
<span class="line"><span>│   ├── README.md                  # 阶段一概述</span></span>
<span class="line"><span>│   ├── 01-environment-setup.md    # 环境搭建</span></span>
<span class="line"><span>│   ├── 02-core-concepts.md        # 核心概念</span></span>
<span class="line"><span>│   ├── 03-rml-basics.md           # RML 基础</span></span>
<span class="line"><span>│   ├── 04-rcss-basics.md          # RCSS 基础</span></span>
<span class="line"><span>│   └── 05-first-integration.md    # 基本集成</span></span>
<span class="line"><span>├── 02-layout-style/               # 阶段二：布局与样式</span></span>
<span class="line"><span>│   ├── README.md</span></span>
<span class="line"><span>│   ├── 01-layout-system.md        # 布局系统</span></span>
<span class="line"><span>│   ├── 02-advanced-style.md       # 高级样式</span></span>
<span class="line"><span>│   ├── 03-built-in-controls.md    # 内置控件</span></span>
<span class="line"><span>│   ├── 04-template-system.md      # 模板系统</span></span>
<span class="line"><span>│   ├── 05-resource-management.md  # 资源管理</span></span>
<span class="line"><span>│   └── 06-responsive-design.md    # 响应式设计</span></span>
<span class="line"><span>├── 03-interaction-data/           # 阶段三：交互与数据</span></span>
<span class="line"><span>│   ├── README.md</span></span>
<span class="line"><span>│   ├── 01-event-system.md         # 事件系统</span></span>
<span class="line"><span>│   ├── 02-data-binding-basics.md  # 数据绑定基础</span></span>
<span class="line"><span>│   ├── 03-data-binding-advanced.md# 数据绑定进阶</span></span>
<span class="line"><span>│   ├── 04-custom-data-views.md    # 自定义数据视图</span></span>
<span class="line"><span>│   ├── 05-two-way-binding.md      # 双向绑定</span></span>
<span class="line"><span>│   └── 06-dom-manipulation.md     # DOM 操作</span></span>
<span class="line"><span>├── 04-animation-effects/          # 阶段四：动画与效果</span></span>
<span class="line"><span>│   ├── README.md</span></span>
<span class="line"><span>│   ├── 01-transitions.md          # CSS 过渡</span></span>
<span class="line"><span>│   ├── 02-keyframe-animation.md   # CSS 动画</span></span>
<span class="line"><span>│   ├── 03-transforms.md           # 变换</span></span>
<span class="line"><span>│   ├── 04-filters.md              # 滤镜效果</span></span>
<span class="line"><span>│   ├── 05-gradients-shadows.md    # 渐变与阴影</span></span>
<span class="line"><span>│   └── 06-particle-effects.md     # 粒子特效</span></span>
<span class="line"><span>├── 05-advanced-custom/            # 阶段五：高级定制</span></span>
<span class="line"><span>│   ├── README.md</span></span>
<span class="line"><span>│   ├── 01-custom-elements.md      # 自定义元素</span></span>
<span class="line"><span>│   ├── 02-custom-decorators.md    # 自定义装饰器</span></span>
<span class="line"><span>│   ├── 03-event-handlers.md       # 事件处理器</span></span>
<span class="line"><span>│   ├── 04-plugin-development.md   # 插件开发</span></span>
<span class="line"><span>│   ├── 05-svg-integration.md      # SVG 集成</span></span>
<span class="line"><span>│   └── 06-lottie-animation.md     # Lottie 动画</span></span>
<span class="line"><span>└── 06-architecture/               # 阶段六：架构设计</span></span>
<span class="line"><span>    ├── README.md</span></span>
<span class="line"><span>    ├── 01-ui-architecture.md      # UI 架构模式</span></span>
<span class="line"><span>    ├── 02-interface-management.md # 界面管理</span></span>
<span class="line"><span>    ├── 03-localization.md         # 本地化</span></span>
<span class="line"><span>    ├── 04-theme-system.md         # 主题系统</span></span>
<span class="line"><span>    ├── 05-performance-optimization.md # 性能优化</span></span>
<span class="line"><span>    └── 06-debugging-tips.md       # 调试技巧</span></span></code></pre></div><hr><h2 id="🚀-快速开始" tabindex="-1">🚀 快速开始 <a class="header-anchor" href="#🚀-快速开始" aria-label="Permalink to &quot;🚀 快速开始&quot;">​</a></h2><p>如果你是第一次接触 RmlUi，建议按以下顺序学习：</p><ol><li><strong>阅读 <a href="./01-basics/README.html">阶段一：基础入门</a></strong> - 了解基本概念</li><li><strong>编译并运行示例</strong> - 动手实践是最好的学习方式</li><li><strong>完成每个阶段的实践任务</strong> - 巩固所学知识</li><li><strong>参考官方文档</strong> - <a href="https://mikke89.github.io/RmlUiDoc/" target="_blank" rel="noreferrer">https://mikke89.github.io/RmlUiDoc/</a></li></ol><hr><h2 id="📚-参考资源" tabindex="-1">📚 参考资源 <a class="header-anchor" href="#📚-参考资源" aria-label="Permalink to &quot;📚 参考资源&quot;">​</a></h2><ul><li><a href="https://mikke89.github.io/RmlUiDoc/" target="_blank" rel="noreferrer">官方文档</a></li><li><a href="https://github.com/mikke89/RmlUi" target="_blank" rel="noreferrer">RmlUi GitHub</a></li><li><a href="https://mikke89.github.io/RmlUiDoc/pages/rml/element_index.html" target="_blank" rel="noreferrer">RML 元素索引</a></li><li><a href="https://mikke89.github.io/RmlUiDoc/pages/rcss/property_index.html" target="_blank" rel="noreferrer">RCSS 属性索引</a></li><li><a href="https://gitter.im/RmlUi/community" target="_blank" rel="noreferrer">Gitter 社区</a></li></ul><hr><h2 id="📝-学习建议" tabindex="-1">📝 学习建议 <a class="header-anchor" href="#📝-学习建议" aria-label="Permalink to &quot;📝 学习建议&quot;">​</a></h2><ol><li><strong>循序渐进</strong> - 不要跳过基础章节，后续内容建立在前置知识之上</li><li><strong>动手实践</strong> - 每个概念都要通过代码实践来巩固</li><li><strong>阅读源码</strong> - 示例代码是最好的学习材料</li><li><strong>善用调试器</strong> - RmlUi 内置了强大的可视化调试工具</li><li><strong>参考示例</strong> - 遇到问题时先查看官方示例</li></ol><hr><p>祝你学习顺利！如有问题，欢迎在 GitHub 上提出 Issue 或加入 Gitter 社区讨论。</p>`,33)])])}const k=s(l,[["render",e]]);export{m as __pageData,k as default};
