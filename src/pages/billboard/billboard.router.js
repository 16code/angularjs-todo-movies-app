function appBillboardRun(RouterHelper) {
    'ngInject';
    RouterHelper.configureStates(getStates());
}

function getStates() {
    return [
        {
            state: 'root.layout.movies.billboard',
            config: {
                url: '^/movies/billboard',
                views: {
                    'main@root': {
                        templateProvider: ['$q', ($q) => {
                            return $q((resolve) => {
                                require.ensure([], () => {
                                    resolve(require('./billboard.html'));
                                }, 'billboard');
                            });
                        }],
                        controller: 'BillboardController as vm'
                    }
                },
                data: {
                    title: '电影排行榜',
                    className: 'billboard'
                },
                resolve: {
                    loadModule: ['$q', '$ocLazyLoad', ($q, $ocLazyLoad) => {
                        return $q((resolve) => {
                            require.ensure([], () => {
                                $ocLazyLoad.load({name: require('./index').default});
                                resolve();
                            }, 'billboard');
                        });
                    }]
                }
            }
        }
    ];
}

export default angular.module('app.routes.billboard', [])
    .run(appBillboardRun);
