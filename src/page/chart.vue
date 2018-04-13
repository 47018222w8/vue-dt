<template>
  <div>
    <el-tabs v-model="activeTab">
      <el-tab-pane label="单个医生手术占比" name="a">
        <el-form :inline="true" :model="searchFormA" ref="searchFormA">
          <el-form-item prop="doctorId" :rules="[{required:true,message:'请选择医生'}]">
            <el-select v-loading="!doctorList.length" v-model="searchFormA.doctorId" filterable placeholder="请选择医生">
              <el-option v-for="item in doctorList" :key="item.id" :label="item.name" :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-date-picker value-format="yyyy-MM-dd" v-model="searchFormA.date" type="daterange" align="right" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions2">
            </el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="searchA" icon="el-icon-search">搜索</el-button>
            <el-button type="primary" v-show="chartA" @click="downLoad('chartA')" icon="el-icon-download">下载图片</el-button>
          </el-form-item>
        </el-form>
        <div ref="chartA"></div>
      </el-tab-pane>
      <el-tab-pane label="单个手术医生占比" name="b">
        <el-form :inline="true" :model="searchFormB" ref="searchFormB">
          <el-form-item prop="treatmentId" :rules="[{required:true,message:'请选择术士'}]">
            <el-select v-loading="!treatmentList.length" v-model="searchFormB.treatmentId" filterable placeholder="请选择术士">
              <el-option v-for="item in treatmentList" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-date-picker value-format="yyyy-MM-dd" v-model="searchFormB.date" type="daterange" align="right" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions2">
            </el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="searchB" icon="el-icon-search">搜索</el-button>
            <el-button type="primary" v-show="chartB" @click="downLoad('chartB')" icon="el-icon-download">下载图片</el-button>
          </el-form-item>
        </el-form>
        <div ref="chartB"></div>
      </el-tab-pane>
    </el-tabs>

  </div>
</template>
<script>
  import G2 from '@antv/g2'
  import { DataView } from '@antv/data-set'
  export default {
    data() {
      return {
        searchFormA: {
          doctorId: null,
          date: null
        },
        searchFormB: {
          treatmentId: null,
          date: null
        },
        pickerOptions2: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            }
          }]
        },
        treatmentList: [],
        myChart: null,
        doctorList: [],
        chartA: null,
        chartB: null,
        activeTab: 'a'
      }
    },
    created() {
      this._initData()
    },
    mounted() {
    },
    methods: {
      async _initData() {
        await this.$http.get('/doctors?pageSize=0').then((response) => {
          this.doctorList = response.data.list
        })
        await this.$http.get('/treatments?pageSize=0').then((response) => {
          this.treatmentList = response.data.list
        })
      },
      searchA() {
        this.$refs.searchFormA.validate((valid) => {
          if (valid) {
            let params = {
              doctorId: this.searchFormA.doctorId
            }
            if (this.searchFormA.date) {
              params.startDate = this.searchFormA.date[0]
              params.endDate = this.searchFormA.date[1]
            }
            this.$http.get('/chart/circle/a', { params: params }).then((response) => {
              this.$refs.chartA.innerHTML = ''
              if (response.data.length) {
                this.initChart('chartA', response.data, this.$refs.chartA)
              } else {
                this.$message.warning('没有查到数据')
              }
            })
          } else {
            return false
          }
        })
      },
      searchB() {
        this.$refs.searchFormB.validate((valid) => {
          if (valid) {
            let params = {
              treatmentId: this.searchFormB.treatmentId
            }
            if (this.searchFormB.date) {
              params.startDate = this.searchFormB.date[0]
              params.endDate = this.searchFormB.date[1]
            }
            this.$http.get('/chart/circle/b', {params: params}).then((response) => {
              this.$refs.chartB.innerHTML = ''
              this.initChart('chartB', response.data, this.$refs.chartB)
            })
          } else {
            return false
          }
        })
      },
      downLoad(name) {
        this[name].downloadImage()
      },
      initChart(chart, data, node) {
        let total = 0
        data.forEach(element => {
          total += element.count
        })
        let dv = new DataView()
        dv.source(data).transform({
          type: 'percent',
          field: 'count',
          dimension: 'name',
          as: 'percent'
        })
        this[chart] = new G2.Chart({
          container: node,
          forceFit: true,
          height: 500,
          animate: false
        })
        this[chart].source(dv, {
          percent: {
            formatter: val => {
              val = (val * 100).toFixed(2) + '%'
              return val
            }
          }
        })
        this[chart].coord('theta', {
          // 外环
          radius: 0.8,
          // 内环
          innerRadius: 0.6
        })
        this[chart].tooltip({
          showTitle: false,
          itemTpl: '<li><span style="background-color:{color};" class="g2-tooltip-marker"></span>{name}: {value}</li>'
        })
        // 辅助文本
        this[chart].guide().html({
          position: ['50%', '50%'],
          html: '<div style="color:#8c8c8c;font-size: 14px;text-align: center;width: 10em;">共<span style="color:#8c8c8c;font-size:20px">' + total + '</span>次</div>',
          alignX: 'middle',
          alignY: 'middle'
        })
        this[chart].intervalStack()
          .position('percent')
          .color('name')
          .label('percent', {
            formatter: (val, name) => {
              return name.point.name + ': ' + val
            }
          })
          .tooltip('name*count', (name, count) => {
            return {
              name: name,
              value: count + '次'
            }
          })
          .style({
            lineWidth: 1,
            stroke: '#fff'
          })
        this[chart].render()
      }
    }
  }
</script>
<style>

</style>

