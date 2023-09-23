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
    <v-app-bar :elevation="2" class="pl-4">
        <v-btn @click="back" icon="mdi-arrow-left"></v-btn>
        Mantenedor de imágenes
    </v-app-bar>
    
    <v-btn class="add-step-btn pl-4 pr-4" prepend-icon="$plus" 
        @click="addResourceBtn" color="green">
        Agregar Recurso 
    </v-btn>

    <!-- Dialogs -->
    <CreateResourceDialog v-model="showDialogNew" @close="handleClose" 
        @new-resource="handleNewResource" :resources="resources!" :user="userId"/>

    <UpdateResourceDialog v-model="showDialogUpdate" @close="handleClose" 
        @update-resource="handleUpdateResource" :routine="resources!" :user="userId" :actual-resource="selectedResource"/>

    <DeleteResourceDialog v-model="showDialogDelete" @close="handleClose" 
        @deleted="handleDeleteResource" :resource="selectedResource"/>

    <v-row class="mt-8 ml-4 mr-4 mb-16">

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
    getAllResources,
    uploadImage,
} from "@/functions/resourceFunctions";
import router from '@/router';


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

// get updated resource's list
async function getUpdatedResources() {
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
}

// function that called to edit a resource
async function editResourceBtn(resource: Resource) {

    // show update dialog
    selectedResource.value = resource;
    showDialogUpdate.value = !showDialogUpdate.value;
}

// function that called to add a new resource
async function addResourceBtn() {

    // show new dialog
    showDialogNew.value = !showDialogNew.value;
}

function handleClose() {
    // close any dialog that might be open
    showDialogNew.value = false;
    showDialogUpdate.value = false;
    showDialogDelete.value = false;
}

async function handleNewResource() {
    await getUpdatedResources();
}

async function handleUpdateResource() {
    await getUpdatedResources();
}

async function handleDeleteResource() {
    await getUpdatedResources();
}

// Routes

function back() {
    router.push({ name: 'MiCuenta', params: { } });
}

</script>