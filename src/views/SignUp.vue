<template>
    <div class="sign-up">
        <h1 class="sign-up-title">Create your account</h1>
        <form @submit.prevent="handleSubmit" class="sign-up-form">
            <div class="sign-up-form-item">
                <label for="email">Email *</label>
                <input type="email" id="email" name="email" required v-model="email"
                :valid="emailIsValid"
                :class="{ 'invalid': !emailIsValid }">
                <p v-if="!emailIsValid" class="sign-up-form-item-error">Your email is not valid.</p>
            </div>
            <div class="sign-up-form-item">
                <label for="password">Password *</label>
                <input type="password" id="password" name="password" required v-model="password">
                {{ password }}
            </div>
            <div class="sign-up-form-item">
                <label for="confirmPassword">Confirm Password *</label>
                <input type="password" id="confirmPassword" name="confirmPassword" required v-model="confirmPassword">
                {{ confirmPassword }}
            </div>
            <div class="sign-up-form-item">
                <label for="nickname">Nickname *</label>
                <input type="text" id="nickname" name="nickname" required v-model="nickname">
                {{ nickname }}
            </div>
            <div class="sign-up-form-item">
                <label for="stepGoal">Step Goal *</label>
                <input type="range" id="stepGoal" name="stepGoal" required
                min="0" max="15000" step="500" v-model="stepGoal">
                <span>{{ stepGoal }} steps</span>
            </div>
                <button type="submit" class="sign-up-form-button">Sign Up</button>
        </form>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const nickname = ref('');
const stepGoal = ref(0);

const handleSubmit = () => {
    const payload = {
        email: email.value.toLocaleLowerCase(),
        password: password.value,
        nickname: nickname.value,
        stepGoal: stepGoal.value,
    };
    console.log('payload:', payload)
    // router.push('/');
}

const emailIsValid = computed(() => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailRegex.test(email.value);
});

</script>

<style lang="scss">
.sign-up {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-weight: 500;

    &-title {
        font-size: 2rem;
        margin: 1.5rem;
    }

    &-form {
        width: 300px;
        margin: 0 2rem;
        &-item {
            display: flex;
            flex-direction: column;
            margin: 1rem;

            label {
                margin-bottom: 0.4rem;
            }

            input {
                padding: 0.5rem;
                border: 1px solid #ccc;
                border-radius: 0.5rem;
                font-family: 'Quicksand', sans-serif;
                font-size: 1rem;
                font-weight: 500;

                &.invalid {
                    border-color: red;
                }
            }

            &-error {
                color: red;
                font-size: 1rem;
                margin: 0.2rem;
            }
        }

        &-button {

        }
    }
}

</style>