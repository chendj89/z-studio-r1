<template>
  <div class="footer">
    <div class="footer-content">
      <div class="footer-title">联系我们</div>
      <div class="footer-desc">有问题需要反馈？请通过一下方式联系我们</div>
    </div>
  </div>
</template>

<script setup name="Footer"></script>

<style lang="scss" scoped>
.footer {
  background: #454a4e;
  &-content {
    color: #ffffffe6;
    padding: px2rem(93px);
  }
  &-title {
    font-size: 24px;
  }
  &-desc {
    font-size: 16px;
    margin-top: 35px;
  }
}
</style>
