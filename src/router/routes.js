import cashback from './modules/cashback'
import registers from './modules/registers'

const setTitle = (title) => {
  return title
    ? `${title} | Rizz Vue - Responsive Admin Dashboard Template`
    : "Rizz Vue | Responsive Admin Dashboard Template";
};

const authRoutes = [
  {
    path: "/auth/sign-in",
    name: "auth.sign-in",
    meta: {
      title: setTitle("Sign In"),
    },
    component: () => import("@/views/auth/login.vue"),
  },
  {
    path: "/auth/register",
    name: "auth.register",
    meta: {
      title: setTitle("Register"),
    },
    component: () => import("@/views/auth/register.vue"),
  },
  {
    path: "/auth/reset-pass",
    name: "auth.reset-pass",
    meta: {
      title: setTitle("Reset Password"),
    },
    component: () => import("@/views/auth/reset-pass.vue"),
  },
  {
    path: "/auth/lock-screen",
    name: "auth.lock-screen",
    meta: {
      title: setTitle("Lock Screen"),
    },
    component: () => import("@/views/auth/lock-screen.vue"),
  },
  {
    path: "/auth/maintenance",
    name: "auth.maintenance",
    meta: {
      title: setTitle("Maintenance"),
    },
    component: () => import("@/views/auth/maintenance.vue"),
  },
];

const errorRoutes = [
  {
    path: "/auth/error-404",
    name: "error.404",
    meta: {
      title: setTitle("Error 404"),
    },
    component: () => import("@/views/auth/error-404.vue"),
  },
  {
    path: "/auth/error-500",
    name: "error.500",
    meta: {
      title: setTitle("Error 500"),
    },
    component: () => import("@/views/auth/error-500.vue"),
  },
  {
    path: "/:catchAll(.*)",
    redirect: "/auth/error-404",
  },
];

const dashboardRoutes = [
  {
    path: "/",
    name: "dashboards.cashback",
    meta: {
      title: setTitle("Cashback"),
      authRequired: true,
    },
    component: () => import("@/views/dashboards/cashback/index.vue"),
  },
  {
    path: "/dashboards/fidelizacao",
    name: "dashboards.loyalty",
    meta: {
      title: setTitle("Fidelização"),
      authRequired: true,
    },
    component: () => import("@/views/dashboards/loyalties/index.vue"),
  },
];

export const allRoute = [
  ...cashback,
  ...registers,
  ...authRoutes,
  ...errorRoutes,
  ...dashboardRoutes,
];
