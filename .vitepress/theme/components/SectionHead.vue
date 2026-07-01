<script setup lang="ts">
// 首页分区小标题:~/<path> + 分隔线 + 右侧(默认插槽,放说明文字或"全部 →"链接)。
defineProps<{ path: string }>()
</script>

<template>
  <div class="section-head">
    <span class="path"><span class="tilde">~/</span>{{ path }}</span>
    <span class="rule" aria-hidden="true"></span>
    <span class="extra"><slot /></span>
  </div>
</template>

<style scoped>
.section-head {
  display: flex;
  align-items: baseline;
  gap: 14px;
  margin-bottom: 22px;
}
.path {
  font-family: var(--font-mono);
  font-size: 13px;
  color: var(--muted);
}
.tilde {
  opacity: 0.5;
}
.rule {
  flex: 1;
  height: 1px;
  background: var(--border);
}
.extra {
  font-family: var(--font-mono);
  font-size: 12px;
  color: var(--muted);
}
/* 右侧若为链接/按钮,hover 提亮 */
.extra :deep(a),
.extra :deep(button) {
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  color: var(--muted);
  font: inherit;
  transition: color 0.15s;
}
.extra :deep(a:hover),
.extra :deep(button:hover) {
  color: var(--text);
}
</style>
