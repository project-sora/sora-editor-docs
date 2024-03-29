import config from '../../../package.json'
import {type DefaultTheme, defineConfig} from 'vitepress'

export const zh = defineConfig({
  lang: 'zh-Hans',
  description: 'sora-editor是一款高效的安卓代码编辑器',

  themeConfig: {
    nav: nav(),

    sidebar: {
      '/zh/reference/': { base: '/zh/reference/', items: sidebarReference() },
      '/zh/guide/': { base: '/zh/guide/', items: guideReference() }
    },

    editLink: {
      pattern: 'https://github.com/project-sora/sora-editor-docs/blob/main/docs/:path',
      text: '在 GitHub 上编辑此页面'
    },

    footer: {
      message: '基于 LGPL-2.1 许可发布',
      copyright: `版权所有 © 2020-${new Date().getFullYear()} Rosemoe`
    },

    docFooter: {
      prev: '上一页',
      next: '下一页'
    },

    outline: {
      label: '页面导航'
    },

    lastUpdated: {
      text: '最后更新于',
      formatOptions: {
        dateStyle: 'short',
        timeStyle: 'medium'
      }
    },

    langMenuLabel: '多语言',
    returnToTopLabel: '回到顶部',
    sidebarMenuLabel: '菜单',
    darkModeSwitchLabel: '主题',
    lightModeSwitchTitle: '切换到浅色模式',
    darkModeSwitchTitle: '切换到深色模式'
  }
})

function nav(): DefaultTheme.NavItem[] {
  return [
    {
      text: '指南',
      link: '/zh/guide/editor-overview',
      activeMatch: '/zh/guide/'
    },
    {
      text: '参考',
      link: '/zh/reference/xml-attributes',
      activeMatch: '/zh/reference/'
    },
    {
      text: config.version,
      items: [
        {
          text: '更新日志',
          link: 'https://github.com/Rosemoe/sora-editor/releases'
        },
        {
          text: '参与贡献',
          link: 'https://github.com/Rosemoe/sora-editor/graphs/contributors'
        }
      ]
    }
  ]
}

function guideReference(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: '简介与入门',
      collapsed: false,
      items: [
        { text: '概述', link: 'editor-overview' },
        { text: '快速开始', link: 'getting-started' },
        { text: '语言支持', link: 'using-language' },
        { text: '配色方案', link: 'using-color-scheme' },
        { text: '事件和组件', link: 'events-and-components' }
      ]
    },
    {
      text: 'Jetpack Compose',
      collapsed: false,
      items: [
        { text: '在Compose中使用代码编辑器', link: 'code-editor-in-compose'}
      ]
    },
  ]
}

function sidebarReference(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: '参考',
      items: [
        { text: 'XML属性', link: 'xml-attributes' },
        { text: '快捷键', link: 'keybindings' }
      ]
    }
  ]
}