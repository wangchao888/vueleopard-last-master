import Vue from 'vue'
import Router from 'vue-router'
const _import = require('./_import_' + process.env.NODE_ENV)
// in development env not use Lazy Loading,because Lazy Loading too many pages will cause webpack hot update too slow.so only in production use Lazy Loading

/* layout */
import Layout from '../views/layout/Layout';
const Login = _import('login/login');

Vue.use(Router)

/**
 * icon : the icon show in the sidebar
 * hidden : if `hidden:true` will not show in the sidebar
 * redirect : if `redirect:noredirect` will not redirct in the levelbar
 * noDropdown : if `noDropdown:true` will not has submenu in the sidebar
 * meta : `{ role: ['admin'] }`  will control the page role
 **/
export const constantRouterMap = [
  {
    path: '/login',
    name: 'login',
    meta: {
      title: 'Login - 登录'
    },
    hidden: true,
    component: resolve => {
      require(['../views/login/login.vue'], resolve);
    }
  },
  {
    path: '/',
    component: Layout,
    redirect: '/biaoqian1',
    name: 'Dashboard',
    hidden: true,
    children: [{path: 'dashboard', title: 'home', name:'home_index', component: _import('dashboard/index')}]
  }
];

export const topRouterMap = [
 {
    path: '/biaoqian1',
    component: Layout,
    redirect: '/biaoqian1/name1',
    name: '标签一',
    hidden: true,
    children: [{path: 'dashboard', title: 'home', name:'home_index', component: _import('dashboard/index')}]
  },
  {
     path: '/biaoqian2',
    component: Layout,
    redirect: '/biaoqian2/name2',
    name: '标签二',
    hidden: true,
    children: [{path: 'dashboard', title: 'home', name:'home_index', component: _import('dashboard/index')}]
  },
  {
    path: '/biaoqian3',
    component: Layout,
    redirect: '/biaoqian3/name3',
    name: '标签三',
    hidden: true,
    children: [{path: 'dashboard', title: 'home', name:'home_index', component: _import('dashboard/index')}]
  }
]

export const otherRouterMap = [
  {
    path: '/biaoqian1/name1',
    icon: 'social-codepen-outline',
    name: '122',
    title: '测试管理',
    component: Layout,
    redirect: '/biaoqian1/name1/index',
    children: [{path: 'index',  icon: 'social-codepen-outline',title: '测试管理', name: 'testIndex', component: _import('application/index')}]
  },
  {
    path: '/biaoqian2/name2',
    icon: 'ios-keypad',
    name: 'name2',
    title: '结果管理',
    component: Layout,
    redirect: '/biaoqian2/name2/index',
    children: [{path: 'index',  icon: 'compose',title: '结果管理', name: 'result', component: _import('dashboard/index')}]
  },
  {
    path: '/biaoqian3/name3',
    icon: 'navicon',
    name: 'name3',
    title: '配置管理',
    component: Layout,
    redirect: '/biaoqian3/name3/device',
    children: [{path: 'device',  icon: 'android-apps',title: '服务管理', name: 'device', component: _import('dashboard/index')},
      {path: 'service', icon: 'compose',title: '设备管理', name: 'service', component: _import('dashboard/index')}]
  }];

export default new Router({
  mode: 'history', //后端支持可开
  scrollBehavior: () => ({y: 0}),
  routes: [
    ...constantRouterMap,
    ...otherRouterMap,
    ...topRouterMap
  ]
})

