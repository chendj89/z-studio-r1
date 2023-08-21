import fs from 'fs';
import path from 'path';

let options = {};
const { resolve, join, extname } = path;
const { existsSync, readdirSync, statSync, unlinkSync, rmdirSync } = fs;

function cleanFiles(dirPath) {
  if (existsSync(dirPath)) {
    let files = readdirSync(dirPath);
    files.forEach(file => {
      let filePath = join(dirPath, file);
      if (statSync(filePath).isDirectory()) {
        cleanFiles(filePath);
        rmdirSync(filePath);
      } else {
        unlinkSync(filePath);
      }
    });
  }
}
/**
 * 编译前删除指定文件夹或文件
 */
const cleanPlugin = (_opt) => {
  options = Object.assign(
    {
      targetFiles: ['dist','dist.zip']
    },
    _opt
  );
  return {
    name: 'vite-plugin-clean',
    enforce: 'pre',
    apply: 'build',
    buildStart: (config) => {
      const { targetFiles } = options;
      const rootDirectory = process.cwd();
      if (Array.isArray(targetFiles)) {
        for (let i = 0, len = targetFiles.length; i < len; i++) {
          const file = targetFiles[i];
          const filePath = resolve(rootDirectory, file);
          const fileExt = extname(file);
          if (fileExt === '.zip') {
            if (existsSync(filePath)) {
              unlinkSync(filePath);
            }
          } else {
            cleanFiles(filePath);
          }
        }
      } else {
        const filePath = resolve(rootDirectory, targetFiles);
        const fileExt = extname(targetFiles);
        if (fileExt === '.zip') {
          if (existsSync(filePath)) {
            unlinkSync(filePath);
          }
        } else {
          cleanFiles(filePath);
        }
      }
    }
  };
};

export default cleanPlugin;