export default [
  {
    path: '/gestao-de-pedidos/lista-de-pedidos',
    name: 'order-list',
    meta: {
      title: 'Lista de Pedidos',
      authRequired: true,
      roles: ["super_admin", "admin"],
      permissions: ["list_orders"],
    },
    component: () => import("@/views/management-orders/order/index.vue")
  },
  {
    path: '/gestao-de-pedidos/criar-pedido',
    name: 'orders-add',
    meta: {
      title: 'Criar Pedido',
      authRequired: true,
      roles: ["super_admin", "admin"],
      permissions: ["create_orders"],
    },
    component: () => import("@/views/management-orders/order/add/index.vue")
  },
  {
    path: '/gestao-de-pedidos/pedido/detalhes/:id',
    name: 'orders-detail',
    meta: {
      title: 'Detalhes do Pedido',
      authRequired: true,
      roles: ["super_admin", "admin"],
      permissions: ["create_orders"],
    },
    component: () => import("@/views/management-orders/order/details/index.vue")
  },
  {
    path: '/gestao-de-pedidos/lista-de-cashbacks',
    name: 'cashback-list',
    meta: {
      title: 'Lista de Cashbacks',
      authRequired: true,
      roles: ["super_admin", "admin"],
      permissions: ["list_cashbacks"],
    },
    component: () => import("@/views/management-orders/cashback/index.vue")
  }
]