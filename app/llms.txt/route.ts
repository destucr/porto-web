import { getPosts, getProjects, getBooks } from '@/lib/content'

export async function GET() {
  const posts = await getPosts()
  const projects = await getProjects()
  const books = await getBooks()
  const baseUrl = 'https://destucikal.site'

  const content = [
    '# Destu Cikal | iOS & Full-stack Developer',
    '',
    'Technical portfolio showcasing native iOS engineering, full-stack systems, and machine learning projects.',
    '',
    '## Core Skills',
    '- iOS Development (Swift, SwiftUI, UIKit)',
    '- Full-stack Systems (Node.js, Next.js, Go)',
    '- Machine Learning (Create ML, Computer Vision)',
    '',
    '## Main Sections',
    `- Projects: ${baseUrl}/projects`,
    `- Engineering Blog: ${baseUrl}/blog`,
    `- Reading List: ${baseUrl}/books`,
    '',
    '## Projects',
    ...projects.map(p => `- [${p.title}](${baseUrl}/projects/${p.slug}): ${p.description}`),
    '',
    '## Blog Posts',
    ...posts.map(p => `- [${p.title}](${baseUrl}/blog/${p.slug}): ${p.excerpt}`),
    '',
    '## Recommended Books',
    ...books.map(b => `- ${b.title} by ${b.author}`),
    '',
    '## Contact & Socials',
    '- LinkedIn: https://linkedin.com/in/destucikal',
    '- GitHub: https://github.com/destucr',
    '- Email: destucr@gmail.com'
  ].join('\n')

  return new Response(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  })
}