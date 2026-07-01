<script setup lang="ts">
// 项目页:页头 + 完整项目网格。
import PageHead from './PageHead.vue'
import ProjectCard from './ProjectCard.vue'
import { useLocale } from '../composables/useLocale'
import { ui, projects } from '../data/portfolio'

const { tr } = useLocale()
</script>

<template>
  <div class="portfolio">
    <PageHead cmd="ls ~/projects" :title="tr(ui.proj_title)" :intro="tr(ui.proj_intro)" />
    <section class="grid">
      <ProjectCard v-for="(p, i) in projects" :key="i" :project="p" variant="full" />
    </section>
  </div>
</template>

<style scoped>
.portfolio {
  max-width: 900px;
  margin: 0 auto;
  padding: 0 24px;
}
.grid {
  margin-bottom: 80px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 14px;
}
</style>
