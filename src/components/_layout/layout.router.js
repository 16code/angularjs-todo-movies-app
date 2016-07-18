import mainLayoutHtml from './page.layout.html';
import {headerHtml} from './header';
import {footerHtml} from './footer';
import {sidebarHtml} from './sidebar';
function appLayoutRouter(RouterHelper) {
    'ngInject';
    RouterHelper.configureStates(getStates());
}
function getStates() {
    return [
        {
            state: 'root',
            config: {
                abstract: true,
                template: mainLayoutHtml
            }
        },
        {
            state: 'root.layout',
            config: {
                abstract: true,
                views: {
                    sidebar: {
                        template: sidebarHtml,
                        controller: 'SidebarController as vm'
                    },
                    header: {
                        template: headerHtml,
                        controller: 'HeaderController as vm'
                    },
                    footer: {
                        template: footerHtml,
                        controller: 'FooterController as vm'
                    }
                }
            }
        }
    ];
}

export default appLayoutRouter;
