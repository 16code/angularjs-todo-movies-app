class SidebarController {
    constructor() {
        this.opendItem = null;
        this.navigations = [
            {
                name: '仪表盘',
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
                        uri: 'root.layout.movies({type: "now_playing", page: 1})',
                        includeParma: 'now_playing'
                    },
                    {
                        name: '即将上映',
                        icon: 'calendar',
                        uri: 'root.layout.movies({type: "upcoming", page: 1})',
                        includeParma: 'upcoming'
                    },
                    {
                        name: '所有电影',
                        icon: 'film',
                        uri: 'root.layout.movies({type: "popular", page: 1})',
                        includeParma: 'popular'
                    },
                    {
                        name: '排行榜',
                        icon: 'trophy',
                        uri: 'root.layout.movies.billboard'
                    }
                ]
            },
            {
                name: '设置',
                icon: 'star',
                uri: 'root.layout.movies.bb',
                childs: [
                    {
                        name: '收藏夹',
                        icon: 'star',
                        uri: 'root.layout.movies.bb'
                    },
                    {
                        name: '浏览历史',
                        icon: 'chart',
                        uri: 'root.layout.movies.aa'
                    },
                    {
                        name: '设置',
                        icon: 'settings',
                        uri: 'root.layout.settings'
                    }
                ]
            }

        ];
    }
    toggleClass(index, $event) {
        if (this.opendItem === index) {
            this.opendItem = null;
        } else {
            this.opendItem = index;
        }
        angular.element($event.target.parentNode).toggleClass('active');
    }
}
export default SidebarController;
