<template>
  <div id="markdownPanelVue" v-if="markdownSeen">
    <div id="title" style="text-align:left; padding-bottom: 10px;">
      <el-input
        v-model="titleData"
        :autofocus="titleData.length > 0"
        :disabled="!editable"
        :required="true"
        style="width:100%;"
        id="titleText"
        placeholder="请输入标题"></el-input>
    </div>
    <mavon-editor
      v-model="mdData"
      :toolbarsFlag="toolbarsFlag"
      :subfield="false"
      :default_open="default_open"
      :toolbars="toolbarsObj"
      :editable="isEdit"
      @subfieldtoggle="subfieldtoggle"
      ref="md"> </mavon-editor>
  </div>
</template>

<script>
export default {
  props: ['panelType', 'markdownSeen', 'contentObj', 'editable'],
  data() {
    return {
      titleData: this.contentObj.title,
      mdData: this.contentObj.content,
      isEdit: this.editable,
      toolbarsFlag: false,
      subfield: false,
      default_open: 'preview',
      toolbarsObj: {
        bold: false, // 粗体
        italic: false, // 斜体
        header: false, // 标题
        underline: false, // 下划线
        strikethrough: false, // 中划线
        mark: false, // 标记
        superscript: false, // 上角标
        subscript: false, // 下角标
        quote: false, // 引用
        ol: false, // 有序列表
        ul: false, // 无序列表
        link: true, // 链接
        imagelink: true, // 图片链接
        code: false, // code
        table: true, // 表格
        fullscreen: true, // 全屏编辑
        readmodel: false, // 沉浸式阅读
        htmlcode: false, // 展示html源码
        help: true, // 帮助
        undo: false, // 上一步
        redo: false, // 下一步
        trash: true, // 清空
        save: false, // 保存（触发events中的save事件）
        navigation: true, // 导航目录
        alignleft: false, // 左对齐
        aligncenter: false, // 居中
        alignright: false, // 右对齐
        subfield: true, // 单双栏模式
        preview: true, // 预览
      },
    }
  },
  methods:{
    subfieldtoggle: function(status, value) {
      console.log('status:'+status)
      if(!status) {
        this.default_open = 'edit'
        this.isEdit = true
        console.log('default_open:'+this.default_open+', status:'+status)
        this.$refs.md.$refs.toolbar_right.$clicks('preview')
      }
    }
  },
  watch: {
    'contentObj': function(){
      this.titleData = this.contentObj.title
      this.mdData = this.contentObj.content
    },
    'editable': function() {
      this.isEdit = this.editable
      console.log('watch editable: '+this.editable)
    },
    'isEdit': function() {
      console.log('watch isEdit: '+this.isEdit)
      if(this.isEdit) {
        this.toolbarsFlag = true
        // this.subfield = true
        this.default_open = 'edit'
        console.log('subfield: '+this.subfield)
        // this.$refs.md.$refs.toolbar_right.$clicks('subfield')
      } else {
        this.toolbarsFlag = false
        // this.subfield = false
        this.default_open = 'preview'
      }
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



