import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'
import Input from '@/components/atoms/Input'
import Select from '@/components/atoms/Select'
import { useCart } from '@/hooks/useCart'
import { createOrder } from '@/services/api/orderService'

const Checkout = () => {
  const navigate = useNavigate()
  const { cart, clearCart } = useCart()
  const [loading, setLoading] = useState(false)
  
  const [customerInfo, setCustomerInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    deliveryType: 'delivery',
    specialInstructions: ''
  })
  
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: ''
  })
  
  const [errors, setErrors] = useState({})
  
  const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0)
  const tax = subtotal * 0.08
  const shipping = subtotal > 100 ? 0 : 15
  const total = subtotal + tax + shipping
  
  const handleInputChange = (section, field, value) => {
    if (section === 'customer') {
      setCustomerInfo(prev => ({ ...prev, [field]: value }))
    } else if (section === 'payment') {
      setPaymentInfo(prev => ({ ...prev, [field]: value }))
    }
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }
  
  const validateForm = () => {
    const newErrors = {}
    
    // Customer info validation
    if (!customerInfo.firstName.trim()) newErrors.firstName = 'First name is required'
    if (!customerInfo.lastName.trim()) newErrors.lastName = 'Last name is required'
    if (!customerInfo.email.trim()) newErrors.email = 'Email is required'
    if (!customerInfo.phone.trim()) newErrors.phone = 'Phone number is required'
    
    if (customerInfo.deliveryType === 'delivery') {
      if (!customerInfo.address.trim()) newErrors.address = 'Address is required'
      if (!customerInfo.city.trim()) newErrors.city = 'City is required'
      if (!customerInfo.state.trim()) newErrors.state = 'State is required'
      if (!customerInfo.zipCode.trim()) newErrors.zipCode = 'Zip code is required'
    }
    
    // Payment info validation
    if (!paymentInfo.cardNumber.trim()) newErrors.cardNumber = 'Card number is required'
    if (!paymentInfo.expiryDate.trim()) newErrors.expiryDate = 'Expiry date is required'
    if (!paymentInfo.cvv.trim()) newErrors.cvv = 'CVV is required'
    if (!paymentInfo.cardholderName.trim()) newErrors.cardholderName = 'Cardholder name is required'
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      toast.error('Please fill in all required fields')
      return
    }
    
    try {
      setLoading(true)
      
      const orderData = {
        items: cart,
        customerInfo,
        deliveryType: customerInfo.deliveryType,
        total,
        status: 'confirmed'
      }
      
      const order = await createOrder(orderData)
      
      // Clear cart and redirect to success page
      clearCart()
      toast.success('Order placed successfully!')
      navigate(`/order-confirmation/${order.Id}`)
    } catch (err) {
      toast.error('Failed to place order. Please try again.')
    } finally {
      setLoading(false)
    }
  }
  
  const deliveryOptions = [
    { value: 'delivery', label: 'Delivery' },
    { value: 'pickup', label: 'Store Pickup' }
  ]
  
  const states = [
    { value: 'CA', label: 'California' },
    { value: 'NY', label: 'New York' },
    { value: 'TX', label: 'Texas' },
    { value: 'FL', label: 'Florida' }
  ]
  
  if (cart.length === 0) {
    navigate('/cart')
    return null
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
              Checkout
            </h1>
            <p className="text-lg text-gray-600">
              Complete your order
            </p>
          </motion.div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Checkout Form */}
            <div className="lg:col-span-2 space-y-8">
              {/* Customer Information */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
                <h3 className="font-display font-semibold text-xl text-secondary mb-6">
                  Customer Information
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="First Name"
                    value={customerInfo.firstName}
                    onChange={(e) => handleInputChange('customer', 'firstName', e.target.value)}
                    error={errors.firstName}
                    required
                  />
                  <Input
                    label="Last Name"
                    value={customerInfo.lastName}
                    onChange={(e) => handleInputChange('customer', 'lastName', e.target.value)}
                    error={errors.lastName}
                    required
                  />
                  <Input
                    label="Email"
                    type="email"
                    value={customerInfo.email}
                    onChange={(e) => handleInputChange('customer', 'email', e.target.value)}
                    error={errors.email}
                    required
                  />
                  <Input
                    label="Phone"
                    type="tel"
                    value={customerInfo.phone}
                    onChange={(e) => handleInputChange('customer', 'phone', e.target.value)}
                    error={errors.phone}
                    required
                  />
                </div>
              </div>
              
              {/* Delivery Information */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
                <h3 className="font-display font-semibold text-xl text-secondary mb-6">
                  Delivery Information
                </h3>
                
                <div className="space-y-4">
                  <Select
                    label="Delivery Type"
                    options={deliveryOptions}
                    value={customerInfo.deliveryType}
                    onChange={(e) => handleInputChange('customer', 'deliveryType', e.target.value)}
                    required
                  />
                  
                  {customerInfo.deliveryType === 'delivery' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="md:col-span-2">
                        <Input
                          label="Address"
                          value={customerInfo.address}
                          onChange={(e) => handleInputChange('customer', 'address', e.target.value)}
                          error={errors.address}
                          required
                        />
                      </div>
                      <Input
                        label="City"
                        value={customerInfo.city}
                        onChange={(e) => handleInputChange('customer', 'city', e.target.value)}
                        error={errors.city}
                        required
                      />
                      <Select
                        label="State"
                        options={states}
                        value={customerInfo.state}
                        onChange={(e) => handleInputChange('customer', 'state', e.target.value)}
                        error={errors.state}
                        required
                      />
                      <Input
                        label="Zip Code"
                        value={customerInfo.zipCode}
                        onChange={(e) => handleInputChange('customer', 'zipCode', e.target.value)}
                        error={errors.zipCode}
                        required
                      />
                    </div>
                  )}
                  
                  <div className="md:col-span-2">
                    <Input
                      label="Special Instructions (Optional)"
                      value={customerInfo.specialInstructions}
                      onChange={(e) => handleInputChange('customer', 'specialInstructions', e.target.value)}
                      placeholder="Any special delivery instructions..."
                    />
                  </div>
                </div>
              </div>
              
              {/* Payment Information */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
                <h3 className="font-display font-semibold text-xl text-secondary mb-6">
                  Payment Information
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <Input
                      label="Card Number"
                      value={paymentInfo.cardNumber}
                      onChange={(e) => handleInputChange('payment', 'cardNumber', e.target.value)}
                      error={errors.cardNumber}
                      placeholder="1234 5678 9012 3456"
                      required
                    />
                  </div>
                  <Input
                    label="Expiry Date"
                    value={paymentInfo.expiryDate}
                    onChange={(e) => handleInputChange('payment', 'expiryDate', e.target.value)}
                    error={errors.expiryDate}
                    placeholder="MM/YY"
                    required
                  />
                  <Input
                    label="CVV"
                    value={paymentInfo.cvv}
                    onChange={(e) => handleInputChange('payment', 'cvv', e.target.value)}
                    error={errors.cvv}
                    placeholder="123"
                    required
                  />
                  <div className="md:col-span-2">
                    <Input
                      label="Cardholder Name"
                      value={paymentInfo.cardholderName}
                      onChange={(e) => handleInputChange('payment', 'cardholderName', e.target.value)}
                      error={errors.cardholderName}
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
            
            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 sticky top-8">
                <h3 className="font-display font-semibold text-xl text-secondary mb-4">
                  Order Summary
                </h3>
                
                <div className="space-y-3 mb-6">
                  {cart.map((item) => (
                    <div key={`${item.cakeId}-${item.size}-${item.flavor}`} className="flex justify-between text-sm">
                      <div className="flex-1">
                        <p className="font-medium">Cake #{item.cakeId}</p>
                        <p className="text-gray-600">{item.size} • {item.flavor}</p>
                        <p className="text-gray-600">Qty: {item.quantity}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="space-y-3 border-t pt-4">
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
                  <div className="flex justify-between text-lg font-semibold border-t pt-3">
                    <span>Total</span>
                    <span className="text-primary">${total.toFixed(2)}</span>
                  </div>
                </div>
                
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-full mt-6"
                  disabled={loading}
                >
                  {loading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Processing...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <ApperIcon name="CreditCard" size={20} />
                      Place Order
                    </div>
                  )}
                </Button>
                
                <div className="mt-4 text-center text-sm text-gray-600">
                  <div className="flex items-center justify-center gap-2">
                    <ApperIcon name="Shield" size={16} className="text-success" />
                    <span>Your payment information is secure</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Checkout