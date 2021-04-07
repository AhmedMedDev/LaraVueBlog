

require('./bootstrap');

window.Vue = require('vue');

import VueRouter from 'vue-router'

Vue.use(VueRouter)


import MainHeader from './components/MainHeaderComponent'
import PostComp from './components/PostComponent'
import routes from './routes'

// ES6 Modules or TypeScript
import Swal from 'sweetalert2'
window.Swal = Swal
const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
})
window.Toast = Toast

const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success m-2 deleteButton',
      cancelButton: 'btn btn-danger m-2 cancelButton'
    },
    buttonsStyling: false
  })

window.swalWithBootstrapButtons = swalWithBootstrapButtons

const router = new VueRouter({
    mode : 'history',
    routes 
})


const app = new Vue({
    el: '#app',
    router,
    components : {
        MainHeader,
        PostComp
    }
});
