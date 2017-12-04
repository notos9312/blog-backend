<template>
  <div id="loginVue">
    <div id="loginDiv">
      <el-form :model="loginForm" :rules="loginRules" ref="loginForm">
        <el-form-item prop="username">
          <el-input placeholder="用户名" v-model="loginForm.username" clearable></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" v-model="loginForm.password" placeholder="密码" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="login()">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div id="loginFooter">
      <p> &copy;2017 Notos - NotFamous</p>
    </div>
  </div>
</template>

<script>
import md5 from 'js-md5'

export default {
  data() {
    var validateUsername = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入用户名!'))
      } else {
        callback()
      }
    }

    var validatePassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码!'))
      } else {
        callback()
      }
    }

    return {
      loginForm: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [
          {validator: validateUsername, trigger: 'blur'}
        ],
        password: [
          {validator: validatePassword, trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    login() {
      this.$refs.loginForm.validate((valid)=>{
        if (valid) {
          this.postData(this.loginForm)
          // console.log(md5(this.loginForm.password))
        } else {
          this.$message({
            message: '没按要求输入',
            type: 'warning'
          })
        }
      })
    },
    postData(data) {
      var _this = this
      this.$http.post('/api/login', {username:data.username, password:md5(data.password)}, {emulateJSON:true})
      .then(res => {
        console.log(res.body)
        var sucData = res.body
          _this.$message({
            message: sucData.errMsg,
            type: sucData.msgType
          })
      }, err => {
        console.log(err.status)
        _this.$message.error('请求错误：'+err.status)
      })
    }
  }
}
</script>

<style scoped>
  #loginVue {
    margin: 0 auto;
    text-align: center;
    height: 100%;
  }

  #loginDiv {
    width: 370px;
    position: relative;
    border: 0;
    padding: 5px 0;
    background: #fff;
    margin: 175px auto 0 auto;
    border-radius: 4px;
  }

  #loginFooter {
    position: absolute;
    color: #2c3e50;
    text-align: center;
    bottom: 0;
    width: 100%
  }

  .el-form-item {
    width: 300px;
    margin-left: 35px;
  }

  .el-form {
    padding-top: 30px;
  }
</style>
