<style>
.actions-center {
    display: flex;
    justify-content: center;
    align-items: center;
}
.itemCard {
    min-height: 200px;
    padding: 5%;
}
.SearchBar {
    margin-top: 10px;
}
.fondoBlanco {
    background-color: white;
}
</style>
<template>
    <v-app-bar :elevation="2" class="pl-4">        
		Mis Usuarios
        <v-spacer></v-spacer>
        <v-text-field v-model="search" class="fondoBlanco" placeholder="Buscar..." variant="underlined" prepend-icon="mdi-magnify"></v-text-field>
        <v-spacer></v-spacer>
        <v-btn color="primary" class="mt-2" @click="dialogCreateUser = true">Crear Cuenta</v-btn>
	</v-app-bar>
    <div class="mx-6">  
        <div v-if="users.length" class="w-100 h-100 mx-2 mt-4">
            
            <v-row class="mt-2">
                
            </v-row>
            <v-row>                    
                <v-col cols="3" v-for="item in users" :key="item._id">      
                    <v-card class="mx-auto" max-width="100%" style="height: 340px;">
                        <v-img :src="getCardImg(item.url,item.sexo)" class="mt-5 mb-5" height="150px" aspect-ratio="1/1"></v-img>

                        <v-card-title style="text-align: center;">
                         {{item.fullname }}
                        </v-card-title>

                        <v-card-subtitle style="text-align: center;">
                            <v-chip class="ma-2" :color="getCardColor(item.nivelTea)">
                            {{item.nivelTea || "Sin definir"}}
                            </v-chip>
                        </v-card-subtitle>
                        
                        <v-card-actions class="actions-center">
                            <v-btn color="orange-lighten-2" variant="text" @click="loadPerfil(item)">
                                Ver Perfil
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-col>
            </v-row>
        </div> 
        <v-row v-else class="w-100 h-100 mx-2 mt-4">
            <v-card class="mx-auto mt-4 pt-4 pb-4" max-width="344">
                <v-img src="https://rapnistorage.blob.core.windows.net/rapnistorage/Lombriz.png" max-width="344" max-height="120px" cover></v-img>
                <br>
                <v-card-subtitle>
                    {{ MensajeBusqueda }}
                </v-card-subtitle>
                <v-card-actions class="actions-center" v-if="MensajeBusqueda == 'Aún no has creado ninguna cuenta.'">
                    <v-btn color="orange-lighten-2" variant="text" @click="dialogCreateUser = true">
                        Agregar Cuenta
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-row> 
    </div>
    <!-- Dialog para crear usuario -->
    <v-dialog v-model="dialogCreateUser">
            <v-card class="w-50 mx-auto px-6 py-5">
                <v-card-title class="center">
                    <span class="">Registrar Cuenta</span>
                </v-card-title>
                <v-card-text class="mt-6">
                    <v-form ref="form">
                        <v-row>
                            <v-col cols="4" md="4" >
                                <v-text-field v-model="user.nombre" :rules="[v => !!v || 'Nombre es requerido']" :counter="10" label="Nombre" required variant="underlined"></v-text-field>
                            </v-col>
                            <v-col cols="4" md="4">
                                <v-text-field v-model="user.apellidoPaterno" :rules="[v => !!v || 'Apellido Paterno es requerido']" :counter="10" label="Apellido Paterno" required variant="underlined"></v-text-field>
                            </v-col>
                            <v-col cols="4" md="4">
                                <v-text-field v-model="user.apellidoMaterno" :rules="[v => !!v || 'Apellido Materno es requerido']" :counter="10" label="Apellido Materno" required variant="underlined"></v-text-field>
                            </v-col>
                            <v-col cols="4" md="4" >
                                <v-text-field label="Nombre de usuario" v-model="user.userName" :rules="[v => !!v || 'Nombre de usuario es requerido']" variant="underlined"></v-text-field>
                            </v-col> 
                            <v-col cols="4" md="4" >
                                <v-text-field label="Correo" v-model="user.email" type="email" :rules="[v => !!v || 'Correo es requerido']" variant="underlined"></v-text-field>
                            </v-col> 
                            <v-col cols="4" md="4">
                                <v-text-field label="Contraseña" v-model="user.password" type="password" :rules="[v => !!v || 'Contraseña es requerido', v => (user.password == user.passwordConfirm) ? true: 'Las Contraseñas no coinciden.']" variant="underlined"></v-text-field>
                            </v-col>
                            <v-col cols="4" md="4">
                                <v-text-field label="Confirmar Contraseña" v-model="user.passwordConfirm" type="password" :rules="[v => !!v || 'Contraseña es requerido', v => (user.password == user.passwordConfirm) ? true: 'Las Contraseñas no coinciden.']" variant="underlined"></v-text-field>
                            </v-col>
                            <v-col cols="4" md="4">
                                <v-text-field label="Edad" v-model="user.edad" :variant="underlined" :rules="[v => !!v || 'Campo requerido']"></v-text-field>
                            </v-col>
                            <v-col cols="4" md="4">
                                <v-select label="Nivel de Apoyo" :items= "['Nivel de Apoyo 1','Nivel de Apoyo 2','Nivel de Apoyo 3']" v-model="user.nivelTea" :variant="underlined" :rules="[v => !!v || 'Campo requerido']"></v-select>
                            </v-col>
                            <v-col cols="4" md="4">
                                <v-select label="Sexo" :items="['Masculino','Femenino']" v-model="user.sexo" :variant="underlined" :rules="[v => !!v || 'Campo requerido']"></v-select>
                            </v-col>
                            <v-col cols="4" md="4" >
                                <v-text-field label="Rol" :readonly="true" v-model="user.typeAccount" variant="underlined" :rules="[v => !!v || 'Campo requerido']"></v-text-field>
                            </v-col>
                        </v-row>
                    </v-form>
                </v-card-text>
                <v-card-text class="px-1">
                    <v-alert type="info" v-model = "alertError" variant="outlined" text="Se recomienda utilizar el mismo correo y contraseña para todas las cuentas"  ></v-alert>
                </v-card-text>
                <v-container class="px-0">
                    <v-card-actions class="justify-center">
                        <v-btn color="blue darken-1" text variant="tonal" @click="validate" >
                            Registrar
                        </v-btn>                    
                        <v-btn color="red darken-1" text variant="tonal" @click="dialogCreateUser = false" >
                            Cancelar
                        </v-btn>
                    </v-card-actions>                    
                </v-container>
            </v-card>
    </v-dialog>    
    <!-- Snackbar notificaciones -->
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
        MensajeBusqueda: (store.user.users ? store.user.users : []).length == 0 ? "Aún no has creado ninguna cuenta." : "Ninguna cuenta coincide con la búsqueda",
        user: {
            userName: null,
            nombre: null,
            apellidoPaterno: null,
            apellidoMaterno: null,
            fechaNacimiento: new Date(),
            url: "",
            password: null,
            confirmPassword: null,
            email:store.user.email,
            nivelTea: null,
            edad: null,
            sexo: null,
            typeAccount: "Niño",
        },
        dialogCreateUser: false,
        isTutor: false,
        users: store.user.users ? store.user.users : null,
        respaldoUsers: store.user.users ? store.user.users : [],
        search: null,
    }),
    methods:{
        async validate () {
            const { valid } = await this.$refs.form.validate()
            if (valid) {
                this.registerAccount();
            }
        },
        getCardColor(nivelTea) {
            if (nivelTea == 'Nivel de Apoyo 1') return "primary";
            else if (nivelTea == 'Nivel de Apoyo 2') return "success";
            else if (nivelTea == 'Nivel de Apoyo 3') return "warning";
            else return "purple";
        },
        getCardImg(url,sexo){
            console.log(sexo)
            if (url != "" && url != undefined) return url; 
            else return (sexo == 'Masculino') ? '/src/assets/icons/nino_1.png' : '/src/assets/icons/nina_1.png';
        },
        updateUserCards() {
            console.log(this.search);
            this.users = this.respaldoUsers.filter(m => 
            (m.fullname || '').toLowerCase().includes(this.search) ||
            (m.nivelTea || '').toLowerCase().includes(this.search));
            if (this.users.length == 0) {
                this.MensajeBusqueda = "Ninguna cuenta coincide con la búsqueda.";
            }
            else {
                this.MensajeBusqueda = "Aún no has creado ninguna cuenta.";
            }
        },
        loadPerfil(item) {
            store.$patch({
                secondUser: item
            })
            this.$router.push({path: '/User/MiCuenta'})
        },
        registerAccount() {
            let urlCreateUser = `${config.PathAPI}user/createUser`
            let urlAddUser = `${config.PathAPI}user/addUser`
            let newUser = this.user;
            let currentUsers = store.user.users
            let typePlan = store.user.typePlan ? store.user.typePlan : null
            // verificar el plan de la cuenta
            if (typePlan == "Basic" && currentUsers == 2 ){
                this.snackbar.text = 'No puede crear un nuevo usuario. La cuenta básica permite un máximo de 5 usuarios.';
                this.snackbar.color = 'error';
                this.snackbar.active = true;
                this.dialogCreateUser = false;
            }
            else if (typePlan == "Premium" && currentUsers == 5){
                this.snackbar.text = 'No puede crear un nuevo usuario. La cuenta premium permite un máximo de 10 usuarios.';
                this.snackbar.color = 'error';
                this.snackbar.active = true;
                this.dialogCreateUser = false;
            }
            else{
                newUser.fullname = `${newUser.nombre} ${newUser.apellidoPaterno} ${newUser.apellidoMaterno}`;
                axios.post(urlCreateUser, this.user).then (responseUser => {
                    console.log(responseUser)
                    if (responseUser.data.state && responseUser.data.item.length == 1) {
                        let nuevoUsuario = responseUser.data.item[0];
                        formData.user = nuevoUsuario;                    
                        axios.post(urlAddUser, formData).then(response => { 
                            if (response.data.state) {
                                this.snackbar.text = 'La cuenta ha sido agregada correctamente';
                                this.snackbar.color = 'success';
                                this.snackbar.active = true;
                                this.dialogCreateUser = false;
                                // Modificar el usuario incluyendo el nuevo usuario niño a la lista de usuarios
                                let newUser = store.user;
                                newUser.users.push(responseUser.data.item[0]);
                                store.$patch({
                                    user: newUser
                                });
                                // Reset user form
                                this.user = {
                                    userName: null,
                                    nombre: null,
                                    apellidoPaterno: null,
                                    apellidoMaterno: null,
                                    fechaNacimiento: new Date(),
                                    url: "",
                                    password: null,
                                    confirmPassword: null,
                                    email:store.user.email,
                                    nivelTea: null,
                                    edad: null,
                                    sexo: null,
                                    typeAccount: "Niño",
                                };
                            }
                            else {
                                throw('error');
                            }
                        }).catch(error => {
                            this.snackbar.text = 'No se ha podido vincular la cuenta. Intente nuevamente...';
                            this.snackbar.color = 'error';
                            this.snackbar.active = true;
                            this.dialogCreateUser = false;
                        });
                    }
                    else {
                        this.snackbar.text = 'No se ha podido crear la cuenta. Intente nuevamente...';
                        this.snackbar.color = 'error';
                        this.snackbar.active = true;
                        this.dialogCreateUser = false;
                    }                
                }).catch(error => {
                    this.snackbar.text = 'Ha ocurrido un error al crear la cuenta. Intente nuevamente...';
                    this.snackbar.color = 'error';
                    this.snackbar.active = true;
                    this.dialogCreateUser = false;
                });
            }

        
        },
        deleteAccount(cuenta){
            let urlCreateUser = `${config.PathAPI}user/deleteUser`
            // se debe enviar el ID del niño, verificar si hay vinculación, si es asi eliminar
            console.log('Cuenta eliminada:',cuenta)

        }
    },   
    watch: {
        search(newVal, oldVal) {
            this.search = newVal;
            console.log(newVal,oldVal)
            this.updateUserCards();
        }
    },
    created () {
        // verifica si hay cuenta vinculada, en ese caso al TO se le agregan los usuarios creados
        if (vinculacion) {
            if (vinculacion.estado !== "Aprobado") {
                cuentaVinculada = false;
                formData = {
                    idTutor: store.user._id,
                    idTerapeuta: null,
                    user: null,
                    cuentaVinculada
                };
            }
            else{
                cuentaVinculada = true;
                store.getVinculacion();
                formData = {
                    idTutor: store.vinculacion.tutor._id,
                    idTerapeuta: store.vinculacion.terapeuta._id,
                    user: null,
                    cuentaVinculada
                };
            }
        }
        
        this.isTutor= store.user.typeAccount == "Tutor" ? true : false;
    }
}
</script>