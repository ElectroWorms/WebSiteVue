
import axios from 'axios';
import config from '../../config.json'

export async function getActivity(idObj: any) {

    let Respuesta;
    Respuesta = {status: true, message: 'Actividad obtenida con éxito.', item: {}};

    await axios.get(config.PathAPI+'actividad/get/' + idObj.value)
    .then(response => {
        Respuesta = response.data;
        if (response.data.state) {
            if (response.data.items.length) {
                Respuesta = {status: true, message: 'Actividad obtenida con éxito.', item: response.data.items[0]};
            }
            else {
                Respuesta = {status: true, message: response.data.message, item: {}};
            }
        }
    })
    .catch(error => {
        Respuesta = {status: true, message: 'Error al obtener los datos:'+error, item: {}};
    });

    return Respuesta;
}

export async function fetchRoutines() {
    
    let routineList: any = [];
    const userId = "64d2fb41c4f33be4ee3cb825";

    try {
        const response = await axios.get(config.PathAPI + 'rutina/render/' + userId);
        routineList = response.data;
    } catch (error) {
        console.error('Error al obtener las rutinas:', error);
    }

    return routineList;
}