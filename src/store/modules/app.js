import Cookies from 'js-cookie'
import {otherRouterMap, constantRouterMap, topRouterMap} from '../../router';
// import menus from "../../router/component/comonents"
import router from '../../router/index'


const app = {
  state: {
    sidebar: !+Cookies.get('sidebarStat'),
    routers: constantRouterMap,
    topRoutes: topRouterMap,
    menuTheme: 'dark',
    defaultIndex:'/biaoqian1',
    currentPathArr: [],
    pageOpenedList: [{
      name: "home_index",
      path: "/dashboard",
      title: "首页"
    }],
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {   
      state.routers = constantRouterMap.concat(topRouterMap).concat(routers);
     /* console.log(routers)*/
    },
    SET_SIDEBAR: state => {
      if (state.sidebar) {
        Cookies.set('sidebarStat', 1);
      } else {
        Cookies.set('sidebarStat', 0);
      }
      state.sidebar = !state.sidebar
    },
    SET_currentPathArr: (state, currentPathArr) => {
      state.currentPathArr = currentPathArr
    },
    addPageOpened: (state, tag) => {
      let flag = true;
      state.pageOpenedList.map((item, index) => {
        if (item.name === tag.name) {
          flag = false;
        }
      });
      if (flag) {
        state.pageOpenedList.push(tag);
      }
      if (state.pageOpenedList.length > 5) {
        state.pageOpenedList.splice(1, 1);
      }
    },
    closeOnePageOpend: (state, name) => {
      state.pageOpenedList.map((item, index) => {
        if (item.name === name) {
          state.pageOpenedList.splice(index, 1);
        }
      });
    },
    clearAllPageTags: (state) => {
      state.pageOpenedList = [{
        name: "home_index",
        path: "/dashboard",
        title: "首页"
      }];
    },
    clearOtherPageTags: (state, name) => {
      let newPageList = [];
      state.pageOpenedList.map((item, index) => {
        if (item.name === name || item.name === "home_index") {
          newPageList.push(item)
        }
      });
      state.pageOpenedList = newPageList;
    },
    ChangeMenuTheme:(state, name) => {
      if(state.menuTheme==='dark'){
        state.menuTheme = 'light';
      }else{
        state.menuTheme = 'dark';
      }
    },
    increment (state, n) {
     state.defaultIndex = n
    }
  },
  actions: {
    ChangeSidebar: ({commit}) => {
      commit('SET_SIDEBAR')
    },
    GenerateRoutes({commit}, menus){
      return new Promise(resolve => {
        // 添加动态菜单
        router.addRoutes(menus);
        commit('SET_ROUTERS', otherRouterMap.concat(menus) ,topRouterMap);
        resolve();
      })
    },
    ChangeCurrentPathArr({commit}, data){
      commit('SET_currentPathArr', data);
    }
  }
}

export default app
