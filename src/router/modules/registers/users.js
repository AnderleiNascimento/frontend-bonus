export default [
  {
    path: '/cadastros/usuarios',
    name: 'registers-users',
    meta: {
      title: 'Lista de usuários',
      authRequired: true,
      roles: ["super_admin", "admin"],
      permissions: ["list_users"],
    },
    component: () => import("@/views/registers/users/index.vue")
  },
  {
    path: '/cadastros/usuarios/adicionar',
    name: 'registers-users-add',
    meta: {
      title: 'Adicionar usuário',
      authRequired: true,
      roles: ["super_admin", "admin"],
      permissions: ["create_users"],
    },
    component: () => import("@/views/registers/users/form.vue")
  },
  {
    path: '/cadastros/usuarios/alterar/:id',
    name: 'registers-users-edit',
    meta: {
      title: 'Alterar usuário',
      authRequired: true,
      roles: ["super_admin", "admin"],
      permissions: ["update_users"],
    },
    component: () => import("@/views/registers/users/form.vue")
  },
]