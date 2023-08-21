<script setup name="VpSearch">
const ins = getCurrentInstance().proxy
const content = ref('')
const search = () => {
  let str = content.value.trim()
  if (content.value.trim()) {
    if (/[!@#$%^&*(),.?":{}|<>]/.test(str)) {
      ins.$message({
        type: 'warning',
        message: '暂不支持特殊符号搜索'
      })
      return
    }
    ins.$router.push({
      name: 'Quota',
      query: {
        content: str
      }
    })
  } else {
    ins.$message({
      type: 'error',
      message: '请输入关键词'
    })
  }
}
</script>
<template>
  <div class="vpSearch">
    <div class="vpSearch-content">
      <input
        v-model="content"
        placeholder="搜索资产名称"
        class="vpSearch-content-input"
        @keyup.enter="search"
      />
      <div @click="search" class="vpSearch-content-btn g-btn">搜索</div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.vpSearch {
  position: relative;
  display: block;
  width: 100%;
  height: 401px;
  min-height: 401px;
  background-image: url('@/assets/res/home/3d.png');
  background-size: 1920px 401px;
  background-position: center center;
  background-repeat: no-repeat;
  background-attachment: local;
  &-content {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    &-input {
      width: 773px;
      height: 58px;
      background: #ffffff;
      box-shadow: 0 4px 8px 0 #0d1c400a;
      border-radius: 8px;
      outline: none;
      border: none;
      padding: 16px;
      font-size: 16px;
      &::placeholder {
        color: #c0c0c0fc;
      }
    }
    &-btn {
      position: absolute;
      right: 16px;
      top: 8px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 84px;
      height: 42px;
      background: var(--r1-theme);
      border-radius: 8px;
      color: #fff;
      cursor: pointer;
    }
  }
}
</style>
