<template>
  <div id="controllerVue">
    <el-row>
      <el-col :span="3"></el-col>
      <el-col id="controllerWrap" :span="18">
        <el-row>
          <el-col id="leftMenu" :span="7" style="box-sizing:border-box; padding-top:90px;">
            <div id="userMsg">
              <div id="avatar" @click="clickAvatar()"><img width="100%" height="100%" src="../../assets/images/avatar.png" alt="my avatar"></div>
            </div>
            <el-aside style="width:100%">
              <el-menu :default-openeds="['1', '2']"
                :defaultActive="$route.path"
                background-color="#EEF1F6"
                :router="true">
                <el-submenu index="1">
                  <template slot="title">发布总览</template>
                  <el-menu-item
                    index="/controller/articles"
                    style="padding-left:55px;">文章</el-menu-item>
                  <el-menu-item
                    index="/controller/essays"
                    style="padding-left:55px;">随笔</el-menu-item>
                  <el-menu-item
                    index="/controller/notes"
                    style="padding-left:55px;">笔记</el-menu-item>
                </el-submenu>
                <el-submenu index="2">
                  <template slot="title">实验场</template>
                    <el-menu-item index="2-1" style="padding-left:55px;">敬请期待</el-menu-item>
                </el-submenu>
                <el-submenu index="3">
                  <template slot="title">个人资料</template>
                    <el-menu-item index="3-1" style="padding-left:55px;">基本资料</el-menu-item>
                </el-submenu>
              </el-menu>
            </el-aside>
          </el-col>
          <el-col id="rightOpt" :span="17" style="box-sizing:border-box; padding-top:90px;">
            <div id="optNav" style="color:#fff;">
              <div id="location" style="float:left; height:100%; margin:30px;">
                <span style="vertical-align:middle;"><a href="" style="color:#fff;">总览</a> - <a href="" style="color:#fff;">记事</a></span>
              </div>
              <div id="optBtn" style="float:right; height:100%; margin:30px;">
                <a href="" style="color:#fff;">新增</a> / <a href="" style="color:#fff;">删除</a>
              </div>
            </div>
            <el-main id="optPanel">
              <table-panel :panelType="panelType"></table-panel>
            </el-main>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="3"></el-col>
    </el-row>
    <not-footer></not-footer>
  </div>
</template>

<script>
import NotFooter from '@/components/public/NotFooter'
import TablePanel from '@/components/public/TablePanel'

export default {
  props:['panelType'],
  components: {
    NotFooter,
    TablePanel
  },
  created: function() {
    var _this = this
    this.$http.get('/api/hello').then(res => {
      _this.hello = res.body
    }, err => {
      _this.hello = err.status
    })
  },
  data() {
    return {
      hello: 'hello?',
    }
  },
  methods: {
    clickAvatar: function() {
      this.$message("click avatar")
    }
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
  #controllerVue>.el-row {
    position: relative;
    top: 5%;
    width: 100%;
    height: 86%;
    margin: 0 auto;
  }
  #controllerWrap{
    background-color: rgba(255, 255,255, 0.9);
    border: 0;
    border-radius: 4px;
  }
  #controllerWrap>.el-row{
    height: 100%;
  }
  .el-col {
    height: 100%;
  }
  #userMsg {
    position: absolute;
    top: 0;
    height: 90px;
    width: 29.2%;
    background-color: rgba(64,158,255,0.8);
    border: 0;
    border-radius: 4px 0 0 0;
  }
  #avatar {
    width: 80px;
    height: 80px;
    margin-top: 5px;
    display:inline-block;
    vertical-align: middle;
    cursor: pointer;
  }
  #optNav {
    position: absolute;
    top: 0;
    height: 90px;
    width: 70.8%;
    background-color: rgba(64,158,238,0.8);
    border: 0;
    border-radius: 0 4px 0 0;
    /* padding-top: 30px; */
  }
  #optPanel {
    height: 100%;
    width: 100%;
    background-color: white;
    border: 0;
    border-radius: 0 0 4px 0;
  }
  .el-aside {
    height: 100%;
    background-color: #EEF1F6;
    border: 0;
    border-radius: 0 0 0 4px;
  }
  .el-menu {
    width: 100%;
  }
  a{
    text-decoration: none;
    color: #2d2f33;
  }
  .router-link-active {
    text-decoration: none;
    color: #409EFF;
}
</style>

<style>
  .el-submenu__title {
    font-size: 18px;
  }
</style>

