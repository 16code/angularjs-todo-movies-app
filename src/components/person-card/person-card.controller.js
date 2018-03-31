class PersonCardController {
    constructor($filter) {
        'ngInject';
        this.$filter = $filter;
    }
    $onInit() {
        this.popularity = this.$filter('voteFilter')(this.person.popularity);
    }
}
export default PersonCardController;
