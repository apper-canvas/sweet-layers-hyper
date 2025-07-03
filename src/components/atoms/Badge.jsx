const Badge = ({ children, variant = 'default', className = '' }) => {
  const variants = {
    default: 'bg-gray-100 text-gray-800',
    primary: 'bg-primary/10 text-primary',
    secondary: 'bg-secondary/10 text-secondary',
    accent: 'bg-accent/10 text-accent',
    success: 'bg-success/10 text-success',
    warning: 'bg-warning/10 text-warning',
    error: 'bg-error/10 text-error',
    // Enhanced status variants
    pending: 'bg-warning/20 text-warning border border-warning/30',
    confirmed: 'bg-success/20 text-success border border-success/30',
    shipped: 'bg-info/20 text-info border border-info/30',
    delivered: 'bg-success/30 text-success border border-success/40',
    cancelled: 'bg-error/20 text-error border border-error/30',
  }
  
  return (
    <span className={`badge ${variants[variant]} ${className}`}>
      {children}
    </span>
  )
}

export default Badge