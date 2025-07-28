<template>
    <div class="login">
        <h1 class="login-title">
            Login
        </h1>
        <form @submit.prevent="handleLogin" class="login-form">
            <div class="login-form-item">
                <label for="email">Email *</label>
                <input type="email" id="email" name="email" required v-model="email" :valid="emailIsValid"
                :class="{ 'invalid': email.length > 0 && !emailIsValid }" autocomplete="username">
                <p v-show="email.length > 0 && !emailIsValid" class="sign-up-form-item-error">Your email is not valid.</p>
                <p v-if="resetPasswordEmailHasBeenSent" style="margin-top: 0.3rem">
                    A reset password email has been sent to your email address ✅
                </p>
            </div>
            <div v-if="!isPasswordForgotten" class="login-form-item">
                <label for="password">Password *</label>
                <input :type="passwordInputType" id="password" name="password" required v-model="password">
                <div class="login-form-item-password-eye" autocomplete="current-password">
                    <i v-if="showPassword" @click="showPassword = !showPassword" class="pi pi-eye"></i>
                    <i v-else @click="showPassword = !showPassword" class="pi pi-eye-slash"></i>
                </div>
                <p v-show="loginError" class="login-form-item-error">Invalid email or password.</p>
            </div>
            <div v-if="!isLoading">
                <Button v-if="!isPasswordForgotten" type="submit" class="login-form-submit" 
                    :disabled="!isReadyToSubmit"
                >Login</Button>
                <Button v-else @click="sendResetPasswordEmail" class="login-form-submit"
                    :disabled="!emailIsValid"
                >Send Reset Password Email</Button>
            </div>
            <div v-else class="loader"></div>
            <div class="login-footer">
                <a class="login-footer-link" @click="handlePasswordForgotten" >Forgot password ?</a>
                <a class="login-footer-link" href="/signUp">Don't have an account? Sign up here.</a>
            </div>
        </form>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { AuthService } from '@/services/auth.service';

const router = useRouter();

const email = ref('');
const password = ref('');
const showPassword = ref(false);
const passwordInputType = computed(() => showPassword.value ? 'text' : 'password');
const emailIsValid = computed(() => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailRegex.test(email.value);
});

const isReadyToSubmit = computed(() => emailIsValid.value && password.value.length > 0);

const loginError = ref(false);
const isLoading = ref(false);


async function handleLogin() {
    loginError.value = false;
    isLoading.value = true;
    const payload = {
        email: email.value.toLocaleLowerCase(),
        password: password.value,
    };
    const { user, session, error } = await AuthService.logIn(payload);
    if (error) {
        loginError.value = true;
        console.error('Error logging in:', error);
        isLoading.value = false;
        return;
    }
    if (user) {
        console.log('User logged in:', user);
    }
    if (session) {
        console.log('Session:', session);
    }
    router.push('/home');
};

const isPasswordForgotten = ref(false);
const resetPasswordEmailHasBeenSent = ref(false);

function handlePasswordForgotten() {
    isPasswordForgotten.value = true;
}

async function sendResetPasswordEmail() {
    isLoading.value = true;
    const { error } = await AuthService.sendPasswordResetEmail(email.value);
    
    if (error) {
        console.error('Error sending reset password email:', error);
        isLoading.value = false;
        return;
    }
    isLoading.value = false;
    resetPasswordEmailHasBeenSent.value = true;
}
</script>

<style lang="scss">
.login {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    
    &-title {
        font-size: 2rem;
        margin: 1.5rem;
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