import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'

const HeroSection = () => {
  return (
    <section className="relative bg-gradient-to-r from-surface to-background overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:pb-28 xl:pb-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center min-h-[500px]">
            {/* Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <div className="space-y-2">
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-secondary leading-tight"
                >
                  Sweet Moments,
                  <span className="gradient-text block">Made Perfect</span>
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-lg md:text-xl text-gray-600 max-w-lg"
                >
                  Handcrafted artisanal cakes made with love and the finest ingredients. 
                  From birthdays to weddings, we create unforgettable centerpieces for your special moments.
                </motion.p>
              </div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Button variant="primary" size="lg" className="group">
                  <Link to="/category/birthday" className="flex items-center gap-2">
                    Explore Cakes
                    <ApperIcon name="ArrowRight" size={20} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button variant="secondary" size="lg">
                  <Link to="/about" className="flex items-center gap-2">
                    <ApperIcon name="Play" size={20} />
                    Our Story
                  </Link>
                </Button>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="flex items-center gap-6 pt-4"
              >
                <div className="flex items-center gap-2">
                  <ApperIcon name="Star" size={20} className="text-accent fill-current" />
                  <span className="text-sm text-gray-600">4.9/5 Rating</span>
                </div>
                <div className="flex items-center gap-2">
                  <ApperIcon name="Users" size={20} className="text-accent" />
                  <span className="text-sm text-gray-600">1000+ Happy Customers</span>
                </div>
                <div className="flex items-center gap-2">
                  <ApperIcon name="Clock" size={20} className="text-accent" />
                  <span className="text-sm text-gray-600">Same Day Delivery</span>
                </div>
              </motion.div>
            </motion.div>
            
            {/* Hero Image */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                  alt="Beautiful custom cake"
                  className="w-full h-96 lg:h-[500px] object-cover rounded-2xl shadow-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl" />
                
                {/* Floating Elements */}
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1, duration: 0.5 }}
                  className="absolute top-6 left-6 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg"
                >
                  <div className="flex items-center gap-2">
                    <ApperIcon name="Cake" size={20} className="text-primary" />
                    <span className="text-sm font-semibold">Custom Made</span>
                  </div>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.2, duration: 0.5 }}
                  className="absolute bottom-6 right-6 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg"
                >
                  <div className="flex items-center gap-2">
                    <ApperIcon name="Truck" size={20} className="text-accent" />
                    <span className="text-sm font-semibold">Free Delivery</span>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-1/2 h-full">
        <div className="absolute inset-0 bg-gradient-to-l from-primary/5 to-transparent" />
        <div className="absolute top-1/4 right-1/4 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/3 w-24 h-24 bg-accent/10 rounded-full blur-2xl" />
      </div>
    </section>
  )
}

export default HeroSection