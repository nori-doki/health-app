// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import LandingPage from '../views/LandingPage.vue';
import About from '../views/About.vue';
import SignUp from '../views/SignUp.vue';
import Method from '../views/Method.vue';
import Home from '../views/Home.vue';
import Form from '../views/Form.vue';

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
    meta: {
      layout: "default",
    },
  },
  {
    path: '/signUp',
    name: 'SignUp',
    component: SignUp,
    meta: {
      layout: "default",
    },
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
    meta: {
      layout: "default",
    },
  },
  {
    path: '/form',
    name: 'Form',
    component: Form,
    meta: {
      layout: "default",
    },
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
