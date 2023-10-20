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
    <v-app-bar :elevation="2" class="pl-0 p-sm-0 p-md-4 p-lg-4 changeAppBar">
        <v-app-bar-nav-icon variant="text" class="d-lg-none" @click="showDrawer()"></v-app-bar-nav-icon>
        <v-btn @click="back" icon="mdi-arrow-left" color="primary" class="ml-md-9"></v-btn>
		<span  class="d-none d-md-flex"  style="width: 95px; padding-left: 0px; margin-left: -15px;">
            <v-img
                class="d-none d-md-flex pl-0"
                src="/img/Logo-Oficial.png"
                width="auto"     
            />
        </span>
        <v-text class="mb-md-1"> Mis imágenes</v-text>
        <v-spacer></v-spacer>
        <v-btn color="primary" variant="flat" @click="addResourceBtn" prepend-icon="mdi-plus" class="pl-7 mr-8 mr-md-0 px-sm-4  mr-md-4 mr-lg-4" > <v-text class="d-none d-sm-flex">Agregar Imágen</v-text> </v-btn>
    </v-app-bar>
    

    <!-- Dialogs -->
    <CreateResourceDialog v-model="showDialogNew" @close="handleClose" 
        @new-resource="handleNewResource" :resources="resources!" :user="userId"/>

    <UpdateResourceDialog v-model="showDialogUpdate" @close="handleClose" 
        @update-resource="handleUpdateResource" :routine="resources!" :user="userId" :actual-resource="selectedResource"/>

    <DeleteResourceDialog v-model="showDialogDelete" @close="handleClose" 
        @deleted="handleDeleteResource" :resource="selectedResource"/>

    <v-row class="mt-5 mx-2 mx-md-5 mb-16">
        <v-col v-for="(resource, index) in resources" :key="index" cols="12" sm="6" md="4" lg="3">
            <v-card class="mx-auto" max-width="100%" height="400">
                <v-img class="border" :height="270" width="500" cover :src="resource.url"></v-img>
                <v-card-subtitle class=" my-6  text-wrap" style="font-size: 16px;"> {{ resource.title }}</v-card-subtitle>
                <v-divider></v-divider>
                <v-card-actions class="justify-center">
                    <v-btn prepend-icon="$edit" variant="flat" class="pl-4 pr-4 mx-1" size="small"
                        @click="editResourceBtn(resource)" color="primary"> 
                        Editar 
                    </v-btn>
                    <v-btn prepend-icon="$delete" variant="outlined" class="pl-4 pr-4 mx-1" size="small"
                        @click="deleteResourceBtn(resource)" color="primary"> 
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
import {useUserStore} from '@/store/app'
import {
    getAllResources,
    uploadImage,
} from "@/functions/resourceFunctions";
import router from '@/router';


// Route Params

const props = defineProps(["userId"]);
const {userId}: any = toRefs(props);
const store = useUserStore()

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
const showDrawer = () =>{
    store.$patch({
            navbarMobile: {active:true}
    })
}
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