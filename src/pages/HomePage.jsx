import { Link } from 'react-router-dom'
import { ArrowRight, Crown, Heart, Scale } from 'lucide-react'
import { motion } from 'framer-motion'
import { useStore } from '../store/useStore'
import ProductCard from '../components/ProductCard'

export default function HomePage() {
  const { products } = useStore()

  const featuredProducts = products
    .filter((p) => (p.isBestseller || p.isNew) && p.inStock)
    .slice(0, 4)

  const georgeStinneyProducts = products
    .filter((p) => p.isGeorgeStinney && p.inStock)
    .slice(0, 3)

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=1920&h=1080&fit=crop')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-gradient-to-b from-bando-black/70 via-bando-black/50 to-bando-black" />

        <div className="relative z-10 text-center section-padding max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <Crown className="w-8 h-8 text-bando-gold" />
              <span className="text-bando-gold tracking-[0.15em] text-sm font-signature ">Wear the merge</span>
            </div>
            <h1 className="heading-display text-5xl md:text-7xl lg:text-8xl mb-6 text-balance" >
              BANDO <span className="text-gradient-gold">by Daniel Jobs</span>
            </h1>
            <p className="text-bando-ash text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
              Designed for Change. Premium streetwear that carries history, speaks truth, and builds legacy.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/shop" className="btn-primary">
                Shop Collection
              </Link>
              <Link to="/george-stinney" className="btn-outline">
                George Stinney Legacy
              </Link>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-bando-ash rounded-full flex justify-center pt-2">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="w-1.5 h-1.5 bg-bando-gold rounded-full"
            />
          </div>
        </motion.div>
      </section>

      {/* George Stinney Memorial Banner */}
      <section className="bg-bando-charcoal border-y border-bando-graphite/50">
        <div className="section-padding py-16">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center justify-center gap-2 mb-4">
                <Heart className="w-5 h-5 text-red-400" />
                <span className="text-red-400 text-sm tracking-widest font-medium">IN MEMORY OF</span>
              </div>
              <h2 className="heading-display text-3xl md:text-5xl mb-4">
                GEORGE STINNEY JR.
              </h2>
              <p className="text-bando-ash text-lg mb-2">October 21, 1929 — June 16, 1944</p>
              <p className="text-bando-graphite text-sm mb-8">
                Wrongfully executed at 14. Exonerated in 2014. His legacy lives on through every piece we create.
              </p>
              <div className="flex items-center justify-center gap-8 mb-8">
                <div className="text-center">
                  <Scale className="w-8 h-8 text-bando-gold mx-auto mb-2" />
                  <p className="text-2xl font-bold">100%</p>
                  <p className="text-bando-ash text-xs">Profits Donated</p>
                </div>
                <div className="text-center">
                  <Heart className="w-8 h-8 text-red-400 mx-auto mb-2" />
                  <p className="text-2xl font-bold">500+</p>
                  <p className="text-bando-ash text-xs">Children Supported</p>
                </div>
              </div>
              <Link to="/george-stinney" className="btn-outline inline-flex items-center gap-2">
                Explore the Collection <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="section-padding py-20">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="heading-display text-3xl md:text-4xl mb-2">Featured</h2>
            <p className="text-bando-ash">Curated pieces from our latest drops</p>
          </div>
          <Link to="/shop" className="hidden md:flex items-center gap-2 text-bando-gold hover:text-bando-gold-light transition-colors">
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {featuredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        ) : (
          <p className="text-bando-ash text-center py-12">No featured products available</p>
        )}
      </section>

      {/* George Stinney Collection Preview */}
      <section className="section-padding py-20 bg-bando-charcoal/50">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="heading-display text-3xl md:text-4xl mb-2">George Stinney Collection</h2>
            <p className="text-bando-ash">Wear the legacy. Support the cause.</p>
          </div>
          <Link to="/george-stinney" className="hidden md:flex items-center gap-2 text-bando-gold hover:text-bando-gold-light transition-colors">
            View Collection <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {georgeStinneyProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {georgeStinneyProducts.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        ) : (
          <p className="text-bando-ash text-center py-12">George Stinney collection coming soon</p>
        )}
      </section>

      {/* Brand Values */}
      <section className="section-padding py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: Crown, title: 'Premium Quality', desc: 'Every stitch tells a story. We use only the finest materials.' },
            { icon: Heart, title: 'Purpose Driven', desc: 'Every purchase supports communities in need.' },
            { icon: Scale, title: 'Justice & Truth', desc: 'We honor those who came before us and fight for change.' },
          ].map((value, i) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center p-8 border border-bando-graphite/30 rounded-lg hover:border-bando-gold/30 transition-colors"
            >
              <value.icon className="w-10 h-10 text-bando-gold mx-auto mb-4" />
              <h3 className="font-display text-xl font-semibold mb-2">{value.title}</h3>
              <p className="text-bando-ash text-sm">{value.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  )
}
