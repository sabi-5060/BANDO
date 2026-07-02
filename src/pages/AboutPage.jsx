import { Crown, Heart, Target, Users } from 'lucide-react'
import { motion } from 'framer-motion'

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="section-padding max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <Crown className="w-12 h-12 text-bando-gold mx-auto mb-6" />
          <h1 className="heading-display text-4xl md:text-6xl mb-6">Our Story</h1>
          <p className="text-bando-ash text-lg leading-relaxed max-w-2xl mx-auto">
            BANDO was born from a desire to create something more than just clothing. 
            We build pieces that carry history, speak truth, and inspire change.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {[
            {
              icon: Target,
              title: 'Our Mission',
              text: 'To create premium streetwear that honors legacy, fights injustice, and gives back to communities in need. Every stitch tells a story of resilience.',
            },
            {
              icon: Heart,
              title: 'Our Values',
              text: 'Truth, justice, and compassion drive everything we do. We believe fashion should have purpose beyond aesthetics.',
            },
            {
              icon: Users,
              title: 'Our Community',
              text: 'From the streets of Lagos to the world, our community is built on shared values and collective growth. We rise together.',
            },
            {
              icon: Crown,
              title: 'Our Craft',
              text: 'Every piece is meticulously designed with premium materials. We don\'t compromise on quality because our message deserves the best canvas.',
            },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-bando-charcoal/50 border border-bando-graphite/50 rounded-xl p-8"
            >
              <item.icon className="w-8 h-8 text-bando-gold mb-4" />
              <h3 className="font-display text-xl font-semibold mb-3">{item.title}</h3>
              <p className="text-bando-ash text-sm leading-relaxed">{item.text}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-bando-gold/10 to-transparent border border-bando-gold/20 rounded-2xl p-8 md:p-12 text-center"
        >
          <h2 className="heading-display text-2xl md:text-3xl mb-4">Built on Truth. Designed for Change.</h2>
          <p className="text-bando-ash max-w-xl mx-auto">
            This isn\'t just clothing. It\'s a movement. Join us in honoring the past while building a better future.
          </p>
        </motion.div>
      </div>
    </div>
  )
}