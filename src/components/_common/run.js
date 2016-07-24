export default function appRun($rootScope, $state, AccountApi, IMAGE_URI) {
    'ngInject';
    // IE hack
    $rootScope.isIEBrowser = /MSIE|Trident/.test(window.navigator.userAgent) ? 'ie' : 'not-ie';
    $rootScope.transparentHeader = true;
    $rootScope.image_uri = IMAGE_URI;
    $rootScope.$state = $state;
    $rootScope.appName = 'Todo Movies';
    const userIsLoggedIn = AccountApi.$isLoggedIn();
    if (userIsLoggedIn) {
        const userData = AccountApi.$getUserInfo();
        if (userData) {
            const {id, username} = userData.user;
            $rootScope.user = {id, username};
            $rootScope.user.avatar = userData.user.avatar.gravatar.hash;
            $rootScope.userIsLoggedIn = userIsLoggedIn;
        }
    }
}
