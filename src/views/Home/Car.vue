<script setup lang="ts">
import { ref,reactive } from 'vue'
import { dataStore } from '../../store'
import userApi from '../../api/user'
import { ElMessage } from 'element-plus'
import { da, el } from 'element-plus/es/locale';
let { Datas,UserInfo,Car,Address } = dataStore()
let sear = ref()
let isNull = ref(false)
let checkedItem:any = ref([])
let checkedAll = ref(false)
let checkedAttr:any = ref([])
let centerDialogVisible = ref(false)
const value = ref('')
let data:any = reactive([{}])
let total:any = ref(0)
let addressId = ref('')
let IsReprace = ref(false)
let CarId:any = ref('')
let rolePrice = ref(1)


const order = reactive({
  id:UserInfo.id,
  name:'',
  num:'',
  total:'',
  addressid:'',
})

function lists(){
  for(let i=0;i<Car.length;i++){
    checkedAttr.value[i] = Car[i].id+''
  }
}
lists()
function RolePrice(){
  if(UserInfo.roleName == 'vip1'){
    rolePrice.value = 0.95
  }else if(UserInfo.roleName == 'vip2'){
    rolePrice.value = 0.85
  }else{
    rolePrice.value = 1
  }
}
RolePrice()


function totals(){
  
  setTimeout(()=>{
    total.value = 0
    for(let i=0;i<checkedItem.value.length;i++){
      for(let m=0;m<Car.length;m++){
        if(checkedItem.value[i] == Car[m].id){
            total.value = total.value + (Car[m].count*Car[m].price)
        }
      }
    }
  },1000)
  
}

const clickA = ()=>{
    setTimeout(()=>{
      if(checkedAll.value){
      total.value = 0
      for(let i=0;i<Car.length;i++){
        total.value = total.value + (Car[i].count*Car[i].price)
      }
    }else{
      total.value = 0
    }
  },1000)
}

const handleChange = (idCar: number,count:number) => {
  userApi.updateCarCountById({id:idCar,count:count,userId:UserInfo.id}).then(res=>{
    if(res){
      totals()
    }
  })
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

 const deleteCar = (id:any)=>{
  userApi.deleteCarByCarId({id:id}).then(res=>{
    if(res){
      let n = 0
      for(let i=0;i<Car.length;i++){
        if(Car[i].id === id){
          n = i
        }
      }
      Car.splice(n,1)
      lists()
      totals()
    }
  })
 }

 const deleteCars = ()=>{
  setTimeout(()=>{
    for(let i=0;i<checkedItem.value.length;i++){
    userApi.deleteCarByCarId({id:checkedItem.value[i]}).then(res=>{
      if(res){
        let n = 0
        for(let i=0;i<Car.length;i++){
          if(Car[i].id === checkedItem.value[i]){
            n = i
          }
        }
        Car.splice(n,1)
        lists()
      }
    })
  }
  },500)
  
  totals()
 }
 const reprace = (name:any,count:any,price:any,id:any)=>{
  centerDialogVisible.value = true
  order.name = name
  order.num = count
  order.total = price
  CarId.value = id
}

 const repraces = ()=>{
  setTimeout(()=>{
    if(checkedItem.value.length !== 0){
      centerDialogVisible.value = true
      IsReprace.value = true
    }else{
      ElMessage.error({message:"还未选择任何商品",duration:1000})
    }
  },500)
 }
const submit = ()=>{
  
  if(addressId.value === ''){
    ElMessage.error({message:"请选择地址",duration:1000})
  }else{
    
    if(IsReprace.value){
      order.addressid = addressId.value
      setTimeout(()=>{
        for(let i=0;i<checkedItem.value.length;i++){
          for(let m=0;m<Car.length;m++){
            if(checkedItem.value[i] == Car[m].id){
              order.name = Car[m].name
              order.num = Car[m].count
              order.total = Car[m].price*Car[m].count*rolePrice.value+''
              userApi.insertOrder(order).then(res=>{
                if(res){
                  userApi.deleteCarByCarId({id:Car[m].id}).then(res=>{
                    if(res){
                      let n = 0
                      for(let i=0;i<Car.length;i++){
                        if(Car[i].id === CarId.value){
                          n = i
                        }
                      }
                      Car.splice(n,1)
                    }
                  })
                  ElMessage.success("OK")
                }
              })
            }
          }
        }
      },500)
    }else{
      setTimeout(()=>{
        order.addressid = addressId.value
        userApi.insertOrder(order).then(res=>{
          if(res){
            userApi.deleteCarByCarId({id:CarId.value}).then(res=>{
              if(res){
                let n = 0
                for(let i=0;i<Car.length;i++){
                  if(Car[i].id === CarId.value){
                    n = i
                  }
                }
                Car.splice(n,1)
              }
            })
            ElMessage.success("OK")
          }
        })
      },500)
    }
    lists()
    totals()
    centerDialogVisible.value = false
    IsReprace.value = false
  }
}

 const selectA = ()=>{
  setTimeout(()=>{
    if(sear.value !== ''){
      userApi.selectCarLikeName({name:sear.value}).then(res=>{
        if(res){
          if(res.data.length === 0){isNull.value = true
          }else{isNull.value = false}
          Car = res.data
          lists()
        }else{
          isNull.value = false
        }
      })
    }else{
      window.location.reload();
    }
  },1000)
 }

const clickB = (id:any)=>{
  addressId.value = id
}

const Cancel = ()=>{
  centerDialogVisible.value = false
  IsReprace.value = false
}


</script>

<template>
  <div class="search">
      <span class="text1">商品查询：</span>
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
    <span class="nav-text1">商品</span>
    <span>单价</span>
    <span class="nav-text2">数量</span>
    <span>小计</span>
    <span class="nav-text3">操作</span>
  </div>
  
  <ul>
    <li v-for="(items,index) in Car" :key="items.id">
    <div class="top">
      <input name="roles" type="checkbox" :value="items.id" class="check" v-model="checkedItem" @click="totals"/>
    </div>
    <div class="commodity" v-show="true">
      <div class="shopper">
        <img :src="items.imgUrl" alt="" class="imgs">
        <span class="text2">{{ items.name }}</span>
      </div>
      <div class="number">{{ '￥'+(parseFloat(items.price)).toFixed(2) }}</div>
      <div class="people">
        <el-input-number v-model="Car[index].count" :min="1" @change="handleChange(items.id,Car[index].count)" class="num-button"/>
      </div>
      <div class="total">{{ '￥'+ (parseFloat(items.price*items.count+'')).toFixed(2) }}</div>
      
      <div class="option">
        <el-button class="option-but" @click="deleteCar(items.id)">删除</el-button>
        <el-button class="option-but"  @click="reprace(items.name,items.count,items.price*items.count*rolePrice,items.id)">付款</el-button>
      </div>
    </div>
    </li>
  </ul>
  <span class="nullData" v-show="isNull">未查询到该商品信息</span>
  
  <span class="bottom"></span>
  <div class="buy">
    <input
      type="checkbox"
      v-model="checkedAll"
      @change="changeAllChecked()"
      class="checkAlls"
      @click="clickA"
    />
    <span class="text">全选</span>

    <el-button class="deleteAll" @click="deleteCars">删除选中的商品</el-button>
    <span class="totals">
      <span class="totals-price">总价：￥{{ total * rolePrice }}</span>
      <span class="totals-z">折扣：￥-{{ total - (total * rolePrice) }}</span>
    </span>
    <el-button @click="repraces" class="buy-button">去 结 算</el-button>
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

  <el-backtop :right="100" :bottom="100" />

</template>

<style scoped lang="scss">
.span-ra{
  height: 600px;
  background-color: #ffabab;
}
.text-se{
  display: block;
  float: left;
}
.redio-b{
  display: block;
  float: left;
  width: 15px;
  height: 15px;
  cursor:pointer;
}
.text-radio{
  display: block;
  float: left;
  cursor:pointer;
}
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
    .nav-text1{
      margin-left: 250px;
      margin-right: 330px;
    }
    .nav-text2{
      margin-left: 80px;
      margin-right: 140px;
    }
    .nav-text3{
      margin-left: 150px;
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
    .check{
      width: 15px;
      height: 15px;
      margin-top: 7.5px;
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
.buy{
  width: 100%;
  height: 60px;
  position: fixed;
  z-index: 1;
  background-color: rgb(255, 255, 255);
  border-top: 1px solid rgb(152, 152, 152);
  top: 670px;
  .checkAlls{
    display: block;
    width: 15px;
    height: 15px;
    float: left;
    margin-top: 20px;
    margin-left: 155px;
  }
  .text{
    display: block;
    float: left;
    margin-top: 19px;
    font-size: 12px;
  }
  .deleteAll{
    border: none;
    float: left;
    background-color: rgb(255, 255, 255);
    margin-top: 15px;
  }
  .totals{
    height: 60px;
    width: 600px;
    display: flex;
    float: left;
    flex-direction: column;
    /* co1umn 从上到下*/
    align-items: right;
    /* center代表水平方向 */
    justify-content: center;
    margin-top: -7px;
    margin-left: 300px;
    text-align: right;
    .totals-price{
      display: block;
      height: 20px;
      float: left;
      color: red;
      font-weight: bold;
      line-height: 20px;
      
    }
    .totals-z{
      
      display: block;
      font-size: 12px;
      height: 15px;
      margin-top: 2px;
    }
  }
  .deleteAll:hover{
    color: red;
  }

  .buy-button{
    margin-left: 10px;
    border: none;
    border-radius: 0;
    background-color: rgb(255, 0, 0);
    color: white;
    height: 60px;
    width: 100px;
    font-size: 24px;
    font-weight: bold;
  }
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
