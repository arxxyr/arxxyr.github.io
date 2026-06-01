# 个人博客

基于 [VitePress](https://vitepress.dev/) **默认主题 + 自定义二次开发**的个人博客,通过 GitHub Actions 自动部署到 GitHub Pages。

## 快速开始

```bash
pnpm install        # 安装依赖(首次)
pnpm dev            # 本地开发,默认 http://localhost:5173
pnpm build          # 构建到 .vitepress/dist
pnpm preview        # 预览构建产物
```

## 写文章

在 `posts/` 新建 `.md`,顶部写好 frontmatter,保存后自动出现在 [归档页](./posts/)(由 `createContentLoader` 聚合):

```yaml
---
title: 标题
date: 2026-06-01
tags: [随笔]
description: 一句话摘要
---
```

## 二次开发入口

- `.vitepress/theme/index.ts` —— 继承默认主题,扩展布局插槽 / 注册全局组件
- `.vitepress/theme/styles/custom.css` —— 覆盖 CSS 变量,自定义外观
- `posts/posts.data.ts` —— 文章列表数据加载器

技术选型、二次开发指南、写作/提交约定、部署与自定义域名等完整说明见 [AGENTS.md](./AGENTS.md)。

## 部署

推送到 GitHub 后,在仓库 `Settings → Pages → Source` 选 **GitHub Actions** 即可。详见 [AGENTS.md](./AGENTS.md)。
