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
    if(props.value && props.value < 60) return '--orange';
    if(60 <= props.value  && props.value < 80) return '--yellow';
    if(props.value >= 80) return '--green';
});
</script>
<style lang="scss">
.base-chip {
    &-color {
        width: 20px;
        height: 20px;
        border-radius: 50%;
        margin-left: 5px;
        box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);

        &.--grey {
            background-color: $base-light-grey;
        }
        &.--orange {
            background-color: $base-pink;
        }
        &.--yellow {
            background-color: $base-yellow;
        }
        &.--green {
            background-color: $base-green;
        }
    }
}

</style>