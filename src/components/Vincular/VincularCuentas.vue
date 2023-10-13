<style>
.center {
    display: flex;
    justify-content: center;
}
</style>
<template>
    <v-container class="mt-7">
        <div>
            <v-row class="justify-center" >
                <v-col cols="12" sm="12" md="6" lg="6" class="pa-0">
                    <v-card class=" w-100 px-5 py-5">           
                        <v-card-title class="text-subtitle-1 text-wrap px-0">Vincular Cuenta</v-card-title>
                        <v-form ref="form">
                            <!-- <v-autocomplete v-model="userNameTerapeuta" :items="userNameTerapeutas" label="Ingrese el nombre de usuario de un terapeuta..." :disabled="!stateSelect" :rules="[v => !!v || 'El terapeuta ocupacional es requerido']"  required></v-autocomplete>-->
                            <v-text-field variant="outlined" label="Código de terapeuta" v-model="codigo" :rules="[v => !!v || 'Código es requerido']"  :readonly="!stateSelect"></v-text-field>
                        </v-form>
                        <v-row>
                            <v-col cols="12" sm="12">
                                <div class="d-flex flex-column">
                                    <v-btn color="primary" class="mt-4" block  :disabled="!activeButton" @click="validate" :loading="loading">
                                        Vincular
                                        <template v-slot:loader>
                                            <v-progress-circular indeterminate :size="20" :width="2"></v-progress-circular>
                                            <p style="margin-left: 5px; opacity: 0.5;">Vinculando</p>
                                        </template>
                                    </v-btn>
                                </div>
                            </v-col>
                            <v-col cols="12" sm="12" v-if="showChangeTo">
                                <div class="d-flex flex-column">
                                    <v-btn color="info" class="mt-4" block @click="changeTo" >
                                        Cambiar Terapeuta Ocupacional
                                    </v-btn>
                                </div>
                            </v-col>
                        </v-row>

                        <v-card class=" mt-5" v-if="showCard">           
                            <v-alert
                                :type="typeAlert"
                                :text="typeText"
                                variant="outlined"
                            ></v-alert>
                        </v-card>
                    
                    </v-card>
                </v-col>
            </v-row>
        </div>

        <div v-if="showDataTerapeuta">
            
            <v-container class=" d-flex justify-start fluid justify-center mb-5 " >
                <v-card class="w-75 border">
                    <v-card-title class="text-subtitle-1 my-2 px-7 ">Información Terapeuta Ocupacional</v-card-title>
                    <v-card-text class="mt-6">
                        <v-form>
                            <v-row class="py-1">
                                <v-col cols="4" md="4" class="">
                                    <v-row rows="2" class="center">
                                        <v-img class="border bg-white" max-width="200px" :aspect-ratio="1" :src="getCardImg()" cover></v-img>
                                    </v-row>
                                    <v-row class="center mt-6">
                                        <p>Foto de Perfil</p>
                                    </v-row>
                                </v-col>
                                <v-col cols="8" md="8" class="px-5">
                                    <v-row>
                                        <v-col cols="6" md="6">         
                                            <v-text-field
                                                v-model="terapeutaSolicitud.fullname"
                                                label="Terapeuta Ocupacional"
                                                readonly="true"
                                                variant="plain"
                                            ></v-text-field>
                                        </v-col>

                                        <v-col cols="6" md="6">
                                            <v-text-field
                                                label="Correo"
                                                v-model="terapeutaSolicitud.email"
                                                readonly="true"
                                                variant="plain"
                                            ></v-text-field>
                                        </v-col>
                                    </v-row>
                                </v-col>   
                            </v-row>
                            
                        </v-form>
                    </v-card-text>
                </v-card>
            </v-container> 
        </div>
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
    data: () =>({
        userNameTerapeutas: [],
        terapeutas: [],
        userNameTerapeuta: null,
        estado: null,
        activeButton: true,
        typeAlert: null,
        showCard: false,
        typeText: null,
        showDataTerapeuta: false,
        stateSelect: true,
        showChangeTo: false,
        terapeutaSolicitud: {
            firstName: null,
            fullname: null,
            email: null,
        },
        snackbar: {
            color: null,
            active: false,
            text: null,
            timeout: 3000,
        },
        codigo: null,
        loading: false
        
    }),

    methods:{
        async validate () {
            const { valid } = await this.$refs.form.validate()
            if (valid) {
                this.loading = true;
                this.vincular()
            }
        },
        changeTo(){
            this.activeButton = true
            this.stateSelect = true
        },
        getCardImg(){
            return '/src/assets/icons/perfil_man.png';
        },
        getTerapeutas(){
            var url = `${config.PathAPI}solicitudes/listTerapeutas`
            axios.get(url)
            .then(response => {
                var userNameTerapeutas = response.data.map(terapeuta  => terapeuta.userName)
                this.userNameTerapeutas = userNameTerapeutas
                this.terapeutas = response.data
            })
            .catch(error => {
                console.log(error)
            })
        },
        async vincular () {
            this.loading = true;
            var urlEnlazar = `${config.PathAPI}solicitudes/enlazar`
            //var terapeuta = this.terapeutas.filter (terapeuta => terapeuta.userName == this.userNameTerapeuta)[0]
            var tutor = store.user
            var childUser = store.secondUser
            var formMetada = {tutorUser: tutor, terapeutaCodigo: this.codigo, childUser, estado: 'En espera'}
            
            // eliminar los usuarios del to, el usuario ha decidido desvincular la cuenta
            if (this.showChangeTo == true){
                var urlObtenerTo = `${config.PathAPI}user/getUser/${store.vinculacion.terapeuta._id}`
                var urlUpdateUsersTo = `${config.PathAPI}solicitudes/updateUsers`
                var users = store.user.users.map(user => user.userName)

                // obtener los datos del terapeuta y modificar su lista de users (eliminar niños)
                axios.get(urlObtenerTo)
                    .then( response => {
                        console.log(response)
                        var terapeuta = response.data.user
                        var newUsersTerapeuta = []
                        terapeuta.users.forEach(user => {
                            if (!users.includes(user.userName)){
                                newUsersTerapeuta.push(user)
                            }
                        });
                        var formData ={
                            idTerapeuta: terapeuta._id,
                            users: newUsersTerapeuta
                        }
                        // enviar al terapeuta su lista de users modificado (niños eliminados)
                        axios.post(urlUpdateUsersTo, formData)
                        .then(response => {
                            // Agregar al tutor la nueva vinculacion
                            axios.post(urlEnlazar, formMetada)
                            .then(response => {
                                this.$router.go()
                            })
                            .catch(error => {
                                this.snackbar.text = 'No se encuentra un terapeuta con ese código. Intente nuevamente...'
                                this.snackbar.color = 'error'
                                this.snackbar.active = true
                                this.loading = false
                            })
                        })
                        .catch(error => {
                            this.snackbar.text = 'No se ha logrado vincular la cuenta. Intente nuevamente'
                            this.snackbar.color = 'error'
                            this.snackbar.active = true
                            this.loading = false
                        })

                    })
                    .catch(error => {
                        this.snackbar.text = 'No se ha logrado vincular la cuenta. Intente nuevamente'
                        this.snackbar.color = 'error'
                        this.snackbar.active = true
                        this.loading = false
                    })
                
            }

            else{
                axios.post(urlEnlazar, formMetada)
                .then(response => {
                    this.showCard = true
                    this.activeButton = false
                    this.typeAlert = "info"
                    this.stateSelect = false,
                    this.loading = false,
                    this.typeText = "La solicitud se encuentra en estado: En espera"

                })
                .catch(error => {
                    this.snackbar.text = 'No se encuentra un terapeuta con ese código. Intente nuevamente...'
                    this.snackbar.color = 'error'
                    this.snackbar.active = true
                    this.loading = false
                })
            }
        
        },
        getSolicitud(){
            var url = `${config.PathAPI}solicitudes/listSolicitud/${store.secondUser._id}`
            axios.get(url)
            .then(response => {
                var solicitud = response.data ? response.data[0] : null
                this.getTerapeutas()
                if (solicitud){
                    // set user
                    this.terapeutaSolicitud.userName = solicitud.terapeuta.userName
                    this.terapeutaSolicitud.fullname = solicitud.terapeuta.fullname
                    this.terapeutaSolicitud.email = solicitud.terapeuta.email

                    // estados
                    this.codigo = solicitud.terapeuta.uuid
                    this.showCard = true
                    if (solicitud.estado == "En espera"){
                        this.typeAlert = "info"
                        this.typeText = "La solicitud se encuentra en estado: En espera"
                        this.showChangeTo = false
                        this.activeButton = false
                        this.stateSelect = false
                    }
                    else if (solicitud.estado == "Aprobado"){
                        this.typeAlert = "success"
                        this.typeText = "La solicitud se encuentra en estado: Aprobada"
                        this.showChangeTo = true
                        this.activeButton = false
                        this.stateSelect = false
                        this.showDataTerapeuta = true

                    }
                    else {
                        this.typeAlert = "error"
                        this.typeText = "La solicitud se encuentra en estado: Rechazada. Puede realizar una nueva solicitud"
                        this.stateSelect = true
                        this.activeButton = true
                    }
                }
                else{
                    this.showCard = false
                }
                
            })
            .catch(error => {
                this.snackbar.text = 'No se ha logrado obtener la solicitud. Intente nuevamente'
                this.snackbar.color = 'error'
                this.snackbar.active = true
            })
        },
        
    },
    created () {
        this.getSolicitud()
        store.getVinculacion(store.secondUser._id)
    }
}
</script>