<template>
  <div>
    <el-table
        :data="userData"
        border
        style="width: 100%">
      <el-table-column
          fixed
          prop="id"
          label="用户编号"
          width="200">
      </el-table-column>
      <el-table-column
          fixed
          prop="username"
          label="用户名">
      </el-table-column>
      <el-table-column
          fixed
          prop="realName"
          label="姓名">
      </el-table-column>
      <el-table-column
          fixed
          prop="createDate"
          label="创建时间">
      </el-table-column>
      <el-table-column
          fixed
          prop="updateDate"
          label="更新时间">
      </el-table-column>
      <el-table-column
          fixed
          prop="status"
          label="状态">
        <template slot-scope="scope">
          <template v-if="scope.row.status == '0'">
            <el-button type="danger" size="mini">停用</el-button>
          </template>
          <template v-else-if="scope.row.status == '1'">
            <el-button type="success" size="mini">正常</el-button>
          </template>
        </template>
      </el-table-column>
      <el-table-column
          fixed="right"
          label="操作">
        <template slot-scope="scope">
          <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">编辑
          </el-button>
          <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="block">
      <el-pagination
          layout="prev, pager, next"
          @current-change="handleCurrentChange"
          :total="totalCount">
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: "userList",
  data() {
    return {
      pageConfig: {
        page: 1,
        limit: 10,
      },
      totalCount: 100,
      userData: null,
      currentId: {
        'id': null
      }
    }
  },
  methods: {
    loadUserData() {
      this.postRequest("/api/admin/sysUser/list", this.pageConfig).then(resp => {
        this.userData = resp.data.data.list
        //console.log(this.userData)
        this.totalCount = resp.data.data.totalCount
        console.log(resp)
      })
    },
    handleCurrentChange(val) {
      //val是当前页数，也就是改变当前页面更改表格的数据。可以让学生发挥，通过element组件做一个可以改表表格行数的方法。
      this.pageConfig.page = val;

      //更改页面配置以后，重新加载用户数据即可。
      this.loadUserData();
    },
    handleEdit(index, rowData) {
      //看不懂的可以尝试打印出rowData就可以发现，这就是把这行的数据打包了出来。
      console.log(rowData)

      //新操作：携带数据进行router跳转
      this.$router.push({
        path: '/editUserInfo',
        query: {
          id:rowData.id
        }
      })
    },

    handleDelete(index, rowData) {
      this.currentId.id = rowData.id.toString()
      //根据接口文档发现，只需要传输一个id就能删除。我们可以做的复杂一点，先弹出文本框问确定删除xxx吗？然后确定再发送请求。
      this.$confirm('此操作将永久删除该用户名：【' + rowData.username + '】, 姓名：【' + rowData.realName + '】是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        //后端有问题，也可能是我没读懂接口文档
        this.postRequest("/api/admin/sysUser/delete",this.currentId).then(resp=>{
          if (resp.data.msg=='success'){
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.$router.go(0)
          }else {
            this.$message({
              type: 'warning',
              message: '删除失败!'
            });
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    }
  },
  computed: {},
  mounted() {
    this.loadUserData();
  }
}
</script>

<style scoped>

</style>