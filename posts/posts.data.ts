import { createContentLoader } from 'vitepress'

// 文章元数据类型
export interface Post {
  title: string
  url: string
  date: string
  tags?: string[]
  description?: string
  /** 预估阅读时长(分钟,≥1)。语言无关,展示时再拼"分钟 / min"。 */
  minutes: number
}

// 由 VitePress 在构建时注入(data loader 约定)
declare const data: Post[]
export { data }

// frontmatter 里的 date(YAML 会把无引号日期解析成 Date)统一格式化为 YYYY-MM-DD。
function ymd(d: unknown): string {
  if (!d) return ''
  const date = new Date(d as string | number | Date)
  return Number.isNaN(+date) ? String(d) : date.toISOString().slice(0, 10)
}

// 中文按字符、西文按词分别估算阅读时长。
function readingMinutes(src: string): number {
  const text = src
    .replace(/^---[\s\S]*?---/, '') // 去 frontmatter
    .replace(/```[\s\S]*?```/g, '') // 去代码块
    .replace(/`[^`]*`/g, '') // 去行内代码
    .replace(/<[^>]+>/g, '') // 去 HTML 标签
  const cjk = (text.match(/[一-鿿]/g) || []).length
  const words = (text.replace(/[一-鿿]/g, ' ').match(/[A-Za-z0-9]+/g) || []).length
  return Math.max(1, Math.round(cjk / 350 + words / 200))
}

// 扫描 posts/ 下的 markdown,聚合成按日期倒序的文章列表
export default createContentLoader('posts/*.md', {
  includeSrc: true, // 需要正文原文来估算阅读时长
  transform(raw): Post[] {
    return raw
      .filter((page) => page.url !== '/posts/') // 排除归档页自身
      .map((page) => ({
        title: page.frontmatter.title ?? page.url,
        url: page.url,
        date: ymd(page.frontmatter.date),
        tags: page.frontmatter.tags,
        description: page.frontmatter.description,
        minutes: readingMinutes(page.src ?? ''),
      }))
      .sort((a, b) => +new Date(b.date) - +new Date(a.date))
  },
})
