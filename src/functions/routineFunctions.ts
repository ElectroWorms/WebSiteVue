
import axios from 'axios';
import config from '../../config.json';

// get routine by id
export async function getRoutineByActivityId(activityId: string) {

    try {
        const response = await axios.get(config.PathAPI + 'rutina/get/' + activityId);
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

export async function deleteRoutine(routineId: string) {
    
    try {
        const response = await axios.delete(config.PathAPI + 'rutina/delete/' + routineId);
        const routine = response.data;
        return routine;

    } catch (error) {
        console.error('Error al eliminar la rutina:', error);
    }
}

export async function createRoutine(routine: any) {
    
    try {
        const response = await axios.post(config.PathAPI + 'rutina/add', routine);
        const routineCreated = (response.data).item[0];
        return routineCreated;

    } catch (error) {
        console.error('Error al crear la rutina:', error);
    }
}