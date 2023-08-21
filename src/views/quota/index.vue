<script setup name="Quota">
import api from '@/api'
import { buildTree } from './js/index'
const ins = getCurrentInstance().proxy
const pageConfig = ref({
  loading: false
})
const id = ref(0)

/**** 左侧菜单 ****/
import { changeTreeNodeStatus, findTreeNodeById } from '@/utils/tree'
import { onMounted } from 'vue'
const rTree = ref(null)
const tree = ref({
  data: [],
  defaultProps: {
    children: 'children',
    label: 'name'
  },
  expand: true
})
const groupHandle = () => {
  changeTreeNodeStatus(rTree.value.root, tree.value.expand)
  tree.value.expand = !tree.value.expand
}
const nodeClick = (data, node, that) => {
  // 如果已是当前路由 那么不更新
  if (ins.$route.params.id == data.id) {
    return
  }
  id.value++
  ins.$router.push({
    name: 'Quota',
    params: {
      id: data.id,
      reload: true
    }
  })
}
const renderContent = (h, { node, data, store }) => {
  if (node.data && node.data.isDir) {
    return h('div', { class: 'quota-tree-item' }, [
      h('span', { class: 'quota-tree-floder' }),
      h('span', null, node.label)
    ])
  } else {
    return h('div', { class: 'quota-tree-item' }, [h('span', null, node.label)])
  }
}
/**
 * 数据管理左边树
 */
const catalogManageHandler = () => {
  return new Promise((resolve) => {
    if (!pageConfig.value.loading) {
      pageConfig.value.loading = true
      ins
        .$post({
          url: api.catalogManage
        })
        .then((res) => {
          if (res.data) {
            tree.value.data = res.data.map((item) => {
              return {
                id: item.id,
                name: item.name,
                isDir: true,
                children: buildTree(item.dataAssetsCatalogVos)
              }
            })
            if (ins.$route.params.id) {
              nextTick(() => {
                let result = findTreeNodeById(
                  rTree.value.root,
                  ins.$route.params.id
                )
                if (result && result.length) {
                  for (let i = result.length - 1; i > 0; i--) {
                    if (result[i].isDir) {
                      result[i].expanded = true
                      break
                    } else {
                      if (i == result.length - 1) {
                        changeTreeNodeStatus(result[i], true)
                        if (result[i].data) {
                          rTree.value.setCurrentKey(result[i].data.id)
                        }
                      } else {
                        result[i].expanded = true
                      }
                    }
                  }
                }
              })
            }
          } else {
          }

          resolve(true)
        })
        .finally(() => {
          pageConfig.value.loading = false
        })
    }
  })
}

onMounted(() => {
  catalogManageHandler()
})
</script>
<template>
  <div class="layout">
    <div class="quota bg">
      <div class="quota-content">
        <!-- 左侧 -->
        <div class="quota-left" v-loading="pageConfig.loading">
          <el-tree
            ref="rTree"
            :data="tree.data"
            :props="tree.defaultProps"
            :expand-on-click-node="false"
            highlight-current
            class="quota-tree"
            @node-click="nodeClick"
            node-key="id"
            :render-content="renderContent"
          >
          </el-tree>
        </div>
        <div class="quota-group g-btn" @click="groupHandle"></div>
        <!-- 右侧 -->
        <div class="quota-right">
          <keep-alive :include="['QuotaList']">
            <router-view :key="id"></router-view>
          </keep-alive>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.quota {
  $radius: 4px;
  height: 100%;
  padding: 16px;
  &-content {
    position: relative;
    display: flex;
    gap: 16px;
    height: 100%;
  }
  &-left {
    position: relative;
    width: 264px;
    min-width: 264px;
    background-color: #fff;
    overflow-y: auto;
  }
  &-right {
    position: relative;
    flex: 1;
  }
  &-tree {
    width: 100%;
    border-radius: $radius;
    font-size: 14px;
    // 过滤子节点
    &::v-deep(.el-icon-caret-right):not(.is-leaf) {
      font-size: 18px;
      color: #606266;
      & + .el-tree-node__label {
        color: var(--ZjColorPrimary);
      }
    }
    &::v-deep() &-item {
      display: flex;
      align-items: center;
    }
    &::v-deep &-floder {
      display: inline-block;
      width: 18px;
      height: 18px;
      margin-right: 6px;
      background-image: url('@/assets/res/quota/folderclose.png');
      background-size: 100% 100%;
      transform: rotate(0) !important;
    }
    &::v-deep .is-expanded &-floder {
      background-image: url('@/assets/res/quota/folderopen.png');
    }
    &::v-deep .el-tree-node.is-current > .el-tree-node__content {
      background-color: #e5f3ff;
      color: var(--ZjColorPrimary);
      .el-icon-caret-right:not(.is-leaf) {
        color: var(--ZjColorPrimary);
      }
    }
  }
  &-group {
    position: absolute;
    left: 264px;
    top: 0;
    width: 32px;
    height: 27px;
    background-image: url('@/assets/res/quota/group.png');
    background-size: 100% 100%;
    z-index: 1;
  }
}
</style>
