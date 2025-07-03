import { useState, useEffect } from 'react'
import HeroSection from '@/components/organisms/HeroSection'
import CategoryGrid from '@/components/organisms/CategoryGrid'
import ProductGrid from '@/components/organisms/ProductGrid'
import { getCakes } from '@/services/api/cakeService'
import { getCategories } from '@/services/api/categoryService'

const Home = () => {
  const [featuredCakes, setFeaturedCakes] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  
  const loadData = async () => {
    try {
      setLoading(true)
      setError('')
      
      const [cakesData, categoriesData] = await Promise.all([
        getCakes(),
        getCategories()
      ])
      
      // Get featured cakes (first 8 cakes)
      setFeaturedCakes(cakesData.slice(0, 8))
      setCategories(categoriesData)
    } catch (err) {
      setError('Failed to load data. Please try again.')
    } finally {
      setLoading(false)
    }
  }
  
  useEffect(() => {
    loadData()
  }, [])
  
  return (
    <div>
      <HeroSection />
      <CategoryGrid categories={categories} />
      <ProductGrid 
        cakes={featuredCakes} 
        loading={loading} 
        error={error}
        onRetry={loadData}
        title="Featured Cakes"
        className="bg-white"
      />
    </div>
  )
}

export default Home