import axios from 'axios';
import config from '../../../config.json';
import {useUserStore} from "../../store/app";

async function getCantidadPares(){
    const store = useUserStore();
    const secondUserId = store.secondUser._id;
    const metrics = (await axios.get(`${config.PathAPI}metricas/memorize/list/${secondUserId}`)).data.item
    let sum = (metrics.map(metrica => (metrica.cantidad_obj)/2)).reduce((accumulator, currentValue) => accumulator + currentValue, 0)
    return Math.round(sum/metrics.length)
}
async function transformDataGraphic2(game){
    const store = useUserStore();
    const secondUserId = store.secondUser._id;
    let data = [], visited =[]
    const metrics = (await axios.get(`${config.PathAPI}metricas/${game}/list/${secondUserId}`)).data.item
    
    // Estructurar la data en fecha(Dia/Mes/Año), tasa de errores
    const metricsDate = metrics.length > 0 ? metrics.map(metrica =>{
        let date = new Date(metrica.fecha_partida)
        let obj = {
            date:`${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`,
            tasa_errores: (metrica.cantidad_obj + metrica.cantidad_err) > 0 ? metrica.cantidad_err/(metrica.cantidad_obj + metrica.cantidad_err) : 0
        }
        return obj
    }): []

    // sumar las fechas que son iguales
    for (let i=0 ; i<metricsDate.length ; i++){
        let structureData = {}, sum = 0, count = 0;
        for (let j=0 ; j<metricsDate.length ; j++){
            // Si la fecha repetida ya fue considerada, salir del loop
            if (visited.includes(metricsDate[i].date)){
                break;
            }
            else if (metricsDate[i].date == metricsDate[j].date){
                count = count + 1;
                sum = sum + metricsDate[j].tasa_errores;
            }
        }
        // si no se encuentra en la lista de fechas visitadas, lo incluye
        if (!visited.includes(metricsDate[i].date)){
            structureData.date = metricsDate[i].date; structureData.prom = sum/count; visited.push(structureData.date)
            data.push(structureData)
        }
    }
    return data
}

async function transformDataGraphic3(game){
    const store = useUserStore();
    const secondUserId = store.secondUser._id;
    let data = [], visited =[]
    const metrics = (await axios.get(`${config.PathAPI}metricas/${game}/list/${secondUserId}`)).data.item

    // Estructurar la data fecha(Dia/Mes/Año),tasa de aciertos
    const metricsDate = metrics.length > 0 ? metrics.map(metrica =>{
        let date = new Date(metrica.fecha_partida)
        let obj = {
            date:`${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`,
            tasa_aciertos: (metrica.cantidad_obj + metrica.cantidad_err) > 0 ? metrica.cantidad_obj/(metrica.cantidad_obj + metrica.cantidad_err) : 0
        }
        return obj
    }): []

    // sumar las fechas que son iguales
    for (let i=0 ; i<metricsDate.length ; i++){
        let structureData = {}, sum = 0, count = 0;
        for (let j=0 ; j<metricsDate.length ; j++){
            // Si la fecha repetida ya fue considerada, salir del loop
            if (visited.includes(metricsDate[i].date)){
                break;
            }
            else if (metricsDate[i].date == metricsDate[j].date){
                count = count + 1;
                sum = sum + metricsDate[j].tasa_aciertos;
            }
        }
        // si no se encuentra en la lista de fechas visitadas, lo incluye
        if (!visited.includes(metricsDate[i].date)){
            structureData.date = metricsDate[i].date; structureData.prom = sum/count; visited.push(structureData.date)
            data.push(structureData)
        }
    }
    return data
}

async function transformDataGraphic5(game){
    const store = useUserStore();
    const secondUserId = store.secondUser._id;
    let data = [], visited =[]
    const metrics = (await axios.get(`${config.PathAPI}metricas/${game}/list/${secondUserId}`)).data.item

    // Estructurar la data en fecha(Dia/Mes/Año), tiempojugado
    const metricsDate = metrics.length > 0 ? metrics.map(metrica =>{
        let date = new Date(metrica.fecha_partida)
        let obj = {
            date:`${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`,
            tiempo_jugado: metrica.tiempo_jugado
        }
        return obj
    }): []

    // sumar las fechas que son iguales
    for (let i=0 ; i<metricsDate.length ; i++){
        let structureData = {}, sum = 0
        for (let j=0 ; j<metricsDate.length ; j++){
            // Si la fecha repetida ya fue considerada, salir del loop
            if (visited.includes(metricsDate[i].date)){
                break;
            }
            else if (metricsDate[i].date == metricsDate[j].date){
                sum = sum + metricsDate[j].tiempo_jugado;
            }
        }
        // si no se encuentra en la lista de fechas visitadas, lo incluye
        if (!visited.includes(metricsDate[i].date)){
            structureData.date = metricsDate[i].date; structureData.prom = (sum/60); visited.push(structureData.date)
            data.push(structureData)
        }
    }
    return data
}

async function getTime(){
    const store = useUserStore();
    const secondUserId = store.secondUser._id;
    let urlBusquedaTesoro = `${config.PathAPI}metricas/busquedatesoro/list/${secondUserId}`
    let urlVestirPersonaje = `${config.PathAPI}metricas/vestirpersonaje/list/${secondUserId}`
    let metricasBusqueda = (await axios.get(urlBusquedaTesoro)).data.item
    let metricasVestir = (await axios.get(urlVestirPersonaje)).data.item
    let sumBusqueda = metricasBusqueda.length > 0 ? (metricasBusqueda.map(metrica => metrica.tiempo_jugado)).reduce((accumulator, currentValue) => accumulator + currentValue, 0) : 0
    let sumVestir = metricasVestir.length > 0 ? (metricasVestir.map(metrica => metrica.tiempo_jugado)).reduce((accumulator, currentValue) => accumulator + currentValue, 0) : 0
    let sumTotal =  Math.round((sumBusqueda + sumVestir)/60)
    return sumTotal
}

async function getTotalGames(game){
    const store = useUserStore();
    const secondUserId = store.secondUser._id;
    let urlGame = `${config.PathAPI}metricas/${game}/list/${secondUserId}`
    let metrica = (await axios.get(urlGame)).data.item
    return metrica.length
}

export {transformDataGraphic2, transformDataGraphic3, transformDataGraphic5, getTime, getTotalGames, getCantidadPares}