export default function appRun($rootScope, $state, IMAGE_URI) {
    'ngInject';
    // IE hack
    $rootScope.isIEBrowser = /MSIE|Trident/.test(window.navigator.userAgent) ? 'ie' : 'not-ie';
    $rootScope.transparentHeader = true;
    $rootScope.image_uri = IMAGE_URI;
    $rootScope.$state = $state;
    $rootScope.appName = 'Todo Movies';
}
