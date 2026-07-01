<script setup lang="ts">
// 项目卡片。variant=featured 用于首页(标签为 #tag),variant=full 用于项目页(标签为描边 chip)。
import { useLocale } from '../composables/useLocale'
import { t, type Project } from '../data/portfolio'

const props = withDefaults(
  defineProps<{ project: Project; variant?: 'featured' | 'full' }>(),
  { variant: 'featured' },
)

const { lang } = useLocale()
</script>

<template>
  <a
    class="card"
    :class="variant"
    :href="project.repo"
    target="_blank"
    rel="noopener"
  >
    <div class="card-head">
      <span class="card-name">{{ t(project.name, lang) }}</span>
      <span class="card-year">{{ project.year }}</span>
    </div>
    <p class="card-desc">{{ t(project.desc, lang) }}</p>
    <div class="card-stack">
      <span v-for="(s, i) in project.stack" :key="i" :class="variant === 'full' ? 'chip' : 'hashtag'">
        <template v-if="variant === 'full'">{{ t(s, lang) }}</template>
        <template v-else>#{{ t(s, lang) }}</template>
      </span>
    </div>
  </a>
</template>

<style scoped>
.card {
  display: flex;
  flex-direction: column;
  gap: 11px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 12px;
  transition:
    border-color 0.18s,
    transform 0.18s;
}
.card.featured {
  padding: 20px;
}
.card.full {
  gap: 12px;
  padding: 22px;
}
.card:hover {
  border-color: var(--text);
  transform: translateY(-2px);
}

.card-head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 10px;
}
.card-name {
  font-weight: 600;
  font-size: 15.5px;
  letter-spacing: -0.01em;
  color: var(--text);
}
.full .card-name {
  font-size: 16px;
}
.card-year {
  flex-shrink: 0;
  font-family: var(--font-mono);
  font-size: 11.5px;
  color: var(--muted);
}

.card-desc {
  margin: 0;
  font-size: 13.5px;
  line-height: 1.6;
  color: var(--muted);
  text-wrap: pretty;
}
.full .card-desc {
  font-size: 14px;
}

.card-stack {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: auto;
}
.full .card-stack {
  gap: 7px;
  padding-top: 4px;
}
.hashtag {
  font-family: var(--font-mono);
  font-size: 11px;
  color: var(--muted);
}
.chip {
  padding: 4px 9px;
  background: var(--surface2);
  border: 1px solid var(--border);
  border-radius: 6px;
  font-family: var(--font-mono);
  font-size: 11px;
  color: var(--muted);
}
</style>
