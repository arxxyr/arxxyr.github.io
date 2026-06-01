<script setup lang="ts">
import { resume } from '../data/resume'
</script>

<template>
  <div class="resume">
    <header class="resume-header">
      <div class="resume-id">
        <h1 class="resume-name">{{ resume.name }}</h1>
        <p class="resume-headline">{{ resume.headline }}</p>
        <p class="resume-location">📍 {{ resume.location }}</p>
      </div>
      <ul class="resume-contacts">
        <li v-for="c in resume.contacts" :key="c.label">
          <span class="contact-label">{{ c.label }}</span>
          <a :href="c.href" target="_blank" rel="noreferrer">{{ c.value }}</a>
        </li>
      </ul>
    </header>

    <section class="resume-section">
      <h2>简介</h2>
      <p class="resume-about">{{ resume.about }}</p>
    </section>

    <section class="resume-section">
      <h2>技能</h2>
      <div class="skill-grid">
        <div v-for="g in resume.skills" :key="g.group" class="skill-row">
          <span class="skill-group">{{ g.group }}</span>
          <ul class="skill-tags">
            <li v-for="s in g.items" :key="s">{{ s }}</li>
          </ul>
        </div>
      </div>
    </section>

    <section class="resume-section">
      <h2>项目</h2>
      <div v-for="p in resume.projects" :key="p.name" class="entry">
        <div class="entry-head">
          <span class="entry-title">
            <a v-if="p.link" :href="p.link" target="_blank" rel="noreferrer">{{ p.name }}</a>
            <template v-else>{{ p.name }}</template>
          </span>
          <span class="entry-period">{{ p.stack }}</span>
        </div>
        <p class="entry-desc">{{ p.desc }}</p>
      </div>
    </section>
  </div>
</template>

<style scoped>
.resume {
  max-width: 860px;
  margin: 0 auto;
  padding: 48px 24px 64px;
}

/* 头部 */
.resume-header {
  display: flex;
  flex-wrap: wrap;
  gap: 16px 32px;
  align-items: flex-end;
  justify-content: space-between;
  padding-bottom: 24px;
  border-bottom: 1px solid var(--vp-c-divider);
}
.resume-name {
  font-size: 2.2rem;
  font-weight: 700;
  line-height: 1.2;
  margin: 0;
}
.resume-headline {
  margin: 6px 0 0;
  color: var(--vp-c-brand-1);
  font-weight: 500;
}
.resume-location {
  margin: 4px 0 0;
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
}
.resume-contacts {
  list-style: none;
  margin: 0;
  padding: 0;
  font-size: 0.9rem;
}
.resume-contacts li {
  display: flex;
  gap: 8px;
  justify-content: flex-end;
  line-height: 1.85;
}
.contact-label {
  color: var(--vp-c-text-3);
  min-width: 48px;
  text-align: right;
}

/* 分节 */
.resume-section {
  margin-top: 36px;
}
.resume-section h2 {
  font-size: 1.05rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: var(--vp-c-text-2);
  margin: 0 0 16px;
  padding: 0 0 8px;
  border-bottom: 1px solid var(--vp-c-divider);
}
.resume-about {
  color: var(--vp-c-text-1);
  line-height: 1.7;
  margin: 0;
}

/* 技能 */
.skill-grid {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.skill-row {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 8px 12px;
}
.skill-group {
  min-width: 64px;
  color: var(--vp-c-text-3);
  font-size: 0.85rem;
}
.skill-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  list-style: none;
  margin: 0;
  padding: 0;
}
.skill-tags li {
  padding: 2px 10px;
  border-radius: 6px;
  background: var(--vp-c-default-soft);
  font-size: 0.85rem;
  color: var(--vp-c-text-1);
}

/* 条目(项目) */
.entry {
  margin-bottom: 20px;
}
.entry-head {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  justify-content: space-between;
  gap: 4px 16px;
}
.entry-title {
  font-weight: 600;
}
.entry-period {
  color: var(--vp-c-text-3);
  font-size: 0.85rem;
  white-space: nowrap;
}
.entry-desc {
  margin: 6px 0 0;
  color: var(--vp-c-text-2);
  line-height: 1.7;
}

@media (max-width: 640px) {
  .resume {
    padding: 32px 16px 48px;
  }
  .resume-contacts li {
    justify-content: flex-start;
  }
  .contact-label {
    text-align: left;
  }
}
</style>
