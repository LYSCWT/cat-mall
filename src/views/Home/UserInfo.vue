<script setup lang="ts">
import { reactive, ref } from 'vue'
import { ElMessage, FormInstance } from 'element-plus'
import api from '@/api/login'
import { config } from 'process';
import { dataStore } from '../../store'
import { storeToRefs } from 'pinia';

const users = dataStore()

</script>

<template>
  <div class="left">
    <span class="text">设置</span>
    <router-link to="/home/userInfo/user" class="link-to">个人信息</router-link>
    <router-link to="/home/userInfo/avater" class="link-to">头像照片</router-link>
    <router-link to="/home/userInfo/bind" class="link-to">账号绑定</router-link>
    <router-link to="/home/userInfo/addres" class="link-to">收货地址</router-link>
    <router-link to="/home/userInfo/security" class="link-to">账号安全</router-link>
  </div>
  <div class="right">
    <router-view></router-view>
  </div>  
</template>

<style scoped lang="scss">
.left{
  float: left;
  margin-left: 20%;
  width: 100px;
  height: 680px;
  .text{
    display: block;
    margin-top: 20px;
    font-weight: bold;
  }
  .link-to{
    display: block;
    margin-top: 10px;
    font-size: 14px;
  }
  .link-to:hover{
    color: red;
    text-decoration: underline;
  }
}
.right{
  float: left;
  margin: 20px;
  width: 800px;
  // height: 600px;
  background-color: #fff;
}

</style>
