import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import App from '../App.vue'
import Chat from '../views/Chat.vue'
import Call from '../views/Call.vue'
import Video from '../views/Video.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import NotFound from '@/components/NotFound.vue'
import store from '../store';


const routes = [
  {
    path: '/',
    name: '',
    component: Home,
  },
  {
    path: '/home',
    name: 'home',
    component: Home,
    meta: {
      // requiresAuth: true,
    }
  },
  {
    path: '/chat',
    name: 'chat',
    component: Chat,
    meta: {
      // requiresAuth: true,
    }
  },
  {
    path: '/call',
    name: 'call',
    component: Call,
    meta: {
      // requiresAuth: true,
    }
  },
  {
    path: '/video',
    name: 'video',
    component: Video,
    meta: {
      // requiresAuth: true,
    }
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: "/:catchAll(.*)*",
    name: 'not_found',
    component: NotFound
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {

  var homePage = 'home';

  if(store.getters.getIsAuth) { 
    if(to.name == 'login' || to.name == 'register') {
      router.replace(homePage);
    } else {
      next();
    }
  } else { 

    if(to.name == 'login' || to.name == 'register') {
      // router.replace('login')
      next();
    } else {
      store.dispatch('dbAuthUser', to.name);
      // next();
    }
  }
});

export default router
