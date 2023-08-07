<template>
    <SidePanelTutor/>
    <UpperPanel/>
    <TableSolicitudes/>
  </template>
  <script setup>
    import SidePanelTutor from '@/components/SidePanel/SidePanelTutor.vue'
    import TableSolicitudes from '@/components/Solicitudes/Solicitudes.vue'
    import UpperPanel from '@/components/UpperPanel/UpperPanel.vue'
    import { ref } from 'vue'
    import {useUserStore} from '@/store/app'
    const store = useUserStore()
    console.log(store.user)
  </script>