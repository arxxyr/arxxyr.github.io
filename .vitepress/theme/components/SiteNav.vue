<script setup lang="ts">
// 终端风顶栏(整站固定):品牌 + 闪烁光标、首页/项目/博客、搜索、语言、主题。
// 替代 VitePress 默认导航(默认导航已在 custom.css 中隐藏)。
import { useData, useRoute, withBase } from 'vitepress'
import { useLocale } from '../composables/useLocale'
import { ui } from '../data/portfolio'

const { isDark } = useData()
const route = useRoute()
const { tr, toggle: toggleLang, lang } = useLocale()

const links = [
  { href: '/', label: ui.nav_home },
  { href: '/projects', label: ui.nav_proj },
  { href: '/posts/', label: ui.nav_blog },
]

// 当前路由是否命中某导航项(home 精确匹配,其余按前缀)。
function isActive(href: string): boolean {
  const path = route.path.replace(/index\.html$/, '/').replace(/\.html$/, '')
  const base = withBase(href)
  if (href === '/') return path === base
  return path.startsWith(base)
}

function toggleTheme(): void {
  isDark.value = !isDark.value
}

// 复用 VitePress 本地搜索:派发其监听的 ⌘K / Ctrl-K 快捷键即可唤起搜索框。
function openSearch(): void {
  const isApple =
    typeof navigator !== 'undefined' && /Mac|iPhone|iPad|iPod/.test(navigator.platform)
  window.dispatchEvent(
    new KeyboardEvent('keydown', {
      key: 'k',
      code: 'KeyK',
      metaKey: isApple,
      ctrlKey: !isApple,
      bubbles: true,
      cancelable: true,
    }),
  )
}
</script>

<template>
  <nav class="site-nav">
    <a class="brand" :href="withBase('/')" aria-label="loosqk — home">
      <span class="brand-name">loosqk</span>
      <span class="cursor" aria-hidden="true"></span>
    </a>

    <div class="nav-right">
      <a
        v-for="l in links"
        :key="l.href"
        :href="withBase(l.href)"
        class="nav-link"
        :class="{ active: isActive(l.href) }"
        >{{ tr(l.label) }}</a
      >

      <span class="sep" aria-hidden="true"></span>

      <button class="icon-btn search-btn" type="button" aria-label="Search" @click="openSearch">
        <span class="search-key">⌘K</span>
      </button>
      <button class="icon-btn" type="button" :aria-label="lang === 'zh' ? 'Switch to English' : '切换到中文'" @click="toggleLang">
        {{ lang === 'zh' ? 'EN' : '中' }}
      </button>
      <button class="icon-btn theme-btn" type="button" aria-label="Toggle theme" @click="toggleTheme">
        <span class="theme-icon" aria-hidden="true"></span>
      </button>
    </div>
  </nav>
</template>

<style scoped>
.site-nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: var(--vp-z-index-nav, 50);
  height: var(--vp-nav-height);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 0 24px;
  background: var(--bg);
  border-bottom: 1px solid var(--border);
}

/* 品牌 + 闪烁光标 */
.brand {
  display: flex;
  align-items: center;
  gap: 3px;
}
.brand-name {
  font-family: var(--font-mono);
  font-weight: 700;
  font-size: 15px;
  letter-spacing: -0.01em;
  color: var(--text);
}
.cursor {
  display: inline-block;
  width: 8px;
  height: 15px;
  background: var(--text);
  animation: nav-blink 1.1s step-end infinite;
}
@keyframes nav-blink {
  0%,
  49% {
    opacity: 1;
  }
  50%,
  100% {
    opacity: 0;
  }
}

.nav-right {
  display: flex;
  align-items: center;
  gap: 2px;
}

.nav-link {
  padding: 6px 11px 5px;
  border-bottom: 2px solid transparent;
  font-family: var(--font-mono);
  font-size: 13px;
  color: var(--text);
  opacity: 0.5;
  transition: opacity 0.15s;
}
.nav-link:hover {
  opacity: 1;
}
.nav-link.active {
  opacity: 1;
  font-weight: 600;
  border-bottom-color: var(--text);
}

.sep {
  width: 1px;
  height: 18px;
  background: var(--border);
  margin: 0 8px;
}

.icon-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 30px;
  height: 28px;
  padding: 0 9px;
  background: none;
  border: 1px solid var(--border);
  border-radius: 6px;
  cursor: pointer;
  color: var(--text);
  font-family: var(--font-mono);
  font-size: 12px;
  line-height: 1;
  transition: border-color 0.15s;
}
.icon-btn:hover {
  border-color: var(--text);
}
.search-key {
  font-size: 11px;
  opacity: 0.75;
}
.theme-btn {
  font-size: 13px;
}
/* 主题图标用 CSS 跟随 .dark,避免 JS 驱动造成水合闪烁 */
.theme-icon::before {
  content: '☾';
}
:global(.dark) .theme-icon::before {
  content: '☀';
}

@media (max-width: 560px) {
  .site-nav {
    padding: 0 16px;
  }
  .search-btn {
    display: none;
  }
}
</style>
