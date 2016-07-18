class Base64Unicode {
    constructor($window) {
        'ngInject';
        this.$window = $window;
    }
    encode(str) {
        console.log(str);
        if (this.$window.btoa) {
            str = this.$window.btoa(str);
            str = str.replace(/=/, 'E5a');
            return str;
        }
        return false;
    }
    decode(str) {
        return this.$window.atob(str);
    }
}

export default Base64Unicode;
