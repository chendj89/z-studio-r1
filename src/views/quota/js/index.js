export function buildTree(data, parentId = 0) {
  const result = []
  for (const item of data) {
    const { id, name, parentId: itemParentId } = item
    if (itemParentId === parentId) {
      const children = buildTree(data, id)
      result.push({ id, name, children })
    }
  }
  return result
}
