<template>
  <div id="tablePanelVue">
    <span>{{'panelType: '+panelType}}</span>
  </div>
</template>

<script>
export default {
  props:['panelType'],
  watch: {
    panelType: function(newVal, oldVal){
      this.$message('old: '+oldVal+', new: '+newVal)
    }
  }
}
</script>

