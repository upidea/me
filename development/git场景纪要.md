## 取出本地仓库的某个commit的文件创建新项目
```bash
git archive abc123 | tar -x -C /tmp
```

## 同时处理多个分支
```bash
git worktree add ../hotfix main
git worktree add ../experiment 1980ec6

git worktree remove ../experiment
```
