<script setup lang="ts">
import { reactive, ref } from 'vue'
import { dataStore } from '../../store'
import {  useRoute  } from 'vue-router'
import userApi from '../../api/user'
import { ElMessage } from 'element-plus'

const {  query } = useRoute();
const { Datas,UserInfo,Car,Address,Order } = dataStore();
let centerDialogVisible = ref(false)
let addressId = ref('')
let IsReprace = ref(false)

// console.log(query.serial)
let data:any = reactive({})
console.log(Datas)
for(let i=0;i<Datas.length;i++){
    for(let n=0;n<4;n++){
        if(Datas[i][n].serial === query.serial){
            data = Datas[i][n]
        }
    }
}

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

let imgUrl = ref(data.imgUrl)

const num = ref(1)

const order = reactive({
  id:UserInfo.id,
  name:'',
  num:1,
  total:0,
  addressid:'',
})


const clickB = (id:any)=>{
  addressId.value = id
}
const Cancel = ()=>{
  centerDialogVisible.value = false
  IsReprace.value = false
}
const handleChange = (value: number) => {
  console.log(value)
}
const toCar = ()=>{
    userApi.insertCar({id:UserInfo.id,serial:data.serial,count:num.value}).then(res=>{
      if(res){
        userApi.selectCarByUserId({id:UserInfo.id}).then(res=>{
          if(res){
            Car.splice(0,Car.length)
            for(let i=0;i<res.data.length;i++){
              Car.push(res.data[i])
            }
          }
        })
        ElMessage.success({message:"已加进购物车",duration:1000})
      }
    })
}
const toOrder = ()=>{
    centerDialogVisible.value = true
    order.name = data.name
    order.num = num.value
    order.total = data.price*num.value
}
const submit = ()=>{
    if(addressId.value === ''){
    ElMessage.error({message:"请选择地址",duration:1000})
    }else{
        setTimeout(()=>{
        order.addressid = addressId.value
        userApi.insertOrder(order).then(res=>{
            if(res){
                getOrder()
                ElMessage.success("OK")
            }
        })
        },500)
        centerDialogVisible.value = false
    }
}
    

</script>

<template>
   <div class="context">
    <img :src="imgUrl" alt="" class="img-left">
    <div class="context-right">
        <span class="title">{{ data.name }}</span>
        <span class="text">商品编号：{{ data.serial }}</span>
        <span class="text">店铺：{{ data.shop }}</span>
        <span class="text" v-show="data.weight !== undefined">重量：{{ data.weight }}</span>
        <span class="text" v-show="data.address !== undefined">产地：{{ data.address }}</span>
        <span class="text" v-show="data.level !== undefined">宠物级别：{{ data.level }}</span>
        <span class="text" v-show="data.variety !== undefined">品种：{{ data.variety }}</span>
        <span class="text" v-show="data.vaccine !== undefined">疫苗针数：{{ data.vaccine }}</span>
        <span class="text" v-show="data.taste !== undefined">口味：{{ data.taste }}</span>
        <span class="text" v-show="data.texture !== undefined">材质：{{ data.texture }}</span>
        <span class="text" v-show="data.tclass !== undefined">类别：{{ data.tclass }}</span>

        <span class="text">价格：<span class="price">￥{{ data.price.toFixed(2) }}</span></span>
        <el-input-number v-model="num" :min="1" :max="10" @change="handleChange"  class="el-input-number"/>
        <br/>
        <el-button type="primary" class="inbut" @click="toCar">加入购物车</el-button>
        <el-button type="danger" class="inbut" @click="toOrder">立即购买</el-button>
    </div>
    <el-dialog v-model="centerDialogVisible" title="下单" width="40%"  center class="span-ra">
        <span class="text-se">选择地址</span><br />
        <span v-for="i in Address" class="border-radio">
        <input type="radio" name="address" :value="i.id" class="redio-b" v-model="addressId" />
        <span class="text-radio" @click="clickB(i.id)">{{ i.people }} {{ i.phone }} {{ i.address }}</span>
        <br /><br />
        </span>

        <template #footer>
        <span class="dialog-footer">
            <el-button @click="Cancel">取消</el-button>
            <el-button type="primary" @click="submit">确认</el-button>
        </span>
        </template>
    </el-dialog>
   </div> 

</template>

<style scoped lang="scss">
.context{
    width: 80%;
    height: 625px;
    background-color: rgb(255, 255, 255);
    margin-left: 10%;
    margin-bottom: 40px;
    margin-top: 10px;
    .img-left{
        float: left;
        height: 450px;
        background-color: aquamarine;
        margin: 50px 20px 0 180px;
    }
    .context-right{
        float: left;
        width: 400px;
        height: 450px;
        margin: 50px 20px 0 0;
        .title{
            display: block;
            font-size: 18px;
            font-weight: bold;
            width: 400px;
            background-color: #fff;
        }
        .text{
            display: block;
            margin-top: 10px;
            color: #919191;
        }
        .price{
            font-size: 24px;
            font-weight: bold;
            color: #ff0000;
        }
        .el-input-number{
            margin-top: 20px;
            width: 100px;
        }
        .inbut{
            height: 40px;
            margin-top: 20px;
            font-size: 18px;
        }
    }
}

</style>
