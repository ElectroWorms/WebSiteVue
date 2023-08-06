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
            <v-card class="card-content">
                <v-img class="align-end text-white mx-auto" width="300" :src="juego.base64" >             
                </v-img>

                <v-card-subtitle class="pt-4 subtitulo"> {{juego.title}}</v-card-subtitle>
    
                <v-card-actions>
                    <v-switch style="flex-direction: row-reverse !important" v-model="juego.active" label="Activo" color="success"  hide-details></v-switch>       
                </v-card-actions>
            </v-card>
        </v-col>
    </v-row>
    
    
</template>

<script setup lang="ts">
/*
    Imports
*/
import SidePanelTutor from '@/components/SidePanel/SidePanelTutor.vue';
import axios from 'axios';
import { ref, toRefs,onMounted } from 'vue'
import config from '../../config'
import router from '@/router'
/*
    Route Params
*/
const props = defineProps(["ActividadId","UserId"]);
const {ActividadId, UserId} = toRefs(props);
/*
    Funciones
*/
let Respuesta;
async function getGames(){
    Respuesta = {status: true, message: 'Actividad obtenida con éxito.', items: {}};
    await axios.get(config.PathAPI+'juegos/list/'+ActividadId.value)
    .then(response => {
        console.log(response)
        Respuesta = response.data;
        if (response.data.state) {
            if (response.data.items.length) {
                Respuesta = {status: true, message: 'Listado de Juegos obtenido con éxito.', items: response.data.items};
            }
            else {
                Respuesta = {status: true, message: response.data.message, items: []};
            }
        }
    })
    .catch(error => {
        Respuesta = {status: true, message: 'Error al obtener los datos:'+error, items: []};
    });
    return Respuesta;
}
const Juegos = ref([]);
onMounted(async () => {
    let data = await getGames();
    data = data.items.map(i => {
        i.base64 = 'data:image/jpeg;base64, '+i.base64;
        return i;
    });
    console.log(data)
    Juegos.value = data;
    //console.log(actividad.value.base64)
}) 
function loadGames() {
    console.log('click')
    router.push({ name: 'Juegos', params: { ActividadId: ActividadId.value } });
}
function back() {
    router.push({ name: 'DetalleActividad', params: { ActividadId: ActividadId.value, UserId: UserId.value } });
}

/*if (activityResponse.status) {
    let data = activityResponse.item;
    //data.base64 = 'data:image/jpeg;base64, '+data.base64;
    console.log(data)
    //var actividad = ref(actividad);
} */
</script>