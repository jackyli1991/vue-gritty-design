<template>
  <div>
    <h2 class="form-title">{{ t('login.registerTitle') }}</h2>
    <a-form
      :model="registerForm"
      :rules="registerRules"
      :layout="'vertical'"
      :label-col="labelCol"
      hideRequiredMark
      ref="registerFormRef"
      @finish="handleRegister"
    >
      <a-form-item name="username" :label="t('login.username')">
        <a-input
          v-model:value="registerForm.username"
          :placeholder="t('login.usernamePlaceholder')"
          allow-clear
        >
          <template #prefix>
            <g-icon :name="ICONIFY_ICONS.user" />
          </template>
        </a-input>
      </a-form-item>
      <a-form-item name="email" :label="t('login.email')">
        <a-input
          v-model:value="registerForm.email"
          :placeholder="t('login.emailPlaceholder')"
          allow-clear
        >
          <template #prefix>
            <g-icon :name="ICONIFY_ICONS.email" />
          </template>
        </a-input>
      </a-form-item>
      <a-form-item name="password" :label="t('login.password')">
        <a-input-password
          v-model:value="registerForm.password"
          :placeholder="t('login.passwordPlaceholder')"
          allow-clear
        >
          <template #prefix>
            <g-icon :name="ICONIFY_ICONS.password" />
          </template>
        </a-input-password>
      </a-form-item>
      <a-form-item name="confirmPassword" :label="t('login.confirmPassword')">
        <a-input-password
          v-model:value="registerForm.confirmPassword"
          :placeholder="t('login.confirmPasswordPlaceholder')"
          allow-clear
        >
          <template #prefix>
            <g-icon :name="ICONIFY_ICONS.password" />
          </template>
        </a-input-password>
      </a-form-item>
      <a-form-item>
        <a-button
          type="primary"
          html-type="submit"
          size="large"
          class="register-button"
          block
          :loading="isLoading"
        >
          {{ t('login.registerButton') }}
        </a-button>
        <a-button
          type="primary"
          ghost
          class="register-button"
          size="large"
          block
          @click="handleSwitchToLogin"
        >
          {{ t('login.backToLogin') }}
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import type { FormInstance } from 'ant-design-vue'
import { useLocale } from '@/composables'
import { ICONIFY_ICONS } from '@/icons'

const { t } = useLocale()

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
  username: [{ required: true, message: () => t('login.usernamePlaceholder'), trigger: 'blur' }],
  email: [
    { required: true, message: () => t('login.emailPlaceholder'), trigger: 'blur' },
    { type: 'email', message: () => t('common.invalidEmail'), trigger: 'blur' },
  ],
  password: [
    { required: true, message: () => t('login.passwordPlaceholder'), trigger: 'blur' },
    { min: 6, message: () => t('common.passwordMinLength'), trigger: 'blur' },
  ],
  confirmPassword: [
    { required: true, message: () => t('login.confirmPasswordPlaceholder'), trigger: 'blur' },
    {
      validator: (_rule: Record<string, string>, value: string) => {
        if (!value || registerForm.password === value) {
          return Promise.resolve()
        }
        return Promise.reject(new Error(t('common.passwordMismatch')))
      },
      trigger: 'blur',
    },
  ],
}

const handleRegister = async () => {
  if (!registerFormRef.value) return

  try {
    await registerFormRef.value.validate()
    isLoading.value = true

    await new Promise((resolve) => setTimeout(resolve, 1000))

    handleSwitchToLogin()
  } catch (error) {
    console.error(t('common.failed'), error)
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
  margin-bottom: 20px;
  color: #333;
  font-size: 24px;
  font-weight: 500;
}

.login-button {
  margin-bottom: 10px;
}

.register-button {
  margin-top: 10px;
}
</style>
