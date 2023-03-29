
import { defineStore } from "pinia"
import internal from "stream"
import { Names } from './store-name'


type User = {
    id:number,
    username:string,
}

type UserInfo = {
    id:number,
    name:string,
    avatar:string,
    email:string,
    phone:string,
    birthday:string,
    sex:string,
    roleName:string

}

type Animal = {
    id:number,
    name:string,
    serial:number,
    shop:string,
    weight:string,
    addres:string,
    price:number,
    level:string,
    variety:string,
    vaccine:number,
    imgUrl:string
}
type Food = {
    id:number,
    name:string,
    weight:string,
    addres:string,
    serial:string,
    taste:string,
    price:number,
    shop:string,
    imgUrl:string
}
type Things = {
    id:number,
    name:string,
    shop:string,
    price:number,
    serial:string,
    texture:string,
    tclass:string,
    imgUrl:string
}



type Datas = [any]

type Address = [any]

type Car = [any]

type Order = [any]

const optionRole = {
    value : '',
    label : ''
}

const Login = ()=>{
    return new Promise<User>(resolve => {
        setTimeout(()=>{
            resolve({
                username:"user",
                id:1
            })
        },1000)
    })
}
export const dataStore = defineStore(Names.USER,{
    state:()=>{
        // 初始化的值
        return{
            UserInfo:<UserInfo>{},
            Animal:<Animal>{},
            Food:<Food>{},
            Things:<Things>{},
            Datas:<Datas>[{}],
            Address:<Address>[{}],
            Car:<Car>[{}],
            Order:<Order>[{}],

        }
    },
    // 类似computed 修饰值
    getters:{

    },
    // 类似methods 同步或异步操作   
    actions:{
        // 同步
        // setID(){ this.id = 2},
        // // 异步
        // async serUser(){
        //     const result = await Login() 
        //     this.user = result
        // },

        setUserInfo(data:any){
            this.UserInfo = data
        },
        clearDatas(){
            this.Datas.splice(0,this.Datas.length)
        },
        clearAddress(){
            this.Address.splice(0,this.Address.length)
        }

    }
})
