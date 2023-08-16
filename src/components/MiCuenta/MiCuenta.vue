<template>
    <div>
        <v-card-title class="text-subtitle-1 ">Información Cuenta Niño</v-card-title>
            <v-container class="border d-flex justify-start w-75 mx-2 mb-5 elevation-0" >
                <v-card class="w-75">
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
                            v-model="user.userName"
                            label="Nombre"
                            :disabled="!activeInputs"
                            ></v-text-field>
                        </v-col>

                        <v-col
                            cols="12"
                            md="6"
                        >
                            <v-text-field
                            v-model="user.firstName"
                            label="Apellido"
                            :disabled="!activeInputs"
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
                            v-model="user.secondName"
                            :disabled="!activeInputs"
                            ></v-text-field>
                        </v-col>

                        <v-col class=""
                        cols="12"
                        md="6"
                        >
                            <v-text-field
                            label="Correo"
                            v-model="user.email"
                            :disabled="!activeInputs"
                            ></v-text-field>
                        </v-col>
                        </v-row>
                        </v-form>
                    </v-card-text>
                    <v-container class="px-0">
                <v-card-actions class="px-5">
                    <v-spacer></v-spacer>
                    <v-btn
                        color="blue darken-1"
                        text
                        variant="outlined"
                        :disabled="!activeButtonEnviar"
                        @click="validateCuenta"
                        >
                        Enviar
                    </v-btn>
                    
                    <v-btn
                        color="green darken-1"
                        text
                        variant="outlined"
                        @click="actualizar"
                        >
                        Actualizar
                    </v-btn>
                </v-card-actions>
                
                </v-container>
                </v-card>

            </v-container>
    </div>

    <div>
        <v-card-title class="text-subtitle-1 ">Datos Niño</v-card-title>
            <v-container class="border d-flex justify-start w-75 mx-2 mb-5 elevation-0" >
                <v-card class="w-75">
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
                                label="Edad"
                                v-model="userNino.edad"
                                :disabled="!activeInputsNino"
                                ></v-text-field>
                            </v-col>

                            <v-col class=""
                            cols="12"
                            md="6"
                            >
                                <v-select
                                label="Nivel TEA"
                                :items= "nivelTea"
                                v-model="userNino.nivelTea"
                                :disabled="!activeInputsNino"
                                ></v-select>
                            </v-col>
                        </v-row>

                        <v-row >
                            <v-col class="px-1"
                            cols="12"
                            md="6"
                            >
                                <v-select
                                label="Sexo"
                                :items="items"
                                v-model="userNino.sexo"
                                :disabled="!activeInputsNino"
                                ></v-select>
                            </v-col>
                        </v-row>
                        </v-form>
                    </v-card-text>
                    <v-container class="px-0">
                <v-card-actions class="px-5">
                    <v-spacer></v-spacer>
                    <v-btn
                        color="blue darken-1"
                        text
                        variant="outlined"
                        :disabled="!activeButtonEnviarNino"
                        @click="validateNino"
                        >
                        Enviar
                    </v-btn>
                    
                    <v-btn
                        color="green darken-1"
                        text
                        variant="outlined"
                        :disabled="!activeButtonActualizarNino"
                        @click="actualizarNino"
                        >
                        Actualizar
                    </v-btn>
                </v-card-actions>
                
                </v-container>
                </v-card>

            </v-container>
    </div>

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
const vinculacion = store.vinculacion
export default {
    data: () =>({
        items: ['Masculino', 'Femenino'],
        nivelTea: ['1', '2', '3'],
        user : {
            userName: store.secondUser.userName,
            firstName: store.secondUser.firstName,
            secondName: store.secondUser.secondName,
            email: store.secondUser.email,
        },
        userNino : {
            edad: store.secondUser.infoNino ? store.secondUser.infoNino.edad : null,
            nivelTea: store.secondUser.infoNino ? store.secondUser.infoNino.nivelTea : null,
            sexo: store.secondUser.infoNino ? store.secondUser.infoNino.sexo : null

        },
        snackbar: {
            color: null,
            active: false,
            text: null,
            timeout: 3000,
        },
        activeInputs: false,
        activeButtonEnviar: false,
        activeInputsNino: store.secondUser.infoNino ? false : true,
        activeButtonEnviarNino: store.secondUser.infoNino ? false : true,
        activeButtonActualizarNino: store.secondUser.infoNino ? true : false,
        dialogSuccess: false,
    }),

    methods:{
        actualizar () {
            this.activeInputs = true
            this.activeButtonEnviar = true
        },
        actualizarNino () {
            this.activeInputsNino = true
            this.activeButtonEnviarNino = true
        },
        async validateCuenta () {
            const { valid } = await this.$refs.form.validate()
            if (valid) {
                this.saveCuenta()
            }
        },
        saveCuenta () {
            var secondUser = store.secondUser
            var url =  `${config.PathAPI}updateUser`
            secondUser.userName = this.user.userName
            secondUser.firstName = this.user.firstName
            secondUser.secondName = this.user.secondName
            secondUser.email =  this.user.email

            let FormData ={
                idTutor: null,
                idTerapeuta: null,
                secondUser: secondUser
            }
            
            //La cuenta aun no se ha vinculado y esta ingresando datos el tutor
            if (vinculacion.estado != "Aprobado"){
                FormData.idTutor = store.user._id
            }
            //La cuenta fue vinculada
            else{
                FormData.idTutor = store.vinculacion.tutor._id
                FormData.idTerapeuta = store.vinculacion.terapeuta._id
            }
            
            axios.post(url, FormData)
            .then(response => {
                this.activeInputs = false
                this.activeButtonEnviar = false
                this.snackbar.text = 'Se ha modificado la cuenta del niño correctamente'
                this.snackbar.color = 'success'
                this.snackbar.active = true
                store.$patch({
                    secondUser: secondUser,
                    user: store.user.typeAccount == "Terapeuta Ocupacional" ? response.data.terapeuta : response.data.tutor
                })
                console.log(store.user)
            })
            .catch( error => {
                this.snackbar.text = 'No se pudo modificar la cuenta del niño'
                this.snackbar.color = 'error'
                this.snackbar.active = true
            })
            
            
        },
        async validateNino () {
            const { valid } = await this.$refs.form.validate()
            if (valid) {
                this.saveNino()
            }
        },
        saveNino () {
            var url =  `${config.PathAPI}addDatosNino`
            var secondUser = store.secondUser
            
            var userInfoNino = {
                _id: store.secondUser._id,
                edad:this.userNino.edad,
                sexo: this.userNino.sexo,
                nivelTea: this.userNino.nivelTea,
            }
            
            secondUser.infoNino = {
                _id: store.secondUser._id,
                edad:this.userNino.edad,
                sexo: this.userNino.sexo,
                nivelTea: this.userNino.nivelTea,
            }

            let FormData ={
                idTutor: null,
                idTerapeuta: null,
                userInfoNino: userInfoNino
            }
            
            //La cuenta aun no se ha vinculado y esta ingresando datos el tutor
            if (vinculacion.estado != "Aprobado"){
                FormData.idTutor = store.user._id
            }
            //La cuenta fue vinculada
            else{
                FormData.idTutor = store.vinculacion.tutor._id
                FormData.idTerapeuta = store.vinculacion.terapeuta._id
            }

            axios.post(url, FormData)
            .then (response => {
                this.activeButtonEnviarNino = false
                this.activeButtonActualizarNino = true
                this.activeInputsNino = false
                this.snackbar.text = 'Se ha actualizado correctamente los datos del niño'
                this.snackbar.color = 'success'
                this.snackbar.active = true
                store.$patch({
                    user: store.user.typeAccount == "Terapeuta Ocupacional" ? response.data.terapeuta : response.data.tutor,
                    secondUser: secondUser
                })
            })
            .catch (error => {
                this.snackbar.text = 'No se pudo modificar los datos del niño'
                this.snackbar.color = 'error'
                this.snackbar.active = true
            }) 
        },
    },
    
    created () {
        store.getVinculacion()
    }
}
</script>

