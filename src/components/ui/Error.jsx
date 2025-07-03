import { motion } from 'framer-motion'
import { useState } from 'react'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'

const Error = ({ 
  message = "Something went wrong", 
  onRetry, 
  showRetry = true,
  title = "Oops!",
  type = "general", // "general", "image", "network"
  imageUrl = null,
  fallbackImage = null
}) => {
  const [isRetrying, setIsRetrying] = useState(false)
  const [retryCount, setRetryCount] = useState(0)
  
  const handleRetry = async () => {
    if (isRetrying) return
    
    setIsRetrying(true)
    setRetryCount(prev => prev + 1)
    
    try {
      await onRetry?.()
    } catch (error) {
      console.error('Retry failed:', error)
    } finally {
      setIsRetrying(false)
    }
  }
  
  const getErrorIcon = () => {
    switch (type) {
      case 'image':
        return 'ImageOff'
      case 'network':
        return 'WifiOff'
      default:
        return 'AlertCircle'
    }
  }
  
  const getErrorMessage = () => {
    if (type === 'image') {
      return message || "We're having trouble loading some images. This might be due to a slow connection or server issues."
    }
    return message
  }
  
  const getErrorTitle = () => {
    if (type === 'image') {
      return title || "Image Loading Issue"
    }
    return title
  }
return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <div className="w-24 h-24 bg-gradient-to-br from-error/20 to-error/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <ApperIcon name={getErrorIcon()} size={40} className="text-error" />
        </div>
        
        {type === 'image' && fallbackImage && (
          <div className="mb-6">
            <div className="image-error-container mx-auto max-w-sm">
              <img 
                src={fallbackImage} 
                alt="Fallback" 
                className="w-full h-48 object-cover rounded-lg"
              />
              <p className="text-sm text-gray-500 mt-2">
                Showing placeholder image
              </p>
            </div>
          </div>
        )}
        
        <h2 className="text-2xl md:text-3xl font-display font-bold text-secondary mb-4">
          {getErrorTitle()}
        </h2>
        
        <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
          {getErrorMessage()}
        </p>
        
        {retryCount > 0 && (
          <div className="mb-4">
            <p className="text-sm text-gray-500">
              Retry attempts: {retryCount}
            </p>
          </div>
        )}
        
        {showRetry && onRetry && (
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="primary" 
              onClick={handleRetry}
              disabled={isRetrying}
              className="image-retry-btn"
            >
              {isRetrying ? (
                <>
                  <ApperIcon name="Loader2" size={20} className="animate-spin" />
                  Retrying...
                </>
              ) : (
                <>
                  <ApperIcon name="RefreshCw" size={20} />
                  Try Again {retryCount > 0 && `(${retryCount + 1})`}
                </>
              )}
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
        
        {type === 'image' && imageUrl && (
          <details className="mt-8 text-left max-w-md mx-auto">
            <summary className="cursor-pointer text-sm text-gray-500 hover:text-gray-700">
              Technical Details
            </summary>
            <div className="mt-2 p-3 bg-gray-50 rounded text-xs font-mono break-all">
              Failed URL: {imageUrl}
            </div>
          </details>
        )}
      </motion.div>
    </div>
  )
}

export default Error