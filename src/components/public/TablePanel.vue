<template>
  <div id="tablePanelVue" v-if="tableSeen">
    <div id="noContentHint" v-if='contentTitles.length == 0'>
      <p>当前还没有内容噢~快去添加新东西吧！</p>
      <p>你应该先点击左边导航栏，“新增”按钮就出现了</p>
    </div>
    <div id="contentTable" v-if="contentTitles.length">
      <el-table
      id="titleTable"
      :data="contentTitles"
      tooltip-effect="dark"
      :default-sort = "{prop: 'createTime', order: 'ascending'}"
      @row-click="clickRow"
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
      this.titleObj = row
      this.$router.push({path: '/controller/'+this.$route.params.panelType, query:{opt:'browse', objid:this.titleObj.objectId}})
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



