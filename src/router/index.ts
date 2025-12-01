import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import { Preferences } from '@capacitor/preferences';
import HomePage from '../views/HomePage.vue';

// const app_status = await Preferences.get('app_status','');
// console.log(app_status);



const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/RegisterPage.vue')
  },
  {
    path: '/create-profile',
    name: 'CreateProfile',
    component: () => import('../views/CreateProfilePage.vue') 
  },
  {
    path: '/dashboard-buyer',
    name: 'DashboardBuyer',
    component: () => import('../views/DashboardBuyer.vue')
  },
  {
    path:'/coffee-products',
    name:'CoffeeProducts',
    component: () => import('../views/CoffeeProducts.vue')
  },
  {
    path:'/options',
    name:'Options',
    component: () => import('../views/TemplatePage.vue')
  },

  {
    path:'/nearby-coffee-shops',
    name:'NearbyCoffeeShops',
    component: () => import('../views/NearbyCoffeeShop.vue')
  },
  {
    path:'/coffee-shop',
    name:'Coffee Shop',
    component:() => import('../views/CoffeeShop.vue')
  },
  {
    path:'/product-details',
    name:'Product Details',
    component:()=>import('../views/ProductDetails.vue')
  },
  {
    path:'/buy-coffee',
    name:'Buy Coffee',
    component:()=>import('../views/BuyCoffee.vue')
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});









router.beforeEach(async (to, from, next) => {
const { value: app_status } = await Preferences.get({ key: 'app_status' });

console.log("App status:", app_status);
if (app_status==='active' && to.name === 'Home') {
return next('/dashboard-buyer');
}


next();
});













export default router
