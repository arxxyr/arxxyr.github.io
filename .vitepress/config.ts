import { defineConfig } from 'vitepress'

// VitePress 默认主题站点配置。
// 外观/布局的二次开发放在 .vitepress/theme/ 下,本文件只配站点与主题选项。
export default defineConfig({
  lang: 'zh-CN',
  title: 'loosqk',
  description: '机器人软件工程师 · C++ / Rust · ROS 2 · 个人站与技术博客',

  // 部署位置决定 base:
  //   - 自定义域名 或 用户名.github.io 根仓库 → '/'
  //   - 部署到 用户名.github.io/仓库名/ 子路径 → '/仓库名/'
  base: '/',

  cleanUrls: true, // 去掉 URL 中的 .html 后缀
  lastUpdated: true,

  // 站点图标(终端风 SVG 提示符);消除浏览器对 /favicon.ico 的默认 404 请求
  head: [['link', { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }]],

  // 项目文档不作为站点页面(否则被当内容编译,还会触发死链检查)
  srcExclude: ['AGENTS.md', 'README.md'],

  themeConfig: {
    // 顶部导航/社交链接由自定义的 SiteNav 提供(默认 .VPNav 已在 custom.css 隐藏),
    // 故此处不再配置 themeConfig.nav / socialLinks。

    // 本地离线全文搜索(默认主题内置 minisearch,无需第三方)。
    // 默认导航虽隐藏,但搜索组件仍挂载:SiteNav 通过 ⌘K 快捷键唤起搜索框。
    search: {
      provider: 'local',
    },

    // 中文化文案(文章页 TOC / 上下篇 / 最后更新等仍会用到)
    outline: { level: [2, 3], label: '本页目录' },
    docFooter: { prev: '上一篇', next: '下一篇' },
    darkModeSwitchLabel: '外观',
    lightModeSwitchTitle: '切换到浅色',
    darkModeSwitchTitle: '切换到深色',
    returnToTopLabel: '回到顶部',
    sidebarMenuLabel: '菜单',
    lastUpdatedText: '最后更新',
  },
})
