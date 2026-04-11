# Ant Design Vue 按需引入配置指南

## 简介

本文档介绍如何在 Vue 3 + Vite 项目中按需引入 Ant Design Vue 组件库，以优化打包体积。

## 安装依赖

### 1. 安装 ant-design-vue

```bash
pnpm add ant-design-vue
```

### 2. 安装按需引入插件

```bash
pnpm add -D unplugin-vue-components unplugin-auto-import
```

## Vite 配置

### 修改 `vite.config.ts`

```typescript
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'

// 引入按需引入插件
import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
import AutoImport from 'unplugin-auto-import/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    vueDevTools(),
    
    // 自动导入组件
    Components({
      resolvers: [
        AntDesignVueResolver({
          importStyle: false, // css in js，不需要额外引入样式
        }),
      ],
      dts: true, // 生成类型声明文件
      dirs: ['src/components'], // 自动导入自定义组件
    }),
    
    // 自动导入 API（可选）
    AutoImport({
      resolvers: [AntDesignVueResolver()],
      imports: ['vue', 'vue-router', 'pinia'],
      dts: true,
      eslintrc: {
        enabled: true,
      },
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
})
```

## TypeScript 配置

### 修改 `tsconfig.json`

确保 `compilerOptions.types` 包含生成的类型声明文件：

```json
{
  "compilerOptions": {
    "types": ["./components.d.ts", "./auto-imports.d.ts"]
  }
}
```

或者使用三斜线指令在 `env.d.ts` 中引用：

```typescript
/// <reference types="./components.d.ts" />
/// <reference types="./auto-imports.d.ts" />
```

## 使用方式

### 方式一：自动导入（推荐）

配置完成后，直接在模板中使用组件，无需手动导入：

```vue
<template>
  <div>
    <a-button type="primary" @click="handleClick">
      点击我
    </a-button>
    
    <a-modal v-model:open="visible" title="标题">
      <p>内容</p>
    </a-modal>
    
    <a-table :columns="columns" :data-source="data" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// 无需导入组件，直接使用
const visible = ref(false)
const handleClick = () => {
  visible.value = true
}

const columns = [
  { title: '姓名', dataIndex: 'name' },
  { title: '年龄', dataIndex: 'age' },
]

const data = [
  { key: '1', name: '张三', age: 18 },
  { key: '2', name: '李四', age: 20 },
]
</script>
```

### 方式二：手动按需导入

如果不想使用自动导入插件，可以手动按需导入：

```vue
<template>
  <a-button type="primary">按钮</a-button>
</template>

<script setup lang="ts">
import { Button } from 'ant-design-vue'
import 'ant-design-vue/es/button/style/css' // 引入样式
</script>
```

### 方式三：使用 Composition API 的 message/notification/modal

对于 `message`、`notification`、`Modal` 等需要函数调用的组件：

```vue
<script setup lang="ts">
import { message, notification, Modal } from 'ant-design-vue'

// 使用 message
message.success('操作成功！')

// 使用 notification
notification.open({
  message: '通知标题',
  description: '这是通知内容',
})

// 使用 Modal
Modal.confirm({
  title: '确认删除？',
  content: '删除后无法恢复',
  onOk() {
    console.log('确认')
  },
})
</script>
```

## 主题定制（可选）

### 使用 CSS 变量定制主题

在 `src/styles/variables.less` 或 `src/main.ts` 中：

```typescript
import { ConfigProvider } from 'ant-design-vue'

// 在 main.ts 中配置主题
app.use(ConfigProvider)
```

在组件中使用：

```vue
<template>
  <a-config-provider
    :theme="{
      token: {
        colorPrimary: '#1890ff',
        borderRadius: 4,
      },
    }"
  >
    <router-view />
  </a-config-provider>
</template>
```

## 完整示例

### 创建一个使用 Ant Design Vue 的页面组件

```vue
<!-- src/views/DemoView.vue -->
<template>
  <div class="demo-page">
    <a-card title="Ant Design Vue 示例">
      <a-space direction="vertical" size="middle" style="width: 100%">
        
        <!-- 按钮 -->
        <a-space>
          <a-button type="primary" @click="showMessage">
            显示消息
          </a-button>
          <a-button @click="showModal">
            打开弹窗
          </a-button>
          <a-button danger @click="showConfirm">
            确认操作
          </a-button>
        </a-space>
        
        <!-- 表单 -->
        <a-form :model="formState" layout="vertical">
          <a-form-item label="用户名">
            <a-input v-model:value="formState.username" placeholder="请输入用户名" />
          </a-form-item>
          <a-form-item label="邮箱">
            <a-input v-model:value="formState.email" placeholder="请输入邮箱" />
          </a-form-item>
          <a-form-item>
            <a-button type="primary" @click="handleSubmit">
              提交
            </a-button>
          </a-form-item>
        </a-form>
        
        <!-- 表格 -->
        <a-table
          :columns="columns"
          :data-source="tableData"
          :pagination="false"
          size="small"
        />
        
      </a-space>
    </a-card>
    
    <!-- 弹窗 -->
    <a-modal
      v-model:open="modalVisible"
      title="示例弹窗"
      @ok="handleModalOk"
    >
      <p>这是一个模态框示例</p>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { message, Modal } from 'ant-design-vue'

// 表单数据
const formState = reactive({
  username: '',
  email: '',
})

// 弹窗显示状态
const modalVisible = ref(false)

// 表格列定义
const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: '名称',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
  },
]

// 表格数据
const tableData = [
  { id: 1, name: '项目一', status: '进行中' },
  { id: 2, name: '项目二', status: '已完成' },
  { id: 3, name: '项目三', status: '待开始' },
]

// 方法
const showMessage = () => {
  message.success('Hello Ant Design Vue!')
}

const showModal = () => {
  modalVisible.value = true
}

const showConfirm = () => {
  Modal.confirm({
    title: '确认操作',
    content: '您确定要执行此操作吗？',
    onOk() {
      message.info('已确认')
    },
  })
}

const handleSubmit = () => {
  message.success(`提交成功：${formState.username}`)
}

const handleModalOk = () => {
  modalVisible.value = false
  message.success('弹窗关闭')
}
</script>

<style scoped>
.demo-page {
  padding: 24px;
  max-width: 800px;
  margin: 0 auto;
}
</style>
```

## 常见问题

### 1. 组件没有样式

确保 `AntDesignVueResolver` 的配置正确：

```typescript
AntDesignVueResolver({
  importStyle: false, // 使用 css in js，不需要手动引入样式
})
```

如果需要使用 Less 自定义主题：

```typescript
AntDesignVueResolver({
  importStyle: 'less', // 使用 less 样式
})
```

### 2. 类型提示不生效

运行开发服务器后，插件会自动生成 `components.d.ts` 和 `auto-imports.d.ts` 文件。如果类型提示不生效：

1. 重启 VS Code
2. 检查 `tsconfig.json` 是否包含类型声明文件
3. 运行 `pnpm dev` 确保文件已生成

### 3. ESLint 报错 'xxx' is not defined

如果使用了 `unplugin-auto-import`，需要配置 ESLint：

```javascript
// eslint.config.js
import globals from 'globals'

export default [
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        // 添加自动导入的全局变量
        ref: 'readonly',
        computed: 'readonly',
        watch: 'readonly',
        // ... 其他自动导入的 API
      },
    },
  },
]
```

或者在 `auto-import` 配置中启用 ESLint 配置生成：

```typescript
AutoImport({
  eslintrc: {
    enabled: true, // 生成 .eslintrc-auto-import.json
    filepath: './.eslintrc-auto-import.json',
  },
})
```

然后在 `eslint.config.js` 中引入：

```javascript
import autoImportConfig from './.eslintrc-auto-import.json' with { type: 'json' }

export default [
  {
    languageOptions: {
      globals: autoImportConfig.globals,
    },
  },
]
```

## 参考链接

- [Ant Design Vue 官方文档](https://www.antdv.com/docs/vue/introduce-cn)
- [unplugin-vue-components](https://github.com/unplugin/unplugin-vue-components)
- [unplugin-auto-import](https://github.com/unplugin/unplugin-auto-import)
