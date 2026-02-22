import { defineConfig, DefaultTheme } from 'vitepress'
import { tasklist } from '@mdit/plugin-tasklist'
import { configureDiagramsPlugin } from 'vitepress-plugin-diagrams'
import markmapPlugin from '@vitepress-plugin/markmap'
// import markdownItInclude from 'markdown-it-include';
// @ts-ignore
import includeAndFixImages from 'vitepress-include-plugin'
import { generateSidebar } from 'vitepress-sidebar';

const processSidebarItems = (items: any[]): DefaultTheme.SidebarItem[] => 
  items.map(item => ({
    ...item,
    link: item.link?.startsWith('/') ? item.link : `/${item.link}`,
    items: item.items ? processSidebarItems(item.items) : undefined
  }));

// // TODO: 不尽人意，页面的 Footer不对， 算了， 先这样吧
// var x = generateSidebar({
//   documentRootPath: '/',
//   scanStartPath: '/development',
//   basePath: '/development/',
//   resolvePath: '/development/', 
//   useTitleFromFileHeading: true,
//   sortMenusByFrontmatterDate: true,
//   sortMenusOrderByDescending: true,
//   excludeFilesByFrontmatterFieldName: 'hide',
// })
// console.log(JSON.stringify(x, null, 4) );
// .map(item => ({
//   ...item,
//   link: item.link.startsWith('/') ? item.link : `/${item.link}`
// })));

// https://vitepress.dev/reference/site-config
export default defineConfig({
  locales: {
    root: {
      label: '中文',
      lang: 'zh-CN',
      themeConfig: {
        footer: {
          message: '基于 MIT 许可发布',
          copyright: '版权所有 © 2010-至今 upidea.com'
        },
        docFooter: {
          prev: '上一页',
          next: '下一页'
        },
        outline: {
          label: '页面导航'
        },
        lastUpdated: {
          text: '最后更新于'
        },
        langMenuLabel: '多语言',
        returnToTopLabel: '回到顶部',
        sidebarMenuLabel: '菜单',
        skipToContentLabel: '跳转到内容',
        nav: [
          // { text: '首页', link: '/' },
          { text: '项目清单', link: '/projects' },
          { text: '更新纪要', link: '/changelog' },
          { text: '开发随记', link: '/development/' }
        ],
        // sidebar: [
        //   {
        //     text: '开发笔记',
        //     items: [
        //       { text: '开发随手纪要', link: '/development' },
        //       { text: 'Tiled地图解析思路', link: '/development/Tiled地图解析思路' },
        //       { text: '转成网页游戏的过程', link: '/development/WebAssembly_Porting_Tutorial' }
        //     ]
        //   }
        // ],        
        sidebar: [
          ...[
            { text: '更新纪要', link: '/changelog' },
            {
              text: '开发随记',
              link: '/development/',
              items: processSidebarItems(generateSidebar({
                documentRootPath: '/',
                scanStartPath: '/development',
                basePath: '/development/',
                resolvePath: '/development/', 
                useTitleFromFileHeading: true,
                sortMenusByFrontmatterDate: true,
                sortMenusOrderByDescending: true,
                excludeFilesByFrontmatterFieldName: 'hide',
              }) as any[]),
            }
          ],
          // ...(generateSidebar({
          //   documentRootPath: '',
          //   scanStartPath: '/development',
          //   basePath: '/development/',
          //   // resolvePath: '/development/', 
          //   useTitleFromFileHeading: true
          // }) as any[])
        ],
        // sidebar: [
        //   {
        //     text: '开发随记',
        //     items: (generateSidebar({
        //       documentRootPath: '/',
        //       scanStartPath: '/development',
        //       basePath: '/development/',
        //       resolvePath: '/development/', 
        //       useTitleFromFileHeading: true,
        //       sortMenusByFrontmatterDate: true,
        //       sortMenusOrderByDescending: true,
        //       excludeFilesByFrontmatterFieldName: 'hide',
        //     }) as any[]).map(item => ({
        //       ...item,
        //       link: item.link.startsWith('/') ? item.link : `/${item.link}`
        //     })),
        //   }
        // ],
        socialLinks: [
          { icon: 'github', link: 'https://github.com/upidea/' }
        ]
      }
    },
    // en: {
    //   label: 'English',
    //   lang: 'en-US'
    // }
  },
  base: "/",
  title: "me.upidea.com",
  vite: {
    plugins: [
      markmapPlugin({
        width: '100%',
        height: '500px'
      }),
      includeAndFixImages()
    ]
  },
  markdown: {
    config: (md) => {
      md.use(tasklist).use(configureDiagramsPlugin, {
        diagramsDir: "public/diagrams",
        publicPath: "/diagrams",
        krokiServerUrl: "https://kroki.io",
        // excludeDiagramTypes: ["mermaid"],`
      });
    }
  }
})
