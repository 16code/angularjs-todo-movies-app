function appHomeRun(RouterHelper) {
    'ngInject';
    RouterHelper.configureStates(getStates());
}

function getStates() {
    return [
        {
            state: 'root.layout.home',
            config: {
                url: '/',
                views: {
                    'main@root': {
                        templateProvider: ['$q', ($q) => {
                            return $q((resolve) => {
                                require.ensure([], () => {
                                    resolve(require('./home.html'));
                                }, 'home');
                            });
                        }],
                        controller: 'HomeController as vm'
                    }
                },
                data: {
                    title: 'Home',
                    className: 'home'
                },
                resolve: {
                    loadModule: ['$q', '$ocLazyLoad', ($q, $ocLazyLoad) => {
                        return $q((resolve) => {
                            require.ensure([], () => {
                                $ocLazyLoad.load({name: require('./index').default});
                                resolve();
                            }, 'home');
                        });
                    }]
                }
            }
        }
    ];
}

export default angular.module('app.routes.home', [])
    .run(appHomeRun);
