<template>
<v-dialog width="auto">
    
    <v-form @submit.prevent ref="form">
    <v-card>

        <!-- Form Title -->
        <v-card-title class="mt-2">
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

            <p>Rutina: {{ routinesReached }}</p>

        </v-container>
        </v-card-text>

        <!-- Form Actions -->
        <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
            color="blue-darken-1"
            variant="text"
            @click="closeDialog">
            Cerrar
        </v-btn>
        <v-btn
            color="blue-darken-1"
            variant="text"
            @click="submitForm">
            Eliminar
        </v-btn>
        </v-card-actions>

    </v-card>
    </v-form>
</v-dialog>
</template>

<script setup lang="ts">
// Imports

import { createResource, deleteResource, getAllResources, uploadImage, validateDeleteResource } from "../../functions/resourceFunctions";
import { Resource } from "../../interfaces/Resource";
import { onMounted, ref, toRefs, watch } from "vue";

// define props
const props = defineProps(["resource"]);
const { resource } = toRefs(props);

// emmit the close event to the parent component
const emit = defineEmits(["close", "deleted"]);

// Form
const form = ref();

let isValidDelete = ref(false);
let routinesReached = ref(0);

// Functions

onMounted(async () => {

});

// watch changes in the resource prop
watch(() => resource!.value, () => {
    console.log("resource!.value", resource!.value);
    fillForm();
});

async function fillForm() {

    // validate if the resource can be deleted
    let response = (await validateDeleteResource(resource!.value._id, resource!.value.user)).item;
    isValidDelete.value = response.isValid;
    routinesReached.value = response.routinesWithThisResource;
    console.log("isValidDelete", isValidDelete.value, "\nroutinesReached", routinesReached.value);
}

async function submitForm() {
    // if not valid, return
    if (!isValidDelete.value) return;
    emitDeletedResource();
    closeDialog();
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
