<template>
  <div class="layout">
    <NavBar />
    <div class="content"><slot /></div>
  </div>
</template>

<script setup>
import NavBar from '$components/NavBar.vue'
</script>

