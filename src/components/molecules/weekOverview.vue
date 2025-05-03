<template>
    <div class="week-overview">
        <h3> The last 7 days</h3>
        <div class="week-overview-cards">
            <div v-for="dayData in weekData" class="week-overview-day">
                <div class="week-overview-day-header" 
                    :style="{ fontWeight: isToday(dayData.date) ? 'bold' : 'normal' }">
                    <p>{{ dayData.day }}</p>
                </div>
                <div class="week-overview-day-body">
                    <base-chip :value="dayData.grade" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import BaseChip from '@/components/atoms/baseChip.vue';

const props = defineProps({
    weekData: {
        type: Array,
    },
});

console.log('weekData', props.weekData);

function isToday(day) {
    return day === new Date().setHours(0, 0, 0, 0);
}
</script>

<style lang="scss">
.week-overview {
    max-width: 600px;
    margin: auto;
    border-radius: 10px;
    background-color: #fff;
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
    padding: 0.5rem;
    &-cards {
        display: flex;
        justify-content: space-between;
    }
    h3 {
        font-weight: 500;
        margin: 1rem;
    }
    .week-overview-day {
        width: 13%;
        padding: 0.5rem;
        
        .week-overview-day-header {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            h3 {
                font-size: 1rem;
            }
            p {
                font-size: 1rem;
                color: #666;
            }
        }
        .week-overview-day-body {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 50px;
            p {
                font-size: 2rem;
                font-weight: 700;
            }
        }
    }
}
</style>