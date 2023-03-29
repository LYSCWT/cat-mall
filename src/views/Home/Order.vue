<script setup lang="ts">
import { ElTable } from 'element-plus'
import {useRouter,} from "vue-router";
import { Search } from '@element-plus/icons-vue'
import { ref,reactive  } from 'vue'
import shopperApi from '../../api/shopper'
import userApi from '../../api/user'
import { ElMessage } from 'element-plus'

import { dataStore } from '../../store'
import Car from './Car.vue';
let { UserInfo,Order,Datas } = dataStore()
let sear = ref('')
let checkedItem:any = ref([])
let checkedAll = ref(false)
let checkedAttr:any = ref([])
let isNull = ref(false)
let statu = ref('')



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
function lists(){
  ElMessage.success({message:''+Order.length,duration:1000})
  for(let i=0;i<Order.length;i++){
    checkedAttr.value.push(Order[i].id)
  }
}
lists()
function getStatu(n:any){
  if(n == 1){
    return "等待支付"
  }else if(n ==2){
    return "已完成"
  }else if(n ==3){
    return "已退款"
  }else if(n == 4){
    return "正在退款"
  }else{
    return "运输中"
  }
}

const clickA = ()=>{

}

const deletOne=(id:any )=>{
  userApi.deleteOrder({id:id}).then(res=>{
    if(res){
      ElMessage.success({message:"成功删除",duration:1000})
      let n = 0
      for(let i=0;i<Order.length;i++){
        if(Order[i].id === id){
          n = i
        }
      }
      Order.splice(n,1)
      lists()
    }
  })
}
const deletAll= ()=>{
  if(checkedItem.value.length === 0){
    ElMessage.warning({message:"请选择订单",duration:1000})
  }else{
    for(let i=0;i<checkedItem.value.length;i++){
      userApi.deleteOrder({id:checkedItem.value[i]}).then(res=>{
        if(res){
          let n = 0
          for(let i=0;i<Order.length;i++){
            if(Order[i].id === checkedItem.value[i]){
              n = i
            }
          }
          Order.splice(n,1)
        }
      })
    }
    lists()
  }
  
}

const changeAllChecked = ()=>{
  if (checkedAll.value ) {
    // 如果全选复选框被选中,则重新给选项复选框赋值,即选中所有的选项复选框
    checkedItem.value  = checkedAttr.value ;
  } else {
    // 如果全选复未选框被选中,则设置为空值,即未选中所有的选项复选框
    checkedItem.value = [];
  }
}

const selectA = ()=>{
  if(sear.value === ''){
    getOrder()
    lists()
    isNull.value = false
  }else{
    setTimeout(()=>{
      userApi.selectOrderLikeName({name:sear.value}).then(res=>{
        if(res){
          if(res.data.length === 0){isNull.value = true
          }else{isNull.value = false}
          Order.splice(0,Order.length)
          for(let i=0;i<res.data.length;i++){
            Order.push(res.data[i])
          }
        }else{
          isNull.value = false
        }
      })
    },200)
  }
}
const updateOrder = (status:any,id:any)=>{
  if(status === 1){
    userApi.updateOrderById({id:id,statu:0}).then(res=>{
      if(res){
        ElMessage.success({message:"支付成功！",duration:1000})
        for(let i=0;i<Order.length;i++){
          if(Order[i].id === id){
            Order[i].statu = 0
          }
        }
      }
    })
  }else{
    userApi.updateOrderById({id:id,statu:4}).then(res=>{
      if(res){
        ElMessage.success({message:"正在退款！",duration:1000})
        for(let i=0;i<Order.length;i++){
          if(Order[i].id === id){
            Order[i].statu = 4
          }
        }
      }
    })
  }
}
</script>

<template>
  <div class="search">
      <span class="text1">订单查询：</span>
      <el-input v-model="sear" placeholder="商品名" class="in"></el-input>
      <el-button class="select" type="primary" @click="selectA">查询</el-button>
  </div>
  <div class="nav-order">
    <input
      type="checkbox"
      v-model="checkedAll"
      @change="changeAllChecked()"
      class="checkAll"
      @click="clickA"
    />
    <span class="nav-delete" @click="deletAll">删除选中的订单</span>
    <span class="nav-text1">订单详情</span>
    <span>收货人</span>
    <span class="nav-text2">金额</span>
    <span>状态</span>
    <span class="nav-text3">操作</span>
  </div>
  
  <ul>
    <li v-for="(items,index) in Order" :key="items.id">
    <div class="top">
      <input name="roles" type="checkbox" :value="items.id" class="check" v-model="checkedItem" />
      <span class="created">{{ items.created }}</span>
      <span >订单号：{{ items.ordernum }}</span>
    </div>
    <div class="commodity" v-show="true">
      <div class="shopper">
        <img :src="items.imgUrl" alt="" class="imgs">
        <span class="text2">{{ items.name }}</span>
        <span class="text2">{{ 'x'+items.num }}</span>
      </div>
      <div class="number">{{ items.people  }}</div>
      <div class="people">
        {{ items.total.toFixed(2) }}
      </div>
      <div class="total" ><span :class="'statu-text'+items.statu">{{ getStatu(items.statu) }}</span></div>
      
      <div class="option">
        <el-button class="option-but" @click="deletOne(items.id)">删除</el-button>
        <el-button class="option-but" @click="updateOrder(items.statu,items.id)" v-show="(items.statu!==1)">退款</el-button>
        <el-button class="option-but" @click="updateOrder(items.statu,items.id)" v-show="(items.statu===1)">支付</el-button>
      </div>
    </div>
    </li>
  </ul>
  <span class="nullData" v-show="isNull">未查询到该订单信息</span>
  <el-backtop :right="100" :bottom="100" />
  
</template>

<style scoped lang="scss">
.search{
    width: 80%;
    height: 40px;
    margin: 10px 10% 20px 10%;
    background-color: #ffffff;
    padding-top: 20px;
    .text1{
      margin-left: 20px;
    }
    .in{
      width: 200px;
      font-size: 16px;
    }
    .select{
      margin-left: 20px;
    }
  }
.nav-order{
    width: 80%;
    height: 40px;
    line-height: 40px;
    background-color: rgb(218, 218, 218);
    color: rgb(138, 138, 138);
    margin: 0 10% 20px 10%;
    .nav-delete{
      font-size: 12px;
      color: #000;
    }
    .nav-delete:hover{
      color: red;
      text-decoration: underline;
      cursor: pointer;
    }
    .nav-text1{
      margin-left: 160px;
      margin-right: 290px;
    }
    .nav-text2{
      margin-left: 70px;
      margin-right: 140px;
    }
    .nav-text3{
      margin-left: 160px;
    }
    .checkAll{
      display: block;
      float: left;
      width: 16px;
      height: 16px;
      margin-top: 12px;
      margin-left: 5px;
    }
}
  ul{
  list-style-type:none;
  width: 80%;
  margin-left: 10%;
  padding: 0;
  li{
    list-style: none;
    width: 100%;
    margin-bottom: 20px;
    background-color: #fff;
    .top{
    width: 100%;
    height: 30px;
    background-color: rgb(218, 218, 218);
    color: #727272;
    .check{
      width: 15px;
      height: 15px;
      margin-top: 7.5px;

    }
    .created{
      margin-left: 20px;
      margin-right: 50px;
    }
    }
    .commodity{
    width: 100%;
    height: 160px;
    .shopper{
      width: 600px;
      height: 100%;
      float: left;
      border-right: 1px solid  rgba(178, 178, 178, 0.575);
      .imgs{
        width: 100px;
        margin: 20px 0 0 20px;
        float: left;
      }
      .text2{
        display: block;
        float: left;
        width: 300px;
        margin-left: 20px;
        margin-top: 20px;
      }
    }
    .number{
        float: left;
        width: 100px;
        height: 140px;
        padding-top:20px;
        border-right: 1px solid  rgba(178, 178, 178, 0.575);
        text-align: center;
      }

      .people{
        float: left;
        width: 120px;
        height: 140px;
        padding-top:20px;
        border-right: 1px solid  rgba(178, 178, 178, 0.575);
        text-align: center;
        .num-button{
          width: 100px;
        }
      }
      .total{
        float: left;
        width: 220px;
        height: 140px;
        padding-top:20px;
        border-right: 1px solid  rgba(178, 178, 178, 0.575);
        text-align: center;
        font-weight: bold;
        .statu-text2{
          //已完成订单
          // font-weight: normal;
          border-radius: 5px;
          padding: 0 5px;
          background-color: #00ff1a4c;
        }
        .statu-text4{
          //退款中订单
          border-radius: 5px;
          padding: 0 5px;
          background-color: #d4ff0047;
        }
        .statu-text3{
          //已退款订单
          border-radius: 5px;
          padding: 0 5px;
          background-color: #ff000044;
        }
        .statu-text1{
          //等待支付
          border-radius: 5px;
          padding: 0 5px;
          background-color: #1900ff3e;
        }
      }

      .statu{
        float: left;
        width: 100px;
        height: 140px;
        padding-top:20px;
        font-size: 14px;
        border-right: 1px solid  rgba(178, 178, 178, 0.575);
        
        padding: 20px 10px 0 10px;
      }
      .option{
        float: left;
        width: 120px;
        height: 140px;
        padding-top:20px;
        .option-but{
          width: 20px;
          border: none;
          float: left;
          background-color: #fff;
          font-size: 16px;
          margin-left: 40px;
          margin-top: 20px;
        }
      }
  }
  }
}
.bottom{
  display: block;

  height: 60px;
}
.nullData{
    width: 100%;
    text-align: center;
    display: block;
    font-size: 24px;
    color: #b3b3b3;
    background-color: white;
    margin-bottom: 385px;
}

</style>
