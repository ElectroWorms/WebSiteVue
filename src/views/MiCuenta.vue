<template>
    <SidePanelUser/>
    <v-app-bar :elevation="2" class="pl-4">
        <v-btn @click="back" icon="mdi-arrow-left"></v-btn>
        Mi Perfil
    </v-app-bar>
    <MiCuenta/>

</template>
<script setup>
    import SidePanelUser from '@/components/SidePanel/SidePanelUser.vue'
    import MiCuenta from '@/components/MiCuenta/MiCuenta.vue'
    import UpperPanel from '@/components/UpperPanel/UpperPanel.vue'
    import { ref } from 'vue'
    import {useUserStore} from '@/store/app'
    import router from '@/router'
    const store =useUserStore()
    //const props = defineProps(['userId'])
    //console.log(props.userId)
    const back = () => {
        router.push({ name: 'Usuarios'});
    }
</script>