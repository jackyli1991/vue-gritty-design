# pnpm Monorepo 改造文档

## 1. 改造背景

为了更好地管理项目结构，提高代码复用性和可维护性，本项目从单体应用架构改造为 pnpm Monorepo 架构。

**改造目标**：

- 将 Nitro Mock 服务作为独立包管理
- 实现前后端分离开发
- 提供清晰的依赖管理和版本控制
- 便于后续扩展更多子包

## 2. 改造步骤

### 2.1 初始化 Monorepo

**步骤1**: 创建 `pnpm-workspace.yaml` 配置文件

```yaml
packages:
  - 'packages/**'
  - 'apps/**'
```

**步骤2**: 更新根目录 `package.json`

- 将项目重命名为 `@vue-gritty-design/monorepo`
- 移除非根目录专属的依赖到子包
- 添加 monorepo 管理脚本

### 2.2 创建应用目录结构

**步骤3**: 创建目录

```bash
mkdir -p apps/vue-gritty-design
mkdir -p packages/nitro-mock
```

### 2.3 迁移 Vue 应用

**步骤4**: 复制原项目文件到 `apps/vue-gritty-design/`

```bash
Copy-Item -Path .\src -Destination .\apps\vue-gritty-design\src -Recurse -Force
Copy-Item -Path .\public -Destination .\apps\vue-gritty-design\public -Recurse -Force
Copy-Item -Path .\.env.development -Destination .\apps\vue-gritty-design\.env.development -Force
Copy-Item -Path .\.env.production -Destination .\apps\vue-gritty-design\.env.production -Force
Copy-Item -Path .\tailwind.config.ts -Destination .\apps\vue-gritty-design\tailwind.config.ts -Force
```

**步骤5**: 创建应用专属配置文件

- `package.json` - 定义应用依赖和脚本
- `vite.config.ts` - 配置代理指向 mock 服务
- `tsconfig.json` - TypeScript 配置
- `tsconfig.app.json` - 应用 TypeScript 配置
- `tsconfig.node.json` - 节点 TypeScript 配置
- `vitest.config.ts` - 测试配置

### 2.4 提取 Nitro Mock 服务

**步骤6**: 创建 mock 服务包结构

```
packages/nitro-mock/
├── routes/
│   └── api/
│       └── login.post.ts    # 登录接口
├── database/
│   └── users.ts             # 模拟用户数据
├── codes.ts                 # 响应码配置
├── utils.ts                 # 工具函数
├── error.ts                 # 错误处理
├── nitro.config.ts          # Nitro 配置
├── tsconfig.json            # TypeScript 配置
└── package.json             # 包配置
```

**步骤7**: 迁移原有 server 目录代码

从原 `server/` 目录迁移相关文件到 `packages/nitro-mock/`：

- `server/routes/api/login.post.ts` → `packages/nitro-mock/routes/api/login.post.ts`
- `server/dataBase/users.ts` → `packages/nitro-mock/database/users.ts`
- `server/codes.ts` → `packages/nitro-mock/codes.ts`
- `server/utils.ts` → `packages/nitro-mock/utils.ts`
- `server/error.ts` → `packages/nitro-mock/error.ts`

### 2.5 配置跨域和代理

**步骤8**: 配置 Nitro Mock 服务跨域

在 `packages/nitro-mock/nitro.config.ts` 中添加：

```typescript
routeRules: {
  '/api/**': {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    }
  }
}
```

**步骤9**: 配置 Vue 应用代理

在 `apps/vue-gritty-design/vite.config.ts` 中添加：

```typescript
server: {
  proxy: {
    '/api': {
      target: 'http://localhost:3001',
      changeOrigin: true,
    },
  },
}
```

**步骤10**: 更新环境变量

在 `apps/vue-gritty-design/.env.development` 中：

```env
VITE_API_BASE_URL=http://localhost:3001/api
```

### 2.6 更新 ESLint 配置

**步骤11**: 更新根目录 `eslint.config.ts`

修改文件路径匹配规则，覆盖 apps 和 packages 目录。

## 3. 项目结构

### 改造前

```
vue-gritty-design/
├── src/
├── public/
├── server/
├── package.json
├── vite.config.ts
├── nitro.config.js
└── ...
```

### 改造后

```
vue-gritty-design/
├── apps/
│   └── vue-gritty-design/          # Vue 主应用
│       ├── src/                    # 源代码
│       │   ├── components/         # 组件
│       │   ├── views/              # 页面视图
│       │   ├── router/             # 路由配置
│       │   ├── stores/             # Pinia 状态管理
│       │   ├── http/               # Axios 请求封装
│       │   └── ...
│       ├── public/                 # 静态资源
│       ├── package.json
│       ├── vite.config.ts
│       ├── tsconfig.json
│       └── ...
├── packages/
│   └── nitro-mock/                 # Nitro Mock 服务
│       ├── routes/
│       │   └── api/
│       │       └── login.post.ts   # 登录接口
│       ├── database/
│       │   └── users.ts            # 模拟用户数据
│       ├── codes.ts                # 响应码配置
│       ├── utils.ts                # 工具函数
│       ├── error.ts                # 错误处理
│       ├── nitro.config.ts         # Nitro 配置
│       ├── tsconfig.json
│       └── package.json
├── pnpm-workspace.yaml             # Monorepo 配置
├── package.json                    # 根目录配置
├── eslint.config.ts                # 全局 ESLint 配置
└── ...
```

## 4. 配置文件说明

### 4.1 pnpm-workspace.yaml

定义 Monorepo 的工作空间范围，包含 `apps/` 和 `packages/` 目录下的所有子包。

### 4.2 根目录 package.json

| 脚本              | 说明                    |
| ----------------- | ----------------------- |
| `pnpm dev`        | 启动 Vue 应用开发服务器 |
| `pnpm build`      | 构建 Vue 应用           |
| `pnpm dev:mock`   | 启动 Nitro Mock 服务    |
| `pnpm build:mock` | 构建 Nitro Mock 服务    |
| `pnpm lint`       | 执行代码检查            |

### 4.3 apps/vue-gritty-design/package.json

| 脚本        | 说明                        |
| ----------- | --------------------------- |
| `dev`       | 启动开发服务器（端口 5173） |
| `build`     | 构建生产版本                |
| `preview`   | 预览生产版本                |
| `test:unit` | 运行单元测试                |
| `test:e2e`  | 运行端到端测试              |

### 4.4 packages/nitro-mock/package.json

| 脚本      | 说明                        |
| --------- | --------------------------- |
| `dev`     | 启动 mock 服务（端口 3001） |
| `build`   | 构建 mock 服务              |
| `preview` | 预览 mock 服务              |

## 5. 运行方式

### 5.1 开发环境

**方式一**: 使用根目录脚本（推荐）

```bash
# 启动 Vue 应用
pnpm dev

# 在另一个终端启动 Mock 服务
pnpm dev:mock
```

**方式二**: 使用子包脚本

```bash
# 启动 Vue 应用
pnpm --filter vue-gritty-design dev

# 启动 Mock 服务
pnpm --filter @vue-gritty-design/nitro-mock dev
```

### 5.2 访问地址

- **Vue 应用**: http://localhost:5173
- **Mock 服务**: http://localhost:3001

### 5.3 测试登录接口

```bash
curl -X POST http://localhost:3001/api/login \
  -H "Content-Type: application/json" \
  -d '{"username": "admin", "password": "admin123"}'
```

## 6. 注意事项

### 6.1 依赖安装

使用 pnpm 在根目录安装依赖，会自动处理所有子包的依赖：

```bash
pnpm install
```

### 6.2 新增依赖

**为特定子包添加依赖**:

```bash
# 为 Vue 应用添加依赖
pnpm add axios --filter vue-gritty-design

# 为 Mock 服务添加依赖
pnpm add lodash --filter @vue-gritty-design/nitro-mock
```

**为所有子包添加依赖**:

```bash
pnpm add lodash -D -w
```

### 6.3 构建顺序

构建时需确保 Mock 服务先于 Vue 应用构建（如果需要）：

```bash
pnpm build:mock
pnpm build
```

### 6.4 环境变量

开发环境中，Vue 应用通过代理访问 Mock 服务：

- Vue 开发服务器: http://localhost:5173
- Mock 服务: http://localhost:3001

生产环境中，需根据实际部署情况配置 API 地址。

## 7. 扩展建议

### 7.1 添加新子包

```bash
mkdir -p packages/shared-utils
touch packages/shared-utils/package.json
```

### 7.2 添加新应用

```bash
mkdir -p apps/admin-panel
touch apps/admin-panel/package.json
```

### 7.3 跨包依赖

在 `apps/vue-gritty-design/package.json` 中添加对共享包的依赖：

```json
{
  "dependencies": {
    "@vue-gritty-design/shared-utils": "workspace:*"
  }
}
```

## 8. 故障排除

### 8.1 Nitro Mock 服务启动失败

**问题**: `defineNitroConfig is not a function`

**解决方案**: 使用正确的导入方式：

```typescript
import { defineConfig } from 'nitro'

export default defineConfig({
  // 配置项
})
```

### 8.2 Vue 应用无法访问 Mock 服务

**问题**: 跨域错误或代理失败

**解决方案**:

1. 确保 Mock 服务已启动
2. 检查 `vite.config.ts` 代理配置
3. 检查 Mock 服务的 CORS 配置

### 8.3 类型错误

**问题**: TypeScript 无法解析路径别名

**解决方案**:

1. 检查 `tsconfig.json` 中的 `paths` 配置
2. 确保 `baseUrl` 设置正确
3. 重启 TypeScript 语言服务

## 附录：测试账号

| 用户名 | 密码     | 角色  |
| ------ | -------- | ----- |
| admin  | admin123 | admin |
| user   | user123  | user  |

---

**文档版本**: v1.0  
**创建日期**: 2026-04-25  
**适用项目**: vue-gritty-design
