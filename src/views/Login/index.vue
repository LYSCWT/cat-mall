<template>
    <div class="common-layout">
        <el-container>
            <el-header class="el-header">
                <div class="logo">
                    <img src="@/assets/logo.jpg" alt="宠物商城">
                </div>
            </el-header>
            <el-main class="el-main">
                <div class="login">
                    <div class="text">账 号 登 录</div>
                    <div class="content">
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-zhanghu"></use>
                        </svg>
                        <el-input v-model.number="user.name" type="text" placeholder="用户名/手机号码" class="in"/>
                        <br/><br/><br/>
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-mima"></use>
                        </svg>
                        <el-input v-model="user.password" type="password" placeholder="密 码" autocomplete="off" class="in"/>
                        <br/><br/><br/><br/>
                        <span>
                            <router-link to="/movePassword" class="toReback">忘记密码</router-link>
                        </span>
                        <br/><br/>

                        <el-button type="success" @click="login" class="but">登<span class="space"></span>录</el-button>
                    </div>
                    <div class="register">
                        <span class="register_text">萌宠之家欢迎你 </span>
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-Rightxiangyou34"></use>
                        </svg>
                        <span>
                            <router-link to="/register" class="toRegiter">注册</router-link>
                        </span>
                    </div>
                </div>
            </el-main>
            <el-footer class="el-footer">
                <span class="copy">Copyright © 2022-2023 萌宠之家MC.com版权所有</span>
            </el-footer>
        </el-container>
    </div>
    
</template>

<script setup lang="ts">
import {reactive} from 'vue'
import {ElMessage} from 'element-plus'
import api from '@/api/login'
import {useRouter,} from "vue-router";
import { dataStore } from '../../store'

const router = useRouter()
const userInfo = dataStore()

const user = reactive({
    name:'user1',
    password:'123456'
})

const login = ()=>{
    if(user.password === '' || user.name === ''){
        ElMessage.error({message:'用户名或者密码为空',duration:1000})
    }else{
        api.loginApi(user).then(res =>{
            if (res) {
                router.push({path:"/home"})
                userInfo.UserInfo = res.data
                ElMessage.success({message:res.msg,duration:1000})
            }else{
                ElMessage.error({message:"用户名或密码错误",duration:1000})
            }
        })
    }
}

</script>

<style scoped lang="scss">
.el-header{
    // background-color: rgb(229, 229, 229);
    height: 80px;
    .logo{
        width: 230px;
        height: 80px;
        margin: 0 auto;
        img{
            height: 80px;
        }
    }
}
.el-main{
    height: 540px;
    background: url("/src/assets/background.jpg") no-repeat;
    background-size: 100%;
    .login{
        width: 400px;
        height: 450px;
        background: rgb(255, 255, 255,0.8);
        float: right;
        margin-top: 1%;
        margin-right: 10%;
        .text{
            width: 100%;
            height: 80px;
            border-bottom: 1px solid rgb(207, 207, 207);
            text-align: center;
            line-height: 80px;
            font-size: 24px;
            font-weight: bold;
        }
        .content{
            width: 100%;
            height: 278px;
            .icon{
                width: 40px;
                height: 40px;
                float: left;
                margin-left: 70px;
                margin-top: 30px;
            }
            .in{
                width: 200px;
                height: 40px;
                margin-top: 30px;
                float: left;
                font-size: 24px;
            }
            .but{
                margin-left: 90px;
                width: 220px;
                height: 40px;
                font-size: 24px;
                .space{
                    margin: 0px 15px;
                }
            }
            .toReback{
                font-size: 18px;
                color: red;
                margin-left: 230px;
            }
            .toReback:hover{
                font-weight: bold;
            }
        }
        .register{
            width: 100%;
            height: 80px;
            border-top: 1px solid rgb(207, 207, 207);
            font-size: 24px;
            line-height: 80px;
            text-align: center;
            .register_text{
                margin-right: 10px;
            }
            .toRegiter{
                margin-left: 10px;
                color: red;
            }
            .toRegiter:hover{
                font-weight: bold;
            }
        }
    }
}
.el-footer{
    background-color: rgb(160, 160, 160);
    height: 101px;
    text-align: center;
    .copy{
        font-size: 18px;
        line-height: 101px;
    }
}
</style>