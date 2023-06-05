<template>
<div>1</div>
</template>

<script>
export default {
  name: "ctrlArticlePage",
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

</style>