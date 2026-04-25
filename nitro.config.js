import { defineConfig } from 'nitro'

export default defineConfig({
  logLevel: 2,
  apiBaseURL: '/api', // 默认值
  errorHandler: './server/error.ts',
})
