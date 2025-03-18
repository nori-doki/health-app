<template>
    <div class="base-logo">
        <a href="/">
            <p class="base-logo-black">80to<span class="base-logo-color">100</span></p>
        </a>
    </div>
</template>

<script setup>
</script>

<style lang="scss">

.base-logo {
    width: fit-content;
    padding: 5px;
    font-family: "Quicksand", serif;
    cursor: pointer;

    &-black {
        font-size: 50px;
    }

    &-color {
        font-size: 60px;
        font-weight: bold;
        background: linear-gradient(rgba(255, 253, 0, 1) 10%, rgba(31, 251, 150, 1) 100%);
        -webkit-background-clip: text;
        background-clip: text;
        -webkit-text-fill-color: transparent;
    }
}
</style>