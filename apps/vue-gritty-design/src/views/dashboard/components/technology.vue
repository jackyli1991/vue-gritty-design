<template>
  <aCard hoverable>
    <template #title>
      <span>技术栈</span>
    </template>
    <aTag
      v-for="(version, name) in dependencies"
      :key="name"
      class="mb-2!"
      color="success">{{ name }}{{ version }}</aTag>
  </aCard>
</template>

<script setup lang="ts">
import {
  Card as aCard,
  Tag as aTag,
} from 'ant-design-vue'

import PackageJson from '../../../../package.json'

const { dependencies } = PackageJson
</script>
