function appPersonProfileRun(RouterHelper) {
    'ngInject';
    RouterHelper.configureStates(getStates());
}

function getStates() {
    return [
        {
            state: 'root.layout.person.profile',
            config: {
                url: '^/person/{name:replaceUri}-p:id',
                views: {
                    'main@root': {
                        templateProvider: ['$q', ($q) => {
                            return $q((resolve) => {
                                require.ensure([], () => {
                                    resolve(require('./person-profile.html'));
                                }, 'Profile');
                            });
                        }],
                        controller: 'PersonProfileController as vm'
                    }
                },
                data: {
                    title: '电影人资料',
                    className: 'person-profile'
                },
                resolve: {
                    loadModule: ['$q', '$ocLazyLoad', ($q, $ocLazyLoad) => {
                        return $q((resolve) => {
                            require.ensure([], () => {
                                $ocLazyLoad.load({name: require('./index').default});
                                resolve();
                            }, 'personProfile');
                        });
                    }],
                    personProfile: ['$q', '$stateParams', 'PersonApi', 'ErrorHandler',
                        ($q, $stateParams, PersonApi, ErrorHandler) => {
                            const errorHandler = ErrorHandler.catcher.bind(ErrorHandler);
                            if (!$stateParams.id || ($stateParams.id && isNaN(Number($stateParams.id)))) {
                                return errorHandler('ERR_REQUEST_ID');
                            }
                            return $q((resolve) => {
                                PersonApi.$profile({type: $stateParams.id}).then((resp) => {
                                    resolve(resp);
                                });
                            });
                        }]
                }
            }
        }
    ];
}

export default angular.module('app.routes.personProfile', [])
    .run(appPersonProfileRun);
