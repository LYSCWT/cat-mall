<script setup lang="ts">
import { ref } from 'vue'
import { Plus } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import type { UploadProps, UploadUserFile } from 'element-plus'
import type { UploadInstance } from 'element-plus'
import { dataStore } from '@/store'
import { userInfo } from 'os'

const { UserInfo } = dataStore();
let nowTime = ref('')


const uploadRef = ref<UploadInstance>()

const submitUpload = () => {
  uploadRef.value!.submit()
}

const headers = ref({
  token:'这里获取token，如果请求头不需要token发送则不需要'
})

function getTime() {
  let myDate = new Date;
  let year = myDate.getFullYear(); //获取当前年
  let mon = myDate.getMonth() + 1; //获取当前月
  let date = myDate.getDate(); //获取当前日
  let hours = myDate.getHours(); //获取当前小时
  let minutes = myDate.getMinutes(); //获取当前分钟
  let seconds = myDate.getSeconds(); //获取当前秒
  nowTime.value =''+ year  + mon +  date +  hours +  minutes +  seconds;
  
}

console.log(getTime)

let avaterShow = ref(true)
const imageUrl = ref('')
const imageUrl1 = ref('')
// 显示图片列表
const fileList = ref<UploadUserFile[]>([])
// 放大图片地址
const dialogImageUrl = ref('')
// 显示放大对话框
const dialogVisible = ref(false)
// 上传的结果
const handleAvatarSuccess: UploadProps['onSuccess'] = (
  response,
  uploadFile
) => {
  
  imageUrl.value = URL.createObjectURL(uploadFile.raw!)
  UserInfo.avatar = response.data
  setTimeout(()=>{
    window.location.reload();
  },2000)
  // imageUrl1.value = 'data:image/png;base64,'+response.data

}

const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  


  // let types = ['image/jpeg','image/png','image/gif']
  let types = ['image/jpeg']
  if ( !types.includes(rawFile.type)) {
    ElMessage.error('只能上传jpg格式的图片!')
    return false
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('图片大小不能超过2MB!')
    return false
  }
  
  return true
}

// 删除方法
const handleRemove: UploadProps['onRemove'] = (uploadFile, uploadFiles) => {
  console.log(uploadFile, uploadFiles)
}
// 浏览方法
const handlePictureCardPreview: UploadProps['onPreview'] = (uploadFile) => {
  dialogImageUrl.value = uploadFile.url!
  dialogVisible.value = true
}
// name表示上传名称字段，action表示上传地址，header配置请求头（解决请求不带token问题）
// :header="headers"

const submitImg = ()=>{

  console.log()
}
</script>

<template>
  <span class="title">头像照片</span>
  <el-upload
    class="avatar-uploader"
    name="image"
    action="http://localhost:8081/catmall/updateImage"
    :show-file-list="false"
    :on-success="handleAvatarSuccess"
    :before-upload="beforeAvatarUpload"
    :data="{fileName: UserInfo.name+''+nowTime,id:UserInfo.id}"
    @click="getTime"
  >
    <img v-if="imageUrl" :src="imageUrl" class="avatar" />
    <el-icon v-else class="avatar-uploader-icon" title="点击上传"><Plus /></el-icon>
  </el-upload>
  
  
</template>

<style scoped lang="scss">
.up-avater{
  width: 150px;
  height: 150px;
  background-color: antiquewhite;
  margin: 20px 0 20px 20px;
}
.avatar-uploader-icon{
  width: 100px;
  height: 100px;
  border: 1px solid red;
  margin-left: 40px;
  margin-bottom: 80px;
  margin-top: 20px;
}
.submit{
  // position: relative;
  width: 120px;
  height: 40px; 
  top: -100px;
  left: 220px;
  font-size: 24px;
  border: none;
}
.submit:hover{
  background-color: rgba(120, 220, 251, 0.696);
}
.title{
  display: block;
  width: 100%;
  font-size: 24px;
  text-align: center;
  height: 60px;
  line-height: 60px;
  background-color: antiquewhite;
}
.avatar{
  height: 300px;
}
</style>
