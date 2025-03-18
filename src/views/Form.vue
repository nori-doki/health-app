<template>
    <div>
        <h1>{{ getTodayInDDMMYYYY() }}</h1>
        <p>Log in your day</p>
    </div>
</template>

<script setup>
import useHandleDate from '@/composables/useHandleDate';

const { getTodayInDDMMYYYY } = useHandleDate();

</script>

<style lang="scss" scoped>

</style>