<template>
  <AttrWrapper title="操作按钮">
    <template v-if="checkIds.length >= 2" #more>
      <aButton @click="handleMergeGroup" size="small">合并按钮组</aButton>
    </template>
    <ActionBtnGroupForm :formData="formData"></ActionBtnGroupForm>
    <VueDraggable
      tag="ul"
      class="action-column_btns"
      :animation="150"
      :modelValue="actionBtnsList"
      handle=".draggable-handle"
      group="action-column_btns"
      @update:modelValue="handleSort"
    >
      <li v-for="btn in actionBtnsList" :key="btn as string">
        <template v-if="isString(btn)">
          <ActionBtnGroupLine
            :checked="checkIds.includes(btn as string)"
            :btnId="btn as string"
            @check="handleCheck"
            @delete="handleDelete"
            @click="handleShowModal(btn as string)"
          ></ActionBtnGroupLine>
        </template>
        <!-- 分组 -->
        <template v-else>
          <div class="action-column_group">
            <div v-if="'button' in (btn as ActionBtnGroup)" class="title">
              <ActionButton v-bind="(btn as ActionBtnGroup).button" @click="handleShowModal(btn)">{{
                (btn as ActionBtnGroup).button.content
              }}</ActionButton>
              <span class="tools">
                <IconifyIcon
                  icon="material-symbols:delete"
                  @click="handleDeleteGroup((btn as ActionBtnGroup).id as string)"
                ></IconifyIcon>
                <IconifyIcon
                  class="draggable-handle"
                  icon="material-symbols:drag-indicator"
                ></IconifyIcon>
              </span>
            </div>
            <template v-if="'children' in (btn as ActionBtnGroup)">
              <VueDraggable
                class="action-column_btns"
                :modelValue="(btn as ActionBtnGroup).children"
                :animation="150"
                group="action-column_btns"
                handle=".draggable-handle"
                @update:modelValue="handleGroupSort((btn as ActionBtnGroup).id, $event)"
              >
                <div v-for="childBtn in (btn as ActionBtnGroup).children" :key="childBtn">
                  <ActionBtnGroupLine
                    :showCheckBox="true"
                    :btnId="childBtn"
                    :checked="checkIds.includes(childBtn)"
                    @check="handleCheck"
                    @delete="handleDelete"
                    @click="handleShowModal(childBtn)"
                  ></ActionBtnGroupLine>
                </div>
              </VueDraggable>
            </template>
          </div>
        </template>
      </li>
      <li v-if="!actionBtnsList.length">
        <aEmpty description="请添加【操作按钮】到表格。"></aEmpty>
      </li>
    </VueDraggable>
  </AttrWrapper>
  <ButtonPropsModal
    v-model:visible="modalVisible"
    :formData="editBtnProps"
    @confirm="handleConfirm"
  ></ButtonPropsModal>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import { Button as aButton, Empty as aEmpty } from 'ant-design-vue'
import type { ColumnProps, ButtonProps, CanvasConfig, ActionBtnGroup } from '@/types'
import { isString } from '@/utils'
import AttrWrapper from '@/components/AttrWrapper.vue'
import IconifyIcon from '@/components/IconifyIcon.vue'
import ActionButton from '@/components/Button.vue'
import ActionBtnGroupLine from './components/ActionBtnGroupLine.vue'
import ActionBtnGroupForm from '@/core/components/form/ActionBtnGroupForm.vue'
import { useDesignContext } from '@/composables/useDesignContext'
import { createActionBtnGroup } from '@/core/components/designer'
import ButtonPropsModal from '@/core/components/modal/ButtonPropsModal.vue'
import { VueDraggable } from 'vue-draggable-plus'

defineOptions({
  name: 'ActionBtnGroupsAttrs',
})

const {
  actionBtnsList,
  activeCanvasElement,
  deleteElement,
  getElement,
  updateElement,
  addActionBtnGroup,
  deleteActionBtnGroup,
  updateActionBtnGroup,
  updateActionBtnList,
} = useDesignContext()

const checkIds = ref<string[]>([]) // 选中的按钮id
const modalVisible = ref(false) // 弹窗是否可见
const editInfo = ref<string | ActionBtnGroup>() // 编辑信息
const editBtnProps = ref<ButtonProps>() // 编辑的按钮props

const formData = computed<ColumnProps>(() => {
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

// 点击按钮，显示按钮属性编辑弹窗
function handleShowModal(btnId: string | ActionBtnGroup) {
  editInfo.value = btnId
  if (isString(btnId)) {
    editBtnProps.value = getElement(btnId as string)?.props as ButtonProps
  } else {
    editBtnProps.value = (btnId as ActionBtnGroup).button
  }
  modalVisible.value = true
}

// 确认按钮属性
function handleConfirm(btnProps: ButtonProps) {
  if (!editInfo.value) {
    return
  }
  if (isString(editInfo.value)) {
    updateElement(editInfo.value as string, { props: btnProps })
  } else {
    updateActionBtnGroup((editInfo.value as ActionBtnGroup).id, { button: btnProps })
  }
  editInfo.value = undefined
  editBtnProps.value = undefined
}

//// 删除元素
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

// 按钮拖动排序
function handleSort(list: CanvasConfig['actionBtnsList']) {
  updateActionBtnList(list)
}

// 按钮组内拖动排序
function handleGroupSort(id: string, list: string[]) {
  updateActionBtnGroup(id, { children: list })
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
      .tools {
        gap: 6px;
        display: flex;
        align-items: center;
      }
    }
  }
}
</style>
