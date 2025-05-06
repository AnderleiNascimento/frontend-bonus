export default [
  {
    path: '/cadastros/clientes',
    name: 'registers-customers',
    meta: {
      title: 'Lista de clientes',
      authRequired: true,
      roles: ["super_admin", "admin"],
      permissions: ["list_customers"],
    },
    component: () => import("@/views/registers/customers/index.vue")
  },
  {
    path: '/cadastros/clientes/adicionar',
    name: 'registers-customers-add',
    meta: {
      title: 'Adicionar cliente',
      authRequired: true,
      roles: ["super_admin", "admin"],
      permissions: ["create_customers"],
    },
    component: () => import("@/views/registers/customers/form.vue")
  },
  {
    path: '/cadastros/clientes/alterar/:id',
    name: 'registers-customers-edit',
    meta: {
      title: 'Alterar cliente',
      authRequired: true,
      roles: ["super_admin", "admin"],
      permissions: ["update_customers"],
    },
    component: () => import("@/views/registers/customers/form.vue")
  },
  {
    path: '/cadastros/clientes/detalhes/:id',
    name: 'registers-customers-detail',
    meta: {
      title: 'Detalhes do cliente',
      authRequired: true,
      roles: ["super_admin", "admin"],
      permissions: ["view_customers"],
    },
    component: () => import("@/views/registers/customers/details/index.vue")
  },
]