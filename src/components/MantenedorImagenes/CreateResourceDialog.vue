<template>
    <v-dialog width="auto">
      
      <v-form @submit.prevent ref="form">
        <v-card>
  
          <!-- Form Title -->
          <v-card-title class="mt-2">
            <span class="text-h5">Agregar paso a: {{ routine.title }}</span>
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
                  
                  <!-- Select resource -->
                  <v-autocomplete class="mt-4"
                    outlined
                    v-if="!newResource"
                    v-model="selectedResource"
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
                Guardar
            </v-btn>
          </v-card-actions>
  
        </v-card>
      </v-form>
    </v-dialog>
  </template>
  
  <script setup lang="ts">
  // Imports
  
  import { createResource, getAllResources, uploadImage } from "../../functions/resourceFunctions";
  import { createRoutineStep, updateRoutineStep } from "../../functions/routineStepFunctions";
  import { Resource } from "../../interfaces/Resource";
  import { onMounted, ref, toRefs } from "vue";
  
  // define props
  const props = defineProps(["routine", "user"]);
  const { routine, user } = toRefs(props);
  
  // emmit the close event to the parent component
  const emit = defineEmits(["close", "newStep"]);
  
  // Form
  const form = ref();
  
  let resources: Resource[] = [];
  
  let position = ref(0);
  const positionRules = [
    (value: number) => {
      console.log("value:", value);
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
  
  async function submitValidations(): Promise<boolean> {
  
    // validation of the form
    const {valid} = await form.value.validate();
    console.log("valid:", valid);
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
  
  async function createWithNewResource() {
  
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
    await createRoutineStep(routine!.value, position.value, resource._id);
  }
  
  async function createWithExistingResource() {
  
    // create the step
    await createRoutineStep(routine!.value, position.value, selectedResource!.value!._id!);
  }
  
  async function createStep() {
  
    // if new resource
    if (newResource.value) {
      await createWithNewResource();
    }
    // if existing resource
    else {
      await createWithExistingResource();
    }
  }
  
  async function updatePositions() {
  
    // update the position of the next steps in the database
    for (let i = position.value-1; i < routine!.value.steps.length; i++) {
  
      let updatedStep = routine!.value.steps[i];
      if (updatedStep)
        await updateRoutineStep(updatedStep._id, routine!.value._id, i + 2, updatedStep.resource);
    }
  }
  
  async function submitForm() {
  
    // validate the form
    if (!(await submitValidations())) return;
  
    // update the position of the next steps in the database
    await updatePositions();
  
    // create the step
    await createStep();
  
    // send the new step to the parent component to update the list
    emitNewStep();
  
    // close the dialog
    closeDialog();
  }
  
  function emitNewStep() {
    emit("newStep");
  }
  
  function closeDialog() {
    emit("close"); 
  }
  
  </script>
  
  <style scoped>
  /* Estilos del componente */
  </style>
  