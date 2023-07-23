<template>
    <div>

        <NavbarConLogin></NavbarConLogin>
        <v-container-fluid class="mt-15" fluid>
            <v-row>
                <v-col>
                    <v-card style="margin-top:90px" text :to="{ path: '/sesion-iniciada' }">
                        <v-img
                            src="data:image/png;base64,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"
                            height=auto max-width="300" class="grey darken-4"></v-img>

                    </v-card>
                </v-col>

            </v-row>

            <v-card style="padding-top:15px ;">
                <v-img src="https://admision.usm.cl/banner-inicio.jpg" height="300" max-width="auto" class="grey darken-4">
                <v-card-title class="white--text text-h4" style="margin-top: 200px; margin-left:190px;">Bienvenido a tu perfil
                </v-card-title>
                </v-img>

            </v-card>


        </v-container-fluid>


        <v-container fluid class="px-15 mt-6">
            
            <div class="my-1 ml-15">
                <v-breadcrumbs :items="items" class="text-h6">
                    <template v-slot:divider>
                        <v-icon>mdi-chevron-right</v-icon>
                    </template>
                </v-breadcrumbs>

            </div>
            <v-container>
                <v-row>


                    <v-col class="col-3">
                        <v-card class="text-center" max-width="380px">
                            <v-btn text :to="{path:'/'}" class="mt-2">
                            <span class="mr-2 mt-2">Cerrar sesión</span>
                                <v-icon class="mb-1 mt-3">mdi-logout</v-icon>
                            </v-btn>
                            <v-img class="black--text align-end" max-width="380px"
                                src="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light">
                                <v-card-title class=" justify-center">Matías Vargas</v-card-title>
                            </v-img>

                        </v-card>
                    </v-col>

                    <v-col>
                        <v-card class="px-15">

                            <v-card-title class="justify-center">Se requiere rellenar el siguiente formulario con su información</v-card-title>
                            <v-card-tex>
                                
                            </v-card-tex>
                        </v-card>


                    </v-col>

                </v-row>
            </v-container>


        </v-container>

    </div>





</template>
<script>
import NavbarConLogin from '../components/NavbarConLogin.vue';

export default {
    name: 'App',
    components: { NavbarConLogin },

    data: () => ({
        items: [
            {
                text: 'Inicio',
                disabled: false,
                href: '/sesion-iniciada',
            },
            {
                text: 'Perfil',
                disabled: true,
                href: '/perfil',
            },

        ],
    }),


};
</script>