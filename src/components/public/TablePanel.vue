<template>
  <div id="tablePanelVue" v-if="tableSeen">
    <div id="noContentHint" v-if='mTitles.length == 0'>
      <p>当前还没有内容噢~快去添加新东西吧！</p>
      <p>你应该先点击左边导航栏，“新增”按钮就出现了</p>
    </div>
    <div id="contentTable" v-if="mTitles.length > 0">
      <el-table
      v-loading="loading"
      id="titleTable"
      :data="mTitles"
      tooltip-effect="dark"
      :default-sort = "{prop: 'createTime', order: 'ascending'}"
      @row-click="clickRow"
      @select="selectOne"
      @select-all="selectAll"
      @selection-change="selectionChange"
      @sort-change="sortChange"
      style="width:100%; text-align:left">
        <!-- <el-table-column type="selection" width="55">
        </el-table-column> -->
        <el-table-column label="类型" width="120">
          <template slot-scope="scope">
            <el-tag :type="getTagType(scope.row.contentType)" size="medium">{{ getContentTypeInCn(scope.row.contentType) }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="title" label="标题" sortable show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="createDate" label="发布日期" sortable width="120">
        </el-table-column>
        <el-table-column label="操作" width="120">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
        <el-table-column label="可视" width="120">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.bSeen"
              active-color="#13ce66"
              inactive-color="#ff4949"
              @change="changeSeen(scope.row._id, scope.row.bSeen)"></el-switch>
          </template>
        </el-table-column>
        <!-- <el-table-column prop="title" label="标题" show-overflow-tooltip>
        </el-table-column> -->
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  props:['panelType', 'tableSeen', 'contentTitles'],
  data() {
    return {
      mTitles: [],
      titleObj: {},
      loading: false,
    }
  },
  methods: {
    formatDate: function(timeStamp) {
      var mDate = new Date(timeStamp)
      var year = mDate.getFullYear()
      var month = mDate.getMonth() + 1
      var date = mDate.getDate()
      return year+'-'+month+'-'+date
    },
    getContentTypeInCn: function(contentType){
      switch(contentType) {
        case "articles":
          return "文章"
          break
        case "essays":
          return "随笔"
          break
        case "notes":
          return "笔记"
          break
        default:
          return contentType
          break
      }
    },
    getTagType: function(contentType){
      switch(contentType) {
        case "articles":
          return ""
          break
        case "essays":
          return "success"
          break
        case "notes":
          return "warning"
          break
        default:
          return ""
          break
      }
    },
    clickRow: function(row, event, colume) {
      // console.log(row)
      if(colume.label == "标题"){
        this.titleObj = row
        this.$router.push({path: '/controller/'+this.$route.params.panelType, query:{opt:'browse', objid:this.titleObj.objectId}})
      }
    },
    handleDelete: function(index, row) {
      var _this = this
      this.$confirm('该内容将被彻底删除，是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(()=>{
        _this.loading = true
        _this.$http.post('/api/deleteContent', {objectId: row.objectId}, {emulateJSON:true})
        .then(res => {
          console.log(res.body)
          var sucData = res.body
          _this.loading = false
          _this.$message({
            message: sucData.errMsg,
            type: sucData.msgType
          })
          if(sucData.errCode == 0){
            _this.mTitles.splice(index,1)
          }
        }, err => {
          console.log(err.status)
            _this.loading = false
            _this.$message.error('请求错误：'+err.status)
        })
      }).catch(()=>{})
    },
    changeSeen: function(id, bSeen){
      var _this = this
      this.loading = true
      var postData = {titleId: id, bSeen: bSeen}
      this.$http.post('/api/changeSeen', postData, {emulateJSON:true})
      .then(res => {
        console.log(res.body)
        var sucData = res.body
          _this.loading = false
          _this.$message({
            message: sucData.errMsg,
            type: sucData.msgType
          })
      }, err => {
        console.log(err.status)
        _this.loading = false
        _this.$message.error('请求错误：'+err.status)
      })
    },
    selectOne: function(selection, row){
      console.log('selectOne')
      console.log(selection)
      console.log(row)
      // for(s in selection)
    },
    selectAll: function(selection) {
      console.log('selectAll')
      console.log(selection)
    },
    selectionChange: function(selection) {
      console.log('selectionChange')
      console.log(selection)
    },
    sortChange: function(column, prop, order) {
      console.log(column)
      console.log(prop)
      console.log(order)
      console.log(this.mTitles)
    }
  },
  watch: {
    'contentTitles':function() {
      this.mTitles = this.contentTitles
      for(var t in this.mTitles){
        this.mTitles[t].createDate = this.formatDate(this.mTitles[t].createTime)
      }
    }
  }
}
</script>

<style scoped>
  #tablePanelVue {
    height: auto;
  }
</style>

<style>
  .el-table th {
    cursor: default;
  }
  .el-table tr {
    background-color: #fff;
    cursor: pointer;
  }
</style>



