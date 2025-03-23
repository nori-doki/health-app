<template>
    <div class="daily-form">
        <form @submit.prevent="handleSubmit">
            <!-- <div class="daily-form-icon">🍽️</div> -->
            <div v-for="item in foodItems" :key="item.value" class="daily-form-item">
                <p>{{ item.label }}</p>
                <div v-for="score in scores" :key="score" class="daily-form-item-scores">
                    <label>
                        <base-chip :value="score" class="daily-form-item-scores-chip" :class="{ 'checked' : score === formData[item.value]}" />
                        <input type="radio" :value="score" :name="item.value" v-model="formData[item.value]"/>
                    </label>
                </div>
            </div>
            <!-- <div class="daily-form-icon">👟</div> -->
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
            type="submit"
            class="daily-form-button daily-form-button-submit"
            :class="{ 'zoom-in-out-animation' : isReadyToSubmit }"
            @click="handleSubmit"
        >
            Submit
        </Button>
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
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

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
    steps: null,
    workout: null,
});

const coefficients = {
    meal1: 2,
    meal2: 2,
    meal3: 2,
    snack: 2,
    steps: 1,
    workout: 1
};

const foodItems = [
    {
        label : '🍽️ Meal 1',
        value : 'meal1',
    },
    {
        label : '🍽️ Meal 2',
        value : 'meal2',
    },
    {
        label : '🍽️ Meal 3',
        value : 'meal3',
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

function handleSubmit(){
    let payload = new FormData();
    for (const key in formData.value) {
        if (Object.hasOwnProperty.call(formData.value, key)) {
            const element = formData.value[key];
            console.log('element:', element)
            payload.append(key, element);
        }
    };
    console.log('payload:', payload);
};

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