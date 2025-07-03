import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'
import Logo from '@/components/atoms/Logo'
import SearchBar from '@/components/molecules/SearchBar'
import CartIcon from '@/components/molecules/CartIcon'
import Button from '@/components/atoms/Button'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const location = useLocation()
  
  const navigationItems = [
    { name: 'Home', path: '/' },
    { name: 'Birthday Cakes', path: '/category/birthday' },
    { name: 'Wedding Cakes', path: '/category/wedding' },
    { name: 'Specialty', path: '/category/specialty' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' }
  ]
  
  const handleSearch = (term) => {
    setSearchTerm(term)
    // In a real app, you'd navigate to a search results page
    console.log('Searching for:', term)
  }
  
  const isActive = (path) => location.pathname === path
  
  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Logo className="flex-shrink-0" />
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`text-sm font-medium transition-colors duration-200 hover:text-primary ${
                  isActive(item.path) ? 'text-primary' : 'text-secondary'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>
          
          {/* Search Bar - Desktop */}
          <div className="hidden lg:block flex-1 max-w-lg mx-8">
            <SearchBar onSearch={handleSearch} />
          </div>
          
          {/* Actions */}
          <div className="flex items-center gap-4">
            {/* Search Button - Mobile */}
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden"
              onClick={() => {/* Toggle search modal */}}
            >
              <ApperIcon name="Search" size={20} />
            </Button>
            
            {/* Cart */}
            <CartIcon />
            
            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <ApperIcon name={isMenuOpen ? "X" : "Menu"} size={20} />
            </Button>
          </div>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden bg-white border-t border-gray-100"
        >
          <div className="px-4 py-2 space-y-1">
            {/* Mobile Search */}
            <div className="py-2">
              <SearchBar onSearch={handleSearch} />
            </div>
            
            {/* Navigation Items */}
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`block px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  isActive(item.path) 
                    ? 'text-primary bg-primary/10' 
                    : 'text-secondary hover:text-primary hover:bg-primary/5'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </motion.div>
      )}
    </header>
  )
}

export default Header