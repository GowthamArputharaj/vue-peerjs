import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import Peer from 'peerjs';
// import $ from 'jquery'
require('bootstrap');

// import { v4 as uuidv4 } from 'uuid';

var $ = require('jquery')

createApp(App).use(store).use(router).mount('#app')
