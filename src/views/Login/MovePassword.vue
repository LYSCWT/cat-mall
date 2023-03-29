<script setup lang="ts">
import {reactive, ref} from 'vue'
import {ElMessage, FormInstance} from 'element-plus'
import {useRouter} from "vue-router";
import {nanoid} from "nanoid";//模拟短信发送
import loginApi from '../../api/login'
import userApi from '../../api/user'
const router = useRouter();

const ruleFormRef = ref<FormInstance>()

let p: number = 0;//跟踪手机输入状态
let s: string = '';//验证码

const checkName = (rule: any, value: any, callback: any) => {
  if (!value) {
    return callback(new Error('请输入用户名'))
  }
  setTimeout(() => {
    if (!isNaN(value)) {
      callback(new Error('不能是存数字'))
    } else {
      userApi.selectUser({name:ruleForm.userName}).then(res=>{
        if(res){
          callback(new Error('用户不存在'))
        }else{
          callback()
        }
      })
    }
  }, 1000)
}

const checkPhone = (rule: any, value: any, callback: any) => {
  if (!value) {
    return callback(new Error('请输入手机号'))
  }
  if (!Number.isInteger(value)) {
    p = 2;
    callback(new Error('不能存在非数字'))
  } else {
    if (value < 9999999999 || value > 99999999999) {
      p = 2;
      callback(new Error('手机号格式不正确'))
    } else {
      setTimeout(()=>{
        userApi.selectPhoneByUserName({name:ruleForm.userName}).then(res=>{
          if(res){
            if(res.data === ruleForm.phone+''){
              p = 1;
              callback()
            }else{
              p = 2;
              callback(new Error('非该用户手机号码'))
            }
          }
        })
      },1000)
    }
  }
}

const checkSecurity = (rule: any, value: any, callback: any) => {
  if (!value) {
    return callback(new Error('请输入验证码'))
  }
  setTimeout(() => {
    if (value.length !== 6) {

      callback(new Error('请输入六位验证码'))
    } else {
      callback()
    }
  }, 1000)
}

const validatePass = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请输入密码'))
  } else {
    if (ruleForm.checkPass !== '') {
      if (!ruleFormRef.value) return
      ruleFormRef.value.validateField('checkPass', () => null)
    }
    callback()
  }
}

const validatePass2 = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请再次输入刚才的密码'))
  } else if (value !== ruleForm.pass) {
    callback(new Error("两次密码不相同"))
  } else {
    callback()
  }
}

const ruleForm = reactive({
  userName: '',
  pass: '',
  checkPass: '',
  phone: '',
  Security: '',
})

const rules = reactive({
  userName: [{validator: checkName, trigger: 'blur'}],
  pass: [{validator: validatePass, trigger: 'blur'}],
  checkPass: [{validator: validatePass2, trigger: 'blur'}],
  phone: [{validator: checkPhone, trigger: 'blur'}],
  Security: [{validator: checkSecurity, trigger: 'blur'}],
})

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      // 校验验证码+更新数据库

      loginApi.backPassword({name:ruleForm.userName,password:ruleForm.pass}).then(res=>{

        if(res){
           ElMessage.success({message:"修改成功！请重新登录！",duration:1000})
          //跳转到登录页面
          setTimeout(()=>{
            router.push({path: '/login'})
          },500)
        }
      })

    } else {
      console.log('error submit!')
      return false
    }
  })
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}

function GetSecurity() {
  //发送验证码
  if (p === 0) {
    alert('请输入手机号')
  } else if (p === 2) {
    alert('手机号错误')
  } else {
    alert('发送成功')
    s = nanoid().slice(0, 6)
    console.log(s)
  }
}
</script>

<template>
  <div class="top-text">
    <router-link to="/login" class="b-login">返回</router-link>
    <div class="center-text">
      <p>修改萌宠账号密码</p>
    </div>
  </div>
  <div class="context">
    <el-form
        ref="ruleFormRef"
        :model="ruleForm"
        status-icon
        :rules="rules"
        label-width="120px"
        class="demo-ruleForm"
    >
      <el-form-item label="用户名" prop="userName" class="lab">
        <el-input v-model.string="ruleForm.userName" class="phone"/>
      </el-form-item>

      <el-form-item label="密码" prop="pass" class="lab">
        <el-input v-model="ruleForm.pass" type="password" autocomplete="off" class="phone"/>
      </el-form-item>

      <el-form-item label="确认密码" prop="checkPass" class="lab">
        <el-input
            v-model="ruleForm.checkPass"
            type="password"
            autocomplete="off"
            class="phone"
        />
      </el-form-item>

      <el-form-item label="注册手机号" prop="phone" class="lab">
        <el-input v-model.number="ruleForm.phone" class="phone"/>
      </el-form-item>

      <el-form-item label="验证码" prop="Security" class="lab">
        <el-input v-model.string="ruleForm.Security" class="Security"/>
      </el-form-item>

      <el-form-item>
        <el-button @click="GetSecurity()" class="s-but">发送验证码</el-button>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm(ruleFormRef)" class="su-bu">修改</el-button>
        <el-button @click="resetForm(ruleFormRef)" class="re-bu">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped lang="scss">
.top-text {
  width: 100%;
  height: 60px;
  // background-color: #fca2a2;
  border-bottom: 1px solid gray;
  padding-top: 1px;

  .b-login {
    display: block;
    float: left;
    font-size: 18px;
    margin-top: 30px;
    margin-left: 40px;
  }

  .center-text {
    float: left;
    font-size: 32px;
    margin-top: 10px;
    margin-left: 550px;
  }
}

.context {
  margin-top: 20px;

  .lab {
    margin-left: 500px;
  }

  .phone {
    width: 300px;
    height: 30px;
    font-size: 18px;
  }

  .Security {
    width: 120px;
    height: 30px;
    font-size: 18px;

  }

  .su-bu {
    margin-left: 500px;
    width: 100px;
    height: 40px;
    font-size: 18px;
  }

  .re-bu {
    width: 100px;
    height: 40px;
    font-size: 18px;
    margin-left: 100px;
  }

  .s-but {
    position: absolute;
    margin-left: 700px;
    margin-top: -66px;
    width: 100px;
    height: 30px;
    border: none;
    background-color: #5fff4d;
    font-size: 16px;
    color: rgb(0, 0, 0);

  }

  .s-but:hover {
    background-color: #5aec4a;
    color: rgb(0, 0, 0);
    cursor: pointer;

  }
}
</style>
