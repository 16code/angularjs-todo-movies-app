function appMoviesRun(RouterHelper) {
    'ngInject';
    RouterHelper.configureStates(getStates());
}

function getStates() {
    return [
        {
            state: 'root.layout.movies',
            config: {
                url: '/movies?type&page',
                views: {
                    'main@root': {
                        templateProvider: ['$q', ($q) => {
                            return $q((resolve) => {
                                require.ensure([], () => {
                                    resolve(require('./movies.html'));
                                }, 'movies');
                            });
                        }],
                        controller: 'MoviesController as vm'
                    }
                },
                data: {
                    title: '电影',
                    className: 'movies'
                },
                resolve: {
                    loadModule: ['$q', '$ocLazyLoad', ($q, $ocLazyLoad) => {
                        return $q((resolve) => {
                            require.ensure([], () => {
                                $ocLazyLoad.load({name: require('./index').default});
                                resolve();
                            }, 'movies');
                        });
                    }]
                }
            }
        }
    ];
}

export default angular.module('app.routes.movies', [])
    .run(appMoviesRun);
