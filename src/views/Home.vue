<template>
    <div class="home">
        <h1>Home Page</h1>
        <p>Welcome to the Home page!</p>
        <div class="home-nav">
            <Button 
                v-for="cta of callToActionList"
                :key="cta.id"
                :label="cta.label"
                :icon="cta.icon"
                :class="cta.color"
                raised
                @click="cta.callback"
            />
        </div>
    </div>
</template>

<script setup>
import { computed, ref } from "vue"
import useNavigate from "@/composables/useNavigate.js"

const { goToPage } = useNavigate();

const callToActionList = ref([
    {
        id: "login",
        label: "Login",
        icon: "pi pi-lock-open",
        color: "green",
        callback : () => goToPage('/login')
    },
    {
        id: "about",
        label: "About us",
        icon: "pi pi-heart",
        color: "pink",
        callback : () => goToPage('/about')
    },
    {
        id: "method",
        label: "Method",
        icon: "pi pi-sparkles",
        color: "orange",
        callback : () => goToPage('/method')
    },
    {
        id: "signUp",
        label: "Get started",
        icon : "pi pi-chevron-circle-right",
        color: "blue",
        callback : () => goToPage('/signUp')
    },
]);

</script>

<style lang="scss">
.home {
    border: 1px solid pink;
    min-height: 90vh;
    margin: 50px 20px;
    text-align: center;

    &-nav {
        max-width: 260px;
        margin: auto;
    }
    .p-button {
        padding: 5px;
        width: 120px;
        margin: 5px;
        border-radius: 10px;
        color: white;

        .p-button-icon {
            margin-right: 5px;
        }
    }
    
    .p-button.green {
        background-color: rgb(186, 226, 165);
    }
    .p-button.blue {
        background-color: rgba(136, 182, 205, 0.864);
    }
    .p-button.pink {
        background-color: rgba(213, 152, 191, 0.827);
    }
    .p-button.orange {
        background-color: rgba(247, 207, 134, 0.862);
    }
}
</style>
