<template>
    <div class="home">
        <BaseLogo class="home-logo" />
        <!-- <div class="home-content">

        </div> -->
        <!-- <div class="home-header">
            <div class="home-header-logo"></div>
            <p>Welcome to the Home page!</p>
        </div>
        <div class="home-nav">
            <Button 
                v-for="cta of callToActionList"
                :key="cta.id"
                :label="cta.label"
                :icon="cta.icon"
                :class="`home-nav-button-${cta.color}`"
                @click="cta.callback"
            />
        </div> -->
        <span ref="typing"></span>
        <BaseLavaAnimation />
    </div>
</template>

<script setup>
import { computed, ref, onMounted } from "vue"
import Typed from 'typed.js';
import useNavigate from "@/composables/useNavigate.js"

const typing = ref(null);

const { goToPage } = useNavigate();

const callToActionList = ref([
    {
        id: "login",
        label: "Login",
        icon: "pi pi-lock-open",
        color: "green",
        callback : () => goToPage('/login')
    },
    // {
    //     id: "about",
    //     label: "About us",
    //     icon: "pi pi-heart",
    //     color: "pink",
    //     callback : () => goToPage('/about')
    // },
    // {
    //     id: "method",
    //     label: "Method",
    //     icon: "pi pi-sparkles",
    //     color: "orange",
    //     callback : () => goToPage('/method')
    // },
    {
        id: "signUp",
        label: "Get started",
        icon : "pi pi-chevron-circle-right",
        color: "green",
        callback : () => goToPage('/signUp')
    },
]);

onMounted(() => {
    new Typed(typing.value, {
        strings: ["Nori", "Pistache", "Momo", "Siroko", "Tornado", "Tichoco"],
        typeSpeed: 100,
        backSpeed: 60,
        loop: true
    });
});

</script>

<style lang="scss">
.home {
    height: 100vh;
    overflow: hidden;
    position: relative;
    text-align: center;

    &-logo {
        margin: 50px auto;
    }
    &-content {
        margin: 50px 20px;
        text-align: center;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        position: relative;

        &-header {
            margin : 30px 0;

            &-logo {
                height: 100px;
                width: 200px;
                background-color: rgba(200, 200, 200, 0.75);
                margin: 30px;
            }
        }

        &-nav {
            max-width: 260px;
        }
        .p-button {
            padding: 5px;
            width: 170px;
            margin: 20px;
            border-radius: 10px;
            color: white;
            font-size: 20px;
            display: flex;
            flex-direction: row-reverse;

            .p-button-icon {
                margin: 5px 10px;
            }
        }
        
        .p-button.home-nav-button- {
            &green {
                // background-color: rgb(186, 226, 165);
                background-color: rgba(200, 200, 200, 0.75);
            }
        }
    }
}
</style>
