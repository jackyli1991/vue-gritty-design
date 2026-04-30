# 多语言(i18n)功能实现文档

## 1. 概述

本文档记录了为 `vue-gritty-design` 项目添加多语言支持的具体步骤，使用 `vue-i18n` 作为国际化解决方案。

## 2. 实现步骤

### 2.1 安装依赖

```bash
pnpm --filter vue-gritty-design add vue-i18n@10
```

### 2.2 创建目录结构

```bash
mkdir -p apps/vue-gritty-design/src/locales
```

### 2.3 创建语言文件

#### 中文语言包 `src/locales/zh-CN.ts`

```typescript
export default {
  common: {
    confirm: '确认',
    cancel: '取消',
    save: '保存',
    delete: '删除',
    edit: '编辑',
    add: '添加',
    search: '搜索',
    reset: '重置',
    submit: '提交',
    loading: '加载中...',
    success: '操作成功',
    failed: '操作失败',
    tips: '提示',
    invalidEmail: '请输入正确的邮箱格式',
    passwordMinLength: '密码长度至少为6位',
    passwordMismatch: '两次输入的密码不一致',
  },
  menu: {
    dashboard: '仪表盘',
    users: '用户管理',
    settings: '系统设置',
  },
  login: {
    title: '用户登录',
    username: '用户名',
    password: '密码',
    rememberMe: '记住我',
    forgotPassword: '忘记密码？',
    loginButton: '登录',
    registerButton: '注册',
    register: '没有账号？立即注册',
    backToLogin: '已有账号？去登录',
    usernamePlaceholder: '请输入用户名',
    passwordPlaceholder: '请输入密码',
    emailPlaceholder: '请输入邮箱',
    confirmPasswordPlaceholder: '请确认密码',
    registerTitle: '用户注册',
    email: '邮箱',
    confirmPassword: '确认密码',
  },
  dashboard: {
    welcome: '欢迎使用',
    systemName: 'Vue Gritty Design',
    overview: '系统概览',
    totalUsers: '用户总数',
    totalOrders: '订单总数',
    totalRevenue: '总收入',
    todayVisits: '今日访问',
  },
  languages: {
    'zh-CN': '简体中文',
    'en-US': 'English',
  },
}
```

#### 英文语言包 `src/locales/en-US.ts`

```typescript
export default {
  common: {
    confirm: 'Confirm',
    cancel: 'Cancel',
    save: 'Save',
    delete: 'Delete',
    edit: 'Edit',
    add: 'Add',
    search: 'Search',
    reset: 'Reset',
    submit: 'Submit',
    loading: 'Loading...',
    success: 'Operation successful',
    failed: 'Operation failed',
    tips: 'Tips',
    invalidEmail: 'Please enter a valid email address',
    passwordMinLength: 'Password must be at least 6 characters',
    passwordMismatch: 'The two passwords you entered do not match',
  },
  menu: {
    dashboard: 'Dashboard',
    users: 'User Management',
    settings: 'System Settings',
  },
  login: {
    title: 'User Login',
    username: 'Username',
    password: 'Password',
    rememberMe: 'Remember me',
    forgotPassword: 'Forgot password?',
    loginButton: 'Login',
    registerButton: 'Register',
    register: "Don't have an account? Register now",
    backToLogin: 'Already have an account? Login',
    usernamePlaceholder: 'Please enter username',
    passwordPlaceholder: 'Please enter password',
    emailPlaceholder: 'Please enter email',
    confirmPasswordPlaceholder: 'Please confirm password',
    registerTitle: 'User Registration',
    email: 'Email',
    confirmPassword: 'Confirm Password',
  },
  dashboard: {
    welcome: 'Welcome to',
    systemName: 'Vue Gritty Design',
    overview: 'System Overview',
    totalUsers: 'Total Users',
    totalOrders: 'Total Orders',
    totalRevenue: 'Total Revenue',
    todayVisits: 'Today Visits',
  },
  languages: {
    'zh-CN': '简体中文',
    'en-US': 'English',
  },
}
```

### 2.4 创建 i18n 配置文件 `src/locales/index.ts`

```typescript
import { createI18n } from 'vue-i18n'
import zhCN from './zh-CN'
import enUS from './en-US'

export type LocaleType = 'zh-CN' | 'en-US'

export const localeList = [
  { value: 'zh-CN', label: '简体中文' },
  { value: 'en-US', label: 'English' },
]

const i18n = createI18n({
  legacy: false,
  locale: localStorage.getItem('locale') || 'zh-CN',
  fallbackLocale: 'zh-CN',
  messages: {
    'zh-CN': zhCN,
    'en-US': enUS,
  },
})

export const setLocale = (locale: LocaleType) => {
  i18n.global.locale.value = locale
  localStorage.setItem('locale', locale)
  document.querySelector('html')?.setAttribute('lang', locale)
}

export default i18n
```

### 2.5 注册 i18n 插件 `src/main.ts`

```typescript
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.css'

import App from './App.vue'
import router from './router'
import components from '@/components'
import darkModePlugin from '@/plugins/darkMode'
import i18n from '@/locales' // 新增

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(components)
app.use(darkModePlugin)
app.use(i18n) // 新增

app.mount('#app')
```

### 2.6 创建语言切换组件

在登录页面右上角添加语言切换下拉框：

```vue
<!-- 语言切换 -->
<div class="language-switch">
  <a-select
    :value="locale"
    @change="handleLocaleChange"
    style="width: 120px"
  >
    <a-select-option v-for="item in localeList" :key="item.value" :value="item.value">
      {{ item.label }}
    </a-select-option>
  </a-select>
</div>
```

```typescript
import { useI18n } from 'vue-i18n'
import { localeList, setLocale, type LocaleType } from '@/locales'

const { locale } = useI18n()

const handleLocaleChange = (value: LocaleType) => {
  setLocale(value)
}
```

### 2.7 国际化表单组件

#### LoginForm.vue 示例

```vue
<template>
  <div>
    <h2 class="form-title">{{ t('login.title') }}</h2>
    <a-form ...>
      <a-form-item name="username" :label="t('login.username')">
        <a-input
          v-model:value="loginForm.username"
          :placeholder="t('login.usernamePlaceholder')"
          ...
        />
      </a-form-item>
      ...
    </a-form>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const loginRules = {
  username: [{ required: true, message: () => t('login.usernamePlaceholder'), trigger: 'blur' }],
  password: [{ required: true, message: () => t('login.passwordPlaceholder'), trigger: 'blur' }],
}
</script>
```

#### RegisterForm.vue 示例

```vue
<template>
  <div>
    <h2 class="form-title">{{ t('login.registerTitle') }}</h2>
    ...
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

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
</script>
```

## 3. 项目结构

```
apps/vue-gritty-design/
├── src/
│   ├── locales/
│   │   ├── index.ts        # i18n 配置和工具函数
│   │   ├── zh-CN.ts        # 中文语言包
│   │   └── en-US.ts        # 英文语言包
│   ├── main.ts             # 入口文件（已更新）
│   └── views/
│       └── login/
│           ├── index.vue           # 登录页面（已添加语言切换）
│           └── components/
│               ├── LoginForm.vue    # 登录表单（已国际化）
│               └── RegisterForm.vue # 注册表单（已国际化）
```

## 4. 使用方式

### 4.1 在组件中使用

```vue
<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n()

// 在模板中使用
// {{ t('login.title') }}
// {{ t('login.usernamePlaceholder') }}
</script>
```

### 4.2 切换语言

```typescript
import { setLocale, type LocaleType } from '@/locales'

// 切换到英文
setLocale('en-US')

// 切换到中文
setLocale('zh-CN')
```

### 4.3 表单验证消息国际化

表单验证规则中的 `message` 需要使用函数形式：

```typescript
const loginRules = {
  username: [{ required: true, message: () => t('login.usernamePlaceholder'), trigger: 'blur' }],
}
```

## 5. 添加新语言

1. 在 `src/locales/` 下创建新的语言文件（如 `ja-JP.ts`）
2. 在 `src/locales/index.ts` 的 `messages` 中注册新语言：

```typescript
import jaJP from './ja-JP'

const i18n = createI18n({
  messages: {
    'zh-CN': zhCN,
    'en-US': enUS,
    'ja-JP': jaJP, // 新增
  },
})
```

3. 在 `localeList` 数组中添加语言选项：

```typescript
export const localeList = [
  { value: 'zh-CN', label: '简体中文' },
  { value: 'en-US', label: 'English' },
  { value: 'ja-JP', label: '日本語' }, // 新增
]
```

## 6. 关键特性

- **持久化存储**：语言选择保存到 localStorage，刷新页面后保持选择
- **动态切换**：无需刷新页面即可切换语言
- **HTML 标签支持**：`t()` 函数支持 HTML 模板
- **日期格式化**：vue-i18n 支持日期、数字格式化
- **Composition API**：使用 Vue 3 Composition API 风格

## 7. 注意事项

1. **表单验证消息**：必须使用函数形式 `message: () => t('key')`，否则无法响应语言切换
2. **setup script**：在 `<script setup>` 中使用 `useI18n()`，无需通过 `setup` 函数返回
3. **组件内使用**：i18n 实例自动在所有组件中可用，无需手动挂载

---

**文档版本**: v1.0
**创建日期**: 2026-04-30
**适用项目**: vue-gritty-design
