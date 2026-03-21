# 2.3 內置控件

RmlUi 提供了豐富的內置控件，本節將詳細介绍每个控件的用法和样式定制。

---

## 一、按钮（Button）

### 基本用法

```xml
<button>點擊我</button>
<button disabled>禁用按钮</button>
<button type="submit">提交</button>
```

### 样式定制

```css
button {
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    background: linear-gradient(to bottom, #3498db, #2980b9);
    color: white;
    font-size: 16px;
    cursor: pointer;
}

button:hover {
    background: linear-gradient(to bottom, #48a9e8, #3498db);
}

button:active {
    transform: translateY(1px);
}

button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}
```

---

## 二、输入框（Input）

### 类型

```xml
<!-- 文本输入 -->
<input type="text" id="name" value="默認值"/>

<!-- 密碼输入 -->
<input type="password" id="password"/>

<!-- 數字输入 -->
<input type="number" id="age" min="0" max="150"/>

<!-- 複選框 -->
<input type="checkbox" id="agree" checked/>

<!-- 單選框 -->
<input type="radio" name="gender" value="male"/> 男
<input type="radio" name="gender" value="female"/> 女

<!-- 滑塊 -->
<input type="range" id="volume" min="0" max="100" value="50"/>
```

### 样式定制

```css
/* 文本/密碼输入框 */
input[type="text"],
input[type="password"] {
    padding: 8px 12px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 14px;
    width: 200px;
}

input[type="text"]:focus,
input[type="password"]:focus {
    border-color: #3498db;
    outline: none;
    box-shadow: 0 0 5px rgba(52, 152, 219, 0.3);
}

/* 複選框 */
input[type="checkbox"] {
    width: 18px;
    height: 18px;
    cursor: pointer;
}

/* 單選框 */
input[type="radio"] {
    width: 18px;
    height: 18px;
    cursor: pointer;
}

/* 滑塊 */
input[type="range"] {
    width: 200px;
    height: 20px;
}
```

---

## 三、文本域（Textarea）

```xml
<textarea id="description" rows="5" cols="40">
默認内容
</textarea>
```

```css
textarea {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-family: inherit;
    font-size: 14px;
    resize: vertical;  /* 允許垂直調整 */
}

textarea:focus {
    border-color: #3498db;
    outline: none;
}
```

---

## 四、下拉選擇（Select）

```xml
<select id="character">
    <option value="">請選擇...</option>
    <option value="warrior">戰士</option>
    <option value="mage">法師</option>
    <option value="archer">弓箭手</option>
    <option value="healer">治療者</option>
</select>
```

```css
select {
    padding: 8px 12px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 14px;
    background: white;
    cursor: pointer;
}

select:focus {
    border-color: #3498db;
    outline: none;
}

select option {
    padding: 8px;
}
```

---

## 五、進度條（Progress）

```xml
<!-- 确定进度 -->
<progress id="hp" value="75" max="100"/>

<!-- 不确定进度（动画） -->
<progress id="loading" class="indeterminate"/>
```

```css
progress {
    width: 200px;
    height: 20px;
    border: 1px solid #ccc;
    border-radius: 3px;
    background: #f0f0f0;
}

/* 進度填充條需要通过自定义元素或裝飾器实现 */
.progress-bar {
    position: relative;
    width: 200px;
    height: 20px;
    background: #e0e0e0;
    border-radius: 3px;
    overflow: hidden;
}

.progress-fill {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 75%;  /* 动态设置 */
    background: linear-gradient(to right, #2ecc71, #27ae60);
}

/* 不确定進度动画 */
.progress-indeterminate {
    animation: indeterminate 1.5s infinite;
}

@keyframes indeterminate {
    0% { left: -25%; width: 25%; }
    50% { left: 50%; width: 25%; }
    100% { left: 100%; width: 25%; }
}
```

---

## 六、标签页（TabSet）

```xml
<tabset>
    <tabs>
        <tab id="tab-1">属性</tab>
        <tab id="tab-2">技能</tab>
        <tab id="tab-3">背包</tab>
    </tabs>
    <tabcontents>
        <tabcontent id="tab-1">
            <h3>角色属性</h3>
            <p>力量：100</p>
            <p>敏捷：80</p>
        </tabcontent>
        <tabcontent id="tab-2">
            <h3>技能列表</h3>
            <ul>
                <li>火球術</li>
                <li>冰風暴</li>
            </ul>
        </tabcontent>
        <tabcontent id="tab-3">
            <h3>背包物品</h3>
            <div class="inventory-grid">
                <!-- 物品槽 -->
            </div>
        </tabcontent>
    </tabcontents>
</tabset>
```

```css
tabset {
    display: flex;
    flex-direction: column;
}

tabs {
    display: flex;
    border-bottom: 2px solid #ddd;
}

tab {
    padding: 10px 20px;
    cursor: pointer;
    border: 1px solid transparent;
    border-bottom: none;
    margin-bottom: -2px;
}

tab:hover {
    background: #f5f5f5;
}

tab.active {
    background: #fff;
    border-color: #ddd;
    border-bottom: 2px solid #fff;
    font-weight: bold;
}

tabcontents {
    flex: 1;
}

tabcontent {
    display: none;
    padding: 20px;
}

tabcontent.active {
    display: block;
}
```

---

## 七、表單（Form）

```xml
<form id="login-form">
    <div class="form-group">
        <label for="username">用户名</label>
        <input type="text" id="username" required/>
    </div>
    <div class="form-group">
        <label for="password">密碼</label>
        <input type="password" id="password" required/>
    </div>
    <div class="form-group">
        <input type="checkbox" id="remember"/>
        <label for="remember">記住我</label>
    </div>
    <div class="form-actions">
        <button type="submit">登錄</button>
        <button type="reset">重置</button>
    </div>
</form>
```

```css
form {
    display: flex;
    flex-direction: column;
    gap: 15px;
    max-width: 400px;
}

.form-group {
    display: flex;
    flex-direction: column;
    gap: 5px;
}

label {
    font-weight: bold;
    color: #555;
}

.form-actions {
    display: flex;
    gap: 10px;
    margin-top: 10px;
}
```

---

## 八、滑塊詳細用法

```xml
<!-- 基本滑塊 -->
<input type="range" id="brightness" min="0" max="100" value="50"/>

<!-- 帶步長 -->
<input type="range" id="volume" min="0" max="100" step="5" value="75"/>

<!-- 垂直滑塊（需要自定义样式） -->
<input type="range" class="vertical" min="0" max="100" value="50"/>
```

```css
input[type="range"] {
    -webkit-appearance: none;
    width: 200px;
    height: 6px;
    background: #ddd;
    border-radius: 3px;
    outline: none;
}

/* 滑塊手柄 */
input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 18px;
    height: 18px;
    background: #3498db;
    border-radius: 50%;
    cursor: pointer;
}

input[type="range"]::-moz-range-thumb {
    width: 18px;
    height: 18px;
    background: #3498db;
    border-radius: 50%;
    cursor: pointer;
    border: none;
}

/* 垂直滑塊 */
input[type="range"].vertical {
    writing-mode: bt-lr;
    -webkit-appearance: slider-vertical;
    height: 200px;
}
```

---

## 九、實戰示例：设置面板

```xml
<rml>
<head>
    <title>游戏设置</title>
    <link type="text/rcss" href="settings.rcss"/>
</head>
<body>
    <div class="settings-panel">
        <h1>游戏设置</h1>

        <tabset>
            <tabs>
                <tab id="tab-video">視頻</tab>
                <tab id="tab-audio">音頻</tab>
                <tab id="tab-controls">控制</tab>
            </tabs>
            <tabcontents>
                <tabcontent id="tab-video">
                    <div class="setting-row">
                        <label>分辨率</label>
                        <select id="resolution">
                            <option value="1920x1080">1920x1080</option>
                            <option value="1600x900">1600x900</option>
                            <option value="1280x720">1280x720</option>
                        </select>
                    </div>
                    <div class="setting-row">
                        <label>全屏</label>
                        <input type="checkbox" id="fullscreen"/>
                    </div>
                    <div class="setting-row">
                        <label>垂直同步</label>
                        <input type="checkbox" id="vsync"/>
                    </div>
                    <div class="setting-row">
                        <label>图文質量</label>
                        <select id="quality">
                            <option value="low">低</option>
                            <option value="medium">中</option>
                            <option value="high">高</option>
                            <option value="ultra">超高</option>
                        </select>
                    </div>
                </tabcontent>

                <tabcontent id="tab-audio">
                    <div class="setting-row">
                        <label>主音量</label>
                        <input type="range" id="master-volume" min="0" max="100" value="80"/>
                        <span id="master-value">80%</span>
                    </div>
                    <div class="setting-row">
                        <label>音樂音量</label>
                        <input type="range" id="music-volume" min="0" max="100" value="60"/>
                    </div>
                    <div class="setting-row">
                        <label>音效音量</label>
                        <input type="range" id="sfx-volume" min="0" max="100" value="70"/>
                    </div>
                </tabcontent>

                <tabcontent id="tab-controls">
                    <div class="key-binding">
                        <label>前進</label>
                        <button class="key-btn" data-action="move_forward">W</button>
                    </div>
                    <div class="key-binding">
                        <label>後退</label>
                        <button class="key-btn" data-action="move_backward">S</button>
                    </div>
                    <div class="key-binding">
                        <label>左移</label>
                        <button class="key-btn" data-action="move_left">A</button>
                    </div>
                    <div class="key-binding">
                        <label>右移</label>
                        <button class="key-btn" data-action="move_right">D</button>
                    </div>
                </tabcontent>
            </tabcontents>
        </tabset>

        <div class="actions">
            <button id="btn-save" class="primary">保存</button>
            <button id="btn-cancel">取消</button>
        </div>
    </div>
</body>
</rml>
```

---

## 十、實踐练习

### 练习 1：创建登錄表單

包含用户名、密碼输入框、記住我複選框、登錄按钮

### 练习 2：创建角色创建界面

使用表单控件创建角色创建界面：
- 角色名称输入
- 性别选择（单选）
- 职业选择（下拉）
- 外观调整（滑块）

### 练习 3：创建库存管理界面

使用标签页组织：
- 装备栏
- 消耗品
- 任務物品

---

## 📝 檢查清单

- [ ] 掌握所有內置控件的用法
- [ ] 能够自定义控件样式
- [ ] 理解表單布局技巧
- [ ] 能够创建复杂的设置界面
