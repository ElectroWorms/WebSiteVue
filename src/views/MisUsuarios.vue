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
  <v-card class="mx-6 mt-6 ">   
      <v-list density="compact">
          <v-list-subheader>Mis Pacientes</v-list-subheader>

          <v-list-item v-for="(item, i) in items" :key="i" :value="item" color="primary" @click="redirect(item._id)">
              <template v-slot:prepend>
                  <v-icon :icon="item.icon"></v-icon>
              </template>
              <v-list-item-title>{{item.text}}</v-list-item-title>
          </v-list-item>
      </v-list>
  </v-card>

</template>
<script setup>
import SidePanelTutor from '@/components/SidePanel/SidePanelTutor.vue'
import UpperPanel from '@/components/UpperPanel/UpperPanel.vue'
import { ref } from 'vue'
import router from '@/router'

let items = ref(
  [
        { _id: '64bca90144fa10c5ff739d92', text: 'Real-Time', icon: 'mdi-profile' },
        { text: 'Audience', icon: 'mdi-account' },
        { text: 'Conversions', icon: 'mdi-flag' },
      ])
function redirect(UserID){ 
    console.log(UserID)
    router.push({ name: 'MenuActividades', params: { UserId: UserID } });
}
</script>