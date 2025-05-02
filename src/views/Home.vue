<template>
    <div class="home">
        <div class="home-title">
            <h1>Hello, {{ userData.name }}</h1>
        </div>
        <BaseDonut 
            :grade="userData.grade"
        />
        <Button 
            label="Log Your Day" 
            class="home-form-button" 
            data-micron="blink"
            @click="goToForm"
        ></Button>  
        <WeekOverview />
    </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import WeekOverview from '../components/molecules/weekOverview.vue';
import { ScoreService } from '@/services/score.service';
import { useRouter } from 'vue-router';
import { useCookies } from "vue3-cookies";
import BaseDonut from '../components/atoms/baseDonut.vue';

const router = useRouter();
const { cookies } = useCookies();

onMounted(() => {
    getDailyScores();
});

// Donut Chart
const userData = ref({
    name: 'Nori',
    grade: 81,

});


function goToForm() {
    router.push('/form')
}

// Week Overview
async function getDailyScores() {
    try {
        const userId = cookies.get('userId');
        const response = await ScoreService.getDailyScores(userId);
    } catch (error) {
        console.error('Error getting daily scores', error);
    }

};
</script>

<style lang="scss">
.home {
    padding: 10px;

    &-title {
        margin-bottom: 30px;
        margin-left: 30px;
        font-size: $font-title-big;
    }
    &-donut-chart {
        max-width: 250px;
        max-height: 250px;
        margin: auto;
        position: relative;

        &-content {
            position: absolute;
            top: 55%;
            left: 50%;
            transform: translate(-50%, -50%);
            text-align: center;

            &-grade {
                font-size: 60px;
                margin-bottom: 10px;
            }
            &-comment {
                margin: 0;
                font-size: 16px;
            }
        }
    }
}
</style>