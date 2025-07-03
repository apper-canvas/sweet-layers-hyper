import { motion } from 'framer-motion'
import ProductCard from '@/components/molecules/ProductCard'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import Empty from '@/components/ui/Empty'

const ProductGrid = ({ 
  cakes, 
  loading, 
  error, 
  onRetry,
  title = "Our Cakes",
  className = ""
}) => {
  if (loading) {
    return <Loading />
  }
  
  if (error) {
    return <Error message={error} onRetry={onRetry} />
  }
  
  if (!cakes || cakes.length === 0) {
    return <Empty 
      title="No cakes found" 
      message="We couldn't find any cakes matching your criteria. Try adjusting your filters or browse our full collection."
      actionText="Browse All Cakes"
      actionLink="/category/birthday"
    />
  }
  
  return (
    <section className={`py-12 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold text-secondary mb-4">
            {title}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our collection of handcrafted cakes, each one made with love and attention to detail.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {cakes.map((cake, index) => (
            <motion.div
              key={cake.Id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <ProductCard cake={cake} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ProductGrid