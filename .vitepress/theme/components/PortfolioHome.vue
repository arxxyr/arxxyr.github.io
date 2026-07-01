<script setup lang="ts">
// 首页:hero + 仿终端窗口 + 技能 + 精选项目 + 最新文章。
import { withBase } from 'vitepress'
import SectionHead from './SectionHead.vue'
import ProjectCard from './ProjectCard.vue'
import PostList from './PostList.vue'
import { useLocale } from '../composables/useLocale'
import {
  ui,
  profile,
  socials,
  terminal,
  skills,
  projects,
  FEATURED_COUNT,
  RECENT_COUNT,
} from '../data/portfolio'

const { tr } = useLocale()

const featured = projects.slice(0, FEATURED_COUNT)

const isExternal = (href: string) => /^https?:/.test(href)
const linkHref = (href: string) => (/^(https?:|mailto:)/.test(href) ? href : withBase(href))
</script>

<template>
  <div class="portfolio">
    <!-- hero -->
    <section class="hero">
      <div class="cmd"><span class="dollar">$</span> whoami</div>
      <h1 class="name">loosqk<span class="name-cursor" aria-hidden="true"></span></h1>
      <div class="role"><span class="slash">// </span>{{ tr(profile.role) }}</div>
      <p class="bio">{{ tr(profile.bio) }}</p>

      <div class="socials">
        <a
          v-for="s in socials"
          :key="s.href"
          class="social"
          :href="linkHref(s.href)"
          :target="isExternal(s.href) ? '_blank' : undefined"
          :rel="isExternal(s.href) ? 'noopener' : undefined"
        >
          {{ tr(s.label) }}<span v-if="isExternal(s.href)" class="ext" aria-hidden="true">↗</span>
        </a>
      </div>

      <div class="meta">
        <span class="meta-item"><span class="dot"></span>{{ tr(profile.location) }}</span>
        <span class="meta-item"><span class="dot live"></span>{{ tr(profile.available) }}</span>
      </div>
    </section>

    <!-- 仿终端窗口 -->
    <section class="terminal-section">
      <div class="term">
        <div class="term-bar">
          <span class="tdot"></span><span class="tdot"></span><span class="tdot"></span>
          <span class="term-title">{{ terminal.title }}</span>
        </div>
        <div class="term-body">
          <div class="tline">
            <span class="tmuted">{{ terminal.host }}</span> <span class="tmuted">:~$</span> cat
            profile.json
          </div>
          <div class="tjson">
            <div><span class="brace">{</span> <span class="tkey">"role"</span>: "{{ terminal.profile.role }}",</div>
            <div class="indent"><span class="tkey">"experience"</span>: "{{ terminal.profile.experience }}",</div>
            <div class="indent"><span class="tkey">"focus"</span>: "{{ terminal.profile.focus }}" <span class="brace">}</span></div>
          </div>
          <div class="tline">
            <span class="tmuted">{{ terminal.host }}</span> <span class="tmuted">:~$</span> uname -a
          </div>
          <div class="tout">{{ terminal.uname }}</div>
          <div class="tline">
            <span class="tmuted">{{ terminal.host }}</span> <span class="tmuted">:~$</span>
            <span class="term-cursor" aria-hidden="true"></span>
          </div>
        </div>
      </div>
    </section>

    <!-- 技能 -->
    <section class="block">
      <SectionHead path="skills">{{ tr(ui.skills_title) }}</SectionHead>
      <div class="skill-row" v-for="(g, i) in skills" :key="i">
        <div class="skill-label">{{ tr(g.label) }}</div>
        <div class="skill-items">
          <span class="skill-tag" v-for="(it, j) in g.items" :key="j">{{ tr(it) }}</span>
        </div>
      </div>
    </section>

    <!-- 精选项目 -->
    <section class="block">
      <SectionHead path="projects">
        <a :href="withBase('/projects')">{{ tr(ui.view_all_projects) }} →</a>
      </SectionHead>
      <div class="proj-grid">
        <ProjectCard v-for="(p, i) in featured" :key="i" :project="p" variant="featured" />
      </div>
    </section>

    <!-- 最新文章 -->
    <section class="block last">
      <SectionHead path="posts">
        <a :href="withBase('/posts/')">{{ tr(ui.view_all_posts) }} →</a>
      </SectionHead>
      <PostList :limit="RECENT_COUNT" compact />
    </section>
  </div>
</template>

<style scoped>
.portfolio {
  max-width: 900px;
  margin: 0 auto;
  padding: 0 24px;
}

/* ============ hero ============ */
.hero {
  padding: 72px 0 44px;
}
.cmd {
  font-family: var(--font-mono);
  font-size: 13px;
  color: var(--muted);
  margin-bottom: 18px;
}
.dollar {
  color: var(--text);
}
.name {
  font-family: var(--font-mono);
  font-size: clamp(40px, 7vw, 68px);
  line-height: 1;
  font-weight: 700;
  letter-spacing: -0.03em;
  margin: 0 0 14px;
  color: var(--text);
}
.name-cursor {
  display: inline-block;
  width: 0.5em;
  height: 0.95em;
  background: var(--text);
  margin-left: 0.08em;
  transform: translateY(0.08em);
  animation: blink 1.1s step-end infinite;
}
.role {
  font-family: var(--font-mono);
  font-size: 16px;
  color: var(--muted);
  margin-bottom: 24px;
}
.slash {
  opacity: 0.55;
}
.bio {
  font-size: 17px;
  line-height: 1.65;
  color: var(--text);
  max-width: 600px;
  margin: 0 0 28px;
  opacity: 0.85;
  text-wrap: pretty;
}
.socials {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 22px;
}
.social {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 9px 15px;
  border: 1px solid var(--border);
  border-radius: 8px;
  background: var(--surface);
  font-family: var(--font-mono);
  font-size: 13px;
  color: var(--text);
  transition:
    background 0.15s,
    color 0.15s,
    border-color 0.15s;
}
.social:hover {
  background: var(--text);
  color: var(--bg);
  border-color: var(--text);
}
.social .ext {
  opacity: 0.5;
}
.social:hover .ext {
  opacity: 0.8;
}
.meta {
  display: flex;
  flex-wrap: wrap;
  gap: 18px;
  font-family: var(--font-mono);
  font-size: 12.5px;
  color: var(--muted);
}
.meta-item {
  display: inline-flex;
  align-items: center;
  gap: 7px;
}
.dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--muted);
}
.dot.live {
  background: var(--text);
}

/* ============ 终端窗口 ============ */
.terminal-section {
  margin-bottom: 64px;
}
.term {
  background: var(--term);
  border: 1px solid var(--border);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 16px 40px var(--shadow);
}
.term-bar {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  border-bottom: 1px solid var(--term-border);
}
.tdot {
  width: 11px;
  height: 11px;
  border-radius: 50%;
}
.tdot:nth-child(1) {
  background: #5a5a5e;
}
.tdot:nth-child(2) {
  background: #76767b;
}
.tdot:nth-child(3) {
  background: #9a9aa0;
}
.term-title {
  flex: 1;
  text-align: center;
  font-family: var(--font-mono);
  font-size: 12px;
  color: var(--termmuted);
}
.term-body {
  padding: 22px 22px 26px;
  font-family: var(--font-mono);
  font-size: 13.5px;
  line-height: 1.9;
  color: var(--termtext);
  overflow-x: auto;
}
.tline {
  white-space: nowrap;
}
.tmuted {
  color: var(--termmuted);
}
.tjson {
  margin: 6px 0 14px;
}
.tjson .indent {
  padding-left: 1.1em;
}
.tkey {
  color: var(--termmuted);
}
.brace {
  color: var(--termtext);
}
.tout {
  margin: 6px 0 14px;
  color: var(--termtext);
  opacity: 0.8;
}
.term-cursor {
  display: inline-block;
  width: 8px;
  height: 15px;
  background: var(--termtext);
  transform: translateY(2px);
  animation: blink 1.1s step-end infinite;
}

/* ============ 区块通用 ============ */
.block {
  margin-bottom: 64px;
}
.block.last {
  margin-bottom: 80px;
}

/* 技能 */
.skill-row {
  display: flex;
  gap: 18px;
  padding: 15px 0;
  border-bottom: 1px solid var(--border);
}
.skill-label {
  width: 108px;
  flex-shrink: 0;
  font-family: var(--font-mono);
  font-size: 13px;
  color: var(--muted);
  padding-top: 3px;
}
.skill-items {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.skill-tag {
  padding: 5px 11px;
  background: var(--surface2);
  border: 1px solid var(--border);
  border-radius: 7px;
  font-family: var(--font-mono);
  font-size: 12.5px;
  color: var(--text);
}

/* 项目网格 */
.proj-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 14px;
}

@keyframes blink {
  0%,
  49% {
    opacity: 1;
  }
  50%,
  100% {
    opacity: 0;
  }
}

@media (max-width: 560px) {
  .hero {
    padding: 48px 0 36px;
  }
  .skill-row {
    flex-direction: column;
    gap: 8px;
  }
  .skill-label {
    width: auto;
    padding-top: 0;
  }
}
</style>
