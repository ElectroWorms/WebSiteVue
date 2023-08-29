<style>
.card-content {
    min-width: 50%;
    max-width: 400px;
    min-height: 300px;
}
.btn-actions {
    display: flex !important;
    align-items: center !important;    
    text-align: center !important;
    justify-content: center !important;
    flex-direction: row-reverse !important;
}
.subtitulo {
    text-align: center;
}
</style>
<template>
    <SidePanelTutor/>
    <v-app-bar :elevation="2" class="pl-4">
        <v-btn @click="back" icon="mdi-arrow-left"></v-btn>
        Listado de Juegos
    </v-app-bar>
    <v-row class="mx-4 mt-2">
        <v-col v-for="(juego,index) in Juegos" :key="index" cols="3" justify="center" aspect-ratio="4/3">
            <v-card class="card-content" height="400">
                <v-img class="align-center mt-5 text-white mx-auto" height="250" :src="juego.url" aspect-ratio="1" >             
                </v-img>

                <v-card-subtitle class="pt-4 subtitulo"> {{juego.title}}</v-card-subtitle>
    
                <v-card-actions>
                    <v-switch v-model="juego.active" @change="updateGame(juego._id,juego.active,juego.title)" label="Activo" color="success"  hide-details></v-switch>       
                </v-card-actions>
            </v-card>
        </v-col>
    </v-row>
    
    <v-snackbar v-model="snackbar" :timeout="timeout" :color="snackbarColor">
        {{ snackbarText }}
        
    </v-snackbar>
</template>

<script setup lang="ts">
/*
    Imports
*/
import SidePanelTutor from '@/components/SidePanel/SidePanelTutor.vue';
import axios from 'axios';
import { ref, toRefs,onMounted, reactive } from 'vue'
import config from '../../config.json'
import router from '@/router'
/*
    Route Params
*/
const props = defineProps(["ActividadId","UserId"]);
const {ActividadId, UserId} = toRefs(props);
/*
    Ref
*/
const snackbar = ref(false);
const snackbarText = ref('ok');
const snackbarColor = ref('success');
const timeout = ref(1000);
/*
    Funciones
*/
let Respuesta;
async function updateGame(juegoId: string,active: boolean,title: string){
    try {
        await axios.post(config.PathAPI+'juegos/update/',{ juegoId: juegoId, active: active});
        snackbar.value = true;
        snackbarText.value = 'El juego "'+title+'" ha sido '+(active ? 'Activado.' : 'Desactivado.');
        snackbarColor.value = 'success';
    } catch (error) {
        snackbarText.value = 'Error al '+(active ? 'Activar' : 'Desactivar')+' el juego "'+title+'".';
        snackbarColor.value = 'red';
        snackbar.value = true;
    }
    
}
async function getGames(){
    Respuesta = {state: true, code: 200, message: 'Actividad obtenida con éxito.', item: {}};
    await axios.get(config.PathAPI+'juegos/list/'+ActividadId?.value)
    .then(response => {
        Respuesta = response.data;
        if (response.data.state) {
            if (response.data.item.length) {
                Respuesta = response.data;
            }
            else {
                Respuesta = {state: false, message: response.data.message, item: []};
            }
        }
    })
    .catch(error => {
        Respuesta = {state: false, code: 500, message: 'Error al obtener los datos:'+error, item: []};
    });
    return Respuesta;
}
const Juegos:any = ref([]);
onMounted(async () => {
    let data = await getGames();
    console.log(data.item)
    Juegos.value = data.item;
    //console.log(actividad.value.base64)
}) 
function loadGames() {
    router.push({ name: 'Juegos', params: { ActividadId: ActividadId?.value } });
}
function back() {
    router.push({ name: 'DetalleActividad', params: { ActividadId: ActividadId?.value, UserId: UserId?.value } });
}

/*if (activityResponse.status) {
    let data = activityResponse.item;
    //data.base64 = 'data:image/jpeg;base64, '+data.base64;
    console.log(data)
    //var actividad = ref(actividad);
} */
</script>