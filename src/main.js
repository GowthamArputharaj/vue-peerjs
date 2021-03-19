import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Peer from 'peerjs';
import $ from 'jquery'

// import { v4 as uuidv4 } from 'uuid';

// var $ = require('jquery')

createApp(App).use(store).use(router).mount('#app')

$('#myModal').on('shown.bs.modal', function () {
    $('#myInput').trigger('focus')
});
