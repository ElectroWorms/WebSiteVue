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
    
    <SidePanelUser/>
    
    <v-row class="d-flex justify-space-between mt-8 ml-8 mr-8">
        <p class="text-h5">Mantenedor de imágenes</p>
    </v-row>
    
    <v-btn class="add-step-btn pl-4 pr-4" prepend-icon="$plus" variant="tonal" 
        @click="addResourceBtn" color="green">
        Agregar Recurso 
    </v-btn>

    <!-- Dialogs -->
    <CreateResourceDialog v-model="showDialogNew" @close="handleClose" 
        @new-resource="handleNewResource" :resources="resources!" :user="userId"/>

    <UpdateResourceDialog v-model="showDialogUpdate" @close="handleClose" 
        @update-step="handleUpdateResource" :routine="resources!" :user="userId" :routineStep="selectedResource"/>

    <DeleteResourceDialog v-model="showDialogDelete" @close="handleClose" 
        @deleted="handleDeleteResource" :resource="selectedResource"/>

    <v-row class="mt-8 ml-4 mr-4">

        <v-col v-for="(resource, index) in resources" :key="index" cols="3" justify="end">
            <v-card class="pt-2 card-step">
                <v-img class="" :height="200" :src="resource.url"></v-img>

                <v-card-subtitle class="pt-6"> </v-card-subtitle>
                <v-card-text>
                    {{ resource.title }}
                </v-card-text>

                <v-card-actions class="btn-actions pl-3 pr-3">
                    <v-btn prepend-icon="$edit" variant="tonal" class="pl-4 pr-4"
                        @click="editResourceBtn(resource)" color="orange"> 
                        Editar 
                    </v-btn>
                    <v-btn prepend-icon="$delete" variant="tonal" class="pl-4 pr-4"
                        @click="deleteResourceBtn(resource)" color="red"> 
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
import { ref, toRefs, onMounted } from 'vue'
import { Resource } from '@/interfaces/Resource';
import CreateResourceDialog from '@/components/MantenedorImagenes/CreateResourceDialog.vue';
import UpdateResourceDialog from '@/components/MantenedorImagenes/UpdateResourceDialog.vue';
import DeleteResourceDialog from '@/components/MantenedorImagenes/DeleteResourceDialog.vue';
import { 
    createResource, 
    getAllResources, 
    uploadImage, 
    deleteResource, 
    updateResource 
} from "@/functions/resourceFunctions";



// Route Params

const props = defineProps(["userId"]);
const {userId}: any = toRefs(props);

// Variables 
let resources = ref<Resource[]>();
let showDialogNew = ref<boolean>(false);
let showDialogUpdate = ref<boolean>(false);
let showDialogDelete = ref<boolean>(false);
let selectedResource = ref<Resource>();


// Functions

async function getUpdatedResources() {
    // get updated resources
    let resourcesResp = await getAllResources(userId.value);
    resourcesResp = resourcesResp.item;
    resources.value = resourcesResp;
    console.log("resources:", resources.value);
}

onMounted(async () => {

    await getUpdatedResources();
});


// function that called to delete a resource
async function deleteResourceBtn(resource: Resource) {

    // show confirmation dialog
    showDialogDelete.value = !showDialogDelete.value;
    selectedResource.value = resource;
    
    // delete the resource from the database
    // await deleteResource(resource._id);

    // // delete the resource from the resources array
    // resources.value! = resources.value!.filter((resourceEl) => resourceEl._id !== resource._id);

    // // get from the db the updated routine
    // await getUpdatedResources();
}

// function that called to edit a resource
async function editResourceBtn(resource: Resource) {

    selectedResource.value = resource;
    showDialogUpdate.value = !showDialogUpdate.value;
}

// function that called to add a new resource
async function addResourceBtn() {

    console.log("New");
    showDialogNew.value = !showDialogNew.value;
}

function handleClose() {
    showDialogNew.value = false;
    showDialogUpdate.value = false;
    showDialogDelete.value = false;
}

// call again the getResourceByActivityId function to get the new routine with the new step
async function handleNewResource() {
    await getUpdatedResources();
}

// call again the getResourceByActivityId function to get the new routine with the updated step
async function handleUpdateResource() {
    await getUpdatedResources();
}

async function handleDeleteResource() {
    await getUpdatedResources();
}

</script>