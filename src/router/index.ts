// Composables
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/views/Home.vue'),
    
    // children: [
    //   {
    //     path: '',
    //     name: 'Home',
    //     // route level code-splitting
    //     // this generates a separate chunk (about.[hash].js) for this route
    //     // which is lazy-loaded when the route is visited.
    //     component: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue'),
    //   },
    // ],
  },
  {
    path: '/Usuarios',
    component: () => import('@/views/MisUsuarios.vue'),
  },
  {
    path: '/Vincular',
    component: () => import('@/views/Vincular.vue'),
  },
  {
    path: '/Dashboard',
    component: () => import('@/views/Dashboard.vue'),
  },
  {
    path: '/Solicitudes',
    component: () => import('@/views/Solicitudes.vue'),
  },
  {
    path:'/User/MiCuenta',
    component: () => import('@/views/MiCuenta.vue'),
  },
  {
    name: 'DetalleActividad',
    path: '/Actividad/Detalle/:ActividadId/:UserId',
    props: true,
    component: () => import('@/views/DetalleActividad.vue'),
  },
  {
    name: 'Juegos',
    path: '/Juegos/List/:ActividadId/:UserId',
    props: true,
    component: () => import('@/views/Juegos.vue'),
  },
  {
    name: 'MenuActividades',
    path: '/Actividad/List/:UserId',
    props: true,
    component: () => import('@/views/MenuActividades.vue'),
  },
  {
    name: 'DetalleRutina',
    path: '/Rutina/Detalle/:RoutineId/:ActividadId/:UserId',
    props: true,
    component: () => import('@/views/DetalleRutina.vue'),
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
