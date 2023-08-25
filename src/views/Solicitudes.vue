<template>
    <div v-if="typeAccount === 'Terapeuta Ocupacional'">
      <SidePanelTerapeuta/>
    </div>
    <div v-if="typeAccount === 'Tutor'">
      <SidePanelTutor/>
    </div>
    <br>
    <div class="mx-4">
      <TableSolicitudes/>
    </div>
  </template>
  <script setup>
    import SidePanelTutor from '@/components/SidePanel/SidePanelTutor.vue'
    import SidePanelTerapeuta from '@/components/SidePanel/SidePanelTerapeuta.vue'
    import TableSolicitudes from '@/components/Solicitudes/Solicitudes.vue'
    import UpperPanel from '@/components/UpperPanel/UpperPanel.vue'
    import { ref } from 'vue'
    import {useUserStore} from '@/store/app'
    const store = useUserStore()
    const typeAccount = store.user.typeAccount
  </script>