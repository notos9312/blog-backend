<template>
  <div id="tablePanelVue">
    <p>{{'panelType: '+panelType}}</p>
  </div>
</template>

<script>
export default {
  props:['panelType'],
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


