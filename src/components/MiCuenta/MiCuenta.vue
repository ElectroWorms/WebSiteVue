<style>
.center {
    display: flex;
    justify-content: center;
}
</style>
<template>
    <div class="mx-5 mt-5 mb-5">
        <v-card class="w-100 px-5">                
            <v-card-title class="mt-5">Información de la Cuenta</v-card-title>
            <v-card-text class="mt-6">
                <v-form ref="form">
                    <v-row>                                      
                        <v-col cols="3" md="3">
                            <v-row rows="2" class="center">
                                <v-img class="border bg-white" max-width="200px" :aspect-ratio="1" :src="getCardImg(user)" cover></v-img>
                            </v-row>
                            <v-row class="center mt-6">
                                <p>Foto de Perfil</p>
                            </v-row>
                            <v-row v-if="editing">
                                <v-col align-self="center">
                                    <v-sheet class="pa-2 ma-2">
                                        <v-file-input v-model="file" :rules="rules" accept="image/png, image/jpeg, image/jpg" label="Cambiar foto de perfil" prepend-icon="mdi-camera" :readonly="!editing" :variant="variant"></v-file-input>
                                    </v-sheet>
                                </v-col>
                            </v-row>
                        </v-col>                  
                        <v-col cols="9" md="9">
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
                                    <v-text-field label="Contraseña" v-model="user.password" :readonly="!editing" :variant="variant" type="password" :rules="[v => !!v || 'Contraseña es requerido', v => (user.password == user.passwordConfirm) ? true: 'Las Contraseñas no coinciden.']"></v-text-field>
                                </v-col>
                                <v-col cols="4" md="4">
                                    <v-text-field label="Confirmar Contraseña" v-model="user.passwordConfirm" :readonly="!editing" :variant="variant" type="password" v-if="editing" :rules="[v => !!v || 'Contraseña es requerido', v => (user.password == user.passwordConfirm) ? true: 'Las Contraseñas no coinciden.']"></v-text-field>
                                </v-col>
                                <v-col cols="4" md="4">
                                    <v-text-field label="Correo" v-model="user.email" :readonly="!editing" :variant="variant"></v-text-field>
                                </v-col>
                                <v-col cols="4" md="4">
                                        <v-text-field label="Edad" v-model="user.edad" :readonly="!editing" :variant="variant" required></v-text-field>
                                </v-col>
                                <v-col cols="4" md="4">
                                    <v-select label="Sexo" :items="items" v-model="user.sexo" :readonly="!editing" :variant="variant" required></v-select>
                                </v-col>   
                                <v-col cols="4" md="4">
                                    <v-select label="Nivel de Apoyo" :items= "nivelTea" v-model="user.nivelTea" :readonly="!editing" :variant="variant" required></v-select>
                                </v-col>
                                <v-col cols="4" md="4">
                                    <v-text-field label="Tutor" :items="items" v-model="user.tutor" readonly :variant="variant" required></v-text-field>
                                </v-col>
                                <v-col cols="4" md="4">
                                    <v-text-field label="Terapeuta Ocupacional" v-model="user.terapeutaOcupacional" readonly :variant="variant" required></v-text-field>
                                </v-col>                                 
                            </v-row>
                        </v-col>
                    </v-row>          
                </v-form>
            </v-card-text>
            <v-card-actions class="mt-5 mb-5" v-if="!hideButtons">
                <v-spacer></v-spacer>
                <v-btn color="blue" prepend-icon="mdi-content-save" text variant="tonal" v-if="editing" @click="validateCuenta()">
                    Enviar
                </v-btn>
                <v-btn color="red" prepend-icon="$delete" variant="tonal" text v-if="editing" @click="actualizar()">
                    Cancelar
                </v-btn>                
                <v-btn color="warning" prepend-icon="$edit" variant="tonal" text v-if="!editing" @click="actualizar()">
                    Editar
                </v-btn>
                <v-btn color="red" prepend-icon="$delete" variant="tonal" text v-if="!editing" @click="deleteAccount(user)">
                    Eliminar
                </v-btn>
            </v-card-actions>   
        </v-card>
    </div>

    <v-snackbar v-model="snackbar.active" :timeout="timeout" :color="snackbar.color">
        {{ snackbar.text }}
        <template v-slot:action="{ attrs }">
            <v-btn color="blue" text v-bind="attrs" @click="snackbar.active = false">
            Close
            </v-btn>
        </template>
    </v-snackbar>

    <v-dialog v-model="dialogDelete" max-width="500px">
      <v-card>
        <v-card-title class="text-h5 text-center">¿Está seguro de eliminar la cuenta?</v-card-title>
        <v-card-text class="text-center">
          <v-icon size="75" class="mr-2" max-widht="300px" elevation="2"
            fab
            color="error"
            >
            mdi-delete
          </v-icon>
        </v-card-text>
        <v-card-actions class="my-3">
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="deleteConfirm">Aceptar</v-btn>
          <v-btn color="red darken-1" text @click="deleteCancel">Cancelar</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
    
</template>

<script>
import axios from 'axios';
import {useUserStore} from "../../store/app";
import config from '../../../config.json';
const store = useUserStore();
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
        dialogDelete: false,
        file: null,
        editing: false,
        hideButtons: false,
        variant: "plain",
        items: ['Masculino', 'Femenino'],
        nivelTea: ['Nivel de Apoyo 1', 'Nivel de Apoyo 2', 'Nivel de Apoyo 3'],
        user : {
            _id: store.secondUser._id,
            userName: store.secondUser.userName,
            nombre: store.secondUser.nombre,
            apellidoPaterno: store.secondUser.apellidoPaterno,
            apellidoMaterno: store.secondUser.apellidoMaterno,
            email: store.secondUser.email,
            edad: store.secondUser.edad,
            sexo: store.secondUser.sexo,
            nivelTea: store.secondUser.nivelTea,
            url: store.secondUser.url,
            sexo: store.secondUser.sexo,
            password: store.secondUser.password,
            passwordConfirm: store.secondUser.passwordConfirm,
            tutor: null,
            terapeutaOcupacional: null
        },
        snackbar: {
            color: null,
            active: false,
            text: null,
            timeout: 3000,
        },
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
        async saveCuenta () {            
            if (this.file != null) {
                console.log(this.file)
                let formData = new FormData();
                formData.append('filename','perfil_'+this.user._id+'.png');
                formData.append('file',await fileToBlob(this.file[0]));
                axios.post(`${config.PathAPI}utility/uploadDocument`,formData).then(response => {
                    let respuesta = response.data;                    
                    console.log(respuesta);
                    if (respuesta.state) {
                        this.user.url = respuesta.item.url;
                    }
                });
            }
            axios.post(`${config.PathAPI}user/updateAccount`, this.user).then(response => {
                let respuesta = response.data;
                if (respuesta.state) {
                    this.editing = false;
                    store.$patch({
                        secondUser: respuesta.item,
                    })
                    //Actualizar listados de tutor y terapeuta
                    let urlUpdateUsers = `${config.PathAPI}user/updateUser`
                    let formData = {idTutor: null, idTerapeuta: null, secondUser: respuesta.item}
                    let vinculacion = store.vinculacion
                    formData.idTutor = vinculacion ? vinculacion.tutor._id : store.user._id
                    formData.idTerapeuta = vinculacion ? vinculacion.terapeuta._id : null
                    axios.post(urlUpdateUsers, formData)
                    .then( response => {
                        if (response.data.status){
                            this.snackbar.text = 'Se ha modificado la cuenta del niño correctamente';
                            this.snackbar.color = 'success';
                            this.snackbar.active = true;
                            console.log(response.data.item)
                        }
                        
                        store.$patch({
                            user: store.user.typeAccount == "Terapeuta Ocupacional" ? response.data.item.terapeuta : response.data.item.tutor
                        })
                        
                    })
                    .catch ( error => {
                        this.snackbar.text = 'No se ha logrado modificar la cuenta. Intente nuevamente';
                        this.snackbar.color = 'error';
                        this.snackbar.active = true;
                    })

                }
                else{
                    this.snackbar.text = 'No se pudo modificar la cuenta del niño';
                    this.snackbar.color = 'error';
                    this.snackbar.active = true
                }
            })
            .catch( error => {
                this.snackbar.text = 'Ha ocurrido un error'
                this.snackbar.color = 'error'
                this.snackbar.active = true
            })           
        },
        deleteAccount(cuenta){
            this.dialogDelete = true
            this.cuenta = Object.assign({}, cuenta)
            console.log(this.cuenta)
        },
        async deleteConfirm(){
            let idChild = this.cuenta._id
            let vinculacion = store.vinculacion ? true : false
            let idTerapeuta = vinculacion ? store.vinculacion.terapeuta._id : null
            let idTutor = vinculacion ? store.vinculacion.tutor._id : store.user._id
            let formMetadata = {idTutor, idChild, idTerapeuta, vinculacion}
            let urlDeleteChild = `${config.PathAPI}user/deleteAccountChild`
            axios.post(urlDeleteChild, formMetadata)
            .then( result => {
                if (result.data.status){
                    console.log(result)
                    // actualizar el store eliminado el userChild
                    let responseUsers = result.data.items
                    let newUser = store.user
                    newUser.users = responseUsers
                    console.log(newUser)
                    store.$patch({
                        user: newUser
                    })
                    this.snackbar.text =  result.data.message;
                    this.snackbar.color = 'success';
                    this.snackbar.active = true;
                    this.$router.push({path: '/Usuarios'})
                }
                else{
                    if (result.data.status){
                        this.snackbar.text =  result.data.message;
                        this.snackbar.color = 'error';
                        this.snackbar.active = true;
                    }
                }
            })
            .catch( error => {
                this.snackbar.text =  'No se ha logrado eliminar la cuenta. Intente nuevamente...';
                this.snackbar.color = 'error';
                this.snackbar.active = true;
            })
        
        },
        deleteCancel(){
            this.dialogDelete = false;
        },
        async getVinculacion(){
            await store.getVinculacion(store.secondUser._id)
            let vinculacion = store.vinculacion ? true : false
            let terapeutaFullName = vinculacion ? store.vinculacion.terapeuta.userName : "Sin Asignar"
            let tutorFullName = vinculacion ? store.vinculacion.tutor.userName : store.user.fullname
            this.hideButtons = (store.user.typeAccount == "Terapeuta Ocupacional") ? true : false
            this.user.terapeutaOcupacional = terapeutaFullName 
            this.user.tutor = tutorFullName
        }
    },    
     created () {
         this.getVinculacion()
    }
}
</script>

