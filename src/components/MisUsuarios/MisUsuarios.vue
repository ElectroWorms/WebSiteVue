<template>
    <div>
        <v-card-title class="text-subtitle-1 ">Mis Usuarios</v-card-title>
        <v-container class="border d-flex justify-start mx-1 mb-5 elevation-0" fluid >

            <v-card class="w-100 px-1 py-1">
                <v-row>
                <v-toolbar density="">
                    <v-spacer></v-spacer>
                    <v-btn
                        color="blue darken-1"
                        text
                        variant="outlined"
                        v-if="isTutor"
                        @click="dialogCreateUser = true"
                        >
                        Agregar Niño
                    </v-btn>
                </v-toolbar>
                </v-row>
                <v-row>
                    <v-col cols="3 " v-for="item in users" :key="item._id">
                        <v-card
                            color="primary"
                            theme="dark"
                            class="rounded-lg"
                            >
                            <div class="d-flex flex-no-wrap">
                            <div>
                                <v-card-title class="text-h5 ">
                                    {{item.userName}}
                                </v-card-title>
                                <v-card-subtitle>{{item.firstName}} {{item.secondName}}</v-card-subtitle>
                                <v-card-actions>
                                <v-btn
                                    class="ms-2"
                                    icon="mdi-play"
                                    variant="text"
                                    @click="initPerfil(item)"
                                ></v-btn>
                                <v-btn
                                    class="ms-2"
                                    icon="mdi-delete"
                                    variant="text"
                                    @click="deletePerfil"
                                ></v-btn>
                                </v-card-actions>
                            </div>
                            <v-avatar
                                class=""
                                size="125"
                                rounded="0"
                            >
                                <v-img src="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Blank&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"></v-img>
                            </v-avatar>
                            </div>
                        </v-card>  
                        
                    
                    </v-col>
                </v-row>
            </v-card>
                
            
        </v-container>
    </div>

    <v-dialog v-model="dialogCreateUser">
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
                        <v-text-field
                        label="Rol"
                        disabled="true"
                        v-model="user.typeAccount"
                        ></v-text-field>
                    </v-col>
                    </v-row>

                    </v-form>
                </v-card-text>
                <v-card-text class="px-1">
                <v-alert
                    type="info"
                    v-model = "alertError"
                    variant="outlined"
                    text="Se recomienda utilizar el mismo correo y contraseña para todas las cuentas"
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
                        @click="dialogCreateUser = false"
                        >
                        Cancelar
                    </v-btn>
                    </v-card-actions>
                    
                </v-container>
            </v-card>
    </v-dialog>
    
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
import {useUserStore} from "../../store/app"
const store = useUserStore()
const vinculacion = store.vinculacion
var cuentaVinculada = false
var formData = {}
import config from '../../../config.json'
export default {
    data: () =>({
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
            email:store.user.email,
            typeAccount: "Niño",
        },
        dialogCreateUser: false,
        isTutor: false,
        users: store.user.users ? store.user.users : null,
    }),

    methods:{
        async validate () {
            const { valid } = await this.$refs.form.validate()
            if (valid) {
                this.save()
            }
        },
        initPerfil(item){
            store.$patch({
                secondUser: item
            })

            this.$router.push({path: '/User/MiCuenta'})
        },

        save (){

            let url = `${config.PathAPI}createUser`
            let url2 = `${config.PathAPI}addUser`

            axios.post(url, this.user)
            .then (responseUser => {
                axios.post(url2, {})
                .then(response => {
                    console.log(formData)
                    this.snackbar.text = 'La cuenta ha sido agregada correctamente'
                    this.snackbar.color = 'success'
                    this.snackbar.active = true
                    this.dialogCreateUser = false

                    // Modificar el usuario incluyendo el nuevo usuario niño a la lista de usuarios
                    let newUser = store.user
                    newUser.users.push(responseUser.data.user)
                    store.$patch({
                        user: newUser
                    })

                })
                .catch(error => {
                    this.snackbar.text = 'No se ha podido crear la cuenta. Intente nuevamente'
                    this.snackbar.color = 'error'
                    this.snackbar.active = true
                    this.dialogCreateUser = false
                })
            })
            .catch(error => {
                this.snackbar.text = 'No se ha podido crear la cuenta. Intente nuevamente'
                this.snackbar.color = 'error'
                this.snackbar.active = true
                this.dialogCreateUser = false
            })
        }
    },
    
    created () {
        if (vinculacion.estado !== "Aprobado") {
            cuentaVinculada = false
            formData = {
                idTutor: store.user._id,
                idTerapeuta: null,
                user: this.user,
                cuentaVinculada
            }
        }
        else{
            cuentaVinculada = true
            store.getVinculacion()
            formData = {
                idTutor: store.vinculacion.tutor._id,
                idTerapeuta: store.vinculacion.terapeuta._id,
                user: this.user,
                cuentaVinculada
            }
        }
        this.isTutor= store.user.typeAccount == "Tutor" ? true : false
    }
}
</script>