<template>
  <div class="form">
    <el-form :model="form" label-position="top" ref="form" label-width="100px">
      <el-form-item label="账号" :rules="[{required:true,message:'账号为必填项'}]" prop="account">
        <el-input v-model="form.account" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" :rules="[{required:true,message:'密码为必填项'}]" prop="password">
        <el-input type="password" v-model="form.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" :loading="subDisabled" style="width:100%" @click="submitForm('form')">{{subDisabled?'加载中...':'登录'}}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import constant from '../components/constant'
export default {
  data() {
    return {
      form: {
        password: '',
        account: ''
      },
      subDisabled: false
    }
  },
  methods: {
    async submitForm(form) {
      await this.$refs[form].validate((valid) => {
        if (valid) {
          this.subDisabled = true
          this.$http.post('/sessions', this.form).then((response) => {
            let result = response.data
            localStorage.setItem(constant.JWT_HEADER, constant.JWT_TOKEN_HEAD + result)
            this.$http.defaults.headers.common[constant.JWT_HEADER] = constant.JWT_TOKEN_HEAD + result
            setTimeout(() => {
              this.$router.push({
                name: 'home'
              })
            }, 1000)
          }).catch((error) => {
            if (error.response) {
              error.response.status === 400 && this.$message({
                message: '账号密码错误',
                center: true,
                type: 'error'
              })
            }
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
.form {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 80vh;
}
</style>
