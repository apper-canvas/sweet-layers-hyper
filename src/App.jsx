import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Layout from '@/components/organisms/Layout'
import Home from '@/components/pages/Home'
import Category from '@/components/pages/Category'
import ProductDetail from '@/components/pages/ProductDetail'
import Cart from '@/components/pages/Cart'
import Checkout from '@/components/pages/Checkout'
import Orders from '@/components/pages/Orders'
import About from '@/components/pages/About'
import Contact from '@/components/pages/Contact'
import { CartProvider } from '@/hooks/useCart'

function App() {
  return (
    <CartProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/category/:categoryName" element={<Category />} />
            <Route path="/cake/:cakeId" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
<Route path="/checkout" element={<Checkout />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </Layout>
        <ToastContainer 
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </Router>
    </CartProvider>
  )
}

export default App