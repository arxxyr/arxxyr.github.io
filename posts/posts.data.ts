import { createContentLoader } from 'vitepress'

// 文章元数据类型
export interface Post {
  title: string
  url: string
  date: string
  tags?: string[]
  description?: string
}

// 由 VitePress 在构建时注入(data loader 约定)
declare const data: Post[]
export { data }

// 扫描 posts/ 下的 markdown,聚合成按日期倒序的文章列表
export default createContentLoader('posts/*.md', {
  transform(raw): Post[] {
    return raw
      .filter((page) => page.url !== '/posts/') // 排除归档页自身
      .map((page) => ({
        title: page.frontmatter.title ?? page.url,
        url: page.url,
        date: page.frontmatter.date ?? '',
        tags: page.frontmatter.tags,
        description: page.frontmatter.description,
      }))
      .sort((a, b) => +new Date(b.date) - +new Date(a.date))
  },
})
