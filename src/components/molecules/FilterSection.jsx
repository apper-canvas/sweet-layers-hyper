import { useState } from 'react'
import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'
import Select from '@/components/atoms/Select'

const FilterSection = ({ 
  categories, 
  flavors, 
  filters, 
  onFilterChange, 
  onSortChange,
  onClearFilters 
}) => {
  const [isExpanded, setIsExpanded] = useState(false)
  
  const sortOptions = [
    { value: 'name', label: 'Name A-Z' },
    { value: 'price-low', label: 'Price Low to High' },
    { value: 'price-high', label: 'Price High to Low' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'newest', label: 'Newest First' }
  ]
  
  const priceRanges = [
    { value: '', label: 'Any Price' },
    { value: '0-50', label: 'Under $50' },
    { value: '50-100', label: '$50 - $100' },
    { value: '100-200', label: '$100 - $200' },
    { value: '200+', label: '$200+' }
  ]
  
  const hasActiveFilters = filters.category || filters.flavor || filters.priceRange
  
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-secondary flex items-center gap-2">
          <ApperIcon name="Filter" size={20} />
          Filters
        </h3>
        <div className="flex items-center gap-2">
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearFilters}
              className="text-error hover:text-error hover:bg-error/10"
            >
              Clear All
            </Button>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="lg:hidden"
          >
            <ApperIcon name={isExpanded ? "ChevronUp" : "ChevronDown"} size={16} />
          </Button>
        </div>
      </div>
      
      <motion.div
        initial={false}
        animate={{ height: isExpanded ? 'auto' : 'auto' }}
        className={`${isExpanded ? 'block' : 'hidden'} lg:block`}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Select
            label="Category"
            options={categories.map(cat => ({ value: cat.slug, label: cat.name }))}
            value={filters.category}
            onChange={(e) => onFilterChange('category', e.target.value)}
            placeholder="All Categories"
          />
          
          <Select
            label="Flavor"
            options={flavors.map(flavor => ({ value: flavor, label: flavor }))}
            value={filters.flavor}
            onChange={(e) => onFilterChange('flavor', e.target.value)}
            placeholder="All Flavors"
          />
          
          <Select
            label="Price Range"
            options={priceRanges}
            value={filters.priceRange}
            onChange={(e) => onFilterChange('priceRange', e.target.value)}
            placeholder="Any Price"
          />
          
          <Select
            label="Sort By"
            options={sortOptions}
            value={filters.sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            placeholder="Sort By"
          />
        </div>
      </motion.div>
    </div>
  )
}

export default FilterSection