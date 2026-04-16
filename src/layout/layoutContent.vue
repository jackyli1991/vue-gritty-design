<template>
  <div class="layout-content">
    <Button type="primary">按钮</Button>
  </div>
</template>

<script setup lang="ts">
import { Button } from 'ant-design-vue'

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
