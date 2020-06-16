const state = {
  menuStatus: false, //false.展开 true.收缩
  activeMenuItem: null, //菜单激活项
  screenStatus: 0, //0.非全屏1.全屏
};

const mutations = {
  TOGGLE_MENU: (state, status) => {
    state.menuStatus = status;
  },
  ACTIVED_MENU_ITEM: (state, index) => {
    state.activeMenuItem = index;
  },
  FULLSCREEN: (state, full) => {
    state.screenStatus = full;
  },
};

const actions = {
  toggleMenu({ commit }, status) {
    commit("TOGGLE_MENU", status);
  },
  activedMenuItem({ commit }, index) {
    commit("ACTIVED_MENU_ITEM", index);
  },
  fullScreen({ commit }, full){
    commit("FULLSCREEN", full);
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
