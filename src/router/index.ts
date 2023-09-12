import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import DoctorView from '../views/DoctorView.vue'
import DietView from '../views/DietView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Main',
      component: HomeView
    },
    {
      path: '/doctor',
      name: 'doctor',
      component: DoctorView
    },
    {
      path: '/diet',
      name: 'diet',
      component: DietView
    },
  ]
})

export default router
