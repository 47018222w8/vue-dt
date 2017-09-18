import Vue from 'vue'
import Router from 'vue-router'
import home from '../components/home'
import doctorList from '../page/doctor-list'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: home,
      name: 'home',
      children: [
        {
          // 当 /user/:id/profile 匹配成功，
          // UserProfile 会被渲染在 User 的 <router-view> 中
          path: 'doctor/list',
          component: doctorList
        }
      ]
    }
  ]
})
