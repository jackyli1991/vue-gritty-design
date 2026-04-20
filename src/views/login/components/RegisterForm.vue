<template>
  <div>
    <h2 class="form-title">注册</h2>
    <a-form
      :model="registerForm"
      :rules="registerRules"
      :layout="'vertical'"
      :label-col="labelCol"
      hideRequiredMark
      ref="registerFormRef"
      @finish="handleRegister"
    >
      <a-form-item name="username" label="用户名">
        <a-input v-model:value="registerForm.username" placeholder="请输入用户名" allow-clear>
          <template #prefix>
            <g-icon :name="ICONIFY_ICONS.user" />
          </template>
        </a-input>
      </a-form-item>
      <a-form-item name="email" label="邮箱">
        <a-input v-model:value="registerForm.email" placeholder="请输入邮箱" allow-clear>
          <template #prefix>
            <g-icon :name="ICONIFY_ICONS.email" />
          </template>
        </a-input>
      </a-form-item>
      <a-form-item name="password" label="密码">
        <a-input-password
          v-model:value="registerForm.password"
          placeholder="请输入密码"
          allow-clear
        >
          <template #prefix>
            <g-icon :name="ICONIFY_ICONS.password" />
          </template>
        </a-input-password>
      </a-form-item>
      <a-form-item name="confirmPassword" label="确认密码">
        <a-input-password
          v-model:value="registerForm.confirmPassword"
          placeholder="请再次输入密码"
          allow-clear
        >
          <template #prefix>
            <g-icon :name="ICONIFY_ICONS.password" />
          </template>
        </a-input-password>
      </a-form-item>
      <a-form-item>
        <a-button type="primary" html-type="submit" class="register-button" block> 注册 </a-button>
        <a-button type="default" class="register-button" block @click="handleSwitchToLogin">
          已有账号，去登录
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import type { FormInstance } from 'ant-design-vue'
import { GIcon } from '@/components'
import { ICONIFY_ICONS } from '@/icons'

// 定义表单布局
const labelCol = { style: { width: '80px' } }
// 定义model
const activeForm = defineModel({
  default: 'register',
  type: String,
})

// 表单引用
const registerFormRef = ref<FormInstance>()

// 注册表单
const registerForm = reactive({
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
})
const isLoading = ref(false)

// 注册表单规则
const registerRules = {
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱格式', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, message: '密码长度至少为6位', trigger: 'blur' },
  ],
  confirmPassword: [
    { required: true, message: '请确认密码', trigger: 'blur' },
    {
      validator: (rule: Record<string, string>, value: string) => {
        if (!value || registerForm.password === value) {
          return Promise.resolve()
        }
        return Promise.reject(new Error('两次输入的密码不一致'))
      },
      trigger: 'blur',
    },
  ],
}

// 处理注册
const handleRegister = async () => {
  if (!registerFormRef.value) return

  try {
    await registerFormRef.value.validate()
    isLoading.value = true

    // 模拟注册请求
    await new Promise((resolve) => setTimeout(resolve, 1000))

    alert('注册成功！')
    // 注册成功后切换到登录
    handleSwitchToLogin()
  } catch (error) {
    console.error('注册表单验证失败', error)
  } finally {
    isLoading.value = false
  }
}

// 切换到登录
const handleSwitchToLogin = () => {
  activeForm.value = 'login'
}
</script>

<style scoped>
.form-title {
  text-align: center;
  margin-bottom: 1.5rem;
  color: #333;
  font-size: 1.5rem;
  font-weight: 500;
}

.login-button {
  margin-bottom: 10px;
}

.register-button {
  margin-top: 10px;
}
</style>
