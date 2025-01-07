import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/Home.vue'),
      children: [
        {
          path: 'scrapy',
          name: 'Scrapy',
          component: () => import('@/components/Scrapy.vue'),
        }
      ]
    }
  ],
})

export default router
