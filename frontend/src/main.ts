import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import './global.scss'

import VCalendar from 'v-calendar';
import 'v-calendar/style.css';

const app = createApp(App)

app.use(VCalendar, {})

app.use(router)
app.mount('#app')