import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import { h } from 'vue'
import './styles/custom.css'

import SiteNav from './components/SiteNav.vue'
import SiteFooter from './components/SiteFooter.vue'
import PortfolioHome from './components/PortfolioHome.vue'
import PortfolioProjects from './components/PortfolioProjects.vue'
import PortfolioBlog from './components/PortfolioBlog.vue'

// 二次开发入口:继承默认主题,用 layout-top/bottom 插槽注入终端风导航与页脚
// (默认 .VPNav 在 custom.css 中隐藏,但仍挂载以复用本地搜索),并注册页面级组件。
export default {
  extends: DefaultTheme,
  Layout() {
    return h(DefaultTheme.Layout, null, {
      'layout-top': () => h(SiteNav),
      'layout-bottom': () => h(SiteFooter),
    })
  },
  enhanceApp({ app }) {
    app.component('PortfolioHome', PortfolioHome)
    app.component('PortfolioProjects', PortfolioProjects)
    app.component('PortfolioBlog', PortfolioBlog)
  },
} satisfies Theme
