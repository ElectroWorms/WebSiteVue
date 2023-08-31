// imports
import axios from 'axios';
import config from '../../config.json';

// crud functions to be used by the components that interact with the api (with error handling)
export async function getAllResources(userId: string) {

    console.log(`${config.PathAPI}recurso/list/${userId}`);

    try {
        const response = await axios.get(`${config.PathAPI}recurso/list/${userId}`);
        return response.data;

    } catch (error) {
        console.error(error);
    }
}
 
export async function getResourceById(resourceId: string) {

    try {
        const response = await axios.get(`${config.PathAPI}recurso/${resourceId}`);
        return response.data;

    } catch (error) {
        console.error(error);
    }
}

export async function createResource(resource: any) {

    try {
        const response = await axios.post(`${config.PathAPI}recurso/create`, resource);
        return response.data;

    } catch (error) {
        console.error(error);
    }
}

export async function updateResource(resource: any) {
    
    try {
        const response = await axios.put(`${config.PathAPI}recurso/update`, resource);
        return response.data;

    } catch (error) {
        console.error(error);
    }
}

export async function deleteResource(resourceId: string) {
    
    try {
        const response = await axios.delete(`${config.PathAPI}recurso/delete/${resourceId}`);
        return response.data;

    } catch (error) {
        console.error(error);
    }
}

export async function validateDeleteResource(resourceId: string, userId: string) {

    try {
        const response = await axios.get(`${config.PathAPI}recurso/delete/validate/${userId}/${resourceId}`);
        console.log(response.data);
        return response.data;

    } catch (error) {
        console.error(error);
    }
}

// ========================================= Images =========================================

async function imageToBlob(file: File): Promise<Blob> {
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (event) => {
            resolve(new Blob([event.target?.result!], { type: file.type }));
        };
        reader.readAsArrayBuffer(file);
    });
}

export async function uploadImage(imageFile: File) {
    
    try {
        // const files = imageFile;
        const files = await imageToBlob(imageFile);
        const form = new FormData();
        
        // change the name of the blob file to the original name of the file
        form.append("files", files, imageFile.name);


        const response = await axios.post(`${config.PathAPI}utility/uploadDocument`, form, { 
            headers: { "Content-Type": "multipart/form-data" } 
        });

        return response.data;

    } catch (error) {
        console.error(error);
    }
}

export async function deleteImage(imageUrl: string) {
    
    try {
        const response = await axios.delete(`${config.PathAPI}utility/deleteDocument/${imageUrl}`);
        return response.data;

    } catch (error) {
        console.error(error);
    }
}

export async function getImage(imageUrl: string) {
    
    try {
        const response = await axios.get(`${config.PathAPI}utility/getDocument/${imageUrl}`);
        return response.data;

    } catch (error) {
        console.error(error);
    }
}

export async function getAllImages(userId: string) {
    
    try {
        const response = await axios.get(`${config.PathAPI}utility/getAllDocuments/${userId}`);
        return response.data;

    } catch (error) {
        console.error(error);
    }
}