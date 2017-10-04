// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import constant from './components/constant'
import FastClick from 'fastclick'
import './style/main.less'
Vue.config.productionTip = false
Vue.use(ElementUI)
FastClick.attach(document.body)
axios.defaults.baseURL = constant.BASE_URL
axios.defaults.headers.common[constant.JWT_HEADER] = localStorage.getItem(constant.JWT_HEADER)
axios.defaults.timeout = 10000
axios.interceptors.response.use(function (res) {
  return res
}, function (error) {
  if (error.response.status === 401 && error.response.data.code === 'AUTHORIZATION_EXPIRED') {
    Vue.prototype.$message({
      message: '登录失效,即将返回登录页',
      center: true,
      type: 'error',
      onClose() {
        router.push({ name: 'login' })
      }
    })
    throw new Error(error)
  } else {
    return Promise.reject(error)
  }
})
Vue.prototype.$http = axios
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
