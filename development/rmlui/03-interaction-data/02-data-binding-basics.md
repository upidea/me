# 3.2 数据绑定基础

RmlUi 的数据绑定系统允许你将 UI 元素与数据模型连接起来，实现数据驱动的界面。当数据发生变化时，UI 会自动更新，无需手动操作 DOM。

---

## 一、数据绑定概述

### 1.1 什么是数据绑定

数据绑定是一种将数据源（模型）与 UI 元素（视图）自动同步的技术：

```
数据变化 → 自动更新 UI
UI 交互 → 自动更新数据
```

### 1.2 绑定的优势

- **减少样板代码**：无需手动更新每个 UI 元素
- **降低耦合**：数据和视图分离
- **提高可维护性**：数据逻辑集中管理
- **自动同步**：避免数据不一致

### 1.3 支持的绑定类型

| 绑定类型 | 描述 | 示例 |
|----------|------|------|
| 文本绑定 | 绑定文本内容 | `{{ player.name }}` |
| 属性绑定 | 绑定元素属性 | `value="{{ score }}"` |
| 条件绑定 | 根据条件显示/隐藏 | `if="player.is_alive"` |
| 循环绑定 | 遍历数组渲染 | `for="item in items"` |
| 类名绑定 | 动态类名 | `class.active="{{ is_active }}"` |

---

## 二、数据模型基础

### 2.1 创建数据模型

RmlUi 使用 `DataModel` 类来定义数据模型：

```cpp
#include <RmlUi/Core.h>
#include <RmlUi/Debugger.h>

class PlayerData : public Rml::DataModel
{
public:
    // 定义数据字段
    RMLUI_DATA_BINDINGS
    {
        RMLUI_DATA_BINDING(name, &name_)
        RMLUI_DATA_BINDING(level, &level_)
        RMLUI_DATA_BINDING(hp, &hp_)
        RMLUI_DATA_BINDING(max_hp, &max_hp_)
        RMLUI_DATA_BINDING(is_alive, &is_alive_)
    }

    // Getter 和 Setter
    const Rml::String& GetName() const { return name_; }
    void SetName(const Rml::String& name)
    {
        name_ = name;
        NotifyChanged("name");  // 通知 UI 更新
    }

    int GetLevel() const { return level_; }
    void SetLevel(int level)
    {
        level_ = level;
        NotifyChanged("level");
    }

    int GetHp() const { return hp_; }
    void SetHp(int hp)
    {
        hp_ = hp;
        NotifyChanged("hp");
        NotifyChanged("is_alive");  // 依赖属性也要通知
    }

    int GetMaxHp() const { return max_hp_; }

    bool GetIsAlive() const { return hp_ > 0; }

private:
    Rml::String name_ = "勇者";
    int level_ = 1;
    int hp_ = 100;
    int max_hp_ = 100;
};
```

### 2.2 注册数据模型

```cpp
#include <RmlUi/Core.h>

void InitDataBinding()
{
    // 创建数据模型实例
    auto player_data = std::make_shared<PlayerData>();

    // 创建数据模型包
    Rml::DataModelConstructor constructor =
        Rml::DataModelFactory::RegisterDataModel("player", player_data);

    // 或者在创建 Context 时注册
    Rml::Context* context = Rml::CreateContext("game", Rml::Vector2i(1920, 1080));
    context->AddDataModel("player", player_data);
}
```

### 2.3 在 RML 中使用数据模型

```xml
<!-- player_info.rml -->
<rml>
<head>
    <link type="text/rcss" href="style.rcss"/>
</head>
<body data-model="player">
    <div class="player-info">
        <!-- 文本绑定 -->
        <h2 class="player-name">{{ name }}</h2>

        <!-- 显示等级 -->
        <span class="level">Lv.{{ level }}</span>

        <!-- 血量条 -->
        <div class="hp-bar">
            <div class="hp-fill" style="width: {{ hp }} / {{ max_hp }} * 100%"></div>
        </div>
        <span class="hp-text">{{ hp }}/{{ max_hp }}</span>

        <!-- 状态显示 -->
        <div class="status" if="is_alive">
            状态：存活
        </div>
        <div class="status defeated" if="!is_alive">
            状态：已击败
        </div>
    </div>
</body>
</rml>
```

---

## 三、绑定语法

### 3.1 文本插值

```xml
<!-- 基本语法 -->
<div>{{ variable_name }}</div>

<!-- 对象属性 -->
<div>{{ player.name }}</div>
<div>{{ player.stats.hp }}</div>

<!-- 表达式（有限支持） -->
<div>{{ hp }} / {{ max_hp }}</div>
```

### 3.2 属性绑定

```xml
<!-- 绑定到 value 属性 -->
<input type="text" value="{{ player_name }}"/>

<!-- 绑定到 src 属性 -->
<img src="{{ avatar_url }}"/>

<!-- 绑定到 href 属性 -->
<a href="{{ link_url }}">点击</a>
```

### 3.3 条件渲染

```xml
<!-- 简单条件 -->
<div if="is_visible">
    这个元素会根据 is_visible 显示或隐藏
</div>

<!-- 比较表达式 -->
<div if="level >= 10">
    只有等级 >= 10 时显示
</div>

<!-- 多条件 -->
<div if="is_alive && hp < 30">
    低血量警告
</div>

<!-- 否定条件 -->
<div if="!has_item">
    没有物品时显示
</div>
```

### 3.4 类名绑定

```xml
<!-- 动态添加类 -->
<div class.active="is_selected">
    选中时添加 active 类
</div>

<!-- 多类绑定 -->
<div class.disabled="!can_interact" class.highlighted="is_highlighted">
    多个动态类
</div>
```

```css
/* RCSS */
.disabled {
    opacity: 0.5;
    pointer-events: none;
}

.highlighted {
    border: 2px solid gold;
}
```

---

## 四、数组和列表绑定

### 4.1 基本数组绑定

```cpp
class InventoryData : public Rml::DataModel
{
public:
    RMLUI_DATA_BINDINGS
    {
        RMLUI_DATA_BINDING(items, &items_)
    }

    // 使用 DataList 存储数组数据
    Rml::DataList items_;

    // 添加物品
    void AddItem(const Rml::String& name, int count)
    {
        Rml::DataDictionary item;
        item["name"] = name;
        item["count"] = count;
        item["icon"] = "icons/" + name + ".png";

        items_.push_back(Rml::DataValue(item));
        NotifyChanged("items");
    }

    // 移除物品
    void RemoveItem(size_t index)
    {
        if (index < items_.size())
        {
            items_.erase(items_.begin() + index);
            NotifyChanged("items");
        }
    }
};
```

```xml
<!-- 遍历数组 -->
<rml>
<head>
    <link type="text/rcss" href="inventory.rcss"/>
</head>
<body data-model="inventory">
    <div class="inventory-grid">
        <!-- for 循环渲染 -->
        <div class="item-slot" for="item in items">
            <img src="{{ item.icon }}"/>
            <span class="item-name">{{ item.name }}</span>
            <span class="item-count">{{ item.count }}</span>
        </div>
    </div>
</body>
</rml>
```

### 4.2 带索引的循环

```xml
<!-- 使用索引 -->
<div class="item-slot" for="item, index in items">
    <span class="slot-index">{{ index + 1 }}</span>
    <img src="{{ item.icon }}"/>
    <span>{{ item.name }}</span>
</div>
```

### 4.3 条件过滤

```cpp
// 在 C++ 中过滤数据
class FilteredInventory : public Rml::DataModel
{
public:
    // 只返回武器类物品
    Rml::DataList GetWeapons() const
    {
        Rml::DataList result;
        for (const auto& item : all_items_)
        {
            if (item.GetType() == Rml::DataValueType::Dictionary)
            {
                const auto& dict = item.Get<Rml::DataDictionary>();
                if (dict.Get<Rml::String>("type") == "weapon")
                {
                    result.push_back(item);
                }
            }
        }
        return result;
    }
};
```

```xml
<!-- 使用计算属性 -->
<div class="weapon-slot" for="weapon in weapons">
    <img src="{{ weapon.icon }}"/>
    <span>{{ weapon.name }}</span>
</div>
```

---

## 五、实战：角色属性面板

### 5.1 数据模型定义

```cpp
// CharacterData.h
#pragma once
#include <RmlUi/Core.h>

class CharacterData : public Rml::DataModel
{
public:
    CharacterData()
    {
        // 初始化属性
        strength_ = 10;
        agility_ = 10;
        intelligence_ = 10;
        available_points_ = 5;
        UpdateDerivedStats();
    }

    RMLUI_DATA_BINDINGS
    {
        // 基础属性
        RMLUI_DATA_BINDING(name, &name_)
        RMLUI_DATA_BINDING(level, &level_)
        RMLUI_DATA_BINDING(exp, &exp_)
        RMLUI_DATA_BINDING(max_exp, &max_exp_)

        // 战斗属性
        RMLUI_DATA_BINDING(strength, &strength_)
        RMLUI_DATA_BINDING(agility, &agility_)
        RMLUI_DATA_BINDING(intelligence, &intelligence_)

        // 派生属性
        RMLUI_DATA_BINDING(hp, &hp_)
        RMLUI_DATA_BINDING(mana, &mana_)
        RMLUI_DATA_BINDING(attack, &attack_)
        RMLUI_DATA_BINDING(defense, &defense_)

        // 状态
        RMLUI_DATA_BINDING(available_points, &available_points_)
        RMLUI_DATA_BINDING(can_upgrade_strength, &can_upgrade_strength_)
        RMLUI_DATA_BINDING(can_upgrade_agility, &can_upgrade_agility_)
        RMLUI_DATA_BINDING(can_upgrade_intelligence, &can_upgrade_intelligence_)
    }

    // 升级属性
    void UpgradeStrength()
    {
        if (CanUpgradeStrength())
        {
            strength_++;
            available_points_--;
            UpdateDerivedStats();
            NotifyAllChanged();
        }
    }

    void UpgradeAgility()
    {
        if (CanUpgradeAgility())
        {
            agility_++;
            available_points_--;
            UpdateDerivedStats();
            NotifyAllChanged();
        }
    }

    void UpgradeIntelligence()
    {
        if (CanUpgradeIntelligence())
        {
            intelligence_++;
            available_points_--;
            UpdateDerivedStats();
            NotifyAllChanged();
        }
    }

    // 获得经验
    void GainExp(int amount)
    {
        exp_ += amount;
        if (exp_ >= max_exp_)
        {
            LevelUp();
        }
        NotifyChanged("exp");
    }

private:
    // 基础信息
    Rml::String name_ = "勇者";
    int level_ = 1;
    int exp_ = 0;
    int max_exp_ = 100;

    // 基础属性
    int strength_;
    int agility_;
    int intelligence_;

    // 派生属性
    int hp_ = 100;
    int mana_ = 50;
    int attack_ = 20;
    int defense_ = 10;

    // 状态
    int available_points_;

    // 计算属性
    bool GetCanUpgradeStrength() const { return available_points_ > 0; }
    bool GetCanUpgradeAgility() const { return available_points_ > 0; }
    bool GetCanUpgradeIntelligence() const { return available_points_ > 0; }

    void UpdateDerivedStats()
    {
        // 根据基础属性计算派生属性
        hp_ = 100 + (strength_ * 10);
        mana_ = 50 + (intelligence_ * 5);
        attack_ = 10 + (strength_ * 2) + (agility_ * 1);
        defense_ = 5 + (strength_ * 1) + (agility_ * 1);
    }

    void LevelUp()
    {
        level_++;
        exp_ -= max_exp_;
        max_exp_ = static_cast<int>(max_exp_ * 1.5);
        available_points_ += 3;

        // 升级回满血
        hp_ = 100 + (strength_ * 10);
    }
};
```

### 5.2 UI 定义

```xml
<!-- character_panel.rml -->
<rml>
<head>
    <link type="text/rcss" href="character.rcss"/>
</head>
<body data-model="character">
    <div class="character-panel">
        <!-- 基本信息 -->
        <div class="header">
            <h2 class="name">{{ name }}</h2>
            <span class="level">Lv.{{ level }}</span>
        </div>

        <!-- 经验条 -->
        <div class="exp-bar">
            <div class="exp-fill" style="width: {{ exp }} / {{ max_exp }} * 100%"></div>
        </div>
        <span class="exp-text">{{ exp }}/{{ max_exp }} EXP</span>

        <!-- 属性区域 -->
        <div class="attributes">
            <!-- 力量 -->
            <div class="attr-row">
                <span class="attr-name">力量</span>
                <span class="attr-value">{{ strength }}</span>
                <button class="btn-upgrade"
                        if="can_upgrade_strength"
                        onclick="UpgradeStrength()">
                    +
                </button>
            </div>

            <!-- 敏捷 -->
            <div class="attr-row">
                <span class="attr-name">敏捷</span>
                <span class="attr-value">{{ agility }}</span>
                <button class="btn-upgrade"
                        if="can_upgrade_agility"
                        onclick="UpgradeAgility()">
                    +
                </button>
            </div>

            <!-- 智力 -->
            <div class="attr-row">
                <span class="attr-name">智力</span>
                <span class="attr-value">{{ intelligence }}</span>
                <button class="btn-upgrade"
                        if="can_upgrade_intelligence"
                        onclick="UpgradeIntelligence()">
                    +
                </button>
            </div>
        </div>

        <!-- 剩余点数 -->
        <div class="points-remaining">
            剩余点数：{{ available_points }}
        </div>

        <!-- 派生属性 -->
        <div class="derived-stats">
            <div class="stat-row">
                <span>生命值</span>
                <span>{{ hp }}</span>
            </div>
            <div class="stat-row">
                <span>魔法值</span>
                <span>{{ mana }}</span>
            </div>
            <div class="stat-row">
                <span>攻击力</span>
                <span>{{ attack }}</span>
            </div>
            <div class="stat-row">
                <span>防御力</span>
                <span>{{ defense }}</span>
            </div>
        </div>
    </div>
</body>
</rml>
```

### 5.3 样式定义

```css
/* character.rcss */

.character-panel {
    background: linear-gradient(135deg, #2c3e50 0%, #1a1a2e 100%);
    border: 2px solid #34495e;
    border-radius: 10px;
    padding: 20px;
    width: 350px;
    color: white;
    font-family: "Noto Sans CJK SC", sans-serif;
}

.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
}

.name {
    margin: 0;
    font-size: 24px;
    color: #f1c40f;
}

.level {
    background: #3498db;
    padding: 5px 15px;
    border-radius: 20px;
    font-size: 14px;
}

.exp-bar {
    height: 8px;
    background: rgba(0, 0, 0, 0.3);
    border-radius: 4px;
    overflow: hidden;
    margin: 10px 0;
}

.exp-fill {
    height: 100%;
    background: linear-gradient(90deg, #3498db, #2980b9);
    transition: width 0.3s ease;
}

.exp-text {
    font-size: 12px;
    color: rgba(255, 255, 255, 0.7);
}

.attributes {
    margin: 20px 0;
    padding: 15px;
    background: rgba(0, 0, 0, 0.2);
    border-radius: 8px;
}

.attr-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.attr-row:last-child {
    border-bottom: none;
}

.attr-name {
    font-size: 16px;
}

.attr-value {
    font-size: 20px;
    font-weight: bold;
    color: #3498db;
    min-width: 40px;
    text-align: right;
}

.btn-upgrade {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    border: none;
    background: #27ae60;
    color: white;
    font-size: 18px;
    cursor: pointer;
    margin-left: 10px;
}

.btn-upgrade:hover {
    background: #2ecc71;
    transform: scale(1.1);
}

.points-remaining {
    text-align: center;
    padding: 10px;
    color: #f39c12;
    font-size: 14px;
}

.derived-stats {
    margin-top: 15px;
    padding: 15px;
    background: rgba(0, 0, 0, 0.2);
    border-radius: 8px;
}

.stat-row {
    display: flex;
    justify-content: space-between;
    padding: 5px 0;
    font-size: 14px;
}

.stat-row span:last-child {
    color: #3498db;
}
```

### 5.4 C++ 集成

```cpp
// main.cpp
#include <RmlUi/Core.h>
#include "CharacterData.h"

int main()
{
    // 初始化 RmlUi
    Rml::SetRenderInterface(&g_RenderInterface);
    Rml::SetSystemInterface(&g_SystemInterface);
    Rml::Initialise();

    // 创建上下文
    Rml::Context* context = Rml::CreateContext("game", Rml::Vector2i(1920, 1080));

    // 创建并注册数据模型
    auto character = std::make_shared<CharacterData>();
    context->AddDataModel("character", character);

    // 加载文档
    Rml::ElementDocument* document = context->LoadDocument("character_panel.rml");
    document->Show();

    // 游戏主循环
    bool running = true;
    while (running)
    {
        context->Update();

        // 模拟获得经验
        static int timer = 0;
        timer++;
        if (timer % 60 == 0)  // 每秒获得一次经验
        {
            character->GainExp(10);
        }

        // 渲染...
        g_RenderInterface.BeginScene();
        context->Render();
        g_RenderInterface.EndScene();

        // 处理退出...
    }

    Rml::Shutdown();
    return 0;
}
```

---

## 六、实践练习

### 练习 1：创建任务列表

实现一个任务追踪面板：
- 使用数组绑定显示任务列表
- 每个任务显示名称、描述、进度
- 完成任务后从列表中移除

### 练习 2：实现 Buff 系统

创建一个 Buff 显示区域：
- 显示当前所有的增益/减益效果
- 每个 Buff 显示图标和剩余时间
- Buff 过期自动移除

### 练习 3：制作装备面板

设计一个装备界面：
- 显示角色各部位的装备
- 点击装备槽显示装备详情
- 支持装备更换

---

## 📝 检查清单

- [ ] 理解数据绑定的概念和优势
- [ ] 能够创建数据模型并注册
- [ ] 掌握 RML 中的绑定语法
- [ ] 能够使用条件渲染
- [ ] 能够绑定数组和列表
- [ ] 理解如何通知 UI 更新

---

下一节：[数据绑定进阶](03-data-binding-advanced.md) - 深入学习高级绑定技巧、自定义数据视图和性能优化。
