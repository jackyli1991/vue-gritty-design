<template>
  <div class="h-full p-4">
    <div class="h-full">
      <router-view />
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: 'LayoutContent',
})
</script>

<style scoped lang="scss"></style>
