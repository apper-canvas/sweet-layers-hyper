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

// Image component with error handling and fallback
const ProductImage = ({ src, alt, className }) => {
  const [imageError, setImageError] = useState(false)
  const [imageLoading, setImageLoading] = useState(true)
  
  const fallbackImage = `https://via.placeholder.com/400x300/D4667A/FFFFFF?text=${encodeURIComponent(alt)}`
  
  const handleImageError = () => {
    setImageError(true)
    setImageLoading(false)
  }
  
  const handleImageLoad = () => {
    setImageLoading(false)
  }
  
  return (
    <div className="relative">
      {imageLoading && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      <img
        src={imageError || !src ? fallbackImage : src}
        alt={alt}
        className={className}
        onError={handleImageError}
        onLoad={handleImageLoad}
      />
      {imageError && (
        <div className="absolute bottom-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
          Image unavailable
        </div>
      )}
    </div>
  )
}

export default ProductCard