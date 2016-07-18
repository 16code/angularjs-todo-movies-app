class ScrollCoordEvent {
    constructor($window, $document) {
        'ngInject';
        Object.assign(this, {$window, $document});
    }
    $offsetTop() {
        const win = this.$window;
        const doc = this.$document[0];
        const pageHeight = Math.max(doc.body.scrollHeight, doc.body.offsetHeight);
        const viewportHeight = win.innerHeight || doc.documentElement.clientHeight || doc.body.clientHeight;
        const scrollHeight = win.pageYOffset || doc.documentElement.scrollTop || doc.body.scrollTop;
        return pageHeight - viewportHeight - scrollHeight;
    }
}

export default ScrollCoordEvent;
