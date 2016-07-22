function appSignInRun(RouterHelper) {
    'ngInject';
    RouterHelper.configureStates(getStates());
}

function getStates() {
    return [
        {
            state: 'root.layout.signin',
            config: {
                url: '/signin',
                views: {
                    '@': {
                        templateProvider: ['$q', ($q) => {
                            return $q((resolve) => {
                                require.ensure([], () => {
                                    resolve(require('./signin.html'));
                                }, 'signin');
                            });
                        }],
                        controller: 'SignInController as vm'
                    },
                },
                data: {
                    title: '登录',
                    className: 'signin'
                },
                resolve: {
                    loadModule: ['$q', '$ocLazyLoad', ($q, $ocLazyLoad) => {
                        return $q((resolve) => {
                            require.ensure([], () => {
                                $ocLazyLoad.load({name: require('./index').default});
                                resolve();
                            }, 'signin');
                        });
                    }],
                    data: () => ({12331: 'adada'})
                }
            }
        }
    ];
}

export default angular.module('app.routes.signin', [])
    .run(appSignInRun);
