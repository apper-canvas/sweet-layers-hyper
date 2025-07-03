import { useState } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'
import Input from '@/components/atoms/Input'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })
  
  const [loading, setLoading] = useState(false)
  
  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      toast.success('Message sent successfully! We\'ll get back to you soon.')
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      })
    } catch (err) {
      toast.error('Failed to send message. Please try again.')
    } finally {
      setLoading(false)
    }
  }
  
  const contactInfo = [
    {
      icon: 'Phone',
      title: 'Phone',
      details: '(555) 123-4567',
      subtitle: 'Call us Monday-Friday 8AM-6PM'
    },
    {
      icon: 'Mail',
      title: 'Email',
      details: 'hello@sweetlayers.com',
      subtitle: 'We respond within 24 hours'
    },
    {
      icon: 'MapPin',
      title: 'Location',
      details: '123 Baker Street, Sweet City, SC 12345',
      subtitle: 'Visit our beautiful storefront'
    },
    {
      icon: 'Clock',
      title: 'Hours',
      details: 'Mon-Fri: 8AM-6PM, Sat-Sun: 9AM-5PM',
      subtitle: 'Extended hours during holidays'
    }
  ]
  
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-surface to-background py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-display font-bold text-secondary mb-6">
              Get in Touch
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Have a question about our cakes or want to discuss a custom order? 
              We'd love to hear from you! Our team is here to help make your celebration perfect.
            </p>
          </motion.div>
        </div>
      </section>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-display font-bold text-secondary mb-6">
                Send us a Message
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    required
                  />
                  <Input
                    label="Email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    required
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                  />
                  <Input
                    label="Subject"
                    value={formData.subject}
                    onChange={(e) => handleInputChange('subject', e.target.value)}
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-secondary mb-2">
                    Message *
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    rows={6}
                    className="input-field resize-none"
                    placeholder="Tell us about your cake needs..."
                    required
                  />
                </div>
                
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  disabled={loading}
                  className="w-full"
                >
                  {loading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Sending...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <ApperIcon name="Send" size={20} />
                      Send Message
                    </div>
                  )}
                </Button>
              </form>
            </div>
          </motion.div>
          
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-2xl font-display font-bold text-secondary mb-6">
                Contact Information
              </h2>
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={info.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-4"
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center flex-shrink-0">
                      <ApperIcon name={info.icon} size={20} className="text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-secondary mb-1">{info.title}</h3>
                      <p className="text-gray-800 mb-1">{info.details}</p>
                      <p className="text-gray-600 text-sm">{info.subtitle}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            
            {/* Map or Additional Info */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="font-display font-semibold text-xl text-secondary mb-4">
                Visit Our Store
              </h3>
              <div className="aspect-video bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
                <div className="text-center">
                  <ApperIcon name="MapPin" size={48} className="text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-600">Interactive map coming soon</p>
                </div>
              </div>
              <p className="text-gray-600 text-sm">
                Come visit our beautiful storefront where you can see our bakers at work, 
                sample our delicious cakes, and discuss your custom orders in person. 
                We love meeting our customers!
              </p>
            </div>
            
            {/* FAQ */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="font-display font-semibold text-xl text-secondary mb-4">
                Quick Answers
              </h3>
              <div className="space-y-3">
                <div>
                  <h4 className="font-medium text-secondary">How far in advance should I order?</h4>
                  <p className="text-gray-600 text-sm">We recommend 2-3 days for custom cakes, 1-2 weeks for wedding cakes.</p>
                </div>
                <div>
                  <h4 className="font-medium text-secondary">Do you offer delivery?</h4>
                  <p className="text-gray-600 text-sm">Yes! We offer free delivery within 20 miles for orders over $100.</p>
                </div>
                <div>
                  <h4 className="font-medium text-secondary">Can I modify my order?</h4>
                  <p className="text-gray-600 text-sm">Changes can be made up to 24 hours before your delivery date.</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default Contact