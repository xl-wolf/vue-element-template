import Vue from "vue";
import VueRouter from "vue-router";
import routeArr from "./src";
console.log(routeArr);
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/login",
    hidden: true,
  },

  ...routeArr,

  
  // 404 page must be placed at the end !!!
  {
    path: "*",
    redirect: "/404",
  },
];

const router = new VueRouter({
  routes,
});
export { routes };
export default router;
