export default {
  path: "/swiper",
  component: () => import("@/components/layout/index"),
  children: [
    {
      path: "index",
      name: "swiper",
      component: () => import("@/views/swiper/index"),
      meta: {
        role: ["admin", "guest"],
        title: "轮播案例",
        icon: "xl-icon-swiperight",
      },
      hidden: false,
      level: 1,
      sort:5
    },
  ],
};
