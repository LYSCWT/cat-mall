import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router'
import { ElMessage } from 'element-plus'

const routers: Array<RouteRecordRaw> = [
    {
        path: '/',
        redirect: '/home'
    },
    {
        path: '/home',
        redirect: '/home/shopper'
    },
    {
        path: '/home/userInfo',
        redirect: '/home/userInfo/user'
    },
    {
        path: '/home',
        name: 'Home',
        component: () => import('@/views/Home/index.vue'),
        children:[
            {
                path:'shopper',
                name:'Goods',
                component:()=>import('@/views/Home/Goods.vue')
            },
            {
                path:'car',
                name:'Car',
                component:()=>import('@/views/Home/Car.vue')
            },
            {
                path:'order',
                name:'Order',
                
                component:()=>import('@/views/Home/Order.vue')
            },
            {
                path:'shopperInfo',
                name:'ShopperInfo',
                component:()=>import('@/views/Home/ShopperInfo.vue')
            },
            {
                path:'userInfo',
                name:'UserInfo',
                component:()=>import('@/views/Home/UserInfo.vue'),
                children:[
                    {
                        path:'user',
                        name:'User',
                        component:()=>import('@/views/Home/User.vue')
                    },
                    {
                        path:'avater',
                        name:'Avater',
                        component:()=>import('@/views/Home/Avater.vue')
                    },
                    {
                        path:'addres',
                        name:'Addres',
                        component:()=>import('@/views/Home/Addres.vue')
                    },
                    {
                        path:'bind',
                        name:'Bind',
                        component:()=>import('@/views/Home/Bind.vue')
                    },
                    {
                        path:'security',
                        name:'Security',
                        component:()=>import('@/views/Home/Security.vue')
                    },
                    {
                        path:'password',
                        name:'Password',
                        component:()=>import('@/views/Home/Password.vue')
                    },
                ]
            },
        ]
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('@/views/Login/index.vue'),
        
    },
    {
        path: '/movePassword',
        name: 'MovePassword',
        component: () => import('@/views/Login/MovePassword.vue'),
    },
    {
        path: '/register',
        name: 'Register',
        component: () => import('@/views/Login/Register.vue'),
    }
]
const router = createRouter({
    history: createWebHistory(),
    routes: routers
})

// router.beforeEach((to,from,next)=>{
//     let token = sessionStorage.getItem("token")
//     if(token === null || token === undefined || token === ''){
//         if(to.path !== '/login' && to.path !== '/movePassword' && to.path !== '/register' && to.path !== '/home' &&to.path !== '/home/shopper'){
//             // alert('尚未登录，请登录!')
//             // next('/login') 
//             next()
//         }else{ 
//             next()
//         }
//     }else{
//         next()
//     }
// })
export default router