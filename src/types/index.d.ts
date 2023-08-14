/**
 * 紫金表格
 */
export interface TableConfig {
  /**
   * 数据
   */
  data: {
    /**
     * 表头显示
     */
    label: string
    /**
     * 数据字段
     */
    name: string
  }[]
  paging:
    | boolean
    | {
        pageSize: number
        pageSizes: number[]
        currentPage: number
      }
}
