<template>
    <!--MODAL REGISTRARSE-->
    <v-dialog v-model="dialogIniciarsesion" persistent max-width="550px" max-height="850px">
        <template v-slot:activator="{ on, attrs }">
            <v-btn text v-bind="attrs" v-on="on">
                <span class="mr-2" style="color: #00486E;">Registrarse</span>
            </v-btn>
        </template>
        <div class="Container">
            <div class="Encabezado">
                <v-btn color="primary" text x-large @click="dialogIniciarsesion = false">
                    <v-icon dark left>
                        mdi-arrow-left
                    </v-icon>Login
                </v-btn>
            </div>
            <div class="Form">
                <div class=field>
                    <label>Rut</label>
                    <input placeholder="11111111-1" type="text" />
                    <label>Correo electrónico</label>
                    <input placeholder="ejemplo@mail.com" type="email" />
                    <label>Contraseña</label>
                    <input placeholder="************" type="password" />
                    <label>Confirmar contraseña</label>
                    <input placeholder="***********" type="password" />
                </div>
            </div>
            <div class="Footer" style="padding-left: 67%;">

                <v-btn class="ButtonRegister" :to="{ path: '/sesion-iniciada' }" color="#00486E" x-large @click="changeToggle()">
                    <h5 style="color:#fff ">Registrarse</h5>
                </v-btn>



            </div>
        </div>
    </v-dialog>
</template>
<script>
export default {
    name: 'Register',
    data: () => ({
        dialogRegistrarse: false,
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
    max-height: 800px;
    background-color: #fff;
    position: relative;
    padding-top: 20px;
    padding-bottom: 30px;
}

.Footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 0px 20px 0px 20px;
}

.ButtonRegister {
    color: #fff;
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
    padding-left: 3%;
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
    padding: 0px;
    align-items: center;
}
</style>
