<template>
    <v-navigation-drawer
          permanent
          location="left"
        >
          <template v-slot:prepend >
            <v-list-item class="px-10 mt-7" lines="two" :prepend-avatar="profile.avatar" :title="profile.fullname" subtitle="Logged in" ></v-list-item>
          </template>
          <v-container class="px-0" style="margin-top: 10px">
            <v-container fluid class="px-0"> 
              <v-list density="compact" class=" border mx-0" nav >
              <v-list-item  prepend-icon="mdi-apps" title="Actividades"  :to="{ name: 'MenuActividades', params: { UserId: userId }}"></v-list-item>
              <v-divider inset></v-divider>
              <v-list-item  prepend-icon="mdi-image" title="Mis imágenes" :to="{ path: '/User/Imagenes' }"></v-list-item>
              <v-divider inset></v-divider>
              <v-list-item c prepend-icon="mdi-chart-line" title="Dashboards"  :to="{ path: '/User/Dashboards' }">
              </v-list-item> 
            </v-list>
            </v-container>
          </v-container> 
        </v-navigation-drawer>
  </template>
<script>
import {useUserStore} from "../../store/app"
const store = useUserStore()
export default {
    data: () =>({
      userId: store.user._id,
      profile: {
        avatar: store.user.url || "https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Blank&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light",
        fullname: store.user.fullname || "Usuario",

      }
    })
}
</script>