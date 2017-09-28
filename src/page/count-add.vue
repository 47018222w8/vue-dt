<template>
  <el-form v-if="doctorList" :model="form" label-position="right" ref="form" style="width:300px;margin-top:20px;" label-width="100px">
    <el-form-item label="医生" :rules="[{required:true,message:'医生为必选项'}]" prop="doctorId">
      <el-select v-model="form.doctorId" filterable placeholder="请选择" @change="loadTreatment" style="width:100%">
        <el-option v-for="item in doctorList" :key="item.id" :label="item.name" :value="item.id">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="术士" :rules="[{required:true,message:'术士为必选项'}]" prop="treatmentId">
      <el-select v-model="form.treatmentId" filterable placeholder="请选择" style="width:100%">
        <el-option v-for="item in treatmentList" :key="item.id" :label="item.name" :value="item.id">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="执行日期" :rules="[{required:true,message:'执行日期为必选项'}]" prop="operateDateStr">
      <el-date-picker v-model="form.operateDateStr" @change="operateDate" :editable="false" type="date" placeholder="请选择" style="width:100%"></el-date-picker>
    </el-form-item>
    <el-form-item label="次数" prop="count">
      <el-input-number v-model="form.count" :min="1" :max="999" style="width:100%"></el-input-number>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" :loading="subDisabled" @click="submitForm('form')">{{subDisabled?'加载中...':'确认添加'}}</el-button>
    </el-form-item>
  </el-form>
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
        operateDateStr: ''
      },
      doctorList: null,
      treatmentList: [],
      subDisabled: false
    }
  },
  created() {
    this._initData()
  },
  methods: {
    operateDate(value) {
      this.form.operateDateStr = value
    },
    async _initData() {
      await this.$http.get('/base/doctor/list?pageNum=0&pageSize=0').then((response) => {
        let result = response.data
        if (result.code === 200) {
          this.doctorList = result.data.list
        }
      }).catch((error) => {
        console.log(error)
      })
    },
    async submitForm(form) {
      this.subDisabled = true
      await this.$refs[form].validate((valid) => {
        if (valid) {
          this.$http.post('/count', this.form).then((response) => {
            let result = response.data
            if (result.code === 200) {
              this.$message({
                message: '添加成功',
                type: 'success',
                duration: 1500
              })
              this.form.treatmentId = null
            } else { }
          }).catch((error) => {
            console.log(error)
          })
        } else {
          return false
        }
      })
      this.subDisabled = false
    },
    async loadTreatment(value) {
      this.form.treatmentId = null
      await this.$http.get('/base/treatment/list?pageSize=0&doctorId=' + value).then((response) => {
        let result = response.data
        if (result.code === 200) {
          this.treatmentList = result.data.list
        } else { }
      }).catch((error) => {
        console.log(error)
      })
    }
  }
}
</script>
<style lang="less">

</style>

