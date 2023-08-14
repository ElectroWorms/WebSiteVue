<template>
  <v-dialog width="auto">
    <v-card>
      <v-card-text>
              <p>ID de la rutina: {{ routine._id }}</p>
                Texto del componente
            </v-card-text>
            <v-card-actions>
                <v-btn @click="closeDialog">Cancelar</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script setup lang="ts">
// Imports

import { ref, onMounted, defineProps, toRefs, defineEmits } from "vue";

// define props
const props = defineProps(["routine"]); 
const { routine }: Routine = toRefs(props);

// emmit the close event to the parent component
const emit = defineEmits(["close"]);

// Functions

onMounted(() => {
  console.log("routine desde el componente hijo:", routine.value);
});

function closeDialog() {
  emit("close"); 
}

</script>

<style scoped>
/* Estilos del componente */
</style>
