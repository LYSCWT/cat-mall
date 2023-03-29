import internal from 'stream'
import login from './request'

// 获取所有用户信息
const selectShopLists = (data:any) =>{
    return login.get({
        url:'/selectShopLists',  
        data
    })
}


export default {
    selectShopLists
}