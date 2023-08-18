<script setup name="QuotaList">
import { onBeforeUnmount, onMounted, watch } from 'vue'
import api from '@/api'
// import { addResizeListener } from '@/utils/resize'
// addResizeListener(() => {
//   zjListRef.value.doLayout()
// })
const ins = getCurrentInstance().proxy
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
        default: ins.$route.query.content || '',
        trim: true,
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
const rZjList = ref(baseZjList)
const zjListRef = ref(null)

const unWatch = watch(
  () => ins.$route,
  (to, from) => {
    if (to.name == 'Quota' && to.params.reload) {
      zjListRef.value.searchParams=ref({
        chineseName:''
      })
      pageParams.value.chineseName=""
      init(to.params.id)
    }
  }
)

onBeforeUnmount(() => {
  // 在组件卸载前停止监听
  unWatch()
})

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
const initTableList = () => {
  zjListRef.value.tableData = []
  zjListRef.value.total = 0
}
const pageParams = ref(oPageParams)
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

const init = (id) => {
  if (id) {
    getFoldIdByCatalogId(id)
  } else {
    getPage()
  }
}
onMounted(() => {
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
