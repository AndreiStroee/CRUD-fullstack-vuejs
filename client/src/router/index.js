import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

function loginRedirectHome(to, from, next) {
  if (localStorage.token) {
    next('/home');
  } else {
    next();
  }
}

function isLoggedin(to, from, next) {
  if (localStorage.token) {
    next();
  } else {
    next('/');
  }
}

const routes = [
  {
    path: '/home',
    name: 'home',
    component: Home,
    beforeEnter: isLoggedin,
  },
  {
    path: '/create',
    name: 'create',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "create" */ '../views/Create.vue'),
    beforeEnter: isLoggedin,
  },
  {
    path: '/edit/:id',
    name: 'edit',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "edit" */ '../views/Edit.vue'),
    beforeEnter: isLoggedin,
  },
  {
    path: '/',
    name: 'login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue'),
    beforeEnter: loginRedirectHome,
  },
  {
    path: '/signup',
    name: 'signup',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "signup" */ '../views/Signup.vue'),
    beforeEnter: loginRedirectHome,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
