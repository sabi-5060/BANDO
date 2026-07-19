import { Link } from 'react-router-dom'
import { Heart, Share2, ShoppingBag } from 'lucide-react'
import { motion } from 'framer-motion'
import { useStore } from '../store/useStore'
import { formatPrice } from '../lib/utils'
import { useState } from 'react'

export default function ProductCard({ product, index = 0 }) {
  const { addToCart, toggleFavorite, isFavorite } = useStore()
  const [shareOpen, setShareOpen] = useState(false)
  const [heartAnim, setHeartAnim] = useState(false)
  const favorited = isFavorite(product.id)

  const handleFavorite = (e) => {
    e.preventDefault()
    e.stopPropagation()
    toggleFavorite(product.id)
    setHeartAnim(true)
    setTimeout(() => setHeartAnim(false), 400)
  }

  const handleShare = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setShareOpen(!shareOpen)
  }

  const handleSharePlatform = async (platform) => {
    const url = window.location.origin + '/product/' + product.id
    const text = `Check out ${product.name} on BANDO by Daniel Jobs!`

    if (platform === 'native' && navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: text,
          url: url,
        })
      } catch (err) {
        // User cancelled
      }
    } else if (platform === 'copy') {
      await navigator.clipboard.writeText(url)
      alert('Link copied to clipboard!')
    } else if (platform === 'whatsapp') {
      window.open(`https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`, '_blank')
    } else if (platform === 'twitter') {
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank')
    } else if (platform === 'facebook') {
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank')
    }
    setShareOpen(false)
  }

  const handleQuickAdd = (e) => {
    e.preventDefault()
    e.stopPropagation()
    // Add with first available size and color
    if (product.sizes.length > 0 && product.colors.length > 0) {
      addToCart({
        product,
        size: product.sizes[0],
        color: product.colors[0].name,
        quantity: 1,
      })
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="group relative"
    >
      <Link to={`/product/${product.id}`} className="block">
        <div className="relative aspect-[3/4] bg-bando-charcoal rounded-lg overflow-hidden mb-4">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          
          {/* Overlay gradient on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-bando-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Top badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {product.isNew && (
              <span className="bg-bando-gold text-bando-black text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider">
                New
              </span>
            )}
            {product.isBestseller && (
              <span className="bg-bando-white text-bando-black text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider">
                Bestseller
              </span>
            )}
            {product.isGeorgeStinney && (
              <span className="bg-red-500/80 text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider">
                GS Collection
              </span>
            )}
            {!product.inStock && (
              <span className="bg-red-500/80 text-bando-black text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider">
                Sold Out
              </span>
            )}
          </div>

          {/* Action buttons */}
          <div className="absolute top-3 right-3 flex flex-col gap-2">
            {/* Favorite Button */}
            <button
              onClick={handleFavorite}
              className={`w-9 h-9 rounded-full flex items-center justify-center backdrop-blur-sm transition-all duration-200 ${
                favorited
                  ? 'bg-red-500 text-white shadow-lg shadow-red-500/30'
                  : 'bg-bando-black/50 text-bando-white hover:bg-bando-black/70'
              }`}
              title={favorited ? 'Remove from favorites' : 'Add to favorites'}
            >
              <Heart
                className={`w-4 h-4 transition-all duration-300 ${
                  heartAnim ? 'scale-125' : 'scale-100'
                } ${favorited ? 'fill-current' : ''}`}
              />
            </button>

            {/* Share Button */}
            <div className="relative">
              <button
                onClick={handleShare}
                className="w-9 h-9 rounded-full bg-bando-black/50 text-bando-white hover:bg-bando-black/70 flex items-center justify-center backdrop-blur-sm transition-all duration-200"
                title="Share product"
              >
                <Share2 className="w-4 h-4" />
              </button>

              {/* Share Menu */}
              {shareOpen && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: -5 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  className="absolute top-full right-0 mt-2 w-48 bg-bando-charcoal border border-bando-graphite rounded-xl shadow-xl overflow-hidden z-50"
                >
                  <div className="p-2">
                    <p className="text-xs text-bando-ash px-2 py-1.5 font-medium">Share to</p>
                    {navigator.share && (
                      <button
                        onClick={(e) => { e.stopPropagation(); handleSharePlatform('native'); }}
                        className="w-full text-left px-3 py-2 text-sm text-bando-white hover:bg-bando-gold/10 hover:text-bando-gold rounded-lg transition-colors flex items-center gap-2"
                      >
                        <span className="text-base">📱</span> Share via Device
                      </button>
                    )}
                    <button
                      onClick={(e) => { e.stopPropagation(); handleSharePlatform('whatsapp'); }}
                      className="w-full text-left px-3 py-2 text-sm text-bando-white hover:bg-bando-gold/10 hover:text-bando-gold rounded-lg transition-colors flex items-center gap-2"
                    >
                      <span className="text-base">💬</span> WhatsApp
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); handleSharePlatform('twitter'); }}
                      className="w-full text-left px-3 py-2 text-sm text-bando-white hover:bg-bando-gold/10 hover:text-bando-gold rounded-lg transition-colors flex items-center gap-2"
                    >
                      <span className="text-base">🐦</span> X / Twitter
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); handleSharePlatform('facebook'); }}
                      className="w-full text-left px-3 py-2 text-sm text-bando-white hover:bg-bando-gold/10 hover:text-bando-gold rounded-lg transition-colors flex items-center gap-2"
                    >
                      <span className="text-base">📘</span> Facebook
                    </button>
                    <div className="border-t border-bando-graphite/50 my-1" />
                    <button
                      onClick={(e) => { e.stopPropagation(); handleSharePlatform('copy'); }}
                      className="w-full text-left px-3 py-2 text-sm text-bando-white hover:bg-bando-gold/10 hover:text-bando-gold rounded-lg transition-colors flex items-center gap-2"
                    >
                      <span className="text-base">🔗</span> Copy Link
                    </button>
                  </div>
                </motion.div>
              )}
            </div>
          </div>

          {/* Quick Add Button (bottom overlay) */}
          {product.inStock && (
            <button
              onClick={handleQuickAdd}
              className="absolute bottom-4 left-4 right-4 py-2.5 bg-bando-gold text-bando-black font-semibold text-sm rounded-lg opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <ShoppingBag className="w-4 h-4" />
              Quick Add
            </button>
          )}
        </div>

        <div className="space-y-1">
          <h3 className="font-medium text-bando-white group-hover:text-bando-gold transition-colors truncate">
            {product.name}
          </h3>
          <div className="flex items-center gap-2">
            <span className="font-semibold text-bando-gold">{formatPrice(product.price)}</span>
            {product.originalPrice > 0 && (
              <span className="text-sm text-bando-graphite line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
          <div className="flex items-center gap-1.5">
            {product.colors.slice(0, 4).map((color, i) => (
              <div
                key={i}
                className="w-3 h-3 rounded-full border border-bando-graphite/50"
                style={{ backgroundColor: color.hex }}
                title={color.name}
              />
            ))}
            {product.colors.length > 4 && (
              <span className="text-[10px] text-bando-ash">+{product.colors.length - 4}</span>
            )}
          </div>
        </div>
      </Link>

      {/* Click outside to close share menu */}
      {shareOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShareOpen(false)}
        />
      )}
    </motion.div>
  )
}
