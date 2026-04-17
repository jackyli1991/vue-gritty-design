<template>
  <div>
    <h1>list1_id_type：{{ params }}</h1>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()
const params = ref(route.params)
</script>
