function appNotfoundRun(RouterHelper) {
    'ngInject';
    const otherwise = '/404';
    RouterHelper.configureStates(getStates(), otherwise);
}

function getStates() {
    return [
        {
            state: 'root.layout.notfound',
            config: {
                url: '/404',
                views: {
                    '@': {
                        template: '<not-found></not-found>'
                    }
                },
                data: {
                    title: 'Not found',
                    className: 'notfound'
                },
                resolve: {
                    loadModule: ['$q', '$ocLazyLoad', ($q, $ocLazyLoad) => {
                        return $q((resolve) => {
                            require.ensure([], () => {
                                $ocLazyLoad.load({name: require('./index').default});
                                resolve();
                            }, 'notfound');
                        });
                    }]
                }
            }
        }
    ];
}

export default angular.module('app.routes.Notfound', [])
    .run(appNotfoundRun);
