import util from '@/utils/util.js';

const user = {
  state: {
    userInfo:util.getUser(),
    menuState: 0
  },

  mutations: {
    setUserInfo(state, userInfo){
      state.userInfo = userInfo;
    },
    setMenuState(state, menuState){
      state.menuState = menuState;
    },
    set_logOut(state){
      state.userInfo = null;
      state.menuState = 0;
      util.removeUser();
    }
  },

  actions: {
    LogOut({commit}){
      commit('set_logOut');
    }
  }
}

export default user
