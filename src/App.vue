<style>
.fondo-1 {
  background-image: url("@/assets/fondo-1.gif");
  background-repeat: repeat;
}
</style>
<template>
  <v-app>
    <v-main :class="fondo">
      <router-view />
    </v-main>
  </v-app>
</template>
<script setup lang="ts"> 
import config from '../config';
import { ref } from 'vue';
const fondo = ref('fondo-1');
</script>