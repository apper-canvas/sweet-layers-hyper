import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { useCart } from "@/hooks/useCart";
import ApperIcon from "@/components/ApperIcon";
import Select from "@/components/atoms/Select";
import Badge from "@/components/atoms/Badge";
import Input from "@/components/atoms/Input";
import Button from "@/components/atoms/Button";
import Error from "@/components/ui/Error";
import Loading from "@/components/ui/Loading";
import Cart from "@/components/pages/Cart";
import Home from "@/components/pages/Home";
import { getCakeById } from "@/services/api/cakeService";

const ProductDetail = () => {
  const { cakeId } = useParams()
  const navigate = useNavigate()
  const { addToCart } = useCart()
  const [cake, setCake] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [selectedImage, setSelectedImage] = useState(0)
  
  const [customization, setCustomization] = useState({
    size: '',
    flavor: '',
    message: '',
    deliveryDate: '',
    quantity: 1
  })
  
  const [selectedPrice, setSelectedPrice] = useState(0)
  
  const loadCake = async () => {
    try {
      setLoading(true)
      setError('')
      
      const cakeData = await getCakeById(parseInt(cakeId))
      setCake(cakeData)
      
      // Set default values
      if (cakeData.sizes.length > 0) {
        setCustomization(prev => ({
          ...prev,
          size: cakeData.sizes[0].name
        }))
        setSelectedPrice(cakeData.sizes[0].price)
      }
      
      if (cakeData.flavors.length > 0) {
        setCustomization(prev => ({
          ...prev,
          flavor: cakeData.flavors[0]
        }))
      }
    } catch (err) {
      setError('Failed to load cake details. Please try again.')
    } finally {
      setLoading(false)
    }
  }
  
  const handleCustomizationChange = (field, value) => {
    setCustomization(prev => ({
      ...prev,
      [field]: value
    }))
    
    // Update price when size changes
    if (field === 'size' && cake) {
      const selectedSize = cake.sizes.find(size => size.name === value)
      if (selectedSize) {
        setSelectedPrice(selectedSize.price)
      }
    }
  }
  
const handleAddToCart = () => {
    if (!customization.size || !customization.flavor) {
      toast.error('Please select size and flavor')
      return
    }
    
    const cartItem = {
      cakeId: cake.Id,
      quantity: customization.quantity,
      size: customization.size,
      flavor: customization.flavor,
      message: customization.message,
      deliveryDate: customization.deliveryDate,
      price: selectedPrice
    }
    
    addToCart(cartItem)
    toast.success(`${cake.name} added to cart!`)
  }
  
const handleOrderNow = () => {
    if (!customization.size || !customization.flavor) {
      toast.error('Please select size and flavor')
      return
    }
    
    // Prepare order item for direct checkout
    const orderItem = {
      cakeId: cake.Id,
      quantity: customization.quantity,
      size: customization.size,
      flavor: customization.flavor,
      message: customization.message,
      deliveryDate: customization.deliveryDate,
      price: selectedPrice,
      cakeName: cake.name,
      cakeCategory: cake.category
    }
    
    // Navigate directly to checkout page with product data
    navigate('/checkout', { 
      state: { 
        directOrder: true, 
        orderItem: orderItem 
      } 
    })
  }
  
  useEffect(() => {
    loadCake()
  }, [cakeId])
  
  if (loading) {
    return <Loading />
  }
  
  if (error) {
    return <Error message={error} onRetry={loadCake} />
  }
  
  if (!cake) {
    return <Error message="Cake not found" />
  }
  
  const totalPrice = selectedPrice * customization.quantity
  
  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="bg-surface py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-sm text-gray-600">
            <Link to="/" className="hover:text-primary">Home</Link>
            <ApperIcon name="ChevronRight" size={16} />
            <Link to={`/category/${cake.category.toLowerCase()}`} className="hover:text-primary">
              {cake.category}
            </Link>
            <ApperIcon name="ChevronRight" size={16} />
            <span className="text-secondary">{cake.name}</span>
          </nav>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <div className="space-y-4">
<motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="aspect-square overflow-hidden rounded-2xl shadow-lg"
            >
              <ProductDetailImage 
                src={cake?.images?.[selectedImage]} 
                alt={cake?.name || 'Cake image'} 
                className="w-full h-full object-cover"
              />
            </motion.div>
            
            {cake.images.length > 1 && (
              <div className="flex gap-4 overflow-x-auto">
                {cake.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage === index ? 'border-primary' : 'border-gray-200'
                    }`}
>
                    <ProductThumbnail 
                      src={image} 
                      alt={`${cake?.name || 'Cake'} view ${index + 1}`} 
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
          
          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Badge variant="primary">{cake.category}</Badge>
                {cake.customizable && (
                  <Badge variant="accent">
                    <ApperIcon name="Palette" size={12} className="mr-1" />
                    Customizable
                  </Badge>
                )}
              </div>
              
              <h1 className="text-3xl md:text-4xl font-display font-bold text-secondary mb-4">
                {cake.name}
              </h1>
              
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <ApperIcon name="Star" size={20} className="text-accent fill-current" />
                  <span className="text-lg font-semibold">4.8</span>
                  <span className="text-gray-600">(120 reviews)</span>
                </div>
                <div className="flex items-center gap-2">
                  <ApperIcon name="Clock" size={20} className="text-gray-400" />
                  <span className="text-gray-600">2-3 days preparation</span>
                </div>
              </div>
              
              <p className="text-gray-600 text-lg leading-relaxed">
                {cake.description}
              </p>
            </div>
            
            {/* Price */}
            <div className="bg-surface rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-2xl font-bold text-secondary">${selectedPrice}</span>
                  <span className="text-gray-600 ml-2">per cake</span>
                </div>
                <div className="text-right">
                  <div className="text-lg font-semibold text-primary">
                    Total: ${totalPrice.toFixed(2)}
                  </div>
                  <div className="text-sm text-gray-600">
                    Quantity: {customization.quantity}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Customization Form */}
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
              <h3 className="font-display font-semibold text-xl text-secondary mb-4">
                Customize Your Cake
              </h3>
              
              <div className="space-y-4">
                <Select
                  label="Size"
                  options={cake.sizes.map(size => ({ 
                    value: size.name, 
                    label: `${size.name} (${size.serves} servings) - $${size.price}` 
                  }))}
                  value={customization.size}
                  onChange={(e) => handleCustomizationChange('size', e.target.value)}
                  required
                />
                
                <Select
                  label="Flavor"
                  options={cake.flavors.map(flavor => ({ value: flavor, label: flavor }))}
                  value={customization.flavor}
                  onChange={(e) => handleCustomizationChange('flavor', e.target.value)}
                  required
                />
                
                <Input
                  label="Custom Message (Optional)"
                  placeholder="Happy Birthday, John!"
                  value={customization.message}
                  onChange={(e) => handleCustomizationChange('message', e.target.value)}
                />
                
                <Input
                  label="Delivery Date"
                  type="date"
                  value={customization.deliveryDate}
                  onChange={(e) => handleCustomizationChange('deliveryDate', e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                />
                
                <div className="flex items-center gap-4">
                  <label className="text-sm font-medium text-secondary">Quantity:</label>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleCustomizationChange('quantity', Math.max(1, customization.quantity - 1))}
                      className="w-8 h-8 p-0"
                    >
                      <ApperIcon name="Minus" size={16} />
                    </Button>
                    <span className="w-8 text-center font-semibold">{customization.quantity}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleCustomizationChange('quantity', customization.quantity + 1)}
                      className="w-8 h-8 p-0"
                    >
                      <ApperIcon name="Plus" size={16} />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
{/* Action Buttons */}
            <div className="space-y-3">
              <Button
                variant="primary"
                size="lg"
                onClick={handleAddToCart}
                className="w-full"
              >
                <ApperIcon name="ShoppingCart" size={20} />
                Add to Cart - ${totalPrice.toFixed(2)}
              </Button>
              
              <Button
                variant="accent"
                size="lg"
                onClick={handleOrderNow}
                className="w-full"
              >
                <ApperIcon name="Zap" size={20} />
                Order Now - ${totalPrice.toFixed(2)}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Image component with error handling for main product image
const ProductDetailImage = ({ src, alt, className }) => {
  const [imageError, setImageError] = useState(false)
  const [imageLoading, setImageLoading] = useState(true)
  const [retryCount, setRetryCount] = useState(0)
  const [currentSrc, setCurrentSrc] = useState(src)
  
  const maxRetries = 2
  const fallbackImage = `https://via.placeholder.com/600x400/D4667A/FFFFFF?text=${encodeURIComponent(alt)}`
  
// Validate image URL
  const isValidImageUrl = (url) => {
    if (!url || typeof url !== 'string') return false
    
    try {
      new URL(url)
      return true
    } catch {
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
    console.warn(`Product detail image load failed for: ${currentSrc}`, {
      alt,
      retryCount,
      isValidUrl: isValidImageUrl(currentSrc)
    })
    
    if (retryCount < maxRetries && isValidImageUrl(currentSrc)) {
      setRetryCount(prev => prev + 1)
      
      // Add timestamp to bypass cache
      const retryUrl = currentSrc + (currentSrc.includes('?') ? '&' : '?') + `retry=${retryCount + 1}&t=${Date.now()}`
      
      // Exponential backoff
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
      
      const retryUrl = src + (src.includes('?') ? '&' : '?') + `manual_retry=${Date.now()}`
      setCurrentSrc(retryUrl)
    }
  }
  
  // Use fallback immediately if URL is invalid
  const finalSrc = imageError || !isValidImageUrl(currentSrc) ? fallbackImage : currentSrc
  
  return (
    <div className="relative w-full h-full">
      {imageLoading && !imageError && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center image-loading-state">
          <div className="flex flex-col items-center gap-2">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
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

// Thumbnail component with error handling
const ProductThumbnail = ({ src, alt, className }) => {
  const [imageError, setImageError] = useState(false)
  const [imageLoading, setImageLoading] = useState(true)
  const [retryCount, setRetryCount] = useState(0)
  const [currentSrc, setCurrentSrc] = useState(src)
  
  const maxRetries = 1 // Fewer retries for thumbnails
  const fallbackImage = `https://via.placeholder.com/100x100/D4667A/FFFFFF?text=N/A`
  
  // Validate image URL
  const isValidImageUrl = (url) => {
    if (!url || typeof url !== 'string') return false
    
    try {
      new URL(url)
      return true
    } catch {
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
    if (retryCount < maxRetries && isValidImageUrl(currentSrc)) {
      setRetryCount(prev => prev + 1)
      
      // Add timestamp to bypass cache
      const retryUrl = currentSrc + (currentSrc.includes('?') ? '&' : '?') + `retry=${retryCount + 1}&t=${Date.now()}`
      
      setTimeout(() => {
        setCurrentSrc(retryUrl)
      }, 1000)
    } else {
      setImageError(true)
      setImageLoading(false)
    }
  }
  
  const handleImageLoad = () => {
    setImageLoading(false)
    setImageError(false)
  }
  
  // Use fallback immediately if URL is invalid
  const finalSrc = imageError || !isValidImageUrl(currentSrc) ? fallbackImage : currentSrc
  
  return (
    <div className="relative w-full h-full">
      {imageLoading && !imageError && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
          <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
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
        <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
          <ApperIcon name="ImageOff" size={16} className="text-gray-400" />
        </div>
      )}
    </div>
  )
}

export default ProductDetail