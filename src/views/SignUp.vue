<template>
    <div class="sign-up">
        <h1 class="sign-up-title">Create your account</h1>
        <div v-if="showSuccessMessage" class="sign-up-success-message">
            <p>{{ successMessage }}</p>
        </div>
        <form v-else @submit.prevent="handleSubmit" class="sign-up-form">
            <div class="sign-up-form-item">
                <label for="email">Email *</label>
                <input type="email" id="email" name="email" required v-model="email"
                :valid="emailIsValid"
                :class="{ 'invalid': email.length > 0 && !emailIsValid }"
                autocomplete="username">
                <p v-show="email.length > 0 && !emailIsValid" class="sign-up-form-item-error">Your email is not valid.</p>
            </div>
            <baseNewPasswordForm 
                v-model:password="password" 
                v-model:confirmPassword="confirmPassword"
                :passwordInputType="passwordInputType"
                :confirmPasswordInputType="confirmPasswordInputType"
                :showPassword="showPassword"
                :showConfirmPassword="showConfirmPassword"
                :passwordHasLowercase="passwordHasLowercase"
                :passwordHasUppercase="passwordHasUppercase"
                :passwordHasNumeric="passwordHasNumeric"
                :passwordHasSpecialCharacter="passwordHasSpecialCharacter"
                :passwordIs8CharactersLong="passwordIs8CharactersLong"
                :passwordsMatch="passwordsMatch"
                @toggleShowPassword="showPassword = !showPassword"
                @toggleShowConfirmPassword="showConfirmPassword = !showConfirmPassword"
            />
            <div class="sign-up-form-item">
                <label for="nickname">Nickname *</label>
                <input type="text" id="nickname" name="nickname" required v-model="nickname">
            </div>
            <div class="sign-up-form-item">
                <label for="stepGoal">Step Goal * : <span>{{ stepGoal }} steps</span></label>
                <input type="range" id="stepGoal" name="stepGoal" required
                min="0" max="15000" step="500" v-model="stepGoal">
            </div>
            <div class="sign-up-form-bottom">
                <Button 
                    v-if="!loading"
                    type="submit" 
                    class="sign-up-form-button" 
                    :disabled="!isReadyToSubmit"
                    :class="{ 'zoom-in-out-animation' : isReadyToSubmit }"
                >
                    Sign Up
                </Button>
                <div v-else class="loader"></div>
            </div>
        </form>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { AuthService } from '@/services/auth.service';

import baseNewPasswordForm from '@/components/atoms/baseNewPasswordForm.vue';

const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const nickname = ref('');
const stepGoal = ref(0);
const loading = ref(false);
const showSuccessMessage = ref(false);
const successMessage = ref('Account successfully created! Check your emails to confirm your signup...');

async function handleSubmit(){
    const payload = {
        email: email.value.toLocaleLowerCase(),
        password: password.value,
        options: {
            data: {
                nickname: nickname.value,
                step_goal: stepGoal.value,
            },
        },
    };
    loading.value = true;
    const { data, error } = await AuthService.signUp(payload);

    if (error) {
        console.error('Error signing up:', error.message);
        loading.value = false;
        return;
    } else {
        console.log('Sign up successful:', data);
        loading.value = false;
        showSuccessMessage.value = true;
    }
}

const emailIsValid = computed(() => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailRegex.test(email.value);
});

const passwordHasLowercase = computed(() => /[a-z]/.test(password.value));
const passwordHasUppercase = computed(() => /[A-Z]/.test(password.value));
const passwordHasNumeric = computed(() => /[0-9]/.test(password.value));
const passwordHasSpecialCharacter = computed(() => /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(password.value));
const passwordIs8CharactersLong = computed(() => password.value.length >= 8);
const passwordsMatch = computed(() => password.value === confirmPassword.value);

const isReadyToSubmit = computed(() => {
    return emailIsValid.value
        && passwordHasLowercase.value
        && passwordHasUppercase.value
        && passwordHasNumeric.value
        && passwordHasSpecialCharacter.value
        && passwordIs8CharactersLong.value
        && passwordsMatch.value
        && nickname.value.length > 0
        && stepGoal.value > 0;
});

const showPassword = ref(false);
const passwordInputType = computed(() => showPassword.value ? 'text' : 'password');
const showConfirmPassword = ref(false);
const confirmPasswordInputType = computed(() => showConfirmPassword.value ? 'text' : 'password');

</script>

<style lang="scss">
.sign-up {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-weight: 500;
    margin-bottom: 2rem;

    &-title {
        font-size: $font-title-medium;
        margin: 1.5rem;
    }

    &-form {
        width: 300px;
        margin: 0 2rem;
        &-item {
            display: flex;
            flex-direction: column;
            margin: 0.4rem 0.8rem 0.4rem;
            min-height: 5.1rem;
            position: relative;

            label {
                margin-bottom: 0.4rem;
            }

            input {
                padding: 0.5rem;
                border: 1px solid #ccc;
                border-radius: 0.5rem;
                font-family: 'Quicksand', sans-serif;
                font-size: $font-small;
                font-weight: 500;

                &.invalid {
                    border-color: red;
                }
            }

            input[type="range"] {
                -webkit-appearance: none;
                appearance: none;
                background: transparent;
                cursor: pointer;
                border: none;
                color: $base-pink;
                &::-webkit-slider-runnable-track {
                    width: 100%;
                    height: 0.5rem;
                    cursor: pointer;
                    background: linear-gradient(
                        to right,
                        rgba(255, 253, 0, 1), 
                        rgba(255, 253, 0, 1), 
                        rgba(31, 251, 150, 1),
                        rgba(255, 253, 0, 1)
                        );
                    border-radius: 0.5rem;
                }
                &::-webkit-slider-thumb {
                    -webkit-appearance: none;
                    appearance: none;
                    width: 1rem;
                    height: 1rem;
                    border-radius: 50%;
                    background: $base-pink;
                    cursor: pointer;
                    margin-top: -0.25rem;
                }
            }

            &-error {
                color: red;
                font-size: $font-small;
                margin: 0.2rem;
            }

        }
        &-bottom {
            margin-top: -1rem;
        }
        &-button {
            background-color: $base-green !important;
            font-weight: 600 !important;
            color: white !important;
            width: 250px !important;

            &[disabled] {
                cursor: not-allowed;
                background-color: #ccc !important;
            }
        }
    }

    &-success-message {
        background-color: $base-green;
        border: 1px solid $base-green;
        color: white;
        padding: 1rem 2rem;
        border-radius: 0.5rem;
        margin: 1rem 2rem;
        text-align: center;
        font-weight: 600;
    }
}

</style>