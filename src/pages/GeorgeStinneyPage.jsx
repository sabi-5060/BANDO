import { Link } from 'react-router-dom'
import { Heart, Scale, Users, ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { useStore } from '../store/useStore'
import ProductCard from '../components/ProductCard'
import { formatPrice } from '../lib/utils'

const georgeStinneyStory = `George Junius Stinney Jr. was born on October 21, 1929, in Alcolu, South Carolina. He was the youngest person in the United States in the 20th century to be sentenced to death and executed.

In March 1944, two young white girls, Betty June Binnicker and Mary Emma Thames, went missing in Alcolu. George and his sister Aime were among the last people to see them alive. Police arrested George and interrogated him without his parents or an attorney present.

Within hours, police claimed George had confessed to the murders. There was no written record of his confession, and no physical evidence linked him to the crime. An all-white jury convicted him after a trial that lasted less than three hours.

On June 16, 1944, at the age of 14, George was executed in the electric chair. He was so small that the state had to use a Bible as a booster seat.

Seventy years later, in 2014, a South Carolina judge vacated his conviction, ruling that George had not received a fair trial. He was exonerated posthumously.

Today, we honor his memory by fighting for justice, education, and opportunity for every child.`

export default function GeorgeStinneyPage() {
  const { products, productsInitialized } = useStore()

  const georgeProducts = products.filter((p) => p.isGeorgeStinney && p.inStock)

  const totalRaised = georgeProducts.reduce(
    (sum, p) => sum + (p.stockCount * p.price * 0.3),
    0
  )

  return (
    <div className="min-h-screen pt-24 pb-20">
      {/* Hero */}
      <section className="section-padding mb-16">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 bg-red-500/10 text-red-400 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Heart className="w-4 h-4" />
              IN HONOR OF GEORGE STINNEY JR.
            </div>
            <h1 className="heading-display text-4xl md:text-6xl lg:text-7xl mb-6">
              THE LEGACY <span className="text-gradient-gold">COLLECTION</span>
            </h1>
            <p className="text-bando-ash text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-8">
              Every piece in this collection carries the memory of George Stinney Jr. — 
              wrongfully executed at 14, exonerated 70 years later. 100% of profits fund 
              education, nutrition, and shelter for children in underserved communities.
            </p>
            <div className="flex flex-wrap justify-center gap-8 mb-8">
              <div className="text-center">
                <p className="text-3xl font-bold text-bando-gold">{formatPrice(totalRaised)}</p>
                <p className="text-bando-ash text-sm">Raised for Charity</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-bando-gold">100%</p>
                <p className="text-bando-ash text-sm">Profits Donated</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-bando-gold">500+</p>
                <p className="text-bando-ash text-sm">Children Supported</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="section-padding mb-20">
        <div className="max-w-4xl mx-auto">
          <div className="bg-bando-charcoal/50 border border-bando-graphite/50 rounded-2xl p-8 md:p-12">
            <div className="flex items-center gap-3 mb-6">
              <Scale className="w-6 h-6 text-bando-gold" />
              <h2 className="heading-display text-2xl md:text-3xl">His Story</h2>
            </div>
            <div className="prose prose-invert max-w-none">
              {georgeStinneyStory.split('\n\n').map((paragraph, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="text-bando-ash leading-relaxed mb-4 text-sm md:text-base"
                >
                  {paragraph}
                </motion.p>
              ))}
            </div>
            <div className="mt-8 p-6 bg-bando-black/50 rounded-lg border-l-4 border-bando-gold">
              <p className="font-display text-lg italic text-bando-white">
                "WE REMEMBER. WE RISE. WE NEVER FORGET."
              </p>
              <p className="text-bando-ash text-sm mt-2">— BANDO Legacy Collection</p>
            </div>
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="section-padding">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="heading-display text-3xl mb-2">The Collection</h2>
            <p className="text-bando-ash">Wear the legacy. Be part of the change.</p>
          </div>
        </div>

        {!productsInitialized ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="aspect-[3/4] bg-bando-charcoal rounded-lg animate-pulse" />
            ))}
          </div>
        ) : georgeProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {georgeProducts.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-bando-charcoal/30 rounded-2xl border border-bando-graphite/30">
            <Heart className="w-12 h-12 text-bando-ash mx-auto mb-4" />
            <p className="text-bando-ash text-lg">The George Stinney collection is coming soon.</p>
            <p className="text-bando-graphite text-sm mt-2">Check back later for new drops.</p>
          </div>
        )}
      </section>

      {/* Impact CTA */}
      <section className="section-padding mt-20">
        <div className="bg-gradient-to-r from-bando-gold/10 to-transparent border border-bando-gold/20 rounded-2xl p-8 md:p-12 text-center">
          <Users className="w-12 h-12 text-bando-gold mx-auto mb-4" />
          <h2 className="heading-display text-2xl md:text-3xl mb-4">Join the Movement</h2>
          <p className="text-bando-ash max-w-xl mx-auto mb-6">
            Every purchase directly impacts a child's life. Together, we can honor George's memory 
            by building a better future for those who need it most.
          </p>
          <Link to="/shop" className="btn-primary inline-flex items-center gap-2">
            Shop All Products <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  )
}
