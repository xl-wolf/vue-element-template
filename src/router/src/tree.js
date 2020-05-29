export default {
  path: "/tree",
  component: () => import("@/components/layout/index"),
  children: [
    {
      path: "index",
      name: "tree",
      component: () => import("@/views/tree/index"),
      meta: {
        role: ["admin", "guest"],
        title: "树",
        icon: "xl-icon-Treewithered",
      },
      hidden: false,
      level: 1,
      sort:7
    },
  ],
};
