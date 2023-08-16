<template>
  <div v-if="typeAccount === 'Terapeuta Ocupacional'">
      <SidePanelTerapeuta/>
  </div>
  <div v-if="typeAccount === 'Tutor'">
    <SidePanelTutor/>
  </div>
  <UpperPanel/>
  <FormVincular/>

</template>
<script setup>
  import SidePanelTutor from '@/components/SidePanel/SidePanelTutor.vue'
  import SidePanelTerapeuta from '@/components/SidePanel/SidePanelTerapeuta.vue'
  import FormVincular from '@/components/Vincular/VincularCuentas.vue'
  import UpperPanel from '@/components/UpperPanel/UpperPanel.vue'
  import { ref } from 'vue'
  import {useUserStore} from '@/store/app'
  const store = useUserStore()
  const typeAccount = store.user.typeAccount
</script>