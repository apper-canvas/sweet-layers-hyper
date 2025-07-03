import ordersData from '@/services/mockData/orders.json'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

export const getOrders = async () => {
  await delay(300)
  return [...ordersData]
}

export const getOrderById = async (Id) => {
  await delay(200)
  const order = ordersData.find(o => o.Id === Id)
  if (!order) {
    throw new Error('Order not found')
  }
  return { ...order }
}

export const createOrder = async (orderData) => {
  await delay(500)
  const newOrder = {
    ...orderData,
    Id: Math.max(...ordersData.map(o => o.Id)) + 1
  }
  ordersData.push(newOrder)
  return { ...newOrder }
}

export const updateOrder = async (Id, orderData) => {
  await delay(350)
  const index = ordersData.findIndex(o => o.Id === Id)
  if (index === -1) {
    throw new Error('Order not found')
  }
  ordersData[index] = { ...ordersData[index], ...orderData }
  return { ...ordersData[index] }
}

export const deleteOrder = async (Id) => {
  await delay(250)
  const index = ordersData.findIndex(o => o.Id === Id)
  if (index === -1) {
    throw new Error('Order not found')
  }
  const deletedOrder = ordersData.splice(index, 1)[0]
  return { ...deletedOrder }
}