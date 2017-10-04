<template>
  <div v-if="pageInfo">
    <el-form :inline="true">
      <el-form-item>
        <el-button @click="toAdd" type="primary">添加术士</el-button>
      </el-form-item>
    </el-form>
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
      this.$http.get('/treatments').then((response) => {
        this.pageInfo = response.data
        this.treatmentList = response.data.list
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
      this.$http.get('/treatments?pageNum=' + pageNum).then((response) => {
        this.treatmentList = response.data.list
      })
    }
  }
}
</script>