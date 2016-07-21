export default [
    {
        name: '首页',
        icon: 'speedometer',
        uri: 'root.layout.home'
    },
    {
        name: '电影',
        icon: 'grid',
        uri: 'root.layout.movies',
        includeParma: 'root.layout.movies',
        childs: [
            {
                name: '院线热播',
                icon: 'fire',
                uri: 'root.layout.movies.now_playing'
            },
            {
                name: '即将上映',
                icon: 'calendar',
                uri: 'root.layout.movies.upcoming'
            },
            {
                name: '高分电影',
                icon: 'film',
                uri: 'root.layout.movies.popular'
            },
            {
                name: '排行榜',
                icon: 'trophy',
                uri: 'root.layout.movies.billboard'
            }
        ]
    },
    {
        name: '电视',
        icon: 'social-youtube',
        uri: 'root.layout.tv',
        includeParma: 'root.layout.tv.*',
        childs: [
            {
                name: '今日播出',
                uri: 'root.layout.tv.today'
            },
            {
                name: '热门剧集',
                uri: 'root.layout.tv.popular'
            }
        ]
    },
    {
        name: '电影人',
        icon: 'people',
        uri: 'root.layout.person',
        includeParma: 'root.layout.person.*'
    },
    {
        name: '收藏夹',
        icon: 'star',
        uri: 'root.layout.notfound'
    },
    {
        name: '设置',
        icon: 'settings',
        uri: 'root.layout.notfound'
    }
];
