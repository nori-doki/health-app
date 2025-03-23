<template>
    <div class="form">
        <h1 class="form-title">How was your day?</h1>
        <h2 class="form-subtitle"> {{ getTodayInDDMMYYYY() }} </h2>
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
    // padding: 15px 15px;

    &-title {
        // display: flex;
        // border-bottom: 1px solid black;
        font-size: 30px;
        padding-bottom: 10px;
        font-weight: 500;
        text-align: center;
    }

    &-subtitle {
        font-size: 24px;
        // margin-bottom: 10px;
        font-size: 24px;
    }

}

</style>