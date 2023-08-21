import fs from 'fs'
import path from 'path'

let options = {}
const { resolve, join, extname } = path
const { existsSync, readdirSync, statSync, unlinkSync, rmdirSync } = fs

/**
 * 递归清理文件夹
 * @param {string} dirPath - 文件夹路径
 */
function cleanFiles(dirPath) {
  if (existsSync(dirPath)) {
    let files = readdirSync(dirPath)
    files.forEach((file) => {
      let filePath = join(dirPath, file)
      if (statSync(filePath).isDirectory()) {
        cleanFiles(filePath)
        rmdirSync(filePath)
      } else {
        unlinkSync(filePath)
      }
    })
  }
}

/**
 * Vite 清理插件
 * @param {any} _opt - 插件配置选项
 * @param {string|string[]} _opt.targetFiles - 目标文件/文件夹路径，支持单个路径或路径数组，默认为 ['dist','dist.zip]
 * @returns {object} - Vite 插件对象
 */
const cleanPlugin = (_opt) => {
  options = Object.assign(
    {
      targetFiles: ['dist','dist.zip']
    },
    _opt
  )
  return {
    name: 'vite-plugin-clean',
    enforce: 'pre',
    apply: 'build',
    buildStart: (config) => {
      const { targetFiles } = options
      const rootDirectory = process.cwd()
      if (Array.isArray(targetFiles)) {
        // 处理多个目标文件/文件夹
        for (let i = 0, len = targetFiles.length; i < len; i++) {
          const file = targetFiles[i]
          const filePath = resolve(rootDirectory, file)
          const fileExt = extname(file)
          if (fileExt === '.zip') {
            // 如果是.zip文件，直接删除
            if (existsSync(filePath)) {
              unlinkSync(filePath)
            }
          } else {
            // 否则执行清理文件夹操作
            cleanFiles(filePath)
          }
        }
      } else {
        // 处理单个目标文件/文件夹
        const filePath = resolve(rootDirectory, targetFiles)
        const fileExt = extname(targetFiles)
        if (fileExt === '.zip') {
          // 如果是.zip文件，直接删除
          if (existsSync(filePath)) {
            unlinkSync(filePath)
          }
        } else {
          // 否则执行清理文件夹操作
          cleanFiles(filePath)
        }
      }
    }
  }
}

export default cleanPlugin
