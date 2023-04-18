import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from "../components/login.vue"
import Register from "../components/register.vue"

// lazy-loaded
const Profile = () => import("../components/profile.vue")
const BoardAdmin = () => import("../components/BoardAdmin.vue")
const Chauffeur = () => import("../components/chauffeur_dashboard.vue")
const Mechanic = () => import("../components/mechanic_dashboard.vue")


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/vehicle_logs',
      name: 'vehicle_logs',
      component: () => import('../views/vehicle_logs.vue')
    },
    {
      path: "/login",
      component: Login,
    },
    {
      path: "/register",
      component: Register,
    },
    {
      path: "/profile",
      name: "profile",
      // lazy-loaded
      component: Profile,
    },
    {
      path: "/admin",
      name: "admin",
      // lazy-loaded
      component: BoardAdmin,
    },
    {
      path: "/mod",
      name: "moderator",
      // lazy-loaded
      component: Mechanic,
    },
    {
      path: "/user",
      name: "user",
      // lazy-loaded
      component: Chauffeur,
    },
  ]
})

export default router

router.beforeEach((to, from, next) => {
  const publicPages = ['/login', '/register', '/'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('user');

  // trying to access a restricted page + not logged in
  // redirect to login page
  if (authRequired && !loggedIn) {
    next('/login');
  } else {
    next();
  }
});
