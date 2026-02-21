---
date: 2026-2-21 15:18:00
---

## 基础
    关于 entt::entity 的补充， 它是 ```enum class entity:id_type{};```, 
有作用域枚举（scoped enum）的底层类型指定, 定义一个有作用域的枚举类型 entity，
使用 id_type 作为其底层存储类型。当做整数需要转换```entt::to_integral(some_entity)```（```static_cast<id_type>(e)```）。指定了底层类型的枚举可以前向声明。

```c++
// 组件是一些简单的结构体或类， 它们只包含数据
// 定义两个组件： 位置和速度
struct position {
    float x,y;
}
struct velocity {
    glm::vec2 v;
}
// 空结构当成组件
struct my_tag{};

// 1. 创建一个Registry
// Registry 是所有实体和组件的容器， 可以看作是你的“游戏世界“
entt::registry registry;

// 2. 创建实体
// 实体本身只是一个唯一的标识符(ID)
entt:entity play = registry.create(); 
entt:entity enemy = registry.create();

// 3. 向实体添加组件
// 使用 emplace<ComponentType>(entity, args...) 来添加并初始化一个组件
registry.emplace<position>(player, 10.f, 20.f);
registry.emplace<velocity>(player, {1.f, 0.f});

registry.emplace<position>(enemy, 100.f, 50.f);

// 4. 修改组件
// 获取组件的引用后， 可以直接修改它
auto& player_pos = registry.get<position>(player);
player_pos.x += 5.f;

// 5. 移除组件
// 使用 remove<ComponentType>(entity) 来移除一个组件
registry.destroy(enemy);

// 6. 检查一饿实体是否存在
if(registry.valid(player)) {
    ...
}
```

```c++
// 遍历更新通常在system中进行（ECS的system）
// 检索并保存轻量引用
entt:view view = registry.view<position, velocity>();
for (auto entity:view) {
    auto& pos = view.get<position>(entity);
    const auto& vel = view.get<velocity>(entity);
    pos.x += vel.x;
}
```

```c++
struct mytag2 {
    entt::hashed_string value;
}
// 使用using namespace 来简化哈希字符串字面量的使用
using namespace entt::literals;
// 1. 使用哈希字符串作为组件数据
// “player”_hs 在编译时就会被转换成一个整数，比较等速度更快
registry.emplace<mytag2>(player, "player"_hs);
// 2. 通过视图遍历并识别实体
...
if (entity_tag.value == "player"_hs)  // 直接比较哈希值， 数值比较
...
// 3. 哈希字符串的哈希值与原始值
auto player_tag = registry.get<mytag2>(player);
player_tag.value.value()    // 哈希值
player_tag.value.data()     // 对字符串的轻量引用

// 4.运行期转换为hashed_string
std::string config_name = "enemy";
auto enemy_hs = entt::hashed_string(config_name.c_str());
registry.emplace<mytag2>(enemy, enemy_hs); 
```

```c++
// 轻量引用， 容易丢失
struct mytag2 {
    entt::hashed_string value;
}

// 正确的做法： 确保字符串不被销毁， value用来储存， id用于比较/查询
struct mytag2 {
    entt::id_type id;           // 哈希值， hashed_string类型变量可以饮食转换为id_type
    entt::string value;
}

```

```c++
// 存入 (默认每种类型只能添加一个)
registry.ctx().emplace<bool>(true); 
registry.ctx().emplace_as<bool>("mybool"_hs, true);  // 带命名添加
// 取出
registry.ctx().get<bool>();
registry.ctx().get<bool>("mybool"_hs);               // 带命名获取
```


## Entt 信号系统

### 委托（entt::delegate）   // 类比 std::function<void()> callback_; 
```c++
// 1. 定义委托， 模板参数是函数签名
entt::delegate<int(int)> my_delegate;
// 2. 检查委托是否有效， 刚创建的委托是空的，不能调用
if(!my_delegate) {}
// 3. 连接全局函数
my_delegate.connect<&multiplay_by_two>(); // 一个函数的指针作为模板参数
// 4. 连接成员函数
// **同一时间只能绑定一个可调用对象, 第二次委托是替换了之前的绑定**
MyClass c;
my_delegate.connect<&c::multiply>(c);     // 对象作为参数传入
if(my_delegate) {}  // 连接后判断为真
// 5. 调用委托
int result = my_delegate(4);    
// 6. 重置委托：  不是 disconnect 哦
my_delegate.reset();
// 7. 使用构造函数直接链接, entt::connect_arg
entt::delegate<int(int)> another_delegate{entt::connect_arg<&c::multiply>, c};
```

### 信号（entt::sigh, entt:sink)
```c++
// 1. 定义一个信号
entt::sigh<void(int, const std::string&)> on_change;
// 2. 创建一个Sink来管理链接
entt::sink sink{on_change};
// 3. 连接， 全局函数/成员函数/无捕获的lambda
// ** 只能绑定固定签名的函数 ** 
sink.connect<&func1>();
sink.connect<&obj::func2>(obj);
sink.connect<[](int, const std::string& msg){
    ...
}>();
// 4. 发布信号: 多个连接的监听器都会被调用
on_change.publish(23, "Hello world!");
// 5. 断开链接
sink.disconnect<&obj::func2>(obj);

```

### 分发器 (entt::dispatcher)
- 有事件队列
- 多信号，多播
- 信号（事件/函数签名）统一为一个结构体
```c++
// 1。 创建事件分发器（dispatcher)
entt::dispatcher dispatcher{};
// 2. 连接
dispatcher.sink<event_struct1>().connect(...);
// 同一个事件可以绑定多个函数， ** 调用顺序是后进先调 **
dispatcher.sink<event_struct1>().connect(...);
// 3. 即时触发
dispatcher.trigger(event_struct1{...});
// 4. 事件队列
dispatcher.enqueue(event_struct1{...});
dispatcher.update(); // 触发
// 5. 断开链接: 带参数断开特定链接， 不带参数断开所有链接
dispatcher.sink<event_struct1>().disconnect(...);
dispatcher.sink<event_struct1>().disconnect()
```
