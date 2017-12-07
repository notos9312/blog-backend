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
                @open="handleOpen"
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
                  <template slot="title">个人资料</template>
                    <el-menu-item
                    index="/controller/profile"
                    style="padding-left:55px;">基本资料</el-menu-item>
                </el-submenu>
              </el-menu>
            </el-aside>
          </el-col>
          <el-col id="rightOpt" :span="17" style="box-sizing:border-box; padding-top:90px;">
            <div id="optNav" style="color:#fff;">
              <!-- <div id="location" style="float:left; height:100%; ">
                <span style="vertical-align:middle;"> <router-link to="/controller/all">总览</router-link> - <a href="#/controller/essays">随笔</a></span>
              </div> -->
              <div id="optBtn">
                <!-- <el-button type="success" icon="el-icon-circle-plus" @click="clickCreate()">新增</el-button>
                <el-button type="danger" icon="el-icon-delete">删除</el-button> -->
                <ul>
                  <li v-if="createSeen"><el-button type="success" icon="el-icon-circle-plus-outline" @click="clickCreate()">新增</el-button></li>
                  <li v-if="true"><el-button type="success" icon="el-icon-edit-outline" @click="clickEdit()">编辑</el-button></li>
                  <li v-if="cancelSeen"><el-button type="danger" icon="el-icon-close" @click="clickCancel()">取消</el-button></li>
                  <li v-if="saveSeen"><el-button type="success" icon="el-icon-check" @click="clickSave()">保存</el-button></li>
                  <li v-if="deleteSeen"><el-button type="danger" icon="el-icon-delete" @click="clickDelete()">删除</el-button></li>
                </ul>
              </div>
            </div>
            <el-main id="optPanel">
              <table-panel :tableSeen="panelSeen.tableSeen" :panelType="panelType"></table-panel>
              <markdown-panel ref="markdown" :value="markdownData" :markdownSeen="panelSeen.markdownSeen" :panelType="panelType"></markdown-panel>
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
import MarkdownPanel from '@/components/public/MarkdownPanel'

export default {
  props:['panelType'],
  components: {
    NotFooter,
    TablePanel,
    MarkdownPanel,
  },
  created: function() {
    this.initBtnSeen()
  },
  data() {
    return {
      hello: 'hello?',
      createSeen: true,
      editSeen: false,
      cancelSeen: false,
      saveSeen: false,
      deleteSeen: true,
      panelSeen: {
        tableSeen: true,
        markdownSeen: false
      },
      markdownData: '',
    }
  },
  methods: {
    clickAvatar: function() {
      this.$message("click avatar")
    },
    clickCreate: function() {
      this.$message("click create btn")
      this.markdownData = ' '
      this.$router.push({path: '/controller/'+this.$route.params.panelType, query:{opt:'create'}})
    },
    clickCancel: function() {
      var _this = this
      this.$confirm('将不做任何修改直接返回，是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(()=>{
        _this.$router.go(-1)
      }).catch(()=>{})
    },
    clickEdit: function() {
      var _this = this
      this.$http.get('/api/getmd').then(res => {
        _this.markdownData = res.body
        _this.$router.push({path: '/controller/'+this.$route.params.panelType, query:{opt:'edit'}})
        console.log('获取数据成功:')
        console.log(res.body)
      }, err => {
        console.log("获取数据失败:"+err.status)
      })
    },
    clickSave: function() {
      console.log(this.$refs.markdown.mdData)
    },
    handleOpen: function(key, keyPath) {
      if(key == 1) {
        this.$router.push('/controller/all')
      }
    },
    firstToUpperCase: function(str) {
      return str.substring(0,1).toUpperCase() + str.substring(1)
    },
    initBtnSeen: function(){
      console.log(this.$route.query)
      if(JSON.stringify(this.$route.query) != "{}"){
        if (this.$route.query.opt == 'create' || this.$route.query.opt == 'edit'){
          this.setBtnSeen(false, false, true, true, false)
          this.panelSeen.tableSeen = false
          this.panelSeen.markdownSeen = true
        }
      }else {
        switch (this.$route.params.panelType) {
          case "all":
            this.setBtnSeen(false, false, false, false, true)
            this.panelSeen.tableSeen = true
            this.panelSeen.markdownSeen = false
            break;
          case "articles":
          case "essays":
          case "notes":
          case "profile":
            this.setBtnSeen(true, false, false, false, true)
            this.panelSeen.tableSeen = true
            this.panelSeen.markdownSeen = false
            break;
        }
      }
    },
    setBtnSeen: function(createSeen, editSeen, cancelSeen, saveSeen, deleteSeen){
      this.createSeen = createSeen
      this.editSeen = editSeen
      this.cancelSeen = cancelSeen
      this.saveSeen = saveSeen
      this.deleteSeen = deleteSeen
    }
  },
  watch: {
    '$route': 'initBtnSeen',
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
  }
  #optBtn {
    float:right;
    /* margin:30px 30px 0 0; */
  }
  #optBtn ul li {
    list-style: none;
    float: left;
    margin: 12px 30px 0 0;
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
    border-right: 0;
  }
  a{
    text-decoration: none;
    color: #fff;
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

