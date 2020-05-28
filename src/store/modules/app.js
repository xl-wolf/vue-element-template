const state = {
  menuStatus: false, //false.展开 true.收缩
  activeMenuItem: null, //菜单激活项
};

const mutations = {
  TOGGLE_MENU: (state, status) => {
    state.menuStatus = status;
  },
  ACTIVED_MENU_ITEM: (state, index) => {
    state.activeMenuItem = index;
  },
};

const actions = {
  toggleMenu({ commit }, status) {
    commit("TOGGLE_MENU", status);
  },
  activedMenuItem({ commit }, index) {
    commit("ACTIVED_MENU_ITEM", index);
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
