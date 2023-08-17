<script setup name="Quota">
import api from '@/api'
import { buildTree } from './js/index'
const ins = getCurrentInstance().proxy
const pageConfig = ref({
  loading: false
})

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
  if (1 || !data.isDir) {
    ins.$router.push({
      name: 'Quota',
      params: {
        id: data.id
      }
    })
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
const routeList = ['Quota']
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
          >
          </el-tree>
        </div>
        <div class="quota-group g-btn"></div>
        <!-- 右侧 -->
        <div class="quota-right">
          <keep-alive :include="['QuotaList']">
            <router-view> </router-view>
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
    display: none;
    position: absolute;
    left: 264px;
    top: 0;
    width: 32px;
    height: 27px;
    background-image: url('res/quota/group.png');
    background-size: 100% 100%;
    z-index: 1;
  }
}
</style>
