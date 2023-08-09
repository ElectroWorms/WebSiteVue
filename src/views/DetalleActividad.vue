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
        Detalle de la Actividad
    </v-app-bar>
    <v-row class="mt-8">
        <v-col cols="6" justify="end" >
            <v-card class="pt-2 card-rutina">
                <v-img class="" :height="300" :src="actividad.base64">
                    <!-- <v-card-title>Top 10 Australian beaches</v-card-title> -->
                </v-img>

                <div v-if="routineList.length">
                    <ul>
                        <li v-for="routine in routineList" :key="routine._id">{{ routine.title }}</li>
                    </ul>
                </div>

                <v-card-subtitle class="pt-4"> Rutina </v-card-subtitle>
                <v-card-text>
                    <div>Potencia el crecimiento de tu hijo con rutinas diarias, brindándole confianza en cada paso de su camino.</div>
                </v-card-text>

                <v-card-actions class="btn-actions">
                    <v-btn @click="loadRoutine" color="green"> Ver Rutina </v-btn>
                </v-card-actions>
            </v-card>
        </v-col>
        <v-col cols="6">
            <v-card class="card-juegos pt-2">
                <v-img class="" :height="300" src="@/assets/juego.jpg">
                    <!-- <v-card-title>Top 10 Australian beaches</v-card-title> -->
                </v-img>

                <v-card-subtitle class="pt-4"> Juegos </v-card-subtitle>
                <v-card-text>
                    <div>Mediante juegos interactivos, estimula la creatividad y autonomía en las actividades diarias.</div>
                </v-card-text>

                <v-card-actions class="btn-actions">
                    <v-btn @click="loadGames" color="orange"> Ver Juegos </v-btn>
                </v-card-actions>
            </v-card>
        </v-col>
    </v-row>
    
    
</template>
<script setup lang="ts">

// Imports

import SidePanelTutor from '@/components/SidePanel/SidePanelTutor.vue';
import { ref, toRefs,onMounted } from 'vue'
import router from '@/router'
import {getActivity, fetchRoutines} from '../functions/activityDetailFunctions'


// Route Params

const props = defineProps(["ActividadId","UserId"]);
const {ActividadId, UserId}: any = toRefs(props);

const routineId = 1;
let routineList: any[] = [];
let activityData: any;


// Functions

const actividad: any = ref("");

onMounted(async () => {
    activityData = await getActivity(ActividadId);
    routineList = await fetchRoutines();
    activityData = activityData.item;
    actividad.value = activityData;
})

// Routes

function loadRoutine() {
    router.push({name: 'DetalleRutina', params: {RoutineId: routineId, ActividadId: ActividadId.value, UserId: UserId.value}});
}

function loadGames() {
    router.push({ name: 'Juegos', params: { ActividadId: ActividadId.value } });
}

function back() {
    router.push({ name: 'MenuActividades', params: { ActividadId: ActividadId.value, UserId: UserId.value } });
}

</script>