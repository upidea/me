# 4.6 粒子特效

粒子特效是创建动态视觉效果的强大工具，可以用于制作爆炸、火焰、雪花、星空等效果。本节将介绍如何使用 RmlUi 的动画系统创建简单的粒子效果。

---

## 一、粒子特效基础

### 1.1 什么是粒子特效

粒子特效是由大量小元素（粒子）组成的动态效果，每个粒子都有独立的位置、速度、颜色等属性。

### 1.2 粒子特效的应用场景

- 爆炸效果
- 火焰效果
- 雪花/雨滴效果
- 星空效果
- 魔法效果
- 点击反馈效果

### 1.3 实现方式

在 RmlUi 中，粒子特效可以通过以下方式实现：
- 使用 CSS 动画创建简单粒子
- 使用数据绑定动态生成粒子
- 使用 C++ 代码创建复杂粒子系统

---

## 二、使用 CSS 动画创建粒子

### 2.1 基本粒子

```xml
<rml>
<head>
    <style>
        .particle {
            position: absolute;
            width: 10px;
            height: 10px;
            background: #ff0000;
            border-radius: 50%;
        }

        @keyframes particle-move {
            0% {
                transform: translate(0, 0) scale(1);
                opacity: 1;
            }
            100% {
                transform: translate(100px, -100px) scale(0);
                opacity: 0;
            }
        }

        .particle.animate {
            animation: particle-move 1s ease-out forwards;
        }
    </style>
</head>
<body>
    <div class="particle"></div>
</body>
</rml>
```

### 2.2 爆炸效果

```xml
<rml>
<head>
    <style>
        .explosion-container {
            position: relative;
            width: 300px;
            height: 300px;
        }

        .particle {
            position: absolute;
            width: 8px;
            height: 8px;
            background: #ff6600;
            border-radius: 50%;
            opacity: 0;
        }

        @keyframes explode {
            0% {
                transform: translate(0, 0) scale(1);
                opacity: 1;
            }
            100% {
                transform: translate(var(--tx), var(--ty)) scale(0);
                opacity: 0;
            }
        }

        .particle.active {
            animation: explode 1s ease-out forwards;
        }
    </style>
</head>
<body>
    <div class="explosion-container" id="explosion">
        <!-- 粒子将通过 JavaScript 动态生成 -->
    </div>
    <button onclick="triggerExplosion()">爆炸</button>
</body>
</rml>
```

```cpp
// C++ 代码：生成爆炸粒子
void triggerExplosion() {
    auto container = document->GetElementById("explosion");
    
    // 清除旧粒子
    container->SetInnerRML("");
    
    // 生成 20 个粒子
    for (int i = 0; i < 20; i++) {
        // 计算随机方向
        float angle = (i / 20.0f) * 6.28318f;  // 0 到 2π
        float distance = 50.0f + (rand() % 50);  // 50-100px
        
        float tx = cos(angle) * distance;
        float ty = sin(angle) * distance;
        
        // 创建粒子
        String particle_rml = String(256, 
            "<div class='particle' style='--tx: %.0fpx; --ty: %.0fpx;'></div>",
            tx, ty);
        
        auto particle = document->CreateElement("div");
        particle->SetClass("particle", true);
        particle->SetProperty("--tx", String(32, "%.0fpx", tx));
        particle->SetProperty("--ty", String(32, "%.0fpx", ty));
        
        container->AppendChild(std::move(particle));
    }
    
    // 激活动画
    auto particles = container->GetElementsByTagName("div");
    for (size_t i = 0; i < particles.size(); i++) {
        particles[i]->SetClass("active", true);
    }
}
```

### 2.3 雪花效果

```xml
<rml>
<head>
    <style>
        .snow-container {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            overflow: hidden;
            pointer-events: none;
        }

        .snowflake {
            position: absolute;
            width: 10px;
            height: 10px;
            background: white;
            border-radius: 50%;
            opacity: 0.8;
        }

        @keyframes fall {
            0% {
                transform: translateY(-10px) translateX(0);
                opacity: 0;
            }
            10% {
                opacity: 0.8;
            }
            90% {
                opacity: 0.8;
            }
            100% {
                transform: translateY(600px) translateX(var(--drift));
                opacity: 0;
            }
        }

        .snowflake.animate {
            animation: fall var(--duration) linear infinite;
            animation-delay: var(--delay);
        }
    </style>
</head>
<body>
    <div class="snow-container" id="snow">
        <!-- 雪花将通过 JavaScript 动态生成 -->
    </div>
</body>
</rml>
```

```cpp
// C++ 代码：生成雪花
void createSnowflakes() {
    auto container = document->GetElementById("snow");
    
    // 生成 50 个雪花
    for (int i = 0; i < 50; i++) {
        // 随机属性
        float x = rand() % 100;  // 0-100%
        float duration = 5.0f + (rand() % 10) / 2.0f;  // 5-10s
        float delay = (rand() % 100) / 10.0f;  // 0-10s
        float drift = (rand() % 200) - 100.0f;  // -100 到 100px
        
        // 创建雪花
        auto snowflake = document->CreateElement("div");
        snowflake->SetClass("snowflake", true);
        snowflake->SetClass("animate", true);
        
        // 设置位置
        snowflake->SetProperty("left", String(32, "%.0f%%", x));
        
        // 设置动画变量
        snowflake->SetProperty("--duration", String(32, "%.1fs", duration));
        snowflake->SetProperty("--delay", String(32, "%.1fs", delay));
        snowflake->SetProperty("--drift", String(32, "%.0fpx", drift));
        
        container->AppendChild(std::move(snowflake));
    }
}
```

### 2.4 星空效果

```xml
<rml>
<head>
    <style>
        .star-container {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: #000011;
            overflow: hidden;
        }

        .star {
            position: absolute;
            width: 2px;
            height: 2px;
            background: white;
            border-radius: 50%;
        }

        @keyframes twinkle {
            0%, 100% {
                opacity: 0.3;
                transform: scale(1);
            }
            50% {
                opacity: 1;
                transform: scale(1.5);
            }
        }

        .star.animate {
            animation: twinkle var(--duration) ease-in-out infinite;
            animation-delay: var(--delay);
        }
    </style>
</head>
<body>
    <div class="star-container" id="stars">
        <!-- 星星将通过 JavaScript 动态生成 -->
    </div>
</body>
</rml>
```

```cpp
// C++ 代码：生成星星
void createStars() {
    auto container = document->GetElementById("stars");
    
    // 生成 100 个星星
    for (int i = 0; i < 100; i++) {
        // 随机属性
        float x = rand() % 100;  // 0-100%
        float y = rand() % 100;  // 0-100%
        float duration = 1.0f + (rand() % 30) / 10.0f;  // 1-4s
        float delay = (rand() % 100) / 10.0f;  // 0-10s
        
        // 创建星星
        auto star = document->CreateElement("div");
        star->SetClass("star", true);
        star->SetClass("animate", true);
        
        // 设置位置
        star->SetProperty("left", String(32, "%.0f%%", x));
        star->SetProperty("top", String(32, "%.0f%%", y));
        
        // 设置动画变量
        star->SetProperty("--duration", String(32, "%.1fs", duration));
        star->SetProperty("--delay", String(32, "%.1fs", delay));
        
        container->AppendChild(std::move(star));
    }
}
```

### 2.5 点击反馈效果

```xml
<rml>
<head>
    <style>
        .ripple-container {
            position: relative;
            overflow: hidden;
        }

        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.5);
            transform: scale(0);
            pointer-events: none;
        }

        @keyframes ripple-effect {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }

        .ripple.animate {
            animation: ripple-effect 0.6s ease-out forwards;
        }
    </style>
</head>
<body>
    <button class="ripple-container" onclick="createRipple(event)">
        点击我
    </button>
</body>
</rml>
```

```cpp
// C++ 代码：创建涟漪效果
void createRipple(Event& event) {
    auto button = event.GetCurrentElement();
    
    // 获取点击位置
    int x = event.GetParameter<int>("mouse_x", 0);
    int y = event.GetParameter<int>("mouse_y", 0);
    
    // 获取按钮位置
    Vector2f button_position = button->GetAbsoluteOffset();
    Vector2f button_size = button->GetBox().GetSize();
    
    // 计算相对位置
    float relative_x = x - button_position.x;
    float relative_y = y - button_position.y;
    
    // 创建涟漪
    auto ripple = document->CreateElement("div");
    ripple->SetClass("ripple", true);
    ripple->SetClass("animate", true);
    
    // 设置位置（中心在点击点）
    ripple->SetProperty("left", String(32, "%.0fpx", relative_x - 10));
    ripple->SetProperty("top", String(32, "%.0fpx", relative_y - 10));
    ripple->SetProperty("width", "20px");
    ripple->SetProperty("height", "20px");
    
    button->AppendChild(std::move(ripple));
    
    // 动画结束后移除涟漪
    // 注意：需要监听 animationend 事件
}
```

---

## 三、使用数据绑定创建粒子

### 3.1 基本示例

```xml
<rml>
<head>
    <style>
        .particle {
            position: absolute;
            width: 10px;
            height: 10px;
            background: #ff0000;
            border-radius: 50%;
            transition: all 0.3s ease-out;
        }
    </style>
</head>
<body data-model="particles">
    <div data-for="particle in particles">
        <div class="particle"
             data-style-left="particle.x + 'px'"
             data-style-top="particle.y + 'px'"
             data-style-background="particle.color"
             data-style-opacity="particle.opacity">
        </div>
    </div>
</body>
</rml>
```

```cpp
// C++ 代码：粒子系统
struct Particle {
    float x, y;
    float vx, vy;
    String color;
    float opacity;
};

class ParticleSystem {
private:
    std::vector<Particle> particles;
    Element* container;
    
public:
    ParticleSystem(Element* container) : container(container) {
        // 初始化粒子
        for (int i = 0; i < 50; i++) {
            Particle p;
            p.x = rand() % 300;
            p.y = rand() % 300;
            p.vx = (rand() % 100 - 50) / 50.0f;
            p.vy = (rand() % 100 - 50) / 50.0f;
            p.color = "#ff0000";
            p.opacity = 1.0f;
            particles.push_back(p);
        }
        
        // 更新数据绑定
        updateDataModel();
    }
    
    void update() {
        // 更新粒子位置
        for (auto& p : particles) {
            p.x += p.vx;
            p.y += p.vy;
            
            // 边界检查
            if (p.x < 0 || p.x > 300) p.vx *= -1;
            if (p.y < 0 || p.y > 300) p.vy *= -1;
        }
        
        // 更新数据绑定
        updateDataModel();
    }
    
private:
    void updateDataModel() {
        // 创建数据模型
        DataModelHandle model = container->GetDataModel();
        if (model) {
            // 更新粒子数组
            // 注意：需要根据实际的数据绑定 API 实现
        }
    }
};
```

---

## 四、高级粒子系统

### 4.1 复杂粒子系统架构

```cpp
// C++ 代码：粒子系统
class Particle {
public:
    Vector2f position;
    Vector2f velocity;
    Vector2f acceleration;
    float life;
    float max_life;
    Color colour;
    float size;
    
    void update(float dt) {
        velocity += acceleration * dt;
        position += velocity * dt;
        life -= dt;
    }
    
    bool isAlive() const {
        return life > 0;
    }
};

class ParticleEmitter {
private:
    std::vector<Particle> particles;
    Element* container;
    float emission_rate;
    float accumulated_time;
    
public:
    ParticleEmitter(Element* container, float rate) 
        : container(container), emission_rate(rate), accumulated_time(0) {}
    
    void emit(int count) {
        for (int i = 0; i < count; i++) {
            Particle p;
            // 初始化粒子属性
            p.position = Vector2f(150, 150);
            p.velocity = Vector2f(
                (rand() % 200 - 100) / 50.0f,
                (rand() % 200 - 100) / 50.0f
            );
            p.acceleration = Vector2f(0, 0.1f);  // 重力
            p.life = 2.0f;
            p.max_life = 2.0f;
            p.colour = Colour(255, 100, 50, 255);
            p.size = 10.0f;
            
            particles.push_back(p);
        }
    }
    
    void update(float dt) {
        // 更新所有粒子
        for (auto& p : particles) {
            p.update(dt);
        }
        
        // 移除死亡粒子
        particles.erase(
            std::remove_if(particles.begin(), particles.end(),
                [](const Particle& p) { return !p.isAlive(); }),
            particles.end()
        );
        
        // 更新显示
        updateDisplay();
    }
    
private:
    void updateDisplay() {
        // 清除旧粒子
        container->SetInnerRML("");
        
        // 创建新粒子元素
        for (const auto& p : particles) {
            float alpha = p.life / p.max_life;
            String color = String(32, "rgba(%d, %d, %d, %.2f)",
                p.colour.red, p.colour.green, p.colour.blue, alpha);
            
            String rml = String(256,
                "<div class='particle' style='left: %.0fpx; top: %.0fpx; "
                "width: %.0fpx; height: %.0fpx; background: %s; "
                "border-radius: 50%%;'></div>",
                p.position.x, p.position.y, p.size, p.size, color.CString());
            
            container->AppendChild(document->CreateElementFromRML(rml));
        }
    }
};
```

### 4.2 火焰效果

```cpp
class FireParticleEmitter : public ParticleEmitter {
public:
    FireParticleEmitter(Element* container) 
        : ParticleEmitter(container, 10.0f) {}
    
    void emit(int count) override {
        for (int i = 0; i < count; i++) {
            Particle p;
            p.position = Vector2f(
                150 + (rand() % 40 - 20),
                250
            );
            p.velocity = Vector2f(
                (rand() % 100 - 50) / 100.0f,
                -(rand() % 100 + 50) / 50.0f  // 向上移动
            );
            p.acceleration = Vector2f(0, -0.05f);
            p.life = 1.0f + (rand() % 100) / 200.0f;
            p.max_life = p.life;
            
            // 火焰颜色：从黄色到红色
            int red = 255;
            int green = 150 + (rand() % 105);
            int blue = 50;
            p.colour = Colour(red, green, blue, 255);
            p.size = 15.0f + (rand() % 10);
            
            particles.push_back(p);
        }
    }
};
```

### 4.3 爆炸效果

```cpp
class ExplosionParticleEmitter : public ParticleEmitter {
public:
    ExplosionParticleEmitter(Element* container) 
        : ParticleEmitter(container, 100.0f) {}
    
    void emit(int count) override {
        for (int i = 0; i < count; i++) {
            Particle p;
            
            // 爆炸中心
            p.position = Vector2f(150, 150);
            
            // 随机方向和速度
            float angle = (i / float(count)) * 6.28318f;
            float speed = 50.0f + (rand() % 100);
            
            p.velocity = Vector2f(
                cos(angle) * speed,
                sin(angle) * speed
            );
            p.acceleration = Vector2f(0, 0.2f);  // 重力
            p.life = 1.5f;
            p.max_life = p.life;
            
            // 爆炸颜色
            int color_index = rand() % 3;
            if (color_index == 0)
                p.colour = Colour(255, 100, 50, 255);  // 橙色
            else if (color_index == 1)
                p.colour = Colour(255, 255, 100, 255);  // 黄色
            else
                p.colour = Colour(255, 50, 50, 255);   // 红色
            
            p.size = 8.0f + (rand() % 8);
            
            particles.push_back(p);
        }
    }
};
```

---

## 五、性能优化

### 5.1 粒子数量控制

```cpp
class ParticleSystem {
private:
    static const int MAX_PARTICLES = 100;  // 最大粒子数
    
public:
    void emit(int count) {
        // 检查粒子数量限制
        int available = MAX_PARTICLES - particles.size();
        int to_emit = std::min(count, available);
        
        for (int i = 0; i < to_emit; i++) {
            // 创建粒子...
        }
    }
};
```

### 5.2 使用对象池

```cpp
class ParticlePool {
private:
    std::vector<Particle> pool;
    std::vector<bool> active;
    
public:
    ParticlePool(int size) {
        pool.resize(size);
        active.resize(size, false);
    }
    
    Particle* acquire() {
        for (size_t i = 0; i < pool.size(); i++) {
            if (!active[i]) {
                active[i] = true;
                return &pool[i];
            }
        }
        return nullptr;  // 池已满
    }
    
    void release(Particle* particle) {
        size_t index = particle - pool.data();
        if (index < pool.size()) {
            active[index] = false;
        }
    }
};
```

### 5.3 批量更新

```cpp
void ParticleSystem::update(float dt) {
    // 批量更新所有粒子
    for (auto& p : particles) {
        p.update(dt);
    }
    
    // 一次性移除所有死亡粒子
    auto new_end = std::remove_if(particles.begin(), particles.end(),
        [](const Particle& p) { return !p.isAlive(); });
    particles.erase(new_end, particles.end());
}
```

### 5.4 使用 CSS 变量优化

```css
/* 使用 CSS 变量减少样式计算 */
.particle {
    --x: 0px;
    --y: 0px;
    --size: 10px;
    --color: #ff0000;
    --opacity: 1;
    
    position: absolute;
    left: var(--x);
    top: var(--y);
    width: var(--size);
    height: var(--size);
    background: var(--color);
    opacity: var(--opacity);
    border-radius: 50%;
}
```

---

## 六、实际应用示例

### 6.1 成就解锁效果

```cpp
void createAchievementUnlockEffect(Element* container) {
    // 创建光环效果
    auto ring = document->CreateElement("div");
    ring->SetClass("achievement-ring", true);
    container->AppendChild(std::move(ring));
    
    // 创建爆炸粒子
    auto emitter = std::make_unique<ExplosionParticleEmitter>(container);
    emitter->emit(50);
    
    // 创建星星粒子
    for (int i = 0; i < 20; i++) {
        auto star = document->CreateElement("div");
        star->SetClass("star", true);
        
        float angle = (i / 20.0f) * 6.28318f;
        float distance = 80.0f;
        float x = 150 + cos(angle) * distance;
        float y = 150 + sin(angle) * distance;
        
        star->SetProperty("left", String(32, "%.0fpx", x));
        star->SetProperty("top", String(32, "%.0fpx", y));
        container->AppendChild(std::move(star));
    }
}
```

### 6.2 技能释放效果

```cpp
void createSkillEffect(Element* container, const String& skill_type) {
    if (skill_type == "fireball") {
        auto fire = std::make_unique<FireParticleEmitter>(container);
        fire->emit(30);
    }
    else if (skill_type == "ice") {
        // 创建冰晶效果
        for (int i = 0; i < 20; i++) {
            auto crystal = document->CreateElement("div");
            crystal->SetClass("ice-crystal", true);
            
            float x = 100 + (rand() % 100);
            float y = 100 + (rand() % 100);
            crystal->SetProperty("left", String(32, "%.0fpx", x));
            crystal->SetProperty("top", String(32, "%.0fpx", y));
            container->AppendChild(std::move(crystal));
        }
    }
}
```

---

## 七、常见问题

### 7.1 粒子性能问题

**问题**：粒子数量多时性能下降。

**解决方案**：
- 限制粒子数量
- 使用对象池
- 批量更新
- 使用 CSS 变量优化

### 7.2 粒子重叠问题

**问题**：粒子之间相互遮挡。

**解决方案**：
```css
.particle {
    z-index: var(--z-index);
}

/* 在 C++ 中设置 z-index */
particle->SetProperty("--z-index", String(16, "%d", zIndex));
```

### 7.3 粒子内存泄漏

**问题**：粒子未正确释放导致内存泄漏。

**解决方案**：
```cpp
// 确保正确移除粒子元素
void ParticleSystem::updateDisplay() {
    // 清除旧粒子
    while (container->GetFirstChild()) {
        container->RemoveChild(container->GetFirstChild());
    }
    
    // 创建新粒子...
}
```

---

## 八、实战练习

### 练习 1：创建烟花效果

使用粒子系统创建烟花效果：
- 爆炸时的火花
- 火花的重力效果
- 颜色渐变

### 练习 2：实现雨滴效果

创建下雨效果：
- 雨滴从上到下落下
- 雨滴有随机速度和大小
- 落地后有溅射效果

### 练习 3：设计魔法效果

创建魔法释放效果：
- 粒子沿曲线运动
- 粒子颜色变化
- 粒子尾迹效果

### 练习 4：制作点击特效

为按钮添加点击特效：
- 点击时产生涟漪
- 涟漪有颜色变化
- 支持多次点击

---

## 九、总结

粒子特效是创建动态视觉效果的重要工具。通过合理使用 CSS 动画、数据绑定和 C++ 代码，可以创建各种丰富的粒子效果。

**关键要点**：
- 简单效果使用 CSS 动画
- 复杂效果使用 C++ 粒子系统
- 注意性能优化
- 合理控制粒子数量

---

## 十、下一步

恭喜你完成了阶段四的学习！现在可以继续前往 [阶段五：高级定制与扩展](../05-advanced-custom/README.md)。

---

## 📝 检查清单

- [ ] 理解粒子特效的基本概念
- [ ] 能够使用 CSS 动画创建简单粒子
- [ ] 能够使用数据绑定创建动态粒子
- [ ] 理解粒子系统的架构
- [ ] 能够创建常见的粒子效果
- [ ] 理解粒子系统的性能优化
- [ ] 能够解决常见的粒子问题