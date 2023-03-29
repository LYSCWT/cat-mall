<script setup lang="ts">
import {useRouter,} from "vue-router";
import { Search } from '@element-plus/icons-vue'
import { ref,reactive  } from 'vue'
import shopperApi from '../../api/shopper'
import userApi from '../../api/user'
import { ElMessage } from 'element-plus'

import { dataStore } from '../../store'

const shopInfo = dataStore()
const { UserInfo } = dataStore()
const router = useRouter()
const reClick = ref()
const input3 = ref('')
const select = ref('1')
let reClickList:any = []
let intIf = ref(1)
let isNull = ref(false)
let total = ref(0)


type data = [
  [
    {
      imgUrl:any,
      text:any,
      price:any
    }
  ]
]

shopperApi.selectShopLists({tableName:'animal'}).then(res=>{
      if(res){
        let arr = []
        shopInfo.clearDatas()
        for(let i=0;i<res.data.length;i++){
          shopInfo.Animal = res.data[i]
          if(i === 0){
            arr.push(shopInfo.Animal)
          }else if((i+1)%4 !==0){
            arr.push(shopInfo.Animal)
          }else{
            arr.push(shopInfo.Animal)
            shopInfo.Datas.push(arr)
            arr = []
          }
        }
      }
})

function selectCar(){
  userApi.selectCarByUserId({id:UserInfo.id}).then(res=>{
    if(res){
      shopInfo.Car = res.data
      total.value = res.data.length
      for(let i=0;i<res.data.length;i++){
        reClickList.push(res.data[i].serial)
      }
    }
  })
}
selectCar()



const selectShopper = ()=>{
  console.log(select.value)
  if(select.value === '1'){
    shopperApi.selectShopLists({tableName:'animal',name:input3.value}).then(res=>{
      if(res.data.length !==0 ){
        isNull.value = false
        let arr = []
        shopInfo.clearDatas()
        for(let i=0;i<res.data.length;i++){
          shopInfo.Animal = res.data[i]
          if(i === 0){
            arr.push(shopInfo.Animal)
          }else if((i+1)%4 !==0){
            arr.push(shopInfo.Animal)
          }else{
            arr.push(shopInfo.Animal)
            shopInfo.Datas.push(arr)
            arr = []
          }
        }
      }else{
        isNull.value = true
      }
    })
  }else if(select.value === '2'){
    shopperApi.selectShopLists({tableName:'food',name:input3.value}).then(res=>{
      if(res){
        isNull.value = false
        let arr = []
        shopInfo.clearDatas()
        for(let i=0;i<res.data.length;i++){
          shopInfo.Food = res.data[i]
          if(i === 0){
            arr.push(shopInfo.Food)
          }else if((i+1)%4 !==0){
            arr.push(shopInfo.Food)
          }else{
            arr.push(shopInfo.Food)
            shopInfo.Datas.push(arr)
            arr = []
          }
        }
      }else{
        isNull.value = true
      }
    })
  }else{
    shopperApi.selectShopLists({tableName:'things',name:input3.value}).then(res=>{
      if(res){
        isNull.value = false
        let arr = []
        shopInfo.clearDatas()
        for(let i=0;i<res.data.length;i++){
          shopInfo.Things = res.data[i]
          if(i === 0){
            arr.push(shopInfo.Things)
          }else if((i+1)%4 !==0){
            arr.push(shopInfo.Things)
          }else{
            arr.push(shopInfo.Things)
            shopInfo.Datas.push(arr)
            arr = []
          }
        }
      }else{
        isNull.value = true
      }
    })
  }
}

const imgClick = (serials:String)=>{
  let serial = serials.toString()
  router.push({path:'/home/shopperInfo',query:{serial:serial}})
}

const addCar = (serial:any)=>{
  if(reClickList.indexOf(serial) === -1){
    
    //执行添加Car
    userApi.insertCar({id:UserInfo.id,serial:serial}).then(res=>{
      if(res){
        userApi.selectCarByUserId({id:UserInfo.id}).then(res=>{
          if(res){
            shopInfo.Car.splice(0,shopInfo.Order.length)
            for(let i=0;i<res.data.length;i++){
              shopInfo.Car.push(res.data[i])
            }
          }
        })
        reClickList.push(serial)
        total.value++
        ElMessage.success({message:"已加进购物车",duration:1000})
      }
    })
  }else{
    //执行更新number,这里执行n++
    userApi.updateCarById({serial:serial,id:UserInfo.id}).then(res=>{
      if(res){
        for(let i=0;i<shopInfo.Car.length;i++){
          if(shopInfo.Car[i].serial === serial){
            shopInfo.Car[i].count = parseInt(shopInfo.Car[i].count + '') + 1
            ElMessage.success({message:"已加进购物车",duration:1000})
          }
        }
      }
    })
  }

}
const car = ()=>{
  router.push('/home/car')
}

const toShopperInfo = ()=>{
  console.log("123")
  // router.push('/home/car')
}
</script>

<template>
  
  <div class="block text-center">
    <el-carousel height="200px">
      <el-carousel-item v-for="item in 4" :key="item">
        <img :src="'../src/assets/run'+item+'.jpg'" alt="" class="imgrun">
      </el-carousel-item>
    </el-carousel>
  </div>
  <div class="search">
    <div class="mt-4">
    <el-input
        v-model="input3"
        placeholder="请输入商品名"
        class="input-with-select"
      >
        <template #prepend>
          <el-select v-model="select" placeholder="宠物" style="width: 115px" class="el-select" size="large">
            <el-option label="宠物" value="1" />
            <el-option label="宠物零食" value="2" />
            <el-option label="宠物用品" value="3" />
          </el-select>
        </template>

        <template #append>
          <el-button :icon="Search" title="查询" @click="selectShopper"/>
        </template>
      </el-input>
      
      <el-button title="我的购物车" class="car" @click="car">
        <el-icon :size="20"><ShoppingCartFull /></el-icon>
        <span>({{ total }})</span>
      </el-button>
      <el-button title="萌宠之家商城欢迎你" class="car" disabled>
        <img src="@/assets/logo.jpg" alt="" class="logo">
      </el-button>
      
    </div>
    
  </div>
  <div class="shoppers" >
    <el-row :gutter="20" v-for="imgUrls in shopInfo.Datas" v-show="!isNull">
    <el-col :span="6" v-for="shoppers in imgUrls"><div class="grid-content ep-bg-purple" >
      <img :src="shoppers.imgUrl" alt="显示失败" class="colimg" @click="imgClick(shoppers.serial)" title="点击查看详细信息"> 
      <span class="shopName" :title="shoppers.name" @click="imgClick(shoppers.serial)">
        {{ shoppers.name }}
      </span>
      <div class="bo">
        <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-jinqian1"></use>
        </svg>
        <span class="price">{{ shoppers.price.toFixed(2) }}</span>
        <el-button title="添加到购物车"  @click="addCar(shoppers.serial)" class="butadd">
          <svg class="icon-jia" aria-hidden="true">
            <use xlink:href="#icon-jia"></use>
          </svg>
        </el-button>
        
      </div>

    </div></el-col>
    </el-row>
    <span class="nullData" v-show="isNull">未查询到该商品信息</span>
    
  </div>
  <el-backtop :right="100" :bottom="100" />
</template>

<style scoped lang="scss">

.nav-shop{
  margin: 0;
  padding: 0;
  width: 100%;
  height: 200px;
  background-color: antiquewhite;
}
.demonstration {
  color: var(--el-text-color-secondary);
}

.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
.imgrun{
  width: 100%;
}

.search{
  width: 80%;
  height: 40px;
  margin: 0 auto;
  padding: 10px;
  .input-with-select .el-input-group__prepend {
  background-color: var(--el-fill-color-blank);
  }
  .input-with-select{
    width: 700px;
    height: 40px;
  }
  .car{
    position: relative;
    width: 60px;
    height: 40px;
    margin-left: 100px;
    border: none;
  }
  .logo{
    position: relative;
    height: 40px;
  }

}

.shoppers{
  width: 80%;
  margin: 0 auto;
  overflow :hidden;
  position: relative;
  .nullData{
    width: 100%;
    text-align: center;
    display: block;
    font-size: 24px;
    color: #b3b3b3;
    background-color: white;
    margin-bottom: 385px;
  }
  .shopName{
    display: block;
    width: 220px;
    height: 50px;
    line-height: 50px;
    margin-left: 15px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;

  }
  .shopName:hover{
    color: rgb(255, 144, 3);
    cursor: pointer;
  }
  .select{
    width: 100%;
    height: 80px;
    background-color: chartreuse;
  }
  .el-row {
  margin-bottom: 20px;
  }
  .el-row:last-child {
    margin-bottom: 0;
  }
  .el-col {
    border-radius: 4px;
  }

  .grid-content {
    // border-radius: 4px;
    min-height: 36px;
    background-color: rgb(255, 255, 255);
    height: 360px;
    margin-top: 10px;
    padding: 20px;
  }
  .colimg{
    width: 100%;
    height: 250px;
  }
  .colimg:hover{
    cursor: pointer;
  }
  .bo{
    position: absolute;
    top: 364px;
  }
  .icon{
    width: 16px;
    height: 16px;
    color: red;
  }
  .price{
    font-size: 24px;
    color: red;
  }
  .icon-jia{
    width: 20px;
    height: 20px;
    
  }
  
  .butadd{
    margin-left: 100px;
    border: none;
    background-color: white;
    margin-top: -10px;
  }
  .butadd:hover{
    background-color: none;
  }
}
</style>
