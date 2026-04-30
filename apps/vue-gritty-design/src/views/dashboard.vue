<template>
  <GPage>
    <aRow :gutter="12">
      <aCol :span="12" class="mb-3">
        <aCard>
          <template #title>
            <span>技术栈</span>
          </template>
          <aTag
            v-for="(version, name) in dependencies"
            :key="name"
            class="mb-2!"
            color="success">{{ name }}{{ version }}</aTag>
        </aCard>
      </aCol>
      <aCol :span="12">
        <aCard>
          <template #title>
            <aBadge :count="totalIcons">
              <span>Iconfiny字体图标</span>
            </aBadge>
          </template>
          <aCardGrid
            v-for="icon in icons"
            :key="icon"
            style="width: 10%; text-align: center; padding: 8px 0; font-size: 0"
          >
            <GIcon :name="icon" :size="24" />
          </aCardGrid>
        </aCard>
      </aCol>
      <aCol :span="12">
        <aCard>
          <template #title>
            <span>组件loading</span>
          </template>
          <GLoading :show="loading">
            <aButton @click="endLoading">结束loading</aButton>
          </GLoading>
          <aButton type="primary" @click="startLoading">开始loading</aButton>
        </aCard>
      </aCol>
      <aCol :span="12">
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
      </aCol>
    </aRow>
  </GPage>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import {
  Row as aRow,
  Col as aCol,
  Button as aButton,
  Badge as aBadge,
  Card as aCard,
  CardGrid as aCardGrid,
  Tag as aTag,
} from 'ant-design-vue'
import { useLoading } from '@/composables'
import { ICONIFY_ICONS } from '@/icons'
import { localeList, setLocale, type LocaleType } from '@/locales'
import { useLocale } from '@/composables'
import PackageJson from '../../package.json'

const { dependencies } = PackageJson

const { t } = useLocale()

const { loading, startLoading, endLoading } = useLoading()

// 截取前19个图标
const icons = computed(() => {
  const values = Object.values(ICONIFY_ICONS)
  return values.slice(0, 19)
})

// 图标总数
const totalIcons = computed(() => {
  return Object.keys(ICONIFY_ICONS).length
})

// 切换语言
const handleLocaleChange = (locale: string) => {
  setLocale(locale as LocaleType)
}
</script>
