<template>
  <v-app >
    <v-main class="pa-0 ma-0">
      <router-view class="pa-0 ma-0"/>
    </v-main>
    
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    icons: ['home','shopping','email'],
    dialogIniciarsesion: false,
    toggle_exclusive: 0,
    dialogRegistrarse: false,
  }),
  methods:{
    changeToggle (){
      this.dialogRegistrarse = false
      

    },
  }
};
</script>
