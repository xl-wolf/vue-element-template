import { loginApi } from "@/apis/user";
import {
  setTokenSession,
  setAvatarSession,
  setProjectNameSession,
} from "@/utils/index";
const getDefaultState = () => {
  return {
    token: null,
    projectName: null,
    avatar: null,
  };
};

const state = getDefaultState();

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token;
  },
  SET_PROJECT_NAME: (state, projectName) => {
    state.projectName = projectName;
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar;
  },
};

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo;
    return new Promise((resolve, reject) => {
      loginApi({ username: username.trim(), password: password })
        .then((response) => {
          // console.log(response);
          const { data } = response;

          commit("SET_TOKEN", data.token);
          setTokenSession(data.token);

          commit("SET_PROJECT_NAME", data.projectName);
          setProjectNameSession(data.projectName);

          commit("SET_AVATAR", data.avatar);
          setAvatarSession(data.avatar);

          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
