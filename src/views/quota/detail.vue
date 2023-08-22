<template>
  <div>
    <el-button
      class="quotaDetail-back"
      type="primary"
      size="small"
      plain
      icon="el-icon-arrow-left"
      @click="goBack"
      >返回</el-button
    >
    <div class="quotaDetail-title">
      <img
        class="quotaDetail-title-icon"
        :src="frame"
        alt=""
      />
      <div class="quotaDetail-title-name">{{ pageInfo.path.join('-') }}</div>
    </div>
    <div class="quotaDetail-info" v-loading="pageConfig.loading">
      <div class="quotaDetail-info-title">指标信息</div>
      <div class="quotaDetail-info-list">
        <div
          class="quotaDetail-info-list-item"
          v-for="(item, value, index) in pageInfo.info"
          :key="index"
        >
          <div class="quotaDetail-info-list-key">{{ item.key }}：</div>
          <div class="quotaDetail-info-list-value">{{ item.value }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup name="QuotaDetail">
import api from '@/api'
const ins = getCurrentInstance().proxy
import frame from '@/assets/res/quota/frame.png'

const pageConfig = ref({
  loading: false
})

const pageInfo = ref({
  info: {
    chineseName: {
      key: '指标名称',
      value: ''
    },
    englishName: {
      key: '英文名称',
      value: ''
    },
    domainCode: {
      key: '指标编码',
      value: ''
    },
    abbreviation: {
      key: '来源系统',
      value: ''
    },
    description: {
      key: '业务含义',
      value: ''
    }
  },
  path: []
})
const getPageInfo = () => {
  if (!pageConfig.value.loading) {
    pageConfig.value.loading = true
    return new Promise((resolve) => {
      ins
        .$post({
          url: api.getPageInfoByDomainId,
          data: {
            domainId: ins.$route.params.name || ''
          }
        })
        .then((res) => {
          for (let attr in pageInfo.value.info) {
            pageInfo.value.info[attr].value = res.data ? res.data[attr] : ''
          }
          // 只截取最后2位
          pageInfo.value.path = res.data ? res.data.path.slice(-2) : []
        })
        .finally(() => {
          resolve(true)
          pageConfig.value.loading = false
        })
    })
  }
}
const goBack = () => {
  ins.$router.push({
    name: 'Quota',
    params: {
      id: ins.$route.params.id,
    }
  })
}
onMounted(() => {
  getPageInfo()
})
</script>

<style lang="scss" scoped>
$radius: 4px;

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
    align-items: center;
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
      }
    }
  }
}
</style>
