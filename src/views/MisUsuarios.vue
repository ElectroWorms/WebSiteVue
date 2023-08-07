<style>
.listItem {
  cursor: pointer;
}
.listItem:hover{
  background-color: gray;
}
</style>
<template>
  <SidePanelTutor/>
  <UpperPanel/>
  <FormVincular/>

</template>
<script setup>
  import SidePanelTutor from '@/components/SidePanel/SidePanelTutor.vue'
  import FormVincular from '@/components/Vincular/VincularCuentas.vue'
  import UpperPanel from '@/components/UpperPanel/UpperPanel.vue'
  import { ref } from 'vue'
</script>