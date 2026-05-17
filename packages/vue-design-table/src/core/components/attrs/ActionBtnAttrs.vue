<template>
  <div>
    <AttrWrapper title="操作按钮" :componentName="formData?.name">
      操作按钮
    </AttrWrapper>
  </div>
</template>

<script setup lang="ts">
import { useDesignContext } from '@/composables/useDesignContext'
import AttrWrapper from '@/components/AttrWrapper.vue'

const { activeCanvasElement: formData } = useDesignContext()

defineOptions({
  name: 'ActionBtnAttrs',
})
</script>
