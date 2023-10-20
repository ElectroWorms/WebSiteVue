<template>
  <SidePanelUser/>
  <v-app-bar :elevation="2" class="changeAppBar">
    <v-app-bar-nav-icon variant="text" class="d-lg-none" @click="showDrawer()"></v-app-bar-nav-icon>
    <v-btn @click="back" icon="mdi-arrow-left" color="primary" class="ml-md-9"></v-btn>
		<span  class="d-none d-md-flex"  style="width: 95px; padding-left: 0px; margin-left: -15px;">
        <v-img
            class="d-none d-md-flex pl-0"
            src="/img/Logo-Oficial.png"
            width="auto"     
        />
    </span>
    <v-text class="mb-md-1"> Gráficos</v-text>
  </v-app-bar>
  <!-- Debe renderizarse el gráfico adecuado -->
  <MainDashBoardVue></MainDashBoardVue>
</template>
<script setup lang="ts">
  import MainDashBoardVue from '@/components/Dashboard/MainDashboard.vue'
  import SidePanelUser from '@/components/SidePanel/SidePanelUser.vue'
  import router from '@/router'
  import {useUserStore} from "../store/app";
  const store = useUserStore()
  const back = () => {
        router.push({ name: 'Usuarios'});
  }
  const showDrawer = () =>{
        store.$patch({
                navbarMobile: {active:true}
        })
  }
</script>