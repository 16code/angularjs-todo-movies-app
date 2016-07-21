import './404.less';
import NotfoundHtml from './404.html';
const NotfoundComponent = {
    bindings: true,
    template: NotfoundHtml,
    controller: class Notfound {
        constructor($scope, $element, $document, $state, $rootScope) {
            'ngInject';
            Object.assign(this, {$scope, $element, $document, $state, $rootScope});
            this.messages = [];
            this.prevUri = $state.href($rootScope.prev.state, $rootScope.prev.params);
        }
        activate($event) {
            if ($event.which === 13 && this.input !== '') {
                this.wait = true;
                if (this.input.indexOf('state --list') !== -1) {
                    const stateList = this.$state.get();
                    const newAyy = [];
                    for (const s of stateList) {
                        if (!s.abstract) {
                            newAyy.push(`${s.name.replace('root.layout.', '')}`);
                        }
                    }
                    const str = newAyy.slice(0, 7).join(',  ');

                    this.messages.push(`States: ${str}`);
                    this.input = '';
                    return;
                }
                const uri = `root.layout.${this.input}`;
                try {
                    this.go(uri);
                } catch (e) {
                    this.error(e);
                }
                this.input = '';
            } else if (event.which === 37) {
                event.preventDefault();
            }
        }
        go(uri) {
            this.wait = true;
            this.$state.go(uri);
        }
        error(e) {
            this.messages.push(e.toString().replace('root.layout.', ''));
            this.wait = false;
        }
    },
    controllerAs: 'vm',
};
export default angular.module('app.components.Notfound', [])
    .component('notFound', NotfoundComponent);
