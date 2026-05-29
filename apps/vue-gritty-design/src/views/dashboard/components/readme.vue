<template>
  <aCard hoverable>
    <template #title>
      <span>项目说明</span>
    </template>
    <div class="markdown-body" v-html="renderedContent"></div>
  </aCard>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Card as aCard } from 'ant-design-vue'
import { marked } from 'marked'
import README from '../../../../README.md?raw'

marked.setOptions({
  breaks: true,
  gfm: true,
})

const renderedContent = computed(() => {
  if (!README) return ''
  return marked.parse(README) as string
})
</script>
