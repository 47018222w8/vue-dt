<template>
  <div >
    <el-form  v-loading="loadingForm"  :inline="true" :model="searchForm">
      <el-form-item prop="doctorId">
        <el-select v-model="searchForm.doctorId" filterable placeholder="请选择医生">
          <el-option v-for="item in doctorList" :key="item.id" :label="item.name" :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="treatmentId">
        <el-select v-model="searchForm.treatmentId" filterable placeholder="请选择术士">
          <el-option v-for="item in treatmentList" :key="item.id" :label="item.name" :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="operateDate">
        <el-date-picker v-model="searchForm.operateDate" @change="operateDate" :editable="false" type="date" placeholder="请选择日期" style="width:100%"></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="loadData(1)" icon="el-icon-search">搜索</el-button>
        <el-button @click="toAdd" type="primary">添加统计</el-button>
      </el-form-item>
    </el-form>
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
      <el-table-column label="操作" width="100">
        <template scope="scope">
          <el-button @click="del(scope.row.id)" :plain="true" type="text" style="color: red;" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination @current-change="loadData" :current-page.sync="pageNum" :page-size="10" layout="total, prev, pager, next" :total="pageInfo.total">
    </el-pagination>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        pageInfo: null,
        countList: [],
        doctorList: [],
        treatmentList: [],
        pageNum: 1,
        loadingForm: true,
        searchForm: {
          doctorId: null,
          treatmentId: null,
          operateDateStr: null,
          operateDate: null
        }
      }
    },
    created() {
      this._initData()
      this.loadingForm = false
    },
    methods: {
      async _initData() {
        await this.$http.get('/relationCounts').then((response) => {
          this.pageInfo = response.data
          this.countList = response.data.list
        })
        await this.$http.get('/doctors?pageSize=0').then((response) => {
          this.doctorList = response.data.list
        })
        await this.$http.get('/treatments?pageSize=0').then((response) => {
          this.treatmentList = response.data.list
        })
      },
      operateDate(value) {
        value ? this.searchForm.operateDateStr = value : this.searchForm.operateDateStr = null
      },
      del(id) {
        this.loadingForm = true
        this.$http.delete('/relationCounts/' + id).then((response) => {
          this.loadData(this.pageNum)
          this.$message({
            message: '删除成功',
            type: 'success',
            duration: 1500
          })
        })
      },
      excelD() {
        this.excelDloading = true
        setTimeout(() => {
          this.excelDloading = false
        }, 1500)
        this.$http.get('/relationCounts/excel/doctors').then((response) => {
          window.location.href = response.data
          this.$message({
            message: '下载成功',
            type: 'success',
            duration: 1500
          })
        })
      },
      toAdd() {
        this.$router.push({
          name: 'countAdd'
        })
      },
      loadData(pageNum) {
        this.loadingForm = true
        this.searchForm.pageNum = pageNum
        this.$http.get('/relationCounts', { params: this.searchForm }).then((response) => {
          this.countList = response.data.list
          this.pageInfo = response.data
          this.pageNum = pageNum
          this.loadingForm = false
        })
      }
    }
  }
</script>