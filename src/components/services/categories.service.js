class CategoryService {
    constructor($q, $timeout) {
        'ngInject';
        Object.assign(this, {$q, $timeout});
    }
    $get() {
        const deferred = this.$q.defer();
        const categories = [
            {
                name: '包包',
                thumbnail: 'bag',
                router: 'root.layout.home'
            },
            {
                name: '礼服',
                thumbnail: 'dress',
                router: 'root.layout.home'
            },
            {
                name: '眼镜',
                thumbnail: 'glasses',
                router: 'root.layout.home'
            },
            {
                name: 'POLO衫',
                thumbnail: 'polo',
                router: 'root.layout.home'
            },
            {
                name: 'T恤(男)',
                thumbnail: 'shirt',
                router: 'root.layout.home'
            },
            {
                name: '裙子',
                thumbnail: 'skirt',
                router: 'root.layout.home'
            },
            {
                name: '袜子',
                thumbnail: 'sock',
                router: 'root.layout.home'
            },
            {
                name: '裤子',
                thumbnail: 'trousers',
                router: 'root.layout.home'
            },
            {
                name: '背心',
                thumbnail: 'vest',
                router: 'root.layout.home'
            },
            {
                name: 'T恤(女)',
                thumbnail: 'women',
                router: 'root.layout.home'
            },
        ];
        this.$timeout(() => {
            deferred.resolve(categories);
        });
        return deferred.promise;
    }
}
export default CategoryService;
