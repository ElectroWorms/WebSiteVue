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
    <v-app-bar-nav-icon variant="text" class="d-lg-none" @click="showDrawer()"></v-app-bar-nav-icon>
    <v-btn @click="back" icon="mdi-arrow-left" color="primary" class="ml-md-9"></v-btn>
		<span  class="d-none d-md-flex"  style="width: 95px; padding-left: 0px; margin-left: -15px;">
            <v-img
                class="d-none d-md-flex pl-0"
                src="../../../public/img/Logo-Oficial 1.png"
                width="auto"     
            />
        </span>
        <v-text class="mb-md-1"> Vincular Cuenta</v-text>
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
  const showDrawer = () =>{
        store.$patch({
                navbarMobile: {active:true}
        })
    }
</script>