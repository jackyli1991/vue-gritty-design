<template>
  <GIcon class="mr-2.5" :name="ICONIFY_ICONS.setting" @click="toggleSettingDrawer" />
  <aDrawer :title="t('menu.settings')" v-model:open="visible" width="400px" :headerStyle="headerStyle">
    Setting
    <template #footer>
      <div>
        <Button block type="text" @click="logout">{{ t('login.loginoutButton') }}</Button>
      </div>
    </template>
  </aDrawer>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { storeToRefs } from 'pinia'
import { Drawer as aDrawer, Button   } from 'ant-design-vue'
import { ICONIFY_ICONS } from '@/icons'
import { useLayoutStore } from '@/stores/layout'
import { useUserStore } from '@/stores/user'
import { useLocale } from '@/composables'

defineOptions({
  name: 'SettingIcon',
})

const { t } = useLocale()

const layoutStore = useLayoutStore()
const { headerHeight } = storeToRefs(layoutStore)

const { logout } = useUserStore()

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
