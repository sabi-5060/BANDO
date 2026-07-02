import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Crown, ShoppingBag, Menu, X, User, LogOut, Shield, Heart } from 'lucide-react'
import { useStore } from '../store/useStore'
import { motion, AnimatePresence } from 'framer-motion'

// ============================================
// Logout Confirmation Modal (inline for single-file use)
// ============================================
function LogoutConfirmModal({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-bando-black/80 backdrop-blur-sm z-[60]"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', duration: 0.4 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4"
          >
            <div className="bg-bando-charcoal border border-bando-graphite rounded-2xl shadow-2xl max-w-sm w-full p-6 relative">
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-1.5 text-bando-ash hover:text-bando-white hover:bg-bando-graphite rounded-lg transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Icon */}
              <div className="w-14 h-14 bg-red-500/10 border border-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <LogOut className="w-7 h-7 text-red-400" />
              </div>

              {/* Text */}
              <h3 className="heading-display text-xl text-center mb-2">
                Sign Out?
              </h3>
              <p className="text-bando-ash text-sm text-center mb-6 leading-relaxed">
                Are you sure you want to sign out of your BANDO account? Your cart and favorites will be saved.
              </p>

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  onClick={onClose}
                  className="flex-1 py-2.5 px-4 bg-bando-graphite/50 border border-bando-graphite text-bando-white rounded-lg font-medium hover:bg-bando-graphite transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={onConfirm}
                  className="flex-1 py-2.5 px-4 bg-red-500/10 border border-red-500/30 text-red-400 rounded-lg font-medium hover:bg-red-500/20 transition-colors flex items-center justify-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

// ============================================
// Main Navbar
// ============================================
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const { 
    isCartOpen, 
    setCartOpen, 
    getCartCount, 
    user, 
    isAuthenticated, 
    isAdmin, 
    logout, 
    isMobileMenuOpen, 
    setMobileMenuOpen,
    favorites
  } = useStore()
  const location = useLocation()
  const navigate = useNavigate()
  const cartCount = getCartCount()
  const favCount = favorites?.length || 0

  // ← LOGOUT MODAL STATE
  const [logoutModalOpen, setLogoutModalOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMobileMenuOpen(false)
  }, [location.pathname, setMobileMenuOpen])

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/shop', label: 'Shop' },
    { path: '/george-stinney', label: 'George Stinney' },
    { path: '/about', label: 'About' },
  ]

  const handleAdminClick = () => {
    navigate('/admin')
  }

  // ← LOGOUT HANDLERS
  const handleLogoutClick = () => {
    setMobileMenuOpen(false)
    setLogoutModalOpen(true)
  }

  const handleConfirmLogout = () => {
    logout()
    setLogoutModalOpen(false)
    navigate('/')
  }

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-bando-black/95 backdrop-blur-xl border-b border-bando-graphite/50'
            : 'bg-transparent'
        }`}
      >
        <div className="section-padding">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <Crown className="w-7 h-7 text-bando-gold group-hover:scale-110 transition-transform" />
              <span className="font-display text-xl font-bold tracking-wider text-bando-white">
                BANDO
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-sm font-medium tracking-wide transition-colors duration-300 ${
                    location.pathname === link.path
                      ? 'text-bando-gold'
                      : 'text-bando-ash hover:text-bando-white'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-4">
              {/* Favorites (desktop) */}
              {isAuthenticated && (
                <Link
                  to="/favorites"
                  className="relative p-2 text-bando-ash hover:text-bando-white transition-colors hidden md:block"
                >
                  <Heart className="w-5 h-5" />
                  {favCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                      {favCount}
                    </span>
                  )}
                </Link>
              )}

              {/* Cart */}
              <button
                onClick={() => setCartOpen(true)}
                className="relative p-2 text-bando-ash hover:text-bando-white transition-colors"
              >
                <ShoppingBag className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-bando-gold text-bando-black text-xs font-bold rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Auth */}
              {isAuthenticated ? (
                <div className="hidden md:flex items-center gap-3">
                  {/* Admin Link */}
                  {isAdmin && (
                    <button
                      onClick={handleAdminClick}
                      className="flex items-center gap-1.5 text-sm text-bando-gold hover:text-bando-gold-light transition-colors"
                    >
                      <Shield className="w-4 h-4" />
                      <span>Admin</span>
                    </button>
                  )}
                  <Link
                    to="/account"
                    className="flex items-center gap-1.5 text-sm text-bando-ash hover:text-bando-white transition-colors"
                  >
                    <User className="w-4 h-4" />
                    <span>{user?.firstName}</span>
                  </Link>
                  {/* ← DESKTOP SIGN OUT — NOW OPENS MODAL */}
                  <button
                    onClick={handleLogoutClick}
                    className="p-2 text-bando-ash hover:text-red-400 transition-colors"
                    title="Sign Out"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <Link
                  to="/login"
                  className="hidden md:flex items-center gap-1.5 text-sm text-bando-ash hover:text-bando-white transition-colors"
                >
                  <User className="w-4 h-4" />
                  <span>Sign In</span>
                </Link>
              )}

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 text-bando-ash hover:text-bando-white transition-colors"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-bando-black/98 backdrop-blur-xl pt-24"
          >
            <div className="section-padding flex flex-col gap-6">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    to={link.path}
                    className={`text-2xl font-display font-semibold ${
                      location.pathname === link.path
                        ? 'text-bando-gold'
                        : 'text-bando-white'
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              
              <div className="border-t border-bando-graphite pt-6 mt-4">
                {isAuthenticated ? (
                  <div className="flex flex-col gap-4">
                    {isAdmin && (
                      <button 
                        onClick={() => {
                          setMobileMenuOpen(false)
                          handleAdminClick()
                        }} 
                        className="text-lg text-bando-gold flex items-center gap-2"
                      >
                        <Shield className="w-5 h-5" /> Admin Dashboard
                      </button>
                    )}
                    <Link to="/account" className="text-lg text-bando-ash flex items-center gap-2">
                      <User className="w-5 h-5" /> My Account
                    </Link>
                    <Link to="/favorites" className="text-lg text-bando-ash flex items-center gap-2">
                      <Heart className="w-5 h-5" /> Favorites ({favCount})
                    </Link>
                    {/* ← MOBILE SIGN OUT — NOW OPENS MODAL */}
                    <button 
                      onClick={handleLogoutClick} 
                      className="text-lg text-red-400 flex items-center gap-2"
                    >
                      <LogOut className="w-5 h-5" /> Sign Out
                    </button>
                  </div>
                ) : (
                  <Link to="/login" className="text-lg text-bando-gold font-semibold">
                    Sign In / Create Account
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ← LOGOUT CONFIRMATION MODAL */}
      <LogoutConfirmModal
        isOpen={logoutModalOpen}
        onClose={() => setLogoutModalOpen(false)}
        onConfirm={handleConfirmLogout}
      />
    </>
  )
}