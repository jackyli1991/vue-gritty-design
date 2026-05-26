<template>
  <div class="model-list h-full flex flex-col bg-white rounded-lg border border-gray-200">
    <!-- 搜索栏 -->
    <div class="p-4 border-b border-gray-100">
      <a-input-search
        v-model:value="searchKeyword"
        placeholder="搜索大模型"
        allow-clear
        @search="handleSearch"
      />
    </div>

    <!-- 模型列表 -->
    <div class="flex-1 overflow-y-auto p-2">
      <div
        v-for="model in filteredModels"
        :key="model.id"
        class="model-item p-3 mb-2 rounded-lg cursor-pointer transition-all duration-200"
        :class="{
          'bg-blue-50 border-blue-200': selectedId === model.id,
          'hover:bg-gray-50 border-transparent': selectedId !== model.id,
        }"
        :style="{ border: '1px solid ' + (selectedId === model.id ? '#bae6fd' : 'transparent') }"
        @click="selectModel(model)"
      >
        <div class="flex items-center gap-3">
          <!-- 模型头像 -->
          <a-avatar
            :src="model.avatar"
            :size="40"
            :style="{ backgroundColor: model.avatar ? 'transparent' : model.color || '#1890ff' }"
          >
            <template v-if="!model.avatar">
              {{ model.name.charAt(0) }}
            </template>
          </a-avatar>

          <div class="flex-1 min-w-0">
            <!-- 模型名称 -->
            <div class="font-medium text-gray-800 truncate">{{ model.name }}</div>
            <!-- 模型描述 -->
            <div class="text-xs text-gray-500 truncate mt-0.5">{{ model.description }}</div>
          </div>

          <!-- 在线状态 -->
          <a-badge
            :status="model.status === 'online' ? 'success' : 'default'"
            :text="model.status === 'online' ? '在线' : '离线'"
            class="flex-shrink-0"
          />
        </div>

        <!-- 标签 -->
        <div class="flex gap-1 mt-2 flex-wrap">
          <a-tag v-for="tag in model.tags" :key="tag" size="small" class="text-xs">
            {{ tag }}
          </a-tag>
        </div>
      </div>

      <!-- 空状态 -->
      <a-empty v-if="filteredModels.length === 0" description="暂无模型" class="mt-8" />
    </div>

    <!-- 底部统计 -->
    <div class="p-3 border-t border-gray-100 text-xs text-gray-500 text-center">
      共 {{ models.length }} 个大模型
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Model } from '../types'

const props = defineProps<{
  models: Model[]
  selectedId?: string
}>()

const emit = defineEmits<{
  select: [model: Model]
}>()

const searchKeyword = ref('')

// 过滤后的模型列表
const filteredModels = computed(() => {
  if (!searchKeyword.value.trim()) {
    return props.models
  }
  const keyword = searchKeyword.value.toLowerCase()
  return props.models.filter(
    (model) =>
      model.name.toLowerCase().includes(keyword) ||
      model.description.toLowerCase().includes(keyword) ||
      model.tags.some((tag) => tag.toLowerCase().includes(keyword)),
  )
})

// 选择模型
function selectModel(model: Model) {
  emit('select', model)
}

// 搜索
function handleSearch() {
  // 搜索逻辑已在 computed 中实现
}
</script>

<style scoped lang="scss">
.model-list {
  .model-item {
    &:hover {
      transform: translateX(2px);
    }
  }
}
</style>
