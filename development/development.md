---
---
# 开发笔记

## 使用submodle来管理依赖
后来发现过程非常繁琐， 且很容易出现奇怪的问题，记忆和掌握submodule的管理命令徒耗心智，放弃此方案。
三个方案的经历：
- cmake fetchContent: cmake configure的时候经常触发重新下载，设置缓存也带来额外的管理负担
- git submodule: 版本对应上莫名出错，切换起来要不断的移除，重新添加，繁琐
- vcpkg overlay: 用起来舒服多了，虽然要掌握额外的vcpkg的参数， 好在写好presets后几乎无痛
### 增加 git submodule 并锁定到特定commite/tag
```bash
# 1. git submodule add
git submodule add https://github.com/x/x.git third_party/x
git submodule update --init --recursive third_party/SDL3-mixer
# 2. 进入子模块目录，切换到指定 Commit
cd third_party/x
git fetch
git checkout <commit_hash/tag>
# 3. 回到主仓库，提交版本锁定的变更
git add .gitmodules third_party/x
git commit -m "锁定 $SUBMODULE_LOCAL_PATH 子模块到 Commit: $TARGET_COMMIT_HASH"
git push
# 4：验证子模块是否锁定成功
git submodule status
```

### 删除 git submodule 的过程
```bash
# 1. 解除子模块链接
git submodule deinit -f docs/my-submodule
# 2. 从索引和工作区删除
git rm -f docs/my-submodule
# 3. 清理缓存
rm -rf .git/modules/docs/my-submodule
# 4. 提交修改
git add .gitmodules
git commit -m "移除子模块 docs/my-submodule"
```



## RoadMap
:::markmap
# 游戏框架
## 主循环
### 资源加载1
### 资源加载2
### 资源加载3
### 资源加载4
## 事件处理
## 渲染
### 资源加载66
### 资源加载77
:::

## TODO
想做的事情清单呗
- [ ] 
已经完成的内容
- [x] 引入 vitepress 做文档管理

## 资料
- [在线编译器](https://onecompiler.com/cpp)
- [markdown-examples](/development/markdown-examples)
- [api-examples](/development/api-examples)


