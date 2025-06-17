<template>
    <div class="landing-page pink-background">
        <BaseLogo class="landing-page-logo" />
        <span ref="typing"></span>

        <p class="landing-page-text">Start the next step of your health journey.<br>Simpler. Easier. Faster.</p>
        <a class="landing-page-text" href="/method"
        :style="'font-weight: 500;'">Discover 80to100 here.</a>
        <div class="landing-page-nav">
            <Button 
                v-for="cta of callToActionList"
                :key="cta.id"
                :label="cta.label"
                :icon="cta.icon"
                :class="`landing-page-nav-button -${cta.color}`"
                data-micron="shake"
                @click="goToPage(cta.route)"
            ></Button>
        </div>
        <BaseLavaAnimation />

        <a class="landing-page-signature" href="/about">hi 👋</a>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue"
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
        route : '/login'
    },
    {
        id: "signUp",
        label: "Create account",
        icon : "pi pi-chevron-circle-right",
        color: "white",
        route : '/signUp'
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
    padding: 0 20px;

    &-logo {
        margin: 50px auto 20px;
    }

    &-text {
        font-size: 1.2rem;
        margin: 10px auto;
        display: block;
        margin: 20px auto;
        line-height: 1.3;
    }

    &-nav {
        width: fit-content;
        margin: 70px auto;

        &-button {
            z-index: 100;
        }
    }

    &-signature {
        position: absolute;
        bottom: 20px;
        right: 20px;
        font-size: 0.9rem;
        color: #000000;
        text-decoration: none;
        opacity: 0.8;
        z-index: 1000;

        &:hover {
            opacity: 1;
        }
    }
    .p-button {
        width: 180px;
        display: flex;
        flex-direction: row-reverse;
        justify-content: center;


        .p-button-icon {
            margin: 5px 10px;
        }
    }
}
</style>
