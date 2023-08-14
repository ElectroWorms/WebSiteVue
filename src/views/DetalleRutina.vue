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
}	

</style>
<template>
    
    <SidePanelTutor/>
    <v-app-bar :elevation="2" class="pl-4">
        <v-btn @click="back" icon="mdi-arrow-left"></v-btn>
        <!-- make a vue subtitle with "Detalle de la Rutina:" and put routine?.title beside -->
        <span><span class="font-weight-bold">Detalle de la Rutina:</span> {{ routine?.title }}</span>
    </v-app-bar>
    
    <v-btn class="add-step-btn pl-4 pr-4" prepend-icon="$plus" variant="tonal" 
        @click="showDialogNew = !showDialogNew" color="green"> 
        Agregar Paso 
    </v-btn>
    <CreateRoutineStepDialog v-model="showDialogNew" @close="handleClose" :routine="routine" />

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
import { ref, toRefs, onMounted } from 'vue'
import router from '@/router'
import { Routine, Step } from '../interfaces/Routine';
import { getRoutineByActivityId } from '../functions/routineFunctions';
import { deleteRoutineStep } from '@/functions/routineStepFunctions';


// Route Params

const props = defineProps(["routineId", "activityId", "userId"]);
const {routineId, activityId, userId}: any = toRefs(props);

// Variables 
let routine = ref<Routine>();
let showDialogNew = ref<boolean>(false);


// Functions

onMounted(async () => {
    // get the routine from the database with the steps and resources
    let routineResp = await getRoutineByActivityId(activityId.value);
    routineResp = routineResp.item[0];

    // parse the routine and the routine steps
    routine.value = routineResp;
});


// function that called to delete a routine step
async function deleteRoutineStepBtn(routineStep: Step) {
    console.log("Delete", routineStep._id);
    // delete the routine step from the database
    await deleteRoutineStep(routineStep._id);
    // delete the routine step from the routineSteps array
    if (routine.value?.steps) {
        routine.value.steps = routine.value?.steps.filter((step) => step._id != routineStep._id);
    }
    console.log(routine.value);
}

// function that called to edit a routine step
async function editRoutineStepBtn(routineStep: Step) {
    console.log("Edit", routineStep._id);
    // edit the routine step from the database
    // edit the routine step from the routineSteps array
}

// function that called to add a new routine step
async function addRoutineStepBtn() {
    console.log("New");
    showDialogNew.value = true;
    // add the routine step to the database
    // add the routine step to the routineSteps array
}

function handleClose() {
    showDialogNew.value = false;
}


// Routes

function back() {
    router.push({ name: 'DetalleActividad', params: { ActividadId: activityId.value, UserId: userId.value } });
}

</script>