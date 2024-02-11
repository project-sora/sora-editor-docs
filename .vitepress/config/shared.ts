import { defineConfig } from 'vitepress'

export const shared = defineConfig({
  title: 'Sora Editor',
  base: '/sora-editor-docs/',
  head: [['link', { rel: 'icon', href: '/sora-editor-docs/favicon.ico' }]],
  ignoreDeadLinks: true,
  lastUpdated: true,
  cleanUrls: true,

  themeConfig: {
    logo: '/logo.jpg',
    socialLinks: [
      { icon: 'github', link: 'https://github.com/Rosemoe/sora-editor' }
    ],

    search: {
      provider: 'local'
    }
  }
})
