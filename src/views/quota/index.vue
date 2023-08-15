<template>
  <div class="quota bg">
    <div class="quota-content">
      <!-- 左侧 -->
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
const ins = getCurrentInstance().proxy

/**** 左侧菜单 ****/
import { changeTreeNodeStatus } from '@/utils/tree'
const rTree = ref(null)
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
            },
            {
              label: '三级 1-1-2'
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
const groupHandle = () => {
  changeTreeNodeStatus(rTree.value.root, tree.value.expand)
  tree.value.expand = !tree.value.expand
}

/**** 添加滚动 ****/
import { addResizeListener } from '@/utils/resize'
import { getCurrentInstance, onMounted } from 'vue'
const rScrollbar = ref(null)
addResizeListener(() => {
  rScrollbar.value?.update()
})
/**** 表格 ****/

const baseZjList = {
  searchConfig: {
    'label-width': '100px',
    'label-position': 'right',
    data: [
      {
        label: '指标名称',
        name: '',
        type: 'input',
        span: 8
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
        name: 'a1'
      },
      {
        label: '指标名称',
        name: 'a2'
      },
      {
        label: '英文名称',
        name: 'a3'
      },
      {
        label: '操作',
        name: '',
        type: 'operation',
        data: [
          {
            label: '查看',
            name: 'opLook',
            callback: (...args) => {
              ins.$router.push({
                name: 'QuotaDetail',
                params:{
                  name:'1'
                }
              })
            }
          }
        ]
      }
    ]
  }
}
const rZjList = ref(baseZjList)
const zjListRef = ref(null)
onMounted(() => {
  zjListRef.value.tableData = new Array(6).fill({
    a1: 'ZJ3489843940',
    a2: '充填电力单耗',
    a3: 'Unit consumption of filling power'
  })
})
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
    background-color: #fff;
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
