<template>
  <div class="layout-content">
    <router-view />
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: 'LayoutContent',
})
</script>

<style scoped lang="scss">
.layout-content {
  height: 2000px;
  margin: 12px;
  background-color: #fff;
  border-radius: 8px;
}
</style>
