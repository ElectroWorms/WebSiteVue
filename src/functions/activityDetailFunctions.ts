
import axios from 'axios';
import config from '../../config.json'

export async function getActivity(idObj: any) {

    let Respuesta;
    Respuesta = {status: true, message: 'Actividad obtenida con éxito.', item: {}};

    await axios.get(config.PathAPI + 'actividad/get/' + idObj.value)
    .then(response => {
        Respuesta = response.data;
        if (response.data.state) {
            if (response.data.items.length) {
                Respuesta = {status: true, message: 'Actividad obtenida con éxito.', items: response.data.items[0]};
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

export async function fetchRoutines(userId: string, activity: string) {
    
    let routineList: any = [];

    try {
        const response = await axios.get(config.PathAPI + 'rutina/render/' + userId + '/' + activity);
        routineList = response.data;
    } catch (error) {
        console.error('Error al obtener las rutinas:', error);
    }

    return routineList;
}