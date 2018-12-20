import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import iView from 'iview'
// import 'iview/src/styles/index.less'
import NProgress from 'nprogress'; // Progress 进度条
import 'nprogress/nprogress.css';// Progress 进度条 样式
import 'normalize.css/normalize.css';// normalize.css 样式格式化
// 菜单假数据
import _menus from './router/component/comonents'


Vue.use(iView);
NProgress.configure({});
Vue.config.productionTip = false;

/* 真实环境下去掉以下两行代码即可*/
//import Mock from './mock'
//Mock.init()

const whiteList = ['/login'];
router.beforeEach((to, from, next) => {
  NProgress.start() // start progress bar
  if (store.getters.userInfo) { // determine if there has token
    /* has token*/
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done() // if current page is dashboard will not trigger	afterEach hook, so manually handle it
    } else {
      // 判断当前用户是否已获取菜单信息（0：还未获取，1：已经获取）
      if (store.getters.menuState === 0) {
        // 后台获取菜单数据 (当前为假数据)
        var menus =_menus;

        store.dispatch('GenerateRoutes', menus).then(() => { // 根据roles权限生成可访问的路由表
          // 当前在GenerateRoutes中已经添加动态路由
          // router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
          next({ ...to, replace: true }) // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record

          store.commit('setMenuState', 1);
        })
      } else {
         next();
      }
    }
  } else {
    /* has no token*/
    if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
      next()
    } else {
      next(`/login?redirect=${to.path}`) // 否则全部重定向到登录页
      NProgress.done() // if current page is login will not trigger afterEach hook, so manually handle it
    }
  }
})


router.afterEach(() => {
  NProgress.done(); // 结束Progress
});


new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
