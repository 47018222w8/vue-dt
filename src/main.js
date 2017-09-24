// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import axios from 'axios'
import constant from './components/constant'
import FastClick from 'fastclick'
Vue.config.productionTip = false
Vue.use(ElementUI)
FastClick.attach(document.body)
axios.defaults.baseURL = constant.BASE_URL
axios.defaults.headers.common[constant.JWT_HEADER] = localStorage.getItem(constant.JWT_HEADER)
axios.defaults.timeout = 10000
Vue.prototype.$http = axios
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
