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

    <v-dialog v-model="dialogSuccess" max-width="580px">
    <v-card >
      <v-card-title class="text-h5 text-center">Los datos han sido modificados correctamente!</v-card-title>
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
import {useUserStore} from "../../store/app"
const store = useUserStore()
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
        closeDialogSuccess () {
            this.dialogSuccess = false  
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
            var url = "http://localhost:4000/updateUser"
            secondUser.userName = this.user.userName
            secondUser.firstName = this.user.firstName
            secondUser.secondName = this.user.secondName
            secondUser.email =  this.user.email

            axios.post(url, {idTutor: store.solicitud.tutor._id, idTerapeuta: store.solicitud.terapeuta._id, secondUser})
            .then(response => {
                this.activeInputs = false
                this.activeButtonEnviar = false
                this.dialogSuccess = true
                store.$patch({
                    secondUser: secondUser,
                    user: store.user.typeAccount == "Terapeuta Ocupacional" ? response.data.terapeuta : response.data.tutor
                })
                console.log(store.user)
            })
            .catch( error => {
                console.log(error)
            })
        },
        async validateNino () {
            const { valid } = await this.$refs.form.validate()
            if (valid) {
                this.saveNino()
            }
        },
        saveNino () {
            var url = "http://localhost:4000/addNino"
            var userInfoNino = {
                    _id: store.secondUser._id,
                    edad:this.userNino.edad,
                    sexo: this.userNino.sexo,
                    nivelTea: this.userNino.nivelTea,
                }
            var secondUser = store.secondUser
            
            secondUser.infoNino = {
                _id: store.secondUser._id,
                edad:this.userNino.edad,
                sexo: this.userNino.sexo,
                nivelTea: this.userNino.nivelTea,
            }
            axios.post(url, {idTutor: store.solicitud.tutor._id, idTerapeuta: store.solicitud.terapeuta._id, userInfoNino})
            .then (response => {
                this.activeButtonEnviarNino = false
                this.activeButtonActualizarNino = true
                this.activeInputsNino = false
                this.dialogSuccess = true
                store.$patch({
                    user: store.user.typeAccount == "Terapeuta Ocupacional" ? response.data.terapeuta : response.data.tutor,
                    secondUser: secondUser
                })
            })
            .catch (error => {
                console.log (error)
            }) 
        },
    },
    
    created () {
        store.getSolicitud()
        console.log(store.user)
        console.log(store.secondUser)
    }
}
</script>

