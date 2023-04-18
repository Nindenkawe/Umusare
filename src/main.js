import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/main.css'
import './assets/index.css'
import store from './store/vuex'

const app = createApp(App)

app.use(router, store)

app.mount('#app')