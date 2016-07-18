import './movie-profile.less';

import MovieProfileController from './movie-profile.controller';
const movieProfileModule = angular.module('app.pages.moviceProfile', [])
    .controller(MovieProfileController.name, MovieProfileController);

export default movieProfileModule.name;
