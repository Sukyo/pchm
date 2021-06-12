import { UserConfig } from 'vite'
import html from 'vite-plugin-html';
import vue from '@vitejs/plugin-vue'
import legacy from '@vitejs/plugin-legacy'
import path from 'path'
export interface Params {
  command: string;
  mode: string;
}
// https://vitejs.dev/config/
/**
 * @type {import('vite').UserConfig}
 */
export default ({ mode, command }: Params) => {
  const isProd = mode;
  const userConfig: UserConfig = {
    base: '/', // 部署应用时的基本URL。
    server: {
      host: 'localhost',
      open: true,
      port: 8080,
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.', 'src'), // 别名
      },
      extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue', '.scss'], // 导入时想要省略的后缀
    },
    build: {
      target: 'es2015',
    },
    optimizeDeps: {
      entries: path.resolve(__dirname, 'index.html'),// 定义入口文件避免扫描整个目录导致内存溢出
    },
    plugins: [
      vue(),
      legacy({
        targets: ['> 1%', 'last 2 versions', 'not dead'],
      }),
      html({
        inject: {
          injectData: {
            // TODO 置入env配置中
            // issues: https://github.com/vitejs/vite/issues/1930
            title: isProd === 'prod' ? '生产环境' : '开发环境',
          },
        },
        minify: isProd,
      }),
    ]
  }
  return userConfig;
}
