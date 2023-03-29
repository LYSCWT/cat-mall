<script setup lang="ts">
import { dataStore } from '../../store'
import userApi from '../../api/user'
import { ElMessage } from 'element-plus'
import { reactive, ref } from 'vue'

const dialogFormVisible = ref(false)
const centerDialogVisible = ref(false)
const dialogFormVisibleremove = ref(false)
const formLabelWidth = '140px'
const { UserInfo,Address } = dataStore()



const  clear = dataStore()

function getData(){
  userApi.selectAddress({id:UserInfo.id}).then(res=>{
    if(res){
      clear.clearAddress()
      for(let i=0;i<res.data.length;i++){
        Address.push(res.data[i])
      }
    }
  })
}

getData()

const form = reactive({
  people: '',
  phone:'',
  address:''
})

const items = reactive({
  itemId:'',
  index:0
})

let itemAddres:any = ref({})

const Cancel = ()=>{
  dialogFormVisible.value = false
  centerDialogVisible.value = false
  dialogFormVisibleremove.value = false
  form.people = ''
  form.phone = ''
  form.address = ''
  items.itemId = ''
}
const submit = ()=>{
  if(form.address === '' || form.people === '' || form.phone === ''){
    ElMessage.error({message:"内容不能有空！",duration:1000})
  }else{
    userApi.insertAddress({id:UserInfo.id,people:form.people,phone:form.phone,address:form.address}).then(res=>{
      if(res){
        dialogFormVisible.value = false
        ElMessage.success({message:"添加成功",duration:700})
        Address.push(form)
      }
    })
  }
}
const addAddress = ()=>{
  dialogFormVisible.value = true
}
const removeAddress = ( id:any ,index:any)=>{
  dialogFormVisibleremove.value = true
  items.itemId = id
  items.index = index
  itemAddres.value = Address[index]
  console.log(itemAddres)
}
const deleteAddress = (id:any)=>{
  centerDialogVisible.value = true
  items.itemId = id
}
const deA = ()=>{
  userApi.deleteAddress({id:items.itemId}).then(res=>{
    if(res){
      getData()
      centerDialogVisible.value = false
      ElMessage.success({message:"删除成功",duration:500})
      setTimeout(()=>{
            window.location.reload();
      },1000)
      
    }
  })
}
const updateAddress = ()=>{
  dialogFormVisibleremove.value = false
  console.log(form.people+form.address+form.phone)
  userApi.updateAddressById({id:Address[items.index].id,people:form.people,phone:form.phone,address:form.address}).then(res=>{
    if(res){
      dialogFormVisible.value = false
      ElMessage.success({message:"更新成功",duration:700})
      setTimeout(()=>{
          window.location.reload();
      },1000)
    }
  })
  
}

</script>

<template>
  <span class="title">收货地址</span>
  <div class="context">
    <span class="text" v-for=" (item,index) in Address" :key="item.id">收货地址 {{ index+1 }}<br/>
      收件人：{{ item.people }}<br/>
      电话号码：{{ item.phone }}<br/>
      收货地址： {{ item.address }}
      <el-button class="detete" @click="deleteAddress(item.id)">删 除</el-button>
      <el-button class="remove" @click="removeAddress(item.id,index)">修 改</el-button>
    </span>
    <el-button class="submit" type="success" @click="addAddress">添 加</el-button>

    <el-dialog v-model="dialogFormVisible" title="添加地址">
    <el-form :model="form">
      <el-form-item label="收件人" :label-width="formLabelWidth" >
        <el-input v-model="form.people" autocomplete="off" class="in"/>
      </el-form-item>
      <el-form-item label="电话" :label-width="formLabelWidth" >
        <el-input v-model="form.phone" autocomplete="off" class="in"/>
      </el-form-item>
      <el-form-item label="地址" :label-width="formLabelWidth" >
        <el-input v-model="form.address" autocomplete="off" class="in"/>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="Cancel">取消</el-button>
        <el-button type="primary" @click="submit">添加</el-button>
      </span>
    </template>
  </el-dialog>

  <el-dialog v-model="dialogFormVisibleremove" title="修改地址">
    <el-form :model="form">
      <el-form-item label="收件人" :label-width="formLabelWidth" >
        <el-input v-model="form.people" autocomplete="off" class="in" :placeholder="itemAddres.people"/>
      </el-form-item>
      <el-form-item label="电话" :label-width="formLabelWidth" >
        <el-input v-model="form.phone" autocomplete="off" class="in" :placeholder="itemAddres.phone"/>
      </el-form-item>
      <el-form-item label="地址" :label-width="formLabelWidth" >
        <el-input v-model="form.address" autocomplete="off" class="in" :placeholder="itemAddres.address"/>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="Cancel">取消</el-button>
        <el-button type="primary" @click="updateAddress">修改</el-button>
      </span>
    </template>
  </el-dialog>


  <el-dialog v-model="centerDialogVisible" title="删除" width="30%" center>
    <span>
      确定删除该地址？
    </span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="deA">确认</el-button>
      </span>
    </template>
  </el-dialog>
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
  font-size: 20px;
  .text{
    position: relative;
    font-size: 18px;
    display: block;
    width: 520px;
    margin: 20px 0 20px 120px;
    background-color: #eeeeee;
    padding: 10px;
    color: #7d7d7d;
    .detete{
      position: absolute;
      width: 50px;
      left: 450px;
      border: none;
      font-size: 16px;
      color: rgb(114, 151, 245);
      background-color: rgb(238, 238, 238);
    }
    .detete:hover{
      color: red;
      text-decoration: underline;
    }
    .remove{
      position: absolute;
      width: 50px;
      top: 12px;
      left: 436px;
      border: none;
      font-size: 16px;
      color: rgb(114, 151, 245);
      background-color: rgb(238, 238, 238);
    }
    .remove:hover{
      color: red;
      text-decoration: underline;
    }
  }
  .newtext{
    margin-left:120px ;
    float: left;
  }
  .input{
    font-size: 20px;
    width: 400px;
    height: 30px;
  }
  .submit{
    margin: 10px 0 20px 120px;
    width: 520px;
    height: 50px;
    font-size: 24px;
  }
}
.in{
  width: 300px;
}
</style>
