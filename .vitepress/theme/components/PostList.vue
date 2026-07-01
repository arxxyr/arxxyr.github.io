<script setup lang="ts">
// 文章列表:日期 / 标题 / 摘要 / 标签 / 阅读时长。首页(compact + limit)与博客页共用。
import { computed } from 'vue'
import { withBase } from 'vitepress'
import { data as allPosts } from '../../../posts/posts.data'
import { useLocale } from '../composables/useLocale'
import { ui } from '../data/portfolio'

const props = withDefaults(defineProps<{ limit?: number; compact?: boolean }>(), {
  limit: 0,
  compact: false,
})

const { tr } = useLocale()

const posts = computed(() => (props.limit > 0 ? allPosts.slice(0, props.limit) : allPosts))
</script>

<template>
  <div class="post-list" :class="{ compact }">
    <a v-for="post in posts" :key="post.url" class="post" :href="withBase(post.url)">
      <span class="post-date">{{ post.date }}</span>
      <div class="post-body">
        <div class="post-title">{{ post.title }}</div>
        <div v-if="post.description" class="post-summary">{{ post.description }}</div>
        <div v-if="post.tags?.length" class="post-tags">
          <span v-for="tag in post.tags" :key="tag">#{{ tag }}</span>
        </div>
      </div>
      <span class="post-read">{{ post.minutes }} {{ tr(ui.read_suffix) }}</span>
    </a>
    <p v-if="!posts.length" class="post-empty">{{ tr(ui.empty_posts) }}</p>
  </div>
</template>

<style scoped>
.post {
  display: flex;
  align-items: baseline;
  gap: 18px;
  padding: 20px 0;
  border-bottom: 1px solid var(--border);
  transition: padding 0.15s;
}
.compact .post {
  padding: 18px 0;
}
.post:hover {
  padding-left: 6px;
}

.post-date {
  width: 96px;
  flex-shrink: 0;
  font-family: var(--font-mono);
  font-size: 12px;
  color: var(--muted);
  font-variant-numeric: tabular-nums;
}

.post-body {
  flex: 1;
  min-width: 0;
}
.post-title {
  font-size: 17px;
  font-weight: 500;
  letter-spacing: -0.01em;
  color: var(--text);
  text-wrap: pretty;
}
.compact .post-title {
  font-size: 16px;
}
.post-summary {
  margin-top: 6px;
  font-size: 14px;
  line-height: 1.6;
  color: var(--muted);
  text-wrap: pretty;
}
.compact .post-summary {
  margin-top: 5px;
  font-size: 13.5px;
  line-height: 1.55;
}
.post-tags {
  margin-top: 9px;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.compact .post-tags {
  margin-top: 8px;
}
.post-tags span {
  font-family: var(--font-mono);
  font-size: 11px;
  color: var(--muted);
}

.post-read {
  flex-shrink: 0;
  font-family: var(--font-mono);
  font-size: 11.5px;
  color: var(--muted);
}

.post-empty {
  padding: 20px 0;
  color: var(--muted);
  font-family: var(--font-mono);
  font-size: 13px;
}

@media (max-width: 560px) {
  .post {
    flex-wrap: wrap;
    gap: 4px 14px;
  }
  .post-read {
    width: 100%;
    order: 3;
    margin-top: 4px;
  }
}
</style>
