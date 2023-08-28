<template>
  <SidePanelUser/>
  
  <v-app-bar :elevation="2" class="pl-4">
      Vincular Cuentas
  </v-app-bar>
  
  <FormVincular/>

</template>
<script setup>
  import SidePanelUser from '@/components/SidePanel/SidePanelUser.vue'
  import FormVincular from '@/components/Vincular/VincularCuentas.vue'
  import UpperPanel from '@/components/UpperPanel/UpperPanel.vue'
  import { ref } from 'vue'
  import {useUserStore} from '@/store/app'
  const store = useUserStore()
  const typeAccount = store.user.typeAccount
</script>