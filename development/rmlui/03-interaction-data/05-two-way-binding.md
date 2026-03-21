# 3.5 双向绑定

双向绑定允许数据模型和 UI 元素之间自动同步：数据变化更新 UI，UI 变化（如用户输入）也自动更新数据。这对于表单处理特别有用。

---

## 一、双向绑定基础

### 1.1 什么是双向绑定

```
单向绑定：数据 → UI
双向绑定：数据 ↔ UI
```

在双向绑定中：
- 数据变化时，UI 自动更新
- 用户修改 UI（如输入文本）时，数据自动更新

### 1.2 基本的双向绑定

RmlUi 通过 `bind` 属性实现双向绑定：

```xml
<rml>
<head>
    <link type="text/rcss" href="style.rcss"/>
</head>
<body data-model="form">
    <div class="form-group">
        <label>用户名</label>
        <!-- 使用 bind 实现双向绑定 -->
        <input type="text" bind="username"/>
    </div>

    <div class="form-group">
        <label>密码</label>
        <input type="password" bind="password"/>
    </div>

    <!-- 实时显示输入 -->
    <div class="preview">
        <p>用户名：{{ username }}</p>
        <p>密码：{{ password }}</p>
    </div>
</body>
</rml>
```

### 1.3 数据模型实现

```cpp
class FormData : public Rml::DataModel
{
public:
    RMLUI_DATA_BINDINGS
    {
        RMLUI_DATA_BINDING(username, &username_)
        RMLUI_DATA_BINDING(password, &password_)
        RMLUI_DATA_BINDING(email, &email_)
        RMLUI_DATA_BINDING(age, &age_)
        RMLUI_DATA_BINDING(is_subscribed, &is_subscribed_)
    }

    // Getter 和 Setter
    const Rml::String& GetUsername() const { return username_; }
    void SetUsername(const Rml::String& value)
    {
        if (username_ != value)
        {
            username_ = value;
            NotifyChanged("username");
            OnUsernameChanged(value);  // 回调
        }
    }

    const Rml::String& GetPassword() const { return password_; }
    void SetPassword(const Rml::String& value)
    {
        password_ = value;
        NotifyChanged("password");
    }

    const Rml::String& GetEmail() const { return email_; }
    void SetEmail(const Rml::String& value)
    {
        email_ = value;
        NotifyChanged("email");
    }

    int GetAge() const { return age_; }
    void SetAge(int value)
    {
        age_ = value;
        NotifyChanged("age");
    }

    bool GetIsSubscribed() const { return is_subscribed_; }
    void SetIsSubscribed(bool value)
    {
        is_subscribed_ = value;
        NotifyChanged("is_subscribed");
    }

private:
    Rml::String username_;
    Rml::String password_;
    Rml::String email_;
    int age_ = 18;
    bool is_subscribed_ = false;

    void OnUsernameChanged(const Rml::String& new_name)
    {
        // 可以在这里进行验证或其他处理
        printf("Username changed to: %s\n", new_name.c_str());
    }
};
```

---

## 二、表单控件的双向绑定

### 2.1 文本输入框

```xml
<rml>
<head>
    <link type="text/rcss" href="form.rcss"/>
</head>
<body data-model="user">
    <form class="registration-form">
        <!-- 文本输入 -->
        <div class="form-group">
            <label for="username">用户名</label>
            <input type="text" id="username" bind="username"
                   placeholder="请输入用户名"/>
            <span class="error" if="!username_valid">
                用户名长度为 3-20 个字符
            </span>
        </div>

        <!-- 邮箱输入 -->
        <div class="form-group">
            <label for="email">邮箱</label>
            <input type="email" id="email" bind="email"
                   placeholder="example@email.com"/>
        </div>

        <!-- 数字输入 -->
        <div class="form-group">
            <label for="age">年龄</label>
            <input type="number" id="age" bind="age"
                   min="1" max="150"/>
        </div>

        <!-- 密码输入 -->
        <div class="form-group">
            <label for="password">密码</label>
            <input type="password" id="password" bind="password"/>
        </div>

        <!-- 多行文本 -->
        <div class="form-group">
            <label for="bio">个人简介</label>
            <textarea bind="bio" rows="4"
                      placeholder="介绍一下你自己"></textarea>
        </div>

        <button type="submit" onclick="SubmitForm()">提交</button>
    </form>
</body>
</rml>
```

### 2.2 复选框和单选框

```xml
<rml>
<head>
    <link type="text/rcss" href="settings.rcss"/>
</head>
<body data-model="settings">
    <div class="settings-panel">
        <!-- 复选框绑定到布尔值 -->
        <div class="checkbox-group">
            <label>
                <input type="checkbox" bind="enable_sound"/>
                启用音效
            </label>
        </div>

        <div class="checkbox-group">
            <label>
                <input type="checkbox" bind="enable_music"/>
                启用音乐
            </label>
        </div>

        <div class="checkbox-group">
            <label>
                <input type="checkbox" bind="show_fps"/>
                显示 FPS
            </label>
        </div>

        <!-- 单选框绑定到字符串或整数 -->
        <div class="radio-group">
            <label>画质设置：</label>
            <label>
                <input type="radio" bind="graphics_quality" value="low"/>
                低
            </label>
            <label>
                <input type="radio" bind="graphics_quality" value="medium"/>
                中
            </label>
            <label>
                <input type="radio" bind="graphics_quality" value="high"/>
                高
            </label>
            <label>
                <input type="radio" bind="graphics_quality" value="ultra"/>
                超高
            </label>
        </div>

        <!-- 显示当前值 -->
        <div class="current-values">
            <p>音效：{{ enable_sound ? "开启" : "关闭" }}</p>
            <p>音乐：{{ enable_music ? "开启" : "关闭" }}</p>
            <p>画质：{{ graphics_quality }}</p>
        </div>
    </div>
</body>
</rml>
```

### 2.3 下拉选择框

```xml
<rml>
<head>
    <link type="text/rcss" href="character.rcss"/>
</head>
<body data-model="character">
    <div class="character-creation">
        <!-- 职业选择 -->
        <div class="form-group">
            <label>职业</label>
            <select bind="class">
                <option value="warrior">战士</option>
                <option value="mage">法师</option>
                <option value="archer">弓箭手</option>
                <option value="priest">牧师</option>
            </select>
        </div>

        <!-- 性别选择 -->
        <div class="form-group">
            <label>性别</label>
            <select bind="gender">
                <option value="male">男</option>
                <option value="female">女</option>
            </select>
        </div>

        <!-- 阵营选择 -->
        <div class="form-group">
            <label>阵营</label>
            <select bind="faction">
                <option value="alliance">联盟</option>
                <option value="horde">部落</option>
            </select>
        </div>

        <!-- 显示选择的职业详情 -->
        <div class="class-info" if="class == 'warrior'">
            <h3>战士</h3>
            <p>擅长近战攻击，拥有强大的防御能力。</p>
            <p>初始力量：+10</p>
        </div>

        <div class="class-info" if="class == 'mage'">
            <h3>法师</h3>
            <p>掌握奥术魔法，能够造成大量范围伤害。</p>
            <p>初始智力：+10</p>
        </div>

        <!-- 预览角色 -->
        <div class="preview">
            <h3>角色预览</h3>
            <p>{{ gender == 'male' ? '男性' : '女性' }}
               {{ faction == 'alliance' ? '联盟' : '部落' }}
               {{ class == 'warrior' ? '战士' : class == 'mage' ? '法师' : class == 'archer' ? '弓箭手' : '牧师' }}
            </p>
        </div>
    </div>
</body>
</rml>
```

---

## 三、输入验证

### 3.1 实时验证

```cpp
class ValidatedFormData : public Rml::DataModel
{
public:
    RMLUI_DATA_BINDINGS
    {
        // 表单字段
        RMLUI_DATA_BINDING(username, &username_)
        RMLUI_DATA_BINDING(email, &email_)
        RMLUI_DATA_BINDING(password, &password_)
        RMLUI_DATA_BINDING(confirm_password, &confirm_password_)
        RMLUI_DATA_BINDING(age, &age_)

        // 验证状态（只读）
        RMLUI_DATA_BINDING(username_valid, nullptr)
        RMLUI_DATA_BINDING(email_valid, nullptr)
        RMLUI_DATA_BINDING(password_valid, nullptr)
        RMLUI_DATA_BINDING(passwords_match, nullptr)
        RMLUI_DATA_BINDING(form_valid, nullptr)
    }

    // Username
    const Rml::String& GetUsername() const { return username_; }
    void SetUsername(const Rml::String& value)
    {
        username_ = value;
        NotifyChanged("username");
        NotifyChanged("username_valid");
        NotifyChanged("form_valid");
    }

    bool GetUsernameValid() const
    {
        return username_.length() >= 3 && username_.length() <= 20;
    }

    // Email
    const Rml::String& GetEmail() const { return email_; }
    void SetEmail(const Rml::String& value)
    {
        email_ = value;
        NotifyChanged("email");
        NotifyChanged("email_valid");
        NotifyChanged("form_valid");
    }

    bool GetEmailValid() const
    {
        // 简单的邮箱验证
        size_t at_pos = email_.find('@');
        size_t dot_pos = email_.rfind('.');
        return at_pos != Rml::String::npos &&
               dot_pos != Rml::String::npos &&
               dot_pos > at_pos;
    }

    // Password
    const Rml::String& GetPassword() const { return password_; }
    void SetPassword(const Rml::String& value)
    {
        password_ = value;
        NotifyChanged("password");
        NotifyChanged("password_valid");
        NotifyChanged("passwords_match");
        NotifyChanged("form_valid");
    }

    bool GetPasswordValid() const
    {
        // 密码至少 8 位，包含字母和数字
        if (password_.length() < 8)
            return false;

        bool has_letter = false;
        bool has_digit = false;
        for (char c : password_)
        {
            if (isalpha(c)) has_letter = true;
            if (isdigit(c)) has_digit = true;
        }
        return has_letter && has_digit;
    }

    // Confirm Password
    const Rml::String& GetConfirmPassword() const { return confirm_password_; }
    void SetConfirmPassword(const Rml::String& value)
    {
        confirm_password_ = value;
        NotifyChanged("confirm_password");
        NotifyChanged("passwords_match");
        NotifyChanged("form_valid");
    }

    bool GetPasswordsMatch() const
    {
        return password_ == confirm_password_ && !password_.empty();
    }

    // Age
    int GetAge() const { return age_; }
    void SetAge(int value)
    {
        age_ = value;
        NotifyChanged("age");
        NotifyChanged("form_valid");
    }

    // 表单总体有效性
    bool GetFormValid() const
    {
        return GetUsernameValid() &&
               GetEmailValid() &&
               GetPasswordValid() &&
               GetPasswordsMatch() &&
               age_ >= 18;
    }

    // 提交表单
    bool Submit()
    {
        if (GetFormValid())
        {
            printf("Form submitted!\n");
            printf("Username: %s\n", username_.c_str());
            printf("Email: %s\n", email_.c_str());
            printf("Age: %d\n", age_);
            return true;
        }
        return false;
    }

private:
    Rml::String username_;
    Rml::String email_;
    Rml::String password_;
    Rml::String confirm_password_;
    int age_ = 18;
};
```

### 3.2 验证 UI

```xml
<rml>
<head>
    <link type="text/rcss" href="validated-form.rcss"/>
</head>
<body data-model="form">
    <form class="validated-form">
        <!-- 用户名 -->
        <div class="form-group">
            <label>用户名</label>
            <input type="text" bind="username"
                   class.invalid="!username_valid"
                   class.valid="username_valid"/>
            <span class="hint" if="!username_valid">
                用户名需要 3-20 个字符
            </span>
            <span class="success" if="username_valid">
                ✓ 用户名可用
            </span>
        </div>

        <!-- 邮箱 -->
        <div class="form-group">
            <label>邮箱</label>
            <input type="email" bind="email"
                   class.invalid="!email_valid"
                   class.valid="email_valid"/>
            <span class="hint" if="!email_valid">
                请输入有效的邮箱地址
            </span>
        </div>

        <!-- 密码 -->
        <div class="form-group">
            <label>密码</label>
            <input type="password" bind="password"
                   class.invalid="!password_valid"
                   class.valid="password_valid"/>
            <span class="hint" if="!password_valid">
                密码至少 8 位，需包含字母和数字
            </span>
        </div>

        <!-- 确认密码 -->
        <div class="form-group">
            <label>确认密码</label>
            <input type="password" bind="confirm_password"
                   class.invalid="!passwords_match"
                   class.valid="passwords_match"/>
            <span class="error" if="!passwords_match && !confirm_password.empty()">
                两次输入的密码不一致
            </span>
        </div>

        <!-- 年龄 -->
        <div class="form-group">
            <label>年龄</label>
            <input type="number" bind="age" min="1" max="150"/>
            <span class="error" if="age < 18">
                必须年满 18 岁
            </span>
        </div>

        <!-- 提交按钮 -->
        <button type="button"
                onclick="Submit()"
                disabled="!form_valid">
            注册
        </button>

        <!-- 提交按钮禁用状态提示 -->
        <p class="disabled-hint" if="!form_valid">
            请完成并修正所有字段后提交
        </p>
    </form>
</body>
</rml>
```

```css
/* validated-form.rcss */

.validated-form {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
}

.form-group {
    margin-bottom: 20px;
}

.form-group label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
}

.form-group input {
    width: 100%;
    padding: 10px;
    border: 2px solid #ddd;
    border-radius: 4px;
    font-size: 14px;
}

.form-group input.valid {
    border-color: #27ae60;
    background-color: rgba(39, 174, 96, 0.1);
}

.form-group input.invalid {
    border-color: #e74c3c;
    background-color: rgba(231, 76, 60, 0.1);
}

.form-group .hint {
    display: block;
    color: #999;
    font-size: 12px;
    margin-top: 5px;
}

.form-group .error {
    display: block;
    color: #e74c3c;
    font-size: 12px;
    margin-top: 5px;
}

.form-group .success {
    display: block;
    color: #27ae60;
    font-size: 12px;
    margin-top: 5px;
}

button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    background-color: #ccc;
}

.disabled-hint {
    color: #999;
    font-size: 12px;
    text-align: center;
    margin-top: 10px;
}
```

---

## 四、自定义双向绑定组件

### 4.1 滑块控件

```cpp
class SliderDataModel : public Rml::DataModel
{
public:
    RMLUI_DATA_BINDINGS
    {
        RMLUI_DATA_BINDING(value, &value_)
        RMLUI_DATA_BINDING(min_value, &min_value_)
        RMLUI_DATA_BINDING(max_value, &max_value_)
    }

    int GetValue() const { return value_; }
    void SetValue(int value)
    {
        value_ = Rml::Math::Clamp(value, min_value_, max_value_);
        NotifyChanged("value");
    }

    int GetMinValue() const { return min_value_; }
    void SetMinValue(int value)
    {
        min_value_ = value;
        NotifyChanged("min_value");
    }

    int GetMaxValue() const { return max_value_; }
    void SetMaxValue(int value)
    {
        max_value_ = value;
        NotifyChanged("max_value");
    }

private:
    int value_ = 50;
    int min_value_ = 0;
    int max_value_ = 100;
};
```

```xml
<rml>
<head>
    <link type="text/rcss" href="slider.rcss"/>
</head>
<body data-model="slider">
    <div class="slider-control">
        <div class="slider-header">
            <label>音量</label>
            <span class="slider-value">{{ value }}%</span>
        </div>

        <!-- 自定义滑块实现 -->
        <div class="slider-track" onclick="SetValueFromClick(event)">
            <div class="slider-fill" style="width: {{ value }}%"></div>
            <div class="slider-thumb" style="left: {{ value }}%"></div>
        </div>

        <!-- 原生滑块作为备选 -->
        <input type="range" bind="value"
               min="{{ min_value }}" max="{{ max_value }}"
               class="native-slider"/>
    </div>
</body>
</rml>
```

### 4.2 颜色选择器

```cpp
class ColorPickerModel : public Rml::DataModel
{
public:
    RMLUI_DATA_BINDINGS
    {
        RMLUI_DATA_BINDING(color, &color_)
        RMLUI_DATA_BINDING(red, nullptr)
        RMLUI_DATA_BINDING(green, nullptr)
        RMLUI_DATA_BINDING(blue, nullptr)
        RMLUI_DATA_BINDING(alpha, &alpha_)
    }

    // 解析颜色字符串为 RGB
    void SetColor(const Rml::String& color)
    {
        color_ = color;
        NotifyChanged("color");
        NotifyChanged("red");
        NotifyChanged("green");
        NotifyChanged("blue");
    }

    const Rml::String& GetColor() const { return color_; }

    // 计算属性
    int GetRed() const
    {
        if (color_.length() >= 7)
            return std::stoi(color_.substr(1, 2), nullptr, 16);
        return 0;
    }

    int GetGreen() const
    {
        if (color_.length() >= 7)
            return std::stoi(color_.substr(3, 2), nullptr, 16);
        return 0;
    }

    int GetBlue() const
    {
        if (color_.length() >= 7)
            return std::stoi(color_.substr(5, 2), nullptr, 16);
        return 0;
    }

    void SetRed(int value)
    {
        color_ = StringFromRGB(value, GetGreen(), GetBlue());
        NotifyChanged("color");
        NotifyChanged("red");
    }

    void SetGreen(int value)
    {
        color_ = StringFromRGB(GetRed(), value, GetBlue());
        NotifyChanged("color");
        NotifyChanged("green");
    }

    void SetBlue(int value)
    {
        color_ = StringFromRGB(GetRed(), GetGreen(), value);
        NotifyChanged("color");
        NotifyChanged("blue");
    }

private:
    Rml::String color_ = "#ff0000";
    int alpha_ = 255;

    Rml::String StringFromRGB(int r, int g, int b) const
    {
        char buffer[32];
        sprintf(buffer, "#%02x%02x%02x", r, g, b);
        return buffer;
    }
};
```

```xml
<rml>
<head>
    <link type="text/rcss" href="colorpicker.rcss"/>
</head>
<body data-model="colorpicker">
    <div class="color-picker">
        <!-- 颜色预览 -->
        <div class="color-preview" style="background-color: {{ color }}"></div>

        <!-- RGB 输入 -->
        <div class="rgb-inputs">
            <div class="input-group">
                <label>R</label>
                <input type="number" bind="red" min="0" max="255"/>
            </div>
            <div class="input-group">
                <label>G</label>
                <input type="number" bind="green" min="0" max="255"/>
            </div>
            <div class="input-group">
                <label>B</label>
                <input type="number" bind="blue" min="0" max="255"/>
            </div>
        </div>

        <!-- 颜色值显示 -->
        <div class="color-value">
            <span>{{ color }}</span>
        </div>
    </div>
</body>
</rml>
```

---

## 五、实战：完整的设置面板

### 5.1 完整的数据模型

```cpp
class GameSettings : public Rml::DataModel
{
public:
    GameSettings()
    {
        LoadDefaults();
    }

    RMLUI_DATA_BINDINGS
    {
        // 音频设置
        RMLUI_DATA_BINDING(master_volume, &master_volume_)
        RMLUI_DATA_BINDING(music_volume, &music_volume_)
        RMLUI_DATA_BINDING(sfx_volume, &sfx_volume_)
        RMLUI_DATA_BINDING(voice_volume, &voice_volume_)
        RMLUI_DATA_BINDING(mute_audio, &mute_audio_)

        // 图形设置
        RMLUI_DATA_BINDING(graphics_quality, &graphics_quality_)
        RMLUI_DATA_BINDING(resolution_width, &resolution_width_)
        RMLUI_DATA_BINDING(resolution_height, &resolution_height_)
        RMLUI_DATA_BINDING(fullscreen, &fullscreen_)
        RMLUI_DATA_BINDING(vsync, &vsync_)
        RMLUI_DATA_BINDING(show_fps, &show_fps_)

        // 游戏设置
        RMLUI_DATA_BINDING(difficulty, &difficulty_)
        RMLUI_DATA_BINDING(language, &language_)
        RMLUI_DATA_BINDING(auto_save, &auto_save_)

        // 按键绑定
        RMLUI_DATA_BINDING(key_move_forward, &key_move_forward_)
        RMLUI_DATA_BINDING(key_move_backward, &key_move_backward_)
        RMLUI_DATA_BINDING(key_jump, &key_jump_)
    }

    void LoadDefaults()
    {
        master_volume_ = 80;
        music_volume_ = 60;
        sfx_volume_ = 80;
        voice_volume_ = 70;
        mute_audio_ = false;

        graphics_quality_ = "high";
        resolution_width_ = 1920;
        resolution_height_ = 1080;
        fullscreen_ = true;
        vsync_ = true;
        show_fps_ = false;

        difficulty_ = "normal";
        language_ = "zh-CN";
        auto_save_ = true;

        key_move_forward_ = "W";
        key_move_backward_ = "S";
        key_jump_ = "Space";
    }

    void Save()
    {
        // 保存到配置文件
        printf("Saving settings...\n");
    }

    void Apply()
    {
        // 应用设置
        printf("Applying settings...\n");

        // 示例：应用音量
        float actual_volume = mute_audio_ ? 0.0f : (master_volume_ / 100.0f);
        // SetAudioVolume(actual_volume);
    }

    void ResetToDefaults()
    {
        LoadDefaults();
        NotifyAllChanged();
    }

private:
    // 音频
    int master_volume_;
    int music_volume_;
    int sfx_volume_;
    int voice_volume_;
    bool mute_audio_;

    // 图形
    Rml::String graphics_quality_;
    int resolution_width_;
    int resolution_height_;
    bool fullscreen_;
    bool vsync_;
    bool show_fps_;

    // 游戏
    Rml::String difficulty_;
    Rml::String language_;
    bool auto_save_;

    // 按键
    Rml::String key_move_forward_;
    Rml::String key_move_backward_;
    Rml::String key_jump_;
};
```

### 5.2 设置界面

```xml
<rml>
<head>
    <link type="text/rcss" href="settings.rcss"/>
</head>
<body data-model="settings">
    <div class="settings-window">
        <h2>游戏设置</h2>

        <!-- 选项卡 -->
        <div class="tabs">
            <button class="tab active" data-tab="audio">音频</button>
            <button class="tab" data-tab="graphics">图形</button>
            <button class="tab" data-tab="gameplay">游戏</button>
            <button class="tab" data-tab="controls">控制</button>
        </div>

        <!-- 音频设置 -->
        <div class="tab-content" id="audio">
            <div class="setting-row">
                <label>主音量</label>
                <input type="range" bind="master_volume" min="0" max="100"/>
                <span class="value">{{ master_volume }}%</span>
            </div>
            <div class="setting-row">
                <label>音乐音量</label>
                <input type="range" bind="music_volume" min="0" max="100"/>
                <span class="value">{{ music_volume }}%</span>
            </div>
            <div class="setting-row">
                <label>音效音量</label>
                <input type="range" bind="sfx_volume" min="0" max="100"/>
                <span class="value">{{ sfx_volume }}%</span>
            </div>
            <div class="setting-row">
                <label>
                    <input type="checkbox" bind="mute_audio"/>
                    静音
                </label>
            </div>
        </div>

        <!-- 图形设置 -->
        <div class="tab-content" id="graphics">
            <div class="setting-row">
                <label>画质</label>
                <select bind="graphics_quality">
                    <option value="low">低</option>
                    <option value="medium">中</option>
                    <option value="high">高</option>
                    <option value="ultra">超高</option>
                </select>
            </div>
            <div class="setting-row">
                <label>分辨率</label>
                <select bind="resolution_width">
                    <option value="1280">1280</option>
                    <option value="1920">1920</option>
                    <option value="2560">2560</option>
                </select>
                x
                <select bind="resolution_height">
                    <option value="720">720</option>
                    <option value="1080">1080</option>
                    <option value="1440">1440</option>
                </select>
            </div>
            <div class="setting-row">
                <label>
                    <input type="checkbox" bind="fullscreen"/>
                    全屏模式
                </label>
            </div>
            <div class="setting-row">
                <label>
                    <input type="checkbox" bind="vsync"/>
                    垂直同步
                </label>
            </div>
            <div class="setting-row">
                <label>
                    <input type="checkbox" bind="show_fps"/>
                    显示 FPS
                </label>
            </div>
        </div>

        <!-- 游戏设置 -->
        <div class="tab-content" id="gameplay">
            <div class="setting-row">
                <label>难度</label>
                <select bind="difficulty">
                    <option value="easy">简单</option>
                    <option value="normal">普通</option>
                    <option value="hard">困难</option>
                    <option value="nightmare">噩梦</option>
                </select>
            </div>
            <div class="setting-row">
                <label>语言</label>
                <select bind="language">
                    <option value="zh-CN">简体中文</option>
                    <option value="en-US">English</option>
                    <option value="ja-JP">日本語</option>
                </select>
            </div>
            <div class="setting-row">
                <label>
                    <input type="checkbox" bind="auto_save"/>
                    自动保存
                </label>
            </div>
        </div>

        <!-- 控制设置 -->
        <div class="tab-content" id="controls">
            <div class="setting-row">
                <label>前进</label>
                <input type="text" bind="key_move_forward" class="keybind"/>
            </div>
            <div class="setting-row">
                <label>后退</label>
                <input type="text" bind="key_move_backward" class="keybind"/>
            </div>
            <div class="setting-row">
                <label>跳跃</label>
                <input type="text" bind="key_jump" class="keybind"/>
            </div>
        </div>

        <!-- 底部按钮 -->
        <div class="settings-footer">
            <button onclick="Apply()">应用</button>
            <button onclick="Save()">保存</button>
            <button onclick="ResetToDefaults()">重置</button>
            <button onclick="Close()">关闭</button>
        </div>
    </div>
</body>
</rml>
```

---

## 六、实践练习

### 练习 1：创建角色创建表单

实现一个完整的角色创建界面：
- 姓名、职业、性别、外观选择
- 实时预览角色
- 名称验证（不能重复）
- 属性点分配

### 练习 2：制作邮件撰写界面

创建一个邮件系统：
- 收件人、主题、正文输入
- 附件选择
- 草稿自动保存
- 发送前验证

### 练习 3：实现聊天设置

创建聊天配置界面：
- 字体大小滑块
- 聊天频道开关
- 屏蔽关键词管理
- 聊天窗口透明度

---

## 📝 检查清单

- [ ] 理解双向绑定的工作原理
- [ ] 能够为表单控件实现双向绑定
- [ ] 掌握输入验证的实现方法
- [ ] 能够创建自定义双向绑定组件
- [ ] 理解如何处理复杂的表单场景

---

下一节：[DOM 操作](06-dom-manipulation.md) - 学习如何动态创建、修改和删除 DOM 元素。
