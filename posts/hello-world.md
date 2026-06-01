---
title: 第一篇文章:Hello VitePress
date: 2026-06-01
tags:
  - 随笔
description: 用 VitePress 默认主题二次开发搭建的个人博客的第一篇文章。
---

# Hello VitePress

这是用 **VitePress 默认主题 + 自定义二次开发** 搭建的博客的第一篇示例文章。
保存后它会自动出现在 [归档页](/posts/)(由 `createContentLoader` 聚合)。

## 怎么写新文章

1. 在 `posts/` 目录新建 `.md` 文件(文件名用 kebab-case,如 `my-first-post.md`);
2. 顶部写好 frontmatter(`title` / `date` / `tags` / `description`);
3. 用 Markdown 写正文,`pnpm dev` 本地实时预览,归档页自动更新。

> 删除本文后即可开始你自己的写作。
