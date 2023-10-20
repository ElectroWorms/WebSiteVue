<style lang="scss">
.form-content {
    padding: 10px;
    table {        
        width: 100% !important;
        th {
            border: 1px solid #eeeeee;
            background-color: rgb(61,174,255);
            color: white;
            padding: 5px;
            //border-radius: 5px 5px 0 0;
        }
        tr {
            td {
                border: 1px solid #eeeeee;
                padding: 5px;
            }
        }
    }
    .text-message {
        color: #888888;
        font-size: 15px;
    }
    .form-title {
        margin-bottom: 20px;
    }
    .file-input {
        max-width: 300px;
    }
}
.hide {
    display: none;
}
</style>
<template>
    <v-card :title="title" subtitle="A continuación, podrás configurar los tiempos y sonidos para reproducir la rutina como un video" style="margin: 40px">
        <v-form validate-on="submit lazy" style="margin: 20px;">
            <div class="form-content">
                <div class="form-title">Agregar música de fondo (opcional)</div>
                <v-checkbox v-model="hasMusic" label="¿Quieres agregar música de fondo al video?" :disabled="disabled"></v-checkbox>
                <v-select v-model="select" :items="items" label="Música de fondo" v-if="hasMusic" style="max-width: 300px;"></v-select>
                <audio controls id="audio" class="hide">
                    <source :src="theme" type="audio/mpeg">
                </audio>
                <div class="form-title">Configurar pasos de la rutina</div>            
                <table>
                    <thead>
                        <tr>
                            <th>Posición</th>
                            <th>Pictograma</th>
                            <th>Paso</th>
                            <th>Duración [s]</th>
                            <th>Usar voz</th>
                        </tr>
                    </thead>
                    <tbody id="tbody">
                        <tr v-for="(routineStep, index) in routine?.steps" :key="index">
                            <td style="text-align: center;">{{ index + 1 }}</td>
                            <td style="text-align: center; width: 150px;">
                                <img :src="routineStep.recursoItem.url" style="max-height: 80px; max-width: 80px;"/>
                            </td>
                            <td style="padding: 15px;">{{routineStep.recursoItem.title}}</td>
                            <td >
                                <v-text-field v-model="routineStep.duration" :disabled="disabled" type="number" label="Duración en segundos" required style="margin: 0;" :rules="[v => v ? '' : 'Campo requerido (*)']"></v-text-field>                        
                            </td>
                            <td>
                                <div style="display: flex;align-items: center;justify-content: center;flex-direction: column;">
                                    <v-checkbox v-model="routineStep.hasAudio" label="¿Incluir dialogo?" :disabled="disabled"></v-checkbox>
                                    <audio controls id="audio" v-if="routineStep.audioUrl && routineStep.hasAudio">
                                        <source :src="routineStep.audioUrl" type="audio/mpeg">
                                    </audio>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <p class="text-message form-title">Los cambios realizados se verán reflejados es la aplicación móvil de RAPNI.</p>
            </div>
            <v-card-actions style="flex-direction: row-reverse; gap: 10px">
                <v-btn color="primary" type="submit" variant="flat" @click="save()" :disabled="disabled">Guardar Cambios</v-btn>
                <v-btn color="red" variant="flat" @click="cancel()" :disabled="disabled">Cancelar</v-btn>
            </v-card-actions>            
        </v-form>
    </v-card>
    <v-snackbar v-model="snackbar" :timeout="timeout" :color="snackbarColor">
        {{ snackbarText }}        
    </v-snackbar>
</template>
<script setup lang="ts">
import { ref, toRefs, onMounted, watch } from 'vue';
import { getRoutineByActivityId } from '../../functions/routineFunctions';
import { updateRoutineStep } from '@/functions/routineStepFunctions';
import { updateVideoConfig, convertDescriptionToAudio } from './common/functions';
const props = defineProps(["routineId", "activityId"]);
const { routineId, activityId, userId }: any = toRefs(props);

const title = ref<string>('Configuración del Video');
const routine: any = ref<any>({});
let routineClone: any = {};
let theme = ref('');
const themes = {
    theme_1: 'https://rapnistorage.blob.core.windows.net/rapnistorage/theme_1.mp3',
    theme_2: 'https://rapnistorage.blob.core.windows.net/rapnistorage/theme_2.ogg',
    theme_3: 'https://rapnistorage.blob.core.windows.net/rapnistorage/theme_3.mp3',
    theme_4: 'https://rapnistorage.blob.core.windows.net/rapnistorage/theme_4.mp3',
    theme_5: 'https://rapnistorage.blob.core.windows.net/rapnistorage/theme_5.mp3',
    theme_6: 'https://rapnistorage.blob.core.windows.net/rapnistorage/theme_6.mp3',
    theme_7: 'https://rapnistorage.blob.core.windows.net/rapnistorage/theme_7.mp3',
    theme_8: 'https://rapnistorage.blob.core.windows.net/rapnistorage/theme_8.mp3',
}
const snackbar = ref(false);
const snackbarText = ref('ok');
const snackbarColor = ref('success');
const timeout = ref(1000);
let audio:HTMLElement|any = null;
const hasMusic = ref(false);
const disabled = ref(false);
const items = ref<string[]>([
    'Tema 1', 'Tema 2', 'Tema 3', 'Tema 4',
    'Tema 5', 'Tema 6', 'Tema 7', 'Tema 8'
]);
const select = ref(null);
async function save() {
    let isValid = validate();
    if (isValid) {
        console.log('Formulario válido, realizar acción de guardar.');
        let metadata = getMetadata();
        let response = await send(metadata);
        if (response){
            snackbarText.value = 'Configuración del video guardada con éxito.'
            snackbarColor.value = 'success';
            snackbar.value = true;
        }
        else {
            snackbarText.value = 'Ha ocurrido un error al guardar la configuración.'
            snackbarColor.value = 'error';
            snackbar.value = true;
        }
    } else {
        snackbarText.value = 'Ingrese la duración para cada uno de los pasos.'
        snackbarColor.value = 'warning';
        snackbar.value = true;
        console.log('Formulario no válido, no se puede guardar');
    }
}
function validate():boolean{
    let status = true;
    for (let i = 0; i < (routine.value.steps || []).length; i++) {
        if (!routine.value.steps[i].duration) status = false;
        else if (routine.value.steps[i].duration <= 0) status = false; 
    }
    if (hasMusic.value) {
        if (!select.value) status = false;
    }
    return status;
}
function getMetadata() {
    return {
        steps: routine.value.steps || [],
        hasMusic: hasMusic.value,
        theme: hasMusic.value ? select.value : null
    }
}

async function send(metadata:any):Promise<boolean> {
    disabled.value = true;
    let status = true;
    try {
        let requests = [];
        for (let i = 0; i < metadata.steps.length; i++) {
            let step = metadata.steps[i];       
            if (step.hasAudio) {
                if (!step.audioUrl) {
                    step.audioUrl = await convertDescriptionToAudio(step.recursoItem.title || '');
                }
                //else step.audioUrl = null;
            }
            requests.push(updateRoutineStep(step._id,routineId.value,step.posicion,step.recurso,step.duration,step.hasAudio,step.audioUrl));
            let audios = document.querySelectorAll('audio');
            audios.forEach(a => {
                a.load();
            });
        }
        let responses = await Promise.all(requests);
        console.log('responses',responses)
        await updateVideoConfig(routineId.value,metadata.hasMusic,metadata.theme);

    } catch (error) {
        console.log('ERROR_send()',error);
        status = false;
    }
    disabled.value = false;
    return status;
}

function cancel() {
    const clone = JSON.parse(JSON.stringify(routineClone));
    routine.value = clone;
}

async function getRoutine() {
  const routineResp = await getRoutineByActivityId(activityId.value);
  routine.value = JSON.parse(JSON.stringify(routineResp.item[0]));
  routineClone = JSON.parse(JSON.stringify(routineResp.item[0]));
}

onMounted(async () => {
  await getRoutine();
  title.value = 'Rutina: ' + routine.value.title;
  routine.value.hasMusic = routine.value.hasMusic || false;
  hasMusic.value = routine.value.hasMusic || false;
  select.value = routine.value.theme ? (routine.value.theme != '' ? routine.value.theme : null) : null;
  console.log(routine.value);
  audio = document.getElementById('audio');
});
watch(select,function (newSelected) {
    if (newSelected) audio.classList.remove('hide');
    else audio.classList.add('hide');
    select.value = newSelected;
    audio = document.getElementById('audio');
    if (newSelected == items.value[0]) theme.value = themes['theme_1'];
    else if (newSelected == items.value[1]) theme.value = themes['theme_2'];
    else if (newSelected == items.value[2]) theme.value = themes['theme_3'];
    else if (newSelected == items.value[3]) theme.value = themes['theme_4']; 
    else if (newSelected == items.value[4]) theme.value = themes['theme_5'];
    else if (newSelected == items.value[5]) theme.value = themes['theme_6'];
    else if (newSelected == items.value[6]) theme.value = themes['theme_7']; 
    else if (newSelected == items.value[7]) theme.value = themes['theme_8']; 
    audio.load();
});
watch(hasMusic,function(value){
    if (value) {
        if (select.value) {
            audio.classList.remove('hide');
        }
        else audio.classList.add('hide');
    }
    else audio.classList.add('hide');
});
</script>