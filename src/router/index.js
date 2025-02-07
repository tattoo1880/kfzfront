import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: () => import('../views/UserLogin.vue'),
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/UserRegister.vue'),
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('../views/Home.vue'),
      children: [
        {
          path: '',
          name: 'Scrapy',
          component: () => import('@/components/Scrapy.vue'),
        }
      ]
    },
    {
      name: 'adminlogin',
      path: '/adminlogin',
      component: () => import('../views/AdminLogin.vue'),
    },
    {
      name: 'adminregister',
      path: '/adminregister',
      component: () => import('../views/AdminRegister.vue'),
    },
    {
      name: 'adminhome',
      path: '/adminhome',
      component: () => import('../views/AdminHome.vue'),
      children: [
        {
          path: '',
          name: 'usermanage',
          component: () => import('@/components/Admin/UserManage.vue'),
        }
      ]
    }
  ],
})

export default router
