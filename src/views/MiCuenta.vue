<style>

</style>
<template>
    <SidePanelUser/>
    <v-app-bar :elevation="2" class="changeAppBar">
        <v-app-bar-nav-icon variant="text" class="d-md-none" color="primary"></v-app-bar-nav-icon>
        <v-btn @click="back" icon="mdi-arrow-left" color="primary" class="pl-md-8 pl-lg-8"></v-btn>
        <v-text class="pl-md-5 pl-lg-5"> Mi Perfil</v-text>
    </v-app-bar>
    <v-container >
        <MiCuenta/>
    </v-container>
</template>
<script setup lang="ts">
    import SidePanelUser from '@/components/SidePanel/SidePanelUser.vue'
    import MiCuenta from '@/components/MiCuenta/MiCuenta.vue'
    import router from '@/router'
    //const props = defineProps(['userId'])
    //console.log(props.userId)
    const back = () => {
        router.push({ name: 'Usuarios'});
    }
</script>