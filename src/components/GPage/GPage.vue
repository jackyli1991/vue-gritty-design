<template>
  <div class="g-page h-full overflow-x-hidden p-5">
    <h2 v-if="props.title">{{ props.title }}</h2>
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  title: {
    type: String,
    default: '',
  },
})
</script>
