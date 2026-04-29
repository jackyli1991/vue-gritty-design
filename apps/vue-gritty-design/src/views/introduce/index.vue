<template>
  <aFloatButtonGroup>
    <IconsLibrary />
  </aFloatButtonGroup>
</template>

<script setup lang="ts">
import { FloatButtonGroup as aFloatButtonGroup } from 'ant-design-vue'

import IconsLibrary from './icons.vue' // 项目图标库实例

defineOptions({
  name: 'Introduce',
})
</script>
