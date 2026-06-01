---
title: 归档
aside: false
outline: false
---

# 文章归档

<script setup>
import { data as posts } from './posts.data.ts'
</script>

<ul class="archive-list">
  <li v-for="post of posts" :key="post.url">
    <a :href="post.url">{{ post.title }}</a>
    <span class="date">{{ post.date }}</span>
  </li>
</ul>
