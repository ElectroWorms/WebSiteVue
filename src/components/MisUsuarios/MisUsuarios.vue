<template>
    <div>
        <v-card-title class="text-subtitle-1 ">Mis Usuarios</v-card-title>
        <v-container class="border d-flex justify-start mx-1 mb-5 elevation-0" fluid >
            <v-card class="w-100 px-1 py-1">
                <v-toolbar density="compact">
                    <v-spacer></v-spacer>
                    <v-btn
                        color="blue darken-1"
                        text
                        variant="outlined"
                        @click="create"
                        >
                        Agregar Usuario
                    </v-btn>
                </v-toolbar>
                <v-card
                    color="primary"
                    theme="dark"
                    class="pa-2 ma-2"
                    style="width: 350px;"
                    v-for="item in users"
                    :key="item._id"
                    >
                    <div class="d-flex flex-no-wrap">
                    <div class="">
                        <v-card-title class="text-h5 ">
                            {{item.userName}}
                        </v-card-title>
                        <v-card-subtitle>{{ item.firstName }} {{ item.secondName }}</v-card-subtitle>
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
                        class="ma-3 "
                        size="125"
                        rounded="0"
                    >
                        <v-img src="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Blank&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"></v-img>
                    </v-avatar>
                    </div>
                </v-card>  
                
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
                        @click="cancelar"
                        >
                        Cancelar
                    </v-btn>
                    </v-card-actions>
                    
                </v-container>
            </v-card>
    </v-dialog>

    <v-dialog v-model="dialogSuccess" max-width="580px">
    <v-card >
      <v-card-title class="text-h5 text-center">La cuenta se ha creado la cuenta correctamente!</v-card-title>
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
        user:{
            userName: null,
            firstName: null,
            secondName: null,
            password: null,
            email:store.user.email,
            typeAccount: "Niño",
        },
        users: store.user.users,
        dialogCreateUser: false,
        dialogSuccess: false
        
    }),

    methods:{
        closeDialogSuccess (){
            this.dialogSuccess = false
        },
        create(){
            this.dialogCreateUser = true
        },
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
            this.$router.push({path: '/User/Rutinas'})
        },
        deletePerfil(){

        }, 
        cancelar () {
            this.dialogCreateUser = false
        },
        save (){
            var url = 'http://localhost:4000/createUser'
            var url2 = 'http://localhost:4000/addUser'
            let formData = {
                idTutor: store.solicitud.tutor._id,
                idTerapeuta: store.solicitud.terapeuta._id,
                user: store.user
            }
            console.log("formMetada", formData)
            axios.post(url, this.user)
            .then (response => {
                axios.post(url2, formData)
                .then(response => {
                    this.dialogSuccess = true
                })
                .catch(error => {
                    console.log(error)
                })
            })
            .catch(error => {
            console.log(error)
            this.alertError = true
            })
        }
    },
    
    created () {
        store.getSolicitud()
    }
}
</script>