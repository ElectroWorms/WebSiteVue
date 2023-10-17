<style>
.card-content {
    min-width: 50%;
    max-width: 400px;
    min-height: 300px;
}
.btn-actions {

}
.subtitulo {
    text-align: center;
}
.switch-active {
    flex-direction: row-reverse !important;
}
</style>
<template>
    <SidePanelUser/>
    <v-app-bar :elevation="2" class="changeAppBar">
        <v-app-bar-nav-icon variant="text" class="d-lg-none" @click="showDrawer()"></v-app-bar-nav-icon>
        <v-btn @click="back" icon="mdi-arrow-left" color="primary" class="ml-md-9"></v-btn>
		<span class="d-none d-md-flex"  style="width: 95px; padding-left: 0px; margin-left: -15px;">
            <v-img
                src="../../../public/img/Logo-Oficial 1.png"
                width="auto"     
            />
        </span>
        <v-text class="mb-md-1"> Menú de Actividades</v-text>
        
    </v-app-bar>
    <v-row class="mx-2 mx-md-3 mt-2">
        <v-col v-for="(act,index) in Actividades" :key="index" cols="12" sm="6" md="4" lg="3"  justify="center" >
            <v-card class="card-content pt-5 pb-5 px-5" height="400">
                <v-img class="align-end text-white mx-auto" height="250" :src="act.url" aspect-ratio="1">             
                </v-img>

                <v-card-subtitle class="pt-4 subtitulo"> {{act.title}}</v-card-subtitle>
    
                <v-card-actions>                    
                    <v-switch style="flex-direction: row-reverse !important"  v-model="act.active" label="Activo" color="primary" @change="updateActivity(act._id,act.active,act.title)" hide-details></v-switch>    
                    <v-btn color="primary" variant="flat" prepend-icon="mdi-file-search-outline " @click="loadActivity(act._id,act.user)" >Detalle</v-btn>
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
import SidePanelUser from '@/components/SidePanel/SidePanelUser.vue';
import axios from 'axios';
import { ref, toRefs,onMounted } from 'vue';
import config from '../../config.json';
import router from '@/router';
import {useUserStore} from '@/store/app'
const store = useUserStore()
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
const showDrawer = () =>{
    store.$patch({
            navbarMobile: {active:true}
    })
}
async function updateActivity(actividadId: string, active: boolean ,title: string){
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
    Respuesta = {state: true, message: 'Actividad obtenida con éxito.', item: []};
    await axios.get(config.PathAPI+'actividad/list/'+UserId?.value)
    .then(response => {
        Respuesta = response.data;
        console.log(Respuesta)
        if (response.data.state) {
            Respuesta = response.data;
        }
    })
    .catch(error => {
        Respuesta = {state: true, code: 500, message: 'Error al obtener los datos:'+error, item: []};
    });
    return Respuesta;
}
const Actividades:any = ref([]);
onMounted(async () => {
    let data = await getActividades();
    console.log(data)
    console.log(data.item)
    let items = data.item;
    Actividades.value = items;
    //console.log(actividad.value.base64)
})
function loadActivity(ActivityId: string,UserId: string) {
    console.log('click')
    router.push({ name: 'DetalleActividad', params: { ActividadId: ActivityId, UserId: UserId } });
}
function back() {
    router.push({ name: 'Usuarios' });
}
</script>