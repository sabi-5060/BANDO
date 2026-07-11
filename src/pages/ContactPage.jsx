import { useState } from 'react'
import { Link } from 'react-router-dom'
import { 
  Mail, Phone, MapPin, Clock, Send, CheckCircle, 
  Instagram, MessageCircle, ArrowLeft
} from 'lucide-react'
import { motion } from 'framer-motion'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1200))
    setLoading(false)
    setSubmitted(true)
    setFormData({ name: '', email: '', subject: '', message: '' })
    setTimeout(() => setSubmitted(false), 5000)
  }

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'hello@bando.ng',
      href: 'mailto:hello@bando.ng',
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+234 810 123 4567',
      href: 'tel:+2348101234567',
    },
    {
      icon: MapPin,
      label: 'Address',
      value: 'Lagos, Nigeria',
      href: null,
    },
    {
      icon: Clock,
      label: 'Hours',
      value: 'Mon — Sat, 9AM — 6PM WAT',
      href: null,
    },
  ]

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="section-padding">
        {/* Breadcrumb */}
        <Link to="/" className="inline-flex items-center gap-2 text-bando-ash hover:text-bando-gold mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl mb-12"
        >
          <h1 className="heading-display text-4xl md:text-5xl mb-4">Contact Us</h1>
          <p className="text-bando-ash text-lg leading-relaxed">
            Have a question about your order, a product, or just want to say hello? 
            We are here to help. Reach out and we will get back to you within 24 hours.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2 space-y-6"
          >
            <div className="bg-bando-charcoal/50 border border-bando-graphite/50 rounded-xl p-6 space-y-5">
              {contactInfo.map((item) => (
                <div key={item.label} className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-bando-gold/10 rounded-lg flex items-center justify-center shrink-0">
                    <item.icon className="w-5 h-5 text-bando-gold" />
                  </div>
                  <div>
                    <p className="text-xs text-bando-ash uppercase tracking-wider mb-0.5">{item.label}</p>
                    {item.href ? (
                      <a 
                        href={item.href}
                        className="text-bando-white hover:text-bando-gold transition-colors"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-bando-white">{item.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Socials */}
            <div className="bg-bando-charcoal/50 border border-bando-graphite/50 rounded-xl p-6">
              <h3 className="font-display font-semibold mb-4">Follow Us</h3>
              <div className="flex gap-3">
                <a 
                  href="https://instagram.com/bando" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-bando-black border border-bando-graphite rounded-lg flex items-center justify-center text-bando-ash hover:text-bando-gold hover:border-bando-gold transition-colors"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a 
                  href="https://wa.me/2348101234567" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-bando-black border border-bando-graphite rounded-lg flex items-center justify-center text-bando-ash hover:text-bando-gold hover:border-bando-gold transition-colors"
                >
                  <MessageCircle className="w-5 h-5" />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-3"
          >
            <div className="bg-bando-charcoal/50 border border-bando-graphite/50 rounded-xl p-6 md:p-8">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-16 h-16 bg-green-500/10 border border-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-green-400" />
                  </div>
                  <h3 className="font-display text-xl font-semibold mb-2">Message Sent!</h3>
                  <p className="text-bando-ash text-sm">
                    Thank you for reaching out. We will get back to you within 24 hours.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium mb-2">Your Name *</label>
                      <input
                        required
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="John Doe"
                        className="w-full bg-bando-black border border-bando-graphite rounded-lg px-4 py-2.5 text-bando-white focus:border-bando-gold outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Email Address *</label>
                      <input
                        required
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="john@example.com"
                        className="w-full bg-bando-black border border-bando-graphite rounded-lg px-4 py-2.5 text-bando-white focus:border-bando-gold outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Subject *</label>
                    <select
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full bg-bando-black border border-bando-graphite rounded-lg px-4 py-2.5 text-bando-white focus:border-bando-gold outline-none transition-colors"
                    >
                      <option value="">Select a topic</option>
                      <option value="order">Order Inquiry</option>
                      <option value="product">Product Question</option>
                      <option value="shipping">Shipping & Delivery</option>
                      <option value="returns">Returns & Exchanges</option>
                      <option value="collab">Collaboration</option>
                      <option value="other">Something Else</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Message *</label>
                    <textarea
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="How can we help you?"
                      rows={5}
                      className="w-full bg-bando-black border border-bando-graphite rounded-lg px-4 py-2.5 text-bando-white focus:border-bando-gold outline-none transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {loading ? (
                      <span className="w-5 h-5 border-2 border-bando-black/30 border-t-bando-black rounded-full animate-spin" />
                    ) : (
                      <>
                        <Send className="w-4 h-4" /> Send Message
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}