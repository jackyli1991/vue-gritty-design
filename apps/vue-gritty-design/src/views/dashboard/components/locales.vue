<template>
  <aCard>
    <template #title>
      <span>{{ t('menu.internationalization') }}</span>
    </template>
    <aButton
      v-for="item in localeList"
      :key="item.value"
      class="mr-2"
      type="primary" @click="handleLocaleChange(item.value)">{{ item.label }}</aButton>
  </aCard>
</template>

<script setup lang="ts">
import {
  Card as aCard,
  Button as aButton,
} from 'ant-design-vue'
import { useLocale } from '@/composables'
import { localeList, setLocale, type LocaleType } from '@/locales'

const { t } = useLocale()

// 切换语言
const handleLocaleChange = (locale: string) => {
  setLocale(locale as LocaleType)
}
</script>
