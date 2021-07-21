export default {
  path: "/chatroom",
  component: () => import("@/components/layout/index"),
  children: [
    {
      path: "index",
      name: "chatroom",
      component: () => import("@/views/chatroom/index"),
      meta: {
        role: ["admin", "guest"],
        title: "聊天室",
        icon: "xl-icon-751bianjiqi_baiduditu",
      },
      hidden: false,
      level: 1,
      sort: 8,
    },
  ],
};
