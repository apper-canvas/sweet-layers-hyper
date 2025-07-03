import { Link } from 'react-router-dom'
import ApperIcon from '@/components/ApperIcon'

const Logo = ({ className = '' }) => {
  return (
    <Link to="/" className={`flex items-center gap-2 ${className}`}>
      <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center shadow-lg">
        <ApperIcon name="Cake" size={20} className="text-white" />
      </div>
      <div>
        <h1 className="text-xl font-display font-bold text-secondary">Sweet Layers</h1>
        <p className="text-xs text-gray-500 -mt-1">Artisanal Cakes</p>
      </div>
    </Link>
  )
}

export default Logo