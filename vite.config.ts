import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig, loadEnv } from "vite"

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())
  return {
    build: {
      // 输出目录
      outDir: env.VITE_CRX_OUTDIR,
    },
    server: {
      // 指定dev sever的端口号，默认为5173
      port: 3000,
      // 自动打开浏览器运行以下页面
      open: "/",
      // 设置反向代理
      proxy: {
        "/api": {
          target: "http://localhost/",
          changeOrigin: true,
        },
      },
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
    },
    plugins: [react()],
  }
})
