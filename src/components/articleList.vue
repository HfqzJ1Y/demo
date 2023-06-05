<template>
  <div>
    <div v-for="items in articleData">
      <el-row>
        <el-col :span="15" :offset="5">
          <el-card class="box-card" style="margin-top: 20px" shadow="hover">
            <div slot="header" class="clearfix">
              <span>{{ items.articleTitle }}</span>
              <el-button style="float: right; padding:0" type="text" @click="handleArticle(items.xwArticleId)">查看全文</el-button>
            </div>
            <div>{{ items.introduction }}</div>
          </el-card>
        </el-col>
      </el-row>
    </div>

    <div class="block">
      <el-pagination
          layout="prev, pager, next"
          @current-change="handleCurrentChange"
          :page-size="pageConfig.limit"
          :total="totalCount">
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: "articleList",
  data() {
    return {
      pageConfig: {
        page: 1,
        limit: 10,
      },
      totalCount: 100,
      articleData: null,
      currentId: {
        'id': null
      }
    }
  },
  methods: {
    loadArticleData() {
      this.postRequest("/api/admin/xwArticle/list", this.pageConfig).then(resp => {
        console.log(resp)
        this.articleData = resp.data.data.list
        console.log(this.articleData)
        this.totalCount = resp.data.data.totalCount
      })
    },
    handleArticle(xwArticleId) {
      console.log(xwArticleId)
      this.$router.push({
        path: '/articleShow',
        query: {
          xwArticleId:xwArticleId
        }
      })
    },
    handleCurrentChange(val) {
      this.pageConfig.page = val;
      this.loadArticleData();
    },
  },
  computed: {},
  mounted() {
    this.loadArticleData();
  }
}
</script>

<style scoped>
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both
}
</style>