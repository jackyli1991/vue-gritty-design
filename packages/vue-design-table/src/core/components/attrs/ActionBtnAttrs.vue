<template>
  <AttrWrapper title="属性" :componentName="activeCanvasElement?.name">
    <ButtonForm :formData="formData" :cols="1"></ButtonForm>
  </AttrWrapper>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { ButtonProps } from '@/types'
import { useDesignContext } from '@/composables/useDesignContext'
import ButtonForm from '@/core/components/form/ButtonForm.vue'
import AttrWrapper from '@/components/AttrWrapper.vue'

defineOptions({
  name: 'ActionBtnAttrs',
})

const { activeCanvasElement } = useDesignContext()

const formData = computed(() => (activeCanvasElement.value?.props || {}) as ButtonProps)
</script>
