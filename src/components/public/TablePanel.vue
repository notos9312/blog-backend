<template>
  <div id="tablePanelVue" v-if="tableSeen">
    <p>{{'TablePanel - panelType: '+panelType}}</p>
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


