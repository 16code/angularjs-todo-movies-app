function appFavoritesRun(RouterHelper) {
    'ngInject';
    RouterHelper.configureStates(getStates());
}

function getStates() {
    return [
        {
            state: 'root.layout.account.favorites',
            config: {
                url: '/favorites',
                views: {
                    'main@root': {
                        templateProvider: ['$q', ($q) => {
                            return $q((resolve) => {
                                require.ensure([], () => {
                                    resolve(require('./favorites.html'));
                                }, 'favorites');
                            });
                        }],
                        controller: 'FavoritesController as vm'
                    }
                },
                data: {
                    title: '收藏夹',
                    className: 'favorites'
                },
                resolve: {
                    loadModule: ['$q', '$ocLazyLoad', ($q, $ocLazyLoad) => {
                        return $q((resolve) => {
                            require.ensure([], () => {
                                $ocLazyLoad.load({name: require('./index').default});
                                resolve();
                            }, 'favorites');
                        });
                    }]
                }
            }
        }
    ];
}

export default angular.module('app.routes.favorites', [])
    .run(appFavoritesRun);
