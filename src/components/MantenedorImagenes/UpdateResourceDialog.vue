<template>
  <v-dialog >
    <v-row class="justify-center">
      <v-col cols="12" xs="12" sm="12" md="5" lg="5">
        <v-form @submit.prevent ref="form">
          <v-card class="card">

            <!-- Form Title -->
            <v-card-title class="mt-2 text-center text-wrap">
              <span class="text-h6 text-wrap">Editar recurso: {{ actualResource.title }}</span>
            </v-card-title>

            <!-- Form Inputs -->
            <v-card-text>
              <v-container>

                <p>¿Está seguro de que desea actualizar este recurso?<br>
                Actualmente se está utilizando en {{ routinesReached }} rutina(s). <br><br>
                Si lo modifica acá, también se modificará en todas las rutinas que lo usan.</p><br>
              
                <v-row class="">
                  <v-col cols="12" sm="12">

                    <!-- Input new image -->
                    <v-file-input
                      outlined
                      :rules="newImageRules"
                      v-model="newImage"
                      accept="image/png, image/jpeg"
                      prepend-icon="mdi-camera"
                      label="Seleccione una nueva imagen"
                      required>
                    </v-file-input>

                    <!-- Input resource name -->
                    <v-text-field
                      v-model="resourceName"
                      :rules="resourceNameRules"
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
            <v-card-actions class="ma-5">
              <v-spacer></v-spacer>
              <v-btn
                color="primary"
                variant="outlined"
                @click="closeDialog">
                  Cerrar
              </v-btn>
              <v-btn color="primary" variant="flat" @click="submitForm" :loading="loading">
                Guardar
                  <template v-slot:loader>
                    <v-progress-circular indeterminate :size="20" :width="2"></v-progress-circular>
                  </template>
              </v-btn>  
            </v-card-actions>

          </v-card>
        </v-form>
      </v-col>
    </v-row>
  </v-dialog>
</template>

<script setup lang="ts">
// Imports

import { updateResource, uploadImage, validateDeleteResource } from "../../functions/resourceFunctions";
import { Resource } from "../../interfaces/Resource";
import { onMounted, ref, toRefs, watch } from "vue";

// define props
const props = defineProps(["user", "actualResource"]);
const { user, actualResource } = toRefs(props);

// emmit the close event to the parent component
const emit = defineEmits(["close", "updateResource"]);

// Form
const form = ref();

let routinesReached = ref(0);

let resourceName = ref("");
let loading = ref(false);
const resourceNameRules = [
  (value: string) => {
    if (value) return true;
    return "Es necesario ingresar un nombre para el recurso";
  }
]

let newImage = ref<File[]>([]);
const newImageRules = [
  (value: any) => (!!value) || "La imagen es requerida",
  (value: any) => (value && ((value.length > 0 ? value[0].size : 0) < 2000000000)) || "Imagen debe ser menor a 2 MB!",
]
  
// Functions

onMounted(async () => {

});

// watch changes in the resource prop
watch(() => actualResource!.value, () => {
    getValidation();
});

async function getValidation() {

    // validate if the resource can be deleted
    let response = (await validateDeleteResource(actualResource!.value._id, actualResource!.value.user)).item;
    routinesReached.value = response.routinesWithThisResource;
}

// watch changes in the routineStep prop
watch(() => actualResource!.value, () => {
  // fill the form with the data of the routine step
  fillForm();
});

function fillForm() {

  resourceName.value = actualResource!.value.title;
}
  
async function submitValidations(): Promise<boolean> {
  
  // validation of the form
  const {valid} = await form.value.validate();
  if (!valid) return false;

  // check if the form is valid with the validation given by the rules of each input
  if (!newImage.value || !resourceName.value) return false;

  return true;
}

async function updateWithNewImage() {

  // upload the image to the server passing the data in blob format
  let imageUrl = (await uploadImage(newImage.value[0])).item.url;

  // get the last part of the url, which is the filename
  imageUrl.split("/").pop();

  // update the resource
  let resourceData = {
    _id: actualResource!.value._id,
    title: resourceName.value,
    user: user!.value,
    url: imageUrl,
    filename: newImage.value[0].name,
  }

  console.log("resourceData:", resourceData);

  // update the resource in the db
  await updateResource(resourceData);
}

function clearNewImage() {
  newImage.value = [];
}

async function submitForm() {

  // validate the form
  if (!(await submitValidations())) return;
  loading.value = true;
  // create the step
  await updateWithNewImage();

  // send the new step to the parent component to update the list
  emitUpdateResource();

  // clear new image
  clearNewImage();

  // close the dialog
  closeDialog();

  loading.value = false;
}

function emitUpdateResource() {
  emit("updateResource");
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
