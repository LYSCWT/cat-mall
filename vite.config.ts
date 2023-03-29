import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

//-----------------解决跨域8081访问8082
// let proxyObj = {}

// proxyObj['/'] = {
//   //websocket
//   ws:false,
//   //目标地址
//   target:'http://localhost:8081',
//   //发送的请求头host被设置为target
//   changeOrigin:true,
//   //不重写请求地址
//   pathReWrite:{
//     '^/':'/'
//   }
  
// }
//-----------------

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  //服务器启动地址8081
  server: {
    host: '0.0.0.0',
    port: 8080,
    open: true,
    //代理解决跨域问题
    // proxy:proxyObj
  },
  resolve:{
    alias:[
      {
        find:'@',
        replacement:resolve(__dirname,'./src')
      }
    ]
  },
  css:{
    preprocessorOptions: {
      scss: {
          additionalData: '@import "@/styles/constant.scss";'
      }
    },
  },
})
