<template>
  <div class="login-container">
    <a-card class="login-card">
      <transition name="fade" mode="out-in">
        <!-- 登录表单 -->
        <LoginForm v-if="activeForm === 'login'" v-model="activeForm" />

        <!-- 注册表单 -->
        <RegisterForm v-else v-model="activeForm" />
      </transition>
    </a-card>
    <div class="language-icon-container">
      <LanguageIcon />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import LoginForm from './components/LoginForm.vue'
import RegisterForm from './components/RegisterForm.vue'
import LanguageIcon from '@/views/layout/components/LanguageIcon.vue'

// 状态管理
const activeForm = ref('login')
</script>

<style lang="scss" scoped>
.login-container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f5f5f5;
  padding: 20px;
  position: relative;
  .login-card {
    width: 100%;
    max-width: 500px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    padding: 2rem;
  }
  .language-icon-container {
    position: absolute;
    top: 20px;
    right: 20px;
  }
}

/* 过渡动画 */
.fade-enter-active,
.fade-leave-active {
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>
