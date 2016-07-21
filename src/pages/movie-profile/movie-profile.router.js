function apppMovieProfileRun(RouterHelper) {
    'ngInject';
    RouterHelper.configureStates(getStates());
}

function getStates() {
    return [
        {
            state: 'root.layout.movies.movieProfile',
            config: {
                url: '^/movie/{name:replaceUri}-m:id',
                views: {
                    'main@root': {
                        templateProvider: ['$q', ($q) => {
                            return $q((resolve) => {
                                require.ensure([], () => {
                                    resolve(require('./movie-profile.html'));
                                }, 'movieProfile');
                            });
                        }],
                        controller: 'MovieProfileController as vm'
                    }
                },
                data: {
                    title: '影视资料',
                    className: 'profile',
                    ignoreLoadingBar: true
                },
                resolve: {
                    loadModule: ['$q', '$ocLazyLoad', ($q, $ocLazyLoad) => {
                        return $q((resolve) => {
                            require.ensure([], () => {
                                $ocLazyLoad.load({name: require('./index').default});
                                resolve();
                            }, 'movieProfile');
                        });
                    }],
                    movieProfile: ['$q', '$stateParams', 'MoviesApi', 'ErrorHandler', ($q,
                        $stateParams, MoviesApi, ErrorHandler) => {
                        const deferred = $q.defer();
                        const errorHandler = ErrorHandler.catcher.bind(ErrorHandler);
                        if (!$stateParams.id || ($stateParams.id && isNaN(Number($stateParams.id)))) {
                            return errorHandler('ERR_REQUEST_ID');
                        }
                        $q.all({
                            profile: MoviesApi.$profile({id: $stateParams.id}),
                            credits: MoviesApi.$profile({id: $stateParams.id, type: 'credits'})
                        }).then((resp) => {
                            deferred.resolve(resp);
                        });
                        return deferred.promise;
                    }]
                }
            }
        }
    ];
}

export default angular.module('app.routes.movieProfile', [])
    .run(apppMovieProfileRun);
