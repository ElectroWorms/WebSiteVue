<template>
	<div v-if="typeAccount === 'Terapeuta Ocupacional'">
		<SidePanelTerapeuta/>
	</div>
	<div v-else-if="typeAccount === 'Tutor'">
		<SidePanelTutor/>
	</div>
	<!-- <UpperPanel/> -->
	<MisUsuarios/>  
</template>
<script setup>
	import SidePanelTutor from '@/components/SidePanel/SidePanelTutor.vue'
	import SidePanelTerapeuta from '@/components/SidePanel/SidePanelTerapeuta.vue'
	import MisUsuarios from '@/components/MisUsuarios/MisUsuarios.vue'
	import {useUserStore} from '@/store/app'
	const store = useUserStore()
	const typeAccount = store.user.typeAccount
</script>