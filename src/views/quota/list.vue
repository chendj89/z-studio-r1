<script setup name="QuotaList">
import api from '@/api'
import { shallowRef } from 'vue'
const ins = getCurrentInstance().proxy
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
        const folderId = pageParams.value.folderId
        resetPageParams()
        pageParams.value = {
          ...pageParams.value,
          ...params.data,
          folderId
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
 * 根据目录id获取指定code
 * @param {*} catalogId
 */
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
          zjListRef.value.tableLoading = false
          if (res.code == 200) {
            pageParams.value.folderId = res.data
            getPage()
          } else {
            // 如果数据有问题，那么重置表格
            initTableList()
          }
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
const resetPageParams = () => {
  pageParams.value = {
    chineseName: '',
    folderId: '',
    currentPage: 1,
    pageSize: 10
  }
}
/**
 * 重置表格
 */
const initTableList = () => {
  zjListRef.value.tableData = []
  zjListRef.value.total = 0
}
/**
 * 响应参数
 */
const pageParams = ref(oPageParams)
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
          useSafeData(res, { default: { content: [], totalItems: 0 } }).then(
            ({ data, hasError }) => {
              zjListRef.value.tableData = data.content
              zjListRef.value.total = data.totalItems
              if (hasError) {
                ins.$message({
                  type: 'error',
                  message: res.msg
                })
              }
            }
          )
        })
        .finally(() => {
          zjListRef.value.tableLoading = false
          resolve(true)
        })
    }
  })
}

/**
 * 初始化
 * @param {*} id
 */
const init = (id) => {
  // 如果有id时，需要获取code
  if (id) {
    getFoldIdByCatalogId(id)
  } else {
    // 否则获取全部
    getPage()
  }
}
onMounted(() => {
  // 判断目录id和搜索关键词
  const id = ins.$route.params.id || ''
  const content = ins.$route.query?.content || ''
  pageParams.value.chineseName = content
  init(id)
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
