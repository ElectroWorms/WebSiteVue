import axios from "axios";
import config from '../../../../config.json';

export async function uploadFile(blob: Blob,name:string):Promise<any> {    
    try {
        const form = new FormData();
        form.append("files", blob, name);
        const response = await axios.post(`${config.PathAPI}utility/uploadDocument`, form, { 
            headers: { "Content-Type": "multipart/form-data" } 
        });
        return response.data;
    } catch (error) {
        console.error(error);
    }
}
export async function updateVideoConfig(routineId:string,hasMusic:boolean, theme: string):Promise<any> {
    try {
        const response = await axios.put(config.PathAPI + 'rutina/updateVideoConfig/' + routineId, {
            hasMusic,
            theme,
            videoConfig: true
        });
        return true;

    } catch (error) {
        console.error('Error al desactivar la rutina:', error);
    }
    return false;
}
export async function convertDescriptionToAudio(description:string) {
    try {
        const response = await axios.post(config.PathAPI + 'utility/textToSpeech', {
            phrase: description
        });
        console.log(response);
        if (response.status){
            if (response.data.status) {
                return response.data.item;
            }
            else return null;
        }
        else return null;

    } catch (error) {
        console.error('Error al desactivar la rutina:', error);
        return null;
    }
}