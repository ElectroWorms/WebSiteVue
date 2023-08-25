<template>
    <v-navigation-drawer permanent location="left">
          <template v-slot:prepend >
            <v-list-item
              class="px-10 mt-7"
              lines="two"
              :prepend-avatar="profile.avatar"
              :title="profile.fullname"
              subtitle="Tutor"
            ></v-list-item>
          </template>
          <v-container class="px-0" style="margin-top: 10px">
            <v-container fluid class="px-0"> 
              <v-list density="compact" class=" border mx-0" nav >
                <v-list-item  prepend-icon="mdi-home" title="Home"  :to="{ name: 'Home' }"></v-list-item>
                <v-divider inset></v-divider>
                <v-list-item  prepend-icon="mdi-account" title="Mis usuarios"  :to="{ path: '/Usuarios' }"></v-list-item>
                <v-divider inset></v-divider>                
                <v-list-item c prepend-icon="mdi-chart-line" title="Dashboards"  :to="{ path: '/User/Dashboards' }"></v-list-item> 
                <v-divider inset></v-divider>
                <v-list-item c prepend-icon="mdi-logout" title="Cerrar Sesión" value="/" :to="{ path: '/' }"></v-list-item>                 
              </v-list>
            </v-container>
          
          </v-container> 
        </v-navigation-drawer>
</template>
<script>
import {useUserStore} from "../../store/app"
const store = useUserStore()
function getCardImg(url,sexo){
    if (url != "" && url != undefined) return url; 
    else return (sexo == 'Masculino') ? '/src/assets/icons/perfil_man.png' : '/src/assets/icons/perfil_woman.png';
}
export default {
    data: () =>({
      userId: store.user._id,
      profile: {
        avatar: getCardImg(store.user.url,store.user.sexo),
        fullname: store.user.fullname || "Usuario",
        rol: store.user.typeAccount
      }
    }),
}
</script>