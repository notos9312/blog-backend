<template>
  <div id="loginVue">
    <div id="loginDiv">
      <el-form :model="loginForm" :rules="loginRules" ref="loginForm">
        <el-form-item prop="username">
          <el-input :autofocus="true" placeholder="用户名" v-model="loginForm.username" clearable></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" v-model="loginForm.password" placeholder="密码" @keyup.enter.native="login()" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="login()">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
    <not-footer></not-footer>
  </div>
</template>

<script>
import md5 from 'js-md5'
import NotFooter from '@/components/public/NotFooter.vue'

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
          this.$router.push({path:'/test/123'})
        }
      })
    },
    postData(data) {
      var _this = this
      this.$http.post('/api/login', {username:data.username, password:md5(data.password)}, {emulateJSON:true})
      .then(res => {
        console.log(res.body)
        var sucData = res.body
        if(sucData.errCode != 0)
          _this.$message({
            message: sucData.errMsg,
            type: sucData.msgType
          })
          if(sucData.errCode === 0){
            _this.$router.push({path:'/controller/all'})
          }
      }, err => {
        console.log(err.status)
        _this.$message.error('请求错误：'+err.status)
      })
    }
  },
  components: {
    NotFooter
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
    padding: 5px 0;
    background: #fff;
    margin: 0 auto;
    top: 20%;
    border: 0;
    border-radius: 4px;
  }

  .el-form-item {
    width: 300px;
    margin-left: 35px;
  }

  .el-form {
    padding-top: 30px;
  }
</style>
