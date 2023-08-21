<template>
  <router-view></router-view>
</template>

<script setup name="App">
import { addResizeListener } from './utils/resize'
const baseZoom = 1
const resize = () => {
  const zoom = baseZoom / window.devicePixelRatio
  document.documentElement.style.setProperty('zoom', zoom)
}
onMounted(() => {
  resize()
})
addResizeListener(resize)
</script>

<style lang="scss" scoped></style>
