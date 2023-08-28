<template>
    <v-container class="fill-height">
        <v-responsive class="align-center fill-height">
        <v-card class="w-50  mx-auto px-6 py-5">
            <v-card-title class="justify-center mt-2">
                <span class="text-h5">Registrarse</span>
            </v-card-title>
            <v-card-text class="mt-6">
                <v-form
                ref="form"
                >
                <v-row >
                  <v-col class="px-0"
                  cols="12"
                  md="6"
                  >
                    <v-text-field
                      v-model="user.firstName"
                      :rules="[v => !!v || 'Nombre de usuario es requerido']"
                      :counter="10"
                      label="Nombre"
                      required
                    ></v-text-field>
                  </v-col>

                  <v-col
                    cols="12"
                    md="6"
                  >
                    <v-text-field
                      v-model="user.secondName"
                      :rules="[v => !!v || 'Apellido es requerido']"
                      :counter="10"
                      label="Apellido"
                      required
                    ></v-text-field>
                  </v-col>
                </v-row>

                <v-row >
                  <v-col class="px-0"
                  cols="12"
                  md="6"
                  >
                    <v-text-field
                    label="Nombre de usuario"
                    v-model="user.userName"
                    :rules="[v => !!v || 'Nombre de usuario es requerido']"
                    ></v-text-field>
                  </v-col>

                  <v-col
                    cols="12"
                    md="6"
                  >
                    <v-text-field
                    label="Contraseña"
                    v-model="user.password"
                    type="password"
                    :rules="[v => !!v || 'Contraseña es requerido']"
                    ></v-text-field>
                  </v-col>
                </v-row>

                <v-row >
                  <v-col class="px-0"
                  cols="12"
                  md="6"
                  >
                    <v-text-field
                    label="Correo"
                    v-model="user.email"
                    type="email"
                    :rules="[v => !!v || 'Correo es requerido']"
                    ></v-text-field>
                  </v-col>

                  <v-col
                    cols="12"
                    md="6"
                  >
                    <v-select
                    :items="typeAccount"
                    label="Rol"
                    v-model="user.typeAccount"
                    :rules="[v => !!v || 'Rol es requerido']"
                    ></v-select>
                  </v-col>
                </v-row>

                </v-form>
            </v-card-text>
            <v-card-text class="px-1">
              
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

    <v-snackbar v-model="snackbar.active" :timeout="timeout" :color="snackbar.color">
        {{ snackbar.text }}
        <template v-slot:action="{ attrs }">
            <v-btn color="blue" text v-bind="attrs" @click="snackbar.active = false">
            Close
            </v-btn>
        </template>
    </v-snackbar>
</template>

<script>
import axios from 'axios'
import config from '../../../config.json'
  export default {
    data: () => ({
      typeAccount: ['Terapeuta Ocupacional', 'Tutor', 'Niño'],
      snackbar: {
        color: null,
        active: false,
        text: null,
        timeout: 3000,
      },
      user:{
        userName: null,
        firstName: null,
        secondName: null,
        password: null,
        email:null,
        typeAccount: null,
        users: []
      }
      ,
    }),
    computed: {
      
    },
    methods: {
      async validate () {
        const { valid } = await this.$refs.form.validate()
        if (valid) {
          this.save()
        }
      },
      cancelar() {
        this.$emit("changeDialogRegister", false);
      },
      save (){
        var url = `${config.PathAPI}createUser`
        axios.post(url, this.user)
        .then (response => {
          this.snackbar.text = 'La cuenta fue creada correctamente'
          this.snackbar.color = 'success'
          this.snackbar.active = true
          this.cancelar()

        })
        .catch(error => {
          this.snackbar.text = 'No se puedo crear la cuenta. Intente nuevamente'
          this.snackbar.color = 'error'
          this.snackbar.active = true
        })
      }

    },
  }
</script>