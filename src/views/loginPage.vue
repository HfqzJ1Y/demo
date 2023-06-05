<template>
  <div>
    <el-form :rules="rules" ref="loginForm" :model="loginForm" class="loginContainer">
      <h3 class="loginTitle">系统登录</h3>
      <el-form-item prop="username">
        <el-input type="text" v-model="loginForm.username" auto-complete="off" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input type="password" v-model="loginForm.password" auto-complete="off" placeholder="请输入密码" @keydown.enter.native="submitLogin"></el-input>
      </el-form-item>
      <el-checkbox v-model="checked" class="loginRemember"></el-checkbox>
      <el-button type="primary" style="width:100%;" @click="submitLogin">登录</el-button>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "loginPage",
  data(){
    return{
      loginForm:{
        username: 'admin',
        password: 'admin'
      },
      checked : true,
      rules:{
        username:[{required:true,message:'输入用户名',trigger:'blur'}],
        password:[{required:true,message:'输入密码',trigger:'blur'}]
      }
    }
  },
  methods:{
    submitLogin(){
      this.$refs["loginForm"].validate((valid) => {
        if (valid) {
          //发送请求
          this.postRequestLogin('/api/admin/sysUser/login',this.loginForm).then(resp=>{
            console.log(resp)
            if(resp.data.code==0){
              //获取用户名和token并存入本地
              window.sessionStorage.setItem("token",resp.data.data.token)
              // console.log( window.sessionStorage.getItem("token"))
              window.sessionStorage.setItem("username",this.loginForm.username)

              //通过vue路由跳转到home页面
              this.$router.replace("/home")
            }else{
              this.$message.error("登录失败，请检查用户名和密码！")
            }
          })
        } else {
          this.$message.error("请输入所有字段")
        }
      });
    },
  }
}
</script>

<style scoped>
.loginContainer{
  border-radius: 15px;
  background-clip: padding-box;
  margin: 180px auto;
  width: 350px;
  padding: 20px 35px 40px 35px;
  background: white;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}
.loginTitle{
  margin:15px auto 20px auto;
  text-align: center;
  color: #505458;
}
.loginRemember{
  text-align: left;
  margin: 0px 0px 20px 0px;
}
</style>