import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'
import { useCart } from '@/hooks/useCart'

const CartIcon = ({ className = '' }) => {
  const { cart } = useCart()
  const itemCount = cart.reduce((total, item) => total + item.quantity, 0)
  
  return (
    <Link to="/cart" className={`relative ${className}`}>
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="relative p-2 rounded-lg hover:bg-primary/10 transition-colors duration-200"
      >
        <ApperIcon name="ShoppingCart" size={24} className="text-secondary" />
        {itemCount > 0 && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-semibold"
          >
            {itemCount > 99 ? '99+' : itemCount}
          </motion.div>
        )}
      </motion.div>
    </Link>
  )
}

export default CartIcon