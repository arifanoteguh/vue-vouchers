import Vue from "vue";
import VueRouter from "vue-router";
import MainLayout from "../components/MainLayout.vue";
import Login from "../components/Login.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "",
    component: MainLayout,
    children: [
      {
        path: "/",
        name: "Home",
        component: () =>
          import(/* webpackChunkName: "home" */ "../views/Vouchers.vue"),
      },
      {
        path: "/list",
        name: "List",
        component: () =>
          import(/* webpackChunkName: "home" */ "../views/ListVouchers.vue"),
      },
      {
        path: "/testgql",
        name: "testgql",
        component: () =>
          import(/* webpackChunkName: "home" */ "../components/testgql.vue"),
      },
    ],
  },
  {
    path: "/login",
    name: "Login",
    component: Login
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
