<!-- 图标库说明 -->
<template>
  <div>
    <aFloatButton type="primary" icon="plus" @click="modalOpen = true">
      <template #icon>
        <GIcon class="p-[0] hover:bg-transparent" :name="ICONIFY_ICONS.font" />
      </template>
    </aFloatButton>
    <a-modal v-model:open="modalOpen" width="80vw" :footer="null">
      <iConfiny show-title :max-height="400" />
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ICONIFY_ICONS } from '@/icons'
import { Modal as aModal, FloatButton as aFloatButton } from 'ant-design-vue'
import iConfiny from '@/views/dashboard/components/iconfiny.vue'

defineOptions({
  name: 'IconsLibrary',
})

const modalOpen = ref(false)
</script>
