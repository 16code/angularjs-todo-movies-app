import navigations from './navigations';
class SidebarController {
    constructor() {
        this.opendItem = null;
        this.navigations = navigations;
    }
    toggleClass(index, $event) {
        if (this.opendItem === index) {
            this.opendItem = null;
        } else {
            this.opendItem = index;
        }
        angular.element($event.target.parentNode).toggleClass('active');
    }
}
export default SidebarController;
