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
      style="width:100%; text-align:center">
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column prop="createDate" label="日期" width="120">
        </el-table-column>
        <el-table-column prop="title" label="标题" show-overflow-tooltip>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  props:['panelType', 'tableSeen', 'contentTitles'],
  data() {
    return {
      mTitles: []
    }
  },
  methods: {
    formatDate: function(timeStamp) {
      var mDate = new Date(timeStamp)
      var year = mDate.getFullYear()
      var month = mDate.getMonth() + 1
      var date = mDate.getDate()
      return year+'-'+month+'-'+date
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
    text-align: center;
    cursor: default;
  }
  .el-table tr {
    background-color: #fff;
    cursor: pointer;
  }
</style>



