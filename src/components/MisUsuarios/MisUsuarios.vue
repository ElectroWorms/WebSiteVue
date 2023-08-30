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
        <v-btn color="primary" class="mt-2" @click="dialogCreateUser = true" v-if="isTutor">Crear Cuenta</v-btn>
	</v-app-bar>
    <div class="mx-6">  
        <div v-if="users.length" class="w-100 h-100 mx-2 mt-4">
            
            <v-row class="mt-2">
                
            </v-row>
            <v-row>                    
                <v-col xs="12" sm="6" md="4" lg="3" v-for="item in users" :key="item._id">      
                    <v-card class="mx-auto" max-width="100%" style="height: 380px;">
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
                            <v-row>
                                <v-col cols="12" class="py-0  text-center">
                                    <v-btn color="orange-lighten-2" variant="text" @click="loadPerfil(item)">
                                        Ver Perfil
                                    </v-btn>
                                </v-col>
                                <v-col cols="12" class="py-0  text-center" v-if="showDelete">
                                    <v-btn color="red-lighten-2" variant="text" @click="deleteAccount(item)">
                                        Eliminar Perfil
                                    </v-btn>
                                </v-col>
                            </v-row>
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
                                <v-text-field label="Nombre de usuario" v-model="user.userName" :rules="[v => !!v || 'Nombre de usuario es requerido']" variant="underlined" required></v-text-field>
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
                                <v-text-field label="Edad" v-model="user.edad" variant="underlined" :rules="[v => !!v || 'Campo requerido']"></v-text-field>
                            </v-col>
                            <v-col cols="4" md="4">
                                <v-select label="Nivel de Apoyo" :items= "['Nivel de Apoyo 1','Nivel de Apoyo 2','Nivel de Apoyo 3']" v-model="user.nivelTea" variant="underlined" :rules="[v => !!v || 'Campo requerido']" required></v-select>
                            </v-col>
                            <v-col cols="4" md="4">
                                <v-select label="Sexo" :items="['Masculino','Femenino']" v-model="user.sexo" variant="underlined" :rules="[v => !!v || 'Campo requerido']"></v-select>
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
                        <v-btn color="red darken-1" text variant="tonal" @click="dialogCreateUser = false">
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

    <!-- Estas seguro de eliminar la cuenta -->
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
import axios from 'axios'
import {useUserStore} from "../../store/app"
const store = useUserStore()
const vinculacion = store.vinculacion
var cuentaVinculada = false
import config from '../../../config.json'
export default {
    data: () =>({
        isTutor: (store.user.typeAccount == "Tutor") ? true : false,
        isTO: (store.user.typeAccount == "Terapeuta Ocupacional")  ? true : false,
        snackbar: {
            color: null,
            active: false,
            text: null,
            timeout: 3000,
        },
        MensajeBusqueda: (store.user.typeAccount == "Tutor") ? ((store.user.users ? store.user.users : []).length == 0 ? "Aún no has creado ninguna cuenta." : "Ninguna cuenta coincide con la búsqueda") : "Aún no se ha vinculado ninguna cuenta.",
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
        showDelete: (store.user.typeAccount == "Tutor") ? true : false,
        dialogDelete: false,
        cuenta: {},
        dialogCreateUser: false,
        users: store.user.users ? store.user.users : [],
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
            let search = this.search.toLowerCase();
            this.users = this.respaldoUsers.filter(m => 
            (m.fullname || '').toLowerCase().includes(search) ||
            (m.nivelTea || '').toLowerCase().includes(search));
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
                this.snackbar.text = 'No puede crear un nuevo usuario. La cuenta básica permite un máximo de 2 usuarios.';
                this.snackbar.color = 'error';
                this.snackbar.active = true;
                this.dialogCreateUser = false;
            }
            else if (typePlan == "Premium" && currentUsers == 5){
                this.snackbar.text = 'No puede crear un nuevo usuario. La cuenta premium permite un máximo de 5 usuarios.';
                this.snackbar.color = 'error';
                this.snackbar.active = true;
                this.dialogCreateUser = false;
            }
            else{
                newUser.fullname = `${newUser.nombre} ${newUser.apellidoPaterno} ${newUser.apellidoMaterno}`;
                axios.post(urlCreateUser, this.user).then (responseUser => {
                    if (responseUser.data.state && responseUser.data.item.length == 1) {
                        let nuevoUsuario = responseUser.data.item[0];
                        let formData = {idTutor: store.user._id, user:nuevoUsuario}                  
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
                                this.users = newUser.users;
                                this.respaldoUsers = newUser.users;
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
            this.dialogDelete = true
            this.cuenta = Object.assign({}, cuenta)
            console.log(this.cuenta)
        },
        async deleteConfirm(){
            await store.getVinculacion(this.cuenta._id)
            
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
                    this.users = responseUsers
                    this.MensajeBusqueda = 'Aún no has creado ninguna cuenta.'
                    this.dialogDelete = false
                    this.snackbar.text =  result.data.message;
                    this.snackbar.color = 'success';
                    this.snackbar.active = true;
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
        
        this.isTutor= store.user.typeAccount == "Tutor" ? true : false;
    }
}
</script>