import axios from "axios";
import { ElMessage } from 'element-plus'
import {useRouter} from "vue-router";
import qs from 'qs'
const router = useRouter()

// 封装请求失败的统一处理
const errorHandle = (status: number, other: string) => {
    switch (status) {
      case 302: ElMessage.error('接口重定向了！');
        break;
      case 400:
        ElMessage.error("发出的请求有错误，服务器没有进行新建或修改数据的操作==>" + status)
        break;                
      case 401:
        router.replace({
          path: '/login',
        });
        break;
        // 403 token过期
        // 清除token并跳转登录页
      case 403:
        ElMessage.error("登录过期,用户得到授权，但是访问是被禁止的==>" + status)
        // store.commit('token', null);
        setTimeout(() => {
          router.replace({
            path: '/login',
          });
        }, 1000);
        break;
      case 404:
        ElMessage.error("网络请求不存在==>" + status)
        break;
      case 406:
        ElMessage.error("请求的格式不可得==>" + status)
        break;
      case 408: ElMessage.error(" 请求超时！")
        break;
      case 410:
        ElMessage.error("请求的资源被永久删除，且不会再得到的==>" + status)
        break;
      case 422:
        ElMessage.error("当创建一个对象时，发生一个验证错误==>" + status)
        break;
      case 500:
        ElMessage.error("服务器发生错误，请检查服务器==>" + status)
        break;
      case 502:
        ElMessage.error("网关错误==>" + status)
        break;
      case 503:
        ElMessage.error("服务不可用，服务器暂时过载或维护==>" + status)
        break;
      case 504:
        ElMessage.error("网关超时==>" + status)
        break;
      default:
        ElMessage.error("其他错误错误==>" + status)
    }
}
// const token = String(window.localStorage.getItem('token'))
// 实例化请求配置
 
/** 
 * 请求拦截器 
 * 每次请求前，如果存在token则在请求头中携带token 
 */

//创建axios实例
const Service = axios.create({
    //设置访问服务器地址
    // baseURL:'http://120.24.64.5:8088/mall-admin/',

    baseURL:'http://localhost:8081/catmall',
    //设置请求头
    headers:{
        'Content-Type':"application/json;charset=UTF-8",

    },

    timeout:1000
})
//请求拦截,用在请求首页的时候（不先登录直接访问页面）
Service.interceptors.request.use((config)=>{
    

    return config
},
error => {
  ElMessage.error(error.data.error.msg);
  return Promise.reject(error.data.error.msg);
})


//响应拦截
Service.interceptors.response.use((response)=>{
    //成功调取后端接口，但返回业务逻辑错误
    if(response.status && response.status === 200){
        //服务器问题，页面丢失，权限问题（不固定依据后端编写的code代表内容message决定)
        if(response.data.code === 500 || response.data.code === 401 ||response.data.code === 400 || response.data.code === 403 || 
            response.data.code === 402||response.data.code === 411 ||response.data.code === 412){
              
            return;
        }else{
          if( sessionStorage.getItem("token") === undefined || sessionStorage.getItem("token") === '' || sessionStorage.getItem("token") ===null){
            sessionStorage.setItem("token",response.headers["authorization"])
          }
        }
    }
    //解封返回data，不包含headers等数据
    return response.data
},
(error)=>{
    const { response } = error;
    if (error && response) {
        errorHandle(response.status, response.data.msg);
        return Promise.reject(error.response.data)
      // 请求失败
    } else {
      // 超时处理
      if (JSON.stringify(error).includes('timeout')) {
        ElMessage.error('服务器响应超时，请刷新当前页')
      }
      return Promise.reject(error.msg)
    }
}
) 

export default Service
