import loadingBarHtml from './loading-bar.html';
const loadingBarComponent = {
    bindings: {
        infinite: '<'
    },
    template: loadingBarHtml,
    controller: class loadingBarController {
        constructor($scope, $element, $attrs, $http, $rootScope) {
            'ngInject';
            Object.assign(this, {$scope, $element, $attrs, $http, $rootScope});
            $scope.isLoading = () => {
                return this.$http.pendingRequests.length > 0;
            };
            const loadingWatch = $scope.$watch($scope.isLoading, (v) => {
                if (v) {
                    this.hasLoading = true;
                } else {
                    this.hasLoading = false;
                }
            });
            $rootScope.$on('$stateChangeStart', (event, toState) => {
                if (toState.data && toState.data.ignoreLoadingBar) {
                    loadingWatch();
                    this.hasLoading = false;
                }
            });
        }
    },
    controllerAs: 'vm'
};
export default angular.module('app.components.loadingBar', [])
    .component('loadingBar', loadingBarComponent);
