<style>

.btn-actions {
    justify-content: space-around;
}

.card-juegos {
    float: left;
    min-width: 50%;
    max-width: 400px;
    min-height: 500px;
}

.card-rutina {
    float: right;
    min-width: 50%;
    max-width: 400px;
    min-height: 500px;
}

</style>
<template>
    
    <SidePanelTutor/>
    <v-app-bar :elevation="2" class="pl-4">
        <v-btn @click="back" icon="mdi-arrow-left"></v-btn>
        Detalle de la Rutina {{ routineId }}
    </v-app-bar>
    <v-row class="mt-8">
        <v-col cols="4" justify="end" >
            <v-card class="pt-2 card-step">
                <v-img class="" :height="300" src="@/assets/juego.jpg">
                    <!-- <v-card-title>Top 10 Australian beaches</v-card-title> -->
                </v-img>

                <v-card-subtitle class="pt-4"> Rutina </v-card-subtitle>
                <v-card-text>
                    <div>Potencia el crecimiento de tu hijo con rutinas diarias, brindándole confianza en cada paso de su camino.</div>
                </v-card-text>

                <!-- <v-card-actions class="btn-actions">
                    <v-btn @click="loadRoutine" color="green"> Ver Rutina </v-btn>
                </v-card-actions> -->
            </v-card>
        </v-col>
    </v-row>
    
    
</template>
<script setup lang="ts">
/*
    Imports
*/
import SidePanelTutor from '@/components/SidePanel/SidePanelTutor.vue';
import UpperPanel from '@/components/UpperPanel/UpperPanel.vue';
import axios from 'axios';
import { ref, toRefs,onMounted } from 'vue'
import config from '../../config.json'
import router from '@/router'


/*
    Route Params
*/

const props = defineProps(["routineId", "activityId", "userId"]);
const {routineId, activityId, userId}: any = toRefs(props);


/*
    Funciones
*/
let Respuesta;
// async function getActivity(){
//     Respuesta = {status: true, message: 'Actividad obtenida con éxito.', item: {}};
//     await axios.get(config.PathAPI+'rutina/get/'+ routineId.value)
//     .then(response => {
//         Respuesta = response.data;
//         if (response.data.state) {
//             if (response.data.items.length) {
//                 Respuesta = {status: true, message: 'Actividad obtenida con éxito.', item: response.data.items[0]};
//             }
//             else {
//                 Respuesta = {status: true, message: response.data.message, item: {}};
//             }
//         }
//     })
//     .catch(error => {
//         Respuesta = {status: true, message: 'Error al obtener los datos:'+error, item: {}};
//     });
//     return Respuesta;
// }

const actividad: any = ref("");

// onMounted(async () => {
//     let data: any = await getActivity();
//     data = data.item;
//     data.base64 = 'data:image/jpeg;base64, '+data.base64;
//     actividad.value = data;
// })

function back() {
    router.push({ name: 'DetalleActividad', params: { ActividadId: activityId.value, UserId: userId.value } });
}

</script>