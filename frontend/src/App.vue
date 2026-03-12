<script setup lang="ts">
import SideMenu from './components/SideMenu.vue'

</script>

<template>
  <main class="main">

    <SideMenu />

    <div>
      <router-view />
    </div>

  </main>
</template>

<style scoped>
.main {
  display: flex;
}
</style>
