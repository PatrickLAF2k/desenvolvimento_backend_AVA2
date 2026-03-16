<script setup lang="ts">
import { useRoute } from 'vue-router';
import SideMenu from './components/SideMenu.vue'

const route = useRoute();

</script>

<template>
  <main class="main">
    <SideMenu v-if="!route.meta.hideSidebar" />

    <div :class="['content', { 'full-width': route.meta.hideSidebar }]">
      <router-view />
    </div>
  </main>
</template>

<style scoped>
.main {
  display: flex;
}
</style>
