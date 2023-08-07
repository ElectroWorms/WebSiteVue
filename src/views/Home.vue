<template>

  <v-app-bar
      app
      color="primary"
      dark
      class="d-flex justify-end"
    >   
    <v-spacer></v-spacer>
    <div class="d-flex">
      <v-btn text @click="login">
        <span class="mr-2">Iniciar Sesion</span>
        <v-icon >mdi-login</v-icon>
      </v-btn>

      <v-btn text @click="register">
        <span class="mr-2">Registrarse</span>
        <v-icon >mdi-account-plus</v-icon>
      </v-btn>
    </div>
  
  </v-app-bar>
  
  <v-dialog v-model="dialogRegister"> <Register @changeDialogRegister="dialogRegister = $event"/></v-dialog>
  <v-dialog v-model="dialogLogin"> <Login @changeDialogLogin="dialogLogin = $event"/></v-dialog>

</template>

<script setup>

  import Login from '@/components/Login/Login.vue'
  import Register from '@/components/Login/Register.vue'
  import { ref } from 'vue'
  
  var dialogRegister = ref(false)
  var dialogLogin = ref(false)
  function login (){
    dialogLogin.value = true
  }
  function register (){
    dialogRegister.value = true
  }
</script>
