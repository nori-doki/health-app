<template>
    <div class="burger-menu">
        <Slide 
            width="250" 
            :isOpen="isOpen" 
            @openMenu="isOpen = true"
            @closeMenu="isOpen = false" 
        >
            <div class="burger-menu-items" v-if="!isLoading">
                <a v-for="item in menuItems" :id="item.id" @click="handleMenuItemClick(item)" :key="item.id">
                    <i :class="item.icon"></i><span>{{ item.text }}</span>
                </a>
            </div>
            <div v-else class="loader"></div>
        </Slide>
    </div>
</template>

<script setup>
import { Slide } from 'vue3-burger-menu'; 
import { useRouter } from 'vue-router';
import { AuthService } from '@/services/auth.service';
import { ref } from 'vue';

const router = useRouter();

const menuItems = [
    { id: 'home', icon: 'pi pi-home', text: 'Home', href: '/home' },
    { id: 'analytics', icon: 'pi pi-chart-bar', text: 'Analytics', href: '/analytics' },
    { id: 'profile', icon: 'pi pi-user', text: 'Profile', href: '/profile' },
    { id: 'logout', icon: 'pi pi-sign-out', text: 'Logout' }
];

const isOpen = ref(false);
const isLoading = ref(false);

async function handleMenuItemClick(item) {
    isLoading.value = true;
    if(item.id === 'logout') {
        const { error } = await AuthService.logOut();
        if (error) {
            console.error('Logout error:', error);
        } else {
            router.push('/');
        }
    } else {
        isLoading.value = false;
        isOpen.value = false;
        router.push(item.href);
    }
};
</script>

<style lang="scss">
.burger-menu {
    .bm-menu {
        background-color: white;
        
        .bm-item-list, span {
            color: black;
            font-weight: 500;
        }

        .bm-item-list > .burger-menu-items {
            display: flex;
            flex-direction: column;

            a {
                padding: 1rem 0;

                i {
                    margin-right: 0.7rem;
                }
            }
        }

        .bm-cross-button.cross-style {
            .bm-cross {
                height: 1.5rem !important;
            }
        }
    }

    .bm-burger-button {
        height: 1.4rem;
        width: 1.4rem;
        left: 20px;
        top: 24px;
        .bm-burger-bars.line-style {
            border-radius: 1.5rem;
            height : 2px;
        }
    }
}
</style>