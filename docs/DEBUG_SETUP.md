# Trae CN / VS Code 调试配置指南

本文档介绍如何在 Trae CN 或 VS Code 中配置断点调试 Vue 3 + Vite 项目。

## 目录

1. [前置条件](#前置条件)
2. [安装必要插件](#安装必要插件)
3. [配置说明](#配置说明)
4. [设置断点](#设置断点)
5. [启动调试](#启动调试)
6. [调试技巧](#调试技巧)
7. [常见问题](#常见问题)

---

## 前置条件

- Node.js 20+ 已安装
- 项目依赖已安装 (`pnpm install`)

## 安装必要插件

在 Trae CN 或 VS Code 中安装以下插件：

| 插件名称 | 插件 ID | 用途 |
|---------|---------|------|
| JavaScript Debugger | `ms-vscode.js-debug` | Chrome/Edge 浏览器调试 |
| Firefox Debug | `firefox-devtools.vscode-firefox-debug` | Firefox 浏览器调试 |
| Vue - Official | `Vue.volar` | Vue 语言支持 |

安装方式：
1. 按 `Ctrl+Shift+X` 打开扩展面板
2. 搜索插件名称
3. 点击安装

## 配置说明

项目已配置 `.vscode/launch.json`，包含以下调试配置：

### 可用配置

| 配置名称 | 类型 | 说明 |
|---------|------|------|
| `dev` | Node.js | 启动 Vite 开发服务器 |
| `dev:chrome` | Chrome | 在 Chrome 中调试 |
| `dev:firefox` | Firefox | 在 Firefox 中调试 |
| `dev:edge` | Edge | 在 Edge 中调试 |
| `test:unit` | Node.js | 运行单元测试 (Vitest) |
| `test:e2e` | Node.js | 运行 E2E 测试 (Playwright) |
| `dev:all` | Compound | 同时启动服务器和 Chrome 调试 |

### 调试端口

- Vite 开发服务器: `http://localhost:5173`
- 调试器会自动附加到浏览器

## 设置断点

### 在 Vue 单文件组件中设置断点

1. 打开 `.vue` 文件
2. 在 `<script>` 区域的代码行号左侧点击，出现红色圆点即表示断点设置成功

```vue
<script setup lang="ts">
import { ref } from 'vue'

const count = ref(0)

function increment() {
  count.value++  // ← 在这里点击设置断点
  console.log(count.value)
}
</script>
```

### 在 TypeScript/JavaScript 文件中设置断点

1. 打开 `.ts` 或 `.js` 文件
2. 在代码行号左侧点击设置断点

```typescript
// src/utils/helpers.ts
export function formatDate(date: Date): string {
  const year = date.getFullYear()  // ← 在这里设置断点
  const month = date.getMonth() + 1
  return `${year}-${month}`
}
```

### 条件断点

右键点击断点，选择 **"编辑断点"**，可以设置条件：

```javascript
// 只在 count > 5 时暂停
count > 5
```

## 启动调试

### 方式一：使用调试面板

1. 按 `Ctrl+Shift+D` 打开调试面板
2. 在顶部的下拉菜单选择配置（如 `dev:chrome`）
3. 点击绿色的 **"开始调试"** 按钮（或按 `F5`）

### 方式二：使用快捷键

1. 按 `F5` 启动调试（使用上次选择的配置）
2. 按 `Ctrl+F5` 以非调试模式运行

### 方式三：使用命令面板

1. 按 `Ctrl+Shift+P` 打开命令面板
2. 输入 `调试：开始调试`
3. 选择配置

### 推荐调试流程

**前端页面调试（推荐）**：
```
1. 选择配置: dev:chrome 或 dev:edge
2. 按 F5 启动
3. 浏览器自动打开 http://localhost:5173
4. 在编辑器中设置断点
5. 在浏览器中操作触发断点
```

**同时启动服务器和浏览器**：
```
1. 选择配置: dev:all
2. 按 F5 启动
3. 自动启动 Vite 服务器和 Chrome 调试
```

## 调试技巧

### 调试快捷键

| 快捷键 | 功能 |
|--------|------|
| `F5` | 继续/启动调试 |
| `F10` | 单步跳过 |
| `F11` | 单步进入 |
| `Shift+F11` | 单步跳出 |
| `Shift+F5` | 停止调试 |
| `Ctrl+Shift+F5` | 重新启动 |
| `F9` | 切换断点 |

### 查看变量

调试时，左侧会显示：
- **变量**：当前作用域的所有变量
- **监视**：添加自定义表达式监视
- **调用堆栈**：函数调用链
- **断点**：所有设置的断点列表

### 在控制台执行代码

调试暂停时，可以在 **调试控制台**（`Ctrl+Shift+Y`）中执行表达式：

```javascript
// 查看变量值
console.log(count.value)

// 修改变量
count.value = 100

// 调用函数
increment()
```

### Vue 响应式数据调试

调试 Vue 响应式数据时，需要访问 `.value`：

```vue
<script setup>
const state = ref({ count: 0 })
const double = computed(() => state.value.count * 2)
</script>
```

在调试控制台中：
```javascript
// 正确
state.value.count
state.value.count = 5

// 错误
state.count  // undefined
```

## 常见问题

### 1. 断点不生效

**原因**：Source Map 配置问题

**解决**：
- 确保 `vite.config.ts` 中启用了 source map：
```typescript
export default defineConfig({
  build: {
    sourcemap: true
  }
})
```

### 2. 浏览器无法启动

**原因**：浏览器路径未配置

**解决**：
在 `launch.json` 中添加 `runtimeExecutable`：
```json
{
  "type": "chrome",
  "runtimeExecutable": "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe"
}
```

### 3. 调试 Vue 组件时变量显示为 undefined

**原因**：Vue 单文件组件编译后的映射问题

**解决**：
- 使用 Vue DevTools 浏览器扩展辅助调试
- 在 `<script setup>` 中定义的变量需要在调试控制台通过组件实例访问

### 4. 端口被占用

**解决**：修改 `launch.json` 中的端口配置：
```json
{
  "url": "http://localhost:3000"
}
```

### 5. Firefox 调试无法连接

**解决**：
1. 确保安装了 Firefox Debug 插件
2. 确保 Firefox 浏览器已安装
3. 检查 Firefox 是否开启了远程调试：
   - 在 Firefox 地址栏输入 `about:config`
   - 搜索 `devtools.debugger.remote-enabled`，设置为 `true`

## 延伸阅读

- [VS Code 调试官方文档](https://code.visualstudio.com/docs/editor/debugging)
- [Vue.js 调试指南](https://vuejs.org/guide/best-practices/debugging.html)
- [Vite 调试配置](https://vitejs.dev/config/build-options.html#build-sourcemap)
