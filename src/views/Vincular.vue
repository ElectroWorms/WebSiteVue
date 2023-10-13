<style>
@media (min-width: 1280px) {
    .changeAppBar {
        width:100% !important;
        margin-left: -55px;
    }
}

</style>
<template>
  <SidePanelUser/>
  
  <v-app-bar :elevation="2" class="changeAppBar">
    <v-app-bar-nav-icon variant="text" class="d-md-none" color="primary"></v-app-bar-nav-icon>
		<v-text class="pl-md-14 pl-lg-14"> Vincular Cuenta</v-text>
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