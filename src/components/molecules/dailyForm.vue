<template>
    <div class="daily-form">
        <form>
            <ForkKnifeIcon />
            <div v-for="item in items" :key="item.value" class="daily-form-item">
                <p>{{ item.label }}</p>
                <div v-for="score in scores" :key="score" class="daily-form-item-scores">
                    <label>
                        <base-chip :value="score" class="daily-form-item-scores-chip" :class="{ 'checked' : score === formData[item.value]}" />
                        <input type="radio" :value="score" :name="item.value" v-model="formData[item.value]"/>
                    </label>
                </div>
            </div>
        </form>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import ForkKnifeIcon from '@/assets/icons/forkKnifeIcon.vue';

const scores = [
    0,
    50,
    100,
];


const formData = ref({
    meal1: null,
    meal2: null,
    meal3: null,
    snack: null,
});

const items = [
    {
        label : 'Meal 1',
        value : 'meal1',
    },
    {
        label : 'Meal 2',
        value : 'meal2',
    },
    {
        label : 'Meal 3',
        value : 'meal3',
    },
    {
        label : 'Snack',
        value : 'snack',
    }
];


</script>

<style lang="scss">
.daily-form {
    width: 300px;
    margin: 30px auto;

    &-item {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        padding: 0.25rem 1rem;

        p {
            width: 100px;
        }

        &-scores {
            padding: 1rem 0.5rem;
            display: flex;
            flex-direction: column;
            justify-content: center;

            &-chip {
                scale: 0.8;
                margin-bottom: 0.3rem;

                &.checked {
                    scale: 1.5;
                }
            }
        }
    }

    form {
        border-radius: 2rem;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        padding: 1rem;

        input[type="radio"] {
            display: none;
        }
    }
}

</style>