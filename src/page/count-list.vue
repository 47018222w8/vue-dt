<template>
  <div v-if="pageInfo" v-loading.body="loading">
    <el-button @click="toAdd" type="primary">添加统计</el-button>
    <el-button @click="excelD" :loading="excelDloading" type="primary">{{excelDloading?'下载中...':'医生-术士excel导出'}}</el-button>
    <el-button @click="excelT" :loading="excelTloading" type="primary">{{excelTloading?'下载中...':'术士excel导出'}}</el-button>
    <el-table border :data="countList" style="width: 100%">
      <el-table-column prop="doctorName" label="姓名">
      </el-table-column>
      <el-table-column prop="treatmentName" label="术士">
      </el-table-column>
      <el-table-column prop="departmentName" label="科室">
      </el-table-column>
      <el-table-column prop="operateDateStr" label="进行日期">
      </el-table-column>
      <el-table-column prop="gmtCreateStr" label="创建日期">
      </el-table-column>
      <el-table-column label="操作">
        <template scope="scope">
          <el-button @click="del(scope.row.id)" :plain="true" type="danger" size="small">删除</el-button>
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
      countList: [],
      pageNum: 1,
      loading: true,
      excelTloading: false,
      excelDloading: false
    }
  },
  created() {
    this._initData()
  },
  methods: {
    async _initData() {
      await this.$http.get('/count/list').then((response) => {
        let result = response.data
        if (result.code === 200) {
          this.pageInfo = result.data
          this.countList = result.data.list
          this.loading = false
        }
      }).catch((error) => {
        console.log(error)
      })
    },
    del(id) {
      this.$http.delete('/count/' + id).then((response) => {
        let result = response.data
        if (result.code === 200) {
          this.loadData(this.pageNum)
          this.$message({
            message: '删除成功',
            type: 'success',
            duration: 1500
          })
        } else { }
      }).catch((error) => {
        console.log(error)
      })
    },
    excelD() {
      this.excelDloading = true
      setTimeout(() => {
        this.excelDloading = false
      }, 1500)
      this.$http.get('/count/excel/doctor/week').then((response) => {
        let result = response.data
        if (result.code === 200) {
          window.location.href = result.data
          this.$message({
            message: '下载成功',
            type: 'success',
            duration: 1500
          })
        } else { }
      }).catch((error) => {
        console.log(error)
      })
    },
    excelT() {
      this.excelTloading = true
      setTimeout(() => {
        this.excelTloading = false
      }, 1500)
      this.$http.get('/count/excel/treatment/week').then((response) => {
        let result = response.data
        if (result.code === 200) {
          window.location.href = result.data
          this.$message({
            message: '下载成功',
            type: 'success',
            duration: 1500
          })
        } else { }
      }).catch((error) => {
        console.log(error)
      })
    },
    toAdd() {
      this.$router.push({
        name: 'countAdd'
      })
    },
    loadData(pageNum) {
      this.$http.get('/count/list?pageNum=' + pageNum).then((response) => {
        let result = response.data
        if (result.code === 200) {
          this.countList = result.data.list
          this.pageNum = pageNum
        }
      }).catch((error) => {
        console.log(error)
      })
    }
  }
}
</script>