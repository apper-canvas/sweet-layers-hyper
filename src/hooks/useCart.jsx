import { createContext, useContext, useReducer } from 'react'

const CartContext = createContext()

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItemIndex = state.findIndex(
        item => item.cakeId === action.payload.cakeId && 
                item.size === action.payload.size && 
                item.flavor === action.payload.flavor
      )
      
      if (existingItemIndex >= 0) {
        const updatedCart = [...state]
        updatedCart[existingItemIndex].quantity += action.payload.quantity
        return updatedCart
      }
      
      return [...state, action.payload]
    }
    case 'UPDATE_ITEM':
      return state.map(item =>
        item.cakeId === action.payload.cakeId && 
        item.size === action.payload.size && 
        item.flavor === action.payload.flavor
          ? action.payload
          : item
      )
    
    case 'REMOVE_ITEM':
      return state.filter(item => item.cakeId !== action.payload)
    
    case 'CLEAR_CART':
      return []
    
    default:
      return state
  }
}

export const CartProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, [])
  
  const addToCart = (item) => {
    dispatch({ type: 'ADD_ITEM', payload: item })
  }
  
  const updateCartItem = (cakeId, updatedItem) => {
    dispatch({ type: 'UPDATE_ITEM', payload: updatedItem })
  }
  
  const removeFromCart = (cakeId) => {
    dispatch({ type: 'REMOVE_ITEM', payload: cakeId })
  }
  
  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' })
  }
  
  const value = {
    cart,
    addToCart,
    updateCartItem,
    removeFromCart,
    clearCart
  }
  
  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}