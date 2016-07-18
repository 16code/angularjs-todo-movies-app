function HttpInterceptor($q, API_KEY) {
    'ngInject';
    return {
        request(config) {
            if (angular.isObject(config)) {
                config.timeout = 5000;
                config.params = config.params || {};
                const defaultLang = config.params.language || 'zh';
                config.params.api_key = API_KEY;
                config.params.language = defaultLang;
            }
            return config || $q.when(config);
        },
        requestError(rejection) {
            // do something on error
            console.log('requestError');
            return $q.reject(rejection);
        },
        response(response) {
            // do something on success
            return response;
        },
        responseError(rejection) {
            // do something on error
            rejection = rejection || {};
            const statusCode = Number(rejection.status);
            console.log(statusCode);
            switch (statusCode) {
                case 401:
                    rejection.code = 'Required_Login';
                    break;
                case 403:
                    rejection.code = 'Uncommitted';
                    break;
                case 404:
                    rejection.code = 'Not_Found';
                    break;
                case 408:
                case -1:
                    rejection.code = 'Timeout';
                    break;
                case /^50+[0-9]/.test(rejection.status):
                    rejection.code = 'Server_Error';
                    break;
                default:
                    rejection.code = 'Unknown_Error';
            }
            return $q.reject(rejection);
        }
    };
}
export default HttpInterceptor;
