## 
```mermaid
flowchart TD
    A[开始] --> B{文件类型判断}
    B -->|TMX XML| C[XML解析器初始化]
```

```mermaid
flowchart TD
    A["开始：加载 TMX 文件"] --> B{"文件类型判断"}
    B -->|"TMX (XML)"| C["XML 解析器初始化 (pugixml 底层)"]
    C --> D["解析地图基础属性<br/>width, height, tilewidth, tileheight"]
    D --> E["解析图块集(tileset)定义"]
    E --> F{"是否有外部图块集？"}
    F -->|是| G["加载外部 TSX 文件"]
    F -->|否| H["解析内联图块集"]
    G --> I["合并图块集属性"]
    H --> I
    I --> J["解析地图图层(layer)"]
    J --> K["解析图层数据<br/>CSV / Base64 / XML"]
    K --> L{"是否有对象层？"}
    L -->|是| M["解析对象层(objectgroup)"]
    L -->|否| N{"是否还有其他图层？"}
    M --> N
    N -->|是| J
    N -->|否| O["构建内存中的地图结构"]
    O --> P["结束：TMX 解析完成"]
```
```mermaid
flowchart TD
    A["开始：加载 TMX 文件"] --> B{"文件类型判断"}
    B -->|"TMX (XML)"| C["XML 解析器初始化<br/>(pugixml 底层)"]
    B -->|"TSX (图集)"| D["图集文件解析分支<br/>(单独解析 tileset)"]
    C --> E["根节点解析<br/>(map 节点)"]
    E --> F["解析地图元数据<br/>(尺寸、方向、渲染顺序、背景色等)"]
    F --> G["解析图层配置<br/>(layer/objectgroup/image layer)"]
    G --> H{"图层类型判断"}
    
    %% 不同图层分支
    H -->|"Tile Layer (瓦片层)"| I["解析瓦片数据<br/>(gid 数组、压缩格式解压)"]
    H -->|"Object Group (对象层)"| J["解析对象数据<br/>(矩形、椭圆、多边形、属性)"]
    H -->|"Image Layer (图像层)"| K["解析图像数据<br/>(路径、透明度、偏移)"]
    H -->|"Group (图层组)"| L["递归解析组内子图层"]
    
    %% 公共流程
    I & J & K & L --> M["解析 Tileset 引用<br/>(内部/外部 TSX)"]
    D --> M
    M --> N["解析 Tileset 元数据<br/>(瓦片尺寸、间距、偏移、属性)"]
    N --> O["解析 Tile 自定义属性<br/>(动画、碰撞盒、自定义参数)"]
    O --> P["解析地图全局属性<br/>(自定义键值对)"]
    P --> Q["数据结构化封装<br/>(Map/Layer/Tileset/Object 等类实例化)"]
    Q --> R["输出解析结果<br/>(可访问的地图数据对象)"]
    R --> S["结束"]
    
    %% 异常分支
    C --> X["XML 解析失败"]
    I --> Y["瓦片数据解压失败"]
    M --> Z["Tileset 文件加载失败"]
    X & Y & Z --> AA["返回空数据/错误码"]
    AA --> S
```

```mermaid
classDiagram
    direction TB
    
    %% 核心核心类（对外暴露）
    class Map {
        -Size mMapSize
        -Size mTileSize
        -Orientation mOrientation
        -RenderOrder mRenderOrder
        +getLayers() : const std::vector<Layer*>&
        +getTilesets() : const std::vector<Tileset>&
        +load(const std::string& filename) : bool
        +save(const std::string& filename) : bool
    }
    
    %% 图层基类
    class Layer {
        <<abstract>>
        -std::string mName
        -float mOpacity
        -bool mVisible
        -Vector2f mOffset
        +getType() : Type
        +getProperties() : const PropertyCollection&
    }
    
    %% 具体图层子类
    class TileLayer {
        -std::vector<tmx::Tile> mTiles
        -Size mLayerSize
        -Compression mCompression
        +getTiles() : const std::vector<Tile>&
        +getTileGID(int x, int y) : uint32_t
    }
    
    class ObjectGroup {
        -std::vector<Object> mObjects
        -DrawOrder mDrawOrder
        +getObjects() : const std::vector<Object>&
        +getObjectByName(const std::string& name) : Object*
    }
    
    class ImageLayer {
        -Image mImage
        +getImage() : const Image&
    }
    
    class GroupLayer {
        -std::vector<Layer*> mSubLayers
        +getLayers() : const std::vector<Layer*>&
    }
    
    %% 瓦片集相关
    class Tileset {
        -std::string mName
        -Size mTileSize
        -int mSpacing
        -int mMargin
        -Image mImage
        -std::vector<TileInfo> mTileInfos
        +getTileInfo(uint32_t gid) : const TileInfo*
        +getImagePath() : const std::string&
    }
    
    class TileInfo {
        -std::vector<AnimationFrame> mAnimationFrames
        -PropertyCollection mProperties
        -Rect mCollisionRect
        +hasAnimation() : bool
        +getAnimationFrames() : const std::vector<AnimationFrame>&
    }
    
    %% 基础数据结构
    class Object {
        -std::string mName
        -std::string mType
        -Vector2f mPosition
        -Size mSize
        -ObjectType mType
        -std::vector<Vector2f> mPoints // 多边形/折线顶点
        +getProperties() : const PropertyCollection&
    }
    
    class PropertyCollection {
        -std::unordered_map<std::string, Property> mProperties
        +getProperty(const std::string& name) : Property
        +hasProperty(const std::string& name) : bool
    }
    
    class Property {
        -Variant mValue // 支持string/int/float/bool/color/file
        -Type mType
        +getValue<T>() : T
    }
    
    class Image {
        -std::string mPath
        -Vector2f mTransparentColour
        -bool mUseTransparency
        +getPath() : const std::string&
    }
    
    %% 依赖关系
    Map --> Layer : 包含多个
    Map --> Tileset : 引用多个
    Layer <|-- TileLayer : 继承
    Layer <|-- ObjectGroup : 继承
    Layer <|-- ImageLayer : 继承
    Layer <|-- GroupLayer : 继承
    GroupLayer --> Layer : 包含多个子图层
    TileLayer --> Tile : 包含瓦片GID数据
    ObjectGroup --> Object : 包含多个对象
    Tileset --> Image : 引用图集图像
    Tileset --> TileInfo : 包含瓦片扩展信息
    TileInfo --> AnimationFrame : 包含动画帧
    Layer --> PropertyCollection : 拥有自定义属性
    Object --> PropertyCollection : 拥有自定义属性
    Tileset --> PropertyCollection : 拥有自定义属性
    Map --> PropertyCollection : 拥有全局属性
```

```c++
std::vector<std::unique_ptr<Texture>> textures;
std::vector<std::unique_ptr<MapLayer>> renderLayers;

//load the tile map
tmx::Map map;
if (map.load("assets/demo.tmx"))
{
    //load the textures as they're shared between layers
    const auto& tileSets = map.getTilesets();
    assert(!tileSets.empty());
    for (const auto& ts : tileSets)
    {
        textures.emplace_back(std::make_unique<Texture>());
        if (!textures.back()->loadFromFile(ts.getImagePath(), renderer))
        {
            std::cerr << "Failed opening " << ts.getImagePath() << "\n";
        }
    }

    //load the layers
    const auto& mapLayers = map.getLayers();
    for (auto i = 0u; i < mapLayers.size(); ++i)
    {
        if (mapLayers[i]->getType() == tmx::Layer::Type::Tile)
        {
            renderLayers.emplace_back(std::make_unique<MapLayer>());
            renderLayers.back()->create(map, i, textures); //just cos we're using C++14
        }
    }
}


//enter loop...
SDL_SetRenderDrawColor(renderer, 100, 149, 237, 255);

bool running = true;
while (running)
{
    //pump events
    SDL_Event evt;
    while (SDL_PollEvent(&evt))
    {
        if (evt.type == SDL_QUIT)
        {
            running = false;
        }
        else if (evt.type == SDL_KEYDOWN)
        {
            switch (evt.key.keysym.sym)
            {
            default: break;
            case SDLK_ESCAPE:
                running = false;
                break;
            }
        }
    }

    //clear/draw/display
    SDL_RenderClear(renderer);
    for (const auto& l : renderLayers)
    {
        l->draw(renderer);
    }
    SDL_RenderPresent(renderer);
}
```
