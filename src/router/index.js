import Vue from 'vue'
import Router from 'vue-router'
import home from '../page/home'
import login from '../page/login'
import doctorList from '../page/doctor-list'
import doctorAdd from '../page/doctor-add'
import doctorUpdate from '../page/doctor-update'
import treatmentList from '../page/treatment-list'
import treatmentAdd from '../page/treatment-add'
import treatmentUpdate from '../page/treatment-update'
import countList from '../page/count-list'
import countAdd from '../page/count-add'
import chart from '../page/chart'
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
        },
        {
          path: 'doctor/update/:doctorId',
          component: doctorUpdate,
          name: 'doctorUpdate'
        },
        {
          path: 'treatment/list',
          component: treatmentList,
          name: 'treatmentList'
        },
        {
          path: 'treatment/add',
          component: treatmentAdd,
          name: 'treatmentAdd'
        },
        {
          path: 'treatment/update/:treatmentId',
          component: treatmentUpdate,
          name: 'treatmentUpdate'
        },
        {
          path: 'count/list',
          component: countList,
          name: 'countList'
        },
        {
          path: 'count/add',
          component: countAdd,
          name: 'countAdd'
        },
        {
          path: 'chart',
          component: chart,
          name: 'chart'
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
