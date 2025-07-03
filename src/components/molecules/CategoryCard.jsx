import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'

const CategoryCard = ({ category, index = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className="group"
    >
      <Link to={`/category/${category.slug}`}>
        <div className="card overflow-hidden">
          <div className="relative">
            <img
              src={category.image}
              alt={category.name}
              className="w-full h-32 object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute bottom-3 left-3 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <ApperIcon name={category.icon} size={24} />
            </div>
          </div>
          
          <div className="p-4 text-center">
            <h3 className="font-display font-semibold text-lg text-secondary mb-2 group-hover:text-primary transition-colors">
              {category.name}
            </h3>
            <p className="text-gray-600 text-sm mb-3">
              {category.description}
            </p>
            <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
              <span>{category.count} cakes</span>
              <span>•</span>
              <span>From ${category.startingPrice}</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

export default CategoryCard