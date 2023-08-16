<template>
  <div class="card" v-if="data">
    <div class="card-title">
      <img class="card-title-icon" :src="data.icon.default" alt="" />
      <img
        class="card-title-icon card-title-icon2"
        :src="data.icon.hover"
        alt=""
      />
      <div class="card-title-name">{{ data.name }}</div>
    </div>
    <div class="card-content">
      <div
        class="card-content-item"
        v-for="item in data.children"
        :key="item.title"
      >
        <div class="card-content-value">
          <div class="card-content-label">{{ item.title }}</div>
          {{ item.content }}
        </div>
      </div>
    </div>
    <div class="card-footer">
      <div class="card-footer-btn" @click="btn">{{ data.href.name }}</div>
    </div>
  </div>
</template>

<script setup name="VpCard">
const props = defineProps({
  data: {
    type: Object,
    default: null
  }
})
const ins = getCurrentInstance().proxy
const btn = () => {
  ins.$router.push({ name: 'Quota',params:{id:props.data.id} })
}
</script>

<style lang="scss" scoped>
.card {
  @include flexColumn();
  width: 300px;
  height: 470px;
  background: #ffffff;
  box-shadow: 0 0 22px 0 #00000005;
  border-radius: 20px;
  padding: 34px;
  color: #333333;
  transition: all 0.25s;
  &:hover {
    background-color: var(--r1-theme);
    color: #fff8faff;
  }
  &-title {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    &-icon {
      width: 64px;
      height: 64px;
    }
    &-icon2 {
      display: none;
    }
    &-name {
      margin-left: 16px;
      font-size: 16px;

      font-weight: bold;
    }
  }
  &:hover &-title-icon {
    display: none;
  }
  &:hover &-title-icon2 {
    display: block;
  }
  &-content {
    flex: 1;
    &-item {
      line-height: 24px;
      margin-bottom: 10px;
    }
    &-label {
      display: inline-block;
      font-size: 14px;
      font-weight: bold;
    }
  }
  &-footer {
    &-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 128px;
      height: 48px;
      background-image: linear-gradient(
        110deg,
        #66a5ff 0%,
        #4b7cf3 100%,
        #4b7cf3 100%
      );
      box-shadow: 0 17px 30px -8px #4b7cf366;
      border-radius: 24px;
      color: #fff;
      cursor: pointer;
      transition: all 0.25s;
    }
  }
  &:hover &-footer-btn {
    background: #fff;
    color: var(--r1-theme);
  }
}
</style>
