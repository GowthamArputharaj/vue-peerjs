import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Chat from '../views/Chat.vue'
import Call from '../views/Call.vue'
import Video from '../views/Video.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/chat',
    name: 'Chat',
    component: Chat
  },
  {
    path: '/call',
    name: 'Call',
    component: Call
  },
  {
    path: '/video',
    name: 'Video',
    component: Video
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
