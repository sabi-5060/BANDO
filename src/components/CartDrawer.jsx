import { useRef, useEffect } from 'react'
import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react'
import { useStore } from '../store/useStore'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { formatPrice } from '../lib/utils'

export default function CartDrawer() {
  const { isCartOpen, setCartOpen, cart, removeFromCart, updateCartQuantity, getCartTotal, clearCart } = useStore()
  const drawerRef = useRef(null)
  const total = getCartTotal()
  const cartCount = cart.reduce(
  (total, item) => total + item.quantity,
  0
)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (drawerRef.current && !drawerRef.current.contains(event.target)) {
        setCartOpen(false)
      }
    }
    if (isCartOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.body.style.overflow = 'unset'
    }
  }, [isCartOpen, setCartOpen])

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
            onClick={() => setCartOpen(false)}
          />
          
          {/* Drawer */}
          <motion.div
            ref={drawerRef}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-bando-charcoal border-l border-bando-graphite z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-bando-graphite">
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-5 h-5 text-bando-gold" />
                <h2 className="font-display text-xl font-semibold">Your Cart</h2>
                <span className="text-sm text-bando-ash">({cart.length} items)</span>
              </div>
              <button
                onClick={() => setCartOpen(false)}
                className="p-2 hover:bg-bando-graphite rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <ShoppingBag className="w-16 h-16 text-bando-graphite mb-4" />
                  <p className="text-bando-ash text-lg mb-2">Your cart is empty</p>
                  <p className="text-bando-graphite text-sm mb-6">Add some items to get started</p>
                  <button
                    onClick={() => setCartOpen(false)}
                    className="btn-primary"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                cart.map((item, index) => (
                  <motion.div
                    key={`${item.product.id}-${item.size}-${item.color}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex gap-4 bg-bando-black/50 rounded-lg p-4"
                  >
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-20 h-24 object-cover rounded-md"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-sm truncate">{item.product.name}</h3>
                      <p className="text-bando-ash text-xs mt-1">
                        {item.color} / {item.size}
                      </p>
                      <p className="text-bando-gold font-semibold mt-1">
                        {formatPrice(item.product.price)}
                      </p>
                      
                      <div className="flex items-center gap-3 mt-3">
                        <button
                          onClick={() =>
                            item.quantity > 1
                              ? updateCartQuantity(item.product.id, item.size, item.color, item.quantity - 1)
                              : removeFromCart(item.product.id, item.size, item.color)
                          }
                          className="p-1 hover:bg-bando-graphite rounded transition-colors"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="text-sm font-medium w-6 text-center">{item.quantity}</span>
                        <button
                          onClick={() =>
                            updateCartQuantity(item.product.id, item.size, item.color, item.quantity + 1)
                          }
                          disabled={cartCount >= 1}
                          className={`p-1 rounded transition-colors ${
  cartCount >= 1
    ? 'opacity-40 cursor-not-allowed'
    : 'hover:bg-bando-graphite'
}`}
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => removeFromCart(item.product.id, item.size, item.color)}
                          className="ml-auto p-1 text-red-400 hover:bg-red-400/10 rounded transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div className="border-t border-bando-graphite p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-bando-ash">Subtotal</span>
                  <span className="font-display text-xl font-semibold">{formatPrice(total)}</span>
                </div>
                <p className="text-xs text-bando-graphite">Shipping and taxes calculated at checkout</p>
                <Link
                  to="/checkout"
                  onClick={() => setCartOpen(false)}
                  className="btn-primary w-full text-center block"
                >
                  Proceed to Checkout
                </Link>
                <button
                  onClick={clearCart}
                  className="w-full text-center text-sm text-red-400 hover:text-red-300 transition-colors"
                >
                  Clear Cart
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
