import { createRouter, createWebHistory } from "vue-router";
import { allRoute } from "@/router/routes";
import TokenService from '@/services/TokenService'
import MeService from '@/services/MeService'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: allRoute,
});

router.beforeEach((to, from, next) => {
  const title = to.meta.title;
  if (title) {
    document.title = title.toString();
  }
  next();
});

router.beforeEach((routeTo, routeFrom, next) => {
  const authRequired = routeTo.matched.some((route) => route.meta.authRequired);

  if (!authRequired) return next();

  const authToken = TokenService.getToken()
  if (authToken) {
    const requiredRoles = routeTo.meta.roles || [];
    const requiredPermissions = routeTo.meta.permissions || [];

    if (requiredRoles.length === 0 && requiredPermissions.length === 0) {
      return next();
    }

    const user = MeService.getUser();
    const userRoles = user?.roles || [];
    const userPermissions = user?.permissions || [];

    const hasRequiredRole = requiredRoles.some(role => userRoles.includes(role));
    const hasRequiredPermission = requiredPermissions.some(permission => userPermissions.includes(permission));

    if (hasRequiredRole || hasRequiredPermission) {
      return next();
    }

    return next({ name: "error.404" });
  }

  redirectToLogin();

  function redirectToLogin() {
    next({ name: "auth.sign-in", query: { redirectedFrom: routeTo.fullPath } });
  }
});

export default router;
