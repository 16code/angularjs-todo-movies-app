function appPersonRun(RouterHelper) {
    'ngInject';
    RouterHelper.configureStates(getStates());
}

function getStates() {
    return [
        {
            state: 'root.layout.person',
            config: {
                url: '/person?page',
                views: {
                    'main@root': {
                        templateProvider: ['$q', ($q) => {
                            return $q((resolve) => {
                                require.ensure([], () => {
                                    resolve(require('./person.html'));
                                }, 'person');
                            });
                        }],
                        controller: 'PersonController as vm'
                    }
                },
                data: {
                    title: '电影人',
                    className: 'person'
                },
                resolve: {
                    loadModule: ['$q', '$ocLazyLoad', ($q, $ocLazyLoad) => {
                        return $q((resolve) => {
                            require.ensure([], () => {
                                $ocLazyLoad.load({name: require('./index').default});
                                resolve();
                            }, 'person');
                        });
                    }]
                }
            }
        }
    ];
}

export default angular.module('app.routes.person', [])
    .run(appPersonRun);
