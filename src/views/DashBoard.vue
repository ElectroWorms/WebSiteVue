<template>
  <SidePanelUser/>
  <v-app-bar :elevation="2" class="pl-4">
      Dashboard
  </v-app-bar>
  <!-- Debe renderizarse el gráfico adecuado -->
  <MainDashBoardVue></MainDashBoardVue>
</template>
<script setup lang="ts">
  import MainDashBoardVue from '@/components/DashBoard/MainDashBoard.vue'
  import SidePanelUser from '@/components/SidePanel/SidePanelUser.vue'

</script>