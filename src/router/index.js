import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/view/HelloWorld'
import Login from '@/components/view/Login'
import Controller from '@/components/view/Controller'
import Test from '@/components/view/Test'
import TablePanel from '@/components/public/TablePanel'

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
      path: '/controller/:panelType',
      name: 'Controller',
      props: true,
      component: Controller,
      // children: [
      //   {
      //     path: ':panelType',
      //     name: 'TablePanel',
      //     props: true,
      //     component: TablePanel
      //   }
      // ]
    },
    {
      path: '/test/:testp',
      name: 'Test',
      props: true,
      component: Test
    },
    {
      path: '/*',
      redirect: '/login'
    }
  ]
})
