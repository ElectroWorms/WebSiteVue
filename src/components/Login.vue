<template>
    <!--MODAL DE INICIAR SESION-->
    <v-dialog v-model="dialogIniciarsesion" persistent max-width="550px">
        <!--Esto se debe modificar-->
        <template v-slot:activator="{ on, attrs }" v-if="flag ==true">
            <v-btn text v-bind="attrs" v-on="on">
                <span class="mr-2">Iniciar sesión</span>
                <v-icon class="mb-1">mdi-login</v-icon>
            </v-btn>
        </template>

        
            <template v-else-if="flag ==false" v-slot:activator="{ on, attrs }" >
              <div class="Opacity">
                <div :class="`elevation-${hover ? 24 : 6}`" class="mx-auto pa-0 transition-swing">
                  <v-card  v-bind="attrs" v-on="on" >
                    <v-img max-height="240px" src="https://admision.usm.cl/postula.jpg" gradient="to top right, rgba(0,0,0,0.6), rgba(0,0,0,0)" class="rounded-2">
                      <v-card-title class="text-h4 white--text pb-0" style="margin-top: 110px; margin-left:50px;">
                        Postula
                        Aquí</v-card-title>
                      <v-card-text class=" white--text ml-13 "> Postula online a nuestras carreras y programas
                      </v-card-text>

                    </v-img>
                  </v-card>
                </div>
              </div>
            </template>
          



        <div class="Container">
            <div class="Encabezado">
                <v-btn class="Close" text x-large @click="dialogIniciarsesion = false">
                    X
                </v-btn>
                <h1> Iniciar sesión</h1>
            </div>
            <div class="Form">
                <div class=field>
                    <label>Rut</label>
                    <input placeholder="Rut" />
                    <label>Contraseña</label>
                    <input placeholder="Contraseña" />
                </div>
            </div>
            <div class="Footer">
                <Register />
                <v-btn :to="{ path: '/sesion-iniciada' }" class="my-2 px-0" color="primary" x-large rounded
                    @click="dialogIniciarsesion = false">
                    Iniciar

                </v-btn>




            </div>
        </div>
    </v-dialog>
</template>

<script>
import Register from "@/components/Register.vue"
export default {
    props: ['flag'],
    name: 'Login',
    components: {
        Register
    },

    data: () => ({
        dialogIniciarsesion: false,
    }),
    methods: {
        changeToggle() {
            this.dialogRegistrarse = false
        }
    }
}
</script>
<style lang="scss">
.Container {
    max-width: 550px;
    min-height: 500px;
    max-height: 850px;
    background-color: #fff;
    position: relative;
    padding-top: 20px;
    
}

.Footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 0px 20px 0px 20px;
}

.Container h1 {
    padding-left: 0px;
}

.Encabezado {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
    padding-bottom: 20px;
    border-bottom: 1px solid #e8e8e8;
    height: 60px;
}

.Close {
    position: absolute;
    top: 20px;
    right: 20px;
    width: 50px;
    height: 50px;
    border: none;
    background: none;
    cursor: pointer;
    transition: .3s ease all;
    border-radius: 5px;
    color: #1766DC;
}


.Encabezado h3 {
    font-weight: 500;
    font-size: 16px;
}

.field {
    margin-bottom: 20px;
}

.field label {
    display: block;
    margin: 10px 0 5px 0;
    color: #222;
    font-weight: 700;
    font-size: 20px;
}

.field input {
    background-color: #fff;
    outline: 0;
    font-size: 20px;
    padding: 10px 15px;
    border: 1px solid rgb(34, 34, 34, 0.15);
    color: #222;
    border-radius: 4px;
    width: 100%;
}

.Form {
    padding: 0px 30px 30px 30px;
    align-items: center;
}
</style>