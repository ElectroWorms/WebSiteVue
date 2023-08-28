<template>
    <SidePanelUser/>
    <v-app-bar :elevation="2" class="">
        <v-btn @click="back" icon="mdi-arrow-left"></v-btn>
        Mi Perfil
    </v-app-bar>
    <MiCuenta class="w-100"/>
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