function appTagRun(RouterHelper) {
    'ngInject';
    RouterHelper.configureStates(getStates());
}

function getStates() {
    return [
        {
            state: 'root.layout.tag',
            config: {
                url: '/tag/{id:int}-{name: replaceUri}',
                views: {
                    'main@root': {
                        templateProvider: ['$q', ($q) => {
                            return $q((resolve) => {
                                require.ensure([], () => {
                                    resolve(require('./tag.html'));
                                }, 'tag');
                            });
                        }],
                        controller: 'TagController as vm'
                    }
                },
                data: {
                    title: '标签',
                    className: 'tag'
                },
                resolve: {
                    loadModule: ['$q', '$ocLazyLoad', ($q, $ocLazyLoad) => {
                        return $q((resolve) => {
                            require.ensure([], () => {
                                $ocLazyLoad.load({name: require('./index').default});
                                resolve();
                            }, 'tag');
                        });
                    }]
                }
            }
        }
    ];
}

export default angular.module('app.routes.tag', [])
    .run(appTagRun);
