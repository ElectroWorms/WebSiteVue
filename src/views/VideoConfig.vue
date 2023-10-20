<style>
</style>
<template>
    <SidePanelUser/>
    <v-app-bar :elevation="2" class="changeAppBar">
        <v-app-bar-nav-icon variant="text" class="d-lg-none" @click="showDrawer()"></v-app-bar-nav-icon>
        <v-btn @click="back" icon="mdi-arrow-left" color="primary" class="ml-md-9"></v-btn>
		<span class="d-none d-md-flex"  style="width: 95px; padding-left: 0px; margin-left: -15px;">
            <v-img
                src="/img/Logo-Oficial.png"
                width="auto"     
            />
        </span>
        <v-text class="mb-md-1"> Configurar video de la rutina</v-text>
    </v-app-bar>
    <VideoConfigComponent :routineId="routineId" :activityId="activityId"></VideoConfigComponent>

</template>
<script setup lang="ts">
import SidePanelUser from '@/components/SidePanel/SidePanelUser.vue';
import VideoConfigComponent from '@/components/RoutineCRUD/VideoConfigComponent.vue';
import router from '@/router';

import { toRefs } from 'vue'
import {useUserStore} from '@/store/app';

const store = useUserStore();
const props = defineProps(["activityId","userId","routineId"]);
const {activityId, routineId, userId}: any = toRefs(props);

const showDrawer = () => {
    store.$patch({
        navbarMobile: {active:true}
    });
}
function back() {
    router.push({ name: 'DetalleActividad', params: { routineId: routineId.value ,ActividadId: activityId.value, UserId: userId.value } });
}
</script>