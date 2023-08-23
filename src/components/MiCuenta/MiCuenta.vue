<style>
.center {
    display: flex;
    justify-content: center;
}
</style>
<template>
    <div class="w-100">
        <v-container class="d-flex justify-start w-100 mx-2 mb-5 elevation-0" >
            <v-card class="w-100">                
                <v-card-title class="text-subtitle-1">Información de la Cuenta</v-card-title>
                <v-card-text class="mt-6">
                    <v-form ref="form">
                        <v-row>                                      
                            <v-col cols="4" md="4">
                                <v-row rows="2" class="center">
                                    <v-img class="border bg-white" max-width="200px" :aspect-ratio="1" :src="getCardImg(user)" cover></v-img>
                                </v-row>
                                <v-row>
                                    <v-col align-self="center">
                                        <v-sheet class="pa-2 ma-2">
                                            <v-file-input v-model="file" :rules="rules" accept="image/png, image/jpeg, image/jpg" label="Cambiar foto de perfil" prepend-icon="mdi-camera" :readonly="!editing" :variant="variant"></v-file-input>
                                        </v-sheet>
                                    </v-col>
                                </v-row>
                            </v-col>                  
                            <v-col cols="8" md="8">
                                <v-row>
                                    <v-col cols="4" md="4">
                                        <v-text-field v-model="user.nombre" label="Nombre" :readonly="!editing" :variant="variant"></v-text-field>
                                    </v-col>
                                    <v-col cols="4" md="4">
                                        <v-text-field v-model="user.apellidoPaterno" label="Apellido Paterno" :readonly="!editing" :variant="variant"></v-text-field>
                                    </v-col>                                    
                                    <v-col cols="4" md="4">
                                        <v-text-field v-model="user.apellidoMaterno" label="Apellido Materno" :readonly="!editing" :variant="variant"></v-text-field>
                                    </v-col>
                                    <v-col cols="4" md="4">
                                        <v-text-field label="Nombre de usuario" v-model="user.userName" :readonly="!editing" :variant="variant"></v-text-field>
                                    </v-col>
                                    <v-col cols="4" md="4">
                                        <v-text-field label="Correo" v-model="user.email" :readonly="!editing" :variant="variant"></v-text-field>
                                    </v-col>
                                    <v-col cols="4" md="4">
                                        <v-text-field label="Contraseña" v-model="user.password" :readonly="!editing" :variant="variant" type="password" :rules="[v => !!v || 'Contraseña es requerido', v => (user.password == user.passwordConfirm) ? true: 'Las Contraseñas no coinciden.']"></v-text-field>
                                    </v-col>
                                    <v-col cols="4" md="4">
                                        <v-text-field label="Confirmar Contraseña" v-model="user.passwordConfirm" :readonly="!editing" :variant="variant" type="password" v-if="editing" :rules="[v => !!v || 'Contraseña es requerido', v => (user.password == user.passwordConfirm) ? true: 'Las Contraseñas no coinciden.']"></v-text-field>
                                    </v-col>
                                    <v-col cols="4" md="4">
                                         <v-text-field label="Edad" v-model="userNino.edad" :readonly="!editing" :variant="variant"></v-text-field>
                                    </v-col>
                                    <v-col cols="4" md="4">
                                        <v-select label="Nivel de Apoyo" :items= "nivelTea" v-model="userNino.nivelTea" :readonly="!editing" :variant="variant"></v-select>
                                    </v-col>
                                    <v-col cols="4" md="4">
                                        <v-select label="Sexo" :items="items" v-model="userNino.sexo" :readonly="!editing" :variant="variant"></v-select>
                                    </v-col>                                    
                                </v-row>
                            </v-col>
                        </v-row>          
                    </v-form>
                </v-card-text>
                <v-container class="px-0">
                    <v-card-actions class="px-5">
                        <v-spacer></v-spacer>
                        <v-btn color="blue" prepend-icon="mdi-content-save" text variant="tonal" v-if="editing" @click="validateCuenta()">
                            Enviar
                        </v-btn>
                        
                        <v-btn color="warning" prepend-icon="$edit" variant="tonal" text v-if="!editing" @click="actualizar()">
                            Editar
                        </v-btn>

                        <v-btn color="red" prepend-icon="$delete" variant="tonal" text v-if="editing" @click="actualizar()">
                            Cancelar
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
import axios from 'axios';
import {useUserStore} from "../../store/app";
import config from '../../../config.json';
const store = useUserStore();
const vinculacion = store.vinculacion;
function fileToBlob(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = () => {
      const blob = new Blob([reader.result], { type: file.type });
      resolve(blob);
    };
    
    reader.onerror = (error) => {
      reject(error);
    };
    
    reader.readAsArrayBuffer(file);
  });
}
export default {
    data: () =>({
        rules: [
            value => {
                return !value || !value.length || value[0].size < 2000000 || 'Avatar size should be less than 2 MB!'
            },
        ],
        file: null,
        editing: false,
        variant: "plain",
        items: ['Masculino', 'Femenino'],
        nivelTea: ['Nivel de Apoyo 1', 'Nivel de Apoyo 2', 'Nivel de Apoyo 3'],
        user : {
            userName: store.secondUser.userName,
            nombre: store.secondUser.nombre,
            apellidoPaterno: store.secondUser.apellidoPaterno,
            apellidoMaterno: store.secondUser.apellidoMaterno,
            email: store.secondUser.email,
            url: store.secondUser.url,
            password: store.secondUser.password,
            passwordConfirm: store.secondUser.password            
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
        getCardColor(nivelTea) {
            if (nivelTea == 'Nivel de Apoyo 1') return "primary";
            else if (nivelTea == 'Nivel de Apoyo 2') return "success";
            else if (nivelTea == 'Nivel de Apoyo 3') return "warning";
            else return "purple";
        },
        getCardImg(item){
            console.log("item",item)
            if (item.url != '' && item.url != undefined) return item.url; 
            else return (item.sexo == 'Masculino') ? '/src/assets/icons/nino_1.png' : '/src/assets/icons/nina_1.png';
        },
        actualizar() {            
            this.variant = (this.variant == "plain") ? "outlined" : "plain";
            this.editing = !this.editing;
        },
        async validateCuenta () {
            const { valid } = await this.$refs.form.validate()
            if (valid) {
                this.saveCuenta()
            }
        },
        saveCuenta () {            
            if (this.file != null) {
                console.log(this.file)
                let formData = new FormData();
                formData.filename = 'perfil_'+this.user._id+'.png';
                formData.file = await fileToBlob(this.file);
                axios.post(`${config.PathAPI}utility/uploadDocument`,formData).then(response => {
                    let respuesta = response.data;                    
                    console.log(respuesta);
                    if (respuesta.state) {
                        this.user.url = respuesta.item.url;
                    }
                });
            }
            return;
            axios.post(`${config.PathAPI}updateAccount`, this.user).then(response => {
                let respuesta = response.data;
                if (respuesta.state) {
                    this.editing = false;
                    this.snackbar.text = 'Se ha modificado la cuenta del niño correctamente';
                    this.snackbar.color = 'success';
                    this.snackbar.active = true;
                    store.$patch({
                        secondUser: this.user,
                        user: store.user.typeAccount == "Terapeuta Ocupacional" ? response.data.terapeuta : response.data.tutor
                    })
                }
                this.snackbar.text = 'No se pudo modificar la cuenta del niño';
                this.snackbar.color = 'error';
                this.snackbar.active = true
            })
            .catch( error => {
                this.snackbar.text = 'Ha ocurrido un error'
                this.snackbar.color = 'error'
                this.snackbar.active = true
            })           
        }
    },    
    created () {
        store.getVinculacion()
    }
}
</script>

