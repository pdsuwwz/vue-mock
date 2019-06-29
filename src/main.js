import Vue from 'vue'
import axios from 'axios';
import VueRouter from 'vue-router'
import routes from './routes'
import store from './store'

import '../data/mock'

Vue.use(VueRouter)
Vue.prototype.$http = axios
const router = new VueRouter({
  routes,
  mode: 'history'
})

new Vue({
  router,
  store
}).$mount('#app')
