/**
 * 数据资产(新门户)
 *  @link http://172.22.26.249:9300/project/47/interface/api/cat_1238
 *  @param {*} header.token
 *  @param {*} header.Cookie
 */

/**
 * 数据管理左边树
 */
export const catalogManage = '/datablau-cloud/dam/service/ddc/catalog/manage'

/**
 * 指标-获取指标目录id
 * @param catalogId
 */
export const getFoldIdByCatalogId = '/datablau-cloud/dam/getFoldIdByCatalogId'

/**
 * 获取指标列表
 * @param folderId
 */
export const getPageByFolderId = '/datablau-cloud/domain/domains/domain/getPage'

/**
 * 获取指标明细
 * @param domainId
 */
export const getPageInfoByDomainId =
  '/datablau-cloud/domain/domains/domain/getDomainById'

export default {
  /**
   * 数据管理左边树
   */
  catalogManage,
  /**
   * 指标-获取指标目录id
   * @param catalogId
   */
  getFoldIdByCatalogId,
  /**
   * 获取指标列表
   * @param folderId
   */
  getPageByFolderId,
  /**
   * 获取指标明细
   * @param domainId
   */
  getPageInfoByDomainId
}
