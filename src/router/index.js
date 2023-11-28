import { createRouter, createWebHistory } from 'vue-router'




const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
    },
    {
      path: '/editar/:id',
      name: 'editar',
      component: () => import('../views/EditarView.vue'),
    }
  ]
})


export default router
