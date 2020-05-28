export default {
  path: "/3D",
  component: () => import("@/components/layout/index"),
  children: [
    {
      path: "index",
      name: "3D",
      component: () => import("@/views/3D/index"),
      meta: {
        title: "3D",
        icon: "xl-icon-D",
        role: ["admin", "guest"],
      },
      hidden: false,
      level: 1,
      sort: 4,
      children: [
        {
          path: "/3D three01",
          name: "3D three01",
          component: () => import("@/views/3D/three01/index"),
          meta: {
            title: "three01",
            icon: "xl-icon-3d",
            role: ["admin", "guest"],
          },
          hidden: false,
          level: 2,
        },
        {
          path: "three02",
          name: "three02",
          component: () => import("@/views/3D/three02/index"),
          meta: {
            title: "three02",
            icon: "xl-icon-d",
            role: ["admin", "guest"],
          },
          level: 2,
        },
        {
          path: "threeVR",
          name: "threeVR",
          component: () => import("@/views/3D/threeVR/index"),
          meta: {
            title: "threeVR",
            icon: "xl-icon-VR",
            role: ["admin", "guest"],
          },
          level: 2,
        },
      ],
    },
  ],
};
