<style>

</style>
<template>
    <SidePanelUser/>
    <v-app-bar :elevation="2" class="changeAppBar">
        <v-app-bar-nav-icon variant="text" class="d-lg-none" @click="showDrawer()"></v-app-bar-nav-icon>
        <v-btn @click="back" icon="mdi-arrow-left" color="primary" class="ml-md-8 ml-lg-8"></v-btn>
        <v-text class="pl-md-5 pl-lg-5"> Mi Perfil</v-text>
    </v-app-bar>
    <v-container >
        <MiCuenta/>
    </v-container>
</template>
<script setup lang="ts">
    import SidePanelUser from '@/components/SidePanel/SidePanelUser.vue'
    import MiCuenta from '@/components/MiCuenta/MiCuenta.vue'
    import {useUserStore} from "../store/app"
    import router from '@/router'
    const store = useUserStore()
    //const props = defineProps(['userId'])
    //console.log(props.userId)
    const back = () => {
        router.push({ name: 'Usuarios'});
    }
    const showDrawer = () =>{
        store.$patch({
                navbarMobile: {active:true}
        })
    }
</script>