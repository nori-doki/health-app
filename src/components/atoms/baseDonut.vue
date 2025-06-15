<template>
    <div class="donut-chart">
            <Doughnut 
                id="donut-chart" 
                :data="data" 
                :options="options" 
                data-micron="shake"
                @click="createDonutChart"
            />
            <div class="donut-chart-content">
                <p class="donut-chart-content-grade">{{ grade }}%</p>
                <p class="donut-chart-content-comment">{{ gradeComment(grade) }}</p>
            </div>
        </div>
</template>

<script setup>
import { Chart as ChartJS, ArcElement } from 'chart.js';
import { Doughnut } from 'vue-chartjs'
import { ref, onMounted } from 'vue';

const props = defineProps({
    grade: {
        type: [Number, null],
        required: true
    },
});

let data = ref({
    datasets: [
        {
        backgroundColor: getDonutColorArray(props.grade),
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

ChartJS.register(ArcElement);

onMounted(() => {
    createDonutChart();
});

function createDonutChart() {
    data.value = {
        datasets: [
            {
            backgroundColor: getDonutColorArray(props.grade),
            data: [props.grade, 100 - props.grade],
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
    if(grade === null) return ['#fcfcfc'];
    if(grade === 0) return ['#ff0000', '#e9e9e9'];
    if(grade < 50) return ['#ff0000', '#fcfcfc'];
    if(50 <= grade  && grade < 80) return ['#fffd00', '#fcfcfc'];
    if(grade >= 80) return ['#1ffb96', '#fcfcfc'];
};

function gradeComment (grade) {
    if(grade === null) return 'Start logging your data for this week ❤️';
    if(grade === 0) return 'You can still do it!';
    if(grade && grade < 50) return 'You can still do it!';
    if(grade >= 50 && grade < 80) return 'Almost there!';
    if(grade >= 80  && grade < 95) return 'Great job! Keep going!';
    if(grade >= 95) return 'Excellent!';
};

</script>

<style lang="scss">
.donut-chart {
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
</style>