import Vue from "vue";
import Auth from "./auth";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    beforeEnter: Auth,
  },
  {
    path: "/form",
    name: "Form",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: function () {
      return import(/* webpackChunkName: "about" */ "../views/Form.vue");
    },

    beforeEnter: Auth,
  },
  {
    path: "/edit/:id",
    name: "Edit",
    component: function () {
      return import("../views/Edit.vue");
    },
    beforeEnter: Auth,
  },
  {
    path: "/edit-quest/:id",
    name: "EditQuest",
    component: function () {
      return import("../views/EditQuest.vue");
    },
    beforeEnter: Auth,
  },
  {
    path: "/second_test",
    name: "Test_2",
    component: () => import("../views/Test1.vue"),
    beforeEnter: Auth,
  },
  {
    path: "/first_test",
    name: "Test",
    component: () => import("../views/Test.vue"),
    beforeEnter: Auth,
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login.vue"),
  },
  {
    path: "/list",
    name: "List",
    component: () => import("../views/ListStudent.vue"),
    
    beforeEnter: Auth,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
