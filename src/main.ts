import {createApp, toRaw} from 'vue'
import App from './App.vue'
import router from './router'
import 'element-plus/es/components/message/style/css'
import '@/styles/index.scss'
import ElementPlus from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import locale from 'element-plus/lib/locale/lang/zh-cn'
import { createPinia,PiniaPluginContext } from "pinia"
const store = createPinia()

// pinia持久化
type Options = {
  key?:string
}

const __PiniaKey__ = "UserInfos"

const setStorage = (key:string,value:any)=>{
  localStorage.setItem(key,JSON.stringify(value))
}

const getStorage = (key:string)=>{
  return localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key) as string) : {}
}

const piniaPlugin = (option:Options)=>{
  return (context:PiniaPluginContext)=>{
    const { store } = context
    const data = getStorage(`${option?.key ?? __PiniaKey__}`)
    store.$subscribe(()=>{
      setStorage(`${option?.key ?? __PiniaKey__}`,toRaw(store.$state))
    })
    return { ...data }
  }
}


store.use(piniaPlugin({
  key:"UserInfos"
}))


//修改分页文字样式



const app = createApp(App)
app.use(router)
app.use(store)
app.use(ElementPlus, {size: 'small', zIndex: 3000,locale:locale})
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }
app.mount('#app')
