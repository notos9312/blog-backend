<template>
  <div id="tablePanelVue" v-if="tableSeen">
    <div v-if='true' id="noContentHint">
      <p>当前还没有内容噢~快去添加新东西吧！</p>
      <p>你应该先点击左边导航栏，“新增”按钮就出现了</p>
    </div>
    <div id="contentTable"></div>
  </div>
</template>

<script>
export default {
  props:['panelType', 'tableSeen'],
  // watch: {
  //   panelType: function(newVal, oldVal){
  //     this.$message('old: '+oldVal+', new: '+newVal)
  //   }
  // }
}
</script>

<style scoped>
  #tablePanelVue {
    height: auto;
  }
</style>


