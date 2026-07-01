<script setup lang="ts">
// 二级页面页头:$ <cmd> + 大标题 + 一句简介。文案由父组件按语言传入。
defineProps<{ cmd: string; title: string; intro: string }>()
</script>

<template>
  <section class="page-head">
    <div class="cmd"><span class="dollar">$</span> {{ cmd }}</div>
    <h1 class="title">{{ title }}</h1>
    <p class="intro">{{ intro }}</p>
  </section>
</template>

<style scoped>
.page-head {
  padding: 64px 0 32px;
}
.cmd {
  font-family: var(--font-mono);
  font-size: 13px;
  color: var(--muted);
  margin-bottom: 14px;
}
.dollar {
  color: var(--text);
}
.title {
  font-size: clamp(30px, 5vw, 44px);
  line-height: 1.05;
  font-weight: 700;
  letter-spacing: -0.025em;
  margin: 0 0 12px;
  color: var(--text);
}
.intro {
  font-size: 16px;
  color: var(--muted);
  margin: 0;
  max-width: 560px;
  text-wrap: pretty;
}
</style>
