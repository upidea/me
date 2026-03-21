# 1.3 RML 基础

RML (RmlUi Markup Language) 是 RmlUi 的文档格式，类似于 HTML。本节将介绍 RML 的基本语法和常用元素。

---

## 一、RML 文档结构

一个完整的 RML 文档由以下部分组成：

```xml
<rml>
<head>
    <!-- 元数据和资源链接 -->
    <title>我的文档</title>
    <link type="text/rcss" href="style.rcss"/>
</head>
<body>
    <!-- 可见内容 -->
    <div id="container">
        <h1>标题</h1>
        <p>段落内容</p>
    </div>
</body>
</rml>
```

### 结构说明

| 元素 | 说明 | 必需 |
|------|------|------|
| `<rml>` | 根元素 | 是 |
| `<head>` | 元数据区域 | 是 |
| `<title>` | 文档标题 | 否 |
| `<link>` | 链接外部资源（RCSS、模板） | 否 |
| `<body>` | 内容区域 | 是 |

---

## 二、常用元素

### 1. 容器类元素

```xml
<!-- div: 通用容器 -->
<div class="panel">
    <p>内容</p>
</div>

<!-- span: 行内容器 -->
<p>这是<span class="highlight">高亮</span>文本</p>

<!-- section: 语义化区块 -->
<section id="main-content">
    <!-- 内容 -->
</section>
```

### 2. 文本元素

```xml
<!-- 标题 -->
<h1>一级标题</h1>
<h2>二级标题</h2>
<h3>三级标题</h3>

<!-- 段落 -->
<p>这是一个段落。</p>

<!-- 预格式化文本 -->
<pre>
    保持
        格式
</pre>
```

### 3. 表单控件

```xml
<!-- 按钮 -->
<button id="start-btn">開始游戏</button>

<!-- 文本输入 -->
<input type="text" id="name-input" value="请输入名称"/>

<!-- 密码输入 -->
<input type="password" value=""/>

<!-- 复选框 -->
<input type="checkbox" id="agree" checked/>
<label for="agree">同意條款</label>

<!-- 单选框 -->
<input type="radio" name="difficulty" value="easy"/> 简单
<input type="radio" name="difficulty" value="hard"/> 困難

<!-- 下拉选择 -->
<select id="character-select">
    <option value="warrior">战士</option>
    <option value="mage">法师</option>
    <option value="archer">弓箭手</option>
</select>

<!-- 文本域 -->
<textarea rows="5" cols="30">多行文本</textarea>
```

### 4. 高级控件

```xml
<!-- 标签页 -->
<tabset>
    <tabs>
        <tab id="tab-1">属性</tab>
        <tab id="tab-2">技能</tab>
    </tabs>
    <tabcontents>
        <tabcontent id="tab-1">
            <p>属性内容...</p>
        </tabcontent>
        <tabcontent id="tab-2">
            <p>技能内容...</p>
        </tabcontent>
    </tabcontents>
</tabset>

<!-- 进度条 -->
<progress id="hp-bar" value="75" max="100"/>

<!-- 滑块 -->
<input type="range" min="0" max="100" value="50"/>
```

### 5. 图片和媒体

```xml
<!-- 图片 -->
<img src="textures/logo.png" width="200px" height="100px"/>

<!-- SVG（需要启用 SVG 插件） -->
<svg src="icons/settings.svg"/>
```

---

## 三、属性系统

### 1. 全局属性

所有元素都支持的属性：

```xml
<!-- id: 唯一标识符 -->
<div id="main-menu"></div>

<!-- class: 类别名称（可用于样式） -->
<div class="panel primary"></div>

<!-- style: 内联样式 -->
<div style="width: 200px; background: red;"></div>

<!-- title: 提示文本 -->
<button title="点击开始游戏">开始</button>

<!-- hidden: 隐藏元素 -->
<div hidden>看不见的内容</div>
```

### 2. 事件属性

```xml
<!-- on事件：绑定事件处理器 -->
<button onclick="start_game()">开始</button>
<input onchange="update_value(event)"/>
```

### 3. 數據绑定属性

```xml
<!-- data-if: 条件显示 -->
<div data-if="show_message">
    <p>{{message}}</p>
</div>

<!-- data-value: 双向绑定 -->
<input type="text" data-value="player_name"/>

<!-- data-for: 循环绑定 -->
<ul data-for="item in items">
    <li>{{ item.name }}</li>
</ul>
```

---

## 四、完整示例

### 示例 1：简单菜单

```xml
<rml>
<head>
    <title>游戏菜单</title>
    <link type="text/rcss" href="menu.rcss"/>
</head>
<body>
    <div id="menu-container">
        <h1 class="title">我的游戏</h1>

        <div class="button-group">
            <button id="btn-start">开始游戏</button>
            <button id="btn-options">选项</button>
            <button id="btn-quit">退出</button>
        </div>

        <div class="version">v1.0.0</div>
    </div>
</body>
</rml>
```

### 示例 2：角色属性面板

```xml
<rml>
<head>
    <title>角色面板</title>
    <link type="text/rcss" href="character.rcss"/>
</head>
<body data-model="character">
    <div class="panel">
        <div class="avatar">
            <img src="{{ avatar_url }}" width="128" height="128"/>
        </div>

        <div class="info">
            <h2>{{ name }}</h2>
            <p>等级：<span class="level">{{ level }}</span></p>

            <div class="stats">
                <div class="stat-row">
                    <label>生命值</label>
                    <progress value="{{ hp }}" max="{{ max_hp }}"/>
                </div>
                <div class="stat-row">
                    <label>魔法值</label>
                    <progress value="{{ mp }}" max="{{ max_mp }}"/>
                </div>
                <div class="stat-row">
                    <label>经验值</label>
                    <progress value="{{ exp }}" max="{{ max_exp }}"/>
                </div>
            </div>
        </div>

        <div class="attributes">
            <div class="attr">
                <span class="name">力量</span>
                <span class="value">{{ strength }}</span>
            </div>
            <div class="attr">
                <span class="name">敏捷</span>
                <span class="value">{{ agility }}</span>
            </div>
            <div class="attr">
                <span class="name">智力</span>
                <span class="value">{{ intelligence }}</span>
            </div>
        </div>
    </div>
</body>
</rml>
```

### 示例 3：物品栏（使用数据绑定）

```xml
<rml>
<head>
    <title>物品栏</title>
    <link type="text/rcss" href="inventory.rcss"/>
</head>
<body data-model="inventory">
    <div class="inventory-window">
        <div class="header">
            <h2>物品栏</h2>
            <button class="close-btn" onclick="close_inventory()">×</button>
        </div>

        <!-- 物品網格 -->
        <div class="item-grid" data-for="item in items">
            <div class="item-slot"
                 data-class-selected="item.selected"
                 onclick="select_item({{ item.id }})">
                <img src="{{ item.icon }}" if="item.icon"/>
                <span class="count" if="item.count > 1">{{ item.count }}</span>
            </div>
        </div>

        <!-- 物品详情 -->
        <div class="item-detail" data-if="selected_item">
            <h3>{{ selected_item.name }}</h3>
            <p>{{ selected_item.description }}</p>
            <button onclick="use_item()">使用</button>
            <button onclick="drop_item()">丢弃</button>
        </div>

        <!-- 金钱 -->
        <div class="money">
            <span>金币：</span>
            <span class="gold">{{ gold }}</span>
        </div>
    </div>
</body>
</rml>
```

---

## 五、特殊语法

### 1. 注释

```xml
<!-- 这是注释 -->
<div>
    <!--
                多行注释
                可以跨越多行
            -->    <p>内容</p>
</div>
```

### 2. 模板引用

```xml
<rml>
<head>
    <!-- 引用模板 -->
    <template name="window-frame"/>
</head>
<body>
    <!-- 使用模板内容 -->
</body>
</rml>
```

### 3. 内联 RCSS

```xml
<rml>
<head>
    <style>
        body {
            font-family: LatoLatin;
            font-size: 18px;
        }
        .title {
            color: #f6470a;
        }
    </style>
</head>
<body>
    <h1 class="title">标题</h1>
</body>
</rml>
```

---

## 六、RML vs HTML 差異

| 特性 | HTML | RML |
|------|------|-----|
| DOCTYPE | 必需 | 無需 |
| 脚本标签 | `<script>` | 不支持（用 C++/Lua 处理） |
| 表单提交 | 支持 | 不支持（用事件处理） |
| 媒体 | 音频/视频 | 不支持 |
| iframe | 支持 | 不支持 |
| 自定义元素 | 需特殊定义 | 可直接注册 |

---

## 七、实践练习

### 练习 1：创建游戏主菜单

创建一个包含以下元素的菜单：
- 游戏标题（使用 h1）
- 开始游戏按钮
- 选项按钮
- 退出按钮
- 版本号文本

### 练习 2：创建设置界面

创建一个设置界面包含：
- 音量滑块（type="range"）"
- 全屏复选框（type="checkbox"）
- 难度选择下拉框（select）
- 保存/取消按钮

### 练习 3：创建角色状态面板

使用数据绑定语法创建一个显示：
- 角色头像和名称
- HP/MP 进度条
- 属性列表（力量、敏捷、智力）

---

## 八、下一步

继续学习 [RCSS 基础](04-rcss-basics.md) 来为你的 RML 文档添加样式。

---

## 📝 检查清单

- [ ] 理解 RML 文档结构
- [ ] 掌握常用元素的使用
- [ ] 了解属性系统
- [ ] 能够编写简单的 RML 文档
- [ ] 了解数据绑定的基本语法
