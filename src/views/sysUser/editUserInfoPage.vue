<template>
  <div>
    <div><h1>修改用户</h1></div>
    <el-form label-position="right" label-width="80px" :model="editUserInfo">
      <el-form-item label="ID" >
        <el-input v-model="editUserInfo.id" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="用户名">
        <el-input v-model="editUserInfo.username"></el-input>
      </el-form-item>
      <el-form-item label="姓名">
        <el-input v-model="editUserInfo.realName"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="editUserInfo.password" type="password" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="性别">
        <el-select v-model="editUserInfo.gender" placeholder="请选择性别">
          <el-option label="男" value="0"></el-option>
          <el-option label="女" value="1"></el-option>
          <el-option label="保密" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="editUserInfo.email"></el-input>
      </el-form-item>
      <el-form-item label="电话">
        <el-input v-model="editUserInfo.mobile"></el-input>
      </el-form-item>
    </el-form>
    <div>
      <el-button type="primary" @click="handleEditSubmit">提交修改</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "editUserInfoPage",
  data() {
    return {
      editUserInfo: {}
    }
  },
  methods: {
    loadUserInfo() {
      console.log(this.$route.query)
      this.postRequest("/api/admin/sysUser/info",this.$route.query).then(resp=>{
        // console.log(resp.data.data)
        this.editUserInfo = resp.data.data
        console.log(this.editUserInfo)
      })
    },
    handleEditSubmit(){
      delete this.editUserInfo.createDate
      delete this.editUserInfo.updateDate
      this.postRequest("/api/admin/sysUser/update",this.editUserInfo).then(resp=>{
        if(resp.data.msg='success'){
          this.$message.success("修改成功！")
          this.$router.replace("/userList")
        }
      })
    }
  },
  mounted() {
    this.loadUserInfo();
  }
}
</script>

<style scoped>

</style>