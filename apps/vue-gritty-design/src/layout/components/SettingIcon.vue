<template>
  <GIcon class="mr-2.5" :name="ICONIFY_ICONS.setting" @click="toggleSettingDrawer" />
  <aDrawer title="设置" v-model:open="visible" width="400px" :headerStyle="headerStyle">
    Setting
  </aDrawer>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { storeToRefs } from 'pinia'
import { Drawer as aDrawer } from 'ant-design-vue'
import { ICONIFY_ICONS } from '@/icons'
import { useLayoutStore } from '@/stores/layout'

defineOptions({
  name: 'SettingIcon',
})

const layoutStore = useLayoutStore()
const { headerHeight } = storeToRefs(layoutStore)

const visible = ref(false)
// 抽屉标题栏样式
const headerStyle = computed(() => ({
  height: `${headerHeight.value}px`,
  flex: 'none',
}))

// 切换抽屉显示状态
function toggleSettingDrawer() {
  visible.value = !visible.value
}
</script>
