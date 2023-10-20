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
/*
.add-step-btn {
    position: fixed;
    top: 110px;
    right: 20px;
    z-index: 100;
}
*/

</style>
<template>
    
    <SidePanelUser/>
    <v-app-bar :elevation="2" class="pl-0 p-sm-0 p-md-4 p-lg-4 changeAppBar">
        <v-app-bar-nav-icon variant="text" class="d-lg-none" @click="showDrawer()"></v-app-bar-nav-icon>
        <v-btn @click="back" icon="mdi-arrow-left" color="primary" class="ml-md-9"></v-btn>
		<span class="d-none d-md-flex"  style="width: 95px; padding-left: 0px; margin-left: -15px;">
            <v-img
                src="/img/Logo-Oficial.png"
                width="auto"     
            />
        </span>
        <v-text class="px-2 "> Detalle de la Rutina: {{ routine?.title }}</v-text>
        <v-spacer></v-spacer>
        <v-btn color="primary" variant="flat" @click="addRoutineStepBtn" prepend-icon="mdi-plus" class="pl-7 px-sm-4  mr-md-4 mr-lg-4" > <v-text class="d-none d-sm-flex">Agregar Paso</v-text> </v-btn>
    </v-app-bar>
    
    
    

    <!-- Dialogs -->
    <CreateRoutineStepDialog v-model="showDialogNew" @close="handleClose" 
        @new-step="handleNewStep" :routine="routine!" :user="userId"/>

    <UpdateRoutineStepDialog v-model="showDialogUpdate" @close="handleClose" 
        @update-step="handleUpdateStep" :routine="routine!" :user="userId" :routineStep="selectedRoutineStep"/>


    <v-row class="mt-5 mx-2 mx-md-3 justify-center" >
        <v-col v-for="(routineStep, index) in routine?.steps" :key="index" cols="12" sm="6" md="4" lg="3" >
            <v-card class="mx-auto" max-width="100%"  height="400">
                <v-img class="border" :height="250" width="500" :src="routineStep.recursoItem.url" cover></v-img>

                <v-card-subtitle class="pt-6"> Paso de Rutina {{ index + 1 }} </v-card-subtitle>
                <v-card-text class="text-center">
                    {{ routineStep.recursoItem.title }}
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions class="justify-center">
                    <v-btn prepend-icon="$edit" variant="flat" class="pl-4 pr-4 mx-1" size="small"
                        @click="editRoutineStepBtn(routineStep)" color="primary" > 
                        Editar 
                    </v-btn>
                    <v-btn prepend-icon="$delete" variant="outlined" class="pl-4 pr-4 mx-1" size="small"
                        @click="deleteRoutineStepBtn(routineStep)" color="primary"> 
                        Eliminar 
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-col>
    </v-row>
    
    
</template>
<script setup lang="ts">

// Imports

import SidePanelUser from '@/components/SidePanel/SidePanelUser.vue';
import CreateRoutineStepDialog from '@/components/RoutineCRUD/CreateRoutineStepDialog.vue';
import UpdateRoutineStepDialog from '@/components/RoutineCRUD/UpdateRoutineStepDialog.vue';
import { ref, toRefs, onMounted } from 'vue'
import router from '@/router'
import { Routine, Step } from '../interfaces/Routine';
import { getRoutineByActivityId } from '../functions/routineFunctions';
import { deleteRoutineStep, updateRoutineStep } from '@/functions/routineStepFunctions';
import {useUserStore} from '@/store/app'
const store = useUserStore()

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

const showDrawer = () =>{
    store.$patch({
            navbarMobile: {active:true}
    })
}

onMounted(async () => {
    console.log(activityId.value)
    console.log(userId.value)
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