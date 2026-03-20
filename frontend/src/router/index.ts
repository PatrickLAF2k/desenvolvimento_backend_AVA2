import { createRouter, createWebHistory } from 'vue-router'

import HomePage from '../pages/HomePage.vue'
import RegistroPage from '../pages/RegistroPage.vue'

import DashboardAdmin from '../pages/admin/DashboardAdmin.vue'
import ConsultasAdmin from '../pages/admin/ConsultasAdmin.vue'
import PacientesAdmin from '../pages/admin/PacientesAdmin.vue'

import DashboardPaciente from '../pages/paciente/DashboardPacientes.vue'
import AgendarPacientes from '../pages/paciente/AgendarPacientes.vue'

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
        path: '/dashboardPaciente',
        name: 'DashboardPaciente',
        component: DashboardPaciente,
        meta: { hideSidebar: false }
    },
    {
        path: '/agendamentosPaciente',
        name: 'AgendarPaciente',
        component: AgendarPacientes,
        meta: { hideSidebar: false }
    },
    {
        path: '/consultasAdmin',
        name: 'ConsultasAdmin',
        component: ConsultasAdmin,
        meta: { hideSidebar: false }
    },
    {
        path: '/dashboardAdmin',
        name: 'DashboardAdmin',
        component: DashboardAdmin,
        meta: { hideSidebar: false }
    },
    {
        path: '/pacientesAdmin',
        name: 'PacientesAdmin',
        component: PacientesAdmin,
        meta: { hideSidebar: false }
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router