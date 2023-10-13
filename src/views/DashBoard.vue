<template>
  <SidePanelUser/>
  <v-app-bar :elevation="2" class="changeAppBar">
    <v-app-bar-nav-icon variant="text" class="d-lg-none" @click="showDrawer()"></v-app-bar-nav-icon>
    <v-btn @click="back" icon="mdi-arrow-left" color="primary" class="ml-md-2 ml-lg-2"></v-btn>
		<v-text class="pl-md-2 pl-lg-2"> Gráficos</v-text>
  </v-app-bar>
  <!-- Debe renderizarse el gráfico adecuado -->
  <MainDashBoardVue></MainDashBoardVue>
</template>
<script setup lang="ts">
  import MainDashBoardVue from '@/components/Dashboard/MainDashboard.vue'
  import SidePanelUser from '@/components/SidePanel/SidePanelUser.vue'
  import router from '@/router'
  import {useUserStore} from "../store/app"
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