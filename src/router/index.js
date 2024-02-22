import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CreatePetitionView from "@/views/CreatePetitionView";
import ProfileView from "@/views/ProfileView";
import RegisterView from "@/views/RegisterView";
import LoginView from "@/views/LoginView";
import PetitionView from "@/views/PetitionView";


const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/create-petition',
    name: 'create-petition',
    component: CreatePetitionView
  },
  {
    path: '/profile',
    name: 'profile',
    component: ProfileView
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterView
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/petition/:id',
    name: 'petition_view',
    component: PetitionView,

  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
