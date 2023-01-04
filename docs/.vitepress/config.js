import { getSideBar } from 'vitepress-plugin-autobar'
module.exports = {
    title: '旋木-Blogs',
    description: 'WebGIS开发从入门到进阶，这里都有',
    lang: 'zh-CN',
    // github pages 配置
    base: '/xuanmu-blogs/',
    head: [
        // 添加图标
        ['link', { rel: 'icon', href: '/木马1.png' }]
    ],
    plugins: ['autobar'],
    themeConfig: {
        // 展示搜索框
        algolia: {
            appKey: '',
            indexName: '',
            searchParameters: {
                faeFilters: ['tags:guide,api']
            }},
            // 网站 logo
            logo: '/木马1.png',
            // 网站标题
            siteTitle: '旋木 Blog',
            // 启动页面丝滑滚动
            smoothScroll: true,
            // 社交账户链接
            socialLinks: [
                {
                    icon: {
                        svg: '<svg t="1671270414569" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2135" width="64" height="64"><path d="M512 0c282.784 0 512 229.216 512 512s-229.216 512-512 512S0 794.784 0 512 229.216 0 512 0z m189.952 752l11.2-108.224c-31.904 9.536-100.928 16.128-147.712 16.128-134.464 0-205.728-47.296-195.328-146.304 11.584-110.688 113.152-145.696 232.64-145.696 54.784 0 122.432 8.8 151.296 18.336L768 272.704C724.544 262.24 678.272 256 599.584 256c-203.2 0-388.704 94.88-406.4 263.488C178.336 660.96 303.584 768 535.616 768c80.672 0 138.464-6.432 166.336-16z" fill="#CE000D" p-id="2136"></path></svg>'
                    },
                    link: 'https://blog.csdn.net/GISShiXiSheng'
                }
            ],
            // 导航栏配置
            nav: [
               
                {
                    text: '博客',
                    link: '/blogs/'
                },
                {
                    text: '友情链接',
                    items: [
                        { text: 'CSDN', link: 'https://blog.csdn.net/' }
                    ]
                },
                {
                    text: 'GitHub',
                    link: '/blogs/'
                },
                {
                    text: 'Gitee',
                    link: '/blogs/'
                }
            ],

            // 左侧边栏配置
            sidebar: {
                 
                '/blogs/':getSideBar("./docs/blogs/",{  ignoreMDFiles : [ 'index' ] , 
                ignoreDirectory : [ 'node_modules' ]  },  "/blogs/" ),
                '/knowledge/':getSideBar("./docs/Knowledge/",{},"/Knowledge/")
            },
            
            //getSideBar("./docs"),
                
                // '/blogs/': [
                //     {
                //         text: '博客目录',
                //         collapsible: true,
                //         items: [
                //             { text: '概述', link: '/blogs/' },
                //             { text: 'WebGIS基础', link: '/blogs/basic' },
                //             { text: '项目实战', link: '/blogs/project' },
                //             { text: '高级进阶', link: '/blogs/more' },
                //             { text: 'btn', link: '/blogs/Block/Button' },

                //         ]
                //     }, {
                //         text: 'Openlayers',
                //         collapsible: true,
                //         items: [
                //             { text: 'Openlayers记录(1):聚合标记', link: '/blogs/Openlayers/Openlayers(1)' },
                //             { text: 'Openlayers记录(2):热力图', link: '/blogs/Openlayers/Openlayers(2)' },
                //             { text: 'Openlayers记录(3):标签专题图', link: '/blogs/Openlayers/Openlayers(3)' },
                //             { text: 'Openlayers记录(4):点符号设置', link: '/blogs/Openlayers/Openlayers(4)' },
                //             { text: 'Openlayers记录(5):样式编辑器', link: '/blogs/Openlayers/Openlayers(5)' },
                //             { text: 'Openlayers记录(6):模糊定位', link: '/blogs/Openlayers/Openlayers(6)' },
                //             { text: 'Openlayers记录(7):相交分析', link: '/blogs/Openlayers/Openlayers(7)' },
                //             { text: 'Openlayers记录(8):Ol+Vue', link: '/blogs/Openlayers/Openlayers(8)' },
                //         ]
                //     },
                //     {
                //         text: 'CSS',
                //         collapsible: true,
                //         items: [
                //             { text: 'CSS样式(1):页面加载进度条', link: '/blogs/CSS/css(1)' },

                //         ]
                //     },
                //     {
                //         text: '资源分享',
                //         collapsible: true,
                //         items: [
                //             { text: '地球科学数据库', link: '/blogs/ResourceShare/RS1' },

                //         ]
                //     }
                // ],
                // '/knowledge/':[],//！根据不同的路径前缀显示不同的侧边栏。 
                // '/idea/':[],

           // },

            // 右侧边栏标题
            outline: 'deep',
            outlineTitle: '章节导航',

            // 上下篇文本提示文字
            docFooter: {
                prev: '←上一篇',
                next: '下一篇→'
            },

            // 上次更新时间提示文字
            lastUpdatedText: '上次更新时间',

            // 编辑链接
            // editLink: {
            //     text: '我的博客',
            //     pattern: 'https://www.csdn.net/'
            // },

            // 页面底部
            footer: {
                message: '',
                copyright: 'Copyright © 2023 xuanmu'
            }
        }
    }