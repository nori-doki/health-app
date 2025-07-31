// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import { supabase } from '@/services/supabase/supabase.js';
import LandingPage from '../views/LandingPage.vue';
import About from '../views/About.vue';
import SignUp from '../views/SignUp.vue';
import Method from '../views/Method.vue';
import Home from '../views/Home.vue';
import Form from '../views/Form.vue';
import Analytics from '../views/Analytics.vue';
import Profile from '../views/Profile.vue';
import Login from '../views/Login.vue';
import ResetPassword from '../views/ResetPassword.vue';

const requireAuth = async (to, from, next) => {
  const { data } = await supabase.auth.getSession()

  if (data.session) {
    next()
  } else {
    next('/login')
  }
}

const routes = [
  {
    path: '/',
    name: 'LandingPage',
    component: LandingPage,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      layout: "default",
    },
  },
  {
    path: '/reset-password',
    name: 'ResetPassword',
    component: ResetPassword,
    meta: {
      layout: "default",
    },
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
    meta: {
      layout: "default",
    },
    component: Method,
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    meta: {
      layout: "default",
    },
    beforeEnter: requireAuth
  },
  {
    path: '/form',
    name: 'Form',
    component: Form,
    meta: {
      layout: "default",
    },
    beforeEnter: requireAuth
  },
  {
    path: '/analytics',
    name: 'Analytics',
    component: Analytics,
    meta: {
      layout: "default",
    },
    beforeEnter: requireAuth
  }, 
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    meta: {
      layout: "default",
    },
    beforeEnter: requireAuth
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
