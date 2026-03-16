import { createRouter, createWebHistory } from 'vue-router'
import AdminDashboard from '../pages/AdminDashboard.vue'
import AdminConsultas from '../pages/AdminConsultas.vue'
import HomePage from '../pages/HomePage.vue'
import RegistroPage from '../pages/RegistroPage.vue'

const routes = [
    {
        path: '/',
        redirect: '/home'
    },
    {
        path: '/home',
        name: 'HomePage',
        component: HomePage,
        meta: { hideSidebar: true }
    },
    {
        path: '/registro',
        name: 'Registro',
        component: RegistroPage,
        meta: { hideSidebar: true }
    },
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: AdminDashboard,
        meta: { hideSidebar: false }
    },
    {
        path: '/consultas',
        name: 'Consultas',
        component: AdminConsultas
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router