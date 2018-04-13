<template>
  <div class="c-login">
    <el-form class="c-body" :model="form" label-position="top" ref="form" label-width="100px">
      <el-form-item label="账号" :rules="[{required:true,message:'账号为必填项'}]" prop="account">
        <el-input v-model="form.account" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" :rules="[{required:true,message:'密码为必填项'}]" prop="password">
        <el-input type="password" v-model="form.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" :loading="loading" style="width:100%" @click="submitForm('form')">{{loading?'登录中...':'登录'}}</el-button>
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
        loading: false
      }
    },
    created() {

    },
    mounted() {
      let _this = this
      document.onkeydown = function (e) {
        if (window.event.keyCode === 13) {
          _this.submitForm('form')
        }
      }
    },
    methods: {
      submitForm(form) {
        this.$refs[form].validate(async (valid) => {
          if (valid) {
            this.loading = true
            await this.$http.post('/sessions', this.form).then((response) => {
              let result = response.data
              localStorage.setItem(constant.JWT_HEADER, constant.JWT_TOKEN_HEAD + result)
              this.$http.defaults.headers.common[constant.JWT_HEADER] = constant.JWT_TOKEN_HEAD + result
              this.$router.push({
                name: 'home'
              })
            }).catch((error) => {
              this.$message({
                message: error.response.data.message,
                center: true,
                type: 'error'
              })
              this.loading = false
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
.c-login {
  height: 100vh;
  display: flex;
  justify-content: center;
  background-image: url("../assets/home-1.jpg");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  .c-body {
    margin-top: 10%;
  }
}
</style>
