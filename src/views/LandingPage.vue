<template>
    <div class="landing-page pink-background">
        <BaseLogo class="landing-page-logo" />
        <span ref="typing"></span>

        <div class="landing-page-nav">
            <Button 
                v-for="cta of callToActionList"
                :key="cta.id"
                :label="cta.label"
                :icon="cta.icon"
                :class="`landing-page-nav-button-${cta.color}`"
                data-micron="shake"
                @click="cta.callback"
            ></Button>
        </div>
        <BaseLavaAnimation />
    </div>
</template>

<script setup>
import { computed, ref, onMounted } from "vue"
import Typed from 'typed.js';
import useNavigate from "@/composables/useNavigate.js"

const typing = ref(null);
const typedStrings = ref([
    '80% of discipline',
    '100% progress'
])

const { goToPage } = useNavigate();

const callToActionList = ref([
    {
        id: "login",
        label: "Login",
        icon: "pi pi-lock-open",
        color: "white",
        // callback : () => goToPage('/login')
    },
    {
        id: "about",
        label: "About us",
        icon: "pi pi-heart",
        color: "white",
        callback : () => goToPage('/about')
    },
    {
        id: "signUp",
        label: "Get started",
        icon : "pi pi-chevron-circle-right",
        color: "white",
        callback : () => goToPage('/signUp')
    },
]);

onMounted(() => {
    new Typed(typing.value, {
        strings: typedStrings.value,
        typeSpeed: 50,
        backSpeed: 60,
        loop: true
    });
});

</script>

<style lang="scss">
.landing-page {
    height: 100vh;
    overflow: hidden;
    position: relative;
    text-align: center;

    &-logo {
        margin: 50px auto 20px;
    }

    &-nav {
        width: fit-content;
        margin: 70px auto;
        z-index: 100;
    }
    .p-button {
        padding: 5px;
        width: 170px;
        margin: 25px;
        border-radius: 10px;
        color: rgb(0, 0, 0);
        font-size: 20px;
        display: flex;
        flex-direction: row-reverse;

        .p-button-icon {
            margin: 5px 10px;
        }
    }
    
    .p-button.landing-page-nav-button- {
        &green {
            // background-color: rgb(186, 226, 165);
            // background-color: $base-green;
        }
        &white {
            background-color: white;
            // border: 1px solid black;
            box-shadow: 5px 5px 1px 1px $base-shade;
        }
    }
}
</style>
