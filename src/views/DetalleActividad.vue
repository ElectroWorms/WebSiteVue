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
.rutina {
    display:flex;
    justify-content: flex-end;
}
.juegos {
    display:flex;
    justify-content: flex-start;
}
/* sm */
@media (min-width: 1px) and (max-width: 767px) {
    .rutina {
        display:flex;
        justify-content: center;
    }
    .juegos {
        display:flex;
        justify-content: center;
    }
}
/* md */
@media (min-width: 768px)  and (max-width: 991px) {
    .rutina {
        display:flex;
        justify-content: center;
    }
    .juegos {
        display:flex;
        justify-content: center;
    }
}
</style>
<template>
    
    <SidePanelUser/>
    <v-app-bar :elevation="2" class="pl-4">
        <v-btn @click="back" icon="mdi-arrow-left"></v-btn>
        Detalle de la Actividad
    </v-app-bar>

    <CreateRoutineDialog v-model="showDialogNewRoutine" @close="handleClose" 
        @new-routine="handleNewRoutine" :activityId="ActividadId" :userId="UserId"/>
    
    <v-row class="mt-8">
        <v-col xs="12" sm="12" md="6" lg="6" class="rutina">
            <v-card class="pt-2 card-rutina" min-height="550">

                <v-img class="" :height="300" :src="actividad.url">
                </v-img>

                <v-card-subtitle class="pt-4"> Rutina </v-card-subtitle>
                <v-card-text>
                    <div>Potencia el crecimiento de tu hijo con rutinas diarias, brindándole confianza en cada paso de su camino.</div>
                </v-card-text>
                <!-- create select with the elements of routineList -->
                <v-row class="ml-4 mr-4 mt-4">
                    <v-select class="mr-2"
                        label="Seleccione la rutina activa"
                        :items="routineList"
                        variant="outlined"
                        v-model="selectedRoutine"
                        :return-object="true"
                        v-on:update:model-value="onChangeSelectedRoutine"
                    ></v-select>
                    <v-btn @click="activateRoutine" :disabled="!selectedRoutine" color="green"> Activar </v-btn>
                </v-row>

                <v-row class="ma-3">
                    <v-btn class="create-routine-btn pl-4 pr-4" prepend-icon="$plus" variant="tonal" 
                        @click="createRoutineBtn" color="green">
                        Crear Rutina
                    </v-btn>
                </v-row>

                <v-card-subtitle class="pt-4"> Rutina </v-card-subtitle>
                <v-card-text>
                    <div>Potencia el crecimiento de tu hijo con rutinas diarias, brindándole confianza en cada paso de su camino.</div>
                </v-card-text>

                <v-card-actions class="btn-actions">
                    <v-btn @click="loadRoutine" color="green"> Ver Rutina </v-btn>
                </v-card-actions>
            </v-card>
        </v-col>
        <v-col xs="12" sm="12" md="6" lg="6" class="juegos">
            <v-card class="card-juegos pt-2" min-height="550">
                <v-img class="" :height="300" src="@/assets/juego.jpg">
                    <!-- <v-card-title>Top 10 Australian beaches</v-card-title> -->
                </v-img>

                <v-spacer></v-spacer>
                <v-card-subtitle class="pt-4"> Juegos </v-card-subtitle>
                <v-card-text>
                    <div>Mediante juegos interactivos, estimula la creatividad y autonomía en las actividades diarias.</div>
                </v-card-text>
                
                <v-card-actions class="btn-actions" style="margin-top: 80px">
                    <v-btn @click="loadGames" color="orange"> Ver Juegos </v-btn>
                </v-card-actions>
            </v-card>
        </v-col>
    </v-row>
    
    
</template>
<script setup lang="ts">

// Imports

import SidePanelUser from '@/components/SidePanel/SidePanelUser.vue';
import { ref, toRefs,onMounted } from 'vue'
import router from '@/router'
import {getActivity, fetchRoutines} from '../functions/activityDetailFunctions'
import { Routine } from '@/interfaces/Routine';
import { changeRoutineStatus } from '@/functions/routineFunctions';
import CreateRoutineDialog from '@/components/RoutineCRUD/CreateRoutineDialog.vue';


// Route Params

const props = defineProps(["ActividadId","UserId"]);
const {ActividadId, UserId}: any = toRefs(props);

let routineId: string | undefined;
let routineList: Routine[] = [];
let activityData: any;

const actividad: any = ref([]);
let showDialogNewRoutine = ref<boolean>(false);

// make a ref for an object with the selected routine
let selectedRoutine = ref<Routine>();

// Functions

function onChangeSelectedRoutine() {
    console.log("Selected routine:", selectedRoutine.value?._id);
}

async function activateRoutine() {
    // get the id of the selected routine and save it in
    routineId = selectedRoutine.value?._id;

    // send the id to the backend for changing the routine status
    await changeRoutineStatus(routineId!, true);
}

// when the component loads
onMounted(async () => {

    // get the activity data and save it in ref 'actividad'
    activityData = await getActivity(ActividadId.value);
    activityData = activityData.item[0];
    actividad.value = activityData;

    // get the list of routines for the activity
    routineList = (await fetchRoutines(UserId.value, ActividadId.value)).item;

    // select the routine that is active
    selectedRoutine.value = routineList.filter((routine) => routine.active)[0];
    routineId = selectedRoutine.value._id;
})

// function that get the list of routines for the activity updated
async function getUpdatedRoutines() {
    // get the list of routines for the activity
    routineList = (await fetchRoutines(UserId.value, ActividadId.value)).item;

    // select the routine that is active
    selectedRoutine.value = routineList.filter((routine) => routine.active)[0];
    routineId = selectedRoutine.value._id;
}

// function that's called to create a routine
function createRoutineBtn() {
    showDialogNewRoutine.value = true;
}

// function that's called to close the dialog
function handleClose() {
    showDialogNewRoutine.value = false;
}

// function that's called when a new routine is created
async function handleNewRoutine() {
    // update the list of routines
    await getUpdatedRoutines();
}

// Routes

function loadRoutine() {
    router.push({name: 'DetalleRutina', params: {routineId: routineId, activityId: ActividadId.value, userId: UserId.value}});
}

function loadGames() {
    router.push({ name: 'Juegos', params: { ActividadId: ActividadId?.value } });
}

function back() {
    router.push({ name: 'MenuActividades', params: { ActividadId: ActividadId?.value, UserId: UserId?.value } });
}

</script>