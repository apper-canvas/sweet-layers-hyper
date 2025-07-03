import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'

const Empty = ({ 
  title = "Nothing here yet", 
  message = "It looks like this area is empty. Check back later or explore other sections.",
  actionText = "Explore",
  actionLink = "/",
  icon = "Search"
}) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <div className="w-24 h-24 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <ApperIcon name={icon} size={40} className="text-primary" />
        </div>
        
        <h2 className="text-2xl md:text-3xl font-display font-bold text-secondary mb-4">
          {title}
        </h2>
        
        <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
          {message}
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="primary" size="lg">
            <Link to={actionLink} className="flex items-center gap-2">
              <ApperIcon name="ArrowRight" size={20} />
              {actionText}
            </Link>
          </Button>
          <Button variant="secondary" size="lg">
            <Link to="/contact" className="flex items-center gap-2">
              <ApperIcon name="MessageCircle" size={20} />
              Contact Us
            </Link>
          </Button>
        </div>
      </motion.div>
    </div>
  )
}

export default Empty