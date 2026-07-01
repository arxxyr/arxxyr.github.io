<script setup lang="ts">
// 整站页脚:版权 + 社交链接,跟随终端风配色。
import { useLocale } from '../composables/useLocale'
import { ui } from '../data/portfolio'

const { tr } = useLocale()

const links = [
  { label: 'github', href: 'https://github.com/arxxyr', external: true },
  { label: 'email', href: 'mailto:loosqk@gmail.com', external: false },
  { label: 'blog', href: '/posts/', external: false },
]
</script>

<template>
  <footer class="site-footer">
    <div class="footer-inner">
      <span>© 2026 loosqk · {{ tr(ui.footer_built) }}</span>
      <div class="footer-links">
        <a
          v-for="l in links"
          :key="l.label"
          :href="l.href"
          :target="l.external ? '_blank' : undefined"
          :rel="l.external ? 'noopener' : undefined"
          >{{ l.label }}</a
        >
      </div>
    </div>
  </footer>
</template>

<style scoped>
.site-footer {
  border-top: 1px solid var(--border);
  background: var(--bg);
}
.footer-inner {
  max-width: 900px;
  margin: 0 auto;
  padding: 28px 24px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
  font-family: var(--font-mono);
  font-size: 12px;
  color: var(--muted);
}
.footer-links {
  display: flex;
  gap: 18px;
}
.footer-links a {
  color: var(--muted);
  transition: color 0.15s;
}
.footer-links a:hover {
  color: var(--text);
}
</style>
