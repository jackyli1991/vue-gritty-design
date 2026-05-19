<template>
  <AttrWrapper title="操作按钮">
    {{ checkIds }} {{ actionBtnGroups }}
    <template #more>
      <aButton v-if="checkIds.length >= 2" size="small" @click="handleMergeGroup"
        >合并按钮组</aButton
      >
    </template>
    <ul class="action-column_btns">
      <li v-for="btn in actionBtns" :key="btn.id">
        <template v-if="(btn as CanvasElement).type === ColumnType.ActionBtn">
          <ActionBtn
            :checked="checkIds.includes(btn.id)"
            :btn="btn"
            @check="handleCheck"
            @delete="handleDelete"
          ></ActionBtn>
        </template>
        <!-- 分组 -->
        <template v-else>
          <div class="action-column_group">
            <div class="title">
              <aButton v-bind="btn.button">{{ btn.button.content }}</aButton>
              <IconifyIcon
                icon="material-symbols:delete"
                @click="handleDeleteGroup(btn.id)"
              ></IconifyIcon>
            </div>
            <ul class="action-column_btns">
              <li v-for="item in btn.children" :key="item.id">
                <ActionBtn :showCheckBox="false" :btn="item" @delete="handleDelete"></ActionBtn>
              </li>
            </ul>
          </div>
        </template>
      </li>
      <li v-if="!actionBtns.length">
        <aEmpty description="请添加【操作按钮】到表格。"></aEmpty>
      </li>
    </ul>
  </AttrWrapper>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import { Button as aButton, Empty as aEmpty } from 'ant-design-vue'
import type { CanvasElement, ActionBtnGroup } from '@/types'
import { ColumnType } from '@/types'
import AttrWrapper from '@/components/AttrWrapper.vue'
import IconifyIcon from '@/components/IconifyIcon.vue'
import ActionBtn from './ActionBtn.vue'
import { useDesignContext } from '@/composables/useDesignContext'
import { isObject, isString } from '@/utils'
import { createActionBtnGroup } from '@/core/components/designer'

const {
  actionBtnGroups,
  getTableElements,
  deleteElement,
  addActionBtnGroup,
  deleteActionBtnGroup,
} = useDesignContext()

const checkIds = ref<string[]>([])

// 所有表格操作按钮，按照分组顺序和嵌套重新排列
const actionBtns = computed(() => {
  const btns = getTableElements().filter(
    (item: CanvasElement) => item.type === ColumnType.ActionBtn,
  )
  return actionBtnGroups.value.map((item) => {
    if (isString(item)) {
      return btns.find((btn) => btn.id === item)
    } else if (isObject(item) && (item as ActionBtnGroup).children) {
      return {
        ...(item as ActionBtnGroup),
        children: (item as ActionBtnGroup).children.map((btnId) => {
          return btns.find((btn) => btn.id === btnId)
        }),
      }
    }
  })
})

// 选中按钮
function handleCheck(id: string) {
  if (checkIds.value.includes(id)) {
    checkIds.value.splice(checkIds.value.indexOf(id), 1)
  } else {
    checkIds.value.push(id)
  }
}

// 删除元素
function handleDelete(id: string) {
  deleteElement(id)
}

// 合并按钮分组
function handleMergeGroup() {
  addActionBtnGroup(createActionBtnGroup(), checkIds.value)
  checkIds.value = []
}

// 删除按钮分组
function handleDeleteGroup(id: string) {
  deleteActionBtnGroup(id)
}
</script>

<style lang="scss" scoped>
.action-column_btns {
  .action-column_group {
    padding: 6px;
    padding-left: 10px;
    border: 1px solid #f2f2f2;
    border-radius: 6px;
    margin-bottom: 4px;
    .title {
      padding: 8px 0;
      margin-bottom: 10px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
}
</style>
