<template>
    <div class="home">
        <div class="home-title">
            <h1>Hello, username</h1>
        </div>
        <div style="min-height: 250px; display: flex; justify-content: center; align-items: center;">
            <BaseDonut 
                v-if="!isLoading"
                :grade="getLastSevenDaysMeanValue()"
            />
            <div v-else class="loader"></div>
        </div>
        <Button 
            :label="buttonLabel" 
            class="home-form-button" 
            data-micron="blink"
            @click="goToForm"
        ></Button>  
        <WeekOverview 
            :weekData="weekScoresFormatted"
        />
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
    await checkIfTodayScoreExists();
    await getDailyScores();
    setTimeout(() => {
        isLoading.value = false;
    }, 300);
});

const isLoading = ref(false);
const todayScores = ref({});

// Today's Scores
async function checkIfTodayScoreExists() {
    const { data, error } = await ScoreService.checkScoreExists(userId);
    if (error) {
        console.error(error.details);
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
const weekScoresFormatted = ref([]);
async function getDailyScores() {
    try {
        const response = await ScoreService.getDailyScores(userId);
        formatLastSevenDays(response.data);
    } catch (error) {
        console.error('Error getting daily scores', error);
    }
};

function formatLastSevenDays(allScores){
    getLastSevenDaysNumber();
    getLastSevenDaysScores(allScores)
}

function getLastSevenDaysNumber() {
    const today = new Date();
    const lastSevenDays = [];
    
    for (let i = 0; i < 7; i++) {
        const day = {};
        const date = new Date(today);
        date.setDate(today.getDate() - i);
        day.timestamp = date.setHours(0, 0, 0, 0);
        date.toISOString().split('T')[0];
        day.truncated_date = date.getDate().toString().padStart(2, '0');
        lastSevenDays.push(day);
    };

    weekScoresFormatted.value = lastSevenDays.reverse();
}

function getLastSevenDaysScores(allScores) {
    const lastSevenDays = weekScoresFormatted.value;
    const scores = lastSevenDays.map((day) => {
        const score = allScores.find((score) => score.date === day.timestamp);
        return {
            day: day.truncated_date,
            date: day.timestamp,
            grade: score ? score.mean_value : null,
        };
    });
    weekScoresFormatted.value = scores;
}

function getLastSevenDaysMeanValue() {
    const sumOfExistingScores = weekScoresFormatted.value.reduce((acc, score) => {
        if (score.grade !== null) {
            acc += score.grade;
        }
        return acc;
    }, 0);
    const numberOfExistingScores = weekScoresFormatted.value.filter(score => score.grade !== null).length;
    const lastSevenDaysMeanValue = sumOfExistingScores / numberOfExistingScores;
    return lastSevenDaysMeanValue !== NaN ? Math.floor(lastSevenDaysMeanValue) : null;
}
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