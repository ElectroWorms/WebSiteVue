<template>

    <v-card max-width="600px" class="mx-auto my-15">
        <v-card-title>
            <span class="text-h5">Iniciar sesión</span>
        </v-card-title>
        <v-card-text class="mt-4 px-10">
            <v-form
                ref="form"
                v-model="valid"
                lazy-validation
            >
                <v-row>
                    <v-text-field
                        label="Email"
                        v-model="defaultUser.email"
                        :rules="[v => !!v || 'Nombre usuario es requerido']"
                    >
                    </v-text-field>
                </v-row>

                <v-row>
                    <v-text-field
                        label="Contraseña"
                        v-model="defaultUser.password"
                        :rules="[v => !!v || 'Contraseña es requerido']"
                    >
                    </v-text-field>
                </v-row>                
            </v-form>
        </v-card-text>
        <v-alert
            outlined
            dense
            v-model = "alertLogin"
            type="error"
            max-width="550px"
            class="mx-auto "
        >
        Credenciales Incorrectas
        </v-alert>
        <v-card-actions class="mt-5 pt-5">
            <v-spacer></v-spacer>
            <v-btn
                color="blue darken-1"
                text
                @click="validate"
                >
                Iniciar Sesión
            </v-btn>

            <v-btn
                color="red darken-1"
                text
                @click="close"
                >
                Registrarse
            </v-btn>
        </v-card-actions>
        
    </v-card>

</template>

<script>
//import Register from "@/components/Register.vue"
import axios from "axios";
export default {
    //props: ['flag'],
    name: 'login',
    components: {
        //Register
    },

    data () {
        return{
            defaultUser: {
                email: null,
                password: null,
            },
            alertLogin: false
        }
    },
   
    methods: {
        validate () {
            if(this.$refs.form.validate()){
                this.login()
            }
        },
        login (){
            var url = 'http://localhost:3000/login'
            axios.post(url, this.defaultUser)
            .then(res => {
                console.log(res)
            })
            .catch(error => {
                console.log(error)
                this.alertLogin = true
            })
        }

    },
}
</script>

<style lang="scss">

</style>