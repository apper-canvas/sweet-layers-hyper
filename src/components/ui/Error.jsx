import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'

const Error = ({ 
  message = "Something went wrong", 
  onRetry, 
  showRetry = true,
  title = "Oops!" 
}) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <div className="w-24 h-24 bg-gradient-to-br from-error/20 to-error/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <ApperIcon name="AlertCircle" size={40} className="text-error" />
        </div>
        
        <h2 className="text-2xl md:text-3xl font-display font-bold text-secondary mb-4">
          {title}
        </h2>
        
        <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
          {message}
        </p>
        
        {showRetry && onRetry && (
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="primary" onClick={onRetry}>
              <ApperIcon name="RefreshCw" size={20} />
              Try Again
            </Button>
            <Button variant="secondary" onClick={() => window.location.reload()}>
              <ApperIcon name="Home" size={20} />
              Refresh Page
            </Button>
          </div>
        )}
        
        {!showRetry && (
          <Button variant="primary" onClick={() => window.history.back()}>
            <ApperIcon name="ArrowLeft" size={20} />
            Go Back
          </Button>
        )}
      </motion.div>
    </div>
  )
}

export default Error