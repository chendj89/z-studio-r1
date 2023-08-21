<template>
  <router-view></router-view>
</template>

<script setup name="App">
import { onMounted } from 'vue'
import { addResizeListener } from './utils/resize'
const baseZoom = 1
const resize = () => {
  const zoom = window.devicePixelRatio / baseZoom
  document.documentElement.style.setProperty('zoom', baseZoom / zoom)
  localStorage.setItem('zoom', zoom)
}
onMounted(() => {
  const localZoom = localStorage.getItem('zoom')
  if (localZoom) {
    document.documentElement.style.setProperty('zoom', baseZoom / localZoom)
  }else {
    document.documentElement.style.setProperty('zoom', window.devicePixelRatio/baseZoom)
  }
})
addResizeListener(resize)
</script>

<style lang="scss" scoped></style>
