import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import homePage from '@/components/homePage'
import recuritPage from '@/components/recuritPage'
import pkResult from '@/components/pkResult'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'homePage',
      component: homePage
    },
    {
      path: '/home',
      name: 'homePage',
      component: homePage
    },
    {
      path: '/recurit',
      name: 'recuritPage',
      component: recuritPage
    },
    {
      path: '/pkResult',
      name: 'pkResult',
      component: pkResult
      // props: { score: recuritPage.data.score, passNo: recuritPage.data.passNo}
    }
  ]
})
