<template>
  <aDropdown placement="bottom" arrow>
    <GIcon class="mr-2.5" :name="ICONIFY_ICONS.language" />
    <template #overlay>
      <aMenu @click="handleMenuClick">
        <aMenu.Item v-for="item in localeList" :key="item.value" :value="item.value">
          <span
            :style="{
              color: locale === item.value ? themeColor : 'inherit',
            }"
          >
            {{ item.label }}
          </span>
        </aMenu.Item>
      </aMenu>
    </template>
  </aDropdown>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import type { MenuProps } from 'ant-design-vue'
import { Dropdown as aDropdown, Menu as aMenu } from 'ant-design-vue'
import { ICONIFY_ICONS } from '@/icons'
import { localeList, setLocale, type LocaleType } from '@/locales'
import { useLocale } from '@/composables'
import { useLayoutStore } from '@/stores/layout'

// 主题色
const layoutStore = useLayoutStore()
const { themeColor } = storeToRefs(layoutStore)

const { locale } = useLocale()

const handleMenuClick: MenuProps['onClick'] = ({ key }) => {
  setLocale(key as LocaleType)
}
</script>

<style scoped lang="scss">
.active-locale {
  color: #1890ff;
}
</style>
