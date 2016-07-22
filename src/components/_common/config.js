function appConfig(RouterHelperProvider, $resourceProvider,
    $httpProvider, $urlMatcherFactoryProvider, NotificationProvider) {
    'ngInject';
    RouterHelperProvider.configure({mainTitle: 'AngularJs Movie App'});

    NotificationProvider.setOptions({
        delay: 5000,
        startTop: 10,
        startRight: 10,
        verticalSpacing: 20,
        horizontalSpacing: 20,
        positionX: 'right',
        positionY: 'top'
    });
    // 请求的资源去掉末尾反斜杠
    $resourceProvider.defaults.stripTrailingSlashes = true;
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/json; charset=utf-8';
    $httpProvider.defaults.useXDomain = true;
    // http 拦截注入
    $httpProvider.interceptors.push('HttpInterceptor');
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
    // 处理URI
    $urlMatcherFactoryProvider.type('replaceUri', {
        encode(v) {
            const regChinese = /[\u4E00-\u9FA5\uF900-\uFA2D]/;
            if (v) {
                let s = v.toLowerCase();
                // 匹配是否包含中文
                if (regChinese.test(s)) {
                    s = s.replace(/[\uff0c\u002c\u3001]/g, '');
                } else {
                    s = s.replace(/<(?:.|\n)*?>/gm, '').replace(/[()'"]/g, '');
                }
                s = s.replace(/\s+/g, '-')
                    .replace(/\//g, '')
                    .replace(/[:：&・]/, '');
                return s;
            }
            return false;
        },
        decode(v) {
            return v;
        },
        is(v) {
            return v !== '';
        }
    });
}

export default appConfig;
