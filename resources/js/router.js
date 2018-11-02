import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from './components/layout/Layout.vue';
/**
 * hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
 *                                if not set alwaysShow, only more than one route under the children
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
 **/
export const constantRouterMap = [
    { path: '/login', component: require('./components/login/Login.vue').default },
    { path: '/404', component: require('./components/errors/404.vue').default },

    /*  {
          path: '/',
          component: Layout,
          redirect: '/dashboard',
          name: 'Dashboard',

          children: [{
              path: 'dashboard',
              component: require('./components/layout/Layout.vue').default
          }]
      }*/


    /*   { path: '/login', component: require('./components/login/Login.vue').default },
       { path: '/404', component: require('./components/errors/404.vue').default},
      // { path: '/', redirect:'/dashboard' },
      // { path: '/dashboard', component: require('./components/dashboard/Dashboard.vue') },
       {
           path: '/',
           component: require('./components/dashboard/Dashboard.vue').default,
           redirect: '/dashboard',
           name: 'Dashboard',
           children: [{
               path: 'dashboard',
               component: require('./components/layout/Layout.vue').default
           }]
       } */

    {
        path: '/',
        component: Layout,
        redirect: '/dashboard',
        name: 'Dashboard',
        hidden: true,
        children: [{
            path: 'dashboard',
            component: require('./components/dashboard/Dashboard.vue').default
        }]
    },

    {
        path: '/example',
        component: Layout,
        redirect: '/example/table',
        name: 'Example',
        meta: { title: 'Example', icon: 'example' },
        children: [
            {
                path: 'table',
                name: 'Table',
                component: require('./components/table/index.vue').default,
                meta: { title: 'Table', icon: 'table' }
            },
            {
                path: 'tree',
                name: 'Tree',
                component: require('./components/tree/index.vue').default,
                meta: { title: 'Tree', icon: 'tree' }
            }
        ]
    },

    {
        path: '/form',
        component: Layout,
        children: [
            {
                path: 'index',
                name: 'Form',
                component: require('./components/form/index.vue').default,
                meta: { title: 'Form', icon: 'form' }
            }
        ]
    },

    {
        path: '/nested',
        component: Layout,
        redirect: '/nested/menu1',
        name: 'Nested',
        meta: {
            title: 'Nested',
            icon: 'nested'
        },
        children: [
            {
                path: 'menu1',
                component: require('./components/nested/menu1/index.vue'), // Parent router-view
                name: 'Menu1',
                meta: { title: 'Menu1' },
                children: [
                    {
                        path: 'menu1-1',
                        component: require('./components/nested/menu1/menu1-1/index.vue').default,
                        name: 'Menu1-1',
                        meta: { title: 'Menu1-1' }
                    },
                    {
                        path: 'menu1-2',
                        component: require('./components/nested/menu1/menu1-2/index.vue').default,
                        name: 'Menu1-2',
                        meta: { title: 'Menu1-2' },
                        children: [
                            {
                                path: 'menu1-2-1',
                                component: require('./components/nested/menu1/menu1-2/menu1-2-1/index.vue').default,
                                name: 'Menu1-2-1',
                                meta: { title: 'Menu1-2-1' }
                            },
                            {
                                path: 'menu1-2-2',
                                component: require('./components/nested/menu1/menu1-2/menu1-2-2/index.vue').default,
                                name: 'Menu1-2-2',
                                meta: { title: 'Menu1-2-2' }
                            }
                        ]
                    },
                    {
                        path: 'menu1-3',
                        component: require('./components/nested/menu1/menu1-3/index.vue').default,
                        name: 'Menu1-3',
                        meta: { title: 'Menu1-3' }
                    }
                ]
            },
            {
                path: 'menu2',
                component: require('./components/nested/menu2/index.vue').default,
                meta: { title: 'menu2' }
            }
        ]
    },

    {
        path: 'external-link',
        component: Layout,
        children: [
            {
                path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
                meta: { title: 'External Link', icon: 'link' }
            }
        ]
    },

    { path: '*', redirect: '/404', hidden: true }
];

export default new Router({
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRouterMap
})
