<template>
    <v-container class="fill-height">
        <v-responsive class="align-center fill-height">
        <v-card class="w-50  mx-auto px-6 py-5" style="height:500px;">
            <v-card-title class="justify-center mt-2">
                <span class="text-h5">Iniciar Sesión</span>
            </v-card-title>
            <v-card-text class="mt-6">
                <v-form
                ref="form"
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
            <v-card-text class="px-1">
              <v-alert
                  type="error"
                  v-model = "alertError"
                  variant="outlined"
                  text="No coinciden las credenciales. Por favor, intente nuevamente..."
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
                        Iniciar Sesión
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
      alertError: false,
      user:{
        userName: null,
        password: null,
      }
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
      
      cancelar () {
        this.$emit("changeDialogLogin", false);
      },
      save (){
        
        this.$router.push({path: '/Usuarios'})
        /*var url = 'http://localhost:4000/login'
        axios.post(url, this.user)
        .then (response => {
            this.$emit("changeDialogLogin", false);
            this.$router.push({path: '/Inicio'})
        })
        .catch(error => {
            console.log(error)
            this.alertError = true
        })*/
      }

    },
  }
</script>