import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/view/HelloWorld'
import Login from '@/components/view/Login'
import Controller from '@/components/view/Controller'
import Test from '@/components/view/Test'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/hello',
      name: HelloWorld,
      component: HelloWorld
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/controller',
      name: 'Controller',
      component: Controller
    },
    {
      path: '/test',
      name: 'Test',
      component: Test
    },
    {
      path: '/*',
      redirect: '/login'
    }
  ]
})
