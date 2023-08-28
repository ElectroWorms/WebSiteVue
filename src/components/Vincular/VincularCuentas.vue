<template>
    <div>
        <v-card-title class="text-subtitle-1 ">Vincular Cuenta</v-card-title>
        <v-container class="border d-flex justify-start w-75 mx-2 mb-5 elevation-0" >
            <v-card class="w-50 px-1 py-1">           
                <v-form ref="form">
                    <v-select
                        v-model="userNameTerapeuta"
                        :items="userNameTerapeutas"
                        :disabled="!stateSelect"
                        :rules="[v => !!v || 'El terapeuta ocupacional es requerido']"
                        label="Seleccione al terapeuta"
                        required
                    ></v-select>
                </v-form>
                <v-row>
                    <v-col cols="12" sm="12">
                        <div class="d-flex flex-column">
                            <v-btn
                            color="success"
                            class="mt-4"
                            block
                            :disabled="!activeButton"
                            @click="vincular"
                            >
                            Vincular
                            </v-btn>
                        </div>
                    </v-col>
                    <v-col cols="12" sm="12" v-if="showChangeTo">
                        <div class="d-flex flex-column">
                            <v-btn
                            color="info"
                            class="mt-4"
                            block
                            @click="changeTo"
                            >
                            Cambiar Terapeuta Ocupacional
                            </v-btn>
                        </div>
                    </v-col>
                </v-row>

                <v-card class=" mt-10 fill-height my-1 mx-1" v-if="showCard">           
                <v-alert
                    :type="typeAlert"
                    :text="typeText"
                    variant="outlined"
                ></v-alert>
                </v-card>
                
            </v-card>
        </v-container>
    </div>

    <div v-if="showDataTerapeuta">
        <v-card-title class="text-subtitle-1 ">Información Terapeuta Ocupacional</v-card-title>
            <v-container class="border d-flex justify-start w-75 mx-2 mb-5 elevation-0" >
                <v-card class="w-75 border">
                    <v-card-text class="mt-6">
                        <v-form
                        ref="form"
                        >
                        <v-row >
                        <v-col class="px-1"
                        cols="12"
                        md="6"
                        >
                            <v-text-field
                            v-model="terapeutaSolicitud.firstName"
                            label="Nombre"
                            disabled="true"
                            ></v-text-field>
                        </v-col>

                        <v-col
                            cols="12"
                            md="6"
                        >
                            <v-text-field
                            v-model="terapeutaSolicitud.secondName"
                            label="Apellido"
                            disabled="true"
                            ></v-text-field>
                        </v-col>
                        </v-row>

                        <v-row >
                        <v-col class="px-1"
                        cols="12"
                        md="6"
                        >
                            <v-text-field
                            label="Nombre de usuario"
                            v-model="terapeutaSolicitud.userName"
                            disabled="true"
                            ></v-text-field>
                        </v-col>

                        <v-col class=""
                        cols="12"
                        md="6"
                        >
                            <v-text-field
                            label="Correo"
                            v-model="terapeutaSolicitud.email"
                            disabled="true"
                            ></v-text-field>
                        </v-col>
                        </v-row>
                        </v-form>
                    </v-card-text>
                </v-card>
            </v-container>


    </div>
    

</template>

<script>
import axios from 'axios'
import {useUserStore} from "../../store/app"
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
        
    }),

    methods:{
        changeTo(){
            this.activeButton = true
            this.stateSelect = true
        },
        getTerapeutas(){
            var url = 'http://localhost:4000/solicitudes/listTerapeutas'
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
        vincular () {
            var url = 'http://localhost:4000/solicitudes/enlazar'
            var terapeuta = this.terapeutas.filter (terapeuta => terapeuta.userName == this.userNameTerapeuta)[0]
            var tutor = store.user
            var formMetada = {tutorUser: tutor, terapeutaUser: terapeuta, estado: 'En espera'}
            axios.post(url, formMetada)
            .then(response => {
                console.log(response)
                console.log(store.user)
                this.showCard = true
                this.activeButton = false
                this.typeAlert = "info"
                this.stateSelect = false,
                this.typeText = "La solicitud se encuentra en estado: En espera"

            })
            .catch(error => {
                console.log(error)
            })
        },
        getSolicitud(){
            var url = `http://localhost:4000/solicitudes/listSolicitud/${store.user._id}`
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
                console.log(error)
            })
        },
        
    },
    
    created () {
        this.getSolicitud()
    }
}
</script>