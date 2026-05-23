<template>
  <AttrWrapper title="布局属性" v-if="activeCanvasLayout">
    <LayoutForm
      :formData="activeCanvasLayout"
      hideRequiredMark
      :cols="1"
      :disabledFields="['id']"
    />
  </AttrWrapper>
</template>

<script setup lang="ts">
import { useDesignContext } from '@/composables/useDesignContext'
import AttrWrapper from '@/components/AttrWrapper.vue'
import LayoutForm from '../form/LayoutForm.vue'

defineOptions({
  name: 'LayoutAttrs',
})

const { activeCanvasLayout } = useDesignContext()
</script>
