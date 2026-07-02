import { ref, onMounted } from 'vue'
import { t, type I18nText, type Lang } from '../data/portfolio'

// 整站语言状态(模块级单例)—— 顶栏切换后,所有页面的双语文案同步响应。
// 仅作用于作品集这层界面文案,不触碰 VitePress 全站 i18n(文章正文仍为中文)。

const STORAGE_KEY = 'loosqk-lang'

// 默认英文(面向国际访客):SSR 与首屏 hydration 一律按 'en' 渲染,别人打开即英文;
// 挂载后若留有手动切换的偏好再覆盖,避免水合不一致。
const lang = ref<Lang>('en')
let restored = false

function restore() {
  if (restored) return
  restored = true
  // 仅在用户手动切换过、留有偏好时覆盖默认英文
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY)
    if (saved === 'zh' || saved === 'en') lang.value = saved
  } catch {
    /* 隐私模式 / 禁用存储时静默降级 */
  }
}

export function useLocale() {
  // onMounted 只在客户端触发,restored 保证整站仅恢复一次。
  onMounted(restore)

  function toggle() {
    lang.value = lang.value === 'zh' ? 'en' : 'zh'
    try {
      window.localStorage.setItem(STORAGE_KEY, lang.value)
    } catch {
      /* 同上 */
    }
  }

  // tr 在模板中调用会读取 lang.value,天然随语言切换重渲染。
  const tr = (v: I18nText) => t(v, lang.value)

  return { lang, toggle, tr }
}
