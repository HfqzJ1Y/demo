<template>
  <div>
    <el-container>
      <el-header class="homeHeader">
        <el-button type="primary" @click="goBack">返回上一级</el-button>
        <div class="title">新闻后台管理系统</div>
      </el-header>
    </el-container>
    <el-row>
      <el-col :span="14" :offset="5">
        <h1>{{ articleInfo.articleTitle }}</h1>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="14" :offset="5">
        <div>作者：{{ articleInfo.articleAuthor }}</div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="14" :offset="5">
        <div v-html="articleInfo.articleContent"></div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "articleShow",
  data() {
    return {
      articleInfo: null
    }
  },
  methods: {
    loadArticle() {
      this.postRequest("/api/admin/xwArticle/info", this.$route.query).then(resp => {
        if (resp) {
          this.articleInfo = resp.data.data
          console.log(this.articleInfo)
        }
      })
    },
    goBack(){
      this.$router.push("/articleList")
    }
  },
  mounted() {
    this.loadArticle();
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

.el-row {
  margin-bottom: 20px;
}
</style>