import './imgload.less';
function lazyLoadDirective($timeout) {
    'ngInject';
    return {
        restrict: 'A',
        scope: {
            imgload: '@'
        },
        link: ($scope, $element) => {
            $element.bind('load', onLoad);
            $element[0].setAttribute('src', $scope.imgload);
            $scope.$on('$destroy', () => {
                $element.unbind('load');
            });
        }
    };
    function onLoad() {
        const img = this;
        const imgSrc = img.getAttribute('src');
        const imgWrapper = img.parentNode;
        img.setAttribute('img-loaded', true);
        angular.element(img).unbind('load');
        $timeout(() => {
            img.style.opacity = 0;
            imgWrapper.classList.add('loaded');
            imgWrapper.style.backgroundImage = `url(${imgSrc})`;
            img.removeAttribute('imgload');
        }, 1000);
    }
}
export default lazyLoadDirective;
