import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import { h } from 'vue'
import './styles/custom.css'

// 二次开发入口:继承默认主题,预留布局插槽与全局组件注册点。
export default {
  extends: DefaultTheme,
  Layout() {
    // 通过插槽往默认布局注入自定义内容,常用插槽见 AGENTS.md §6.2
    return h(DefaultTheme.Layout, null, {
      // 'doc-after': () => h(Comments),
      // 'home-hero-after': () => h(Profile),
    })
  },
  enhanceApp({ app }) {
    // 注册全局组件 / 插件:app.component(...) / app.use(...)
    void app
  },
} satisfies Theme
