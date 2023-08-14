// zjark-ui与zjark-web的相关配置

/**
 * zjark配置文件,需要在zjark-ui引入前引入,该文件定义了配置数据
 */
const zjarkConfig = {
  //前后端分离版本项目前缀，可根据需求自行修改
  // aasPath: "/aas",
  // aasWebPath: "/aas_web",
  // ccsPath: "/ccs",
  // ccsWebPath: "/ccs_web",
  // wfsPath: "/z-studio-service",
  // wfsDesignerPath: "/z-studio-service",
  // messagePath: "/z-studio-service",
  // projectPath: "/z-studio-service",
  // wlsDesignerPath: "/z-studio-service",
  // fileservicePath: "/z-studio-service",
  // datasourcePath:"/z-studio-datasource",
  // 微服务版本（开网关）项目前缀，可根据需求自行修改
  aasPath: '/aas-cloud',
  aasWebPath: '/aas-web-cloud',
  ccsPath: '/ccs-cloud',
  ccsWebPath: '/ccs-web-cloud',
  wfsPath: '/workflow-cloud',
  wfsDesignerPath: '/wfs',
  messagePath: '/zjark-cloud-message',
  projectPath: '/zjark-cloud-web-core',
  servicePath: '/z-studio-service-cloud',
  wlsDesignerPath: '/zjark-web-core',
  fileservicePath: '/zjark-cloud-fileservice', //文件服务路径
  // 配置基础的url
  uploadUrl: '/api/user/upload',
  uploadExcelUrl: '/uploadExcel.do?method=upload',
  f1RequestUrl: 'http://172.22.24.181', //fone 测试地址
  // f1RequestUrl: 'http://172.22.35.108', // fone 生产地址
  // 配置表格内容器的高度
  containerHeight: 500,
  // 富文本编辑器配置
  editorConfig: {},
  tableContentCopy: false,
  // 分页配置
  pagingConfig: {
    pageSizeKey: 'limit', // 分页大小key
    pageIndexKey: 'offset', // 分页索引key
    totalKey: 'total', // 总数key
  },
  // 排序的配置
  sortConfig: {
    order: 'ascDesc', // 排序的规则字段
    prop: 'orderBy', // 排序的依赖字段
    descKey: 'desc', // 降序的key
    ascKey: 'asc', // 升序的key
  },
  // 数据返回格式
  // 统一的数据格式返回
  format: 'string', // 默认string,也可以传入array,此时checkbox, imageUpload 会返回数组,
  // 地址选择器数据返回
  areaDataFormat: 'string', // string 字符串返回,一般是最后一个选择项, array数组, 所有选择项
  checkboxFormat: 'string',
  request: {},
  oldI18n: false,
  decorator: {
    ajaxParam: {
      // 分页配置
      pagingConfig: {
        pageSizeKey: 'curRowNum', // 分页大小key
        pageIndexKey: 'curPage', // 分页索引key
        totalKey: 'records', // 总数key
      },
      // 排序的配置
      sortConfig: {
        order: 'ascDesc', // 排序的规则字段
        prop: 'fieldName', // 排序的依赖字段
        descKey: 'desc', // 降序的key
        ascKey: 'asc', // 升序的key
      },
    },
  },
  iamUrl: '/zjark-cloud-web-core/rest/api/ssoLogin.do',
  iamSpecifyPageAfterLogin: '/homePage',
  // iamLogoutUrl:'https://idetest.zjky.cn:4443/esc-sso/logout?redirectBack=true&redirectUrl=https://idetest.zjky.cn:4443'
  iamLogoutUrl: 'https://iam.zijinmining.com/esc-sso/logout?redirectBack=true&redirectUrl=https://iam.zijinmining.com',
};

// window.sessionStorage.setItem('isEnableIam',zjarkConfig.iamUrl)
// 配置登录后默认跳转页面，想跳首页就配置 / 或者 空。其他页面配置路由类似： /system/frameSetting
// 如果配置了zjarkConfig.configSpecifyPageAfterLogin, 则跳转到指定的页面
window.specifyPageAfterLogin = zjarkConfig.configSpecifyPageAfterLogin
  ? zjarkConfig.configSpecifyPageAfterLogin
  : zjarkConfig.iamSpecifyPageAfterLogin;

window.$zjark = {};
window.$zjark.config = zjarkConfig;
window.$zjark.zstudio = {};
window.$zjark.zstudio.version = 'V0.6.0-V0.4.8';
