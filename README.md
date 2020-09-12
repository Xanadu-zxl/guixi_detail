# property_consultant

> A Vue.js project

## Build Setup

```bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

# GitHub flow

> 基于 [git-flow](https://github.com/nvie/gitflow)

## 如何开始工作

1. 先将 repo `fork` 到自己账号下
1. 然后开新分支进行开发
1. 开发完毕后 push 到自己的 repo
1. 到 GitHub 提交 `Pull Request`，打上对应的 `label`，然后 request 对应的同事 review

### 什么样的代码才能合并进 develop 分支：

- 有至少一个同事的 approved
- 被产品或者设计验收通过
- 经过 CodeClimate 和 单元测试（CircleCI）
  - CodeClimate 的 issues 原则上不能自己点通过，一定是和团队协商通过，或者修改 rules

### Commit 格式

can
提交信息首行简要描述该提交涉及的改动，建议以动词开头。如需添加相关 `issue` 或 `jet` 任务的链接，须与首行之间保留一个空行，从第三行开始。可参考以下格式：

```log
第一行 [<type>:] 简要描述该提交涉及的改动，建议以开头动词 [(<scope>)]
第二行 空行
第三行 相关的链接（issue 或 jira 等）
第四行 更多必要信息
```

type（可选）:

```log
feat: 新功能
fix: 修复问题
docs: 添加或者修改文档
test: 添加或者测试用例
refactor: 重构（既不涉及新功能，也不是修复问题）
chore: 构建工具或者辅助工具的变动
style: 调整格式
```

scope（可选）:
比如 fix 涉及的范围 组件名、文件名等等逗号分隔

例子：

```log
Integrate immutable.js (A,B,C)

https://trello.com/c/yIglLjvq
```
