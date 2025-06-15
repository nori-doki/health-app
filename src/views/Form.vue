<template>
    <div class="form">
        <h1 class="form-title">How was your day?</h1>
        <h2 class="form-subtitle"> {{ displayDate }} </h2>
        <daily-form />
    </div>
</template>

<script setup>
import useHandleDate from '@/composables/useHandleDate';
import DailyForm from '@/components/molecules/dailyForm.vue';
import { useRoute } from 'vue-router';

const route = useRoute()

const { getTodayInDDMMYYYY, getDateInDDMMYYYY } = useHandleDate();

const isNotToday = route.query.date ? Number(route.query.date) : undefined

const displayDate = isNotToday ? getDateInDDMMYYYY(new Date(isNotToday)) : getTodayInDDMMYYYY();

</script>

<style lang="scss">
.form {
    text-align: center;

    &-title {
        font-size: 30px;
        padding-bottom: 10px;
        font-weight: 500;
        text-align: center;
    }

    &-subtitle {
        font-size: 24px;
        font-size: 24px;
    }

}

</style>