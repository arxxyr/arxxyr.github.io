// 个人介绍数据 —— 改这里即可,样式见 ../components/Resume.vue
// 如需补充"工作经历 / 教育",在 ResumeData 加 experience / education 字段,
// 并在 Resume.vue 增加对应 section(本版按需先省略)。

export interface Contact {
  label: string
  value: string
  href: string
}
export interface SkillGroup {
  group: string
  items: string[]
}
export interface Project {
  name: string
  stack: string
  desc: string
  link?: string
}
export interface ResumeData {
  name: string
  headline: string
  location: string
  contacts: Contact[]
  about: string
  skills: SkillGroup[]
  projects: Project[]
}

export const resume: ResumeData = {
  name: 'loosqk',
  headline: '机器人软件工程师 · Robotics Software Engineer',
  location: '中国',
  contacts: [
    { label: 'GitHub', value: 'arxxyr', href: 'https://github.com/arxxyr' },
    { label: 'Email', value: 'loosqk@gmail.com', href: 'mailto:loosqk@gmail.com' },
    { label: 'Blog', value: 'arxxyr.github.io', href: 'https://arxxyr.github.io' },
  ],
  about:
    '9 年 C++ / Rust 开发经验,专注机器人系统与高性能软件,熟悉 ROS 2 与实时控制。追求代码的可读性、可移植性与性能。',
  skills: [
    { group: '语言', items: ['C++ (C++20)', 'Rust', 'Python'] },
    { group: '机器人', items: ['ROS 2 (Humble)', '行为树', 'SLAM', '运动控制', 'Dora-rs'] },
    { group: '系统', items: ['Linux', '实时系统 (RT)', '多线程 / 并发'] },
    { group: '工具链', items: ['CMake', 'Git', 'Docker', 'Bevy ECS'] },
  ],
  projects: [
    {
      name: '示例项目:自主导航机器人',
      stack: 'C++ · ROS 2 · 行为树',
      desc: '基于 ROS 2 的自主导航与避障系统,含建图、定位与路径规划(示例描述,请替换)。',
    },
    {
      name: '示例项目:Rust ↔ C++ FFI 中间件',
      stack: 'Rust · C++ · CMake',
      desc: '三明治架构的 FFI 中间件,带可观测性(tracing / metrics / 报警)(示例描述,请替换)。',
      link: 'https://github.com/arxxyr',
    },
  ],
}
