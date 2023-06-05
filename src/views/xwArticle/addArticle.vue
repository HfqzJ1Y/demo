<template>
  <div>
    <el-container>
      <el-header class="homeHeader">
        <el-button type="primary" @click="goBack">返回上一级</el-button>
        <div class="title">新闻后台管理系统</div>
      </el-header>
    </el-container>
    <el-row>
      <el-col :span="5" :offset="5">
        <div><h1>发布文章</h1></div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="1.5" :offset="5">
        <div>文章标题：</div>
      </el-col>
      <el-col :span="12">
        <el-input v-model="articleInfo.articleTitle"></el-input>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="1.5" :offset="5">
        <div>文章介绍：</div>
      </el-col>
      <el-col :span="12">
        <el-input v-model="articleInfo.introduction"></el-input>
      </el-col>
    </el-row>
    <el-row class="el-row-content">
      <el-col :span="14" :offset="5">
        <!-- 富文本 -->
        <quillEditor
            ref="myQuillEditor"
            v-model="articleInfo.articleContent"
            style="height: 300px"
        />
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="1" :offset="5">
        <div>标签：</div>
      </el-col>
      <el-col :span="3">
        <el-input v-model="articleInfo.articleLabel" :disabled="true"></el-input>
      </el-col>
      <el-col :span="3" :offset="1">
        <div>
          <el-radio-group v-model="articleInfo.articleType">
            <el-radio-button label="0">原创</el-radio-button>
            <el-radio-button label="1">转载</el-radio-button>
          </el-radio-group>
        </div>
      </el-col>
      <el-col :span="5" :offset="1">
        <div>
          <el-radio-group v-model="articleInfo.postFormats">
            <el-radio-button label="0">全部可见</el-radio-button>
            <el-radio-button label="1">仅我可见</el-radio-button>
          </el-radio-group>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="1.5" :offset="5">
        <div>文章封面：</div>
      </el-col>
      <el-col :span="12">
        <el-input v-model="articleInfo.articleCover" :disabled="true"></el-input>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="3" :offset="5">
        <!-- 公告文章按钮 -->
        <el-button type="primary" size="medium" @click="releaseBtn"
        >发布文章
        </el-button>
      </el-col>
    </el-row>


  </div>
</template>

<script>
// require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import {quillEditor} from 'vue-quill-editor'

export default {
  name: "addArticle",
  data() {
    return {
      articleInfo: {
        articleTitle: null, //文章标题
        articleAuthor: window.sessionStorage.getItem("username"), //文章作者
        introduction: null, //文章介绍
        articleContent: null, //文章内容
        articleLabel: null, //文章标签
        articleType: 0, //文章类型（0-原创[默认]，1-转载）
        postFormats: 0, //发布形式（0-全部可见[默认]，1-仅我可见）
        articleCover: null //文章封面
      }
    }
  },
  methods: {
    releaseBtn() {
      console.log(this.articleInfo)
      this.postRequest("/api/admin/xwArticle/save", this.articleInfo).then(resp => {
        if (resp.msg = 'success') {
          this.$message.success("发布成功，请到文章列表查看!")
          this.$router.replace("/articleList")
        }
      })
    },
    notify1() {
      this.$notify({
        title: '提示',
        message: '发布界面无法及时保存，请先存于本地，复制文章到该发布页。',
        duration: 0,
        type: "warning"
      });
    },
    goBack(){
      this.$router.push('/home')
    },
  },
  components: {
    quillEditor
  },
  mounted() {
    this.notify1()
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

.el-row-content {
  margin-bottom: 100px;
}
</style>