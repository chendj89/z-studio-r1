/**
 * 中划线字符驼峰
 * @param {*} str 要转换的字符串
 * @returns 返回值
 */
export function toHump(str) {
  if (!str) return str
  return str
    .replace(/\-(\w)/g, function (all, letter) {
      return letter.toUpperCase()
    })
    .replace(/(\s|^)[a-z]/g, function (char) {
      return char.toUpperCase()
    })
}

export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

export const getAssetsFile = (url) => {
  return new URL(`@/../public/${url}`, import.meta.url).href
}
