<script setup lang="ts">
import { ref } from 'vue'
import { GIcon, createIcon } from '@/components'
import { Button } from 'ant-design-vue'
const stopwatch = createIcon('streamline-sharp:stopwatch-solid')

const count = ref(0)

function handleClick() {
  count.value++
  console.log(count.value)
}
</script>

<template>
  <h1 class="text-blue-500 text-2xl font-bold">You did it!</h1>
  <p>
    Visit <a href="https://vuejs.org/" target="_blank" rel="noopener">vuejs.org</a> to read the
    documentation
    <GIcon name="ant-design:camera-filled" />
    <GIcon name="svg-spinners:90-ring-with-bg" color="red" />
    <stopwatch color="green" />
  </p>
  <Button type="primary" @click="handleClick">Primary Button</Button>
</template>

<style lang="scss" scoped></style>
