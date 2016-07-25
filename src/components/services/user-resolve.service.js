class ResolveService {
    login($q, AccountApi) {
        'ngInject';
        const isLoggedIn = AccountApi.$isLoggedIn();
        if (!isLoggedIn) {
            return $q.reject('requireLogin');
        }
        return true;
    }
}
export default ResolveService;
