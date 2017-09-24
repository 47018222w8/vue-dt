import Vue from 'vue'
import Router from 'vue-router'
import home from '../components/home'
import doctorList from '../page/doctor-list'
import login from '../page/login'
import doctorAdd from '../page/doctor-add'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: home,
      name: 'home',
      children: [
        {
          path: 'doctor/list',
          component: doctorList,
          name: 'doctorList'
        },
        {
          path: 'doctor/add',
          component: doctorAdd,
          name: 'doctorAdd'
        }
      ]
    },
    {
      path: '/login',
      component: login,
      name: 'login'
    }
  ]
})
