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

export function addIdsProperty(obj) {
  if (!obj.children || obj.children.length === 0) {
    obj.ids = [obj.id]
  } else {
    obj.ids = [obj.id]
    for (const child of obj.children) {
      addIdsProperty(child)
      obj.ids = obj.ids.concat(child.ids)
    }
  }
}
 
export function findElementById(objArray, id) {
  for (const obj of objArray) {
    if (obj.id == id) {
      return obj;
    }
    if (obj.children && obj.children.length > 0) {
      const result = findElementById(obj.children, id);
      if (result) {
        return result;
      }
    }
  }
  return null;
}