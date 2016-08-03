function appMoviesRun(RouterHelper) {
    'ngInject';
    RouterHelper.configureStates(getStates());
}

function getStates() {
    return [
        {
            state: 'root.layout.movies',
            config: {
                url: '/movies',
                redirectTo: {
                    state: 'root.layout.movies.popular',
                    params: {
                        page: 1
                    }
                },
                resolve: {
                    loadModule: ['$q', '$ocLazyLoad', ($q, $ocLazyLoad) => {
                        return $q(resolve => {
                            require.ensure([], () => {
                                $ocLazyLoad.load({name: require('./index').default});
                                resolve();
                            }, 'movies');
                        });
                    }]
                },
                data: {
                    title: '所有电影',
                    className: 'movies'
                }
            }
        },
        {
            state: 'root.layout.movies.now_playing',
            config: {
                url: '/now-playing?page',
                views: {
                    'main@root': {
                        templateProvider: ['$q', ($q) => {
                            return $q(resolve => {
                                require.ensure([], () => {
                                    resolve(require('./movies.html'));
                                }, 'movies');
                            });
                        }],
                        controller: 'PlayingController as vm'
                    }
                },
                data: {
                    title: '院线热播',
                    className: 'movies'
                }
            }
        },
        {
            state: 'root.layout.movies.upcoming',
            config: {
                url: '/upcoming?page',
                views: {
                    'main@root': {
                        templateProvider: ['$q', ($q) => {
                            return $q(resolve => {
                                require.ensure([], () => {
                                    resolve(require('./movies.html'));
                                }, 'movies');
                            });
                        }],
                        controller: 'UpcomingController as vm'
                    }
                },
                data: {
                    title: '即将上映',
                    className: 'movies'
                }
            }
        },
        {
            state: 'root.layout.movies.popular',
            config: {
                url: '/popular?page',
                views: {
                    'main@root': {
                        templateProvider: ['$q', ($q) => {
                            return $q(resolve => {
                                require.ensure([], () => {
                                    resolve(require('./movies.html'));
                                }, 'movies');
                            });
                        }],
                        controller: 'PopularController as vm'
                    }
                },
                data: {
                    title: '高分电影',
                    className: 'movies'
                }
            }
        }
    ];
}

export default angular.module('app.routes.movies', [])
    .run(appMoviesRun);
