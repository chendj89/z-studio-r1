<script setup name="Home">
import VpFooter from '@/components/vpFooter.vue'
import VpCard from '@/components/vpCard.vue'
import VpSearch from '@/components/vpSearch.vue'
import data from './js/data'
</script>
<template>
  <div class="layout bg">
    <VpSearch></VpSearch>
    <div class="layout-content">
      <div class="grid-title">业务板块</div>
      <div class="grid-content">
        <VpCard
          class="card"
          v-for="(item, index) in data"
          :key="index"
          :data="item"
        ></VpCard>
      </div>
    </div>
    <VpFooter class="layout-footer"></VpFooter>
  </div>
</template>

<style lang="scss" scoped>
.grid {
  &-title {
    font-weight: bold;
    font-size: 32px;
    color: #333333fc;
    letter-spacing: 1px;
    text-align: center;
    margin-bottom: 48px;
    margin-top: 48px;
  }
  &-content {
    display: flex;
    gap: 40px;
    flex-wrap: wrap;
    justify-content: center;
    padding: 20px 0;
    margin-bottom: 240px;
  }
}
</style>
