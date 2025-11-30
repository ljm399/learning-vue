import { createRouter, createWebHistory } from 'vue-router'


const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      component: () => import('../views/d4-login.vue')
    },
    {
      path: '/login/son',
      // meta:true,
      component: () => import('../views/d4-loginSon.vue')
    }
  ]
})
router.beforeEach((to, from) => {
  // pro
  if(localStorage.getItem('token')) {
    console.log('2222sssss');
    // return '/login/son'
  }
})

export default router
