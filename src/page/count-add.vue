<template>
  <div>
    <el-form v-loading="loadingForm" :model="form" label-position="right" ref="form" style="width:300px;margin-top:20px;" label-width="100px">
      <el-form-item label="医生" :rules="[{required:true,message:'医生为必选项'}]" prop="doctorId">
        <el-select v-model="form.doctorId" filterable placeholder="请选择" @change="loadTreatment" style="width:100%">
          <el-option v-for="item in doctorList" :key="item.id" :label="item.name" :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="术士" v-loading="loadingTreatment" :rules="[{required:true,message:'术士为必选项'}]" prop="treatmentId">
        <el-select v-model="form.treatmentId" filterable placeholder="请选择" style="width:100%">
          <el-option v-for="item in treatmentList" :key="item.id" :label="item.name" :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="执行日期" :rules="[{required:true,message:'执行日期为必选项'}]" prop="operateDate">
        <el-date-picker value-format="yyyy-MM-dd" v-model="form.operateDate" @change="operateDate" :editable="false" type="date" placeholder="请选择" style="width:100%"></el-date-picker>
      </el-form-item>
      <el-form-item label="次数" prop="count">
        <el-input-number v-model="form.count" :min="1" :max="999" style="width:100%"></el-input-number>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" :loading="subDisabled" @click="submitForm('form')">{{subDisabled?'加载中...':'确认添加'}}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        form: {
          doctorId: null,
          treatmentId: null,
          count: 1,
          remark: '',
          operateDateStr: null,
          operateDate: null
        },
        doctorList: null,
        treatmentList: [],
        subDisabled: false,
        loadingForm: true,
        loadingTreatment: false
      }
    },
    created() {
      this._initData()
      this.loadingForm = false
    },
    methods: {
      operateDate(value) {
        value ? this.form.operateDateStr = value : this.form.operateDateStr = null
      },
      async _initData() {
        await this.$http.get('/doctors?pageNum=0&pageSize=0').then((response) => {
          this.doctorList = response.data.list
        })
      },
      async submitForm(form) {
        this.subDisabled = true
        await this.$refs[form].validate((valid) => {
          if (valid) {
            this.$http.post('/relationCounts', this.form).then((response) => {
              this.$message({
                message: '添加成功',
                type: 'success',
                duration: 1000
              })
              this.subDisabled = false
              this.form.treatmentId = null
            })
          } else {
            this.subDisabled = false
            return false
          }
        })
      },
      async loadTreatment(value) {
        this.form.treatmentId = null
        this.loadingTreatment = true
        await this.$http.get('/treatments?pageSize=0&doctorId=' + value).then((response) => {
          this.treatmentList = response.data.list
          this.loadingTreatment = false
        })
      }
    }
  }
</script>
<style lang="less">

</style>

