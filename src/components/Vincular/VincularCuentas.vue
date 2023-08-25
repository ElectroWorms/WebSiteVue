<style>
.center {
    display: flex;
    justify-content: center;
}
</style>
<template>
    <v-row>
        <v-col cols="4" md="4" sm="12" class="w-100">
            <div class="mx-5">
                <v-card class="mt-5 border">
                    <v-card-title>Vincular Cuenta</v-card-title>
                    <v-form ref="form">
                        <v-select v-model="userNameTerapeuta" :items="userNameTerapeutas" :disabled="!stateSelect" :rules="[v => !!v || 'El terapeuta ocupacional es requerido']" label="Seleccione al terapeuta" required></v-select>
                    </v-form>
                    <div>
                        <v-col cols="12" sm="12">
                            <div class="d-flex flex-column">
                                <v-btn color="success" class="mt-4" block :disabled="!activeButton" @click="vincular" >
                                    Vincular
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
                    </div>
                    <v-card class="mt-10 my-1 mx-3" v-if="showCard">           
                        <v-alert :type="typeAlert" :text="typeText" variant="outlined"></v-alert>
                    </v-card>
                </v-card>
            </div>
        </v-col>
        <v-col cols="8" v-if="showDataTerapeuta" class="w-100">
            <div class="mt-5 border mx-5">
                <v-card>
                    <v-card-title>Datos del Terapeuta Ocupacional</v-card-title>
                    <v-card-text class="mt-6">
                        <v-form ref="form">
                            <v-row >
                                <v-col cols="4" md="4" >
                                    <v-text-field v-model="terapeutaSolicitud.nombre" label="Nombre" readonly variant="underlined"></v-text-field>
                                </v-col>
                                <v-col cols="4" md="4" > <v-text-field v-model="terapeutaSolicitud.apellidoPaterno" label="Apellido Paterno" readonly variant="underlined"></v-text-field>
                                </v-col>
                                <v-col cols="4" md="4" > <v-text-field v-model="terapeutaSolicitud.apellidoMaterno" label="Apellido Materno" readonly variant="underlined"></v-text-field>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="12" md="6" >
                                    <v-text-field label="Código" v-model="terapeutaSolicitud._id" readonly variant="underlined"></v-text-field>
                                </v-col>
                                <v-col class="" cols="12" md="6" >
                                    <v-text-field label="Correo" v-model="terapeutaSolicitud.email" readonly variant="underlined"></v-text-field>
                                </v-col>
                            </v-row>
                        </v-form>   
                    </v-card-text>
                </v-card>
            </div>
        </v-col>
    </v-row>

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
            secondName: null,
            userName: null,
            email: null,
        },
        snackbar: {
            color: null,
            active: false,
            text: null,
            timeout: 3000,
        },
        
    }),

    methods:{
        changeTo(){
            this.activeButton = true
            this.stateSelect = true
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
            var url = `${config.PathAPI}solicitudes/enlazar`
            var terapeuta = this.terapeutas.filter (terapeuta => terapeuta.userName == this.userNameTerapeuta)[0]
            var tutor = store.user
            var formMetada = {tutorUser: tutor, terapeutaUser: terapeuta, estado: 'En espera'}

            // eliminar los usuarios del to, mostrar flag, el usuario a decidido desvincular la cuenta
            if (this.showChangeTo == true){
                console.log(store.vinculacion)
                var url2 = `${config.PathAPI}getUser/${store.vinculacion.terapeuta._id}`
                var url3 = `${config.PathAPI}solicitudes/updateUsers`
                var users = store.user.users.map(user => user.userName)
                axios.get(url2)
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
                        console.log(formData)
                        axios.post(url3, formData)
                        .then(response => {
                            axios.post(url, formMetada)
                            .then(response => {
                                this.$router.go()
                            })
                            .catch(error => {
                                this.snackbar.text = 'No se ha logrado procesar la solicitud. Intente nuevamente'
                                this.snackbar.color = 'error'
                                this.snackbar.active = true
                            })
                        })
                        .catch(error => {
                            this.snackbar.text = 'No se ha logrado vincular la cuenta. Intente nuevamente'
                            this.snackbar.color = 'error'
                            this.snackbar.active = true
                        })

                    })
                    .catch(error => {
                        this.snackbar.text = 'No se ha logrado vincular la cuenta. Intente nuevamente'
                        this.snackbar.color = 'error'
                        this.snackbar.active = true
                    })
                
            }

            else{
                axios.post(url, formMetada)
                .then(response => {
                    this.showCard = true
                    this.activeButton = false
                    this.typeAlert = "info"
                    this.stateSelect = false,
                    this.typeText = "La solicitud se encuentra en estado: En espera"

                })
                .catch(error => {
                    this.snackbar.text = 'No se ha logrado procesar la solicitud. Intente nuevamente'
                    this.snackbar.color = 'error'
                    this.snackbar.active = true
                })
            }
        
        },
        getSolicitud(){
            var url = `${config.PathAPI}solicitudes/listSolicitud/${store.user._id}`
            axios.get(url)
            .then(response => {
                var solicitud = response.data ? response.data[0] : null
                this.getTerapeutas()
                if (solicitud){
                    // set user
                    this.terapeutaSolicitud.userName = solicitud.terapeuta.userName
                    this.terapeutaSolicitud.firstName = solicitud.terapeuta.firstName
                    this.terapeutaSolicitud.secondName = solicitud.terapeuta.secondName
                    this.terapeutaSolicitud.email = solicitud.terapeuta.email

                    // estados
                    this.userNameTerapeuta = solicitud.terapeuta.userName
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
        store.getVinculacion()
    }
}
</script>