import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/login",
    hidden: true,
  },

  {
    path: "/login",
    name: "login",
    component: () => import("@/views/login/index"),
    meta: {
      role: ["admin", "guest"],
      title: "登录页",
    },
    hidden: true,
  },

  {
    path: "/home",
    component: () => import("@/components/layout/index"),
    children: [
      {
        path: "index",
        name: "home",
        component: () => import("@/views/home/index"),
        meta: {
          role: ["admin", "guest"],
          title: "主页",
          icon: "xl-icon-home",
        },
        hidden: false,
        level: 1,
      },
    ],
  },

  {
    path: "/AMap",
    component: () => import("@/components/layout/index"),
    children: [
      {
        path: "index",
        name: "AMap",
        component: () => import("@/views/AMap/index"),
        meta: {
          role: ["admin", "guest"],
          title: "高德地图",
          icon: "xl-icon-gaodeditu",
        },
        hidden: false,
        level: 1,
      },
    ],
  },

  {
    path: "/BMap",
    component: () => import("@/components/layout/index"),
    children: [
      {
        path: "index",
        name: "BMap",
        component: () => import("@/views/BMap/index"),
        meta: {
          role: ["admin", "guest"],
          title: "百度地图",
          icon: "xl-icon-751bianjiqi_baiduditu",
        },
        hidden: false,
        level: 1,
      },
    ],
  },

  {
    path: "/404",
    name: "404",
    component: () => import("@/views/404"),
    meta: {
      role: ["admin", "guest"],
    },
    hidden: true,
  },
  // 404 page must be placed at the end !!!
  {
    path: "*",
    redirect: "/404",
    hidden: true,
  },
];

const router = new VueRouter({
  routes,
});
export { routes };
export default router;
