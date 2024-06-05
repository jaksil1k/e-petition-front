import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CreatePetitionView from "@/views/CreatePetitionView";
import ProfileView from "@/views/ProfileView";
import RegisterView from "@/views/RegisterView";
import LoginView from "@/views/LoginView";
import PetitionView from "@/views/PetitionView";
import PetitionsView from "@/views/PetitionsView";
import ChangeUserView from "@/views/ChangeUserView";
import AdminView from "@/views/AdminView";


const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
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
    path: '/change-profile',
    name: 'change-profile',
    component: ChangeUserView
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
    path: '/petitions/:id',
    name: 'petition_view',
    component: PetitionView
  },
  {
    path: '/petitions',
    name: 'petitions',
    component: PetitionsView
  },
  {
    path: '/admin',
    name: 'admin',
    component: AdminView
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
