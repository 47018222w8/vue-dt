<template>
  <div v-if="pageInfo">
    <el-button @click="toAdd" type="primary">添加术士</el-button>
    <el-table border :data="treatmentList" style="width: 100%">
      <el-table-column prop="name" label="名称">
      </el-table-column>
      <el-table-column prop="departmentName" label="科室">
      </el-table-column>
      <el-table-column prop="gmtCreateStr" label="创建日期">
      </el-table-column>
      <el-table-column prop="remark" label="备注">
      </el-table-column>
      <el-table-column label="操作">
        <template scope="scope">
          <el-button @click="toUpdate(scope.row)" type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- <el-pagination @current-change="loadData" :current-page.sync="pageInfo.lastPage" :page-size="10" layout="tot, prev, pagealr, next" :total="pageInfo.total">
            </el-pagination> -->
    <el-pagination @current-change="loadData" :page-size="10" layout="total, prev, pager, next" :total="pageInfo.total">
    </el-pagination>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pageInfo: null,
      treatmentList: []
    }
  },
  created() {
    this._initData()
  },
  methods: {
    _initData() {
      this.$http.get('/base/treatment/list').then((response) => {
        let result = response.data
        if (result.code === 200) {
          this.pageInfo = result.data
          this.treatmentList = result.data.list
        }
      }).catch((error) => {
        console.log(error)
      })
    },
    toAdd() {
      this.$router.push({
        name: 'treatmentAdd'
      })
    },
    toUpdate(row) {
      this.$router.push({
        name: 'treatmentUpdate',
        params: { treatmentId: row.id }
      })
    },
    loadData(pageNum) {
      this.$http.get('/base/treatment/list?pageNum=' + pageNum).then((response) => {
        let result = response.data
        if (result.code === 200) {
          this.treatmentList = result.data.list
        }
      }).catch((error) => {
        console.log(error)
      })
    }
  }
}
</script>