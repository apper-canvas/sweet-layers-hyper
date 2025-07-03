import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import ProductGrid from '@/components/organisms/ProductGrid'
import FilterSection from '@/components/molecules/FilterSection'
import { getCakes } from '@/services/api/cakeService'
import { getCategories } from '@/services/api/categoryService'

const Category = () => {
  const { categoryName } = useParams()
  const [cakes, setCakes] = useState([])
  const [filteredCakes, setFilteredCakes] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  
  const [filters, setFilters] = useState({
    category: categoryName || '',
    flavor: '',
    priceRange: '',
    sortBy: 'name'
  })
  
  const loadData = async () => {
    try {
      setLoading(true)
      setError('')
      
      const [cakesData, categoriesData] = await Promise.all([
        getCakes(),
        getCategories()
      ])
      
      setCakes(cakesData)
      setCategories(categoriesData)
      
      // Apply initial filtering
      filterCakes(cakesData, { ...filters, category: categoryName || '' })
    } catch (err) {
      setError('Failed to load cakes. Please try again.')
    } finally {
      setLoading(false)
    }
  }
  
  const filterCakes = (cakeList, currentFilters) => {
    let filtered = [...cakeList]
    
    // Filter by category
    if (currentFilters.category) {
      filtered = filtered.filter(cake => 
        cake.category.toLowerCase() === currentFilters.category.toLowerCase()
      )
    }
    
    // Filter by flavor
    if (currentFilters.flavor) {
      filtered = filtered.filter(cake => 
        cake.flavors.includes(currentFilters.flavor)
      )
    }
    
    // Filter by price range
    if (currentFilters.priceRange) {
      const [min, max] = currentFilters.priceRange.split('-').map(Number)
      filtered = filtered.filter(cake => {
        if (currentFilters.priceRange === '200+') {
          return cake.basePrice >= 200
        }
        return cake.basePrice >= min && cake.basePrice <= max
      })
    }
    
    // Sort
    switch (currentFilters.sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.basePrice - b.basePrice)
        break
      case 'price-high':
        filtered.sort((a, b) => b.basePrice - a.basePrice)
        break
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name))
        break
      default:
        break
    }
    
    setFilteredCakes(filtered)
  }
  
  const handleFilterChange = (filterKey, value) => {
    const newFilters = { ...filters, [filterKey]: value }
    setFilters(newFilters)
    filterCakes(cakes, newFilters)
  }
  
  const handleSortChange = (sortBy) => {
    const newFilters = { ...filters, sortBy }
    setFilters(newFilters)
    filterCakes(cakes, newFilters)
  }
  
  const handleClearFilters = () => {
    const clearedFilters = {
      category: categoryName || '',
      flavor: '',
      priceRange: '',
      sortBy: 'name'
    }
    setFilters(clearedFilters)
    filterCakes(cakes, clearedFilters)
  }
  
  useEffect(() => {
    loadData()
  }, [categoryName])
  
  // Get unique flavors from all cakes
  const availableFlavors = [...new Set(cakes.flatMap(cake => cake.flavors))]
  
  // Get current category info
  const currentCategory = categories.find(cat => cat.slug === categoryName)
  
  return (
    <div className="min-h-screen bg-background">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-surface to-background py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-display font-bold text-secondary mb-4">
              {currentCategory ? currentCategory.name : 'All Cakes'}
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {currentCategory ? currentCategory.description : 'Discover our full collection of handcrafted cakes'}
            </p>
          </motion.div>
        </div>
      </div>
      
      {/* Filters and Results */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <FilterSection
          categories={categories}
          flavors={availableFlavors}
          filters={filters}
          onFilterChange={handleFilterChange}
          onSortChange={handleSortChange}
          onClearFilters={handleClearFilters}
        />
        
        <div className="mt-8">
          <ProductGrid 
            cakes={filteredCakes} 
            loading={loading} 
            error={error}
            onRetry={loadData}
            title={`${filteredCakes.length} ${filteredCakes.length === 1 ? 'Cake' : 'Cakes'} Found`}
          />
        </div>
      </div>
    </div>
  )
}

export default Category