<template>
  <div>
    <h2 class="form-title">登录</h2>
    <a-form
      :model="loginForm"
      :rules="loginRules"
      :layout="'vertical'"
      :label-col="labelCol"
      ref="loginFormRef"
      hideRequiredMark
      @finish="handleLogin"
    >
      <a-form-item name="username" label="用户名">
        <a-input v-model:value="loginForm.username" placeholder="请输入用户名" allow-clear>
          <template #prefix>
            <g-icon :name="ICONIFY_ICONS.user" />
          </template>
        </a-input>
      </a-form-item>
      <a-form-item name="password" label="密码">
        <a-input-password v-model:value="loginForm.password" placeholder="请输入密码" allow-clear>
          <template #prefix>
            <g-icon :name="ICONIFY_ICONS.password" />
          </template>
        </a-input-password>
      </a-form-item>
      <div class="form-footer">
        <a-checkbox>记住我</a-checkbox>
        <span>忘记密码？</span>
      </div>
      <a-form-item>
        <a-button
          type="primary"
          html-type="submit"
          class="login-button"
          size="large"
          :loading="loading"
          block
        >
          登录
        </a-button>
        <a-button
          type="primary"
          class="register-button"
          size="large"
          block
          ghost
          @click="handleSwitchToRegister"
        >
          注册
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import type { FormInstance } from 'ant-design-vue'
import { ICONIFY_ICONS } from '@/icons'
import { useUserStore } from '@/stores/user'
import { useLoading } from '@/composables/useLoading'

// 定义表单布局
const labelCol = { style: { width: '80px' } }

const activeForm = defineModel({
  default: 'login',
  type: String,
})

// 表单引用
const loginFormRef = ref<FormInstance>()

// 登录表单
const loginForm = reactive({
  username: 'admin',
  password: 'admin123',
})
const { loading, startLoading, endLoading } = useLoading()

// 登录表单规则
const loginRules = {
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
}

// 处理登录
const handleLogin = async () => {
  if (!loginFormRef.value) return

  try {
    await loginFormRef.value.validate()
    startLoading()
    await useUserStore().loginIn(loginForm)
  } finally {
    endLoading()
  }
}

// 切换到注册
const handleSwitchToRegister = () => {
  activeForm.value = 'register'
}
</script>

<style scoped>
.form-title {
  margin-bottom: 20px;
  color: #333;
  font-size: 24px;
  font-weight: 500;
}

.form-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.login-button {
  margin-bottom: 10px;
}

.register-button {
  margin-top: 10px;
}
</style>
