import config from '../../../package.json'
import {type DefaultTheme, defineConfig} from 'vitepress'


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
      pattern: 'https://github.com/project-sora/sora-editor-docs/blob/main/docs/:path',
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
      link: '/guide/editor-overview',
      activeMatch: '/guide/'
    },
    {
      text: 'Reference',
      link: '/reference/xml-attributes',
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
        { text: 'Overview', link: 'editor-overview' },
        { text: 'Getting Started', link: 'getting-started' },
        { text: 'Language', link: 'using-language'},
        { text: 'Color Scheme', link: 'using-color-scheme' },
        { text: 'Events and Components', link: 'events-and-components' }
      ]
    }
  ]
}

function sidebarReference(): DefaultTheme.SidebarItem[] {
  return [
    {
      items: [
        { text: 'XML Attributes', link: 'xml-attributes' },
        { text: 'Keybindings', link: 'keybindings' }
      ]
    }
  ]
}