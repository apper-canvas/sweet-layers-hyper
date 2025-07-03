import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'
import { useCart } from '@/hooks/useCart'

const CartItem = ({ item, cake }) => {
  const { updateCartItem, removeFromCart } = useCart()
  
  const handleQuantityChange = (newQuantity) => {
    if (newQuantity <= 0) {
      handleRemove()
      return
    }
    
    updateCartItem(item.cakeId, { ...item, quantity: newQuantity })
  }
  
  const handleRemove = () => {
    removeFromCart(item.cakeId)
    toast.success(`${cake.name} removed from cart`)
  }
  
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm border border-gray-100"
    >
      <img
        src={cake.images[0]}
        alt={cake.name}
        className="w-16 h-16 object-cover rounded-lg"
      />
      
      <div className="flex-1">
        <h4 className="font-semibold text-secondary">{cake.name}</h4>
        <div className="text-sm text-gray-600 space-y-1">
          <p>Size: {item.size}</p>
          <p>Flavor: {item.flavor}</p>
          {item.message && <p>Message: "{item.message}"</p>}
          {item.deliveryDate && <p>Delivery: {item.deliveryDate}</p>}
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => handleQuantityChange(item.quantity - 1)}
          className="w-8 h-8 p-0"
        >
          <ApperIcon name="Minus" size={16} />
        </Button>
        <span className="w-8 text-center font-semibold">{item.quantity}</span>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => handleQuantityChange(item.quantity + 1)}
          className="w-8 h-8 p-0"
        >
          <ApperIcon name="Plus" size={16} />
        </Button>
      </div>
      
      <div className="text-right">
        <p className="font-semibold text-lg text-secondary">
          ${(item.price * item.quantity).toFixed(2)}
        </p>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleRemove}
          className="text-error hover:text-error hover:bg-error/10 p-1"
        >
          <ApperIcon name="Trash2" size={16} />
        </Button>
      </div>
    </motion.div>
  )
}

export default CartItem