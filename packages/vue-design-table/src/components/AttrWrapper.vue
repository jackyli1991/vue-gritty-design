<template>
  <div class="attr-wrapper">
    <div class="attr-title" v-if="title">
      <span class="content">
        <span class="title-text">{{ title }}</span>
        <aTag color="blue" v-if="componentName">{{ componentName }}</aTag>
      </span>
      <span class="more">
        <slot name="more"></slot>
      </span>
    </div>
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
import { Tag as aTag } from 'ant-design-vue'
defineOptions({
  name: 'AttrWrapper',
})

defineProps<{
  title: string
  componentName?: string
}>()
</script>

<style scoped lang="scss">
.attr-wrapper {
  padding: 8px;
  background: #fff;
  border-radius: 8px;
  margin-bottom: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  .attr-title {
    font-weight: 600;
    font-size: 14px;
    color: var(--vdt-font-color);
    margin-bottom: 12px;
    padding-bottom: 8px;
    border-bottom: 1px solid #f0f0f0;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    .content {
      flex: 1;
      display: flex;
      align-items: center;
      gap: 4px;
    }
  }
}
</style>
