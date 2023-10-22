<template>
<nav>
  <div class="navigation">
    <a href="/" class="logo">
      <img src="@assets/images/logo.svg" height="64" width="64" alt="logo" />
    </a>
    <Link href="/">Home</Link>
    <Link href="/about">About</Link>
  </div>
</nav>
</template>
<script setup>
import Link from './Link.vue'
</script>