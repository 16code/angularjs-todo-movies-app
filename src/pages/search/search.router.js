function appSearchRun(RouterHelper) {
    'ngInject';
    RouterHelper.configureStates(getStates());
}

function getStates() {
    return [
        {
            state: 'root.layout.search',
            config: {
                url: '/search?type&keyword&page',
                views: {
                    'main@root': {
                        templateProvider: ['$q', ($q) => {
                            return $q((resolve) => {
                                require.ensure([], () => {
                                    resolve(require('./search.html'));
                                }, 'search');
                            });
                        }],
                        controller: 'SearchController as vm'
                    }
                },
                data: {
                    title: '搜索',
                    className: 'search'
                },
                resolve: {
                    loadModule: ['$q', '$ocLazyLoad', ($q, $ocLazyLoad) => {
                        return $q((resolve) => {
                            require.ensure([], () => {
                                $ocLazyLoad.load({name: require('./index').default});
                                resolve();
                            }, 'search');
                        });
                    }]
                }
            }
        }
    ];
}

export default angular.module('app.routes.search', [])
    .run(appSearchRun);
