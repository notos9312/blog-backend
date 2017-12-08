<template>
  <div id="markdownPanelVue" v-if="markdownSeen">
    <div id="title" style="text-align:left; padding-bottom: 10px;">
      <el-input style="width:100%;" id="titleText" placeholder="请输入标题"></el-input>
    </div>
    <mavon-editor
      v-model="mdData"
      :toolbarsFlag="toolbarsFlag"
      :subfield="subfield"
      :default_open="default_open"
      ref="md"> </mavon-editor>
  </div>
</template>

<script>
export default {
  props: ['panelType', 'markdownSeen', 'value', 'toolbarsFlag', 'subfield', 'default_open'],
  data() {
    return {
      mdData: this.value,
      toolBarsSeen: fasle,
    }
  },
  watch: {
    'value': function(){
      this.mdData = this.value
    },
    'toolbarsFlag': function(){
      this.toolBarsSeen = this.toolbarsFlag
    }
  }
}
</script>

<style scoped>
  #markdownPanelVue{
    height: auto;
  }
  .el-tag {
    background-color: rgba(64,158,255,.8);
    padding: 0 10px;
    height: 32px;
    line-height: 30px;
    font-size: 12px;
    color: #FFF;
    border-radius: 4px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    border: 1px solid rgba(64,158,255,.2);
}
</style>

<style>
  .v-note-show {
    text-align: left;
  }
</style>



