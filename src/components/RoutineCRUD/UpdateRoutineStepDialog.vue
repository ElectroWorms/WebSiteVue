<template>
  <v-dialog width="auto">
    
    <v-form @submit.prevent ref="form">
      <v-card>

        <!-- Form Title -->
        <v-card-title class="mt-2 text-center">
          <span class="text-h5 text-wrap ma-5">Actualizar el paso en la posición {{ routineStep.posicion }}</span>
        </v-card-title>

        <!-- Form Inputs -->
        <v-card-text>
          <v-container>
          
            <v-row class="">
              <v-col cols="12" sm="12">

                <!-- Input position -->
                <v-text-field
                  outlined
                  v-model="position"
                  :rules="positionRules"
                  label="Position">
                </v-text-field>
                
                <!-- Switch new resource -->
                <v-switch
                  outlined
                  v-model="newResource"
                  :label="newResource ? 'Crear un nuevo recurso' : 'Utilizar un recurso existente'"
                  color="indigo"
                  value="Ingresar nuevo recurso"
                  hide-details>
                </v-switch>
                
                <!-- Autocomplete resource -->
                <v-autocomplete class="mt-4"
                  outlined
                  v-if="!newResource"
                  v-model="selectedResource"
                  auto-select-first
                  :items="resources"
                  :rules="resourceRules"
                  return-object
                  label="Recurso">
                </v-autocomplete>

                <!-- Input new image -->
                <v-file-input
                  outlined
                  v-if="newResource"
                  :rules="newImageRules"
                  v-model="newImage"
                  accept="image/png, image/jpeg"
                  prepend-icon="mdi-camera"
                  label="Seleccione una imagen">
                </v-file-input>

                <!-- Input resource name -->
                <v-text-field
                  v-if="newResource"
                  v-model="resourceName"
                  :rules="resourceNameRules"
                  :counter="10"
                  label="Nombre del recurso"
                  placeholder="Ingrese un nombre para el recurso"
                  required>
                </v-text-field>

              </v-col>
            </v-row>

            <v-row class="">
              <v-col cols="12" sm="12">
                
              </v-col>
            </v-row>

          </v-container>
        </v-card-text>

        <!-- Form Actions -->
        <v-card-actions class="ma-4">
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            variant="text"
            @click="closeDialog">
              Cerrar
          </v-btn>
          <v-btn
            color="primary"
            variant="flat"
            @click="submitForm">
              Guardar
          </v-btn>
        </v-card-actions>

      </v-card>
    </v-form>
  </v-dialog>
</template>

<script setup lang="ts">
// Imports

import { createResource, getAllResources, uploadImage } from "@/functions/resourceFunctions";
import { updateRoutineStep } from "@/functions/routineStepFunctions";
import { Resource } from "@/interfaces/Resource";
import { onMounted, ref, toRefs, watch } from "vue";

// define props
const props = defineProps(["routine", "user", "routineStep"]);
const { routine, user, routineStep } = toRefs(props);

// emmit the close event to the parent component
const emit = defineEmits(["close", "updateStep"]);

// Form
const form = ref();

let resources: Resource[] = [];

let position = ref(0);
const positionRules = [
  (value: number) => {
    if (value && value > 0) return true;
    return "La posición dentro de la rutina es requerida, y debe ser mayor a 0";
  }
]

let newResource = ref(false);

let selectedResource = ref<Resource>();
const resourceRules = [
  (value: Resource) => {
    if (!value && !newResource) return "Es necesario seleccionar un recurso";
    return true;
  }
]

let resourceName = ref("");
const resourceNameRules = [
  (value: string) => {
    if (value && newResource) return true;
    return "Es necesario ingresar un nombre para el recurso";
  }
]

let newImage = ref<File[]>([]);
const newImageRules = [
  (value: any) => (!!value && newResource) || "La imagen es requerida",
  (value: any) => (value && value[0].size < 2000000000) || "Imagen debe ser menor a 2 MB!",
]

// Functions

onMounted(async () => {
  // get all the resources of this user
  resources = (await getAllResources(user!.value)).item;
});

// watch changes in the routineStep prop
watch(() => routineStep!.value, () => {
  // fill the form with the data of the routine step
  fillForm();
});

function fillForm() {

  // if the routine step is not new
  position.value = routineStep!.value.posicion;
  let resource = resources.filter((resource) => resource._id === routineStep!.value.recurso)[0];
  selectedResource.value = resource;
}

async function submitValidations(): Promise<boolean> {

  // validation of the form
  const {valid} = await form.value.validate();
  if (!valid) return false;

  // check if the form is valid with the validation given by the rules of each input
  if (newResource.value) {
    if (!position.value || !newImage.value || !resourceName.value) return false;
  }
  else {
    if (!position.value || !selectedResource.value) return false;
  }

  // if the position is greater than the number of steps, set the position to the last position
  if (position.value > routine!.value.steps.length) position.value = routine!.value.steps.length + 1;
  // if the position is less than 1, set the position to 1
  if (position.value < 1) position.value = 1;

  return true;
  
}

async function updateWithNewResource() {

  // upload the image to the server passing the data in blob format
  let imageUrl = (await uploadImage(newImage.value[0])).item.url;

  // get the last part of the url, which is the filename
  let filename = imageUrl.split("/").pop();

  // create the resource
  let resourceData = {
    title: resourceName.value,
    user: user!.value,
    url: imageUrl,
    filename: newImage.value[0].name,
  }

  // create the resource and the step
  let resource: Resource = (await createResource(resourceData)).item[0];
  await updateRoutineStep(routineStep!.value._id, routine!.value._id, position.value, resource._id);
}

async function updateWithExistingResource() {

  // update the step
  await updateRoutineStep(routineStep!.value._id, routine!.value._id, position.value, selectedResource!.value!._id);
}

async function updateStep() {

  // if new resource
  if (newResource.value) {
    await updateWithNewResource();
  }
  // if existing resource
  else {
    await updateWithExistingResource();
  }
}

async function updatePositions() {

  // set the new position of the step
  await updateRoutineStep(routineStep!.value._id, routine!.value._id, position.value, routineStep!.value.resource);
  let oldPosition = routineStep!.value.posicion;
  let newPosition = position.value;

  // if the new position is greater than the old one
  if (newPosition > oldPosition) {
    // update the position of the next steps in the database
    for (let i = oldPosition; i < newPosition; i++) {

      let updatedStep = routine!.value.steps[i];
      if (updatedStep)
        await updateRoutineStep(updatedStep._id, routine!.value._id, i, updatedStep.resource);
    }
  }

  // if the new position is less than the old one
  else if (position.value < routineStep!.value.posicion) {
    // update the position of the next steps in the database
    for (let i = newPosition-1; i < oldPosition-1; i++) {

      let updatedStep = routine!.value.steps[i];
      if (updatedStep)
        await updateRoutineStep(updatedStep._id, routine!.value._id, i+2, updatedStep.resource);
    }
  }

  // if the position is the same, return
  else {
    return;
  }
}

async function submitForm() {

  // validate the form
  if (!(await submitValidations())) return;

  // update the position of the next steps in the database
  await updatePositions();

  // update the step
  await updateStep();

  // close the dialog
  closeDialog();

  // send the new step to the parent component to update the list
  emitUpdateStep();
}

function emitUpdateStep() {
  emit("updateStep");
}

function closeDialog() {
  emit("close"); 
}

</script>

<style scoped>
/* Estilos del componente */
</style>
