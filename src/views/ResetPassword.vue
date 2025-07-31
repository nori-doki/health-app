<template>
    <div v-if="error" class="reset-password-error">
        <h1 class="reset-password-error-title">
            Error
        </h1>
        <div class="reset-password-error-subtitle">
            <p>There was an error processing your request:</p>
            <p style="font-style:italic;">{{ errorMessage }}</p>
        </div>
    </div>
    <div v-else class="reset-password">
        <h1 class="reset-password-title">
            Choose a new password
        </h1>
        <form @submit.prevent="handleLogin" class="reset-password-form">
            <baseNewPasswordForm 
                v-model:password="newPassword" 
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

            <div v-if="!isLoading">
                <Button @click="sendResetPasswordEmail" class="reset-password-form-submit"
                    :disabled="!isReadyToSubmit"
                >Send Reset Password Email</Button>
            </div>
            <div v-else class="loader"></div>
            <div class="reset-password-footer">
                <a class="reset-password-footer-link" href="/login">Go back to login page</a>
            </div>
        </form>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import { AuthService } from '@/services/auth.service';
import useHandleSupabase from '../composables/useHandleSupabase';

const route = useRoute();
const { getHashParamsObject } = useHandleSupabase();

const newPassword = ref('');
const confirmPassword = ref('');

const passwordInputType = computed(() => showPassword.value ? 'text' : 'password');
const confirmPasswordInputType = computed(() => showConfirmPassword.value ? 'text' : 'password');

const passwordHasLowercase = computed(() => /[a-z]/.test(newPassword.value));
const passwordHasUppercase = computed(() => /[A-Z]/.test(newPassword.value));
const passwordHasNumeric = computed(() => /[0-9]/.test(newPassword.value));
const passwordHasSpecialCharacter = computed(() => /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(newPassword.value));
const passwordIs8CharactersLong = computed(() => newPassword.value.length >= 8);
const passwordsMatch = computed(() => newPassword.value === confirmPassword.value);

const isReadyToSubmit = computed(() => newPassword.value.length > 0);


const showPassword = ref(false);
const showConfirmPassword = ref(false);

const isLoading = ref(false);

async function updatePassword() {
    isLoading.value = true;
    const { error } = await AuthService.updatePassword(newPassword.value);
    
    if (error) {
        console.error('Error sending reset password email:', error);
        isLoading.value = false;
        return;
    }
    isLoading.value = false;
    resetPasswordEmailHasBeenSent.value = true;
}

const hashParams = getHashParamsObject(route.hash);
const error = hashParams.error;
const errorMessage = hashParams.error_description || 'An error occurred while processing your request.';
</script>

<style lang="scss">
.reset-password {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    
    &-title {
        font-size: 2rem;
        margin: 1.5rem;
        text-align: center;
    }

    &-error {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin : 2rem;

        &-title {
            font-size: 2rem;
            margin: 1.5rem;
        }

        &-subtitle {
            font-size: 1.2rem;
            margin: 0.5rem;
            text-align: center;
    
            p {
                margin: 0.4rem 0;
            }
        }
    }


    &-form {
        width: 300px;
        margin: 0 2rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        &-item {
            display: flex;
            flex-direction: column;
            margin: 0.8rem;
            min-height: 5.4rem;
            position: relative;

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
                min-width: 250px;

                &.invalid {
                    border-color: red;
                }
            }

            &-password-eye {
                position: absolute;
                right: 1rem;
                top: 2.2rem;
                cursor: pointer;
            }

            &-error {
                color: red;
                font-size: 1.2rem;
                margin-top: 0.5rem;
            }
        }

        &-submit {
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

    &-footer {
            display: flex;
            flex-direction: column;
                        
            &-link {
                font-size: 1rem;
                text-align: center;
                padding: 0.5rem 1rem;
            }
    }
}
</style>