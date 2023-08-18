<template>
  <router-view></router-view>
</template>

<script setup name="App">
import { onMounted } from 'vue'
import { addResizeListener } from './utils/resize'
const resize = () => {
  const zoom = window.devicePixelRatio / 1
  document.documentElement.style.setProperty('zoom', 1 / zoom)
  localStorage.setItem('zoom', zoom)
}
onMounted(() => {
  const localZoom = localStorage.getItem('zoom')
  if (localZoom) {
    document.documentElement.style.setProperty('zoom', 1 / localZoom)
  }
})
addResizeListener(resize)
</script>

<style lang="scss" scoped></style>
