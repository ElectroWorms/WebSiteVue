
import axios from 'axios';
import config from '../../config.json';

// get routine by id
export async function getRoutine(routineId: string) {

    try {
        const response = await axios.get(config.PathAPI + 'rutina/get/' + routineId);
        const routine = response.data;
        return routine;

    } catch (error) {
        console.error('Error al obtener las rutinas:', error);
    }
}

// deactivates a routine
export async function changeRoutineStatus(routineId: string, status: boolean) {
    
    try {
        const response = await axios.put(config.PathAPI + 'rutina/changeStatus/' + routineId, {status});
        const routine = response.data;
        return routine;

    } catch (error) {
        console.error('Error al desactivar la rutina:', error);
    }
}