<template>
    <div class="default-layout">
        <header class="default-layout-header">
            <burger-menu v-if="!isVisitorRoutes" />
            <span v-else class="default-layout-header-arrow" @click="router.go(-1)">
                <i class="pi pi-arrow-left"></i>
            </span>
            <base-logo class="default-layout-header-logo" />
        </header>
        <main class="default-layout-main">
            <slot />
        </main>
    </div>
</template>

<script setup>
import BurgerMenu from '@/components/molecules/BurgerMenu.vue';
import { computed } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const isVisitorRoutes = computed(() => {
    const visitorRoutes = ['/about', '/signUp', '/login'];
    return visitorRoutes.includes(router.currentRoute.value.path);
})
</script>

<style lang="scss">
.default-layout {
    display: flex;
    flex-direction: column;
    height: 100vh;

    &-header {
        display: flex;
        position: relative;

        &-arrow {
            font-size: 1.5rem;
            position: absolute;
            left: 1.8rem;
            top: 1.8rem;
        }
        &-logo {
            scale: 0.5;
            margin: auto;
        }
    }
}
</style>