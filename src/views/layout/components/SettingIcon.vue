<template>
  <GIcon class="mr-2.5" :name="ICONIFY_ICONS.setting" />
</template>

<script setup lang="ts">
import { GIcon } from '@/components'
import { ICONIFY_ICONS } from '@/icons'

defineOptions({
  name: 'SettingIcon',
})
</script>
