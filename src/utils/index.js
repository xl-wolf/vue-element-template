import defaultSettings from "@/settings";

export const setTokenSession = (token) => {
  window.sessionStorage.setItem("token", token);
};
export const resetTokenSession = () => {
  window.sessionStorage.removeItem("token");
};

export const getTokenSession = () => {
  return window.sessionStorage.getItem("token");
};

export const setAvatarSession = (avatar) => {
  window.sessionStorage.setItem("avatar", avatar);
};
export const resetAvatarSession = () => {
  window.sessionStorage.removeItem("avatar");
};

export const getAvatarSession = () => {
  return window.sessionStorage.getItem("avatar");
};

export const setProjectNameSession = (projectName) => {
  window.sessionStorage.setItem("projectName", projectName);
};
export const resetProjectNameSession = () => {
  window.sessionStorage.removeItem("projectName");
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

// webpack require.context 转为数组包装函数
// export 使用 default
export const requireContentArray = (r, exinclude) => {
  let contents = [];
  const paths = r.keys().filter((p) => {
    return exinclude.indexOf(p) == -1;
  });
  for (let p of paths) {
    let fn = r(p).default ? r(p).default : r(p);
    if (fn instanceof Array) {
      contents = [...contents, ...fn];
    } else if (fn instanceof Object) {
      contents.push(fn);
    }
  }
  return contents
};
// 容器滚动到底部
export const scrollBottom = (domId, speed = 5) => {
  const el = document.getElementById(domId)
  if (!el) throw new Error('请确保传入正确的domId')
  const timer = setInterval(() => {
    if (el.scrollHeight - el.scrollTop === el.clientHeight) return clearInterval(timer)
    speed += speed
    el.scrollTop += speed
  }, 30)
}
