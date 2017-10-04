<template>
  <div>
    <el-form :inline="true" :model="searchForm">
      <el-form-item prop="treatmentId">
        <el-select v-model="searchForm.treatmentId" filterable placeholder="请选择">
          <el-option v-for="item in treatmentList" :key="item.id" :label="item.name" :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="loadData(1)" icon="el-icon-search">搜索</el-button>
      </el-form-item>
    </el-form>
    <div style="width:800px;height:400px;" ref="chart">
    </div>
  </div>
</template>
<script>
import echarts from 'echarts'
export default {
  data() {
    return {
      searchForm: {
        treatmentId: null
      },
      treatmentList: [],
      myChart: null
    }
  },
  created() {
    this._initData()
  },
  mounted() {
    setTimeout(() => {
      this.myChart = echarts.init(this.$refs.chart)
    }, 20)
  },
  methods: {
    async _initData() {
      await this.$http.get('/treatments?pageSize=0').then((response) => {
        this.treatmentList = response.data.list
      })
    },
    loadData() {
      this.$http.get('/relationCounts/treatments/chart/line?ids=5,9').then((response) => {
        this.myChart.setOption({
          title: { text: response.data.titleText },
          tooltip: {},
          xAxis: {
            data: response.data.xStringList
          },
          yAxis: {},
          series: response.data.seriesList
        })
      })
    }
  }
}
</script>
<style>

</style>

