<template>
  <v-dialog width="auto">
    
    <v-form @submit.prevent ref="form">
      <v-card>

        <!-- Form Title -->
        <v-card-title class="mt-2">
          <span class="text-h5">Crear una nueva rutina</span>
        </v-card-title>

        <!-- Form Inputs -->
        <v-card-text>
          <v-container>
          
            <v-row class="">
              <v-col cols="12" sm="12">

                <!-- Input routine title -->
                <v-text-field
                  v-model="routineName"
                  :rules="routineNameRules"
                  :counter="30"
                  label="Nombre de la rutina"
                  placeholder="Ingrese un nombre para la rutina"
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

import { createRoutine } from "@/functions/routineFunctions";
import { ref, toRefs } from "vue";

// define props
const props = defineProps(["activityId", "userId"]);
const { activityId, userId } = toRefs(props);

// emmit the close event to the parent component
const emit = defineEmits(["close", "newRoutine"]);

// Form
const form = ref();

let routineName = ref("");
const routineNameRules = [
  (value: string) => {
    if (value) return true;
    return "Es necesario ingresar un nombre para el recurso";
  }
]

// Functions

async function submitValidations(): Promise<boolean> {

  // validation of the form
  const {valid} = await form.value.validate();
  console.log("valid:", valid);
  if (!valid) return false;

  return true;

}

async function createRoutineInDatabase() {

    console.log("activityId:", activityId!.value);
    console.log("userId:", userId!.value);
  
    // create the new routine
    let newRoutine = await createRoutine({
      title: routineName.value,
      activity: activityId!.value,
      user: userId!.value
    });

    console.log("newRoutine:", newRoutine);
  
    // return the new routine
    return newRoutine;
}

async function submitForm() {

  // validate the form
  if (!(await submitValidations())) return;

  // create the new routine in the database
  let newRoutine = await createRoutineInDatabase();

  // send the new routine event to the parent component
  emitNewRoutine();

  // close the dialog
  closeDialog();
}

function emitNewRoutine() {
  emit("newRoutine");
}

function closeDialog() {
  emit("close"); 
}

</script>

<style scoped>
/* Estilos del componente */
</style>
