import { defineConfig } from 'nitro'

export default defineConfig({
  apiBaseURL: '/api',
  routesDir: './routes/api',
  errorHandler: './error.ts',
  devServer: {
    port: 3001,
  },
  // routeRules: {
  //   '/api/**': {
  //     headers: {
  //       'Access-Control-Allow-Origin': '*',
  //       'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  //       'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  //       'Access-Control-Allow-Credentials': 'true',
  //     },
  //   },
  // },
})
