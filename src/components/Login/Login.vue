<style>
.center {
  display: flex;
  justify-content: center;
  align-items: center;
}
.form {
  max-width: 300px;
  max-height: 400px;
}
</style>
<template>
    <v-container class="fill-height">
        <v-responsive class="mt-12 fill-height">
        <v-card class="mx-auto px-6 py-5 form" style="height:500px;">
            <v-card-title class="justify-center mt-2 text-center">
                <span class="text-h5">Iniciar Sesión</span>
            </v-card-title>
            <v-card-text class="mt-6">
                <v-form ref="form">
                  <v-row>
                      <v-text-field label="Nombre de usuario" v-model="user.username" :rules="[v => !!v || 'Nombre de usuario es requerido']" variant="underlined"></v-text-field>
                  </v-row>
                  <v-row>
                      <v-text-field label="Contraseña" v-model="user.password" :rules="[v => !!v || 'Contraseña es requerido']" type="password" variant="underlined"></v-text-field>
                  </v-row>
                </v-form>
            </v-card-text>
            <v-card-text class="px-1">
              <a class="center" style="color: #5687dc;">Olvidaste tu contraseña?</a>
            </v-card-text>

            <v-container class="px-0">
                <v-card-actions class="center">
                    <v-btn color="success" prepend-icon="mdi-login" variant="tonal" @click="validate" :loading="loading">
                        Iniciar Sesión
                        <template v-slot:loader>
                          <v-progress-circular indeterminate :size="20" :width="2"></v-progress-circular>
                          <p style="margin-left: 5px; opacity: 0.5;">Cargando</p>
                        </template>
                    </v-btn>    
                </v-card-actions>
            </v-container>
        </v-card>
        </v-responsive>
    </v-container>

    <v-snackbar v-model="snackbar.active" :timeout="snackbar.timeout" :color="snackbar.color">
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
import {useUserStore} from "../../store/app"
import config from '../../../config.json'
const store = useUserStore()
export default {
  data: () => ({
    snackbar: {
      color: null,
      active: false,
      text: null,
      timeout: 3000,
    },
    user:{
      username: null,
      password: null,
    },
    loading: false,
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
      this.loading = true;
      var url = `${config.PathAPI}user/login`
      axios.post(url, this.user)
      .then (response => {
        console.log(response)
        if (response.data.state && response.data.item.length == 1) {
          let Usuario = response.data.item[0];
          store.$patch({
            user: Usuario
          })
          this.$emit("changeDialogLogin", false);
          this.loading = false;
          this.$router.push({path: '/Usuarios'})
        }
        else {
          this.snackbar.text = response.data.message
          this.snackbar.color = 'error'
          this.snackbar.active = true
          this.loading = false
        }
      })
      .catch(error => {
          this.snackbar.text = 'Credenciales incorrectas'
          this.snackbar.color = 'error'
          this.snackbar.active = true
          this.loading = false
      })
    }

  },
}
</script>