import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/login",
  },

  {
    path: "/login",
    name: "login",
    component: () => import("@/views/login/index"),
    meta: {
      role: ["admin", "guest"],
      title: "登录页",
    },
  },

  {
    path: "/layout",
    name: "layout",
    component: () => import("@/views/layout/index"),
    meta: {
      role: ["admin", "guest"],
      title: "排版页",
    },
  },

  {
    path: "/404",
    name: "404",
    component: () => import("@/views/404"),
    meta: {
      role: ["admin", "guest"],
    },
  },
  // 404 page must be placed at the end !!!
  {
    path: "*",
    redirect: "/404",
  },
];

const router = new VueRouter({
  routes,
});

export default router;
