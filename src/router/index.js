import Vue from 'vue'
import Router from 'vue-router'
import longPress from '@/page/longPress'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/longPress',
      name: 'longPress',
      component: longPress
    }
  ]
})
