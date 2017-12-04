<template>
  <div id="controllerVue">
    <el-row id="controllerWrap">
      <el-container>
        <el-aside>
          <div id="userMsg">
            <div id="avator"></div>
          </div>
          <el-menu :default-openeds="['1', '2']" style="margin-top:1px;">
            <el-submenu index="1">
              <template slot="title">发布总览</template>
              <el-menu-item index="1-1" style="padding-left:50px;">记事</el-menu-item>
              <el-menu-item index="1-2" style="padding-left:50px;">吐槽</el-menu-item>
            </el-submenu>
            <el-submenu index="2">
              <template slot="title">实验场</template>
                <el-menu-item index="2-1" style="padding-left:50px;">敬请期待</el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>
      </el-container>
    </el-row>
    <not-footer></not-footer>
  </div>
</template>

<script>
import NotFooter from '@/components/public/NotFooter'
export default {
  data() {
    return {
      hello: 'hello?'
    }
  },
  created: function(){
    console.log('created')
    var _this = this
    this.$http.get('/api/hello').then(res => {
      _this.hello = res.body
    }, err => {
      _this.hello = err.status
    })
  },
  components: {
    NotFooter
  }
}
</script>

<style scoped>
  #controllerVue {
    height: 100%;
    margin: 0 auto;
    text-align: center;
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
  }

  #controllerWrap {
    position: relative;
    top: 5%;
    width: 90%;
    height: 86%;
    margin: 0 auto;
    background-color: rgba(255, 255,255, 0.9);
    border: 0;
    border-radius: 4px;
  }

  #controllerWrap>.el-container {
    position: relative;
    width: 99%;
    height: 98%;
    top: 1%;
    margin: 0 auto;
    border: 1px solid #eee;
  }

  #controllerWrap>.el-container>.el-aside {
    background-color: rgb(233, 233, 233);
    width: 35%;
  }

  #userMsg {
    height: 90px;
    /* background-color: #B3C0D1; */
    border-bottom: 1px solid #EDF2FC;
  }

  #avator {
    width: 80px;
    height: 80px;
    margin-top: 5px;
    background-color: blue;
    display:inline-block;
    vertical-align: middle;
    cursor: pointer;
  }

  .el-aside {
    color: #333;
  }

</style>

<style>
  .el-submenu__title {
    font-size: 18px;
  }
  .el-menu-item {
    font-size: 16px;
  }
</style>


