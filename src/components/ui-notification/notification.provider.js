/* eslint-disable */
const template = require('./angular-ui-notification.html');
export default function () {
    this.options = {
        delay: 5000,
        startTop: 10,
        startRight: 10,
        verticalSpacing: 10,
        horizontalSpacing: 10,
        positionX: 'right',
        positionY: 'top',
        replaceMessage: false,
        onClose: undefined,
        closeOnClick: true,
        maxCount: 0
    };
    this.setOptions = (options) => {
        if (!angular.isObject(options)) throw new Error('Options should be an object!');
        this.options = angular.extend({}, this.options, options);
    };
    this.$get = ($timeout, $http, $compile, $templateCache, $rootScope, $injector, $sce, $q, $window) => {
        'ngInject';
        var options = this.options;
        var startTop = options.startTop;
        var startRight = options.startRight;
        var verticalSpacing = options.verticalSpacing;
        var horizontalSpacing = options.horizontalSpacing;
        var delay = options.delay;
        var messageElements = [];
        var isResizeBound = false;
        var notify = function (args, t) {
            var deferred = $q.defer();
            if (typeof args !== 'object') {
                args = {
                    message: args
                };
            }
            args.scope = args.scope ? args.scope : $rootScope;
            args.delay = !angular.isUndefined(args.delay) ? args.delay : delay;
            args.type = t || options.type || '';
            args.positionY = args.positionY ? args.positionY : options.positionY;
            args.positionX = args.positionX ? args.positionX : options.positionX;
            args.replaceMessage = args.replaceMessage ? args.replaceMessage : options.replaceMessage;
            args.onClose = args.onClose ? args.onClose : options.onClose;
            args.closeOnClick = (args.closeOnClick !== null && args.closeOnClick !== undefined) ? args.closeOnClick :
                options.closeOnClick;
            var scope = args.scope.$new();
            scope.message = $sce.trustAsHtml(args.message);
            var notifyTitle = args.title;
            if (!notifyTitle) {
                switch (t) {
                    case 'primary':
                    case 'info':
                        notifyTitle = '提示!';
                    break;
                    case 'error':
                        notifyTitle = '错误!';
                    break;
                    default:
                        notifyTitle = '操作成功!';
                }
            }
            scope.title = $sce.trustAsHtml(notifyTitle);
            scope.t = args.type.substr(0, 1);
            scope.delay = args.delay;
            scope.onClose = args.onClose;
            var reposite = () => {
                var j = 0;
                var k = 0;
                var lastTop = startTop;
                var lastRight = startRight;
                var lastPosition = [];
                for (let i = messageElements.length - 1; i >= 0; i--) {
                    var element = messageElements[i];
                    if (args.replaceMessage && i < messageElements.length - 1) {
                        element.addClass('killed');
                        continue;
                    }
                    var elHeight = parseInt(element[0].offsetHeight);
                    var elWidth = parseInt(element[0].offsetWidth);
                    var position = lastPosition[element._positionY + element._positionX];
                    if ((top + elHeight) > window.innerHeight) {
                        position = startTop;
                        k++;
                        j = 0;
                    }
                    var top = (lastTop = position ? (j === 0 ? position : position + verticalSpacing) :
                        startTop);
                    var right = lastRight + (k * (horizontalSpacing + elWidth));
                    element.css(element._positionY, top + 'px');
                    if (element._positionX == 'center') {
                        element.css('left', parseInt(window.innerWidth / 2 - elWidth / 2) + 'px');
                    } else {
                        element.css(element._positionX, right + 'px');
                    }
                    lastPosition[element._positionY + element._positionX] = top + elHeight;
                    if (options.maxCount > 0 && messageElements.length > options.maxCount && i === 0) {
                        element.scope().kill(true);
                    }
                    j++;
                }
            };
            var templateElement = $compile(template)(scope);
            templateElement._positionY = args.positionY;
            templateElement._positionX = args.positionX;
            templateElement.addClass(args.type);
            var closeEvent = (e) => {
                e = e.originalEvent || e;
                if (e.type === 'click' || (e.propertyName === 'opacity' && e.elapsedTime >= 1)) {
                    if (scope.onClose) {
                        scope.$apply(scope.onClose(templateElement));
                    }
                    templateElement.remove();
                    messageElements.splice(messageElements.indexOf(templateElement), 1);
                    scope.$destroy();
                    reposite();
                }
            };
            if (args.closeOnClick) {
                templateElement.addClass('clickable');
                templateElement.bind('click', closeEvent);
            }
            templateElement.bind(
                'webkitTransitionEnd oTransitionEnd otransitionend transitionend msTransitionEnd',
                closeEvent);
            if (angular.isNumber(args.delay)) {
                $timeout(() => {
                    templateElement.addClass('killed');
                }, args.delay);
            }
            setCssTransitions('none');
            angular.element(document.getElementsByTagName('body')).append(templateElement);
            var offset = -(parseInt(templateElement[0].offsetHeight) + 50);
            templateElement.css(templateElement._positionY, offset + 'px');
            messageElements.push(templateElement);
            if (args.positionX == 'center') {
                var elWidth = parseInt(templateElement[0].offsetWidth);
                templateElement.css('left', parseInt(window.innerWidth / 2 - elWidth / 2) + 'px');
            }
            $timeout(() => {
                setCssTransitions('');
            });

            function setCssTransitions(value) {
                ['-webkit-transition', '-o-transition', 'transition'].forEach( (prefix) => {
                    templateElement.css(prefix, value);
                });
            }
            scope._templateElement = templateElement;
            scope.kill = (isHard) => {
                if (isHard) {
                    if (scope.onClose) {
                        scope.$apply(scope.onClose(scope._templateElement));
                    }
                    messageElements.splice(messageElements.indexOf(scope._templateElement), 1);
                    scope._templateElement.remove();
                    scope.$destroy();
                    $timeout(reposite);
                } else {
                    scope._templateElement.addClass('killed');
                }
            };
            $timeout(reposite);
            if (!isResizeBound) {
                angular.element($window).bind('resize', (e) => {
                    $timeout(reposite);
                });
                isResizeBound = true;
            }
            deferred.resolve(scope);
            return deferred.promise;
        };
        notify.primary = (args) => {
            return notify(args, 'primary');
        };
        notify.error = (args) => {
            return notify(args, 'error');
        };
        notify.success = (args) => {
            return notify(args, 'success');
        };
        notify.info = (args) => {
            return notify(args, 'info');
        };
        notify.warning = (args) => {
            return notify(args, 'warning');
        };
        notify.clearAll = () => {
            angular.forEach(messageElements, (element) => {
                element.addClass('killed');
            });
        };
        return notify;
    };
}
