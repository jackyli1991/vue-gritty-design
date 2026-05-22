<template>
  <AttrWrapper title="操作按钮">
    <template #more>
      <aButton v-if="checkIds.length >= 2" @click="handleMergeGroup" size="small"
        >合并按钮组</aButton
      >
    </template>
    <FormWrapper :form-data="attrs">
      <aRow>
        <aCol :span="12">
          <aFormItem label="按钮间距" name="btnGap">
            <aInputNumber
              v-model:value="attrs.btnGap"
              style="width: 100%"
              :min="0"
              :max="20"
              :step="1"
              placeholder="单位:px"
            />
          </aFormItem>
        </aCol>
      </aRow>
    </FormWrapper>
    <ul class="action-column_btns">
      <li v-for="btn in actionBtnGroups" :key="btn.id">
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
            <div v-if="'button' in btn" class="title">
              <aButton v-bind="btn.button">{{ btn.button.content }}</aButton>
              <IconifyIcon
                icon="material-symbols:delete"
                @click="handleDeleteGroup(btn.id)"
              ></IconifyIcon>
            </div>
            <ul v-if="'children' in btn" class="action-column_btns">
              <li v-for="item in btn.children" :key="item.id">
                <ActionBtn :showCheckBox="false" :btn="item" @delete="handleDelete"></ActionBtn>
              </li>
            </ul>
          </div>
        </template>
      </li>
      <li v-if="!actionBtnGroups.length">
        <aEmpty description="请添加【操作按钮】到表格。"></aEmpty>
      </li>
    </ul>
  </AttrWrapper>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import {
  Button as aButton,
  Empty as aEmpty,
  Row as aRow,
  Col as aCol,
  FormItem as aFormItem,
  InputNumber as aInputNumber,
} from 'ant-design-vue'
import type { CanvasElement, ColumnProps } from '@/types'
import { ColumnType } from '@/types'
import AttrWrapper from '@/components/AttrWrapper.vue'
import IconifyIcon from '@/components/IconifyIcon.vue'
import ActionBtn from './ActionBtn.vue'
import FormWrapper from '../FormWrapper.vue'
import { useDesignContext } from '@/composables/useDesignContext'
import { createActionBtnGroup } from '@/core/components/designer'

const {
  actionBtnGroups,
  // getTableElements,
  activeCanvasElement,
  deleteElement,
  addActionBtnGroup,
  deleteActionBtnGroup,
} = useDesignContext()

const checkIds = ref<string[]>([])

const attrs = computed<ColumnProps>(() => {
  return (activeCanvasElement.value?.props || {}) as ColumnProps
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
