<template>
    <div class="home">
        <div class="home-title">
            <h1>Hello, {{ userData.name }}</h1>
        </div>
        <div class="home-donut-chart">
            <Doughnut 
                id="donut-chart" 
                :data="data" 
                :options="options" 
                data-micron="shake"
                @click="createDonutChart"
            />
            <div class="home-donut-chart-content">
                <p class="home-donut-chart-content-grade">{{ userData.grade }}%</p>
                <p class="home-donut-chart-content-comment">{{ gradeComment(userData.grade) }}</p>
            </div>
        </div>
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
import { Chart as ChartJS, ArcElement } from 'chart.js';
import { Doughnut } from 'vue-chartjs'
import { ref, onMounted, computed } from 'vue';
import WeekOverview from '../components/molecules/weekOverview.vue';
import { ScoreService } from '@/services/score.service';
import { useRouter } from 'vue-router';

const router = useRouter();

onMounted(() => {
    getDailyScores();
    createDonutChart();
});

// Donut Chart
ChartJS.register(ArcElement);
const userData = ref({
    name: 'Nori',
    grade: 81,

});
let data = ref({
    datasets: [
        {
        backgroundColor: getDonutColorArray(userData.value.grade),
        data: [100],
        borderWidth: 0,
        borderRadius: 10,
        }
    ]
});
let options = ref({
    responsive: true,
    maintainAspectRatio: false,
    cutout: '80%',
});
function createDonutChart() {
    data.value = {
        datasets: [
            {
            backgroundColor: getDonutColorArray(userData.value.grade),
            data: [userData.value.grade, 100 - userData.value.grade],
            }
        ]
    };
    options.value = {
        responsive: true,
        maintainAspectRatio: false,
    };
    ChartJS.register(ArcElement);
};
function getDonutColorArray(grade) {
    if(!grade) return ['#fcfcfc'];
    if(grade && grade < 50) return ['#ff0099', '#fcfcfc'];
    if(50 <= grade  && grade < 80) return ['#fffd00', '#fcfcfc'];
    if(grade >= 80) return ['#1ffb96', '#fcfcfc'];
};
function gradeComment (grade) {
    if(!grade) return '';
    if(grade && grade < 50) return 'You can still do it!';
    if(grade >= 50 && grade < 80) return 'Almost there!';
    if(grade >= 80  && grade < 95) return 'Great job! Keep going!';
    if(grade >= 95) return 'Excellent!';
};

function goToForm() {
    router.push('/form')
}

// Week Overview
async function getDailyScores() {
    try {
        const dailyScores = await ScoreService.getDailyScores()
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