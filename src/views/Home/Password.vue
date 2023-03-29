<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import {useRouter,} from "vue-router";
import loginApi from '@/api/login'
import { dataStore } from '../../store'
import { ElMessage } from 'element-plus'

const { UserInfo } = dataStore()
const router = useRouter()

const formSize = ref('default')
const ruleFormRef = ref<FormInstance>()

const password = (rule: any, value: any, callback: any) => {
  if (!value) {
    return callback(new Error('密码不能为空'))
  }
  callback()
}

const checkpsd = (rule: any, value: any, callback: any) => {
  if (!value) {
    return callback(new Error('确认密码不能为空'))
  }
  setTimeout(() => {
    if(ruleForm.password === ruleForm.checkpsd){
        callback()
    }else{
        return callback(new Error('两次密码不一致'))
    }
  }, 800)
}

const ruleForm = reactive({
  password: '',
  checkpsd: '',
})

const rules = reactive({
    password: [{ validator: password, trigger: 'blur' }],
    checkpsd: [{ validator: checkpsd, trigger: 'blur' }],
})

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      loginApi.backPassword({name:UserInfo.name,password:ruleForm.password}).then(res=>{
        ElMessage.success({message:'重置密码成功!',duration:500})
        setTimeout(() => {
              localStorage.clear()
              sessionStorage.clear()
              ElMessage.success({message:'请重新登录'})
              router.push('/login')
        }, 1000)
      })
    } else {
      console.log('error submit!', fields)
    }
  })
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}
</script>

<template>
  <span class="title">密码修改</span>
  <div class="context">
    <el-form
    ref="ruleFormRef"
    :model="ruleForm"
    :rules="rules"
    label-width="280px"
    class="demo-ruleForm"
    :size="formSize"
    status-icon
  >
    <el-form-item label="新密码" prop="password">
      <el-input v-model="ruleForm.password" type="password"  class="password"/>
    </el-form-item>
    <el-form-item label="确认密码" prop="checkpsd" >
      <el-input v-model="ruleForm.checkpsd" type="password" class="password"/>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="submitForm(ruleFormRef)">确认</el-button>
      <span class="sub"></span>
      <el-button @click="resetForm(ruleFormRef)" >清空</el-button>
    </el-form-item>
  </el-form>
  </div>
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
  margin-bottom: 20px;
}
.context{
  font-size: 20px;
  .password{
    width: 250px;
    font-size: 20px;
  }
  .sub{
    width: 100px;
  }
}

</style>
