<template>
  <v-dialog width="40%">
    
    <v-form @submit.prevent ref="form">
      <v-card class="card">

        <!-- Form Title -->
        <v-card-title class="mt-2">
          <span class="text-h5">Agregar recurso</span>
        </v-card-title>

        <!-- Form Inputs -->
        <v-card-text>
          <v-container>
          
            <v-row class="">
              <v-col cols="12" sm="12">

                <!-- Input new image -->
                <v-file-input
                  outlined
                  :rules="newImageRules"
                  v-model="newImage"
                  accept="image/png, image/jpeg"
                  prepend-icon="mdi-camera"
                  label="Seleccione una imagen">
                </v-file-input>

                <!-- Input resource name -->
                <v-text-field
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

import { createResource, uploadImage } from "../../functions/resourceFunctions";
import { Resource } from "../../interfaces/Resource";
import { onMounted, ref, toRefs } from "vue";

// define props
const props = defineProps(["user"]);
const { user } = toRefs(props);

// emmit the close event to the parent component
const emit = defineEmits(["close", "newResource"]);

// Form
const form = ref();

let resources: Resource[] = [];
  
let resourceName = ref("");
const resourceNameRules = [
  (value: string) => {
    if (value) return true;
    return "Es necesario ingresar un nombre para el recurso";
  }
]
  
let newImage = ref<File[]>([]);
const newImageRules = [
  (value: any) => (!!value) || "La imagen es requerida",
  (value: any) => (value && value[0].size < 2000000000) || "Imagen debe ser menor a 2 MB!",
]
  
// Functions

onMounted(async () => {

});
  
async function submitValidations(): Promise<boolean> {
  
  // validation of the form
  const {valid} = await form.value.validate();
  console.log("valid:", valid);

  if (!valid) return false;

  // check if the form is valid with the validation given by the rules of each input
  if (!newImage.value || !resourceName.value) return false;

  return true;
}

async function createWithNewImage() {

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

  // create the resource in the db
  await createResource(resourceData);
}

function clearInputs() {
    resourceName.value = "";
    newImage.value = [];
}

async function submitForm() {

  // validate the form
  if (!(await submitValidations())) return;

  // create the step
  await createWithNewImage();

  // send the new step to the parent component to update the list
  emitNewResource();

  // clear the inputs
  clearInputs();

  // close the dialog
  closeDialog();
}

function emitNewResource() {
  emit("newResource");
}

function closeDialog() {
  emit("close"); 
}

</script>

<style scoped>
  /* Estilos del componente */
  .card {
    width: 100%;
  }
</style>
