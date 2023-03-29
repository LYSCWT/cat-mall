<script setup lang="ts">
import { dataStore } from '../../store'
import userApi from '../../api/user'
import { ElMessage } from 'element-plus'
import { reactive, ref } from 'vue'

const centerDialogVisible = ref(false)
const dialogTableVisible = ref(false)
const dialogFormVisible = ref(false)
const show = ref(false)
const formLabelWidth = '140px'

let remove = ref('')


const { UserInfo } = dataStore()
const form = reactive({
  email: '',
  phone:''
})

let IsBind_p = ref(true)
let IsBind_e = ref(false)
let BindClass = ref({
  y:"bind-y",
  n:"bind-n"
})

if (UserInfo.email) {
  IsBind_e.value = true
}

const removeP =()=>{
  dialogTableVisible.value = true
  dialogFormVisible.value = true
  show.value = true
  remove.value = '修改绑定'

}
const bindP =()=>{
  dialogTableVisible.value = true
  dialogFormVisible.value = true
  show.value = true
  remove.value = '绑定'
}
const removeE =()=>{
  dialogTableVisible.value = true
  dialogFormVisible.value = true
  show.value = false
  remove.value = '修改绑定'
}
const deleteE =()=>{
  centerDialogVisible.value = true
  remove.value = '解除绑定'
  
}
const bindE =()=>{
  dialogTableVisible.value = true
  dialogFormVisible.value = true
  show.value = false
  remove.value = '绑定'
}
const Cancel = ()=>{
  dialogFormVisible.value = false
  form.email = ''
  form.phone = ''
}
const submitP = ()=>{
  if(form.phone !== ''){
    dialogFormVisible.value = false
    userApi.updateUserSecurityById({id:UserInfo.id,phone:form.phone,email:form.email}).then(res=>{
      if(res){
        UserInfo.phone = form.phone
        ElMessage.success({message:"成功绑定！",duration:800})
        setTimeout(()=>{
            window.location.reload();
        },1000)
      }
    })
  }else{
    ElMessage.error({message:"请输入手机号码！",duration:1000})
  }
}
const submitE = ()=>{
  let e = /^\w+@[a-z0-9]+\.[a-z]+$/i
  if(e.test(form.email)){
    dialogFormVisible.value = false
    userApi.updateUserSecurityById({id:UserInfo.id,phone:form.phone,email:form.email}).then(res=>{
      if(res){
        UserInfo.email = form.email
        ElMessage.success({message:"成功绑定！",duration:800})
        setTimeout(()=>{
            window.location.reload();
        },1000)
      }
    })
  }else{
    ElMessage.error({message:"邮箱格式错误！",duration:1000})
  }
}
const deE = ()=>{
  centerDialogVisible.value = false
  userApi.updateUserSecurityById({id:UserInfo.id,phone:UserInfo.phone,email:''}).then(res=>{
    if(res){
      UserInfo.email = ''
      ElMessage.success({message:"解绑成功！",duration:800})
      setTimeout(()=>{
          window.location.reload();
      },1000)
    }
  })
}
</script>

<template>
  <span class="title">账号绑定</span>

  <div class="context">
    <div class="text">
      <span >手机号码：</span>
      <span :class="BindClass.y" v-show="IsBind_p">{{ "已绑定" }}  </span>
      <span :class="BindClass.n" v-show="!IsBind_p">{{ "未绑定" }}  </span>
      <el-button class="but1" v-show="IsBind_p" @click="removeP">修改</el-button>
      <el-button class="but1" v-show="!IsBind_p" @click="bindP">绑定</el-button>
    </div>
    <div class="text">
      <span>邮箱：</span>
      <span :class="BindClass.y" v-show="IsBind_e">{{ "已绑定" }}</span>
      <span :class="BindClass.n" v-show="!IsBind_e">{{ "未绑定" }}</span>
      <el-button class="but1" v-show="IsBind_e" @click="removeE">修改</el-button>
      <el-button class="but1" v-show="IsBind_e" @click="deleteE">解绑</el-button>
      <el-button class="but1" v-show="!IsBind_e" @click="bindE">绑定</el-button>
    </div>
  </div>

  <el-dialog v-model="dialogFormVisible" :title="remove">
    <el-form :model="form">
      <el-form-item label="手机号码" :label-width="formLabelWidth"  v-show="show">
        <el-input v-model="form.phone" autocomplete="off"/>
      </el-form-item>
      <el-form-item label="邮箱" :label-width="formLabelWidth" v-show="!show">
        <el-input v-model="form.email" autocomplete="off" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="Cancel">取消</el-button>
        <el-button type="primary" @click="submitP" v-show="show">绑定</el-button>
        <el-button type="primary" @click="submitE" v-show="!show">绑定</el-button>
      </span>
    </template>
  </el-dialog>

  <el-dialog v-model="centerDialogVisible" title="解绑" width="30%" center>
    <span>
      确定解除绑定？
    </span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="deE">确认</el-button>
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
.context{
  font-size: 16px;
  .text{
    display: block;
    width: 680px;
    height: 40px;
    margin: 20px 0 20px 50px;
    border-radius: 10px;
    line-height: 40px;
    padding: 0 0 0 20px;
    background-color: #f3f3f3;
  }
  .bind-y{
    color: rgb(38, 176, 255);
  }
  .bind-n{
    color: red;
  }
  .but1{
    width: 30px;
    border: none;
    background-color: #f3f3f3;
    font-size: 16px;
    float: right;
    margin-right: 20px;
    margin-top: 10px;
  }
  .but1:hover{
    background-color: #f3f3f3;
  }
}
.el-button--text {
  margin-right: 15px;
}
.el-select {
  width: 300px;
}
.el-input {
  width: 300px;
}
.dialog-footer button:first-child {
  margin-right: 10px;
}
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>
