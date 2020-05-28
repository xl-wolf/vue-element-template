export default {
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
      sort:1
    },
  ],
};
