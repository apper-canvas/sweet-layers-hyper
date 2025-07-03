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

export const getEstimatedDeliveryDate = (order) => {
  if (order.status === 'delivered') {
    return null // Already delivered
  }
  
  if (order.status === 'cancelled') {
    return null // Cancelled order
  }

  const orderDate = new Date(order.orderDate || new Date())
  let daysToAdd = 0

  switch (order.status) {
    case 'pending':
      daysToAdd = 5 // 5 business days for pending orders
      break
    case 'confirmed':
      daysToAdd = 3 // 3 business days for confirmed orders
      break
    case 'shipped':
      daysToAdd = 1 // 1 business day for shipped orders
      break
    default:
      daysToAdd = 5
  }

  const estimatedDate = new Date(orderDate)
  estimatedDate.setDate(orderDate.getDate() + daysToAdd)
  
  return estimatedDate
}