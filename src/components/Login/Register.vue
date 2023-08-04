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
              <v-alert
                  type="error"
                  v-model = "alertError"
                  variant="outlined"
                  text="Error al crear la cuenta. Por favor, intente nuevamente..."
                ></v-alert>
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

  <v-dialog v-model="dialogSuccess" max-width="580px">
    <v-card >
      <v-card-title class="text-h5 text-center">La cuenta se ha creado la cuenta correctamente!</v-card-title>
      <v-card-text class="text-center">
        <v-icon size="75" class="align-text" max-widht="300px" color="green">
            mdi-checkbox-marked-circle-outline
        </v-icon>
    </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text variant="outlined" @click="closeDialogSuccess">Aceptar</v-btn>
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>
  </v-dialog>



</template>
<script>
import axios from 'axios'
  export default {
    data: () => ({
      typeAccount: ['Terapeuta Ocupacional', 'Tutor', 'Niño'],
      alertError: false,
      dialogSuccess: false,

      user:{
        userName: null,
        firstName: null,
        secondName: null,
        password: null,
        email:null,
        typeAccount: null,
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
      closeDialogSuccess (){
        this.$emit("changeDialogRegister", false);
      },
      cancelar () {
        this.$emit("changeDialogRegister", false);
      },
      save (){
        var url = 'http://localhost:4000/createUser'
        axios.post(url, this.user)
        .then (response => {
          console.log(response)
          this.dialogSuccess = true

        })
        .catch(error => {
          console.log(error)
          this.alertError = true
        })
      }

    },
  }
</script>