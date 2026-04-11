<script setup lang="ts">
// import { ref } from 'vue'
import { GIcon, createIcon } from '@/components'
import { Button } from 'ant-design-vue'
import { useCounterStore } from './stores/counter'
import { storeToRefs } from 'pinia'
const stopwatch = createIcon('streamline-sharp:stopwatch-solid')

const counterStore = useCounterStore()
const { count, doubleCount } = storeToRefs(counterStore) // 数据：storeToRefs 解构
const { increment } = counterStore // 方法：直接解构赋值

function handleClick() {
  increment()
}
</script>

<template>
  <h1 class="text-blue-500 text-2xl font-bold">
    count: {{ count }}, doubleCount: {{ doubleCount }}
  </h1>
  <p>
    Visit <a href="https://vuejs.org/" target="_blank" rel="noopener">vuejs.org</a> to read the
    documentation
    <GIcon name="ant-design:camera-filled" />
    <GIcon name="svg-spinners:90-ring-with-bg" color="red" />
    <stopwatch color="green" />
  </p>
  <Button type="primary" @click="handleClick">increment Button</Button>
</template>

<style lang="scss" scoped></style>
