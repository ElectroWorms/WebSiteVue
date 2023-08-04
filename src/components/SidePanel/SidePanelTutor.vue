<template>
  <v-navigation-drawer
        permanent
        location="left"
      >
        <template v-slot:prepend >
          <v-list-item
            class="px-10 mt-7"
            lines="two"
            prepend-avatar="https://cdn.icon-icons.com/icons2/3066/PNG/512/user_person_profile_avatar_icon_190943.png"
            title="Jane Smith"
            subtitle="Logged in"
          ></v-list-item>
        </template>
        <v-container class="px-0" style="margin-top: 10px">
          <v-container fluid class="px-0"> 
            <v-list density="compact" class=" border mx-0" nav >
            <v-list-item  prepend-icon="mdi-account" title="Mis usuarios" value="account" :to="{ path: '/Usuarios' }"></v-list-item>
            <v-divider inset></v-divider>
            <v-list-item  prepend-icon="mdi-account-box-multiple-outline" title="Vincular cuentas" value="home" :to="{ path: '/Vincular' }"></v-list-item>
            <v-divider inset></v-divider>
            <v-list-item  prepend-icon="mdi-monitor-dashboard" title="Dashboard" value="account" :to="{ path: '/Dashboard' }"></v-list-item>
            <v-divider inset></v-divider>
            <v-list-item c prepend-icon="mdi-logout" title="Cerrar Sesión" value="/" :to="{ path: '/' }"></v-list-item> 
            
          </v-list>
          </v-container>
        
        </v-container> 
      </v-navigation-drawer>
</template>
<script>
</script>