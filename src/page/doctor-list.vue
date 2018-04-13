<template>
  <div>
    <el-form :inline="true">
      <el-form-item >
        <el-button @click="toAdd" type="primary">添加医生</el-button>
      </el-form-item>
    </el-form>
    <el-table v-loading="loadingForm" border :data="doctorList" style="width: 100%">
      <el-table-column prop="name" label="姓名">
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
        doctorList: [],
        loadingForm: false
      }
    },
    created() {
      this._initData()
    },
    methods: {
      async _initData() {
        this.loadingForm = true
        await this.$http.get('/doctors').then((response) => {
          let result = response.data
          this.pageInfo = result
          this.doctorList = result.list
          this.loadingForm = false
        })
      },
      toAdd() {
        this.$router.push({
          name: 'doctorAdd'
        })
      },
      toUpdate(row) {
        this.$router.push({
          name: 'doctorUpdate',
          params: { doctorId: row.id }
        })
      },
      loadData(pageNum) {
        this.$http.get('/doctors?pageNum=' + pageNum).then((response) => {
          let result = response.data
          this.doctorList = result.list
        })
      }
    }
  }
</script>