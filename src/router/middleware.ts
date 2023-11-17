import { NavigationGuardNext, RouteLocationNormalized } from "vue-router";
import store from "@/store";

export function checkMiddleware(
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (store.state.user.isLoggedIn) {
      next();
    } else {
      next("/login");
    }
  } else if (to.matched.some((record) => record.meta.requiresGuest)) {
    if (!store.state.user.isLoggedIn) {
      next();
    } else {
      next("/deposit");
    }
  } else {
    next();
  }
}
