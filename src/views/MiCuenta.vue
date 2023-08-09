<template>
    <SidePanelUser/>
    <UpperPanel/>
    <MiCuenta/>

</template>
<script setup>
    import SidePanelUser from '@/components/SidePanel/SidePanelUser.vue'
    import MiCuenta from '@/components/MiCuenta/MiCuenta.vue'
    import UpperPanel from '@/components/UpperPanel/UpperPanel.vue'
    import { ref } from 'vue'
    import {useUserStore} from '@/store/app'
    const store =useUserStore()
    //const props = defineProps(['userId'])
    //console.log(props.userId)
</script>