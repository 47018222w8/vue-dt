<template>
  <el-form v-if="form" :model="form" label-position="right" ref="form" style="width:300px;margin-top:20px;" label-width="100px">
    <el-form-item label="姓名" :rules="[{required:true,message:'姓名为必填项'}]" prop="name">
      <el-input type="text" v-model="form.name" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="科室" :rules="[{required:true,message:'科室为必选项'}]" prop="deptId">
      <el-select v-model="form.deptId" filterable placeholder="请选择" style="width:100%">
        <el-option v-for="item in departmentList" :key="item.id" :label="item.name" :value="item.id">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('form')">确认修改</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
export default {
  data() {
    return {
      form: null,
      departmentList: []
    }
  },
  created() {
    this._initData()
  },
  methods: {
    async _initData() {
      await this.$http.get('/base/doctor/' + this.$route.params.doctorId).then((response) => {
        let result = response.data
        if (result.code === 200) {
          this.departmentList = result.data.departmentList
          this.form = result.data.doctor
        }
      }).catch((error) => {
        console.log(error)
      })
    },
    submitForm(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          this.$http.put('/base/doctor', this.form).then((response) => {
            let result = response.data
            if (result.code === 200) {
              this.$message({
                message: '修改成功',
                type: 'success',
                duration: 1500
              })
              this.$refs[form].resetFields()
            } else { }
          }).catch((error) => {
            console.log(error)
          })
        } else {
          return false
        }
      })
    }
  }
}
</script>
<style lang="less">

</style>

