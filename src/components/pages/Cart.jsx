import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'
import CartItem from '@/components/molecules/CartItem'
import Empty from '@/components/ui/Empty'
import { useCart } from '@/hooks/useCart'
import { getCakeById } from '@/services/api/cakeService'
import { useState, useEffect } from 'react'

const Cart = () => {
  const { cart, clearCart } = useCart()
  const [cakeDetails, setCakeDetails] = useState({})
  const [loading, setLoading] = useState(true)
  
  const loadCakeDetails = async () => {
    try {
      setLoading(true)
      const details = {}
      
      for (const item of cart) {
        if (!details[item.cakeId]) {
          const cake = await getCakeById(item.cakeId)
          details[item.cakeId] = cake
        }
      }
      
      setCakeDetails(details)
    } catch (err) {
      console.error('Failed to load cake details:', err)
    } finally {
      setLoading(false)
    }
  }
  
  useEffect(() => {
    if (cart.length > 0) {
      loadCakeDetails()
    } else {
      setLoading(false)
    }
  }, [cart])
  
  if (cart.length === 0) {
    return (
      <Empty
        title="Your cart is empty"
        message="Looks like you haven't added any delicious cakes to your cart yet. Browse our collection and find the perfect cake for your celebration!"
        actionText="Browse Cakes"
        actionLink="/category/birthday"
        icon="ShoppingCart"
      />
    )
  }
  
  const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0)
  const tax = subtotal * 0.08 // 8% tax
  const shipping = subtotal > 100 ? 0 : 15 // Free shipping over $100
  const total = subtotal + tax + shipping
  
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
              Your Cart
            </h1>
            <p className="text-lg text-gray-600">
              {cart.length} {cart.length === 1 ? 'item' : 'items'} in your cart
            </p>
          </motion.div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-display font-semibold text-secondary">
                Cart Items
              </h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={clearCart}
                className="text-error hover:text-error hover:bg-error/10"
              >
                <ApperIcon name="Trash2" size={16} />
                Clear Cart
              </Button>
            </div>
            
            {loading ? (
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="bg-white rounded-lg p-4 animate-pulse">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-gray-200 rounded-lg" />
                      <div className="flex-1 space-y-2">
                        <div className="h-4 bg-gray-200 rounded w-3/4" />
                        <div className="h-3 bg-gray-200 rounded w-1/2" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {cart.map((item) => (
                  <CartItem
                    key={`${item.cakeId}-${item.size}-${item.flavor}`}
                    item={item}
                    cake={cakeDetails[item.cakeId]}
                  />
                ))}
              </div>
            )}
          </div>
          
          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 sticky top-8">
              <h3 className="font-display font-semibold text-xl text-secondary mb-4">
                Order Summary
              </h3>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">${subtotal.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-medium">${tax.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">
                    {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                
                {subtotal < 100 && (
                  <div className="text-sm text-accent bg-accent/10 p-2 rounded">
                    Add ${(100 - subtotal).toFixed(2)} more for free shipping!
                  </div>
                )}
                
                <div className="border-t pt-3">
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total</span>
                    <span className="text-primary">${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 space-y-3">
                <Button variant="primary" size="lg" className="w-full">
                  <Link to="/checkout" className="flex items-center gap-2">
                    <ApperIcon name="CreditCard" size={20} />
                    Proceed to Checkout
                  </Link>
                </Button>
                
                <Button variant="secondary" size="lg" className="w-full">
                  <Link to="/category/birthday" className="flex items-center gap-2">
                    <ApperIcon name="ArrowLeft" size={20} />
                    Continue Shopping
                  </Link>
                </Button>
              </div>
              
              <div className="mt-6 text-center text-sm text-gray-600">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <ApperIcon name="Shield" size={16} className="text-success" />
                  <span>Secure checkout</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <ApperIcon name="Truck" size={16} className="text-accent" />
                  <span>Free delivery on orders over $100</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart