<script setup lang="ts">
// 博客归档页:页头 + 完整文章列表(数据来自 posts.data 加载器)。
import PageHead from './PageHead.vue'
import PostList from './PostList.vue'
import { useLocale } from '../composables/useLocale'
import { ui } from '../data/portfolio'

const { tr } = useLocale()
</script>

<template>
  <div class="portfolio">
    <PageHead cmd="ls ~/posts" :title="tr(ui.blog_title)" :intro="tr(ui.blog_intro)" />
    <section class="list">
      <PostList />
    </section>
  </div>
</template>

<style scoped>
.portfolio {
  max-width: 900px;
  margin: 0 auto;
  padding: 0 24px;
}
.list {
  margin-bottom: 80px;
}
</style>
