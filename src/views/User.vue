<template>
    <SidePanelUser/>
    <UpperPanel/>
    <MisUsuarios/>

</template>
<script setup>
    import SidePanelUser from '@/components/SidePanel/SidePanelUser.vue'
    import MisUsuarios from '@/components/MisUsuarios/MisUsuarios.vue'
    import UpperPanel from '@/components/UpperPanel/UpperPanel.vue'
    import { ref } from 'vue'
    import {useUserStore} from '@/store/app'
    const store =useUserStore()
    console.log(store.secondUser)
    //const props = defineProps(['userId'])
    //console.log(props.userId)
</script>