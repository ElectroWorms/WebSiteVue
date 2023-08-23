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

.add-step-btn {
    position: fixed;
    bottom: 20px;
    right: 20px;
    z-index: 100;
}

</style>
<template>
    
    <SidePanelTutor/>
    <v-app-bar :elevation="2" class="pl-4">
        <v-btn @click="back" icon="mdi-arrow-left"></v-btn>
        <!-- make a vue subtitle with "Detalle de la Rutina:" and put routine?.title beside -->
        <span><span class="font-weight-bold">Detalle de la Rutina:</span> {{ routine?.title }}</span>
    </v-app-bar>
    
    <div class="btn-container">
        <v-btn class="delete-routine-btn pl-4 pr-4" prepend-icon="$delete" variant="tonal" 
            @click="deleteRoutine" color="red"> 
            Eliminar Rutina 
        </v-btn>
    </div>
    
    <v-btn class="add-step-btn pl-4 pr-4" prepend-icon="$plus" variant="tonal" 
        @click="addRoutineStepBtn" color="green">
        Agregar Paso 
    </v-btn>

    <!-- Dialogs -->
    <CreateRoutineStepDialog v-model="showDialogNew" @close="handleClose" 
        @new-step="handleNewStep" :routine="routine!" :user="userId"/>

    <UpdateRoutineStepDialog v-model="showDialogUpdate" @close="handleClose" 
        @update-step="handleUpdateStep" :routine="routine!" :user="userId" :routineStep="selectedRoutineStep"/>

    <v-row class="mt-8 ml-4 mr-4">

        <v-col v-for="(routineStep, index) in routine?.steps" :key="index" cols="3" justify="end">
            <v-card class="pt-2 card-step">
                <v-img class="" :height="200" :src="routineStep.recursoItem.url"></v-img>

                <v-card-subtitle class="pt-6"> Paso de Rutina {{ index + 1 }} </v-card-subtitle>
                <v-card-text>
                    {{ routineStep.recursoItem.title }}
                </v-card-text>

                <v-card-actions class="btn-actions pl-3 pr-3">
                    <v-btn prepend-icon="$edit" variant="tonal" class="pl-4 pr-4"
                        @click="editRoutineStepBtn(routineStep)" color="orange"> 
                        Editar 
                    </v-btn>
                    <v-btn prepend-icon="$delete" variant="tonal" class="pl-4 pr-4"
                        @click="deleteRoutineStepBtn(routineStep)" color="red"> 
                        Eliminar 
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-col>
    </v-row>
    
    
</template>
<script setup lang="ts">

// Imports

import SidePanelTutor from '@/components/SidePanel/SidePanelTutor.vue';
import CreateRoutineStepDialog from '@/components/RoutineCRUD/CreateRoutineStepDialog.vue';
import UpdateRoutineStepDialog from '@/components/RoutineCRUD/UpdateRoutineStepDialog.vue';
import { ref, toRefs, onMounted } from 'vue'
import router from '@/router'
import { Routine, Step } from '../interfaces/Routine';
import { getRoutineByActivityId } from '../functions/routineFunctions';
import { deleteRoutineStep, updateRoutineStep } from '@/functions/routineStepFunctions';


// Route Params

const props = defineProps(["routineId", "activityId", "userId"]);
const {routineId, activityId, userId}: any = toRefs(props);

// Variables 
let routine = ref<Routine>();
let showDialogNew = ref<boolean>(false);
let showDialogUpdate = ref<boolean>(false);
let selectedRoutineStep = ref<Step>();


// Functions

async function getUpdatedRoutine() {
    let routineResp = await getRoutineByActivityId(activityId.value);
    routineResp = routineResp.item[0];
    routine.value = routineResp;
}

onMounted(async () => {

    await getUpdatedRoutine();
});


// function that called to delete a routine step
async function deleteRoutineStepBtn(routineStep: Step) {
    
    // delete the routine step from the database
    await deleteRoutineStep(routineStep._id);

    // delete the routine step from the routineSteps array
    if (routine.value?.steps.length === 1) {
        routine.value.steps = [];
        return;
    }

    // delete the routine step from the routineSteps array
    routine.value!.steps = routine.value!.steps.filter((step) => step._id !== routineStep._id);

    // update the position of the next steps in the database
    for (let i = routineStep.posicion-1; i < routine.value!.steps.length; i++) {
        let updatedStep = routine.value!.steps[i];
        await updateRoutineStep(updatedStep._id, routine.value!._id, i+1, updatedStep.recursoItem._id);
    }

    // get from the db the updated routine
    await getUpdatedRoutine();
}

// function that called to edit a routine step
async function editRoutineStepBtn(routineStep: Step) {

    console.log("Edit", routineStep._id);
    selectedRoutineStep.value = routineStep;
    showDialogUpdate.value = !showDialogUpdate.value;
}

// function that called to add a new routine step
async function addRoutineStepBtn() {

    console.log("New");
    showDialogNew.value = !showDialogNew.value;
}

async function deleteRoutine() {
    
    console.log("Delete Routine", routineId.value);
    // delete the routine from the database
    // delete the routine from the routines array
}

function handleClose() {
    showDialogNew.value = false;
    showDialogUpdate.value = false;
}

// call again the getRoutineByActivityId function to get the new routine with the new step
async function handleNewStep() {
    await getUpdatedRoutine();
}

// call again the getRoutineByActivityId function to get the new routine with the updated step
async function handleUpdateStep() {
    await getUpdatedRoutine();
}


// Routes

function back() {
    router.push({ name: 'DetalleActividad', params: { ActividadId: activityId.value, UserId: userId.value } });
}

</script>