const UNICODE_MATCH_REG = /[^\x00-\xff]/g
const CONTENT_MATCH_REG = /(?<!-)content\s*:\s*([^;\}]+)/g
import path from 'path'
export default function unicodePlugin() {
  return {
    name: 'vitePluginsVueUnicode',
    async generateBundle(opts, outputBundle) {
      for (const [bundleId, bundle] of Object.entries(outputBundle)) {
        let type = path.extname(bundle.fileName).slice(1)
        if (type == 'css' && bundle.source.indexOf('Font Awesome') > -1) {
          bundle.source = bundle.source.replace(
            CONTENT_MATCH_REG,
            function (m, p1) {
              return m.replace(UNICODE_MATCH_REG, function (m) {
                return '\\' + m.charCodeAt(0).toString(16)
              })
            }
          )
        }
      }
    }
  }
}
