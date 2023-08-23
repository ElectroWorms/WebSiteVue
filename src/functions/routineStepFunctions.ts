// imports
import axios from 'axios';
import config from '../../config.json';


// función que obtiene un paso de rutina llamando el endpoint /pasoRutina/get/:idPasoRutina
export async function getRoutineStep(routineStepId: string) {
    
    try {
        const response = await axios.get(config.PathAPI + 'pasoRutina/get/' + routineStepId);
        const routineStep = response.data;
        return routineStep;

    } catch (error) {
        console.error('Error al obtener el paso de rutina:', error);
    }
}

// función que obtiene los pasos de una rutina llamando el endpoint /pasoRutina/getAll/:idRutina
export async function getRoutineSteps(routineId: string) {
    
    try {
        const response = await axios.get(config.PathAPI + 'pasoRutina/getAll/' + routineId);
        const routineSteps = response.data;
        return routineSteps;

    } catch (error) {
        console.error('Error al obtener los pasos de rutina:', error);
    }
}


// función que crea un paso de rutina llamando el endpoint /pasoRutina/create
// y entregandole los parámetros: rutina, posicion, recurso
export async function createRoutineStep(routineId: string, position: number, resource: string) {
    
    try {
        const response = await axios.post(config.PathAPI + 'pasoRutina/create', {
            rutina: routineId,
            posicion: position,
            recurso: resource
        });

        const routineStep = response.data;
        return routineStep;

    } catch (error) {
        console.error('Error al crear el paso de rutina:', error);
    }
}

// función que actualiza un paso de rutina llamando el endpoint /pasoRutina/update/:idPasoRutina
// y entregandole los parámetros: rutina, posicion, recurso
export async function updateRoutineStep(routineStepId: string, routineId: string, position: number, resource: string) {
    
    try {
        const response = await axios.put(config.PathAPI + 'pasoRutina/update/' + routineStepId, {
            rutina: routineId,
            posicion: position,
            recurso: resource
        });

        const routineStep = response.data;
        return routineStep;

    } catch (error) {
        console.error('Error al actualizar el paso de rutina:', error);
    }
}

// función que elimina un paso de rutina llamando el endpoint /pasoRutina/delete/:idPasoRutina
export async function deleteRoutineStep(routineStepId: string) {

    try {
        const response = await axios.delete(config.PathAPI + 'pasoRutina/delete/' + routineStepId);
        const routineStep = response.data;
        return routineStep;

    } catch (error) {
        console.error('Error al eliminar el paso de rutina:', error);
    }
}