import config from '../../package.json'
import { defineConfig, type DefaultTheme } from 'vitepress'

export const ja = defineConfig({
  lang: 'ja',
  description: 'sora-editor は効率的な Android コードエディターです',

  themeConfig: {
    nav: nav(),

    sidebar: {
      '/ja/reference/': { base: '/ja/reference/', items: sidebarReference() },
      '/ja/guide/': { base: '/ja/guide/', items: guideReference() }
    },

    editLink: {
      pattern: 'https://github.com/project-sora/sora-editor-docs/edit/main/docs/:path',
      text: 'GitHub でこのページを編集する'
    },

    footer: {
      message: 'LGPL-2.1 ライセンスに基づいてリリース',
      copyright: `著作権 © 2020-${new Date().getFullYear()} Rosemoe`
    },

    docFooter: {
      prev: '前のページ',
      next: '次のページ'
    },

    outline: {
      label: 'ナビゲーション'
    },

    lastUpdated: {
      text: '最終更新日',
      formatOptions: {
        dateStyle: 'short',
        timeStyle: 'medium'
      }
    },

    langMenuLabel: '言語',
    returnToTopLabel: 'トップに戻る',
    sidebarMenuLabel: 'メニュー',
    darkModeSwitchLabel: 'テーマ',
    lightModeSwitchTitle: 'ライトモードに切り替える',
    darkModeSwitchTitle: 'ダークモードに切り替える'
  }
})

function nav(): DefaultTheme.NavItem[] {
  return [
    {
      text: 'ガイド',
      link: '/ja/guide/getting-started',
      activeMatch: '/ja/guide/'
    },
    {
      text: '参考',
      link: '/ja/reference/no-implemention',
      activeMatch: '/ja/reference/'
    },
    {
      text: config.version,
      items: [
        {
          text: 'リリース',
          link: 'https://github.com/Rosemoe/sora-editor/releases'
        },
        {
          text: '贡献者',
          link: 'https://github.com/Rosemoe/sora-editor/graphs/contributors'
        }
      ]
    }
  ]
}

function guideReference(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: '概要と開始方法',
      collapsed: false,
      items: [
        {
          text: 'クイックスタート',
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