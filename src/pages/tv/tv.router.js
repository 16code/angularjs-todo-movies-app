function appTvsRun(RouterHelper) {
    'ngInject';
    RouterHelper.configureStates(getStates());
}

function getStates() {
    return [
        {
            state: 'root.layout.tv',
            config: {
                abstract: true,
                url: '/tv',
                resolve: {
                    loadModule: ['$q', '$ocLazyLoad', ($q, $ocLazyLoad) => {
                        return $q((resolve) => {
                            require.ensure([], () => {
                                $ocLazyLoad.load({name: require('./index').default});
                                resolve();
                            }, 'tv');
                        });
                    }]
                }
            }
        },
        {
            state: 'root.layout.tv.popular',
            config: {
                url: '/popular?page',
                views: {
                    'main@root': {
                        templateProvider: ['$q', ($q) => {
                            return $q((resolve) => {
                                require.ensure([], () => {
                                    resolve(require('./tv.html'));
                                }, 'tv');
                            });
                        }],
                        controller: 'TvController as vm'
                    }
                },
                data: {
                    title: '电视',
                    className: 'tv'
                }
            }
        },
        {
            state: 'root.layout.tv.today',
            config: {
                url: '/airing-today?page',
                views: {
                    'main@root': {
                        templateProvider: ['$q', ($q) => {
                            return $q((resolve) => {
                                require.ensure([], () => {
                                    resolve(require('./tv.html'));
                                }, 'tv');
                            });
                        }],
                        controller: 'TvTodayController as vm'
                    }
                },
                data: {
                    title: '今日播出剧集',
                    className: 'tv'
                }
            }
        }
    ];
}

export default angular.module('app.routes.tv', [])
    .run(appTvsRun);
