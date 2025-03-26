<template>
    <div class="burger-menu">
        <Slide width="250">
            <a v-for="item in menuItems" :id="item.id" :href="item.href">
                <i :class="item.icon"></i><span>{{ item.text }}</span>
            </a>

        </Slide>
    </div>
</template>

<script setup>
import { Slide } from 'vue3-burger-menu'; 
import { computed } from 'vue';

const viewportWidth = computed(() => 250 );

const menuItems = [
    { id: 'home', icon: 'pi pi-home', text: 'Home', href: '/home' },
    { id: 'analytics', icon: 'pi pi-chart-bar', text: 'Analytics', href: '/analytics' },
    { id: 'profile', icon: 'pi pi-user', text: 'Profile', href: '/profile' }
];
</script>

<style lang="scss">
.burger-menu {
    .bm-menu {
        background-color: white;
        
        .bm-item-list, span {
            color: black;
            font-weight: 500;
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