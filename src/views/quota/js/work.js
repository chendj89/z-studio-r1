// 监听主线程发送的消息
self.onmessage = function (event) {
  console.log('Received message from main script:', event.data)
  // 处理消息
  const result = event.data.map((item) => {
    return {
      id: item.id,
      name: item.name,
      children: buildTree(item.dataAssetsCatalogVos)
    }
  })
  // 向主线程发送消息
  self.postMessage({ from: 'worker', data: result })
}

function buildTree(data, parentId = 0) {
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
