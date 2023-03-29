import Service from './config'

// let token = ''
// const http = {
//     /**
//      * methods: 请求
//      * @param url 请求地址 
//      * @param params 请求参数
//      */
//     get(url: string, params?: any) {
//         if(sessionStorage.getItem("token") !== null){
//             token = sessionStorage.getItem("token")
//         }
//         const config = {
//             method: 'get',
//             url: encodeURI(url),
//             headers: {
//                 'Authorization': token
//             },
//             params: null
//         }
//         if (params) config.params = qs.stringify(params)
//         return request(config)
//     },
//     post(url: string, params?: any) {
//         token = sessionStorage.getItem("token")
//         const config = {
//             method: 'post',
//             url: encodeURI(url),
//             headers: {
//                 'Authorization': token
//             },
//             data: null
//         }
//         if (params) config.data = qs.stringify(params)
//         return request(config)
//     },
//     put(url: string, params?: any) {
//         token = sessionStorage.getItem("token")
//         const config = {
//             method: 'put',
//             url: encodeURI(url),
//             headers: {
//                 'Authorization': token
//             },
//             params: null
//         }
//         if (params) config.params = qs.stringify(params)
//         return request(config)
//     },
//     delete(url: string, params?: any) {
//         token = sessionStorage.getItem("token")
//         const config = {
//             method: 'delete',
//             url: encodeURI(url),
//             headers: {
//                 'Authorization': token
//             },
//             params: null
//         }
//         if (params) config.params = qs.stringify(params)
//         return request(config)
//     }
// }
//封装get请求
const get = (config: any)=>{
    return Service({
        ...config,
        method:'get',
        params: config.data
    })
}


//封装post请求
const post = (config: any)=>{
    return Service({
        ...config,
        method:'post',
        params:config.data
    })
}

export default {
    get,
    post
}