import { defineConfig } from 'vitepress'

export const shared = defineConfig({
  title: 'Sora Editor',

  ignoreDeadLinks: true,
  lastUpdated: true,
  cleanUrls: true,

  themeConfig: {
    socialLinks: [
      { icon: 'github', link: 'https://github.com/Rosemoe/sora-editor' }
    ],

    search: {
      provider: 'local'
    }
  }
})
