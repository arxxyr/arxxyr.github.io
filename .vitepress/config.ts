import { defineConfig } from 'vitepress'

// VitePress 默认主题站点配置。
// 外观/布局的二次开发放在 .vitepress/theme/ 下,本文件只配站点与主题选项。
export default defineConfig({
  lang: 'zh-CN',
  title: '我的博客',
  description: '个人技术博客',

  // 部署位置决定 base:
  //   - 自定义域名 或 用户名.github.io 根仓库 → '/'
  //   - 部署到 用户名.github.io/仓库名/ 子路径 → '/仓库名/'
  base: '/',

  cleanUrls: true, // 去掉 URL 中的 .html 后缀
  lastUpdated: true,

  // 项目文档不作为站点页面(否则被当内容编译,还会触发死链检查)
  srcExclude: ['AGENTS.md', 'README.md'],

  themeConfig: {
    // 顶部导航
    nav: [
      { text: '关于', link: '/' },
      { text: '博客', link: '/posts/' },
    ],

    // 本地离线全文搜索(默认主题内置 minisearch,无需第三方)
    search: {
      provider: 'local',
    },

    // 社交链接
    socialLinks: [
      { icon: 'github', link: 'https://github.com/arxxyr' },
    ],

    // 中文化文案
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
