import { defineConfig } from 'nitro'

export default defineConfig({
  logLevel: 2,
  errorHandler: './error.ts',
  devServer: {
    port: 3001,
  },
  scanDirs: ['.'],
  // alias: {
  //   '#utils': './utils',
  //   '#database': './database',
  // },
})
