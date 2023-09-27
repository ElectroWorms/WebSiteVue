<template>
    <v-container class="d-flex justify-center">
        <Line v-if="loaded" :data="chartData" :options="chartOptions"/>
        <v-snackbar v-model="snackbar.active" :timeout="timeout" :color="snackbar.color">
            <v-progress-circular indeterminate :size="20" :width="2" class="px-10" v-if="!loaded"></v-progress-circular>
            {{ snackbar.text }}
        </v-snackbar>
    </v-container>
</template>
<script>
    import { Line } from 'vue-chartjs';
    import {transformDataGraphic3} from './functions'
    import axios from 'axios';
    import {useUserStore} from "../../store/app";
    const store = useUserStore();
    import config from '../../../config.json'
    import { Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend 
    } from 'chart.js';

    ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
    )
    export default {
        name: 'LineChart',
        components: { Line },
        props: ['juego'],
        data: () => ({
            loaded: false,
            chartData: {},
            snackbar: {
                color: null,
                active: false,
                text: null,
                timeout: null,
            },
            chartOptions: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        display: true,
                        labels: {
                            color: "#000000",
                            font:{
                                
                            }
                        }
                    },
                    datalabels:{
                        color: "#000000",
                    },
                    title: {
                        display: true,
                        padding: {
                            bottom: 30
                        },
                        text:'',
                        color: "#000000",
                        font: {
                            size: 17,
                            weight: 2,
                            family: 'sans-serif'
                        }
                    },
                }
            }
        }),
        async mounted () {
            this.loaded = false
            this.snackbar.text = 'Cargando gráfico';
            this.snackbar.color = 'info';
            this.snackbar.active = true;
            this.timeout = 100000;
            let game;
            if (this.juego == 'Búsqueda del tesoro'){
                game = 'busquedatesoro'
                this.chartOptions.plugins.title.text = 'Tasa promedio de aciertos por día en búsqueda del tesoro'
            }
            else if (this.juego == 'Vestir al personaje'){
                game = 'vestirpersonaje'
                this.chartOptions.plugins.title.text = 'Tasa promedio de aciertos por día en vestir al personaje'
            }
            else if (this.juego == 'Ordenar secuencia'){
                game = 'ordenarsecuencia'
                this.chartOptions.plugins.title.text = 'Tasa promedio de aciertos por día en ordenar secuencia'
            }
            try {
                
                let data = await transformDataGraphic3(game)
                this.chartData.labels = data.map(x => x.date)
                this.chartData.datasets = [
                    {
                        label: 'Tasa promedio de aciertos',
                        backgroundColor: 'rgb(255, 205, 86)',
                        tension: 0.1,
                        borderColor: 'rgba(255, 205, 86, 0.2)',
                        data: data.map(x => x.prom)
                    }
                ]
                this.loaded = true;
                this.snackbar.active = false;
            } catch (e) {
                this.snackbar.text = 'No se ha logrado desplegar el gráfico';
                this.snackbar.color = 'error';
                this.snackbar.active = true;
                this.timeout = 3000;
                this.loaded = false;
            }
        }
}
</script>