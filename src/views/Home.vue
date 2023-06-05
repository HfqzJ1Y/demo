<template>
  <div>
    <el-container>
      <el-header class="homeHeader">
        <div class="title">新闻后台管理系统</div>
        <el-dropdown class="userInfo" @command="commandHandler">
  <span class="el-dropdown-link">
    {{ username }}<i class="el-icon-arrow-down el-icon--right"></i>
  </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="userInfo">个人中心</el-dropdown-item>
            <el-dropdown-item command="logout" divided>退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <el-container>
        <el-aside width="240px" style="display: flex; flex-direction: column;">
          <el-menu router default-active="/home" style="flex-grow: 1">
            <el-menu-item index="/articleList">
              <i class="el-icon-s-order"></i>
              <span slot="title">文章列表</span>
            </el-menu-item>

            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-user-solid"></i>
                <span slot="title">用户管理</span>
              </template>
              <el-menu-item index="/userList">用户列表</el-menu-item>
              <el-menu-item index="/addUser">添加用户</el-menu-item>
            </el-submenu>
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-user-solid"></i>
                <span slot="title">文章管理</span>
              </template>
              <el-menu-item index="/articleCtrlList">文章列表</el-menu-item>
              <el-menu-item index="/addArticle">写文章</el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>


        <el-main>
          <div class="homeWelcome" v-if="this.$router.currentRoute.path=='/home'">
            欢迎来到新闻后台管理系统
          </div>
          <router-view class="homeRouterView"/>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      username: window.sessionStorage.getItem("username")
    }
  },
  methods: {
    commandHandler(cmd) {
      if (cmd == 'logout') {
        this.$confirm('此操作将注销登录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          window.sessionStorage.removeItem("username");
          window.sessionStorage.removeItem("token");
          this.$router.replace("/");
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作'
          });
        });
      }
    }
  }
}
</script>

<style scoped>
.homeHeader {
  background-color: #409eff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0px 15px;
  box-sizing: border-box;
}

.homeHeader .title {
  font-size: 30px;
  font-family: 华文行楷;
  color: #ffff;
}

.homeHeader .userInfo {
  cursor: pointer;
}

.homeWelcome {
  text-align: center;
  font-size: 30px;
  font-family: 华文行楷;
  color: #409eff;
  padding-top: 50px;
}
</style>