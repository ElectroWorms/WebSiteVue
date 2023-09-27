
import axios from 'axios';
import config from '../../config.json'

export async function getActivity(idObj: any) {
    let activity: any = {};

    try {
        const response = await axios.get(config.PathAPI + 'actividad/get/' + idObj);
        activity = response.data;
    } catch (error) {
        console.error('Error al obtener la actividad:', error);
    }

    return activity;
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