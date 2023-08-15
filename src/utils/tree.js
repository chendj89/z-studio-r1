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
