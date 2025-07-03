import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'
import Badge from '@/components/atoms/Badge'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import Empty from '@/components/ui/Empty'
import { getOrders } from '@/services/api/orderService'

const Orders = () => {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await getOrders()
      setOrders(data)
    } catch (err) {
      setError(err.message || 'Failed to load orders')
      toast.error('Failed to load orders')
    } finally {
      setLoading(false)
    }
  }

const getStatusIcon = (status) => {
    switch (status) {
      case 'confirmed':
        return 'CheckCircle'
      case 'pending':
        return 'Clock'
      case 'shipped':
        return 'Truck'
      case 'delivered':
        return 'Package'
      case 'cancelled':
        return 'XCircle'
      default:
        return 'Circle'
    }
  }

  const getEstimatedDeliveryDate = (order) => {
    if (order.status === 'delivered') {
      return 'Delivered'
    }
    
    if (order.status === 'cancelled') {
      return 'Cancelled'
    }

    const orderDate = new Date(order.orderDate || new Date())
    let daysToAdd = 0

    switch (order.status) {
      case 'pending':
        daysToAdd = 5 // 5 days for pending orders
        break
      case 'confirmed':
        daysToAdd = 3 // 3 days for confirmed orders
        break
      case 'shipped':
        daysToAdd = 1 // 1 day for shipped orders
        break
      default:
        daysToAdd = 5
    }

    const estimatedDate = new Date(orderDate)
    estimatedDate.setDate(orderDate.getDate() + daysToAdd)
    
    return formatDate(estimatedDate)
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  if (loading) {
    return <Loading />
  }

  if (error) {
    return (
      <Error 
        message={error}
        onRetry={fetchOrders}
      />
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-surface py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-3xl md:text-4xl font-display font-bold text-secondary mb-4">
              Your Orders
            </h1>
            <p className="text-lg text-gray-600">
              Track your cake orders and delivery status
            </p>
          </motion.div>
        </div>
      </div>

      {/* Orders List */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {orders.length === 0 ? (
          <Empty 
            title="No Orders Yet"
            description="You haven't placed any orders yet. Start shopping to see your orders here!"
            actionLabel="Browse Cakes"
            actionLink="/"
          />
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <motion.div
                key={order.Id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden"
              >
                {/* Order Header */}
                <div className="bg-surface p-6 border-b border-gray-100">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div>
                        <h3 className="font-display font-semibold text-xl text-secondary">
                          Order #{order.Id}
                        </h3>
                        <p className="text-gray-600 text-sm">
                          Placed on {formatDate(order.orderDate || new Date())}
                        </p>
                      </div>
                    </div>
<div className="flex items-center gap-4">
                      <Badge variant={order.status} className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium">
                        <ApperIcon name={getStatusIcon(order.status)} size={14} />
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </Badge>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-primary">
                          ${order.total.toFixed(2)}
                        </p>
                        <p className="text-sm text-gray-600">
                          {order.deliveryType === 'delivery' ? 'Delivery' : 'Pickup'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Order Items */}
                <div className="p-6">
                  <div className="space-y-4">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                        <div className="flex-1">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                              <ApperIcon name="Cake" size={24} className="text-primary" />
                            </div>
                            <div>
                              <h4 className="font-medium text-secondary">
                                Cake #{item.cakeId}
                              </h4>
                              <div className="flex flex-wrap gap-2 text-sm text-gray-600 mt-1">
                                <span>{item.size}</span>
                                <span>•</span>
                                <span>{item.flavor}</span>
                                <span>•</span>
                                <span>Qty: {item.quantity}</span>
                              </div>
                              {item.message && (
                                <p className="text-sm text-gray-600 mt-1">
                                  Message: "{item.message}"
                                </p>
)}
                              <div className="flex items-center gap-4 mt-2">
                                {item.deliveryDate && (
                                  <p className="text-sm text-gray-600">
                                    Requested: {formatDate(item.deliveryDate)}
                                  </p>
                                )}
                                <p className="text-sm font-medium text-primary">
                                  Est. Delivery: {getEstimatedDeliveryDate(order)}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-secondary">
                            ${(item.price * item.quantity).toFixed(2)}
                          </p>
                          <p className="text-sm text-gray-600">
                            ${item.price.toFixed(2)} each
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Customer Info */}
                <div className="bg-gray-50 p-6 border-t border-gray-100">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium text-secondary mb-2">Customer Information</h4>
                      <div className="text-sm text-gray-600 space-y-1">
                        <p>{order.customerInfo.firstName} {order.customerInfo.lastName}</p>
                        <p>{order.customerInfo.email}</p>
                        <p>{order.customerInfo.phone}</p>
                      </div>
                    </div>
                    
                    {order.deliveryType === 'delivery' && (
                      <div>
                        <h4 className="font-medium text-secondary mb-2">Delivery Address</h4>
                        <div className="text-sm text-gray-600 space-y-1">
                          <p>{order.customerInfo.address}</p>
                          <p>{order.customerInfo.city}, {order.customerInfo.state} {order.customerInfo.zipCode}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Orders