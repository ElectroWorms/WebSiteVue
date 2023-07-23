<template>
  <v-app-bar app color="primary" dark>
    <div class="d-flex align-center">

      <v-btn text :to="{ path: '/' }">
        <span class="mr-2">Inicio</span>
        <v-icon class="mb-1">mdi-{{ icons[0] }}</v-icon>
      </v-btn>
      <v-btn text :to="{ path: '/informacion/1' }">
        <span class="mr-2">Informaciones</span>
        <v-icon class="mb-1">mdi-email</v-icon>
      </v-btn>
      <Login :flag="true"/>
    </div>

  </v-app-bar>

</template>
<script>
import Login from "@/components/Login.vue"
export default {
  name: 'App',
  components: {
    Login
  },
  data: () => ({
    icons: ['home', 'shopping', 'email'],
    dialogIniciarsesion: false,
    toggle_exclusive: 0,
    dialogRegistrarse: false,
  }),
  methods: {
    changeToggle() {
      this.dialogRegistrarse = false


    },
  }
};
</script>