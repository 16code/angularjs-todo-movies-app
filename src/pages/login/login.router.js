function appLoginRun(RouterHelper) {
    'ngInject';
    RouterHelper.configureStates(getStates());
}

function getStates() {
    return [
        {
            state: 'root.layout.login',
            config: {
                url: '/login?action',
                views: {
                    '@': {
                        templateProvider: ['$q', ($q) => {
                            return $q((resolve) => {
                                require.ensure([], () => {
                                    resolve(require('./login.html'));
                                }, 'login');
                            });
                        }],
                        controller: 'LoginController as vm'
                    },
                },
                data: {
                    title: '登录',
                    className: 'login'
                },
                resolve: {
                    loadModule: ['$q', '$ocLazyLoad', ($q, $ocLazyLoad) => {
                        return $q((resolve) => {
                            require.ensure([], () => {
                                $ocLazyLoad.load({name: require('./index').default});
                                resolve();
                            }, 'login');
                        });
                    }]
                }
            }
        }
    ];
}

export default angular.module('app.routes.login', [])
    .run(appLoginRun);
