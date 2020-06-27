import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Firebase from 'firebase'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/course',
    name: 'SingleCourse',
    component: () => import(/* webpackChunkName: "singlecourse" */ '../views/SingleCourse.vue')
  },
  {
    path: '/editarcursos',
    name: 'EditCourses',
    component: () => import(/* webpackChunkName: "addproducts" */ '../views/EditCourses.vue'),
    meta: {
      login: true
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue')
  },
  {
    path: '*',
    name: 'NotFound',
    component: () => import(/* webpackChunkName: "notfound" */ '../views/NotFound.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  let user = Firebase.auth().currentUser;
  let authRequired = to.matched.some(route => route.meta.login);

  if(!user && authRequired){
    next('/login')
  } else{
    next();
  }
})

export default router
