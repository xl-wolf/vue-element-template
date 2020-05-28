const state = {
  menuStatus: false, //false.展开 true.收缩
  activeMenuItem: null, //菜单激活项
  redirect: undefined, //退出系统后重新登录时直接跳转之前的页面
};

const mutations = {
  PAGE_REDIRECT: (state, redirect) => {
    state.redirect = redirect;
  },
  TOGGLE_MENU: (state, status) => {
    state.menuStatus = status;
  },
  ACTIVED_MENU_ITEM: (state, index) => {
    state.activeMenuItem = index;
  },
};

const actions = {
  redirectAction({ commit }, currentRoute) {
    commit("PAGE_REDIRECT", currentRoute);
  },
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
