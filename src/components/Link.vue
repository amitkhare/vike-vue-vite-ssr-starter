<template>
  <a :class="{ active: pageContext.urlPathname === $attrs.href }">
    <slot />
  </a>
</template>
<style scoped>

</style>
<script setup>
import { usePageContext } from '$renderer/usePageContext'
const pageContext = usePageContext()
</script>
