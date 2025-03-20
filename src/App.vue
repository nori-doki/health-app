
<template>
  <div id="app">
    <component :is="layout">
      <router-view></router-view>
    </component>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import Default from './views/layouts/Default.vue';

const route = useRoute();

const layout = computed(() => {
  if (route.meta.layout === 'default') return Default;
  return 'div';
});
</script>

<style lang="scss">
#app{
  overflow: auto;
}
</style>
