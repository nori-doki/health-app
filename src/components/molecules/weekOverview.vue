<template>
    <div class="week-overview">
        <h3> The last 7 days</h3>
        <div class="week-overview-cards">
            <div v-for="dayData in weekData" class="week-overview-day">
                <div class="week-overview-day-header" 
                    :style="{ fontWeight: isToday(dayData.date) ? 'bold' : 'normal' }">
                    <p>{{ dayData.date }}</p>
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
import useHandleDate from '@/composables/useHandleDate';

const { timestampToDay, getDateInTimestamp } = useHandleDate();
const date = new Date();

const weekData = ref([
    {
        day: 'Monday',
        date: timestampToDay(1214233163),
        grade: 90,
    },
    {
        day: 'Tuesday',
        date: timestampToDay(1300633163),
        grade: 30,
    },
    {
        day: 'Wednesday',
        date: timestampToDay(1387033163),
        grade: 70,
    },
    {
        day: 'Thursday',
        date: timestampToDay(1473433163),
        grade: 70,
    },
    {
        day: 'Friday',
        date: timestampToDay(1559833163),
        grade: 80,
    },
    {
        day: 'Saturday',
        date: timestampToDay(1646233163),
        grade: 100,
    },
    {
        day: 'Sunday',
        date: timestampToDay(1732633163),
        grade: null,
    },
]);

function isToday(day) {
    // return getDateInTimestamp(day) === date.getDate();
    return day === '21'
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