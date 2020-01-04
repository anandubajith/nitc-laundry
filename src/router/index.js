import Vue from 'vue';
import VueRouter from 'vue-router';
import firebase from 'firebase/app';
import 'firebase/auth';

import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import About from '../views/About.vue';
import NewOrder from '../views/NewOrder.vue';
import RegisterCA from '../views/RegisterCA.vue';
import AdminLogin from '../views/admin/Login.vue';
import AdminDashboard from '../views/admin/Dashboard.vue';
import AdminSingleOrder from '../views/admin/SingleOrder.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '*',
    redirect: '/login',
  },
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/about',
    name: 'About',
    component: About,
  },
  {
    path: '/register',
    name: 'Register',
    component: RegisterCA,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/order/new',
    name: 'newOrder',
    component: NewOrder,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/admin/login',
    name: 'AdminLogin',
    component: AdminLogin,
  },
  {
    path: '/admin/dashboard',
    name: 'AdminDashboard',
    component: AdminDashboard,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/admin/order/:user/:order',
    name: 'AdminSingleOrder',
    component: AdminSingleOrder,
    meta: {
      requiresAuth: true,
    },
  },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

router.beforeEach((to, from, next) => {
  const { currentUser } = firebase.auth();
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (requiresAuth && !currentUser) next('login');
  // else if (!requiresAuth && currentUser) next('home');
  else next();
});

export default router;
