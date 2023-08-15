<template>
  <div class="quota bg">
    <div class="quota-content">
      <div class="quota-left">
        <el-scrollbar ref="rScrollbar" class="quota-scroll">
          <el-tree
            ref="rTree"
            :data="tree.data"
            :props="tree.defaultProps"
            :expand-on-click-node="false"
            class="quota-tree"
          >
          </el-tree>
        </el-scrollbar>
        <div class="quota-group g-btn" @click="groupHandle"></div>
      </div>
      <div class="quota-right"></div>
    </div>
  </div>
</template>

<script setup name="Quota">
import { onBeforeUnmount, onMounted } from 'vue'

const tree = ref({
  data: [
    {
      label: '一级 1',
      children: [
        {
          label: '二级 1-1',
          children: [
            {
              label: '三级 1-1-1'
            }
          ]
        }
      ]
    }
  ],
  defaultProps: {
    children: 'children',
    label: 'label'
  },
  expand: true
})
const rTree = ref(null)

const groupHandle = () => {
  changeTreeNodeStatus(rTree.value.root, tree.value.expand)
  tree.value.expand = !tree.value.expand
}
function changeTreeNodeStatus(node, status) {
  node.expanded = status
  for (let i = 0; i < node.childNodes.length; i++) {
    node.childNodes[i].expanded = status
    if (node.childNodes[i].childNodes.length > 0) {
      changeTreeNodeStatus(node.childNodes[i], status)
    }
  }
}
const rScrollbar = ref(null)
const resize = () => {
  rScrollbar.value?.update()
}
onMounted(() => {
  window.addEventListener('resize', resize)
})
onBeforeUnmount(() => {
  window.removeEventListener('resize', resize)
})
</script>

<style lang="scss" scoped>
.quota {
  $radius: 4px;
  height: 100%;
  padding-top: 16px;
  &-scroll {
    height: 100%;
  }
  &-tree {
    border-radius: $radius;
    // 过滤子节点
    &::v-deep(.el-icon-caret-right):not(.is-leaf) {
      font-size: 18px;
      color: var(--r1-theme);
      & + .el-tree-node__label {
        color: var(--r1-theme);
      }
    }
  }
  &-group {
    position: absolute;
    right: -32px;
    top: 0;
    width: 32px;
    height: 27px;
    background-image: url('/res/quota/group.png');
    background-size: 100% 100%;
    z-index: 1;
  }
  &-content {
    display: flex;
    gap: 16px;
    height: 100%;
  }
  &-left {
    position: relative;
    width: 264px;
    margin-left: 16px;
    background-color: #fff;
  }
  &-right {
    position: relative;
    flex: 1;
  }
}
</style>
