# 3.4 自定义数据视图

RmlUi 的 DataViews 允许你创建完全自定义的数据绑定视图，超越基础的文本插值和属性绑定。通过实现 DataView 接口，你可以控制数据如何渲染为 UI 元素。

---

## 一、DataView 基础

### 1.1 什么是 DataView

DataView 是一个接口，允许你：
- 自定义数据到 UI 的转换逻辑
- 创建可复用的数据驱动组件
- 实现复杂的 UI 更新行为

### 1.2 实现简单的 DataView

```cpp
#include <RmlUi/Core.h>

// 创建一个血条视图
class HealthBarView : public Rml::DataView
{
public:
    HealthBarView() : Rml::DataView("healthbar") {}

    // 初始化时被调用
    bool Initialise(Rml::Element* element,
                    const Rml::DataViewConstructParams& params) override
    {
        element_ = element;
        params_ = params;
        return true;
    }

    // 数据变化时被调用
    void OnValueChange(const Rml::DataValue& value) override
    {
        if (!element_)
            return;

        // 获取数据值（期望是一个字典）
        if (value.GetType() != Rml::DataValueType::Dictionary)
            return;

        const Rml::DataDictionary& data = value.Get<Rml::DataDictionary>();

        int current_hp = data.Get<int>("current", 100);
        int max_hp = data.Get<int>("max", 100);

        // 计算百分比
        float percent = static_cast<float>(current_hp) / max_hp;

        // 更新血条填充元素
        Rml::Element* fill_element = element_->GetElementById("fill");
        if (fill_element)
        {
            float width = percent * 100.0f;
            fill_element->SetProperty(Rml::PropertyId::Width,
                                       Rml::Property(Rml::Unit::PERCENT, width));
        }

        // 更新文本
        Rml::Element* text_element = element_->GetElementById("text");
        if (text_element)
        {
            text_element->SetInnerRML(Rml::StringFromReal(current_hp) + "/" +
                                       Rml::StringFromReal(max_hp));
        }

        // 根据血量改变颜色
        UpdateColor(percent);
    }

    // 获取默认数据值
    Rml::DataValue GetDefaultValue() const override
    {
        Rml::DataDictionary default_data;
        default_data["current"] = 100;
        default_data["max"] = 100;
        return Rml::DataValue(default_data);
    }

private:
    Rml::Element* element_ = nullptr;
    Rml::DataViewConstructParams params_;

    void UpdateColor(float percent)
    {
        Rml::Element* fill_element = element_->GetElementById("fill");
        if (!fill_element)
            return;

        Rml::Colourb color;
        if (percent > 0.5f)
        {
            color = Rml::Colourb(46, 204, 113);  // 绿色
        }
        else if (percent > 0.25f)
        {
            color = Rml::Colourb(241, 196, 15);  // 黄色
        }
        else
        {
            color = Rml::Colourb(231, 76, 60);   // 红色
        }

        fill_element->SetProperty(Rml::PropertyId::BackgroundColor,
                                   Rml::Property(color));
    }
};

// 注册视图
void RegisterDataViews()
{
    Rml::DataView::RegisterDataView("healthbar", std::make_unique<HealthBarView>());
}
```

### 1.3 在 RML 中使用自定义视图

```xml
<rml>
<head>
    <link type="text/rcss" href="style.rcss"/>
</head>
<body data-model="player">
    <div class="unit-frame">
        <!-- 使用自定义血条视图 -->
        <div id="healthbar" data-view="healthbar" data-bind="hp_data">
            <div id="fill" class="health-fill"></div>
            <span id="text" class="health-text"></span>
        </div>
    </div>
</body>
</rml>
```

---

## 二、高级 DataView 实现

### 2.1 网格布局视图

```cpp
// 物品栏网格视图
class InventoryGridView : public Rml::DataView
{
public:
    InventoryGridView() : Rml::DataView("inventory-grid") {}

    bool Initialise(Rml::Element* element,
                    const Rml::DataViewConstructParams& params) override
    {
        element_ = element;
        params_ = params;

        // 从属性获取配置
        columns_ = params_.element->GetAttribute<int>("columns", 8);
        rows_ = params_.element->GetAttribute<int>("rows", 4);
        slot_size_ = params_.element->GetAttribute<int>("slot-size", 48);

        // 创建网格
        CreateGrid();
        return true;
    }

    void OnValueChange(const Rml::DataValue& value) override
    {
        if (value.GetType() != Rml::DataValueType::List)
            return;

        const Rml::DataList& items = value.Get<Rml::DataList>();

        // 更新每个槽位
        for (size_t i = 0; i < slots_.size(); ++i)
        {
            Rml::Element* slot = slots_[i];
            if (i < items.size())
            {
                UpdateSlot(slot, items[i].Get<Rml::DataDictionary>());
            }
            else
            {
                ClearSlot(slot);
            }
        }
    }

    Rml::DataValue GetDefaultValue() const override
    {
        return Rml::DataValue(Rml::DataList());
    }

private:
    Rml::Element* element_ = nullptr;
    Rml::DataViewConstructParams params_;
    int columns_ = 8;
    int rows_ = 4;
    int slot_size_ = 48;
    std::vector<Rml::Element*> slots_;

    void CreateGrid()
    {
        element_->SetProperty(Rml::PropertyId::Display,
                               Rml::Property(Rml::Style::Display::Grid));
        element_->SetProperty(Rml::PropertyId::GridTemplateColumns,
                               Rml::Property(Rml::String(columns_, "fr")));
        element_->SetProperty(Rml::PropertyId::GridTemplateRows,
                               Rml::Property(Rml::String(rows_, "fr")));
        element_->SetProperty(Rml::PropertyId::Gap,
                               Rml::Property(Rml::Unit::PX, 4));

        // 创建槽位
        int total_slots = columns_ * rows_;
        for (int i = 0; i < total_slots; ++i)
        {
            Rml::Element* slot = element_->GetOwnerDocument()->CreateElement("div");
            slot->SetClassNames("item-slot");
            slot->SetProperty(Rml::PropertyId::Width,
                               Rml::Property(Rml::Unit::PX, slot_size_));
            slot->SetProperty(Rml::PropertyId::Height,
                               Rml::Property(Rml::Unit::PX, slot_size_));

            // 添加拖拽支持
            slot->AddEventListener(Rml::EventId::Click, this);

            element_->AppendChild(slot);
            slots_.push_back(slot);
        }
    }

    void UpdateSlot(Rml::Element* slot, const Rml::DataDictionary& item)
    {
        slot->SetClassNames("item-slot has-item");

        // 清除子元素
        slot->SetInnerRML("");

        // 创建图标
        Rml::Element* img = slot->GetOwnerDocument()->CreateElement("img");
        img->SetAttribute("src", item.Get<Rml::String>("icon", ""));
        slot->AppendChild(img);

        // 创建数量标签
        int count = item.Get<int>("count", 1);
        if (count > 1)
        {
            Rml::Element* count_label = slot->GetOwnerDocument()->CreateElement("span");
            count_label->SetClassNames("item-count");
            count_label->SetInnerRML(Rml::StringFromReal(count));
            slot->AppendChild(count_label);
        }

        // 存储物品数据
        slot->SetAttribute("item-id", item.Get<Rml::String>("id", ""));
    }

    void ClearSlot(Rml::Element* slot)
    {
        slot->SetClassNames("item-slot");
        slot->SetInnerRML("");
        slot->RemoveAttribute("item-id");
    }

    void ProcessEvent(Rml::Event* event) override
    {
        if (event->GetId() == Rml::EventId::Click)
        {
            Rml::Element* slot = event->GetCurrentElement();
            Rml::String item_id = slot->GetAttribute<Rml::String>("item-id", "");

            if (!item_id.empty())
            {
                // 触发物品点击事件
                Rml::ParameterMap params;
                params["item_id"] = item_id;
                params["slot_index"] = GetSlotIndex(slot);
                element_->GetOwnerDocument()->DispatchEvent(
                    Rml::StringId("item_clicked"), params);
            }
        }
    }

    int GetSlotIndex(Rml::Element* slot)
    {
        for (size_t i = 0; i < slots_.size(); ++i)
        {
            if (slots_[i] == slot)
                return static_cast<int>(i);
        }
        return -1;
    }
};
```

### 2.2 使用网格视图

```xml
<rml>
<head>
    <link type="text/rcss" href="inventory.rcss"/>
</head>
<body data-model="inventory">
    <!-- 物品栏 -->
    <div class="inventory-panel">
        <h3>背包</h3>

        <!-- 自定义网格视图 -->
        <div id="inventory-grid"
             data-view="inventory-grid"
             data-bind="items"
             columns="8"
             rows="5"
             slot-size="50">
        </div>

        <div class="inventory-info">
            <span>物品：{{ item_count }}/{{ max_slots }}</span>
        </div>
    </div>
</body>
</rml>
```

```css
.inventory-panel {
    background: #2c3e50;
    padding: 20px;
    border-radius: 8px;
}

.item-slot {
    background: #34495e;
    border: 2px solid #4a6278;
    border-radius: 4px;
    position: relative;
    cursor: pointer;
}

.item-slot:hover {
    border-color: #3498db;
}

.item-slot.has-item {
    border-color: #27ae60;
}

.item-slot img {
    width: 100%;
    height: 100%;
    padding: 4px;
}

.item-count {
    position: absolute;
    bottom: 2px;
    right: 4px;
    color: white;
    font-size: 12px;
    font-weight: bold;
    text-shadow: 1px 1px 2px black;
}
```

---

## 三、数据驱动的下拉列表

### 3.1 DropdownView 实现

```cpp
class DropdownView : public Rml::DataView
{
public:
    DropdownView() : Rml::DataView("dropdown") {}

    bool Initialise(Rml::Element* element,
                    const Rml::DataViewConstructParams& params) override
    {
        element_ = element;
        params_ = params;

        selected_index_ = -1;

        // 创建下拉按钮
        CreateDropdownButton();

        // 创建选项面板
        CreateOptionsPanel();

        // 监听点击事件
        dropdown_button_->AddEventListener(Rml::EventId::Click, this);

        return true;
    }

    void OnValueChange(const Rml::DataValue& value) override
    {
        if (value.GetType() != Rml::DataValueType::List)
            return;

        const Rml::DataList& options = value.Get<Rml::DataList>();
        options_ = options;

        // 重建选项
        RebuildOptions();
    }

    Rml::DataValue GetDefaultValue() const override
    {
        return Rml::DataValue(Rml::DataList());
    }

    void ProcessEvent(Rml::Event* event) override
    {
        if (event->GetId() == Rml::EventId::Click)
        {
            if (event->GetCurrentElement() == dropdown_button_)
            {
                ToggleOptions();
            }
            else if (event->GetCurrentElement()->GetClassList().Contains("dropdown-option"))
            {
                SelectOption(event->GetCurrentElement());
            }
            else if (!options_panel_->IsPointWithinElement(event->GetParameter<Rml::Vector2f>("mouse_pos", Rml::Vector2f(0, 0))))
            {
                HideOptions();
            }
        }
    }

private:
    Rml::Element* element_ = nullptr;
    Rml::DataViewConstructParams params_;
    Rml::Element* dropdown_button_ = nullptr;
    Rml::Element* selected_label_ = nullptr;
    Rml::Element* options_panel_ = nullptr;
    Rml::DataList options_;
    int selected_index_;
    bool is_open_ = false;

    void CreateDropdownButton()
    {
        dropdown_button_ = element_->GetOwnerDocument()->CreateElement("div");
        dropdown_button_->SetClassNames("dropdown-button");

        selected_label_ = element_->GetOwnerDocument()->CreateElement("span");
        selected_label_->SetClassNames("dropdown-selected");
        selected_label_->SetInnerRML("请选择");

        Rml::Element* arrow = element_->GetOwnerDocument()->CreateElement("span");
        arrow->SetClassNames("dropdown-arrow");
        arrow->SetInnerRML("▼");

        dropdown_button_->AppendChild(selected_label_);
        dropdown_button_->AppendChild(arrow);
        element_->AppendChild(dropdown_button_);
    }

    void CreateOptionsPanel()
    {
        options_panel_ = element_->GetOwnerDocument()->CreateElement("div");
        options_panel_->SetClassNames("dropdown-options");
        options_panel_->SetProperty(Rml::PropertyId::Visibility,
                                     Rml::Property(Rml::Style::Visibility::Hidden));
        element_->AppendChild(options_panel_);
    }

    void RebuildOptions()
    {
        options_panel_->SetInnerRML("");
        option_elements_.clear();

        for (size_t i = 0; i < options_.size(); ++i)
        {
            const Rml::DataDictionary& option = options_[i].Get<Rml::DataDictionary>();

            Rml::Element* option_el = element_->GetOwnerDocument()->CreateElement("div");
            option_el->SetClassNames("dropdown-option");
            option_el->SetInnerRML(option.Get<Rml::String>("label", ""));
            option_el->SetAttribute("data-index", static_cast<int>(i));

            options_panel_->AppendChild(option_el);
            option_elements_.push_back(option_el);
        }
    }

    void ToggleOptions()
    {
        if (is_open_)
            HideOptions();
        else
            ShowOptions();
    }

    void ShowOptions()
    {
        options_panel_->SetProperty(Rml::PropertyId::Visibility,
                                     Rml::Property(Rml::Style::Visibility::Visible));
        is_open_ = true;
    }

    void HideOptions()
    {
        options_panel_->SetProperty(Rml::PropertyId::Visibility,
                                     Rml::Property(Rml::Style::Visibility::Hidden));
        is_open_ = false;
    }

    void SelectOption(Rml::Element* option_el)
    {
        int index = option_el->GetAttribute<int>("data-index", -1);
        if (index < 0 || index >= static_cast<int>(options_.size()))
            return;

        selected_index_ = index;

        // 更新选中显示
        const Rml::DataDictionary& option = options_[index].Get<Rml::DataDictionary>();
        selected_label_->SetInnerRML(option.Get<Rml::String>("label", ""));

        // 清除其他选项的选中状态
        for (auto* el : option_elements_)
        {
            el->RemoveClass("selected");
        }
        option_el->AddClass("selected");

        // 触发选择事件
        Rml::ParameterMap params;
        params["index"] = index;
        params["value"] = option.Get<Rml::String>("value", "");
        element_->GetOwnerDocument()->DispatchEvent(
            Rml::StringId("dropdown_changed"), params);

        HideOptions();
    }

    std::vector<Rml::Element*> option_elements_;
};
```

### 3.2 使用下拉列表

```xml
<rml>
<head>
    <link type="text/rcss" href="dropdown.rcss"/>
</head>
<body data-model="settings">
    <div class="settings-form">
        <!-- 画质设置 -->
        <div class="form-row">
            <label>画质设置</label>
            <div data-view="dropdown" data-bind="graphics_options">
            </div>
        </div>

        <!-- 分辨率设置 -->
        <div class="form-row">
            <label>分辨率</label>
            <div data-view="dropdown" data-bind="resolution_options">
            </div>
        </div>
    </div>
</body>
</rml>
```

```cpp
// C++ 中设置数据
class SettingsData : public Rml::DataModel
{
public:
    RMLUI_DATA_BINDINGS
    {
        RMLUI_DATA_BINDING(graphics_options, &graphics_options_)
        RMLUI_DATA_BINDING(resolution_options, &resolution_options_)
    }

    SettingsData()
    {
        // 画质选项
        AddOption(graphics_options_, "低", "low");
        AddOption(graphics_options_, "中", "medium");
        AddOption(graphics_options_, "高", "high");
        AddOption(graphics_options_, "超高", "ultra");

        // 分辨率选项
        AddOption(resolution_options_, "1280x720", "1280x720");
        AddOption(resolution_options_, "1920x1080", "1920x1080");
        AddOption(resolution_options_, "2560x1440", "2560x1440");
        AddOption(resolution_options_, "3840x2160", "3840x2160");
    }

private:
    Rml::DataList graphics_options_;
    Rml::DataList resolution_options_;

    void AddOption(Rml::DataList& list,
                   const Rml::String& label,
                   const Rml::String& value)
    {
        Rml::DataDictionary option;
        option["label"] = label;
        option["value"] = value;
        list.push_back(Rml::DataValue(option));
    }
};
```

---

## 四、实战：完整的技能树视图

### 4.1 技能树数据结构

```cpp
struct SkillNode
{
    Rml::String id;
    Rml::String name;
    Rml::String description;
    Rml::String icon;
    int max_level;
    int current_level;
    std::vector<Rml::String> prerequisites;  // 前置技能
    std::vector<Rml::String> unlocks;        // 解锁的技能
    Rml::Dictionary effects;                 // 技能效果
};

class SkillTreeModel : public Rml::DataModel
{
public:
    RMLUI_DATA_BINDINGS
    {
        RMLUI_DATA_BINDING(skill_points, &skill_points_)
        RMLUI_DATA_BINDING(skills, &skills_)
    }

    bool CanUpgradeSkill(const Rml::String& skill_id) const
    {
        auto it = skills_.find(skill_id);
        if (it == skills_.end())
            return false;

        const SkillNode& skill = it->second;

        // 检查是否已达最大等级
        if (skill.current_level >= skill.max_level)
            return false;

        // 检查技能点
        if (skill_points_ <= 0)
            return false;

        // 检查前置技能
        for (const auto& prereq : skill.prerequisites)
        {
            auto prereq_it = skills_.find(prereq);
            if (prereq_it == skills_.end() ||
                prereq_it->second.current_level == 0)
            {
                return false;
            }
        }

        return true;
    }

    void UpgradeSkill(const Rml::String& skill_id)
    {
        if (!CanUpgradeSkill(skill_id))
            return;

        SkillNode& skill = skills_[skill_id];
        skill.current_level++;
        skill_points_--;

        NotifyChanged("skill_points");
        NotifyChanged("skills");  // 触发整个技能树更新
    }

private:
    int skill_points_ = 5;
    std::unordered_map<Rml::String, SkillNode> skills_;
};
```

### 4.2 技能树视图实现

```cpp
class SkillTreeView : public Rml::DataView
{
public:
    SkillTreeView() : Rml::DataView("skilltree") {}

    bool Initialise(Rml::Element* element,
                    const Rml::DataViewConstructParams& params) override
    {
        element_ = element;
        params_ = params;

        // 创建技能节点容器
        skills_container_ = element_->GetOwnerDocument()->CreateElement("div");
        skills_container_->SetClassNames("skill-tree-container");
        element_->AppendChild(skills_container_);

        return true;
    }

    void OnValueChange(const Rml::DataValue& value) override
    {
        if (value.GetType() != Rml::DataValueType::Dictionary)
            return;

        const Rml::DataDictionary& skills_dict = value.Get<Rml::DataDictionary>();

        // 重建技能树
        RebuildSkillTree(skills_dict);
    }

    Rml::DataValue GetDefaultValue() const override
    {
        return Rml::DataValue(Rml::DataDictionary());
    }

private:
    Rml::Element* element_ = nullptr;
    Rml::Element* skills_container_ = nullptr;
    std::unordered_map<Rml::String, Rml::Element*> skill_elements_;

    void RebuildSkillTree(const Rml::DataDictionary& skills)
    {
        skills_container_->SetInnerRML("");
        skill_elements_.clear();

        // 遍历所有技能并创建节点
        for (const auto& [id, value] : skills)
        {
            const Rml::DataDictionary& skill_data = value.Get<Rml::DataDictionary>();
            CreateSkillNode(id, skill_data);
        }

        // 创建连接线
        CreateConnections(skills);
    }

    void CreateSkillNode(const Rml::String& id,
                         const Rml::DataDictionary& skill_data)
    {
        Rml::Element* node = element_->GetOwnerDocument()->CreateElement("div");
        node->SetClassNames("skill-node");
        node->SetId("skill-" + id);
        node->SetAttribute("data-skill-id", id);

        // 图标
        Rml::Element* icon = element_->GetOwnerDocument()->CreateElement("img");
        icon->SetAttribute("src", skill_data.Get<Rml::String>("icon", ""));
        node->AppendChild(icon);

        // 名称
        Rml::Element* name = element_->GetOwnerDocument()->CreateElement("span");
        name->SetClassNames("skill-name");
        name->SetInnerRML(skill_data.Get<Rml::String>("name", ""));
        node->AppendChild(name);

        // 等级
        int current = skill_data.Get<int>("current_level", 0);
        int max = skill_data.Get<int>("max_level", 5);

        Rml::Element* level = element_->GetOwnerDocument()->CreateElement("span");
        level->SetClassNames("skill-level");
        level->SetInnerRML(Rml::StringFromReal(current) + "/" +
                           Rml::StringFromReal(max));
        node->AppendChild(level);

        // 添加点击事件
        node->AddEventListener(Rml::EventId::Click, this);

        skills_container_->AppendChild(node);
        skill_elements_[id] = node;
    }

    void CreateConnections(const Rml::DataDictionary& skills)
    {
        // 这里可以使用 SVG 或 Canvas 绘制连接线
        // 简化版本：添加 CSS 类来显示连接关系
    }

    void ProcessEvent(Rml::Event* event) override
    {
        if (event->GetId() == Rml::EventId::Click)
        {
            Rml::Element* node = event->GetCurrentElement();
            if (node->GetClassList().Contains("skill-node"))
            {
                Rml::String skill_id = node->GetAttribute<Rml::String>("data-skill-id", "");
                if (!skill_id.empty())
                {
                    // 触发升级事件
                    Rml::ParameterMap params;
                    params["skill_id"] = skill_id;
                    element_->GetOwnerDocument()->DispatchEvent(
                        Rml::StringId("skill_upgrade"), params);
                }
            }
        }
    }
};
```

---

## 五、实践练习

### 练习 1：创建天赋树视图

实现一个圆形的天赋树：
- 中心向外辐射的布局
- 点击天赋节点查看效果
- 支持重置天赋点

### 练习 2：制作装备对比视图

创建装备对比组件：
- 左右显示当前装备和备选装备
- 自动计算并显示属性变化
- 绿色表示提升，红色表示下降

### 练习 3：实现聊天视图

创建一个数据驱动的聊天框：
- 支持不同类型的消息（系统、玩家、队伍）
- 消息滚动和自动清理
- @提及高亮显示

---

## 📝 检查清单

- [ ] 理解 DataView 的工作原理
- [ ] 能够实现简单的自定义视图
- [ ] 掌握复杂视图的创建方法
- [ ] 能够处理视图中的用户交互
- [ ] 了解如何将数据视图与事件系统结合

---

下一节：[双向绑定](05-two-way-binding.md) - 学习如何实现表单数据的双向同步。
