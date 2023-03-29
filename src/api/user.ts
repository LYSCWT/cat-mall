import internal from 'stream'
import login from './request'


// 查找用户是否存在
const selectUser = (data:any)=>{
    return login.post({
        url:'/selectUserName',  
        data
    })
}

// 核对用户手机号码
const selectPhoneByUserName = (data:any)=>{
    return login.post({
        url:'/selectPhoneByUserName',  
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

// 更新用户信息
const updateUserById = (data:any)=>{
    return login.post({
        url:'/updateUserById',  
        data
    })
}

// 更新用户信息
const updateUserSecurityById = (data:any)=>{
    return login.post({
        url:'/updateUserSecurityById',  
        data
    })
}

// 删除用户
const deleteUserById = (data:any)=>{
    return login.post({
        url:'/deleteUserById',  
        data
    })
}

// 修改地址
const updateAddressById = (data:any)=>{
    return login.post({
        url:'/updateAddressById',  
        data
    })
}

// 查询地址
const selectAddress = (data:any)=>{
    return login.post({
        url:'/selectAddress',  
        data
    })
}

// 删除地址
const deleteAddress = (data:any)=>{
    return login.post({
        url:'/deleteAddress',  
        data
    })
}

// 添加地址
const insertAddress = (data:any)=>{
    return login.post({
        url:'/insertAddress',  
        data
    })
}

// 查询购物车
const selectCarByUserId = (data:any)=>{
    return login.post({
        url:'/selectCarByUserId',  
        data
    })
}

// 添加购物车物件
const insertCar = (data:any)=>{
    return login.post({
        url:'/insertCar',  
        data
    })
}

// 更新购物车物件数量（n++）
const updateCarById = (data:any)=>{
    return login.post({
        url:'/updateCarById',  
        data
    })
}

// 更新购物车物件数量（直接更新）
const updateCarCountById = (data:any)=>{
    return login.post({
        url:'/updateCarCountById',  
        data
    })
}

// 删除指定购物车(单个)
const deleteCarByCarId = (data:any)=>{
    return login.post({
        url:'/deleteCarByCarId',  
        data
    })
}

// 删除购物车部分
const deleteCarByCarsId = (data:any)=>{
    return login.post({
        url:'/deleteCarByCarsId',  
        data
    })
}

// 查询购物车（like）
const selectCarLikeName = (data:any)=>{
    return login.post({
        url:'/selectCarLikeName',  
        data
    })
}


// 查询订单
const selectOrder = (data:any)=>{
    return login.post({
        url:'/selectOrder',  
        data
    })
}

// 查询订单（like）
const selectOrderLikeName = (data:any)=>{
    return login.post({
        url:'/selectOrderLikeName',  
        data
    })
}
// 删除订单
const deleteOrder = (data:any)=>{
    return login.post({
        url:'/deleteOrder',  
        data
    })
}

// 修改订单状态（退款）
const updateOrderById = (data:any)=>{
    return login.post({
        url:'/updateOrderById',  
        data
    })
}

// 添加订单
const insertOrder = (data:any)=>{
    return login.post({
        url:'/insertOrder',  
        data
    })
}

// 升级Vip
const updateRoleById = (data:any)=>{
    return login.post({
        url:'/updateRoleById',  
        data
    })
}


export default {
    selectUser,
    backPassword,
    selectPhoneByUserName,
    updateUserById,
    updateUserSecurityById,
    updateAddressById,
    selectAddress,
    deleteAddress,
    insertAddress,
    deleteUserById,
    selectCarByUserId,
    insertCar,
    updateCarById,
    updateCarCountById,
    deleteCarByCarId,
    deleteCarByCarsId,
    selectCarLikeName,
    insertOrder,
    selectOrder,
    selectOrderLikeName,
    deleteOrder,
    updateOrderById,
    updateRoleById
}