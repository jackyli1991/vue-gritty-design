<template>
  <div class="table-design-designer table-design-wrapper">
    <div class="canvas-area">
      <LayoutDesign />
    </div>
  </div>
</template>

<script lang="ts" setup>
import LayoutDesign from './designer/LayoutDesign.vue'
</script>

<style scoped lang="scss">
.table-design-designer {
  overflow: hidden;
  flex: 1;
  .canvas-area {
    box-sizing: border-box;
    height: 100%;
    border: 1px dashed transparent;
    border-radius: 8px;
    background: #fafafa;
    background-image: radial-gradient(#e0e0e0 1px, transparent 1px);
    background-size: 20px 20px;
    position: relative;
  }
}
</style>
