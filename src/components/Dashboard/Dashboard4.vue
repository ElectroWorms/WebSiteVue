<template>
    <v-container class="d-flex justify-center">
        <Bar v-if="loaded" :data="chartData" :options="chartOptions" />
        <v-snackbar v-model="snackbar.active" :timeout="timeout" :color="snackbar.color">
            <v-progress-circular indeterminate :size="20" :width="2" class="px-10" v-if="!loaded"></v-progress-circular>
            {{ snackbar.text }}
        </v-snackbar>
    </v-container>
</template>
  
<script>
import { Bar } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
import axios from 'axios';
import {useUserStore} from "../../store/app";
const store = useUserStore();
import config from '../../../config.json'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
    name: 'BarChart',
    components: { Bar },
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
            maintainAspectRatio: false,
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
                    text: "Tiempo promedio en completar el juego",
                    padding: {
                        bottom: 30
                    },
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
        const store = useUserStore();
        const secondUserId = store.secondUser._id;
        this.loaded = false
        this.snackbar.text = 'Cargando gráfico';
        this.snackbar.color = 'info';
        this.snackbar.active = true;
        this.timeout = 100000;
        let urlBusquedaTesoro = `${config.PathAPI}metricas/busquedatesoro/list/${secondUserId}`
        let urlVestirPersonaje = `${config.PathAPI}metricas/vestirpersonaje/list/${secondUserId}`
        let urlOrdenar = `${config.PathAPI}metricas/ordenarsecuencia/list/${secondUserId}`
        try {
            const metricasBusqueda = (await axios.get(urlBusquedaTesoro)).data.item
            const metricasVestir = (await axios.get(urlVestirPersonaje)).data.item
            const metricasOrdenar = (await axios.get(urlOrdenar)).data.item
            const promBusqueda = metricasBusqueda.length ? Math.round(((metricasBusqueda.map(metrica => metrica.tiempo_jugado)).reduce((accumulator, currentValue) => accumulator + currentValue, 0)) / metricasBusqueda.length) : 0
            const promVestir = metricasVestir.length ? Math.round(((metricasVestir.map(metrica => metrica.tiempo_jugado)).reduce((accumulator, currentValue) => accumulator + currentValue, 0)) / metricasVestir.length) : 0
            const promOrdenar = metricasOrdenar.length ? Math.round(((metricasOrdenar.map(metrica => metrica.tiempo_jugado)).reduce((accumulator, currentValue) => accumulator + currentValue, 0)) / metricasOrdenar.length) : 0
            this.chartData.labels = ['Búqueda del tesoro', 'Vestir Personaje', 'Ordenar Secuencia']
            this.chartData.datasets = [
                {
                    label: 'Tiempo(s)',
                    backgroundColor: ['rgba(75, 192, 192, 0.2)'],
                    borderColor: ['rgb(75, 192, 192)'],
                    borderWidth:1,
                    data: [promBusqueda, promVestir, promOrdenar]
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