import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { checkMiddleware } from "@/router/middleware";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/login",
    name: "login",
    component: () =>
      import("../views/LoginView.vue" /* webpackChunkName: "login" */),
    meta: { requiresGuest: true },
  },
  {
    path: "/deposit",
    name: "deposit",
    component: () =>
      import("../views/DepositView.vue" /* webpackChunkName: "deposit" */),
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach(checkMiddleware);

export default router;
