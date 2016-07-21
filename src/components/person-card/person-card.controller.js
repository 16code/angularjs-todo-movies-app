class PersonCardController {
    constructor($filter) {
        'ngInject';
        this.popularity = $filter('voteFilter')(this.person.popularity);
    }
}
export default PersonCardController;
