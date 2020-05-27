import defaultSettings from "@/settings";

export const setTokenSession = (token) => {
  window.sessionStorage.setItem("token", token);
};

export const getTokenSession = () => {
  return window.sessionStorage.getItem("token");
};

export const setAvatarSession = (avatar) => {
  window.sessionStorage.setItem("avatar", avatar);
};

export const getAvatarSession = () => {
  return window.sessionStorage.getItem("avatar");
};

export const setProjectNameSession = (projectName) => {
  window.sessionStorage.setItem("projectName", projectName);
};

export const getProjectNameSession = () => {
  return window.sessionStorage.getItem("projectName");
};

const title = defaultSettings.title || "vue-element-template";

export const getPageTitle = (pageTitle) => {
  if (pageTitle) {
    return `${pageTitle} - ${title}`;
  }
  return `${title}`;
};
