<style>

</style>
<template>

  <v-navigation-drawer expand-on-hover rail color="primary" style="margin-top: 65px;" class="d-none d-md-flex">
    <v-list>
      <v-list-item
        class="text-wrap"
        lines="two"
        :prepend-avatar="profile.avatar"
        :title="profile.fullname"
        subtitle="Terapeuta Ocupacional"
        ></v-list-item>
      </v-list>

    <v-divider></v-divider>
    <v-list density="compact" nav>
      <v-list-item  prepend-icon="mdi-home" title="Home"  :to="{ path: '/Usuarios' }"></v-list-item>
      <v-list-item  prepend-icon="mdi-account" title="Mi cuenta"  :to="{ path: '/User/MiCuenta'}"></v-list-item>
      <v-list-item  prepend-icon="mdi-account-box-multiple-outline" title="Vincular cuenta"  :to="{ path: '/Vincular' }"></v-list-item>
      <v-list-item  prepend-icon="mdi-apps" title="Actividades"  :to="{ name: 'MenuActividades', params: { UserId: userId }}"></v-list-item>
      <v-list-item  prepend-icon="mdi-image" title="Mis imágenes" :to="{ path: '/User/Imagenes/' + userId}"></v-list-item>
      <v-list-item c prepend-icon="mdi-chart-line" title="Dashboards" :to="{ path: '/User/Dashboard' }"></v-list-item> 
      <v-list-item c prepend-icon="mdi-logout" title="Cerrar Sesión" value="/" @click="logout"></v-list-item> 
    </v-list>
  </v-navigation-drawer>    
    <!-- dialog de logout -->
    <v-dialog v-model="dialogLogout" max-width="500px">
      <v-card>
        <v-card-title class="text-h5 text-center text-wrap">¿Está seguro de cerrar sesión?</v-card-title>
        <v-card-text class="text-center">
          <v-icon size="75" class="mr-2" max-widht="300px" elevation="2"
            fab
            >
            mdi-logout
          </v-icon>
        </v-card-text>
        <v-card-actions class="my-3">
          <v-spacer></v-spacer>
          <v-btn color="primary" variant="flat" @click="logoutConfirm">Aceptar</v-btn>
          <v-btn color="primary" text @click="logoutCancel">Cancelar</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>

</template>
<script>
import {useUserStore} from "../../store/app"
const store = useUserStore()
function getCardImg(url,sexo){
    if (url != "" && url != undefined) return url; 
    else return (sexo == 'Masculino') ? '/img/perfil_man.png' : '/img/perfil_woman.png';
}
export default {
    data: () =>({
      model: true,
      userId: store.secondUser._id,
      dialogLogout: false,
      profile: {
        avatar: getCardImg(store.user.url,store.user.sexo),
        fullname: store.user.fullname || "Usuario",
        rol: store.user.typeAccount
      }
    }),
    methods:{
      logout(){
        this.dialogLogout = true
      },
      logoutConfirm(){
        this.$router.push({path: '/'})
      },
      logoutCancel(){
        this.dialogLogout = false
      }
    }
}
</script>