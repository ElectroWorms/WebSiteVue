<template>
    <div>
        <v-card-title class="text-subtitle-1 ">Información</v-card-title>
            <v-container class="border d-flex justify-start w-75 mx-2 mb-5 elevation-0" >
                <v-card class="w-75 border">
                    <v-card-text class="mt-6">
                    </v-card-text>
                </v-card>
            </v-container>
        </div>
</template>

<script>
//datos de la cuenta
//datos del niño => fecha nacimiento, sexo, nivel de apoyo, edad, descripcion, foto
import axios from 'axios'
import {useUserStore} from "../../store/app"
const store = useUserStore()
export default {
    data: () =>({
        
    }),

    methods:{
    },
    
    created () {
    }
}
</script>

