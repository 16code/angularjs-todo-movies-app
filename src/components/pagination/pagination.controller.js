class PaginationController {
    constructor($scope, $element, $attrs) {
        'ngInject';
        Object.assign(this, {
            $scope,
            $element,
            $attrs
        });
        // 定义分页的长度必须为奇数 (default:9)
        this.config.pagesLength = Number(this.config.pagesLength) || 9;
        if (this.config.pagesLength % 2 === 0) {
            // 如果不是奇数的时候处理一下
            this.config.pagesLength = this.config.pagesLength - 1;
        }
        this.$scope.$watch(() => {
            this.config.totalItems = this.config.totalItems || 0;
            const newValue =
                `${this.config.totalItems} ${this.config.currentPage} ${this.config.itemsPerPage}`;
            return newValue;
        }, getPagination);
        const self = this;
        /* eslint complexity: ["error", 14]*/
        function getPagination(newValue, oldValue) {
            // conf.currentPage
            self.config.currentPage = parseInt(self.config.currentPage, 10) || 1;
            // conf.totalItems
            self.config.totalItems = parseInt(self.config.totalItems, 10) || 0;
            // conf.itemsPerPage (default:15)
            self.config.itemsPerPage = parseInt(self.config.itemsPerPage, 10) || 15;
            // numberOfPages
            self.config.numberOfPages = Math.ceil(self.config.totalItems / self.config.itemsPerPage);
            // 如果分页总数>0，并且当前页大于分页总数
            if (self.config.numberOfPages > 0 && (self.config.currentPage > self.config.numberOfPages)) {
                self.config.currentPage = self.config.numberOfPages;
            }
            self.pageList = [];
            if (self.config.numberOfPages <= self.config.pagesLength) {
                // 判断总页数如果小于等于分页的长度，若小于则直接显示
                for (let i = 1; i <= self.config.numberOfPages; i++) {
                    self.pageList.push(i);
                }
            } else {
                // 总页数大于分页长度（此时分为三种情况：1.左边没有...2.右边没有...3.左右都有...）
                // 计算中心偏移量
                const offset = (self.config.pagesLength - 1) / 2;
                if (self.config.currentPage <= offset) {
                    // 左边没有...
                    for (let i = 1; i <= offset + 1; i++) {
                        self.pageList.push(i);
                    }
                    self.pageList.push('...');
                    self.pageList.push(self.config.numberOfPages);
                } else if (self.config.currentPage > self.config.numberOfPages - offset) {
                    self.pageList.push(1);
                    self.pageList.push('...');
                    for (let i = offset + 1; i >= 1; i--) {
                        self.pageList.push(self.config.numberOfPages - i);
                    }
                    self.pageList.push(self.config.numberOfPages);
                } else {
                    // 最后一种情况，两边都有...
                    self.pageList.push(1);
                    self.pageList.push('...');
                    for (let i = Math.ceil(offset / 2); i >= 1; i--) {
                        self.pageList.push(self.config.currentPage - i);
                    }
                    self.pageList.push(self.config.currentPage);
                    for (let i = 1; i <= offset / 2; i++) {
                        self.pageList.push(self.config.currentPage + i);
                    }
                    self.pageList.push('...');
                    self.pageList.push(self.config.numberOfPages);
                }
            }
            if (self.config.pageOnChange && !(oldValue !== newValue && oldValue[0] === 0)) {
                self.config.pageOnChange();
            }
        }
    }
    changeCurrentPage(item) {
        if (item === '...') {
            return;
        }
        this.config.currentPage = item;
    }
    prevPage() {
        if (this.config.currentPage > 1) {
            this.config.currentPage--;
        }
    }
    nextPage() {
        if (this.config.currentPage < this.config.numberOfPages) {
            this.config.currentPage++;
        }
    }
}
export default PaginationController;
