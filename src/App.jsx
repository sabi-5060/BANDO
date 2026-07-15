import { Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useStore } from './store/useStore'
import Navbar from './components/Navbar'
import CartDrawer from './components/CartDrawer'
import Footer from './components/Footer'
import ProtectedRoute from './components/ProtectedRoute'

// Pages
import HomePage from './pages/HomePage'
import ShopPage from './pages/ShopPage'
import ProductDetailPage from './pages/ProductDetailPage'
import GeorgeStinneyPage from './pages/GeorgeStinneyPage'
import AboutPage from './pages/AboutPage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import AccountPage from './pages/AccountPage'
import CheckoutPage from './pages/CheckoutPage'
import OrderSuccessPage from './pages/OrderSuccessPage'
import AdminDashboard from './pages/AdminDashboard'
import FavoritesPage from './pages/FavoritesPage'

// NEW: Footer pages
import ContactPage from './pages/ContactPage'
import ShippingReturnsPage from './pages/ShippingReturnsPage'
import PrivacyPolicyPage from './pages/PrivacyPolicyPage'
import TermsOfServicePage from './pages/TermsOfServicePage'

// ============================================
// ScrollToTop — scrolls to top on every route change
// ============================================
function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    })
  }, [pathname])

  return null
}

export default function App() {
  const initAuth = useStore((s) => s.initAuth)
  const subscribeToProducts = useStore((s) => s.subscribeToProducts)
  const unsubscribeFromProducts = useStore((s) => s.unsubscribeFromProducts)
  const completeGoogleSignIn = useStore((s) => s.completeGoogleSignIn)
  const navigate = useNavigate()

  useEffect(() => {
    const unsubAuth = initAuth()
    subscribeToProducts()

    // If we just came back from a Google redirect, this resolves true
    // and we send the user to the homepage. On a normal page load
    // (no redirect happened) it resolves false and this does nothing.
    completeGoogleSignIn().then((signedIn) => {
      if (signedIn) {
        navigate('/')
      }
    })

    return () => {
      unsubAuth?.()
      unsubscribeFromProducts()
    }
  }, [])

  return (
    <div className="min-h-screen bg-bando-black text-bando-white">
      <ScrollToTop />
      <Navbar />
      <CartDrawer />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
          <Route path="/george-stinney" element={<GeorgeStinneyPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />

          {/* NEW: Footer pages */}
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/shipping-returns" element={<ShippingReturnsPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/terms-of-service" element={<TermsOfServicePage />} />

          <Route path="/account" element={
            <ProtectedRoute>
              <AccountPage />
            </ProtectedRoute>
          } />
          <Route path="/checkout" element={
            <ProtectedRoute>
              <CheckoutPage />
            </ProtectedRoute>
          } />
          <Route path="/order-success" element={
            <ProtectedRoute>
              <OrderSuccessPage />
            </ProtectedRoute>
          } />
          <Route path="/admin" element={
            <ProtectedRoute requireAdmin>
              <AdminDashboard />
            </ProtectedRoute>
          } />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
