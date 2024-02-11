import config from '../../package.json'
import { defineConfig, type DefaultTheme } from 'vitepress'


export const en = defineConfig({
  lang: 'en-US',
  description: 'sora-editor is a cool and optimized code editor on Android platform',

  themeConfig: {
    nav: nav(),

    sidebar: {
      '/reference/': { base: '/reference/', items: sidebarReference() },
      '/guide/': { base: '/guide/', items: guideReference() }
    },

    editLink: {
      pattern: 'https://github.com/project-sora/sora-editor-docs/edit/main/docs/:path',
      text: 'Edit this page on GitHub'
    },

    footer: {
      message: 'Released under the LGPL-2.1 License.',
      copyright: `Copyright © 2020-${new Date().getFullYear()} Rosemoe`
    }
  }
})

function nav(): DefaultTheme.NavItem[] {
  return [
    {
      text: 'Guide',
      link: '/guide/getting-started',
      activeMatch: '/guide/'
    },
    {
      text: 'Reference',
      link: '/reference/no-implemention',
      activeMatch: '/reference/'
    },
    {
      text: config.version,
      items: [
        {
          text: 'Changelog',
          link: 'https://github.com/Rosemoe/sora-editor/releases'
        },
        {
          text: 'Contributing',
          link: 'https://github.com/Rosemoe/sora-editor/graphs/contributors'
        }
      ]
    }
  ]
}

function guideReference(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: 'Introduction',
      collapsed: false,
      items: [
        {
          text: 'Overview',
          link: '/editor-overview'
        },
        {
          text: 'Getting Started',
          link: '/getting-started'
        }
      ]
    }
  ]
}

function sidebarReference(): DefaultTheme.SidebarItem[] {
  return [
    {
      items: [
        {
          text: 'No implemention',
          link: '/no-implemention'
        }
      ]
    }
  ]
}