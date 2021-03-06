// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import fastclick from 'fastclick'
import VueLazyload from 'vue-lazyload'
import store from './store'
Vue.config.productionTip = false

import 'common/stylus/index.styl'

fastclick.attach(document.body);
Vue.use(VueLazyload, {
  loading: require('common/image/default.png'),
  try: 3 // default 1
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  store,
  components: { App }
})
