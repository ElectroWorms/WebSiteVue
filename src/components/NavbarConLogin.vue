<template>
    <v-app-bar
        app
        color="primary"
        dark
      >
        <div class="d-flex align-center">
          
          <v-btn text :to="{path:'/sesion-iniciada'}">
            <span class="mr-2">Inicio</span>
            <v-icon class="mb-1">mdi-{{ icons[0] }}</v-icon>
          </v-btn>

          <v-btn text :to="{path:'/informacion/2'}">
            <span class="mr-2">Informaciones</span>
            <v-icon class="mb-1">mdi-email</v-icon>
          </v-btn>
          
          <v-btn text :to="{path:'/postulaciones'}">
            <span class="mr-2">Postulaciones</span>
            <v-icon class="mb-1">mdi-list-box-outline</v-icon>
          </v-btn>
        
        </div>
        <v-spacer></v-spacer>

      <v-btn
       :to="{path:'/perfil'}"
        text
      >
        <span class="mr-2">Hola Matías Vargas</span>
        <v-icon>mdi-account-circle</v-icon>
      </v-btn>
  
      </v-app-bar>
    
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