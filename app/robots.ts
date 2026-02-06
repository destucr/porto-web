import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
      },
      {
        userAgent: [
          'GPTBot', 
          'ChatGPT-User', 
          'Google-Extended', 
          'ClaudeBot', 
          'Amazonbot', 
          'Applebot-Extended', 
          'Bytespider', 
          'CCBot', 
          'meta-externalagent'
        ],
        disallow: '/',
      },
    ],
    sitemap: 'https://destucikal.site/sitemap.xml',
  }
}
