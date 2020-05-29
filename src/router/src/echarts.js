export default {
  path: "/echarts",
  component: () => import("@/components/layout/index"),
  children: [
    {
      path: "index",
      name: "echarts",
      component: () => import("@/views/echarts/index"),
      meta: {
        title: "echarts",
        icon: "xl-icon-echarts_mappie",
        role: ["admin", "guest"],
      },
      hidden: false,
      level: 1,
      sort: 5,
      children: [
        {
          path: "bar",
          name: "bar",
          component: () => import("@/views/echarts/bar/index"),
          meta: {
            title: "柱状图",
            icon: "xl-icon-barchart",
            role: ["admin", "guest"],
          },
          hidden: false,
          level: 2,
        },
        {
          path: "line",
          name: "line",
          component: () => import("@/views/echarts/line/index"),
          meta: {
            title: "线图",
            icon: "xl-icon-linechart",
            role: ["admin", "guest"],
          },
          level: 2,
        },
        {
          path: "pie",
          name: "pie",
          component: () => import("@/views/echarts/pie/index"),
          meta: {
            title: "饼图",
            icon: "xl-icon-pie",
            role: ["admin", "guest"],
          },
          level: 2,
        },
        {
          path: "mix",
          name: "mix",
          component: () => import("@/views/echarts/mix/index"),
          meta: {
            title: "混合图",
            icon: "xl-icon-hunheyunshujubeifen",
            role: ["admin", "guest"],
          },
          level: 2,
        },
        {
          path: "map",
          name: "map",
          component: () => import("@/views/echarts/map/index"),
          meta: {
            title: "地图",
            icon: "xl-icon-echarts_heatmap",
            role: ["admin", "guest"],
          },
          level: 2,
        },
      ],
    },
  ],
};
