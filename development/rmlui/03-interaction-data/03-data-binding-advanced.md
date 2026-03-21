# 3.3 数据绑定进阶

在掌握了数据绑定的基础之后，本节将深入探讨更高级的绑定技巧，包括自定义转换器、数组操作、嵌套数据模型和性能优化。

---

## 一、数据转换器（Data Formatter）

### 1.1 为什么需要转换器

有时候数据的原始格式不适合直接显示，需要进行格式化：

- 数值 → 百分比、金币格式
- 时间戳 → 可读时间
- 布尔值 → 文本描述

### 1.2 注册自定义转换器

```cpp
#include <RmlUi/Core.h>

// 金币格式化：1000 → "1,000 G"
class GoldFormatter : public Rml::DataFormatter
{
public:
    GoldFormatter() : Rml::DataFormatter("gold") {}

    bool Format(Rml::String& formatted_string,
                const Rml::DataValueList& data_values) override
    {
        if (data_values.empty())
            return false;

        int gold = data_values[0].Get<int>();

        // 添加千分位分隔符
        std::string gold_str = std::to_string(gold);
        std::string result;
        int count = 0;
        for (int i = gold_str.length() - 1; i >= 0; --i)
        {
            if (count > 0 && count % 3 == 0)
                result = "," + result;
            result = gold_str[i] + result;
            count++;
        }

        formatted_string = result + " G";
        return true;
    }
};

// 百分比格式化：0.75 → "75%"
class PercentFormatter : public Rml::DataFormatter
{
public:
    PercentFormatter() : Rml::DataFormatter("percent") {}

    bool Format(Rml::String& formatted_string,
                const Rml::DataValueList& data_values) override
    {
        if (data_values.empty())
            return false;

        float value = data_values[0].Get<float>();
        formatted_string = Rml::StringFromReal(value * 100, 1) + "%";
        return true;
    }
};

// 时间格式化：秒数 → "00:00:00"
class TimeFormatter : public Rml::DataFormatter
{
public:
    TimeFormatter() : Rml::DataFormatter("time") {}

    bool Format(Rml::String& formatted_string,
                const Rml::DataValueList& data_values) override
    {
        if (data_values.empty())
            return false;

        int total_seconds = data_values[0].Get<int>();

        int hours = total_seconds / 3600;
        int minutes = (total_seconds % 3600) / 60;
        int seconds = total_seconds % 60;

        char buffer[32];
        sprintf(buffer, "%02d:%02d:%02d", hours, minutes, seconds);
        formatted_string = buffer;
        return true;
    }
};

// 初始化时注册
void RegisterFormatters()
{
    Rml::DataFormatter::RegisterDataFormatter("gold", std::make_unique<GoldFormatter>());
    Rml::DataFormatter::RegisterDataFormatter("percent", std::make_unique<PercentFormatter>());
    Rml::DataFormatter::RegisterDataFormatter("time", std::make_unique<TimeFormatter>());
}
```

### 1.3 在 RML 中使用转换器

```xml
<rml>
<head>
    <link type="text/rcss" href="style.rcss"/>
</head>
<body data-model="player">
    <div class="stats-panel">
        <!-- 金币显示 -->
        <span class="gold">{{ gold | gold }}</span>

        <!-- 经验百分比 -->
        <div class="exp-bar">
            <div class="exp-fill" style="width: {{ exp_percent | percent }}"></div>
        </div>

        <!-- 游戏时间 -->
        <span class="play-time">游戏时间：{{ play_time | time }}</span>

        <!-- 多个值格式化 -->
        <span>{{ value, multiplier | custom_formatter }}</span>
    </div>
</body>
</rml>
```

---

## 二、数组操作和更新

### 2.1 DataList 的完整操作

```cpp
class QuestList : public Rml::DataModel
{
public:
    RMLUI_DATA_BINDINGS
    {
        RMLUI_DATA_BINDING(quests, &quests_)
        RMLUI_DATA_BINDING(quest_count, &quest_count_)
    }

    // 添加任务
    void AddQuest(const Rml::String& id,
                  const Rml::String& title,
                  const Rml::String& description,
                  int target_count,
                  Rml::DataDictionary rewards)
    {
        Rml::DataDictionary quest;
        quest["id"] = id;
        quest["title"] = title;
        quest["description"] = description;
        quest["target"] = target_count;
        quest["progress"] = 0;
        quest["completed"] = false;
        quest["rewards"] = rewards;

        quests_.push_back(Rml::DataValue(quest));
        quest_count_ = static_cast<int>(quests_.size());
        NotifyChanged("quests");
        NotifyChanged("quest_count");
    }

    // 更新任务进度
    void UpdateQuestProgress(const Rml::String& quest_id, int progress)
    {
        for (size_t i = 0; i < quests_.size(); ++i)
        {
            Rml::DataDictionary& quest = quests_[i].Get<Rml::DataDictionary>();
            if (quest.Get<Rml::String>("id") == quest_id)
            {
                int target = quest.Get<int>("target");
                quest["progress"] = progress;
                quest["completed"] = (progress >= target);

                // 使用索引通知，只更新这一项
                NotifyChanged("quests[" + Rml::StringFromReal(i) + "]");
                return;
            }
        }
    }

    // 完成任务
    void CompleteQuest(const Rml::String& quest_id)
    {
        for (size_t i = 0; i < quests_.size(); ++i)
        {
            Rml::DataDictionary& quest = quests_[i].Get<Rml::DataDictionary>();
            if (quest.Get<Rml::String>("id") == quest_id)
            {
                quest["completed"] = true;

                // 触发完成回调
                OnQuestCompleted(quest);

                NotifyChanged("quests[" + Rml::StringFromReal(i) + "]");
                return;
            }
        }
    }

    // 移除任务
    void RemoveQuest(const Rml::String& quest_id)
    {
        for (auto it = quests_.begin(); it != quests_.end(); ++it)
        {
            Rml::DataDictionary& quest = it->Get<Rml::DataDictionary>();
            if (quest.Get<Rml::String>("id") == quest_id)
            {
                quests_.erase(it);
                quest_count_ = static_cast<int>(quests_.size());
                NotifyChanged("quests");
                NotifyChanged("quest_count");
                return;
            }
        }
    }

    // 清空所有已完成的任务
    void ClearCompletedQuests()
    {
        quests_.erase(
            std::remove_if(quests_.begin(), quests_.end(),
                [](const Rml::DataValue& value) {
                    const Rml::DataDictionary& quest = value.Get<Rml::DataDictionary>();
                    return quest.Get<bool>("completed");
                }),
            quests_.end()
        );
        quest_count_ = static_cast<int>(quests_.size());
        NotifyChanged("quests");
        NotifyChanged("quest_count");
    }

    // 获取任务数量
    int GetQuestCount() const { return quest_count_; }

private:
    Rml::DataList quests_;
    int quest_count_ = 0;

    void OnQuestCompleted(const Rml::DataDictionary& quest)
    {
        // 发放奖励等逻辑
        Rml::DataDictionary rewards = quest.Get<Rml::DataDictionary>("rewards");
        // ...
    }
};
```

### 2.2 在 RML 中处理数组

```xml
<rml>
<head>
    <link type="text/rcss" href="quest.rcss"/>
</head>
<body data-model="quests">
    <div class="quest-panel">
        <h3>当前任务 ({{ quest_count }})</h3>

        <!-- 空列表提示 -->
        <div class="empty-tip" if="quest_count == 0">
            目前没有进行中的任务
        </div>

        <!-- 任务列表 -->
        <div class="quest-list" for="quest in quests">
            <div class="quest-item" class.completed="quest.completed">
                <div class="quest-header">
                    <span class="quest-title">{{ quest.title }}</span>
                    <span class="quest-status" if="quest.completed">✓ 已完成</span>
                </div>
                <p class="quest-description">{{ quest.description }}</p>
                <div class="quest-progress">
                    <div class="progress-bar">
                        <div class="progress-fill"
                             style="width: {{ quest.progress }} / {{ quest.target }} * 100%"></div>
                    </div>
                    <span class="progress-text">{{ quest.progress }}/{{ quest.target }}</span>
                </div>
                <button class="btn-claim"
                        if="quest.completed"
                        onclick="ClaimReward(quest.id)">
                    领取奖励
                </button>
            </div>
        </div>
    </div>
</body>
</rml>
```

---

## 三、嵌套数据模型

### 3.1 多层数据结构

```cpp
// 公会数据模型
class GuildData : public Rml::DataModel
{
public:
    RMLUI_DATA_BINDINGS
    {
        RMLUI_DATA_BINDING(guild_name, &guild_name_)
        RMLUI_DATA_BINDING(guild_level, &guild_level_)
        RMLUI_DATA_BINDING(member_count, &member_count_)
        RMLUI_DATA_BINDING(members, &members_)
        RMLUI_DATA_BINDING(announcements, &announcements_)
    }

    // 成员数据结构
    struct Member
    {
        Rml::String id;
        Rml::String name;
        Rml::String title;  // 职位
        int level;
        int contribution;
        bool is_online;
        Rml::String last_login;
    };

    void AddMember(const Member& member)
    {
        Rml::DataDictionary data;
        data["id"] = member.id;
        data["name"] = member.name;
        data["title"] = member.title;
        data["level"] = member.level;
        data["contribution"] = member.contribution;
        data["is_online"] = member.is_online;
        data["last_login"] = member.last_login;

        members_.push_back(Rml::DataValue(data));
        member_count_ = static_cast<int>(members_.size());
        NotifyChanged("members");
        NotifyChanged("member_count");
    }

    // 更新成员在线状态
    void UpdateMemberStatus(const Rml::String& member_id, bool is_online)
    {
        for (size_t i = 0; i < members_.size(); ++i)
        {
            Rml::DataDictionary& member = members_[i].Get<Rml::DataDictionary>();
            if (member.Get<Rml::String>("id") == member_id)
            {
                member["is_online"] = is_online;
                NotifyChanged("members[" + Rml::StringFromReal(i) + "].is_online");
                return;
            }
        }
    }

private:
    Rml::String guild_name_ = "龙之荣耀";
    int guild_level_ = 1;
    int member_count_ = 0;
    Rml::DataList members_;
    Rml::DataList announcements_;
};
```

### 3.2 访问嵌套数据

```xml
<rml>
<head>
    <link type="text/rcss" href="guild.rcss"/>
</head>
<body data-model="guild">
    <div class="guild-panel">
        <div class="guild-header">
            <h2>{{ guild_name }}</h2>
            <span class="level">Lv.{{ guild_level }}</span>
            <span class="members">成员：{{ member_count }}/50</span>
        </div>

        <!-- 在线成员列表 -->
        <div class="member-list">
            <div class="member-item"
                 for="member in members"
                 class.online="member.is_online"
                 class.offline="!member.is_online">
                <span class="member-name">{{ member.name }}</span>
                <span class="member-title">{{ member.title }}</span>
                <span class="member-level">Lv.{{ member.level }}</span>
                <span class="status-indicator"></span>
            </div>
        </div>

        <!-- 按条件筛选显示 -->
        <div class="online-members">
            <h4>在线成员</h4>
            <div class="member-item"
                 for="member in members"
                 if="member.is_online">
                <span>{{ member.name }} - {{ member.title }}</span>
            </div>
        </div>
    </div>
</body>
</rml>
```

---

## 四、计算属性

### 4.1 只读计算属性

```cpp
class BattleStats : public Rml::DataModel
{
public:
    RMLUI_DATA_BINDINGS
    {
        // 基础属性
        RMLUI_DATA_BINDING(base_attack, &base_attack_)
        RMLUI_DATA_BINDING(base_defense, &base_defense_)

        // 装备加成
        RMLUI_DATA_BINDING(weapon_bonus, &weapon_bonus_)
        RMLUI_DATA_BINDING(armor_bonus, &armor_bonus_)

        // Buff 加成
        RMLUI_DATA_BINDING(buff_attack_percent, &buff_attack_percent_)
        RMLUI_DATA_BINDING(buff_defense_percent, &buff_defense_percent_)

        // 计算属性（只读）
        RMLUI_DATA_BINDING(final_attack, nullptr)  // 使用 getter
        RMLUI_DATA_BINDING(final_defense, nullptr)
        RMLUI_DATA_BINDING(damage_multiplier, nullptr)
    }

    // Getter 用于计算属性
    int GetFinalAttack() const
    {
        int total_bonus = weapon_bonus_;
        return static_cast<int>((base_attack_ + total_bonus) * (1 + buff_attack_percent_));
    }

    int GetFinalDefense() const
    {
        int total_bonus = armor_bonus_;
        return static_cast<int>((base_defense_ + total_bonus) * (1 + buff_defense_percent_));
    }

    float GetDamageMultiplier() const
    {
        return 1.0f + buff_attack_percent_;
    }

    // 当依赖项变化时，手动通知计算属性
    void SetWeaponBonus(int bonus)
    {
        weapon_bonus_ = bonus;
        NotifyChanged("final_attack");
        NotifyChanged("damage_multiplier");
    }

    void SetBuffAttackPercent(float percent)
    {
        buff_attack_percent_ = percent;
        NotifyChanged("final_attack");
        NotifyChanged("damage_multiplier");
    }

private:
    int base_attack_ = 100;
    int base_defense_ = 50;
    int weapon_bonus_ = 20;
    int armor_bonus_ = 10;
    float buff_attack_percent_ = 0.0f;
    float buff_defense_percent_ = 0.0f;
};
```

### 4.2 使用计算属性

```xml
<rml>
<head>
    <link type="text/rcss" href="battle.rcss"/>
</head>
<body data-model="battle">
    <div class="stats-panel">
        <div class="stat-row">
            <span>基础攻击力</span>
            <span>{{ base_attack }}</span>
        </div>
        <div class="stat-row">
            <span>武器加成</span>
            <span class="bonus">+{{ weapon_bonus }}</span>
        </div>
        <div class="stat-row">
            <span>Buff 加成</span>
            <span class="bonus">+{{ buff_attack_percent * 100 }}%</span>
        </div>
        <div class="stat-row total">
            <span>最终攻击力</span>
            <span class="highlight">{{ final_attack }}</span>
        </div>

        <div class="divider"></div>

        <div class="stat-row">
            <span>伤害倍率</span>
            <span class="multiplier">x{{ damage_multiplier }}</span>
        </div>
    </div>
</body>
</rml>
```

---

## 五、数据绑定性能优化

### 5.1 批量更新

```cpp
class OptimizedDataModel : public Rml::DataModel
{
public:
    // 开始批量更新
    void BeginUpdate()
    {
        is_updating_ = true;
        changed_fields_.clear();
    }

    // 结束批量更新并通知
    void EndUpdate()
    {
        is_updating_ = false;

        if (!changed_fields_.empty())
        {
            // 一次性通知所有变化的字段
            for (const auto& field : changed_fields_)
            {
                NotifyChanged(field);
            }
            changed_fields_.clear();
        }
    }

    // 重写 NotifyChanged 来支持批量
    void NotifyChanged(const Rml::String& name) override
    {
        if (is_updating_)
        {
            changed_fields_.insert(name);
        }
        else
        {
            Rml::DataModel::NotifyChanged(name);
        }
    }

private:
    bool is_updating_ = false;
    std::set<Rml::String> changed_fields_;
};

// 使用示例
void UpdatePlayerStats()
{
    player_data->BeginUpdate();

    player_data->SetHp(new_hp);
    player_data->SetMana(new_mana);
    player_data->SetAttack(new_attack);
    player_data->SetDefense(new_defense);

    player_data->EndUpdate();  // 只触发一次 UI 更新
}
```

### 5.2 延迟更新

```cpp
class DebouncedDataModel : public Rml::DataModel
{
public:
    void RequestUpdate(const Rml::String& field, int value)
    {
        pending_updates_[field] = value;

        if (!timer_active_)
        {
            timer_active_ = true;
            // 100ms 后应用更新
            ScheduleUpdate(100);
        }
    }

private:
    std::unordered_map<Rml::String, int> pending_updates_;
    bool timer_active_ = false;

    void ScheduleUpdate(int delay_ms)
    {
        // 使用系统接口的定时器
        // 或者在游戏主循环中处理
    }

    void ApplyPendingUpdates()
    {
        timer_active_ = false;

        for (const auto& [field, value] : pending_updates_)
        {
            // 应用更新并通知
            SetFieldValue(field, value);
            NotifyChanged(field);
        }
        pending_updates_.clear();
    }
};
```

### 5.3 虚拟化列表

对于大型列表，只渲染可见项：

```cpp
class VirtualListModel : public Rml::DataModel
{
public:
    RMLUI_DATA_BINDINGS
    {
        RMLUI_DATA_BINDING(visible_items, &visible_items_)
        RMLUI_DATA_BINDING(total_count, &total_count_)
    }

    void SetScrollPosition(int scroll_y)
    {
        scroll_y_ = scroll_y;
        UpdateVisibleItems();
    }

    void SetItemHeight(int height)
    {
        item_height_ = height;
        UpdateVisibleItems();
    }

    void SetViewportHeight(int height)
    {
        viewport_height_ = height;
        UpdateVisibleItems();
    }

private:
    int scroll_y_ = 0;
    int item_height_ = 40;
    int viewport_height_ = 600;
    Rml::DataList all_items_;
    Rml::DataList visible_items_;
    int total_count_ = 0;

    void UpdateVisibleItems()
    {
        // 计算可见范围
        int start_index = scroll_y_ / item_height_;
        int visible_count = viewport_height_ / item_height_ + 2;  // 多渲染一些作为缓冲

        start_index = std::max(0, start_index);
        int end_index = std::min(static_cast<int>(all_items_.size()),
                                  start_index + visible_count);

        // 更新可见项
        visible_items_.clear();
        for (int i = start_index; i < end_index; ++i)
        {
            Rml::DataDictionary item = all_items_[i].Get<Rml::DataDictionary>();
            item["virtual_index"] = i;  // 保存原始索引
            visible_items_.push_back(Rml::DataValue(item));
        }

        total_count_ = static_cast<int>(all_items_.size());
        NotifyChanged("visible_items");
        NotifyChanged("total_count");
    }
};
```

```xml
<!-- 虚拟化列表 UI -->
<div class="virtual-list" style="height: {{ total_count * item_height }}px">
    <div class="virtual-list-content" style="transform: translateY({{ scroll_y }}px)">
        <div class="list-item"
             for="item in visible_items"
             style="height: {{ item_height }}px">
            <span>{{ item.name }}</span>
        </div>
    </div>
</div>
```

---

## 六、实践练习

### 练习 1：创建排行榜系统

实现一个玩家排行榜：
- 使用自定义格式化显示分数（如 1,000,000）
- 支持按不同条件排序
- 只显示前 100 名，支持滚动加载

### 练习 2：实现邮件系统

创建游戏邮件界面：
- 邮件列表和邮件详情
- 支持标记已读/未读
- 附件领取功能
- 过期邮件自动清理

### 练习 3：制作技能树

设计一个技能树界面：
- 显示技能节点和连接
- 技能点分配和重置
- 前置技能检查
- 技能效果预览

---

## 📝 检查清单

- [ ] 能够创建和使用自定义数据转换器
- [ ] 掌握数组数据的增删改查操作
- [ ] 理解嵌套数据模型的访问方式
- [ ] 能够实现计算属性
- [ ] 了解数据绑定的性能优化技巧
- [ ] 理解虚拟化列表的概念

---

下一节：[自定义数据视图](04-custom-data-views.md) - 学习如何创建完全自定义的数据视图组件。
