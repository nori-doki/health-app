<template>
    <div class="default-layout">
        <header class="default-layout-header">
            <burger-menu />
            <base-logo class="default-layout-header-logo" />
        </header>
        <main class="default-layout-main">
            <slot />
        </main>
    </div>
</template>

<script setup>
import BurgerMenu from '@/components/molecules/BurgerMenu.vue';
</script>

<style lang="scss">
.default-layout {
    display: flex;
    flex-direction: column;
    height: 100vh;

    &-header {
        &-logo {
            scale: 0.5;
            margin: auto;
        }
    }
}
</style>