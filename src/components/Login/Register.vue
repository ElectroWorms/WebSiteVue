<template>
    <v-container class="fill-height">
        <v-responsive class="align-center fill-height">
        <v-card class="w-50  mx-auto px-6 py-5" style="height:500px;">
            <v-card-title class="justify-center mt-2">
                <span class="text-h5">Registrarse</span>
            </v-card-title>
            <v-card-text class="mt-6">
                <v-form
                ref="form"
                v-model="valid"
                lazy-validation
                >
                <v-row>
                    <v-text-field
                    label="Nombre de usuario"
                    v-model="user.userName"
                    :rules="[v => !!v || 'Nombre de usuario es requerido']"
                    ></v-text-field>
                </v-row>

                <v-row>
                    <v-text-field
                    label="Contraseña"
                    v-model="user.password"
                    :rules="[v => !!v || 'Contraseña es requerido']"
                    ></v-text-field>
                </v-row>
                </v-form>
            </v-card-text>
            <v-container class="px-0">
                <v-card-actions >
                  <v-btn
                      color="blue darken-1"
                      text
                      variant="outlined"
                      @click="validate"
                      >
                      Registrarse
                  </v-btn>
                  
                  <v-btn
                      color="red darken-1"
                      text
                      variant="outlined"
                      @click="cancelar"
                      >
                      Cancelar
                  </v-btn>
                </v-card-actions>
            </v-container>
        </v-card>
        </v-responsive>
    </v-container>
    
</template>
<script>
import axios from 'axios'
  export default {
    data: () => ({
      user:{
        userName: null,
        password: null,
      }
      ,
    }),
    computed: {
      
    },
    methods: {
      validate () {
        if(this.$refs.form.validate()){
          this.save()
        }
      },
      
      cancelar () {
        this.$emit("changeDialogRegister", false);
      },
      save (){
        var url = 'http://localhost:3000/login'
        axios.post(url, this.user)
        .then (response => {
            console.log(response)
        })
        .catch(error => {
            console.log(error)
            this.errorDialog = true
        })
      }

    },
  }
</script>