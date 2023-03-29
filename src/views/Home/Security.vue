<script setup lang="ts">
import {useRouter,} from "vue-router";
import { ElMessage } from 'element-plus'
import userApi from '../../api/user'
import { dataStore } from '../../store'
import { reactive, ref } from 'vue'

const centerDialogVisible = ref(false)
const { UserInfo } = dataStore()
const router = useRouter()

const deleteUser = ()=>{
  centerDialogVisible.value = true
}
const toRole = ()=>{
  router.push('/home/userInfo/bind')
}
const removePassword = ()=>[
  router.push('/home/userInfo/password')
]

const deA = ()=>{
  userApi.deleteUserById({id:UserInfo.id}).then(res=>{
    if(res){
      centerDialogVisible.value = false
      ElMessage.success({message:"注销成功",duration:700})
      setTimeout(() => {
            localStorage.clear()
            sessionStorage.clear()
            router.push('/login')
      }, 1000)
    }
  })
}
</script>

<template>
  <span class="title">账号安全</span>
  <div>
    <el-button type="primary" plain class="but-delete" @click="deleteUser"> 注 销 账 号 </el-button>
    <el-button type="primary" plain class="but-delete" @click="toRole"> 授 权 管 理 </el-button>
    <el-button type="primary" plain class="but-delete" @click="removePassword"> 修 改 密 码 </el-button>
  </div>
  <el-dialog v-model="centerDialogVisible" title="注销" width="30%" center>
    <span>
      确定注销该账号？
    </span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="deA">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<style scoped lang="scss">
.title{
  display: block;
  width: 100%;
  font-size: 24px;
  text-align: center;
  height: 60px;
  line-height: 60px;
  background-color: antiquewhite;
}
.but-delete{
  margin: 20px 0 20px 132px;
  width: 200px;
  height: 50px;
  font-size: 24px;
}
</style>
