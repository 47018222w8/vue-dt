<template>
  <el-form :model="form" label-position="right" ref="form" style="width:300px;margin-top:20px;" label-width="100px">
    <el-form-item label="姓名" :rules="[{required:true,message:'姓名为必填项'}]" prop="name">
      <el-input type="text" v-model="form.name" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="科室" :rules="[{required:true,message:'科室为必选项'}]" prop="deptId">
      <el-select v-model="form.deptId" filterable placeholder="请选择" style="width:100%">
        <el-option v-for="item in departmentList" :key="item.id" :label="item.name" :value="item.id">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="备注" prop="remark">
      <el-input type="text" v-model="form.remark" auto-complete="off"></el-input>
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
        name: '',
        deptId: '',
        remark: ''
      },
      departmentList: [],
      subDisabled: false
    }
  },
  created() {
    this._initData()
  },
  methods: {
    async _initData() {
      await this.$http.get('/departments').then((response) => {
        this.departmentList = response.data
      })
    },
    async submitForm(form) {
      this.subDisabled = true
      await this.$refs[form].validate((valid) => {
        if (valid) {
          this.$http.post('/doctors', this.form).then((response) => {
            this.$message({
              message: '添加成功',
              type: 'success',
              duration: 1500
            })
            this.$refs[form].resetFields()
          })
        } else {
          return false
        }
      })
      this.subDisabled = false
    }
  }
}
</script>
<style lang="less">

</style>

