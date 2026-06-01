import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import { h } from 'vue'
import './styles/custom.css'
import Resume from './components/Resume.vue'

// 二次开发入口:继承默认主题,预留布局插槽,并注册全局组件。
export default {
  extends: DefaultTheme,
  Layout() {
    // 通过插槽往默认布局注入自定义内容,常用插槽见 AGENTS.md §6.2
    return h(DefaultTheme.Layout, null, {
      // 'doc-after': () => h(Comments),
    })
  },
  enhanceApp({ app }) {
    // 全局组件:首页个人介绍
    app.component('Resume', Resume)
  },
} satisfies Theme
