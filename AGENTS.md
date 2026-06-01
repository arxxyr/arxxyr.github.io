# AGENTS.md — 个人博客项目说明

> 本文件是给 AI 编码助手(Claude Code / Codex 等)与协作者看的项目指南。
> 全局编码习惯见 `~/.claude/CLAUDE.md`,本文件只记录**本项目特有**的信息。

## 1. 项目简介

个人博客 / 网站,基于 **VitePress 默认主题**做**自定义二次开发**(自定义 CSS + 组件 + 数据加载),
通过 **GitHub Actions** 自动构建并部署到 **GitHub Pages**(自带 HTTPS)。

- 写作方式:Markdown
- 产物:纯静态站点
- 托管:GitHub Pages(默认 `用户名.github.io`,可选绑定自定义域名)

## 2. 技术选型与决策记录

| 决策项 | 选择 | 理由 |
|--------|------|------|
| 站点生成器 | **VitePress** | Vite + Vue 驱动,本地全文搜索 / 暗色 / i18n 开箱即用;构建快;可直接用 Vue 组件定制 |
| 主题 | **默认主题 + 二次开发** | 官方维护最稳、长期可靠;通过覆盖 CSS 变量与扩展布局完全可控;不背第三方主题的依赖与维护风险 |
| 包管理器 | **pnpm** | 本机已装(10.33.1),磁盘占用小、安装快,VitePress 社区推荐 |
| 部署 | **GitHub Actions → Pages** | 免费、自带 HTTPS、push 即部署,源码与产物分离 |

### 为什么默认主题而不是第三方主题
- 第三方博客主题(如 @sugarat/theme)开箱功能多,但引入额外依赖(如 element-plus)、版本可能跟随 alpha,长期维护不可控。
- 默认主题由 VitePress 官方维护,稳定可靠;它本身已具备简洁排版、暗色、本地搜索、i18n;**缺的博客能力(文章列表/归档)用 `createContentLoader` 自己补**即可,完全可控。

### 为什么不是 Hugo / Hexo
- **Hugo + PaperMod** 同样优秀,但需额外安装 Go 二进制(本机未装);本项目选择留在已具备的 Node 生态,并保留用 Vue 组件深度定制的能力。
- **Hexo** 主题华丽但偏重、部分插件生态老旧;VitePress 更现代、构建更快、与 Vue 技术栈一致。

## 3. 目录结构

```
blog/
├─ .vitepress/
│  ├─ config.ts                 # 站点 + 默认主题配置(nav / search / i18n 文案)
│  └─ theme/                    # —— 二次开发核心 ——
│     ├─ index.ts               # 主题入口:继承 DefaultTheme + 布局插槽 + 全局组件
│     └─ styles/
│        └─ custom.css          # 覆盖 CSS 变量,自定义外观
├─ posts/                       # 博客文章
│  ├─ index.md                  # 归档页(用 data loader 渲染文章列表)
│  ├─ posts.data.ts             # createContentLoader 文章数据加载器
│  └─ hello-world.md            # 示例文章(可删)
├─ public/                      # 原样拷贝的静态资源(favicon、图片、CNAME 等)
├─ index.md                     # 首页(默认主题 home 布局:hero + features)
├─ .github/workflows/
│  └─ deploy.yml                # GitHub Pages 自动部署流水线
├─ .nvmrc                       # Node 版本(22)
├─ .gitignore
├─ package.json
├─ README.md                    # 面向人的快速上手
└─ AGENTS.md                    # 本文件
```

构建产物输出到 `.vitepress/dist/`(已 gitignore)。

## 4. 环境要求

- Node.js ≥ 20(本机 v24,CI 用 22 LTS)
- pnpm(本机 10.33.1)

## 5. 常用命令

| 命令 | 作用 |
|------|------|
| `pnpm install` | 安装依赖 |
| `pnpm dev` | 本地开发服务器(默认 http://localhost:5173) |
| `pnpm build` | 构建静态站点到 `.vitepress/dist` |
| `pnpm preview` | 本地预览构建产物 |

## 6. 二次开发指南(本项目重点)

基于「扩展默认主题」的方式做定制,四个落点:

### 6.1 改外观:覆盖 CSS 变量
编辑 `.vitepress/theme/styles/custom.css`,覆盖 VitePress 的 CSS 变量即可。常用变量:

| 变量 | 作用 |
|------|------|
| `--vp-c-brand-1/2/3` | 品牌主色(链接、按钮、强调) |
| `--vp-home-hero-name-background` | 首页 hero 大标题渐变 |
| `--vp-c-bg` / `--vp-c-bg-alt` | 背景色 |
| `--vp-c-text-1/2/3` | 文本色阶 |
| `--vp-c-divider` | 分割线 |

> 完整变量见 `node_modules/vitepress/dist/client/theme-default/styles/vars.css`。

### 6.2 扩展布局:插槽
在 `.vitepress/theme/index.ts` 的 `Layout` 里用插槽往默认布局注入内容。常用插槽:
`home-hero-before` / `home-hero-after` / `doc-before` / `doc-after` / `doc-footer-before` /
`layout-top` / `layout-bottom` / `nav-bar-content-after` / `sidebar-nav-before`。

### 6.3 注册全局组件 / 插件
在 `.vitepress/theme/index.ts` 的 `enhanceApp({ app })` 里 `app.component(...)` 或 `app.use(...)`,
之后可在任意 Markdown 中直接使用该组件。

### 6.4 文章列表 / 归档:createContentLoader
`posts/posts.data.ts` 用 `createContentLoader('posts/*.md', ...)` 在构建期聚合文章元数据,
`posts/index.md` 用 `<script setup>` 导入 `data` 渲染列表。新增文章自动出现,无需手动维护。
> 标签页、分页、首页"最新文章"都可基于同一份 `data` 扩展。

参考:VitePress 官方「[扩展默认主题](https://vitepress.dev/guide/extending-default-theme)」与「[createContentLoader](https://vitepress.dev/guide/data-loading)」。

## 7. 写作约定

- 新文章放 `posts/`,一篇一个 `.md`。
- 文件名用 **kebab-case**(URL 友好,如 `my-first-post.md`);**日期不靠文件名、靠 frontmatter `date`**。
- 正文用**中文**写作(与全局习惯一致)。
- 图片等静态资源放 `public/`,正文用绝对路径引用(如 `/img/foo.png`)。
- frontmatter 常用字段:

```yaml
---
title: 文章标题
date: 2026-06-01        # 决定归档排序
tags: [标签1, 标签2]
description: 一句话摘要(用于列表与 SEO)
---
```

## 8. 配置说明(`.vitepress/config.ts`)

- 站点信息:`title` / `description` / `lang`。
- 导航与社交:`themeConfig.nav` / `themeConfig.socialLinks`(把占位的 `loosqk` 改成你的 GitHub 用户名)。
- 搜索:`themeConfig.search.provider = 'local'`(内置离线全文搜索)。
- `base`:自定义域名或根仓库用 `'/'`;部署到 `用户名.github.io/仓库名/` 子路径时改成 `'/仓库名/'`。

## 9. Git 与部署

### Git 策略
- `repo/` 不是 git 仓库;**blog 作为独立 git 仓库**管理(仓库根 = `blog/`)。
- 初始化:

```bash
cd /home/loosqk/repo/blog
git init && git branch -M master
git add . && git commit -m "✨ feat: 初始化 VitePress 博客"
git remote add origin git@github.com:arxxyr/arxxyr.github.io.git
git push -u origin master
```

- 提交规范沿用全局 `CLAUDE.md`(Conventional Commits + emoji,不用 scope 括号,不加 Co-Authored-By)。

### GitHub Pages
1. 推送后,仓库 `Settings → Pages → Source` 选 **GitHub Actions**。
2. 之后每次 push 到 `master`,`deploy.yml` 自动构建并发布。
3. workflow 里的 `fetch-depth: 0` 必须保留(`lastUpdated` 依赖 git 提交时间)。

### 自定义域名(可选)
1. DNS:根域名加 4 条 A 记录指向 GitHub Pages(`185.199.108.153` / `109` / `110` / `111`);或 `www` 用 CNAME 指向 `用户名.github.io`。
2. 新建 `public/CNAME`,内容为你的域名(构建时随产物进入 dist)。
3. 仓库 `Settings → Pages → Custom domain` 填域名,生效后勾选 **Enforce HTTPS**。
4. `config.ts` 的 `base` 保持 `'/'`。

## 10. 给 AI Agent 的协作约定

- **语言**:交流、注释、文档、提交信息一律用中文。
- **不简化**:完整实现目标,不留 TODO 占位糊弄。
- **质量**:配置与代码力求可读、可移植;改外观优先覆盖 CSS 变量,避免硬编码魔法值。
- **验证**:涉及构建的改动,本地 `pnpm build` 通过后再提交。
- **边界**:`pnpm install`、推送远端、修改 DNS 等外部动作,执行前先与用户确认。

## 11. 当前进度

- [x] 目录结构与项目文档
- [x] 默认主题二次开发骨架(自定义入口 + CSS + 自动归档)
- [ ] 安装依赖(`pnpm install`)
- [ ] 本地跑通 `pnpm dev`
- [ ] 初始化 git 并推送到 GitHub
- [ ] 开启 GitHub Pages
- [ ] (可选)绑定自定义域名
