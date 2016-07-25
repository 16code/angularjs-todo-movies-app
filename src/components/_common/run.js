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
            const {user: {id, username, name}, session, token} = userData;
            $rootScope.user = {id, username, name, session, token};
            $rootScope.user.avatar = userData.user.avatar.gravatar.hash;
            $rootScope.user.session = userData.session;
            $rootScope.userIsLoggedIn = userIsLoggedIn;
        }
    }
}
