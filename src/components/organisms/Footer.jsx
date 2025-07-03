import { Link } from 'react-router-dom'
import ApperIcon from '@/components/ApperIcon'
import Logo from '@/components/atoms/Logo'
import Button from '@/components/atoms/Button'

const Footer = () => {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="bg-secondary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center shadow-lg">
                <ApperIcon name="Cake" size={20} className="text-white" />
              </div>
              <div>
                <h3 className="text-xl font-display font-bold">Sweet Layers</h3>
                <p className="text-sm text-gray-300">Artisanal Cakes</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm">
              Creating unforgettable moments with handcrafted cakes made from the finest ingredients. 
              Every cake tells a story, and we're here to help you tell yours.
            </p>
            <div className="flex gap-3">
              <Button variant="ghost" size="sm" className="text-white hover:text-primary hover:bg-white/10">
                <ApperIcon name="Facebook" size={20} />
              </Button>
              <Button variant="ghost" size="sm" className="text-white hover:text-primary hover:bg-white/10">
                <ApperIcon name="Instagram" size={20} />
              </Button>
              <Button variant="ghost" size="sm" className="text-white hover:text-primary hover:bg-white/10">
                <ApperIcon name="Twitter" size={20} />
              </Button>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-300 hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/category/birthday" className="text-gray-300 hover:text-white transition-colors">Birthday Cakes</Link></li>
              <li><Link to="/category/wedding" className="text-gray-300 hover:text-white transition-colors">Wedding Cakes</Link></li>
              <li><Link to="/category/specialty" className="text-gray-300 hover:text-white transition-colors">Specialty Cakes</Link></li>
              <li><Link to="/about" className="text-gray-300 hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="text-gray-300 hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>
          
          {/* Customer Service */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-4">Customer Service</h4>
            <ul className="space-y-2">
              <li><Link to="/help" className="text-gray-300 hover:text-white transition-colors">Help Center</Link></li>
              <li><Link to="/shipping" className="text-gray-300 hover:text-white transition-colors">Shipping Info</Link></li>
              <li><Link to="/returns" className="text-gray-300 hover:text-white transition-colors">Returns & Exchanges</Link></li>
              <li><Link to="/size-guide" className="text-gray-300 hover:text-white transition-colors">Size Guide</Link></li>
              <li><Link to="/care-instructions" className="text-gray-300 hover:text-white transition-colors">Care Instructions</Link></li>
            </ul>
          </div>
          
          {/* Contact & Hours */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-4">Get in Touch</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <ApperIcon name="Phone" size={16} className="text-primary" />
                <span className="text-gray-300">(555) 123-4567</span>
              </div>
              <div className="flex items-center gap-3">
                <ApperIcon name="Mail" size={16} className="text-primary" />
                <span className="text-gray-300">hello@sweetlayers.com</span>
              </div>
              <div className="flex items-start gap-3">
                <ApperIcon name="MapPin" size={16} className="text-primary mt-1" />
                <span className="text-gray-300">123 Baker Street<br />Sweet City, SC 12345</span>
              </div>
              <div className="flex items-start gap-3">
                <ApperIcon name="Clock" size={16} className="text-primary mt-1" />
                <div className="text-gray-300">
                  <p>Mon-Fri: 8AM-6PM</p>
                  <p>Sat-Sun: 9AM-5PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Newsletter */}
        <div className="border-t border-gray-600 py-8">
          <div className="text-center">
            <h4 className="font-display font-semibold text-lg mb-2">Stay Sweet</h4>
            <p className="text-gray-300 mb-4">Subscribe to our newsletter for exclusive offers and cake inspiration</p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 rounded-lg text-secondary focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <Button variant="primary">
                Subscribe
                <ApperIcon name="Send" size={16} />
              </Button>
            </div>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="border-t border-gray-600 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-gray-300 text-sm">
              © {currentYear} Sweet Layers. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link to="/privacy" className="text-gray-300 hover:text-white text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-gray-300 hover:text-white text-sm transition-colors">
                Terms of Service
              </Link>
              <Link to="/cookies" className="text-gray-300 hover:text-white text-sm transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer