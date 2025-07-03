import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import React, { useState } from "react";
import { useCart } from "@/hooks/useCart";
import ApperIcon from "@/components/ApperIcon";
import Badge from "@/components/atoms/Badge";
import Button from "@/components/atoms/Button";

const ProductCard = ({ cake }) => {
  const { addToCart } = useCart()
  
  const handleQuickAdd = (e) => {
    e.preventDefault()
    e.stopPropagation()
    
    const cartItem = {
      cakeId: cake.Id,
      quantity: 1,
      size: cake.sizes[0].name,
      flavor: cake.flavors[0],
      message: '',
      deliveryDate: '',
      price: cake.sizes[0].price
    }
    
    addToCart(cartItem)
    toast.success(`${cake.name} added to cart!`)
  }
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      className="card overflow-hidden group"
    >
      <Link to={`/cake/${cake.Id}`}>
        <div className="relative overflow-hidden">
<ProductImage 
            src={cake?.images?.[0]} 
            alt={cake?.name || 'Cake image'} 
            className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
          />
          <div className="absolute top-3 left-3">
            <Badge variant="primary">{cake.category}</Badge>
          </div>
          <div className="absolute top-3 right-3">
            <div className="price-tag">
              ${cake.basePrice}+
            </div>
          </div>
          {cake.customizable && (
            <div className="absolute bottom-3 left-3">
              <Badge variant="accent">
                <ApperIcon name="Palette" size={12} className="mr-1" />
                Customizable
              </Badge>
            </div>
          )}
        </div>
        
        <div className="p-4">
          <h3 className="font-display font-semibold text-lg text-secondary mb-2 group-hover:text-primary transition-colors">
            {cake.name}
          </h3>
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {cake.description}
          </p>
          
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <ApperIcon name="Star" size={16} className="text-accent fill-current" />
              <span className="text-sm text-gray-600">4.8 (120 reviews)</span>
            </div>
            <div className="flex items-center gap-1">
              <ApperIcon name="Clock" size={16} className="text-gray-400" />
              <span className="text-sm text-gray-600">2-3 days</span>
            </div>
</div>
          
          <div className="flex items-center gap-2">
            <Button
              variant="primary"
              size="sm"
              onClick={handleQuickAdd}
              className="flex-1"
            >
              <ApperIcon name="Plus" size={16} />
              Quick Add
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="px-3"
            >
              <ApperIcon name="Heart" size={16} />
            </Button>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

// Enhanced image component with retry mechanism and validation
const ProductImage = ({ src, alt, className }) => {
  const [imageError, setImageError] = useState(false)
  const [imageLoading, setImageLoading] = useState(true)
  const [retryCount, setRetryCount] = useState(0)
  const [currentSrc, setCurrentSrc] = useState(src)
  
  const maxRetries = 2
  const fallbackImage = `https://via.placeholder.com/400x300/D4667A/FFFFFF?text=${encodeURIComponent(alt)}`
  
  // Validate image URL
  const isValidImageUrl = (url) => {
    if (!url || typeof url !== 'string') return false
    
    try {
      new URL(url)
      return true
    } catch {
      // Check if it's a relative path with image extension
      return /\.(jpg|jpeg|png|gif|webp|svg|bmp|ico)(\?.*)?$/i.test(url)
    }
  }
  
  // Reset state when src changes
  React.useEffect(() => {
    if (src !== currentSrc) {
      setCurrentSrc(src)
      setImageError(false)
      setImageLoading(true)
      setRetryCount(0)
    }
  }, [src, currentSrc])
  
  const handleImageError = () => {
    console.warn(`Image load failed for: ${currentSrc}`, {
      alt,
      retryCount,
      isValidUrl: isValidImageUrl(currentSrc)
    })
    
    if (retryCount < maxRetries && isValidImageUrl(currentSrc)) {
      setRetryCount(prev => prev + 1)
      
      // Add timestamp to bypass cache
      const retryUrl = currentSrc + (currentSrc.includes('?') ? '&' : '?') + `retry=${retryCount + 1}&t=${Date.now()}`
      
      // Exponential backoff: wait 1s, then 2s, then 4s
      const delay = Math.pow(2, retryCount) * 1000
      
      setTimeout(() => {
        setCurrentSrc(retryUrl)
      }, delay)
    } else {
      setImageError(true)
      setImageLoading(false)
    }
  }
  
  const handleImageLoad = () => {
    setImageLoading(false)
    setImageError(false)
  }
  
  const handleRetryClick = () => {
    if (retryCount < maxRetries) {
      setRetryCount(0)
      setImageError(false)
      setImageLoading(true)
      
      // Force reload with timestamp
      const retryUrl = src + (src.includes('?') ? '&' : '?') + `manual_retry=${Date.now()}`
      setCurrentSrc(retryUrl)
    }
  }
  
  // Use fallback immediately if URL is invalid
  const finalSrc = imageError || !isValidImageUrl(currentSrc) ? fallbackImage : currentSrc
  
  return (
    <div className="relative">
      {imageLoading && !imageError && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center image-loading-state">
          <div className="flex flex-col items-center gap-2">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
            {retryCount > 0 && (
              <span className="text-xs text-gray-600">Retrying... ({retryCount}/{maxRetries})</span>
            )}
          </div>
        </div>
      )}
      
      <img
        src={finalSrc}
        alt={alt}
        className={className}
        onError={handleImageError}
        onLoad={handleImageLoad}
      />
      
      {imageError && (
        <div className="absolute inset-0 bg-gray-100 flex flex-col items-center justify-center p-4">
          <div className="image-error-container text-center">
            <ApperIcon name="ImageOff" size={32} className="text-gray-400 mb-2 mx-auto" />
            <p className="text-sm text-gray-600 mb-2">Image unavailable</p>
            {retryCount < maxRetries && (
              <button
                onClick={handleRetryClick}
                className="image-retry-btn text-xs px-3 py-1 rounded"
              >
                Retry
              </button>
            )}
            <div className="text-xs text-gray-400 mt-1">
              Attempts: {retryCount}/{maxRetries}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProductCard