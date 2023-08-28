<style>
.fondo {
	background-image: url('../assets/FondoLogin.png');
	background-size: 100% 100%;
	height: 100%;
}
</style>
<template class="fondo">
	<div class="fondo">
		<v-app-bar app color="purple" dark class="d-flex justify-end">   
		<v-spacer></v-spacer>
		<div class="center">
			Bienvenido a RAPNI
		</div>
		<v-spacer></v-spacer>
	</v-app-bar>

	<Login/>
	<v-dialog v-model="dialogRegister"> <Register @changeDialogRegister="dialogRegister = $event"/></v-dialog>
	<v-dialog v-model="dialogLogin"> <Login @changeDialogLogin="dialogLogin = $event"/></v-dialog>

	</div>  
</template>

<script setup>
	import Login from '@/components/Login/Login.vue'
	import Register from '@/components/Login/Register.vue'
	import { ref } from 'vue'
	
	var dialogRegister = ref(false)
	var dialogLogin = ref(false)
	function login (){
		dialogLogin.value = true
	}
	function register (){
		dialogRegister.value = true
	}
</script>
