// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import LandingPage from '../views/LandingPage.vue';
import About from '../views/About.vue';
import SignUp from '../views/SignUp.vue';
import Method from '../views/Method.vue';
import Home from '../views/Home.vue';

const routes = [
  {
    path: '/',
    name: 'LandingPage',
    component: LandingPage,
  },
  {
    path: '/about',
    name: 'About',
    component: About,
  },
  {
    path: '/signUp',
    name: 'SignUp',
    component: SignUp,
  },
  {
    path: '/method',
    name: 'Method',
    component: Method,
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
