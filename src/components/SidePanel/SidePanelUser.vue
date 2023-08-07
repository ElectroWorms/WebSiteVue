<template>
    <v-navigation-drawer
          permanent
          location="left"
        >
          <template v-slot:prepend >
            <v-list-item
              class="px-10 mt-7"
              lines="two"
              prepend-avatar="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Blank&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
              title="Jane Smith"
              subtitle="Logged in"
            ></v-list-item>
          </template>
          <v-container class="px-0" style="margin-top: 10px">
            <v-container fluid class="px-0"> 
              <v-list density="compact" class=" border mx-0" nav >
              <v-list-item  prepend-icon="mdi-arrow-left " title="Mi Cuenta"  :to="{ path: '/User/MiCuenta' }"></v-list-item>
              <v-divider inset></v-divider>
              <v-list-item  prepend-icon="mdi-arrow-left " title="Volver"  :to="{ path: '/Usuarios' }"></v-list-item>
              <v-divider inset></v-divider>
              <v-list-item  prepend-icon="mdi-account-box-multiple-outline" title="Rutinas"  :to="{ path: '/User/Rutinas' }"></v-list-item>
              <v-divider inset></v-divider>
              <v-list-item  prepend-icon="mdi-gamepad " title="Juegos"  :to="{ path: '/User/Juegos' }"></v-list-item>
              <v-divider inset></v-divider>
              <v-list-item  prepend-icon="mdi-image " title="Mis imágenes" :to="{ path: '/User/Imagenes' }"></v-list-item>
              <v-divider inset></v-divider>
              <v-list-item c prepend-icon="mdi-chart-line  " title="Dashboard"  :to="{ path: '/User/Dashboard' }">
              </v-list-item> 
            </v-list>
            </v-container>
          </v-container> 
        </v-navigation-drawer>
  </template>
  <script>
  </script>