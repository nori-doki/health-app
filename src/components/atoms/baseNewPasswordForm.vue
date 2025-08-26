<template>
    <div class="new-password-form">
        <label for="password">Password *</label>
        <input :type="passwordInputType" id="password" name="password" required v-model="localPassword" autocomplete="new-password">
        <div class="new-password-form-password-eye password-eye">
            <i v-if="showPassword" @click="$emit('toggleShowPassword')" class="pi pi-eye"></i>
            <i v-else @click="$emit('toggleShowPassword')" class="pi pi-eye-slash"></i>
        </div>
        <ul class="new-password-form-password-requirements">
            <p>Password must contain:</p>
            <li :class="{ 'valid': passwordHasLowercase }">
                At least one lowercase 
                <span v-show="passwordHasLowercase">✅</span>
            </li>
            <li :class="{ 'valid': passwordHasUppercase }">
                At least one uppercase 
                <span v-show="passwordHasUppercase">✅</span>
            </li>
            <li :class="{ 'valid': passwordHasNumeric }">
                At least one numeric 
                <span v-show="passwordHasNumeric">✅</span>
            </li>
            <li :class="{ 'valid': passwordHasSpecialCharacter }">
                At least one special character 
                <span v-show="passwordHasSpecialCharacter">✅</span>
            </li>
            <li :class="{ 'valid': passwordIs8CharactersLong }">
                Minimum 8 characters 
                <span v-show="passwordIs8CharactersLong">✅</span>
            </li>
        </ul>
    </div>
    <div class="new-password-form">
        <label for="confirmPassword">Confirm Password *</label>
        <input :type="confirmPasswordInputType" id="confirmPassword" name="confirmPassword" required v-model="localConfirmPassword" :class="{ 'invalid': localConfirmPassword.length > 0 && !passwordsMatch }"  autocomplete="new-password">
        <div class="new-password-form-password-eye confirm-password-eye">
            <i v-if="showConfirmPassword" @click="$emit('toggleShowConfirmPassword')" class="pi pi-eye"></i>
            <i v-else @click="$emit('toggleShowConfirmPassword')" class="pi pi-eye-slash"></i>
        </div>
        <p v-show="localConfirmPassword.length > 0 && !passwordsMatch" class="new-password-form-error">Passwords do not match.</p>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
    password: String,
    confirmPassword: String,
    passwordInputType: String,
    confirmPasswordInputType: String,
    showPassword: Boolean,
    showConfirmPassword: Boolean,
    passwordHasLowercase: Boolean,
    passwordHasUppercase: Boolean,
    passwordHasNumeric: Boolean,
    passwordHasSpecialCharacter: Boolean,
    passwordIs8CharactersLong: Boolean,
    passwordsMatch: Boolean
});

const emit = defineEmits([
    'update:password',
    'update:confirmPassword',
    'toggleShowPassword',
    'toggleShowConfirmPassword',
]);

const localPassword = ref(props.password);
const localConfirmPassword = ref(props.confirmPassword);

watch(localPassword, (newVal) => emit('update:password', newVal));
watch(localConfirmPassword, (newVal) => emit('update:confirmPassword', newVal));
</script>

<style lang="scss">
.new-password-form {
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
                min-width: 250px;

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

            &-password-requirements {
                font-size: $font-small;
                margin-top: 0.6rem;
                list-style-type: disc;
                padding-left: 0;

                li {
                    margin: 0.3rem 0 0.3rem 1rem;
                }

                .valid {
                    color: green;
                }
            }

            &-password-eye {
                position: absolute;
                right: 1rem;
                top: 2.2rem;
                cursor: pointer;
            }
        }
</style>