<template>
  <router-view></router-view>
</template>

<script setup name="App">
import { addResizeListener } from './utils/resize';
const resize=()=>{
  const zoom=window.devicePixelRatio/1;
  document.documentElement.style.setProperty('zoom', 1/zoom)
}
addResizeListener(resize)
</script>

<style lang="scss" scoped></style>
