<template>
    <div class="home">
        <div class="home-title">
            <h1>Hello, username</h1>
        </div>
        <div style="min-height: 250px; display: flex; justify-content: center; align-items: center;">
            <BaseDonut 
                v-if="!isLoading"
                :grade="todayGrade"
            />
            <div v-else class="loader"></div>
        </div>
        <Button 
            :label="buttonLabel" 
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
const userId = cookies.get('user_id');

onMounted(async () => {
    isLoading.value = true;
    await checkIfTodayScoreExists()
    await getDailyScores();
    setTimeout(() => {
        isLoading.value = false;
    }, 500);
});

const isLoading = ref(false);
const todayScores = ref({});

// Today's Scores
async function checkIfTodayScoreExists() {
    const { data, error } = await ScoreService.checkScoreExists(userId);
    if (error) {
        console.error('No Score Today', error);
    }
    if (data) {
        todayScores.value = data;
    }
};

const todayGrade = computed(() => {
    return todayScores.value.mean_value || null;
});
const buttonLabel = computed(() => {
    return todayScores.value.mean_value ? 'Edit your day ✏️' : 'Log your day ✏️';
});

function goToForm() {
    if(todayScores.value.date) {
        router.push(`/form?edit=true&date=${todayScores.value.date}`);
    } else {
        router.push('/form');
    }
}

// Week Overview
async function getDailyScores() {
    try {
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