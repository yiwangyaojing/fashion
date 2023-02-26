// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import App from './App'
import router from './router'
import VueCropper from 'vue-cropper' 
import Vue from 'vue'
Vue.use(VueCropper)
import cpu from 'custom-private-ui';
cpu.install(Vue);
Vue.config.productionTip = false
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
