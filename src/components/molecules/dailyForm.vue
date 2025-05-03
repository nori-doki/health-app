<template>
    <div class="daily-form">
        <form @submit.prevent="handleSubmit">
            <div v-for="item in foodItems" :key="item.value" class="daily-form-item">
                <p>{{ item.label }}</p>
                <div v-for="score in scores" :key="score" class="daily-form-item-scores">
                    <label>
                        <base-chip :value="score" class="daily-form-item-scores-chip" :class="{ 'checked' : score === formData[item.value]}" />
                        <input type="radio" :value="score" :name="item.value" v-model="formData[item.value]"/>
                    </label>
                </div>
            </div>
            <div v-for="item in physicalActivityItems" :key="item.value" class="daily-form-item">
                <p>{{ item.label }}</p>
                <div v-for="score in scores" :key="score" class="daily-form-item-scores">
                    <label>
                        <base-chip :value="score" class="daily-form-item-scores-chip" :class="{ 'checked' : score === formData[item.value]}" />
                        <input type="radio" :value="score" :name="item.value" v-model="formData[item.value]"/>
                    </label>
                </div>
            </div>
        </form>
        <Button
            v-if="!isLoading"
            type="submit"
            class="daily-form-button daily-form-button-submit"
            :class="{ 'zoom-in-out-animation' : isReadyToSubmit }"
            @click="handleSubmit"
        >
            Submit
        </Button>
        <div v-else class="loader"></div>
        <Button
            type="submit"
            class="daily-form-button daily-form-button-leave"
            @click="goToHomePage"
        >
            Leave without saving
        </Button>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { ScoreService } from '@/services/score.service';
import { useCookies } from "vue3-cookies";

const router = useRouter();
const route = useRoute()
const { cookies } = useCookies();
const isLoading = ref(false);
const userId = cookies.get('user_id');

onMounted(async () => {
    await checkIfScoreExists();
});

const scores = [
    0,
    50,
    100,
];

const formData = ref({
    meal_1: null,
    meal_2: null,
    meal_3: null,
    snack: null,
    steps: null,
    workout: null,
});

const coefficients = {
    meal_1: 2,
    meal_2: 2,
    meal_3: 2,
    snack: 2,
    steps: 1,
    workout: 1
};

const foodItems = [
    {
        label : '🍽️ Meal 1',
        value : 'meal_1',
    },
    {
        label : '🍽️ Meal 2',
        value : 'meal_2',
    },
    {
        label : '🍽️ Meal 3',
        value : 'meal_3',
    },
    {
        label : '🍎 Snack',
        value : 'snack',
    }
];

const physicalActivityItems = [
    {
        label : '👟 Steps',
        value : 'steps',
    },
    {
        label : '🏋️ Workout',
        value : 'workout',
    },
];

const edit = route.query.edit === 'true';
const date = route.query.date ? Number(route.query.date) : undefined;

async function handleSubmit(){
    isLoading.value = true;
    const payload = {
        user_id: cookies.get("user_id"),
        meal_1: formData.value.meal_1,
        meal_2: formData.value.meal_2,
        meal_3: formData.value.meal_3,
        snack: formData.value.snack,
        steps: formData.value.steps,
        workout: formData.value.workout,
        mean_value: getMeanValue.value,
        date: date || new Date().setHours(0, 0, 0, 0),
    };
    if (edit) {
        await editScore(payload);
    } else {
        await addNewScore(payload);
    };
};

async function addNewScore(payload) {
    const { data, error, status } = await ScoreService.addDailyScores(payload);
    if (error) {
        isLoading.value = false;
        console.error('Error adding daily scores', error);
        return;
    };
    if (status === 201) {
        console.log('Daily scores added:', data);
        setTimeout(() => {
            router.push('/home');
        }, 1000);
    };
}

async function editScore(payload) {
    const { data, error, status } = await ScoreService.updateDailyScores(payload);
    if (error) {
        isLoading.value = false;
        console.error('Error editing daily scores', error);
        return;
    };
    if (status === 204) {
        router.push('/home');
    };
}

const getTotalScore = computed(() => {
    let totalScore = 0;
    for (const key in formData.value) {
        if (Object.hasOwnProperty.call(formData.value, key)) {
            const element = formData.value[key];
            const coefficient = coefficients[key] || 1;
            totalScore += element * coefficient;
        }
    };
    return totalScore;
});

const getMeanValue = computed(() => {
    let totalWeight = 0;
    for (const key in coefficients) {
        if (Object.hasOwnProperty.call(coefficients, key)) {
            const element = coefficients[key] || 1;
            totalWeight += element;
        }
    };
    return getTotalScore.value / totalWeight;
});

const isReadyToSubmit = computed(() => {
    for (const key in formData.value) {
        if (Object.hasOwnProperty.call(formData.value, key)) {
            const element = formData.value[key];
            if (element === null) {
                return false;
            }
        }
    };
    return true;
});

function goToHomePage(){
    router.push('/home');
};

const scoreExists = ref(false);

async function checkIfScoreExists() {
    const dateToCheck = date || new Date().setHours(0, 0, 0, 0);
    const { data, error } = await ScoreService.checkScoreExists(userId, dateToCheck);
    if (error) {
        console.error('No Score That Day', error);
    }
    if (data) {
        formData.value = {
            meal_1: data.meal_1,
            meal_2: data.meal_2,
            meal_3: data.meal_3,
            snack: data.snack,
            steps: data.steps,
            workout: data.workout,
        };
        scoreExists.value = true;
    }
};

</script>

<style lang="scss">
.daily-form {
    width: 300px;
    margin: 20px auto;
    font-size: 1rem;

    &-icon {
        font-size: 1.3rem;
    }

    hr {
        margin-bottom: 1rem;
    }

    &-item {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        padding: 0.10rem 0.4rem;

        p {
            width: 100px;
            text-align: left;
        }

        &-scores {
            padding: 0.8rem 0.5rem;
            display: flex;
            flex-direction: column;
            justify-content: center;

            &-chip {
                scale: 0.8;
                margin-bottom: 0.3rem;
                transition: transform 0.1s ease-in-out, opacity 0.1s ease-in-out;

                &.checked {
                    transform: scale(1.8);
                    opacity: 1;
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

    &-button {
        width: 250px !important;
        &-submit {
            background-color: $base-green !important;
            font-weight: 600 !important;
            color: white !important;
        }
    }
}

</style>