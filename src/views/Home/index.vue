<script setup lang="ts">
import {useRouter,} from "vue-router";
import { ElMessage } from 'element-plus'
import { ref,reactive  } from 'vue'
import { dataStore } from '../../store'
import userApi from '../../api/user'
import { update } from "lodash";
const data = dataStore()
const { UserInfo,Address,Order } = dataStore()

const router = useRouter()
let avaterUrl = ref('../../src/assets/avatar/'+"1"+'.jpg')
let IsLogin = ref(false)
let user:any = reactive(JSON.parse(localStorage.getItem('UserInfos')||''))


function getData(){
  userApi.selectAddress({id:UserInfo.id}).then(res=>{
    if(res){
     data.clearAddress()
      for(let i=0;i<res.data.length;i++){
        Address.push(res.data[i])
      }
    }
  })
}
getData()

function getOrder(){
  userApi.selectOrder({id:UserInfo.id}).then(res=>{
    if(res){
     Order.splice(0,Order.length)
      for(let i=0;i<res.data.length;i++){
        Order.push(res.data[i])
      }
    }
  })
}
getOrder()

if (user.UserInfo !== null ||user.UserInfo !== undefined) {
     console.log(user.UserInfo)
     avaterUrl.value = '../../src/assets/avatar/'+user.UserInfo.avatar+'.jpg'
     IsLogin.value = true
}else{
     IsLogin.value = false
}

const removeAvater = ()=>{
     router.push({path:'/home/userInfo/avater'})
}

function outLogin(){
     ElMessage.success({message:'正在退出中'})
     setTimeout(() => {
          localStorage.clear()
          sessionStorage.clear()
          ElMessage.success({message:'已退出登录！'})
          router.push('/login')
     }, 1000)
}

const updateRole = ()=>{
     userApi.updateRoleById({userId:UserInfo.id}).then(res=>{
          if(res){
               let a= UserInfo.roleName
               if(parseInt(a.replace(/[^0-9]/g, "")) < 2 ){
                    UserInfo.roleName = 'vip'+(parseInt(a.replace(/[^0-9]/g, ""))+1)
                    window.location.reload();
               }else{
                    ElMessage.success({message:"已经是最高等级",duration:1000})
               }
          }
     })
}
</script>

<template>  
     <div class="common-layout">
          <el-container>
               <el-header class="el-header">
                    <div class="text-link">
                         <span class="text" v-show="!IsLogin">欢迎来到萌宠之家,请 </span>
                         <router-link to="/login" class="linklo" v-show="!IsLogin">登录/</router-link>
                         <router-link to="/register" class="linkgi" v-show="!IsLogin">注册</router-link>

                         <img :src="avaterUrl" alt="个人头像" class="avatar" v-show="IsLogin" title="更改头像" @click="removeAvater">
                         <b><span class="text" v-show="IsLogin">{{ user.UserInfo.name }} 
                              <span class="roleName" @click="updateRole" title="升级会员">{{ user.UserInfo.roleName }}</span></span></b>

                         <el-divider direction="vertical"/>
                         <router-link to="/home/shopper" class="link">首页</router-link>
                         <el-divider direction="vertical" />
                         <router-link to="/home/userInfo" class="link">个人信息</router-link>

                         <el-divider direction="vertical" />
                         <router-link to="/home/car" class="link">购物车</router-link>
                         <el-divider direction="vertical" />
                         <router-link to="/home/order" class="link">订单</router-link>
                         <el-divider direction="vertical" v-show="IsLogin"/>
                         <el-button class="linkbu" v-show="IsLogin" @click="outLogin">退出登录</el-button>
                         
                    </div>
               </el-header>
               <el-main class="el-main">
                    <router-view></router-view>
               </el-main>
          </el-container>
     </div>
</template>

<style scoped lang="scss">
.el-header{
     width: 100%;
     height: 40px;
     border-bottom: 1px solid rgb(226, 226, 226);
     background-color: rgba(202, 202, 202, 0.138);
    
     .text-link{
          float: right;
          height: 40px;
          margin-right: 120px;
          .avatar{
               display: inline;
               width: 38px;
               height: 38px;
               border-radius: 50%;
               border: 1px solid red;
               vertical-align:middle;
               cursor: pointer;
          }

          .text{
               color: rgb(164, 164, 164);
               margin: 0 10px;
               font-size: 14px;
               line-height: 40px;
               .roleName{
                    cursor: pointer;
               }
          }
          .linklo{
               color: red;
               font-size: 14px;
               line-height: 40px;
          }
          .linkgi{
               color: red;
               font-size: 14px;
               line-height: 40px;
               
          }
          .linklo:hover{
               font-weight: bold;
          }
          .linkgi:hover{
               font-weight: bold;
          }
          .link{
               color: rgb(164, 164, 164);
               font-size: 14px;
               line-height: 40px;
          }
          .link:hover{
               color: red;
          }
          .linkbu{
               color: rgb(164, 164, 164);
               font-size: 14px;
               border: none;
               background:none;
               line-height: 39px;
               width: 60px;
          }
          .linkbu:hover{
               background:none;
               color: red;
          }
          .linkbu:visited{
               background:none;
               color:  rgb(164, 164, 164);
          }
     }
}
.el-main{
     width: 100%;
     // height: 900px;
     padding: 0;
     background-color: rgb(244, 244, 244);
}
</style>