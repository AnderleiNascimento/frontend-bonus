export default [
    {
      path: '/cadastros/lojas',
      name: 'registers-stores',
      meta: {
        title: 'Lista de lojas',
        authRequired: true,
        roles: ["super_admin", "admin"],
        permissions: ["list_stores"],
      },
      component: () => import("@/views/registers/stores/index.vue")
    },
    {
      path: '/cadastros/lojas/adicionar',
      name: 'registers-stores-add',
      meta: {
        title: 'Adicionar loja',
        authRequired: true,
        roles: ["super_admin"],
        permissions: [],
      },
      component: () => import("@/views/registers/stores/form.vue")
    },
    {
      path: '/cadastros/lojas/alterar/:id',
      name: 'registers-stores-edit',
      meta: {
        title: 'Alterar loja',
        authRequired: true,
        roles: ["super_admin", "admin"],
        permissions: ["update_stores"],
      },
      component: () => import("@/views/registers/stores/form.vue")
    },
  ]