import { createRouter, createWebHistory } from 'vue-router'
import { useTokenStore } from '@/stores/token'
import { ElMessage } from 'element-plus'

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
      ],
      meta: {
        requiresAuth: true,
      },
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

router.beforeEach((to, from, next) => {

  console.log("luyoiluyoi")

  if (to.matched.some(record => record.meta.requiresAuth)) {
    console.log("!!!!!!!!")
    console.log("!!!!!!!!")
    console.log("!!!!!!!!")
    console.log("!!!!!!!!")
    const tokenStore = useTokenStore()
    console.log(tokenStore.getInfo().isActived)
    if (!tokenStore.getInfo().isActived) {
      ElMessage.error('您的账号未激活')
      next({
        name: 'login',
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
