<template>
    <div class="base-chip">
        <div class="base-chip-color" :class="chipColor"></div>
    </div>
</template>

<script setup>
import { computed } from 'vue';
const props = defineProps({
    value: { 
        type: Number, 
        default: null 
    },
});
const chipColor = computed(() => {
    if(props.value === null) return '--grey';
    if(props.value !== null && props.value < 50) return '--red';
    if(50 <= props.value  && props.value < 80) return '--orange';
    if(props.value >= 80) return '--green';
});
</script>

<style lang="scss">
.base-chip {
    &-color {
        width: 20px;
        height: 20px;
        border-radius: 50%;
        box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);

        &.--grey {
            background-color: $base-light-grey;
            background: $gradient-light-grey;
            border: 1px solid $base-light-grey;
        }
        &.--red {
            background-color: $base-red;
            background: $gradient-red;
            border: 1px solid $base-red;
        }
        &.--orange {
            background-color: $base-orange;
            background: $gradient-orange;
            border: 1px solid $base-orange;
        }
        &.--green {
            background-color: $base-green;
            background: $gradient-green;
            border: 1px solid $base-green;
        }
    }
}

</style>