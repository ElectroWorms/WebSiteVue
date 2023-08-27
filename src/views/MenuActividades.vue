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

}
.subtitulo {
    text-align: center;
}
.switch-active {
    flex-direction: row-reverse;
}
</style>
<template>
    <SidePanelTutor/>
    <v-app-bar :elevation="2" class="pl-4">
        <v-btn @click="back" icon="mdi-arrow-left"></v-btn>
        Menú de Actividades
    </v-app-bar>
    <v-row class="mx-4 mt-2">
        <v-col v-for="(act,index) in Actividades" :key="index" cols="3" justify="center" aspect-ratio="4/3">
            <v-card class="card-content">
                <v-img class="align-end text-white mx-auto" width="300" :src="act.base64" >             
                </v-img>

                <v-card-subtitle class="pt-4 subtitulo"> {{act.title}}</v-card-subtitle>
    
                <v-card-actions class="btn-actions">
                    <v-btn color="success" variant="flat" @click="loadActivity(act._id,act.user)">Detalle</v-btn>
                    <v-switch class="mx-auto switch-active" style="flex-direction: row-reverse;" v-model="act.active" label="Activo" color="success" @change="updateActivity(act._id,act.active,act.title)" hide-details></v-switch>    
                </v-card-actions>
            </v-card>
        </v-col>
    </v-row>
    <v-snackbar v-model="snackbar" :timeout="timeout" :color="snackbarColor">
        {{ snackbarText }}
        <template v-slot:action="{ attrs }">
            <v-btn color="blue" text v-bind="attrs" @click="snackbar = false">
            Close
            </v-btn>
        </template>
    </v-snackbar>
    
</template>

<script setup lang="ts">
/*
    Imports
*/
import SidePanelTutor from '@/components/SidePanel/SidePanelTutor.vue';
import axios from 'axios';
import { ref, toRefs,onMounted } from 'vue';
import config from '../../config.json';
import router from '@/router';
/*
    Route Params
*/
const props = defineProps(["UserId"]);
const {UserId} = toRefs(props);
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
async function updateActivity(actividadId: string,active: boolean,title: string){
    try {
        await axios.post(config.PathAPI+'actividad/update/',{ ActividadId: actividadId, active: active});
        snackbar.value = true;
        snackbarText.value = 'La Actividad "'+title+'" ha sido '+(active ? 'Activada.' : 'Desactivada.');
        snackbarColor.value = 'success';
    } catch (error) {
        snackbarText.value = 'Error al '+(active ? 'Activar' : 'Desactivar')+' la Actividad: "'+title+'".';
        snackbarColor.value = 'red';
        snackbar.value = true;
    }    
}
/*
    Funciones
*/
let Respuesta;
async function getActividades(){
    Respuesta = {status: true, message: 'Actividad obtenida con éxito.', items: {}};
    await axios.get(config.PathAPI+'actividad/list/'+UserId.value)
    .then(response => {
        console.log(response)
        Respuesta = response.data;
        if (response.data.state) {
            if (response.data.items.length) {
                Respuesta = {status: true, message: 'Listado de Actividades obtenido con éxito.', items: response.data.items};
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
const Actividades = ref([]);
onMounted(async () => {
    let data = await getActividades();
    data = data.items.map(i => {
        i.base64 = 'data:image/jpeg;base64, '+i.base64;
        return i;
    });
    console.log(data)
    Actividades.value = data;
    //console.log(actividad.value.base64)
}) 
function loadActivity(ActivityId,UserId) {
    console.log('click')
    router.push({ name: 'DetalleActividad', params: { ActividadId: ActivityId, UserId: UserId } });
}
function back() {
    router.push({ name: 'Usuarios' });
}

/*if (activityResponse.status) {
    let data = activityResponse.item;
    //data.base64 = 'data:image/jpeg;base64, '+data.base64;
    console.log(data)
    //var actividad = ref(actividad);
} */
</script>