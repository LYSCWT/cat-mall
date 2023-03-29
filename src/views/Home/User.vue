<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { dataStore } from '../../store'
import userApi from '../../api/user'
import { ElMessage } from 'element-plus'
const { UserInfo } = dataStore()
const formSize = ref('default')
const ruleFormRef = ref<FormInstance>()

const name = (rule: any, value: any, callback: any) => {
  if (!value) {
    return callback(new Error('请输入用户名'))
  }
  setTimeout(() => {
    userApi.selectUser({name:ruleForm.name}).then(res=>{
      console.log(res)
        if(res !== undefined){
          callback()
        }else{
          callback(new Error('用户名已被占用'))
        }
      })
    if(ruleForm.name === UserInfo.name){
      callback()
    }
  }
  
  , 1000)
}

const ruleForm = reactive({
  name: UserInfo.name,
  birthday:UserInfo.birthday,
  sex: UserInfo.sex,
})

const rules = reactive({
  name: [{ validator: name, trigger: 'blur' }],
})

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      userApi.updateUserById({id:UserInfo.id,name:ruleForm.name,sex:ruleForm.sex,birthday:ruleForm.birthday}).then(res=>{
        if(res){
          UserInfo.name = ruleForm.name
          UserInfo.sex = ruleForm.sex
          UserInfo.birthday = ruleForm.birthday
          ElMessage.success({message:"修改成功！",duration:800})
          setTimeout(()=>{
            window.location.reload();
          },1000)
        }
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
  <span class="title">个人信息</span>
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
    <el-form-item label="用户名" prop="name">
      <el-input v-model="ruleForm.name"  class="name"/>
    </el-form-item>
    
    <el-form-item label="生日">
      <el-col :span="11">
        <el-form-item prop="birthday">
          <el-date-picker
            v-model="ruleForm.birthday"
            type="date"
            label=""
            placeholder=""
            style="width: 100%"
          />
        </el-form-item>
      </el-col>
      
    </el-form-item>
    
    <el-form-item label="性别" prop="sex">
      <el-radio-group v-model="ruleForm.sex">
        <el-radio label="男" />
        <el-radio label="女" />
        <el-radio label="保密" />
      </el-radio-group>
    </el-form-item>
    
    <el-form-item>
      <el-button type="primary" @click="submitForm(ruleFormRef)">修改</el-button>
      <span class="sub"></span>
      <el-button @click="resetForm(ruleFormRef)" >恢复</el-button>
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
}
.context{
  padding: 40px;
  .name{
    width: 200px;
  }
  .sub{
    display: block;
    width: 50px;
    height: 20px;
  }
}

</style>
