<template>
  <div>
    <div><h1>添加用户</h1></div>
  <el-form label-position="right" label-width="80px" :model="userInfo">
    <el-form-item label="用户名">
      <el-input v-model="userInfo.username"></el-input>
    </el-form-item>
    <el-form-item label="姓名">
      <el-input v-model="userInfo.realName"></el-input>
    </el-form-item>
    <el-form-item label="密码">
      <el-input v-model="userInfo.password" type="password"></el-input>
    </el-form-item>
    <el-form-item label="性别">
      <el-select v-model="userInfo.gender" placeholder="请选择性别">
        <el-option label="男" value="0"></el-option>
        <el-option label="女" value="1"></el-option>
        <el-option label="保密" value="2"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="邮箱">
      <el-input v-model="userInfo.email"></el-input>
    </el-form-item>
    <el-form-item label="电话">
      <el-input v-model="userInfo.mobile"></el-input>
    </el-form-item>
  </el-form>
    <div>
      <el-button type="primary" @click="handleSubmit">提交</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "addUserPage",
  data(){
    return{
      userInfo:{
        username:null,
        password:null,
        realName:null,
        gender:'2',
        email:null,
        mobile:null,
        status:1,
      }
    }
  },
  methods:{
    handleSubmit(){
      this.postRequest("/api/admin/sysUser/save",this.userInfo).then(resp=>{
        if (resp.data.msg='success'){
          console.log(resp)
          this.$message.success("添加成功")
          this.$router.go(0)
        }else {
          this.$message.error("添加失败！")
        }
      })
    }
  }
}
</script>

<style scoped>

</style>