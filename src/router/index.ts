import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CreateDeckView from '../views/CreateDeckView.vue'
import LearnView from '../views/LearnView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/create',
      name: 'create',
      component: CreateDeckView
    },
    {
      path: '/edit/:id',
      name: 'edit',
      component: CreateDeckView
    },
    {
      path: '/learn/:id',
      name: 'learn',
      component: LearnView
    }
  ]
})

export default router
