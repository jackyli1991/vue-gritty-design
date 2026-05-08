<template>
  <div class="layout-attrs">
    <LayoutForm
      v-if="activeCanvasLayout"
      :formData="activeCanvasLayout"
      hideRequiredMark
      :cols="1"
      :disabledFields="['id']"
    />
  </div>
</template>

<script setup lang="ts">
import { useDesignContext } from '@/composables/useDesignContext'
import LayoutForm from '../form/LayoutForm.vue'

defineOptions({
  name: 'LayoutAttrs',
})

const { activeCanvasLayout } = useDesignContext()
</script>
