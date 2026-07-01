// 作品集数据 —— 终端风个人站的唯一数据源(中英双语)。
// 想改内容只动这里;展示样式见 ../components/Portfolio*.vue 与 SiteNav/SiteFooter。

export type Lang = 'zh' | 'en'

/** 可双语文本:中英一致用 string,需区分则给 { zh, en }。 */
export type I18nText = string | { zh: string; en: string }

/** 按当前语言取出文本。 */
export function t(v: I18nText, lang: Lang): string {
  return typeof v === 'string' ? v : v[lang]
}

export interface SkillGroup {
  label: I18nText
  items: I18nText[]
}
export interface Project {
  name: I18nText
  year: string
  stack: I18nText[]
  desc: I18nText
  repo: string
}
export interface SocialLink {
  label: I18nText
  href: string
  /** 外链(新标签打开并显示 ↗);内部路由留空。 */
  external?: boolean
}

/** 顶栏 / 页脚 / 各页面标题等界面文案。 */
export const ui = {
  nav_home: { zh: '首页', en: 'home' },
  nav_proj: { zh: '项目', en: 'projects' },
  nav_blog: { zh: '博客', en: 'blog' },
  proj_title: { zh: '项目', en: 'Projects' },
  blog_title: { zh: '博客', en: 'Blog' },
  skills_title: { zh: '技术栈', en: 'tech stack' },
  view_all_projects: { zh: '全部项目', en: 'all projects' },
  view_all_posts: { zh: '全部文章', en: 'all posts' },
  proj_intro: { zh: '一些公开与示例项目。', en: 'A selection of public & sample projects.' },
  blog_intro: {
    zh: '关于机器人、系统与高性能代码的笔记。',
    en: 'Notes on robotics, systems and high-performance code.',
  },
  footer_built: { zh: '用心构建', en: 'built with care' },
  read_suffix: { zh: '分钟', en: 'min' },
  empty_posts: { zh: '还没有文章。', en: 'No posts yet.' },
} satisfies Record<string, I18nText>

/** 个人基本信息(hero 区)。 */
export const profile = {
  name: 'loosqk',
  role: { zh: '机器人软件工程师', en: 'Robotics Software Engineer' },
  bio: {
    zh: '10 年 C++ / Rust 开发经验,专注机器人系统与高性能软件,熟悉 ROS 2 与实时控制。追求代码的可读性、可移植性与性能。',
    en: '10 years of C++ / Rust experience focused on robotics systems and high-performance software. Fluent in ROS 2 and real-time control, obsessed with code that is readable, portable and fast.',
  },
  location: { zh: '中国', en: 'China' },
  available: { zh: '开放远程 / 合作机会', en: 'Open to remote & collaboration' },
}

/** hero 下方社交按钮。Blog 指向站内归档,GitHub/Email 为外链。 */
export const socials: SocialLink[] = [
  { label: 'GitHub', href: 'https://github.com/arxxyr', external: true },
  { label: 'Email', href: 'mailto:loosqk@gmail.com' },
  { label: 'Blog', href: '/posts/' },
]

/** 仿终端窗口内容(以 profile.json / uname 形式展示,固定英文,偏代码风)。 */
export const terminal = {
  host: 'loosqk@robotics',
  title: 'loosqk@robotics — ~',
  profile: {
    role: 'Robotics Software Engineer',
    experience: '10 years · C++ / Rust',
    focus: 'ROS 2 · real-time · motion control',
  },
  uname: 'Linux · ROS 2 Humble · PREEMPT_RT · Docker',
}

export const skills: SkillGroup[] = [
  { label: { zh: '语言', en: 'Languages' }, items: ['C++ (C++20)', 'Rust', 'Python'] },
  {
    label: { zh: '机器人', en: 'Robotics' },
    items: ['ROS 2 (Humble)', { zh: '行为树', en: 'Behavior Trees' }, 'SLAM', { zh: '运动控制', en: 'Motion Control' }, 'Dora-rs'],
  },
  {
    label: { zh: '系统', en: 'Systems' },
    items: ['Linux', { zh: '实时系统 (RT)', en: 'Real-Time (RT)' }, { zh: '多线程 / 并发', en: 'Concurrency' }],
  },
  { label: { zh: '工具链', en: 'Toolchain' }, items: ['CMake', 'Git', 'Docker', 'Bevy ECS'] },
]

export const projects: Project[] = [
  {
    name: { zh: '自主导航机器人', en: 'Autonomous Navigation Robot' },
    year: '2025',
    stack: ['C++', 'ROS 2', { zh: '行为树', en: 'Behavior Trees' }],
    repo: 'https://github.com/arxxyr',
    desc: {
      zh: '基于 ROS 2 的自主导航与避障系统,涵盖建图、定位与路径规划。',
      en: 'Autonomous navigation and obstacle avoidance on ROS 2 — mapping, localization and path planning.',
    },
  },
  {
    name: { zh: 'Rust ↔ C++ FFI 中间件', en: 'Rust ↔ C++ FFI Middleware' },
    year: '2024',
    stack: ['Rust', 'C++', 'CMake'],
    repo: 'https://github.com/arxxyr',
    desc: {
      zh: '三明治架构的 FFI 中间件,内置可观测性(tracing / metrics / 报警)。',
      en: 'Sandwich-architecture FFI middleware with built-in observability (tracing / metrics / alerts).',
    },
  },
  {
    name: { zh: 'PREEMPT_RT 运动控制栈', en: 'PREEMPT_RT Motion Stack' },
    year: '2024',
    stack: ['Linux', 'C++', 'RT'],
    repo: 'https://github.com/arxxyr',
    desc: {
      zh: '面向运动控制的实时 Linux 调优与控制环实现,把延迟压到微秒级。',
      en: 'Real-time Linux tuning and control-loop implementation for motion control, pushing latency to microseconds.',
    },
  },
]

/** 首页"精选项目"取前 N 个。 */
export const FEATURED_COUNT = 2
/** 首页"最新文章"取前 N 篇。 */
export const RECENT_COUNT = 3
