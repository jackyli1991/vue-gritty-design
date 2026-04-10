<script setup lang="ts">
import { GIcon, createIcon } from '@/components'

const stopwatch = createIcon('streamline-sharp:stopwatch-solid')
</script>

<template>
  <h1>You did it!</h1>
  <p>
    Visit <a href="https://vuejs.org/" target="_blank" rel="noopener">vuejs.org</a> to read the
    documentation
    <GIcon name="ant-design:camera-filled" />
    <GIcon name="svg-spinners:90-ring-with-bg" color="red" />
    <stopwatch color="green" />
  </p>
</template>

<style scoped></style>
