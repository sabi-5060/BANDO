import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Heart, Share2, Check, Truck, Shield, RotateCcw, X } from 'lucide-react'
import { useStore } from '../store/useStore'
import { formatPrice } from '../lib/utils'
import { motion, AnimatePresence } from 'framer-motion'
import ProductCard from '../components/ProductCard'

export default function ProductDetailPage() {
  const { id } = useParams()
  const { products, productsInitialized, addToCart, setCartOpen, toggleFavorite, isFavorite } = useStore()
  const product = products.find((p) => p.id === id)

  const [selectedSize, setSelectedSize] = useState('')
  const [selectedColor, setSelectedColor] = useState('')
  const [selectedImage, setSelectedImage] = useState(0)
  const [addedToCart, setAddedToCart] = useState(false)
  const [shareOpen, setShareOpen] = useState(false)
  const [heartAnim, setHeartAnim] = useState(false)
  const favorited = product ? isFavorite(product.id) : false

  // Until the first server-confirmed Firestore snapshot has arrived, don't
  // conclude the product doesn't exist — it may just not be in the local
  // fallback list yet (e.g. it was added via admin after the last visit).
  if (!productsInitialized) {
    return (
      <div className="min-h-screen pt-24 pb-20">
        <div className="section-padding">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            <div className="aspect-[3/4] bg-bando-charcoal rounded-lg animate-pulse" />
            <div className="space-y-4">
              <div className="h-8 w-2/3 bg-bando-charcoal rounded animate-pulse" />
              <div className="h-4 w-full bg-bando-charcoal rounded animate-pulse" />
              <div className="h-4 w-5/6 bg-bando-charcoal rounded animate-pulse" />
              <div className="h-10 w-1/3 bg-bando-charcoal rounded animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="text-center">
          <h1 className="heading-display text-3xl mb-4">Product Not Found</h1>
          <Link to="/shop" className="btn-primary">Back to Shop</Link>
        </div>
      </div>
    )
  }

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4)

  // Defaults to the first available size/color when the user hasn't picked
  // one yet — same behavior as the Quick Add button on ProductCard, so
  // Add to Cart always works on click instead of silently doing nothing.
  const handleAddToCart = () => {
    const size = selectedSize || product.sizes[0]
    const color = selectedColor || product.colors[0]?.name
    if (!size || !color) return

    addToCart({
      product,
      size,
      color,
      quantity: 1,
    })
    setAddedToCart(true)
    setTimeout(() => setAddedToCart(false), 2000)
  }

  const handleBuyNow = () => {
    const size = selectedSize || product.sizes[0]
    const color = selectedColor || product.colors[0]?.name
    if (!size || !color) return

    addToCart({
      product,
      size,
      color,
      quantity: 1,
    })
    setCartOpen(true)
  }

  const handleFavorite = () => {
    toggleFavorite(product.id)
    setHeartAnim(true)
    setTimeout(() => setHeartAnim(false), 400)
  }

  const handleShare = async (platform) => {
    const url = window.location.href
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

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="section-padding">
        {/* Breadcrumb */}
        <Link to="/shop" className="inline-flex items-center gap-2 text-bando-ash hover:text-bando-gold mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Shop
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Images */}
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="aspect-[3/4] bg-bando-charcoal rounded-lg overflow-hidden"
            >
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </motion.div>
            {product.images.length > 1 && (
              <div className="flex gap-3">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`w-20 h-24 rounded-lg overflow-hidden border-2 transition-colors ${
                      selectedImage === i ? 'border-bando-gold' : 'border-transparent'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div className="space-y-6">
            <div>
              {product.isGeorgeStinney && (
                <span className="inline-block bg-bando-gold/20 text-bando-gold text-xs font-bold px-3 py-1 rounded-full mb-3">
                  GEORGE STINNEY COLLECTION
                </span>
              )}
              <h1 className="heading-display text-3xl md:text-4xl mb-2">{product.name}</h1>
              <p className="text-bando-ash leading-relaxed">{product.description}</p>
            </div>

            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-bold text-bando-gold">{formatPrice(product.price)}</span>
              {product.originalPrice > 0 && (
                <span className="text-xl text-bando-graphite line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>

            {!product.inStock && (
              <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-lg">
                This item is currently sold out
              </div>
            )}

            {/* Color Selection */}
            <div>
              <label className="block text-sm font-medium mb-3">
                Select Color {selectedColor && <span className="text-bando-ash">— {selectedColor}</span>}
              </label>
              <div className="flex gap-3">
                {product.colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color.name)}
                    className={`w-10 h-10 rounded-full border-2 transition-all ${
                      selectedColor === color.name
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
            <div>
              <label className="block text-sm font-medium mb-3">
                Select Size {selectedSize && <span className="text-bando-ash">— {selectedSize}</span>}
              </label>
              <div className="flex gap-2 flex-wrap">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-14 h-12 rounded-lg font-medium text-sm transition-all ${
                      selectedSize === size
                        ? 'bg-bando-gold text-bando-black'
                        : 'bg-bando-charcoal text-bando-ash hover:text-bando-white'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-4">
              <button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className="flex-1 btn-primary flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {addedToCart ? (
                  <>
                    <Check className="w-5 h-5" /> Added to Cart
                  </>
                ) : (
                  'Add to Cart'
                )}
              </button>


              {/* Favorite Button */}
              <button
                onClick={handleFavorite}
                className={`p-3 border rounded-lg transition-all duration-200 ${
                  favorited
                    ? 'border-red-500 bg-red-500/10 text-red-400'
                    : 'border-bando-graphite hover:border-bando-gold'
                }`}
                title={favorited ? 'Remove from favorites' : 'Add to favorites'}
              >
                <Heart
                  className={`w-5 h-5 transition-all duration-300 ${
                    heartAnim ? 'scale-125' : 'scale-100'
                  } ${favorited ? 'fill-current' : ''}`}
                />
              </button>

              {/* Share Button with Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setShareOpen(!shareOpen)}
                  className="p-3 border border-bando-graphite rounded-lg hover:border-bando-gold transition-colors"
                  title="Share product"
                >
                  <Share2 className="w-5 h-5" />
                </button>

                <AnimatePresence>
                  {shareOpen && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9, y: -5 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9, y: -5 }}
                      className="absolute top-full right-0 mt-2 w-56 bg-bando-charcoal border border-bando-graphite rounded-xl shadow-xl overflow-hidden z-50"
                    >
                      <div className="p-2">
                        <div className="flex items-center justify-between px-2 py-1.5">
                          <p className="text-xs text-bando-ash font-medium">Share to</p>
                          <button onClick={() => setShareOpen(false)} className="p-0.5 hover:bg-bando-graphite rounded">
                            <X className="w-3 h-3 text-bando-ash" />
                          </button>
                        </div>
                        {navigator.share && (
                          <button
                            onClick={() => handleShare('native')}
                            className="w-full text-left px-3 py-2 text-sm text-bando-white hover:bg-bando-gold/10 hover:text-bando-gold rounded-lg transition-colors flex items-center gap-2"
                          >
                            <span className="text-base">📱</span> Share via Device
                          </button>
                        )}
                        <button
                          onClick={() => handleShare('whatsapp')}
                          className="w-full text-left px-3 py-2 text-sm text-bando-white hover:bg-bando-gold/10 hover:text-bando-gold rounded-lg transition-colors flex items-center gap-2"
                        >
                          <span className="text-base">💬</span> WhatsApp
                        </button>
                        <button
                          onClick={() => handleShare('twitter')}
                          className="w-full text-left px-3 py-2 text-sm text-bando-white hover:bg-bando-gold/10 hover:text-bando-gold rounded-lg transition-colors flex items-center gap-2"
                        >
                          <span className="text-base">🐦</span> X / Twitter
                        </button>
                        <button
                          onClick={() => handleShare('facebook')}
                          className="w-full text-left px-3 py-2 text-sm text-bando-white hover:bg-bando-gold/10 hover:text-bando-gold rounded-lg transition-colors flex items-center gap-2"
                        >
                          <span className="text-base">📘</span> Facebook
                        </button>
                        <div className="border-t border-bando-graphite/50 my-1" />
                        <button
                          onClick={() => handleShare('copy')}
                          className="w-full text-left px-3 py-2 text-sm text-bando-white hover:bg-bando-gold/10 hover:text-bando-gold rounded-lg transition-colors flex items-center gap-2"
                        >
                          <span className="text-base">🔗</span> Copy Link
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-bando-graphite/50">
              <div className="text-center">
                <Truck className="w-5 h-5 text-bando-gold mx-auto mb-2" />
                <p className="text-xs text-bando-ash">Free Shipping</p>
                <p className="text-xs text-bando-graphite">Orders over ₦30k</p>
              </div>
              <div className="text-center">
                <Shield className="w-5 h-5 text-bando-gold mx-auto mb-2" />
                <p className="text-xs text-bando-ash">Secure Payment</p>
                <p className="text-xs text-bando-graphite">Paystack/Flutterwave</p>
              </div>
              <div className="text-center">
                <RotateCcw className="w-5 h-5 text-bando-gold mx-auto mb-2" />
                <p className="text-xs text-bando-ash">Easy Returns</p>
                <p className="text-xs text-bando-graphite">Within 14 days</p>
              </div>
            </div>

            {/* Details */}
            {product.details && product.details.length > 0 && (
              <div className="space-y-4 pt-6 border-t border-bando-graphite/50">
                <h3 className="font-semibold">Product Details</h3>
                <ul className="space-y-2">
                  {product.details.map((detail, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-bando-ash">
                      <Check className="w-4 h-4 text-bando-gold mt-0.5 shrink-0" />
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {product.material && (
              <div className="pt-4 border-t border-bando-graphite/50">
                <h3 className="font-semibold mb-2">Material</h3>
                <p className="text-sm text-bando-ash">{product.material}</p>
              </div>
            )}

            {product.care && product.care.length > 0 && (
              <div className="pt-4 border-t border-bando-graphite/50">
                <h3 className="font-semibold mb-2">Care Instructions</h3>
                <ul className="space-y-1">
                  {product.care.map((item, i) => (
                    <li key={i} className="text-sm text-bando-ash">• {item}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-20">
            <h2 className="heading-display text-2xl mb-8">You May Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((product, i) => (
                <ProductCard key={product.id} product={product} index={i} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Click outside to close share menu */}
      {shareOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShareOpen(false)}
        />
      )}
    </div>
  )
}
