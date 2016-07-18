const AppConstants = {
    MOIVES_API_KEY: __MOIVES_API_KEY__, // eslint-disable-line no-undef
    API_HOST: __API_HOST__, // eslint-disable-line no-undef
    IMAGE_URI: __IMAGE_URI__ // eslint-disable-line no-undef
};

export default angular.module('api.components.constantConfig', [])
    .constant('API', AppConstants.API_HOST)
    .constant('API_KEY', AppConstants.MOIVES_API_KEY)
    .constant('IMAGE_URI', AppConstants.IMAGE_URI);
