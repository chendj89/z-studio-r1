<script setup name="QuotaList">
import api from '@/api'
import { findElementById } from './js/index'
const ins = getCurrentInstance().proxy
// 接收父元素的数据
const g_tree = inject('g_tree')
/**
 * 表格的数据
 */
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
        // 设置默认值
        default: ins.$route.query.content || '',
        // 输入框去除首尾空格
        trim: true,
        extend: {
          // 可清除
          clearable: true,
          // 绑定事件
          clear: function () {
            pageParams.value.chineseName = ''
            getPage()
          }
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
        name: 'chName',
        extend: {
          'show-overflow-tooltip': true
        }
      },
      {
        label: '英文名称',
        name: 'enName',
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
              ins.$router.push({
                name: 'QuotaDetail',
                params: {
                  id: ins.$route.params.id,
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
        const catalogIds = pageParams.value.catalogIds
        resetPageParams()
        pageParams.value = {
          ...pageParams.value,
          ...params.data,
          catalogIds
        }
        getPage()
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
/**
 * 响应数据
 */
const rZjList = ref(shallowRef(baseZjList))
/**
 * zjList的ref
 */
const zjListRef = ref(null)
/**
 * 获取搜索关键词、目录id
 */
const getPageParams = () => {
  // 关键词
  const content = ins.$route.query?.content || ''
  const id = ins.$route.params.id || ''
  let result = ''
  if (id) {
    result = findElementById(g_tree.value.data, id)
  }
  // 目录id
  let catalogIds = ''
  if (result) {
    catalogIds = result?.ids.join(',')
  }
  return {
    // 目录id
    catalogIds:catalogIds,
    // 搜索关键词
    chineseName: content
  }
}
const oPageParams = {
  chineseName: '',
  currentPage: 1,
  pageSize: 10,
  catalogIds: '',
  orderColumn: 'createTime',
  order: 'asc',
  ...getPageParams()
}
const resetPageParams = () => {
  pageParams.value = {
    ...oPageParams
  }
}
/**
 * 响应参数
 */
const pageParams = ref(shallowRef(oPageParams))
/**
 * 获取表格数据
 */
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
          if (res.code == 200) {
            zjListRef.value.tableData = res.data.records
            zjListRef.value.total = res.data.total
          } else {
            zjListRef.value.tableData = []
            zjListRef.value.total = 0
            ins.$message({
              type: 'error',
              message: res.msg
            })
          }
        })
        .finally(() => {
          zjListRef.value.tableLoading = false
          resolve(true)
        })
    }
  })
}

onMounted(() => {
  getPage()
})
</script>
<template>
  <zj-list
    class="quota-zjlist"
    ref="zjListRef"
    :search-config="rZjList.searchConfig"
    :table-config="rZjList.tableConfig"
  >
  </zj-list>
</template>
<style lang="scss" scoped>
$radius: 4px;
.quota {
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
