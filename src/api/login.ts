
import login from './request'

// 登录验证
const loginApi = (data:any)=>{
    return login.post({
        url:'/login',  
        data
    })
}
// 更新密码
const backPassword = (data:any)=>{
    return login.post({
        url:'/backPassword',  
        data
    })
}

// 添加用户
const insertUser = (data:any)=>{
    return login.post({
        url:'/insertUser',  
        data
    })
}

const register = (data:any) =>{
    return login.post({
        url:'/updateStatuById',
        data  
    })
}

export default {
    loginApi,
    backPassword,
    register,
    insertUser
}