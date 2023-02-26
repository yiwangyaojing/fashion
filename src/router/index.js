import Vue from 'vue';
import Router from 'vue-router';
import longPress from '@/page/longPress';
import butSpread from '@/page/butSpread';
import home from '@/page/home/index';
import test from '@/page/test/test';
import login from '@/page/login';

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    },
    {
      path: '/test',
      name: 'test',
      component: test
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/longPress',
      name: 'longPress',
      component: longPress
    },
    {
      path: '/butSpread',
      name: 'butSpread',
      component: butSpread
    }
  ]
})
