import { createRouter, createWebHistory } from 'vue-router'
import AdminDashboard from '../pages/AdminDashboard.vue'
import AdminConsultas from '../pages/AdminConsultas.vue'

const routes = [
    {
        path: '/',
        redirect: '/dashboard'
    },
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: AdminDashboard
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