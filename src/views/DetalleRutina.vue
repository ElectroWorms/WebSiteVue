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

// Imports

import SidePanelTutor from '@/components/SidePanel/SidePanelTutor.vue';
import { ref, toRefs, onMounted } from 'vue'
import router from '@/router'
import { Routine, RoutineStep } from '../interfaces/Routine';
import { getRoutine } from '../functions/routineFunctions';


// Route Params

const props = defineProps(["routineId", "activityId", "userId"]);
const {routineId, activityId, userId}: any = toRefs(props);
console.log("props", routineId, activityId, userId);

// Variables 
let routine = ref<Routine>();
let routineSteps = ref<RoutineStep[]>();


// Functions

onMounted(async () => {
    console.log("routineIdObj", routineId);
    // obtenemos la rutina y los pasos de la rutina
    routine.value = await getRoutine(routineId.value);
});


// Routes

function back() {
    router.push({ name: 'DetalleActividad', params: { ActividadId: activityId.value, UserId: userId.value } });
}

</script>