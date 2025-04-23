<template>
    <div class="base-logo">
        <a>
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
        background: $base-gradient;
        -webkit-background-clip: text;
        background-clip: text;
        -webkit-text-fill-color: transparent;
    }
}
</style>