import { useState, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Grid3X3, LayoutList } from 'lucide-react'
import { useStore } from '../store/useStore'
import ProductCard from '../components/ProductCard'
import { motion, AnimatePresence } from 'framer-motion'

const categories = [
  { id: 'all', label: 'All' },
  { id: 'tshirts', label: 'T-Shirts' },
  { id: 'polos', label: 'Polos' },
  { id: 'jackets', label: 'Jackets' },
  { id: 'accessories', label: 'Accessories' },
  { id: 'george-stinney', label: 'George Stinney' },
]

const sortOptions = [
  { id: 'newest', label: 'Newest' },
  { id: 'price-low', label: 'Price: Low to High' },
  { id: 'price-high', label: 'Price: High to Low' },
  { id: 'bestseller', label: 'Bestsellers' },
]

export default function ShopPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const { products, productsInitialized } = useStore()
  const [activeCategory, setActiveCategory] = useState(searchParams.get('t') || 'all')
  const [sortBy, setSortBy] = useState('newest')
  const [viewMode, setViewMode] = useState('grid')

  const filteredProducts = useMemo(() => {
    let filtered = [...products]

    if (activeCategory !== 'all') {
      filtered = filtered.filter(p => p.category === activeCategory)
    }

    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price)
        break
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price)
        break
      case 'bestseller':
        filtered = filtered.filter(p => p.isBestseller).concat(filtered.filter(p => !p.isBestseller))
        break
      default:
        filtered.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0))
    }

    return filtered
  }, [products, activeCategory, sortBy])

  const handleCategoryChange = (catId) => {
    setActiveCategory(catId)
    if (catId === 'all') {
      searchParams.delete('t')
    } else {
      searchParams.set('t', catId)
    }
    setSearchParams(searchParams)
  }

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="section-padding">
        {/* Header */}
        <div className="mb-10">
          <h1 className="heading-display text-4xl md:text-5xl mb-4">Shop</h1>
          <p className="text-bando-ash max-w-xl">
            Discover our full collection of premium streetwear. Each piece crafted with purpose and precision.
          </p>
        </div>

        {/* Filters Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-6 border-b border-bando-graphite/50">
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide pb-2 md:pb-0">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.id)}
                className={`px-4 py-2 text-sm font-medium rounded-full whitespace-nowrap transition-all ${
                  activeCategory === cat.id
                    ? 'bg-bando-gold text-bando-black'
                    : 'bg-bando-charcoal text-bando-ash hover:text-bando-white'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-bando-charcoal border border-bando-graphite rounded-lg px-4 py-2 text-sm text-bando-white focus:border-bando-gold outline-none"
            >
              {sortOptions.map((opt) => (
                <option key={opt.id} value={opt.id}>{opt.label}</option>
              ))}
            </select>

            <div className="flex bg-bando-charcoal rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded ${viewMode === 'grid' ? 'bg-bando-graphite text-bando-white' : 'text-bando-ash'}`}
              >
                <Grid3X3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded ${viewMode === 'list' ? 'bg-bando-graphite text-bando-white' : 'text-bando-ash'}`}
              >
                <LayoutList className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        {!productsInitialized ? (
          <div
            className={`grid gap-6 ${
              viewMode === 'grid'
                ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
                : 'grid-cols-1'
            }`}
          >
            {[...Array(8)].map((_, i) => (
              <div key={i} className="aspect-[3/4] bg-bando-charcoal rounded-lg animate-pulse" />
            ))}
          </div>
        ) : (
          <>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory + sortBy}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className={`grid gap-6 ${
                  viewMode === 'grid'
                    ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
                    : 'grid-cols-1'
                }`}
              >
                {filteredProducts.map((product, i) => (
                  <ProductCard key={product.id} product={product} index={i} />
                ))}
              </motion.div>
            </AnimatePresence>

            {filteredProducts.length === 0 && (
              <div className="text-center py-20">
                <p className="text-bando-ash text-lg">No products found in this category.</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
