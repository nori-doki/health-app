<template>
    <div class="form">
        <h1 class="form-date">{{ getTodayInDDMMYYYY() }}</h1>
        <p class="form-subtitle">Log in your day</p>
        <daily-form />
    </div>
</template>

<script setup>
import useHandleDate from '@/composables/useHandleDate';

const { getTodayInDDMMYYYY } = useHandleDate();

</script>

<style lang="scss">
.form {
    text-align: center;
    padding: 40px 15px;

    &-date {
        font-size: 30px;
        margin-bottom: 1rem;
        border-bottom: 1px solid black;
        padding-bottom: 1rem;
    }

    &-subtitle {
        font-size: 24px;
        margin-bottom: 30px;
        font-size: 24px;
        font-weight: 500;
    }
}

</style>