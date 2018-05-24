<template>
  <div id="controllerVue">
    <el-row>
      <el-col :span="3"></el-col>
      <el-col id="controllerWrap" :span="18">
        <el-row>
          <el-col id="leftMenu" :span="7" style="box-sizing:border-box; padding-top:90px;">
            <div id="userMsg">
              <div id="avatar" @click="clickAvatar()"><img width="100%" height="100%" src="http://qcdn.hinotos.com/avatar.png" alt="my avatar"></div>
            </div>
            <el-aside style="width:100%">
              <el-menu :default-openeds="['1', '2']"
                :defaultActive="$route.path"
                background-color="#EEF1F6"
                :router="true">
                <el-submenu index="1">
                  <template slot="title">发布总览</template>
                  <el-menu-item
                    index="/controller/all"
                    style="padding-left:55px;">全部</el-menu-item>
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
                    index="/controller/profile?opt=browse"
                    style="padding-left:55px;">基本资料</el-menu-item>
                </el-submenu>
              </el-menu>
            </el-aside>
          </el-col>
          <el-col id="rightOpt" :span="17" style="box-sizing:border-box; padding-top:90px;">
            <div id="optNav" style="color:#fff;">
              <div id="backBtn">
                <ul>
                  <li v-if="backSeen"><el-button type="danger" icon="el-icon-back" @click="clickBack()">返回</el-button></li>
                </ul>
              </div>
              <div id="optBtn">
                <ul>
                  <li v-if="createSeen"><el-button type="success" icon="el-icon-circle-plus-outline" @click="clickCreate()">新增</el-button></li>
                  <li v-if="editSeen"><el-button type="success" icon="el-icon-edit-outline" @click="clickEdit()">编辑</el-button></li>
                  <li v-if="cancelSeen"><el-button type="danger" icon="el-icon-close" @click="clickCancel()">取消</el-button></li>
                  <li v-if="saveSeen"><el-button type="success" icon="el-icon-check" @click="clickSave()">保存</el-button></li>
                  <li v-if="deleteSeen"><el-button type="danger" icon="el-icon-delete" @click="clickDelete()">删除</el-button></li>
                </ul>
              </div>
            </div>
            <el-main id="optPanel" v-loading="loading">
              <transition name="fade">
                <table-panel
                  ref="titleTable"
                  :tableSeen="tableSeen"
                  :panelType="panelType"
                  :contentTitles="titleData" ></table-panel>
              </transition>
              <transition name="fade">
                <markdown-panel
                  ref="markdown"
                  :contentObj="contentObj"
                  :editable="mdEditable"
                  :markdownSeen="markdownSeen"
                  :panelType="panelType" ></markdown-panel>
              </transition>
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
import NotFooter from "@/components/public/NotFooter";
import TablePanel from "@/components/public/TablePanel";
import MarkdownPanel from "@/components/public/MarkdownPanel";

export default {
  props: ["panelType"],
  components: {
    NotFooter,
    TablePanel,
    MarkdownPanel
  },
  created: function() {
    // this.$router.push('/controller/'+this.$route.params.panelType)
    if (this.$route.query.opt == "edit") {
      this.$router.push({
        path: "/controller/" + this.$route.params.panelType,
        query: { opt: "browse", objid: this.$route.query.objid }
      });
    }
    if (this.$route.params.panelType != "profile") {
      this.getContents(this.$route.params.panelType);
    } else {
      // 请求profile的内容
    }
  },
  mounted: function() {
    this.initBtnSeen();
    this.initMarkdownPanel();
  },
  data() {
    return {
      hello: "hello?",
      loading: true,
      backSeen: true,
      createSeen: true,
      editSeen: false,
      cancelSeen: false,
      saveSeen: false,
      deleteSeen: true,
      tableSeen: true,
      markdownSeen: false,
      markdownTitle: "",
      markdownData: "",
      contentObj: { title: "", content: "" },
      profileData: {},
      mdEditable: false,
      titleData: []
    };
  },
  methods: {
    clickAvatar: function() {
      this.$message("click avatar");
    },
    clickCreate: function() {
      this.contentObj = { title: "", content: "" };
      this.mdEditable = true;
      this.$router.push({
        path: "/controller/" + this.$route.params.panelType,
        query: { opt: "create" }
      });
    },
    clickBack: function() {
      this.$router.go(-1);
    },
    clickCancel: function() {
      var _this = this;
      this.$confirm("将不做任何修改直接返回，是否继续？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          // _this.$router.push('/controller/'+this.$route.params.panelType)
          _this.$router.go(-1);
        })
        .catch(() => {});
    },
    clickEdit: function() {
      var _this = this;
      this.$router.push({
        path: "/controller/" + this.$route.params.panelType,
        query: { opt: "edit", objid: this.$route.query.objid }
      });
    },
    clickSave: function() {
      var _this = this;
      var mdTitle = this.$refs.markdown.titleData;
      var mdContent = this.$refs.markdown.mdData;
      var mdObjId = this.$route.query.objid;

      if (this.$route.query.opt == "create") {
        // 新增内容
        if (this.$route.params.panelType != "all" && this.$route.params.panelType != "profile") {
          if (mdTitle == "" || mdContent == "") {
            this.$message.error("标题或内容不能为空！");
            return;
          }
          var mdCreateTime = new Date().getTime();
          var mdContentType = this.$route.params.panelType;
          var createContentData = {
            title: mdTitle,
            content: mdContent,
            createTime: mdCreateTime,
            contentType: mdContentType
          };
          this.createContent(createContentData);
        } else if (this.$route.params.panelType == "profile") {
          if (mdContent == "") {
            this.$message.error("个人资料不能为空！");
            return;
          }
          // 保存个人资料
          var createProfileData = {
            profile: mdContent
          };
          this.createProfile(createProfileData);
        }
      } else if (this.$route.query.opt == "edit") {
        if(this.$route.params.panelType == "profile"){
          if (mdContent == "") {
            this.$message.error("个人资料不能为空！");
            return;
          }
          var updateProfileData = {
            objectId: this.profileData._id,
            profile:mdContent
          };
          this.updateProfile(updateProfileData);

        } else {
          if (mdTitle == "" || mdContent == "") {
            this.$message.error("标题或内容不能为空！");
            return;
          }
          // 保存内容
          var updateContentData = {
            title: mdTitle,
            content: mdContent,
            objectId: mdObjId
          };
          this.updateContent(updateContentData);
        }
      }
    },
    clickDelete: function() {},
    firstToUpperCase: function(str) {
      return str.substring(0, 1).toUpperCase() + str.substring(1);
    },
    setBtnSeen: function(
      backSeen,
      createSeen,
      editSeen,
      cancelSeen,
      saveSeen,
      deleteSeen
    ) {
      this.backSeen = backSeen;
      this.createSeen = createSeen;
      this.editSeen = editSeen;
      this.cancelSeen = cancelSeen;
      this.saveSeen = saveSeen;
      this.deleteSeen = deleteSeen;
    },
    initBtnSeen: function() {
      if (JSON.stringify(this.$route.query) != "{}") {
        if (
          this.$route.query.opt == "create" ||
          this.$route.query.opt == "edit"
        ) {
          this.setBtnSeen(false, false, false, true, true, false);
          this.tableSeen = false;
        } else if(this.$route.query.opt == "browse"){
          if(this.$route.params.panelType == 'profile'){
            this.setBtnSeen(false, false, true, false, false, false);
          this.tableSeen = false;
          }
        }
      } else {
        switch (this.$route.params.panelType) {
          case "all":
            this.setBtnSeen(false, false, false, false, false, false);
            this.tableSeen = true;
            break;
          case "articles":
          case "essays":
          case "notes":
            this.setBtnSeen(false, true, false, false, false, false);
            this.tableSeen = true;
            break;
        }
      }
    },
    initMarkdownPanel: function() {
      var _this = this;
      if (JSON.stringify(this.$route.query) != "{}") {
        // 新增或者编辑的情况
        if (this.$route.query.opt == "create") {
          this.mdEditable = true;
        } else if (this.$route.query.opt == "edit") {
          this.mdEditable = true;
        } else if (this.$route.query.opt == "browse") {
          if(this.$route.params.panelType != 'profile'){
            var getTheContentData = { objectId: this.$route.query.objid };
            this.getTheContent(getTheContentData);
          } else if(this.$route.params.panelType == 'profile'){
            this.getProfile();
          }
        }
      } else {
        this.mdEditable = false;
      }
    },
    getContents: function(type) {
      var _this = this;
      this.loading = true;
      this.$axios.post("/api/getContents", { contentType: type })
        .then(res => {
            _this.loading = false;
            if (res.data.hasOwnProperty("errCode")) {
              _this.$message({
                message: res.data.errMsg,
                type: res.data.msgType
              });
            } else {
              this.titleData = res.data;
            }
          }).catch(err => {
            _this.loading = false;
            _this.$message.error('请求错误');
          });
    },
    getTheContent: function(data) {
      var _this = this;
      this.setBtnSeen(true, false, true, false, false, false);
      this.tableSeen = false;
      this.mdEditable = false;
      this.loading = true;
      this.$axios.post("/api/getTheContent", data)
        .then(
          res => {
            _this.loading = false;
            if (res.data.hasOwnProperty("errCode") && res.data.errCode != 0) {
              _this.$message({
                message: res.data.errMsg,
                type: res.data.msgType
              });
            } else {
              this.contentObj = res.data;
            }
          }).catch(err => {
            _this.loading = false;
            _this.$message.error('请求错误');
          });
    },
    updateContent: function(data) {
      var _this = this;
      this.loading = true;
      this.$axios.post("/api/updateContent", data)
        .then(
          res => {
            var sucData = res.data;
            _this.loading = false;
            _this.$message({
              message: sucData.errMsg,
              type: sucData.msgType
            });
            _this.$router.push("/controller/" + _this.$route.params.panelType);
          }).catch(err => {
            _this.loading = false;
            _this.$message.error('请求错误');
          });
    },
    createContent: function(data) {
      var _this = this;
      this.loading = true;
      this.$axios.post("/api/createContent", data)
        .then(
          res => {
            var sucData = res.data;
            _this.loading = false;
            _this.$message({
              message: sucData.errMsg,
              type: sucData.msgType
            });
            _this.$router.push("/controller/" + _this.$route.params.panelType);
          }).catch(err => {
            _this.loading = false;
            _this.$message.error('请求错误');
          });
    },
    createProfile: function(data){
      var _this = this;
      this.loading = true;
      this.$axios.post("/api/addProfile", data)
      .then(res => {
        var sucData = res.data;
        _this.loading = false;
        _this.$message({
          message: sucData.errMsg,
          type: sucData.msgType
        });
      }).catch(err => {
        _this.loading = false;
        _this.$message.error('请求错误');
      });
    },
    getProfile: function() {
      var _this = this;
      this.mdEditable = false;
      this.loading = true;
      this.$axios.get("/api/getProfile").then(
        res => {
          var sucData = res.data;
          _this.profileData = sucData;
          _this.contentObj = {title: '', content: _this.profileData.profile};
          _this.loading = false;
        }
      );
    },
    updateProfile: function(data){
      var _this = this;
      this.loading = true;
      this.$axios.post("/api/updateProfile", data)
      .then(res => {
        var sucData = res.data;
        _this.loading = false;
        _this.$message({
          message: sucData.errMsg,
          type: sucData.msgType
        });
        _this.$router.push({
        path: "/controller/" + this.$route.params.panelType,
        query: { opt: "browse" }
      });
      }).catch(err => {
        _this.loading = false;
        _this.$message.error('请求错误');
      });
    }
  },
  watch: {
    $route: function() {
      this.initBtnSeen();
      this.initMarkdownPanel();
      if (this.$route.params.panelType != "profile") {
        this.getContents(this.$route.params.panelType);
      } else {
        // 请求profile的内容
      }
    },
    tableSeen: function() {
      this.markdownSeen = !this.tableSeen;
    }
  }
};
</script>

<style scoped>
#controllerVue {
  height: 100%;
  margin: 0 auto;
  text-align: center;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
}
#controllerVue > .el-row {
  position: relative;
  top: 5%;
  width: 100%;
  height: 86%;
  margin: 0 auto;
}
#controllerWrap {
  background-color: rgba(255, 255, 255, 0.5);
  border: 0;
  border-radius: 4px;
  /* padding: 5px; */
}
#controllerWrap > .el-row {
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
  background-color: rgba(64, 158, 255, 0.8);
  border: 0;
  border-radius: 4px 0 0 0;
}
#avatar {
  width: 80px;
  height: 80px;
  margin-top: 5px;
  display: inline-block;
  vertical-align: middle;
  cursor: pointer;
}
#optNav {
  position: absolute;
  top: 0;
  height: 90px;
  width: 70.8%;
  background-color: rgba(64, 158, 238, 0.8);
  border: 0;
  border-radius: 0 4px 0 0;
}
#backBtn {
  float: left;
}
#optBtn {
  float: right;
  /* margin:30px 30px 0 0; */
}
#optBtn ul li,
#backBtn ul li {
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
  background-color: #eef1f6;
  border: 0;
  border-radius: 0 0 0 4px;
}
.el-menu {
  width: 100%;
  border-right: 0;
}
a {
  text-decoration: none;
  color: #fff;
}
.router-link-active {
  text-decoration: none;
  color: #409eff;
}
</style>

<style>
.el-submenu__title {
  font-size: 18px;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.v-show-content {
  background-color: #ffffff !important;
}
</style>

