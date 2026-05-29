<template>
  <GPage>
    <aRow :gutter="12">
      <aCol v-for="comp in compMaps" :key="comp.name" :span="12" class="mb-3">
        <component :is="comp" />
      </aCol>
    </aRow>
  </GPage>
</template>

<script setup lang="ts">
import { Row as aRow, Col as aCol } from 'ant-design-vue'

import Technology from './components/technology.vue' // 技术栈
import Iconfiny from './components/iconfiny.vue' // 图标库
import Loading from './components/loading.vue' // 加载组件
import Locales from './components/locales.vue' // 国际化
import Readme from './components/readme.vue' // 项目说明

const compMaps = [Technology, Iconfiny, Loading, Locales, Readme]
</script>
