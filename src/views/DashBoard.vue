<template>
  <SidePanelUser/>
  <v-app-bar :elevation="2" class="changeAppBar">
    <v-app-bar-nav-icon variant="text" class="d-md-none" color="primary"></v-app-bar-nav-icon>
		<v-text class="pl-md-15 pl-lg-15"> Gráficos</v-text>
  </v-app-bar>
  <!-- Debe renderizarse el gráfico adecuado -->
  <MainDashBoardVue></MainDashBoardVue>
</template>
<script setup lang="ts">
  import MainDashBoardVue from '@/components/Dashboard/MainDashboard.vue'
  import SidePanelUser from '@/components/SidePanel/SidePanelUser.vue'

</script>