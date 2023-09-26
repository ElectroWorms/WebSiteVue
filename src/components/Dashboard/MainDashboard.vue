<template>
  <v-container class="bg-white ma-8 px-10 rounded-lg" >
      <v-card-title class="px-0">
                <span class="text-h6">Información General</span>
      </v-card-title>

      <v-row class="pt-2">

        <v-col cols="4">
          <v-card color="rgba(54, 162, 235, 0.5)" theme="dark" class="py-6 rounded-lg" style="height: 180px;">
            <v-row align="center" >
              <v-col cols = "8" class="text-center px-2 pt-0">
                <v-card-title class="text-h5 text-wrap ">Tiempo total de juego(s)</v-card-title>
                <v-card-title class="text-h2 text-wrap mt-2">
                  <v-progress-circular indeterminate :size="40" :width="2" class="px-10" v-if="!loaded"></v-progress-circular>
                  {{ totalTime }}
                </v-card-title>
              </v-col>
              <v-col cols = "4" class="pl-0">
                <v-icon icon="mdi-clock-outline" size="x-large" style="color: white; font-size: 80px;"></v-icon>
              </v-col>
            </v-row>
          </v-card>
        </v-col>

        <v-col cols="4">
          <v-card color="rgba(75, 192, 192, 0.5)" theme="dark" class="py-7 rounded-lg" style="height: 180px;">
            <v-row align="center">
              <v-col cols = "8" class="text-center px-2 pt-0">
                <v-card-title class="text-h5 text-wrap ">Intentos búsqueda del tesoro</v-card-title>
                <v-card-title class="text-h2 text-wrap mt-2">
                  <v-progress-circular indeterminate :size="40" :width="2" class="px-10" v-if="!loaded"></v-progress-circular>
                  {{ partidasJugadasGame1 }}
                </v-card-title>
              </v-col>
              <v-col cols = "4" class="pl-0">
                <v-icon icon="mdi-treasure-chest" size="x-large" style="color: white; font-size: 80px;"></v-icon>
              </v-col>
            </v-row>
          </v-card>
        </v-col>

        
        <v-col cols="4">
          <v-card color="rgba(255, 205, 86, 0.5)" theme="dark" class="py-7 rounded-lg" style="height: 180px;">
            <v-row align="center">
              <v-col cols = "8" class="text-center px-2 pt-0">
                <v-card-title class="text-h5 text-wrap ">Intentos vestir al personaje</v-card-title>
                <v-card-title class="text-h2 text-wrap mt-2">
                  <v-progress-circular indeterminate :size="40" :width="2" class="px-10" v-if="!loaded"></v-progress-circular>
                  {{ partidasJugadasGame2 }}
                </v-card-title>
              </v-col>
              <v-col cols = "4" class="pl-0">
                <v-icon icon="mdi-tshirt-crew-outline" size="x-large" style="color: white; font-size: 80px;"></v-icon>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
        
      </v-row>
  </v-container>

  <v-container class="bg-white ma-8 px-10 rounded-lg" >
    <v-form>
      <v-card-title class="px-0">
                <span class="text-h6">Filtros Gráficos</span>
      </v-card-title>
      <v-row class="pt-2">
        <v-col cols="5">
          <v-autocomplete label="Gráfico" v-model="inputSelectGrafico" :items="itemsGrafico"
          ></v-autocomplete>
        </v-col>
        <v-col cols="5" v-if="activeAutocompleteJuego">
          <v-autocomplete label="Juego" v-model="inputSelectJuego" :items="itemsJuegos"
          ></v-autocomplete>
        </v-col>
      </v-row>
    </v-form>
  </v-container>

  <v-container class="bg-white ma-8 py-7 rounded-lg d-flex justify-center"  style="height: 500px;">
    <Dashboard1 v-if="boolGrafico1"></Dashboard1>
    <Dashboard2 v-if="boolGrafico2" :juego="juego"></Dashboard2>
    <Dashboard3 v-if="boolGrafico3" :juego="juego"></Dashboard3>
    <Dashboard4 v-if="boolGrafico4"></Dashboard4>
    <Dashboard5 v-if="boolGrafico5" :juego="juego"></Dashboard5>
  </v-container>

</template>
<script>
  import axios from 'axios'
  import config from '../../../config.json'
  import {getTime, getTotalGames} from './functions'
  import Dashboard1 from './Dashboard1.vue'; import Dashboard2 from './Dashboard2.vue'; import Dashboard3 from './Dashboard3.vue'; import Dashboard4 from './Dashboard4.vue'; import Dashboard5 from './Dashboard5.vue';

  export default {
    components: {
      Dashboard1,
      Dashboard2,
      Dashboard3,
      Dashboard4,
      Dashboard5
    },
    data: () => ({
      activeAutocompleteJuego: false,
      inputSelectGrafico: 'Cantidad de intentos en cada juego',
      inputSelectJuego: null,
      boolGrafio1: false,
      juego: null,
      boolGrafico1: true, boolGrafico2: false, boolGrafico3: false, boolGrafico4: false, boolGrafico5:false,
      loaded: false,
      totalTime: '', partidasJugadasGame1: '', partidasJugadasGame2:'',
      itemsGrafico:
                [
                  'Cantidad de intentos por juego',
                  'Tasa promedio de errores por día', 
                  'Tasa promedio de aciertos por día', 
                  'Tiempo promedio en completar el juego', 
                  'Tiempo total de juego por día'
                ],
      itemsJuegos: ['Búsqueda del tesoro', 'Vestir al personaje']
      
    }),
    computed: {
      
    },
    methods: {
      
    },
    async mounted (){
      let auxtotalTime, auxPartidas1, auxPartidas2;
      auxtotalTime = await getTime(); auxPartidas1= await getTotalGames('busquedatesoro'); auxPartidas2= await getTotalGames('vestirpersonaje')
      this.loaded = true;
      this.totalTime = auxtotalTime; this.partidasJugadasGame1 = auxPartidas1;  this.partidasJugadasGame2 = auxPartidas2; 
    },
    watch: {
      inputSelectGrafico: function(val, oldVal) {
        if (val == this.itemsGrafico[0]){
          this.boolGrafico1 = true; this.boolGrafico2 = false; this.boolGrafico3 = false; this.boolGrafico4 = false; this.boolGrafico5 = false; this.activeAutocompleteJuego = false;
        }
        else if (val == this.itemsGrafico[3]){
          this.boolGrafico4 = true; this.boolGrafico1 = false; this.boolGrafico2 = false; this.boolGrafico3 = false; this.boolGrafico5 = false; this.activeAutocompleteJuego = false;
        }
        else if ((val == this.itemsGrafico[1] || val == this.itemsGrafico[2] || val == this.itemsGrafico[4])){
          this.inputSelectJuego = null; this.activeAutocompleteJuego = true;
        }
        
      },
      inputSelectJuego: async function(val, oldVal) {
        if (val == this.itemsJuegos[0] || val == this.itemsJuegos[1]){
          this.juego = this.inputSelectJuego;
          if (this.inputSelectGrafico == this.itemsGrafico[1]){
            this.boolGrafico2 = false; this.boolGrafico1 = false; this.boolGrafico3 = false; this.boolGrafico4 = false; this.boolGrafico5 = false;
            await this.$nextTick();
            this.boolGrafico2 = true;
          }
          else if (this.inputSelectGrafico == this.itemsGrafico[2]){
            this.boolGrafico3 = false; this.boolGrafico2 = false; this.boolGrafico1 = false; this.boolGrafico4 = false; this.boolGrafico5 = false;
            await this.$nextTick();
            this.boolGrafico3 = true;
          }
          else if (this.inputSelectGrafico == this.itemsGrafico[4]){
            this.boolGrafico5 = false; this.boolGrafico1 = false; this.boolGrafico2 = false; this.boolGrafico3 = false; this.boolGrafico4 = false;
            await this.$nextTick();
            this.boolGrafico5 = true;
          }
        }
      }
    }
}
</script>