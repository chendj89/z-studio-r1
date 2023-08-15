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
        <el-button
          class="quotaDetail-back"
          type="primary"
          size="small"
          plain
          icon="el-icon-arrow-left"
          >返回</el-button
        >
        <div class="quotaDetail-title">
          <img
            class="quotaDetail-title-icon"
            src="/res/quota/frame.png"
            alt=""
          />
          <div class="quotaDetail-title-name">地采-采矿量</div>
        </div>
        <div class="quotaDetail-info">
          <div class="quotaDetail-info-title">指标信息</div>
          <div class="quotaDetail-info-list">
            <div
              class="quotaDetail-info-list-item"
              v-for="(item,index) in info"
              :key="index"
            >
              <div class="quotaDetail-info-list-key">{{ item.key }}</div>
              <div class="quotaDetail-info-list-value">{{ item.value }}</div>
            </div>
          </div>
        </div>
        <zj-list
          class="quota-zjlist"
          ref="zjListRef"
          :table-config="rZjList.tableConfig"
        >
        </zj-list>
      </div>
    </div>
  </div>
</template>

<script setup name="QuotaDetail">
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
import { onMounted } from 'vue'
const rScrollbar = ref(null)
addResizeListener(() => {
  rScrollbar.value?.update()
})
/**** 表格 ****/

const baseZjList = {
  tableConfig: {
    title: '指标信息',
    selection: false,
    data: [
      {
        label: '应用类型',
        name: 'a1'
      },
      {
        label: '路径',
        name: 'a2'
      },
      {
        label: '报表类型',
        name: 'a3'
      },
      {
        label: '操作',
        name: '',
        type: 'operation',
        data: [
          {
            label: '查看',
            name: 'opLook'
          }
        ]
      }
    ],
    paging: false,
    height:'190px'
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

const info = [
  {
    key: '业务含义：',
    value:
      '已完成采矿的最后生产过程，从采矿场掌子面爆破（或冲采、挖掘）下来的包括不能分采、分出，又不能剔除的连带崩落的围岩、夹石、表土和其他矿石（如铜矿中的硫铁矿）在内的总量。根据选别的元素或采矿矿区的不同，可以再进一步将采矿量细分到相应品种。（不包括副产矿）'
  },
  {
    key: '业务含义：',
    value: 'Ug ore mined'
  },
  {
    key: '生产部门：',
    value: '事业部'
  },
  {
    key: '来源系统：',
    value: '智能'
  }
]
</script>

<style lang="scss" scoped>
$radius: 4px;
.quota {
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
    top: 100px;
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
.quotaDetail {
  &-back {
    margin-top: 16px;
    margin-bottom: 16px;
    margin-left: 16px;
  }
  &-title {
    display: flex;
    gap: 18px;
    margin-left: 16px;
    margin-bottom: 32px;
    &-icon {
      display: block;
      width: 64px;
      height: 64px;
    }
    &-name {
      color: #303133;
      font-size: 16px;
      font-weight: bold;
      line-height: 24px;
    }
  }
  &-info {
    background-color: #fff;
    border-radius: $radius;
    padding: 16px;
    &-title {
      color: #303133;
      font-size: 16px;
      font-weight: bold;
      line-height: 24px;
      margin-bottom: 16px;
    }
    &-list {
      color: #606266;
      font-size: 14px;
      &-item {
        margin-bottom: 16px;
        display: flex;
        &:last-child {
          margin-bottom: 0;
        }
      }
      &-key {
        width: 70px;
        max-width: 70px;
      }
      &-value {
        flex: 1;
        margin-left: 16px;
      }
    }
  }
}
</style>
