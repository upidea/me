## 看一下类图

### 引擎基础模块类图
```plantuml
@startuml

set namespaceSeparator none
' page 2x2
' skinparam pageMargin 10
' skinparam pageExternalColor green
' skinparam pageBorderColor green

class engine::core::GameApp  #header:palegreen;line:palegreen
{
    - SDL_Window* window_ = nullptr;
    - SDL_Renderer* sdl_renderer_ = nullptr;
    - bool is_running_ = false;
    - {field} std::function<void(engine::scene::SceneManager&)> scene_setup_func_;
    ..
    - std::unique_ptr<engine::core::Time> time_;
    - std::unique_ptr<engine::resource::ResourceManager> resource_manager_;
    - std::unique_ptr<engine::render::Renderer> renderer_;
    - std::unique_ptr<engine::render::Camera> camera_;
    - std::unique_ptr<engine::render::TextRenderer> text_renderer_;
    - std::unique_ptr<engine::core::Config> config_;
    - std::unique_ptr<engine::input::InputManager> input_manager_;
    - std::unique_ptr<engine::core::Context> context_;
    - std::unique_ptr<engine::scene::SceneManager> scene_manager_;
    - std::unique_ptr<engine::physics::PhysicsEngine> physics_engine_;
    - std::unique_ptr<engine::audio::AudioPlayer> audio_player_;
    - std::unique_ptr<engine::core::GameState> game_state_;
    --
    + void run();
    + void oneIter();
    + void registerSceneSetup(std::function<void(engine::scene::SceneManager&)> func);
}

class engine::core::GameState
{

}

class engine::audio::AudioPlayer
{

}

class engine::physics::PhysicsEngine
{

}

class engine::scene::SceneManager
{

}

class engine::core::Context
{

}

class engine::core::Time
{

}

class engine::resource::ResourceManager
{
    - std::unique_ptr<TextureManager> texture_manager_;
    - std::unique_ptr<AudioManager> audio_manager_;
    - std::unique_ptr<FontManager> font_manager_;

}

class engine::render::Renderer
{
    - SDL_Renderer* renderer_ = nullptr;
    - engine::resource::ResourceManager* resource_manager_ = nullptr;
    + Renderer(SDL_Renderer* sdl_renderer, engine::resource::ResourceManager* resource_manager);
}

class engine::render::Camera
{
    - glm::vec2 viewport_size_;
    - glm::vec2 position_;
    - std::optional<engine::utils::Rect> limit_bounds_;
    - float smooth_speed_ = 5.0f;
    - engine::component::TransformComponent* target_ = nullptr;
    + void update(float delta_time);
    + void move(const glm::vec2& offset);


}

class engine::render::TextRenderer
{

}

class engine::core::Config
{
    + bool loadFromFile(std::string_view filepath);
    + bool saveToFile(std::string_view filepath);
}

class engine::input::InputManager
{
    - SDL_Renderer* sdl_renderer_;
    - std::unordered_map<std::string, std::vector<std::string>> actions_to_keyname_map_;
    - std::unordered_map<std::variant<SDL_Scancode, Uint32>, std::vector<std::string>> input_to_actions_map_;

    - std::unordered_map<std::string, ActionState> action_states_;
    - bool should_quit_ = false;
    - glm::vec2 mouse_position_;
    {field} ...

    + void update();
    + bool shouldQuit() const;
    + glm::vec2 getMousePosition() const;
    + glm::vec2 getLogicalMousePosition() const;
    {method} ...
}
' 注释属性或方法，失败(大约是不能与namespace一起用)！
' note left of InputManager::"sdl_renderer_"
'     用于获取鼠标位置
' end note
' note “用于获取鼠标位置“ as N1
' N1 .. engine::input::InputManager:sdl_renderer_


engine::core::GameApp *--> engine::core::Time
engine::core::GameApp *--> engine::resource::ResourceManager
engine::core::GameApp *--> engine::render::Renderer
engine::core::GameApp *--> engine::render::Camera
' engine::core::GameApp *--> engine::render::TextRenderer
engine::core::GameApp *--> engine::core::Config
engine::core::GameApp *--> engine::input::InputManager
' engine::core::GameApp *--> engine::core::Context
' engine::core::GameApp *--> engine::scene::SceneManager
' engine::core::GameApp *--> engine::physics::PhysicsEngine
' engine::core::GameApp *--> engine::audio::AudioPlayer
' engine::core::GameApp *--> engine::core::GameState

engine::render::Renderer *--> engine::resource::ResourceManager
' engine::render::Renderer --> engine::render::Camera

class engine::resource::TextureManager
{
    - std::unordered_map textures_;
    - SDL_Texture* loadTexture(std::string_view file_path);
    - SDL_Texture* getTexture(std::string_view file_path);
    - glm::vec2 getTextureSize(std::string_view file_path);
    - void unloadTexture(std::string_view file_path);
    - void clearTextures();

}
class engine::resource::AudioManager
{
    - std::unordered_map sounds_;
    - Mix_Chunk* loadSound(std::string_view file_path);
    - Mix_Chunk* getSound(std::string_view file_path);
    - void unloadSound(std::string_view file_path);
    - void clearSounds();

}
class engine::resource::FontManager
{
    - std::unordered_map fonts_;
    - TTF_Font* loadFont(std::string_view file_path, int point_size);
    - TTF_Font* getFont(std::string_view file_path, int point_size);
    - void unloadFont(std::string_view file_path, int point_size);
    - void clearFonts();
}

engine::resource::ResourceManager *--> engine::resource::TextureManager
engine::resource::ResourceManager *--> engine::resource::AudioManager
engine::resource::ResourceManager *--> engine::resource::FontManager

@enduml
```
<!-- diagram id="gameapp" caption: "引擎基础模块类图" -->

### 场景、对象与组件类图
- GameObject 上每种 Component(含子类)有且仅有一个
- Scene 内有一个 GameObject 容器，一个场景内有多个GameObject

```plantuml
@startuml

class engine::component::Component
{
    # engine::object::GameObject* owner_ = nullptr;
    + void setOwner(engine::object::GameObject* owner);
    + engine::object::GameObject* getOwner() const;
    # virtual void init();
    # virtual void handleInput(engine::core::Context&);
    # virtual void update(float, engine::core::Context&);
    # virtual void render(engine::core::Context&);
    # virtual void clean();
}

class engine::component::TransformComponent
{
    - glm::vec2 position_ = {0.0f, 0.0f};
    - glm::vec2 scale_ = {1.0f, 1.0f};
    - float rotation_ = 0.0f;
    + TransformComponent(position, scale, rotation);
}

class engine::render::Sprite
{
    - std::string texture_id_;
    - std::optional<SDL_FRect> source_rect_;
    - bool is_flipped_ = false;
}
note right of engine::render::Sprite: 表示要绘制的视觉精灵的数据。

class engine::component::SpriteComponent
{
    - engine::render::Sprite sprite_;
    - engine::utils::Alignment alignment_;
    - glm::vec2 sprite_size_ = {0.0f, 0.0f};
    - glm::vec2 offset_ = {0.0f, 0.0f};
    - bool is_hidden_ = false;
    ' - engine::resource::ResourceManager* resource_manager_;
    ' - TransformComponent* transform_ = nullptr;

}

engine::render::Sprite <--* engine::component::SpriteComponent

class engine::component::TileLayerComponent
{

}

class engine::component::PhysicsComponent
{

}

class engine::component::ParallaxComponent
{

}

class engine::component::HealthComponent
{

}

class engine::component::ColliderComponent
{

}

class engine::component::AudioComponent
{

}

class engine::component::AnimationComponent
{

}


engine::component::TransformComponent --|> engine::component::Component
engine::component::SpriteComponent --|> engine::component::Component
engine::component::TileLayerComponent --|> engine::component::Component
engine::component::PhysicsComponent --|> engine::component::Component
engine::component::ParallaxComponent --|> engine::component::Component
engine::component::HealthComponent --|> engine::component::Component
engine::component::ColliderComponent --|> engine::component::Component
engine::component::AudioComponent --|> engine::component::Component
engine::component::AnimationComponent --|> engine::component::Component


class engine::object::GameObject #header:palegreen;line:palegreen
{
    - std::string name_;
    - std::string tag_;
    - {field} std::unordered_map<std::type_index, std::unique_ptr<engine::component::Component>> components_;
    - bool need_remove_ = false;
    __
    + T* addComponent(Args&&... args);
    + T* getComponent() const;
    + bool hasComponent() const;
    + void removeComponent();
    ..
    + void update(float delta_time, engine::core::Context& context);
    + void render(engine::core::Context& context);
    + void clean();
    + void handleInput(engine::core::Context& context);
}

engine::component::Component <--* engine::object::GameObject


class engine::scene::Scene {
    # std::string scene_name_;
    # engine::core::Context& context_;
    # engine::scene::SceneManager& scene_manager_;
    # {field} std::unique_ptr<engine::ui::UIManager> ui_manager_;
    # bool is_initialized_ = false;
    # std::vector<std::unique_ptr<engine::object::GameObject>> game_objects_;
    # std::vector<std::unique_ptr<engine::object::GameObject>> pending_additions_;
    __
    + Scene(std::string_view name, engine::core::Context& context, engine::scene::SceneManager& scene_manager);
    + virtual void addGameObject(std::unique_ptr<engine::object::GameObject>&& game_object);
    + virtual void safeAddGameObject(std::unique_ptr<engine::object::GameObject>&& game_object); 
    + virtual void removeGameObject(engine::object::GameObject* game_object_ptr);
    + virtual void safeRemoveGameObject(engine::object::GameObject* game_object_ptr);
    ..
    + virtual void init();                        ///< @brief 初始化场景。
    + virtual void update(float delta_time);      ///< @brief 更新场景。
    + virtual void render();                      ///< @brief 渲染场景。
    + virtual void handleInput();                 ///< @brief 处理输入。
    + virtual void clean();                       ///< @brief 清理场景。
}

class game::scene::EndScene
{
    + void init() override;
    + void update(float delta_time) override;
    + void render() override;
    + void handleInput() override;
    + void clean() override;

}

class game::scene::GameScene
{
  
}

class game::scene::TitleScene
{
  
}


engine::object::GameObject <--* engine::scene::Scene
engine::scene::Scene <|-- game::scene::EndScene
engine::scene::Scene <|-- game::scene::GameScene
engine::scene::Scene <|-- game::scene::TitleScene


class engine::scene::SceneManager
{
    - engine::core::Context& context_;                        ///< @brief 引擎上下文引用
    - std::vector<std::unique_ptr<Scene>> scene_stack_;       ///< @brief 场景栈
    - enum class PendingAction { None, Push, Pop, Replace };  ///< @brief 待处理的动作
    - PendingAction pending_action_ = PendingAction::None;    ///< @brief 待处理的动作
    - std::unique_ptr<Scene> pending_scene_;                  ///< @brief 待处理场景

    + explicit SceneManager(engine::core::Context& context);
    + void requestPushScene(std::unique_ptr<Scene>&& scene);      ///< @brief 请求压入一个新场景。
    + void requestPopScene();                                     ///< @brief 请求弹出当前场景。
    + void requestReplaceScene(std::unique_ptr<Scene>&& scene);   ///< @brief 请求替换当前场景。
}
engine::scene::Scene <--* engine::scene::SceneManager

@enduml
```
<!-- diagram id="scene" caption: "场景、对象与组件类图" -->
