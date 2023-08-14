<script setup name="App2">
/**
 * @type import('./types').TableConfig
 */
const tableConfig = {
  data:[{
    label:'1',
    name:'a'
  },{
    label:'2',
    name:'b'
  }],
  paging:{
    pageSizes:[5,12,15,20],
    currentPage:2
  }
}
</script>
<template>
  <div>
    <zj-list :table-config="tableConfig"></zj-list>
  </div>  
</template>

<style lang="scss">
* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}
</style>