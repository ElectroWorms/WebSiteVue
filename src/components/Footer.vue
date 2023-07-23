<template>

    <FooterVue class="Pie">
        <div class="Colorr">
            <div class="Information">
                <div class="Card">
                    <img class="Image" src="https://tour360.usm.cl/wp-content/uploads/2021/11/logo_acceso.svg" />
                </div>
                <div class="Card">
                    <img class="Image"
                        src="https://tour360.usm.cl/wp-content/uploads/2021/11/logo_consejorectores.svg" />
                </div>
                <div class="Card">
                    <img class="Image" src="https://tour360.usm.cl/wp-content/uploads/2021/11/logo_g9.svg" />
                </div>
                <div class="Card">
                    <img class="Image" src="https://tour360.usm.cl/wp-content/uploads/2021/11/logo_aur.svg" />
                </div>
                <div class="Card">
                    <img class="Image" src="https://tour360.usm.cl/wp-content/uploads/2021/11/logo_reuna.svg" />
                </div>
                <div class="Card">
                    <img class="Image" src="https://tour360.usm.cl/wp-content/uploads/2021/11/logo_universia.svg" />
                </div>

            </div>
        </div>
        <div class="FooterFinal">
            <p>Por amor al arte</p>
        </div>
    </FooterVue>
</template>
<script>

import FooterVue from '@/components/Footer.vue';
export default {
    name: "Footer",
    components: { FooterVue },
}
</script>
<style>
.Pie {
    margin-top: 10px;
    position: relative;
}

.Colorr {
    background: #333333;
    width: 100%;
}

.Information {
    margin: 0px auto;
    display: flex;
    padding: 10px;
    justify-content: space-between;
    margin-top: 200px;

}

.Card {
    padding: 30px;
    margin: 0 auto;
    transition: all 0.5s;
}


.Card:hover {
    transform: translate(0, -10px);
}

.FooterFinal {
    margin: 0 auto;
    background-color: #191919;
    color: beige;
    padding: 10px;
}
</style>