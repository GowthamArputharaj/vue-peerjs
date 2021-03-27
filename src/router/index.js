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
    name: 'h',
    component: App,
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
    path: "/:catchAll(.*)",
    name: 'not_found',
    component: NotFound
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {

  if(store.getters.getIsAuth) {
    next();
  } else {
    if(to.name == 'login' || to.name == 'register') {
      // router.replace('login')
      next();
    } else {
      console.log('11111111111111111111111111111111111111111111111111')
      store.dispatch('dbAuthUser');
      console.log('22222222222222222222222222222222222222222222222222')
    }
    console.log('Dispatched dbAuthUser from router else', to.name);
  }
  // if(to.meta.requiresAuth && !store.getters.getIsAuth) {
  // } to.name == 'login'
});

export default router
