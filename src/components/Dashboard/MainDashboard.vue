<style >

</style>
<template>
  <v-container class="px-0 pt-0" >
    <v-row class="justify-center">
      <v-col cols="12" sm="12" md="12" lg="12">
        <v-card class="bg-white mx-7 mt-5 pa-2 pa-sm-2 pa-md-8 pa-lg-8 rounded-lg ">
          <v-card-title class="px-0 pt-0">
                    <span class="text-h6">Información General</span>
          </v-card-title>
          <v-row class="pt-2">
            <v-col v-for="(game,index) in games" :key="index" cols="12" sm="12" md="6" lg="4">
              <v-card :color="game.color" theme="dark" class="py-6 rounded-lg" height="200px">
                <v-row align="center" >
                  <v-col cols = "8" class="text-center ">
                    <v-card-title class="text-h5 text-wrap "> {{game.title}} </v-card-title>
                    <v-card-title class="text-h2 text-wrap">
                      <v-progress-circular indeterminate :size="40" :width="2" class="px-10" v-if="!loaded"></v-progress-circular>
                      {{ game.numero }}
                    </v-card-title>
                  </v-col>
                  <v-col cols = "4" class="pl-0">
                    <v-icon :icon="game.icon" size="x-large" style="color: white; font-size: 80px;"></v-icon>
                  </v-col>
                </v-row>
              </v-card>
            </v-col>
          </v-row>
      </v-card>
    </v-col>
    </v-row>

    <v-row class="justify-center">
      <v-col cols="12" sm="12" md="12" lg="12">
        <v-card class="bg-white mx-7  pa-4 pa-sm-4 pa-md-8 pa-lg-8 rounded-lg " >
          <v-form>
            <v-card-title class="px-0">
                      <span class="text-h6">Filtros Gráficos</span>
            </v-card-title>
            <v-row class="pt-2">
              <v-col cols="12" sm="12" md="5" lg="5" class="pb-0 pb-sm-0 pb-md-1 pb-lg-1">
                <v-autocomplete label="Gráfico" v-model="inputSelectGrafico" :items="itemsGrafico" variant="outlined"
                ></v-autocomplete>
              </v-col>
              <v-col cols="12" sm="12" md="5" lg="5" v-if="activeAutocompleteJuego" class="pt-0 pt-sm-0 pt-md-3 pt-lg-3">
                <v-autocomplete label="Juego" v-model="inputSelectJuego" :items="itemsJuegos" variant="outlined"
                ></v-autocomplete>
              </v-col>
            </v-row>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  <v-row class="justify-center">
    <v-col cols="12" sm="12" md="12" lg="12">
      <v-card class="bg-white mx-7  pa-2 pa-sm-2 pa-md-1 pa-lg-1 rounded-lg d-flex justify-center " height="540px">
        <Dashboard1 v-if="boolGrafico1"></Dashboard1>
        <Dashboard2 v-if="boolGrafico2" :juego="juego"></Dashboard2>
        <Dashboard3 v-if="boolGrafico3" :juego="juego"></Dashboard3>
        <Dashboard4 v-if="boolGrafico4"></Dashboard4>
        <Dashboard5 v-if="boolGrafico5" :juego="juego"></Dashboard5>
      </v-card>
    </v-col>
  </v-row>
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
      inputSelectGrafico: 'Promedio de intentos en cada juego',
      inputSelectJuego: null,
      boolGrafio1: false,
      juego: null,
      boolGrafico1: true, boolGrafico2: false, boolGrafico3: false, boolGrafico4: false, boolGrafico5:false,
      loaded: false,
      games: [
        {title:'Tiempo total de juego(s)',numero:'', color:'rgba(54, 162, 235, 0.5)', icon: 'mdi-clock-outline'},
        {title:'Partidas búsqueda del tesoro',numero:'', color:'rgba(75, 192, 192, 0.5)', icon: 'mdi-treasure-chest'},
        {title:'Partidas vestir al personaje',numero:'', color:'rgba(255, 205, 86, 0.5)', icon: 'mdi-tshirt-crew-outline'},
        {title:'Partidas ordenar secuencia',numero:'', color:'rgba(153, 102, 255, 0.5)', icon: 'mdi-sort-numeric-ascending'},
      ],
      totalTime: '', partidasJugadasGame1: '', partidasJugadasGame2:'', partidasJugadasGame3: '',
      itemsGrafico:
                [
                  'Promedio de intentos por juego',
                  'Tasa promedio de errores por día', 
                  'Tasa promedio de aciertos por día', 
                  'Tiempo promedio en completar el juego', 
                  'Tiempo total de juego por día'
                ],
      itemsJuegos: ['Búsqueda del tesoro', 'Vestir al personaje', 'Ordenar secuencia']
      
    }),
    computed: {
      
    },
    methods: {
      
    },
    async mounted (){
      let auxtotalTime, auxPartidas1, auxPartidas2, auxPartidas3;
      auxtotalTime = await getTime(); auxPartidas1= await getTotalGames('busquedatesoro'); auxPartidas2= await getTotalGames('vestirpersonaje'); auxPartidas3= await getTotalGames('ordenarsecuencia')
      this.loaded = true;
      this.games[0].numero = auxtotalTime; this.games[1].numero = auxPartidas1;  this.games[2].numero = auxPartidas2; this.games[3].numero = auxPartidas3;
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
        if (val == this.itemsJuegos[0] || val == this.itemsJuegos[1] || val == this.itemsJuegos[2]){
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