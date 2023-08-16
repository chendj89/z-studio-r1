/**
 * 控制el-tree缩放所有节点
 * @param {*} node this.$refs.tree.root
 * @param {boolean} status true展开/false收缩
 */
export function changeTreeNodeStatus(node, status) {
  node.expanded = status
  for (let i = 0; i < node.childNodes.length; i++) {
    node.childNodes[i].expanded = status
    if (node.childNodes[i].childNodes.length > 0) {
      changeTreeNodeStatus(node.childNodes[i], status)
    }
  }
}

export function findTreeNodeById(node, id, result = []) {
  if (node.data && node.data.id == id) {
    result.push(node);
    return result;
  }
  if (node.childNodes && node.childNodes.length) {
    for (let i = 0; i < node.childNodes.length; i++) {
      let childResult = findTreeNodeById(node.childNodes[i], id, result);
      if (childResult) {
        childResult.unshift(node);
        return childResult;
      }
    }
  }
  return null;
}
