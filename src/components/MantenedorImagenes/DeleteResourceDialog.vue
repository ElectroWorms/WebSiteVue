<template>
<v-dialog width="auto">
    
    <v-form @submit.prevent ref="form">
    <v-card>

        <!-- Form Title -->
        <v-card-title class="mt-2 text-center">
        <span class="text-h5">Eliminar recurso</span>
        </v-card-title>

        <!-- Form Inputs -->
        <v-card-text>
        <v-container>
        
            <p>¿Está seguro de que desea eliminar este recurso?<br>
            Actualmente se está utilizando en {{ routinesReached }} rutina(s):</p><br>

            <p v-if="!isValidDelete">El botón de "Eliminar" se encuentra deshabilitado para este recurso, <br>
                debido a que el recurso se encuentra presente en la(s) siguiente(s) rutina(s) <br>
                que tienen menos de 6 pasos. <br><br>
            </p>

            <p v-for="name in routineNames">- {{ name }}</p>

        </v-container>
        </v-card-text>

        <!-- Form Actions -->
        <v-card-actions class="ma-5">
        <v-spacer></v-spacer>
        <v-btn
            color="primary"
            variant="outlined"
            @click="closeDialog">
            Cerrar
        </v-btn>
        <v-btn color="primary" variant="flat" @click="submitForm" :loading="loading">
            Eliminar
            <template v-slot:loader>
            <v-progress-circular indeterminate :size="20" :width="2"></v-progress-circular>
            </template>
        </v-btn>  

       
        </v-card-actions>

    </v-card>
    </v-form>
</v-dialog>
</template>

<script setup lang="ts">
// Imports

import { deleteResource, validateDeleteResource } from "../../functions/resourceFunctions";
import { onMounted, ref, toRefs, watch } from "vue";

// define props
const props = defineProps(["resource"]);
const { resource } = toRefs(props);

// emmit the close event to the parent component
const emit = defineEmits(["close", "deleted"]);

// Form
const form = ref();
let loading = ref (false);

let isValidDelete = ref(false);
let routinesReached = ref(0);
let routineNames = ref<string[]>([]);

// Functions

onMounted(async () => {

});

// watch changes in the resource prop
watch(() => resource!.value, () => {
    console.log("resource!.value", resource!.value);
    getValidation();
});

async function getValidation() {

    // validate if the resource can be deleted
    let response = (await validateDeleteResource(resource!.value._id, resource!.value.user)).item;
    isValidDelete.value = response.isValid;
    routinesReached.value = response.routinesWithThisResource;
    routineNames.value = response.routineNames;
}

async function submitForm() {

    // if not valid, do not delete
    if (!isValidDelete.value) return;
    loading.value = true
    // delete the resource
    await deleteResource(resource!.value._id);

    routineNames.value = [];
    isValidDelete.value = false;
    routinesReached.value = 0;

    emitDeletedResource();
    closeDialog();
    loading.value = false
}

function emitDeletedResource() {
    emit("deleted");
}

function closeDialog() {
    emit("close");
}

</script>

<style scoped>
/* Estilos del componente */
</style>
