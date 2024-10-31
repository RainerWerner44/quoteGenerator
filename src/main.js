import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import 'primeicons/primeicons.css'
import Vue3Toastify from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

const app = createApp(App)
app.use(store)
app.use(Vue3Toastify, {
  autoClose: 3000,
})
app.mount('#app')
