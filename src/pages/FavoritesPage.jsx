import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { 
  Heart, ShoppingBag, Trash2, ArrowRight, ArrowLeft, 
  AlertTriangle, X, Plus, Minus, Crown
} from 'lucide-react'
import { useStore } from '../store/useStore'
import { formatPrice } from '../lib/utils'
import { motion, AnimatePresence } from 'framer-motion'

// ============================================
// Favorites / Wishlist Page
// ============================================
export default function FavoritesPage() {
  const { products, favorites, toggleFavorite, addToCart, isAuthenticated } = useStore()
  const navigate = useNavigate()
  
  const [selectedSize, setSelectedSize] = useState({})
  const [selectedColor, setSelectedColor] = useState({})
  const [addedToCartIds, setAddedToCartIds] = useState(new Set())
  const [clearConfirmOpen, setClearConfirmOpen] = useState(false)

  // Get full product objects from favorite IDs
  const favoriteProducts = products.filter((p) => favorites.includes(p.id))

  // Handle size selection per product
  const handleSizeSelect = (productId, size) => {
    setSelectedSize((prev) => ({ ...prev, [productId]: size }))
  }

  // Handle color selection per product
  const handleColorSelect = (productId, colorName) => {
    setSelectedColor((prev) => ({ ...prev, [productId]: colorName }))
  }

  // Add to cart with selected options
  const handleAddToCart = (product) => {
    const size = selectedSize[product.id] || product.sizes[0]
    const colorName = selectedColor[product.id] || product.colors[0]?.name
    
    if (!size || !colorName) return

    addToCart({
      product,
      size,
      color: colorName,
      quantity: 1,
    })

    // Show "Added" feedback briefly
    setAddedToCartIds((prev) => new Set(prev).add(product.id))
    setTimeout(() => {
      setAddedToCartIds((prev) => {
        const next = new Set(prev)
        next.delete(product.id)
        return next
      })
    }, 2000)
  }

  // Remove from favorites
  const handleRemove = (productId, e) => {
    e?.stopPropagation()
    toggleFavorite(productId)
  }

  // Clear all favorites
  const handleClearAll = () => {
    favorites.forEach((id) => toggleFavorite(id))
    setClearConfirmOpen(false)
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-md mx-auto px-6"
        >
          <div className="w-20 h-20 bg-bando-charcoal border border-bando-graphite rounded-full flex items-center justify-center mx-auto mb-6">
            <Heart className="w-10 h-10 text-bando-graphite" />
          </div>
          <h1 className="heading-display text-3xl mb-3">Sign In to View Favorites</h1>
          <p className="text-bando-ash mb-8 leading-relaxed">
            Save your favorite BANDO pieces and access them anytime across all your devices.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/login" className="btn-primary">
              Sign In
            </Link>
            <Link to="/shop" className="btn-outline">
              Browse Shop
            </Link>
          </div>
        </motion.div>
      </div>
    )
  }

  if (favoriteProducts.length === 0) {
    return (
      <div className="min-h-screen pt-24 pb-20">
        <div className="section-padding">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-md mx-auto py-20"
          >
            <div className="w-20 h-20 bg-bando-charcoal border border-bando-graphite rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart className="w-10 h-10 text-bando-graphite" />
            </div>
            <h1 className="heading-display text-3xl mb-3">Your Favorites is Empty</h1>
            <p className="text-bando-ash mb-8 leading-relaxed">
              You haven't saved any pieces yet. Explore our collection and heart the items you love.
            </p>
            <Link to="/shop" className="btn-primary inline-flex items-center gap-2">
              Discover Collection <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="section-padding">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10"
        >
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Heart className="w-6 h-6 text-red-400 fill-red-400" />
              <h1 className="heading-display text-3xl md:text-4xl">Your Favorites</h1>
            </div>
            <p className="text-bando-ash">
              {favoriteProducts.length} {favoriteProducts.length === 1 ? 'piece' : 'pieces'} saved
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setClearConfirmOpen(true)}
              className="text-sm text-red-400 hover:text-red-300 transition-colors flex items-center gap-1.5 px-3 py-2 rounded-lg hover:bg-red-500/10"
            >
              <Trash2 className="w-4 h-4" />
              Clear All
            </button>
            <Link to="/shop" className="btn-outline text-sm flex items-center gap-2">
              Continue Shopping <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>

        {/* Favorites Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <AnimatePresence mode="popLayout">
            {favoriteProducts.map((product, index) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95, x: -50 }}
                transition={{ delay: index * 0.05 }}
                className="bg-bando-charcoal/50 border border-bando-graphite/50 rounded-xl overflow-hidden group hover:border-bando-gold/30 transition-colors"
              >
                <div className="flex flex-col sm:flex-row">
                  {/* Image */}
                  <Link 
                    to={`/product/${product.id}`}
                    className="sm:w-48 md:w-56 aspect-square sm:aspect-auto sm:h-full relative overflow-hidden shrink-0"
                  >
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {/* Badges */}
                    <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                      {product.isNew && (
                        <span className="bg-bando-gold text-bando-black text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                          New
                        </span>
                      )}
                      {!product.inStock && (
                        <span className="bg-bando-black/80 text-bando-ash text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                          Sold Out
                        </span>
                      )}
                    </div>
                  </Link>

                  {/* Details */}
                  <div className="flex-1 p-5 flex flex-col">
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div>
                        <Link 
                          to={`/product/${product.id}`}
                          className="font-display font-semibold text-lg text-bando-white hover:text-bando-gold transition-colors line-clamp-1"
                        >
                          {product.name}
                        </Link>
                        {product.isGeorgeStinney && (
                          <span className="text-xs text-bando-gold mt-1 inline-block">
                            George Stinney Collection
                          </span>
                        )}
                      </div>
                      <button
                        onClick={(e) => handleRemove(product.id, e)}
                        className="p-2 text-bando-graphite hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors shrink-0"
                        title="Remove from favorites"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Price */}
                    <div className="flex items-baseline gap-2 mb-4">
                      <span className="text-xl font-bold text-bando-gold">
                        {formatPrice(product.price)}
                      </span>
                      {product.originalPrice > 0 && (
                        <span className="text-sm text-bando-graphite line-through">
                          {formatPrice(product.originalPrice)}
                        </span>
                      )}
                    </div>

                    {/* Color Selection */}
                    <div className="mb-3">
                      <label className="text-xs text-bando-ash mb-1.5 block">
                        Color {selectedColor[product.id] && `— ${selectedColor[product.id]}`}
                      </label>
                      <div className="flex gap-2">
                        {product.colors.map((color) => (
                          <button
                            key={color.name}
                            onClick={() => handleColorSelect(product.id, color.name)}
                            className={`w-7 h-7 rounded-full border-2 transition-all ${
                              (selectedColor[product.id] || product.colors[0]?.name) === color.name
                                ? 'border-bando-gold scale-110'
                                : 'border-bando-graphite hover:border-bando-ash'
                            }`}
                            style={{ backgroundColor: color.hex }}
                            title={color.name}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Size Selection */}
                    <div className="mb-4">
                      <label className="text-xs text-bando-ash mb-1.5 block">
                        Size {selectedSize[product.id] && `— ${selectedSize[product.id]}`}
                      </label>
                      <div className="flex gap-2 flex-wrap">
                        {product.sizes.map((size) => (
                          <button
                            key={size}
                            onClick={() => handleSizeSelect(product.id, size)}
                            className={`min-w-[2.5rem] h-9 px-2.5 rounded-lg text-xs font-medium transition-all ${
                              (selectedSize[product.id] || product.sizes[0]) === size
                                ? 'bg-bando-gold text-bando-black'
                                : 'bg-bando-black border border-bando-graphite text-bando-ash hover:text-bando-white'
                            }`}
                          >
                            {size}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Add to Cart */}
                    <div className="mt-auto pt-3">
                      <button
                        onClick={() => handleAddToCart(product)}
                        disabled={!product.inStock || addedToCartIds.has(product.id)}
                        className={`w-full py-2.5 rounded-lg font-medium text-sm flex items-center justify-center gap-2 transition-all ${
                          addedToCartIds.has(product.id)
                            ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                            : product.inStock
                            ? 'bg-bando-gold text-bando-black hover:bg-bando-gold-light'
                            : 'bg-bando-graphite/30 text-bando-graphite cursor-not-allowed'
                        }`}
                      >
                        {addedToCartIds.has(product.id) ? (
                          <>
                            <ShoppingBag className="w-4 h-4" /> Added to Cart
                          </>
                        ) : !product.inStock ? (
                          'Sold Out'
                        ) : (
                          <>
                            <ShoppingBag className="w-4 h-4" /> Add to Cart
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Bottom CTA */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-12 text-center"
        >
          <div className="bg-bando-charcoal/30 border border-bando-graphite/30 rounded-xl p-8 max-w-2xl mx-auto">
            <Crown className="w-8 h-8 text-bando-gold mx-auto mb-3" />
            <h3 className="font-display text-xl font-semibold mb-2">Discover More</h3>
            <p className="text-bando-ash text-sm mb-4">
              Explore our full collection and find your next favorite piece.
            </p>
            <Link to="/shop" className="btn-primary inline-flex items-center gap-2">
              Shop All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Clear All Confirmation Modal */}
      <AnimatePresence>
        {clearConfirmOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-bando-black/80 backdrop-blur-sm z-[60]"
              onClick={() => setClearConfirmOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', duration: 0.4 }}
              className="fixed inset-0 z-[60] flex items-center justify-center p-4"
            >
              <div className="bg-bando-charcoal border border-bando-graphite rounded-2xl shadow-2xl max-w-sm w-full p-6 relative">
                <button
                  onClick={() => setClearConfirmOpen(false)}
                  className="absolute top-4 right-4 p-1.5 text-bando-ash hover:text-bando-white hover:bg-bando-graphite rounded-lg transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>

                <div className="w-14 h-14 bg-red-500/10 border border-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <AlertTriangle className="w-7 h-7 text-red-400" />
                </div>

                <h3 className="heading-display text-xl text-center mb-2">
                  Clear All Favorites?
                </h3>
                <p className="text-bando-ash text-sm text-center mb-6 leading-relaxed">
                  This will remove all {favoriteProducts.length} {favoriteProducts.length === 1 ? 'item' : 'items'} from your favorites. This action cannot be undone.
                </p>

                <div className="flex gap-3">
                  <button
                    onClick={() => setClearConfirmOpen(false)}
                    className="flex-1 py-2.5 px-4 bg-bando-graphite/50 border border-bando-graphite text-bando-white rounded-lg font-medium hover:bg-bando-graphite transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleClearAll}
                    className="flex-1 py-2.5 px-4 bg-red-500/10 border border-red-500/30 text-red-400 rounded-lg font-medium hover:bg-red-500/20 transition-colors flex items-center justify-center gap-2"
                  >
                    <Trash2 className="w-4 h-4" />
                    Clear All
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}