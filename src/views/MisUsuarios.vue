<template>
  <SidePanelTutor/>
  <UpperPanel/>
  <MisUsuarios/>

</template>
<script setup>
  import SidePanelTutor from '@/components/SidePanel/SidePanelTutor.vue'
  import MisUsuarios from '@/components/MisUsuarios/MisUsuarios.vue'
  import UpperPanel from '@/components/UpperPanel/UpperPanel.vue'
  import { ref } from 'vue'
  import {useUserStore} from '@/store/app'
  const store = useUserStore()
</script>