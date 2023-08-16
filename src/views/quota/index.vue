<template>
  <div class="quota bg">
    <div class="quota-content">
      <!-- 左侧 -->
      <div class="quota-left" v-loading="config.leftLoading">
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
        <div class="quota-group g-btn" @click="groupHandle"></div>
      </div>
      <!-- 右侧 -->
      <div class="quota-right">
        <zj-list
          class="quota-zjlist"
          ref="zjListRef"
          :search-config="rZjList.searchConfig"
          :table-config="rZjList.tableConfig"
        >
        </zj-list>
      </div>
    </div>
  </div>
</template>

<script setup name="Quota">
import api from '@/api'
import { buildTree } from './js/index'
const ins = getCurrentInstance().proxy

/**** 左侧菜单 ****/
import { changeTreeNodeStatus } from '@/utils/tree'
import { readonly, toRaw } from 'vue'
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
  console.log(data.id)
  getFoldIdByCatalogId(data.id)
}

/**** 表格 ****/

const baseZjList = {
  searchConfig: {
    'label-width': '100px',
    'label-position': 'right',
    data: [
      {
        label: '指标名称',
        name: 'chineseName',
        type: 'input',
        span: 8,
        extend: {
          clearable: true
        }
      }
    ],
    buttonSpan: 16,
    button: {
      align: 'right'
    },
    buttonTextShow: true
  },
  tableConfig: {
    title: '指标信息',
    selection: false,
    data: [
      {
        label: '指标编码',
        name: 'domainCode',
        extend: {
          'show-overflow-tooltip': true
        }
      },
      {
        label: '指标名称',
        name: 'chineseName',
        extend: {
          'show-overflow-tooltip': true
        }
      },
      {
        label: '英文名称',
        name: 'englishName',
        extend: {
          'show-overflow-tooltip': true
        }
      },
      {
        label: '操作',
        name: '',
        type: 'operation',
        data: [
          {
            label: '查看',
            name: 'opLook',
            callback: (data) => {
              console.log(data)
              ins.$router.push({
                name: 'QuotaDetail',
                params: {
                  name: data.domainId
                }
              })
            }
          }
        ]
      }
    ],
    http: {
      url: '/',
      onBefore: (params) => {
        // 重置
        if (Object.keys(params.data).length === 0) {
          resetPageParams()
          getPage()
        } else {
          // 查询
          pageParams.value = {
            ...pageParams.value,
            ...params.data
          }
          getPage()
        }
        return false
      }
    },
    onPageSize: (data) => {
      pageParams.value.currentPage = data.currentPage
      pageParams.value.pageSize = data.pageSize
      getPage()
    },
    onCurrentPage: (data) => {
      pageParams.value.currentPage = data.currentPage
      pageParams.value.pageSize = data.pageSize
      getPage()
    }
  }
}
const rZjList = ref(baseZjList)
const zjListRef = ref(null)
onMounted(() => {
  init()
})

const config = ref({
  /**
   * 左侧菜单加载器
   */
  leftLoading: false,
  /**
   * 临时加载器
   */
  CatalogIdLoading: false,
  /**
   * 表格加载器
   */
  folderIdLoading: false
})
const pageData = ref({
  folderId: ''
})

/**
 * 数据管理左边树
 */
const catalogManageHandler = () => {
  return new Promise((resolve) => {
    if (!config.value.leftLoading) {
      config.value.leftLoading = true
      ins
        .$post({
          url: api.catalogManage
        })
        .then((res) => {
          useSafeData(res, { default: [] }).then(({ data, status }) => {
            tree.value.data = data.map((item) => {
              return {
                id: item.id,
                name: item.name,
                children: buildTree(item.dataAssetsCatalogVos)
              }
            })
            resolve(status)
          })
        })
        .finally(() => {
          config.value.leftLoading = false
        })
    }
  })
}

const getFoldIdByCatalogId = (catalogId) => {
  return new Promise((resolve) => {
    if (!zjListRef.value.tableLoading) {
      zjListRef.value.tableLoading = true
      ins
        .$get({
          url: api.getFoldIdByCatalogId,
          data: {
            catalogId
          }
        })
        .then((res) => {
          useSafeData(res, { default: '' }).then(async ({ data, status }) => {
            zjListRef.value.tableLoading = false
            if (status) {
              pageParams.value.folderId = data
              getPage()
            } else {
              zjListRef.value.tableData = []
              zjListRef.value.total = 0
              zjListRef.value.currentPage = 1
              pageParams.value.currentPage = 1
            }
          })
        })
        .finally(() => {
          resolve(true)
        })
    }
  })
}

const oPageParams = {
  chineseName: '',
  folderId: '',
  currentPage: 1,
  pageSize: 10
}
const pageParams = ref(oPageParams)
const resetPageParams = () => {
  pageParams.value = {
    chineseName: '',
    folderId: '',
    currentPage: 1,
    pageSize: 10
  }
}
const getPage = () => {
  return new Promise((resolve) => {
    if (!zjListRef.value.tableLoading) {
      zjListRef.value.tableLoading = true
      ins
        .$post({
          url: api.getPageByFolderId,
          data: pageParams.value
        })
        .then((res) => {
          useSafeData(res, { default: [] }).then(({ data, status }) => {
            zjListRef.value.tableData = data.content
            zjListRef.value.total = data.totalItems
          })
        })
        .finally(() => {
          zjListRef.value.tableLoading = false
          resolve(true)
        })
    }
  })
}

const init = async () => {
  await catalogManageHandler()
  // zjListRef.value.tableLoading = true
}
</script>

<style lang="scss" scoped>
.quota {
  $radius: 4px;
  height: 100%;
  padding: 16px;
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
    min-width: 264px;
    background-color: #fff;
    overflow-y: auto;
    overflow-x: hidden;
  }
  &-right {
    position: relative;
    flex: 1;
  }
  &-zjlist {
    &::v-deep(.zj-list-search) {
      background-color: #fff;
      padding: 16px 16px 0 16px;
      border-radius: $radius;
    }
    &::v-deep(.zj-table-box) {
      background-color: #fff;
      padding: 16px;
      border-radius: $radius;
    }
    &::v-deep(.zj-table-head) {
      color: #303133;
      font-size: 16px;
      line-height: 24px;
      margin-bottom: 16px;
      font-weight: bold;
    }
  }
}
</style>
