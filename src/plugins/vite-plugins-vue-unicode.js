const UNICODE_MATCH_REG = /[^\x00-\xff]/g
const CONTENT_MATCH_REG = /(?<!-)content\s*:\s*([^;\}]+)/g

export default function unicodePlugin() {
  return {
    name: 'vitePluginsVueUnicode',
    apply: 'build',
    transform(code, id) {
      if (id.endsWith('.css')||id.endsWith('.scss')) {
        console.log('id====>\n',id)
        return code
      } else {
        return code
      }
    }
  }
}
